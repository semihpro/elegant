import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if(req.method==='GET'){
    const result = await prisma.color.findFirst({where:{id:Number(req.query?.id)}});
    res.json(result);
  }else if(req.method==='DELETE'){
    const result = await prisma.color.delete({where:{id:Number(req.query?.id)}});
    res.json(result);   
  }else if(req.method==='PUT'){
    const result = await prisma.color.update({where:{id:Number(req.query?.id)},data:{name:req.body.name}});
    res.json(result); 
  }
}