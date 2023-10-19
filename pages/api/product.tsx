import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const products = await prisma.product.findMany({
    include: {
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  res.json(products);
}
