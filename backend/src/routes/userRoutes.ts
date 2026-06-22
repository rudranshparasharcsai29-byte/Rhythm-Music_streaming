// This file will be moved to src/routes/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
  const controller = new UserController(fastify.prisma);

  // Get all users
  fastify.get('/users', async (request, reply) => {
    return controller.getAllUsers(request, reply);
  });

  // Get user by ID
  fastify.get<{ Params: { id: string } }>(
    '/users/:id',
    async (request, reply) => {
      return controller.getUser(request, reply);
    }
  );

  // Create new user
  fastify.post('/users', async (request, reply) => {
    return controller.createUser(request, reply);
  });

  // Update user
  fastify.put<{ Params: { id: string } }>(
    '/users/:id',
    async (request, reply) => {
      return controller.updateUser(request, reply);
    }
  );

  // Delete user
  fastify.delete<{ Params: { id: string } }>(
    '/users/:id',
    async (request, reply) => {
      return controller.deleteUser(request, reply);
    }
  );
}
