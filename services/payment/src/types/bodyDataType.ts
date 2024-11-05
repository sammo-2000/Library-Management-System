import { z } from "zod";

export const bodyDataSchema = z.object({
  planType: z.enum(["month", "year"]),
});

export type bodyData = z.infer<typeof bodyDataSchema>;
