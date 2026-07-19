import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const JWT_SECRET = process.env.JWT_SECRET || 'rhythm_secret';
const JWT_EXPIRES_IN = '7d';

function generateToken(user: { id: string; email: string; name: string }) {
  return jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function sanitizeUser(user: { id: string; email: string; name: string; password: string; avatar: string | null; bio: string | null; createdAt: Date }) {
  const { password: _, ...rest } = user;
  return rest;
}

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/auth/register', async (request, reply) => {
    const parseResult = registerSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parseResult.error.flatten() });
    }

    const { name, email, password } = parseResult.data;

    const existingUser = await fastify.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return reply.status(409).send({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await fastify.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    const token = generateToken(user);
    return reply.send({ token, user: sanitizeUser(user) });
  });

  fastify.post('/auth/login', async (request, reply) => {
    const parseResult = loginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parseResult.error.flatten() });
    }

    const { email, password } = parseResult.data;

    const user = await fastify.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.status(401).send({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return reply.send({ token, user: sanitizeUser(user) });
  });
}