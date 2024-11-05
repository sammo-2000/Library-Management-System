import { number, z } from "zod";

export const envSchema = z.object({
  BASE_URL: z.string().min(1),
  SUCCESS_URL: z.string().min(1),
  CANCEL_URL: z.string().min(1),
  YEAR_PRICE: z.coerce.number().min(1),
  MONTH_PRICE: z.coerce.number().min(1),
  SECRET_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
