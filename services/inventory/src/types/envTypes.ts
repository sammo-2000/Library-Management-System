import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().min(1),
  DB_PORT: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1)
});

export const env = envSchema.parse(process.env);


