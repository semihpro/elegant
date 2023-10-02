import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { ConnectUs } from '@prisma/client';

export async function GET(req: Request) {
  const result = await prisma.connectUs.findMany();
  Response.json(result);
}

export async function POST(req: Request) {
  const body :Omit<ConnectUs, 'id'|'createdAt'|'updatedAt'> = await req.json();
  const result = await prisma.connectUs.create({data : body});
  Response.json(result);
}

