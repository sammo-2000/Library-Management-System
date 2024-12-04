import { z } from "zod";

export const TransferFormSchema = z.object({
  branchOne: z.coerce.number(),
  branchTwo: z.coerce.number(),
  mediaId: z.coerce.number(),
  quantity: z.coerce.number(),
  transfer: z.enum(["OneToTwo", "TwoToOne"]),
});
