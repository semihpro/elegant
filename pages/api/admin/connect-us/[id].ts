import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { ConnectUs } from '@prisma/client';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if(req.method==='GET'){
    const result = await prisma.connectUs.findFirst({where:{id:Number(req.query?.id)}});
    res.json(result);
  }else if(req.method==='DELETE'){
    const result = await prisma.connectUs.delete({where:{id:Number(req.query?.id)}});
    res.json(result);   
  }else if(req.method==='PUT'){
    const body:Omit<ConnectUs, 'id'|'createdAt'|'updatedAt'> = req.body;
    const result = await prisma.connectUs.update({where:{id:Number(req.query?.id)},data:body});
    res.json(result); 
  }
}