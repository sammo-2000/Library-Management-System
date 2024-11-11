 import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().min(1),
  DB_PORT: z.coerce.number().min(1),
  HOST: z.string().min(1),
  USER:z.string().min(1),
  PASSWORD:z.string().min(1),
  DATABASE:z.string().min(1),
  JWT_SECRET : z.string().min(1),
  STAGE:z.string().min(1)
});

export const env = envSchema.parse(process.env);


