// This file will be moved to src/schemas/user.ts
import { z } from 'zod';

export const userSignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const userSignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
});

export type UserSignUp = z.infer<typeof userSignUpSchema>;
export type UserSignIn = z.infer<typeof userSignInSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
