import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { BlockchainEvent } from '@prisma/client';

const prismaClient = new PrismaClient();
const newEventFile = fs.readFileSync(
  path.resolve('./files/events.txt'),
  'utf-8',
);

const events = newEventFile.split('\n');

const updateNFT = async (event: BlockchainEvent) => {
  await prismaClient.nFT.upsert({
    where: {
      address: event.nftContractAddress
    },
    update: {
      owner: event.toAddress
    },
    create: {
      address: event.nftContractAddress,
      owner: event.toAddress,
      priceEth: event.priceEth
    }
  });
}

const syncEventsWithDB = async (eventLines: string[]) => {
  for (const eventString of eventLines) {
    try {
      const blockchainEvent = JSON.parse(eventString);
      await prismaClient.blockchainEvent.create({
        data: blockchainEvent
      })
      await updateNFT(blockchainEvent);
    } catch {
      console.error(`Error with event: ${eventString}`);
    }
  }
}

console.log('Beginning Sync');

syncEventsWithDB(events);
