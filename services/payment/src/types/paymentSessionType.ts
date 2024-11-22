import { z } from "zod";

export const paymentSessionSchema = z.object({
  planType: z.enum(["month", "year"]),
  userId: z.string().min(1),
});

export type paymentSession = z.infer<typeof paymentSessionSchema>;
