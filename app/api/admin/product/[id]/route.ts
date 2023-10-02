import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { Product } from '@prisma/client';


export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const result = await prisma.product.findFirst({where:{id:Number(id)}});
  Response.json(result);
}

export async function DELETE(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const result = await prisma.product.delete({where:{id:Number(id)}});
  Response.json(result);
}
export async function PUT(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const body :Omit<Product, 'id'|'createdAt'|'updatedAt'> = await req.json();
  const result = await prisma.product.update({where:{id:Number(id)},data:body});
  Response.json(result);
}
