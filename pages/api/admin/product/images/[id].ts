import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {  
  const {image_path1, image_path2, image_path3, image_path4, image_path5} = req.body;
  if(req.method==='PUT'){
    const result = await prisma.product.update({ where:{id:Number(req.query?.id)},
      data:{
        image_path1 : !image_path1 ? null : String(image_path1),
        image_path2 : !image_path2 ? null : String(image_path2),
        image_path3 : !image_path3 ? null : String(image_path3),
        image_path4 : !image_path4 ? null : String(image_path4),
        image_path5 : !image_path5 ? null : String(image_path5)
      }});
    res.json(result); 
  }
}