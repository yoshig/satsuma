// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NFT } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../prisma/prismaClient';

type Data = {
  nfts: NFT[]
}

interface INFTSearchFilter {
  owner?: string;
  address?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { owner, address } = req.query;

  const nftFilters = {} as INFTSearchFilter;

  if (owner) {
    nftFilters.owner = String(owner);
  }
  if (address) {
    nftFilters.address = String(address);
  }

  const nfts = await prismaClient.nFT.findMany({
    where: nftFilters
  });
  res.status(200).json({ nfts: nfts });
}
