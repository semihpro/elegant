import type { NextApiHandler,NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
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

async function deleteFolderIfExists(folderPath: string): Promise<void> {
  try {
      if (await fs.stat(folderPath)) {
          await fs.rm(folderPath, { recursive: true });
      } 
  } catch (error) {
      // do nothing
      //console.error(`Error deleting folder ${folderPath}: ${error}`);
  }
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {  
  if(!(req.method.toUpperCase()==='POST' || req.method.toUpperCase()==='DELETE')){
    res.json({
      result:'bascurdugunuz api sadece post ve delete operasyonlarini destelemektedir!',
      status:404
    })
  }
  const {id,target} = req.query;
  const product:Product = await prisma.product.findFirst({where:{id:Number(id)}});
  let imageTarget = {};
  if(!product) {
    res.json({
      result:`Aranilan Urun bulunamadi`,
      status: 504
    })
    return;
  }
  const existedFileName = product[String(target)]
  const folderAdress=path.join(process.cwd() , `/public/images/product`);
  try {
    await deleteFolderIfExists(folderAdress+`/${existedFileName}`);
    //await fs.mkdir(folderAdress,{recursive:true});
    //await fs.readdir(folderAdress);
  } catch (error) {
    // res.json({
    //   result:error,
    //   status:300
    // })
    console.log('file operations error', error);
  } 
  if(req.method === 'DELETE'){
    imageTarget[String(target)] = null;
  }else if(req.method==='POST'){
    const result = await readFile(req, true, folderAdress);
    try {
      imageTarget[String(target)] = result.files?.image[0].newFilename;
    } catch (error) {
      imageTarget[String(target)] = null;
    }
  }
  const updateResult = await prisma.product.update({where:{id:Number(id)},
    data:{
      ...imageTarget
    }
  })
  res.json({
    result:updateResult,
    status:200
  })
}


