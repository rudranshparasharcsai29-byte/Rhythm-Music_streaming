// This file will be moved to src/routes/health.ts
import { FastifyInstance } from 'fastify';
import { successResponse } from '../utils/response';

export async function healthRoute(fastify: FastifyInstance) {
  fastify.get('/health', async (_request, reply) => {
    return reply.send(
      successResponse({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      })
    );
  });

  fastify.get('/', async (_request, reply) => {
    return reply.send(
      successResponse({
        name: 'Rhythm Backend',
        version: '1.0.0',
        status: 'running',
      })
    );
  });
}
