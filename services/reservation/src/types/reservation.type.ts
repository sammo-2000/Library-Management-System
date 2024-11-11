import { z } from 'zod';

export const reservationSchema = z.object({
  mediaId: z.string().min(1),
  accountId: z.string().min(1),
  branchId: z.string().min(1),
  notifcationSent: z.coerce.date().optional(),
  reservedAt: z.coerce.date(),
  collectedAt: z.coerce.date().optional(),
});

export type reservation = z.infer<typeof reservationSchema>;
