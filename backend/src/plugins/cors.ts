// This file will be moved to src/plugins/cors.ts
import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fp from 'fastify-plugin';
import env from '../config/env';

async function corsPlugin(fastify: FastifyInstance) {
  const origins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
  
  await fastify.register(cors, {
    origin: origins,
    credentials: true,
  });
}

export default fp(corsPlugin, { name: 'cors' });
