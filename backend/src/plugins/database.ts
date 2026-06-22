// This file will be moved to src/plugins/database.ts
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { logger } from '../utils/logger';

let prisma: PrismaClient;

async function databasePlugin(fastify: FastifyInstance) {
  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    logger.info('✓ Database connected');

    fastify.decorate('prisma', prisma);

    fastify.addHook('onClose', async () => {
      await prisma.$disconnect();
      logger.info('Database disconnected');
    });
  } catch (error) {
    logger.error('Failed to connect to database', error);
    throw error;
  }
}

export default fp(databasePlugin, { name: 'database' });

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}
