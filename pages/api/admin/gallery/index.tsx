import type { NextApiHandler,NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import formidable from 'formidable';
import fs,{readFile} from "fs/promises";
import { utapi } from "uploadthing/server";
import { FileEsque } from 'uploadthing/dist/sdk/utils';


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if(!(req.method.toUpperCase()==='POST' || req.method.toUpperCase()==='DELETE')){
    res.json({
      result:'bascurdugunuz api sadece post operasyonu destelemektedir!',
      status:404
    })
  }
  try {
     // Formidable file read
    const data: { fields: any; files: any } = await new Promise(
      (resolve, reject) => {
        const form = formidable({});
        form.parse(req, (err: any, fields: any, files: any) => {
          if (err) reject({ err });
          resolve({ fields, files });
        });
      }
    );
      const controller = new AbortController();
      const { signal } = controller;
      const binaryFile = await readFile(data.files.image[0].filepath, { signal });
      const fileBlob: FileEsque = new Blob([binaryFile]);
      fileBlob.name='gallery_image.jpg';
      // Abort the request before the promise settles.
      controller.abort();
      const result = await utapi.uploadFiles<FileEsque>(fileBlob);
      // update data
      const createResult = await prisma.gallery.create({data:{
        image_key:result.data.key,
        image_path:result.data.url
      }
      });
       res.status(200).json({
        status: 'ok',
        createResult
      }) 
    } catch (err) {
      // When a request is aborted - err is an AbortError
      res.json(err)
    } 
}