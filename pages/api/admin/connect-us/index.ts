import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { ConnectUs } from '@prisma/client';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  // get all
  if(req.method==='GET'){
    const result = await prisma.connectUs.findMany();
    res.json(result);    
  }else if(req.method==='POST'){ // create
    const body:Omit<ConnectUs,'id'|'createdAt'> = req.body;
    const result = await prisma.connectUs.create({data : body});
    res.json(result);
  }else{
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

