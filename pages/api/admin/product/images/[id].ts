import type { NextApiHandler,NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { useRouter } from 'next/router';
import { Product } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
};
//test deployment
const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean,
  folderAdress?: string
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  //const fullAddress = 
  if (saveLocally) {
    options.uploadDir =folderAdress;
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {  
  const {id,target} = req.query;
  const product:Product = await prisma.product.findFirst({where:{id:Number(id)}});
  if(!product) {
    res.json({
      result:`ok`,
      status:200
    })
  }
  const folderAdress=path.join(process.cwd() + "/public/images/product/",`${id}`);
  try {
    await fs.readdir(folderAdress);
  } catch (error) {
    await fs.mkdir(folderAdress);
  }
  const result = await readFile(req, true, folderAdress);
  // if(req.method==='PUT'){
  //   const result = await prisma.product.update({ where:{id:Number(req.query?.id)},
  //     data:{
  //       image_path1 : !image_path1 ? null : String(image_path1),
  //       image_path2 : !image_path2 ? null : String(image_path2),
  //       image_path3 : !image_path3 ? null : String(image_path3),
  //       image_path4 : !image_path4 ? null : String(image_path4),
  //       image_path5 : !image_path5 ? null : String(image_path5)
  //     }});
  //   res.json(result); 
  // }
  let imageTarget = {};
  imageTarget[target] = result.files.image[0].newFilename;
  const updateResult = await prisma.product.update({where:{id:Number(id)},
    data:{
      ...imageTarget
    }
  })
  res.json({
    result:result,
    status:200
  })
}