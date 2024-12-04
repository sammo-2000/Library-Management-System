import { z } from "zod";
import { TransferFormSchema } from "@/app/transfer/type/form.schema";
import { sendTransferRequest } from "@/api/inventory/transfer";
import { toast } from "sonner";

export const onSubmit = async (data: z.infer<typeof TransferFormSchema>) => {
  toast(await sendTransferRequest(data));
};
