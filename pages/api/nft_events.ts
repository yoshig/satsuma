// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { BlockchainEvent } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../prisma/prismaClient';

type Data = {
  events: BlockchainEvent[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const blockChainEvents = await prismaClient.blockchainEvent.findMany({});
  res.status(200).json({ events: blockChainEvents });
}
