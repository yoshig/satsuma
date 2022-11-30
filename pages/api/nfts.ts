// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NFT } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../prisma/prismaClient';

type Data = {
  nfts: NFT[];
  total: number;
}
interface INFTSearchFilter {
  owner?: string;
  address?: string;
}

const NFT_PAGE_ENTRIES_LENGTH = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { owner, address, page } = req.query;

  const nftFilters = {} as INFTSearchFilter;

  if (owner) {
    nftFilters.owner = String(owner);
  }
  if (address) {
    nftFilters.address = String(address);
  }

  const skipPages = Number(page) || 0;

  const nftRequest = await prismaClient.$transaction([
    prismaClient.nFT.count({
      where: nftFilters
    }),
    prismaClient.nFT.findMany({
      where: nftFilters,
      take: NFT_PAGE_ENTRIES_LENGTH,
      skip: skipPages * NFT_PAGE_ENTRIES_LENGTH
    }),
  ]);

  res.status(200).json({ total: nftRequest[0], nfts: nftRequest[1] });
}
