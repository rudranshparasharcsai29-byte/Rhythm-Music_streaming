// This file will be moved to src/controllers/userController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/userService';
import { userSignUpSchema, updateUserSchema } from '../schemas/user';
import { successResponse } from '../utils/response';

export class UserController {
  private userService: UserService;

  constructor(prisma: any) {
    this.userService = new UserService(prisma);
  }

  async getUser(request: FastifyRequest, _reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const user = await this.userService.getUserById(id);
    return successResponse(user);
  }

  async getAllUsers(_request: FastifyRequest, _reply: FastifyReply) {
    const users = await this.userService.getAllUsers();
    return successResponse(users);
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const data = userSignUpSchema.parse(request.body);
    const user = await this.userService.createUser(data);
    return reply.status(201).send(successResponse(user));
  }

  async updateUser(request: FastifyRequest, _reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = updateUserSchema.parse(request.body);
    const user = await this.userService.updateUser(id, data);
    return successResponse(user);
  }

  async deleteUser(request: FastifyRequest, _reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await this.userService.deleteUser(id);
    return successResponse({ message: 'User deleted successfully' });
  }
}
