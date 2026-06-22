// This file will be moved to src/services/userService.ts
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors';
import type { UserSignUp, UpdateUser } from '../schemas/user';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return user;
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: UserSignUp) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password, // In production, hash this!
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async updateUser(id: string, data: UpdateUser) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        avatar: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
  }
}
