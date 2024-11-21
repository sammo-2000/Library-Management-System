import { z } from "zod";

export const bodyDataSchema = z.object({
  planType: z.enum(["month", "year"]),
  userId: z.string().min(1),
});

export type bodyData = z.infer<typeof bodyDataSchema>;
