import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'


type Data = {
  message: string;
};


// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // get all
  if(req.method==='GET'){
    const result = await prisma.product.findMany();
    res.json(result);    
  }else if(req.method==='POST'){ // create
    const {name, colorId, brandId} = req.body;
    const result = await prisma.product.create({data : {name : name, colorId: Number(colorId), brandId: Number(brandId)}})
    res.json(result);
  }
}