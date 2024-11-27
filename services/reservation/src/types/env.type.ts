import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  DATABASE_URL: z.string().min(1),
  AUTH_SERVICE_BASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
