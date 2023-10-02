import { NextApiHandler } from 'next';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { Product } from '@prisma/client';



type Data = {
  message: string;
};

export async function GET(req:Request) {
  const result = await prisma.product.findMany();
  Response.json(result);
}

export async function POST(req:Request) {
  const body :Omit<Product, 'id'|'createdAt'|'updatedAt'> = await req.json();
  const result = await prisma.product.create({data : body});
  Response.json(result);
}