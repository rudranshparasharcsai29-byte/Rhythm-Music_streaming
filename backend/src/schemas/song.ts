// This file will be moved to src/schemas/song.ts
import { z } from 'zod';

export const songSchema = z.object({
  title: z.string().min(1, 'Song title is required'),
  artist: z.string().min(1, 'Artist name is required'),
  album: z.string().optional(),
  duration: z.number().int().positive('Duration must be positive'),
  genre: z.string().optional(),
  fileUrl: z.string().url('Invalid file URL'),
  coverUrl: z.string().url('Invalid cover URL').optional(),
});

export const createSongSchema = songSchema;

export type Song = z.infer<typeof songSchema>;
export type CreateSong = z.infer<typeof createSongSchema>;
