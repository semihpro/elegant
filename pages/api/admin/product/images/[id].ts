import type { NextApiHandler,NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import formidable from 'formidable';
import fs, {readFile} from "fs/promises";
import { Product } from '@prisma/client';
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
      result:'bascurdugunuz api sadece post ve delete operasyonlarini destelemektedir!',
      status:404
    })
  }
  try {
  const {id,target} = req.query;
  const dataUpdate={};
  const targetImagekey = `image_key${extractNumberFromString(target)}`;
  const product:Product = await prisma.product.findFirst({where:{id:Number(id)}});
  if(!product) {
    res.json({
      result:`Aranilan Urun bulunamadi`,
      status: 504
    })
    return;
  }
  // if imagekey exist delete it from utapi
    product[targetImagekey] && await utapi.deleteFiles(product[targetImagekey]);
  if(req.method.toUpperCase()==='DELETE'){
    dataUpdate[String(target)]=null;
    dataUpdate[targetImagekey]=null;
  } else {
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
      fileBlob.name='product_image.jpg';
      // Abort the request before the promise settles.
      controller.abort();
      const result = await utapi.uploadFiles<FileEsque>(fileBlob);
      // prapare update data
      dataUpdate[String(target)]=result.data.url;
      dataUpdate[targetImagekey]=result.data.key;
      // update data
  }
  const updateResult = await prisma.product.update({where:{id:Number(id)},
        data:dataUpdate
      });
       res.status(200).json({
        status: 'ok',
        updateResult
      }) 
    } catch (err) {
      // When a request is aborted - err is an AbortError
      res.json(err)
    }
    
 
}

function extractNumberFromString(text) {
  const regex = /\d+/; // Regular expression to match one or more digits
  const match = text.match(regex); // Find the first match of the regex in the text
  return match ? Number(match[0]) : null; // Convert the match to a number and return
}