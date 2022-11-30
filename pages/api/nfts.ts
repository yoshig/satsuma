// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NFT } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../prisma/prismaClient';

type Data = {
  events: NFT[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const nfts = await prismaClient.nFT.findMany({});
  res.status(200).json({ events: nfts });
}
