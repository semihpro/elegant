import type { NextApiHandler,NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import formidable, { Fields, Files } from 'formidable';
import path from "path";
import fs, {readFile} from "fs/promises";
import { Product } from '@prisma/client';
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { utapi } from "uploadthing/server";
import { FileEsque } from 'uploadthing/dist/sdk/utils';


async function uploadFile(formData) {
  try {
    const response = await utapi.uploadFiles(formData);
    return response; // This could be an object with { key: string, url: string }
  } catch (error) {
    throw new Error(error.message);
  }
}
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
  try {
    // delete image
  } catch (error) {
    
  }

  const data: { fields: any; files: any } = await new Promise(
    (resolve, reject) => {
      const form = formidable({});

      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) reject({ err });

        resolve({ fields, files });
      });
    }
  );

    try {
      const controller = new AbortController();
      const { signal } = controller;
      const binaryFile = await readFile(data.files.image[0].filepath, { signal });
      const fileBlob: FileEsque = new Blob([binaryFile]);
      fileBlob.name='myfirstutapifile.jpg';
      // Abort the request before the promise settles.
      controller.abort();
      const result = await utapi.uploadFiles<FileEsque>(fileBlob);
       res.status(200).json({
        status: 'ok',
        result
      })
    } catch (err) {
      // When a request is aborted - err is an AbortError
      res.json(err)
    }
    

  //return the data back or just do whatever you want with it
 
}

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const fomrData = new FormData();
//     const x= req.body;
//     //const file = formData.get("file") as Blob | null;

//     const form = formidable({});
//     const formidableResult = form.parse(req, function(err, fields, files ){
//       console.log(fields);
//     })
//     const { formData } = await readFile(req);
//     // Use the formData as needed

//     // Example: Sending the formData to another API or processing it
//     const response = await uploadFile(formData);
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }



// const readFile = (
//   req: NextApiRequest
// ): Promise<{ formData: FormData }> => {
//   const options: formidable.Options = {};
//     options.filename = (name, ext, path, form) => {
//       return Date.now().toString() + '_' + path.originalFilename;
//     };
//   options.maxFileSize = 4000 * 1024 * 1024;
//   const form = formidable(options);

//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("files",files);
//       // for (const field in fields) {
//       //   formData.append(field, fields[field]);
//       // }
//       // for (const fileField in files) {
//       //   formData.append("files", files[fileField]);
//       // }

//       resolve({ formData });
//     });
//   });
// };
//test deployment
const readAndWrite = (
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



// export default async function handle(req: NextApiRequest, res: NextApiResponse) {  
//   if(!(req.method.toUpperCase()==='POST' || req.method.toUpperCase()==='DELETE')){
//     res.json({
//       result:'bascurdugunuz api sadece post ve delete operasyonlarini destelemektedir!',
//       status:404
//     })
//   }
//   const {id,target} = req.query;
//   const product:Product = await prisma.product.findFirst({where:{id:Number(id)}});
//   let imageTarget = {};
//   if(!product) {
//     res.json({
//       result:`Aranilan Urun bulunamadi`,
//       status: 504
//     })
//     return;
//   }
//   const existedFileName = product[String(target)]
//   const folderAdress=path.join(process.cwd() , `/public/images/product`);
//   try {
//     await deleteFolderIfExists(folderAdress+`/${existedFileName}`);
//     //await fs.mkdir(folderAdress,{recursive:true});
//     //await fs.readdir(folderAdress);
//   } catch (error) {
//     // res.json({
//     //   result:error,
//     //   status:300
//     // })
//     console.log('file operations error', error);
//   } 
//   if(req.method === 'DELETE'){
//     imageTarget[String(target)] = null;
//   }else if(req.method==='POST'){
//     const result = await readFile(req, true, folderAdress);
//     try {
//       imageTarget[String(target)] = result.files?.image[0].newFilename;
//     } catch (error) {
//       imageTarget[String(target)] = null;
//     }
//   }
//   const updateResult = await prisma.product.update({where:{id:Number(id)},
//     data:{
//       ...imageTarget
//     }
//   })
//   res.json({
//     result:updateResult,
//     status:200
//   })
// }


