import { z } from "zod";

export const TransferFormSchema = z.object({
  selectedBranchId: z.coerce.number(),
  currentBranchId: z.coerce.number(),
  mediaId: z.coerce.number(),
  quantity: z.coerce.number(),
});
