import { z } from "zod";

export const envSchema = z.object({
  BASE_URL: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
