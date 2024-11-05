import { z } from "zod";

export const paymentSessionSchema = z.object({
  planType: z.enum(["month", "year"]),
});

export type paymentSession = z.infer<typeof paymentSessionSchema>;
