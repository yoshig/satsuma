import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import next from 'next';

const prismaClient = new PrismaClient();


const newEventFile = fs.readFileSync(
  path.resolve('./files/events.txt'),
  'utf-8',
);

const events = newEventFile.split('\n');

const syncEventsWithDB = async (events: any) => {
  for (const event of events) {
    try {
      const eventJson = JSON.parse(event);
      await prismaClient.blockchainEvent.create({
        data: eventJson
      })
    } catch {
      console.error(`Error with event: ${event}`);
    }
  }
}

syncEventsWithDB(events);
