// This file will be moved to src/middleware/error-handler.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AppError } from '../utils/errors';
import { errorResponse } from '../utils/response';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

export function registerErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) => {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;

    logger.error(`${request.method} ${request.url}`, {
      message,
      stack,
    });

    // Zod validation errors
    if (error instanceof ZodError) {
      return reply.status(400).send(
        errorResponse('VALIDATION_ERROR', 'Invalid request data', error.errors)
      );
    }

    // Custom app errors
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(
        errorResponse(error.code, error.message, error.details || undefined)
      );
    }

    // Fastify errors
    if (typeof error === 'object' && error !== null && 'statusCode' in error && typeof error.statusCode === 'number') {
      return reply.status(error.statusCode).send(
        errorResponse(
          'HTTP_ERROR',
          'message' in error && typeof error.message === 'string'
            ? error.message
            : 'Internal Server Error',
        )
      );
    }

    // Default internal server error
    return reply.status(500).send(
      errorResponse('INTERNAL_ERROR', 'Internal Server Error')
    );
  });
}
