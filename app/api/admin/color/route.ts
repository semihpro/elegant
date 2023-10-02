import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'

export async function GET(req:Request) {
  const result = await prisma.color.findMany();
  Response.json(result);
}
export async function POST(req:Request) {
  const {name} = await req.json();
  const result = await prisma.color.create({data : {name : name}})
  Response.json(result);
}

