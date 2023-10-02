import prisma from '../../../../../lib/prisma'
import { getSession } from 'next-auth/react'

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const result = await prisma.color.findFirst({where:{id:Number(id)}});
    Response.json(result);
}
export async function DELETE(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const result = await prisma.color.delete({where:{id:Number(id)}});
    Response.json(result);
}
export async function PUT(req:Request) {
  const {id,name} = await req.json();
  const result = await prisma.color.update({where:{id:Number(id)},data:{name:name}});
    Response.json(result);
}