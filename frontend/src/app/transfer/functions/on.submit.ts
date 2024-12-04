import { z } from "zod";
import { TransferFormSchema } from "@/app/transfer/type/form.schema";
import { sendTransferRequest } from "@/api/inventory/transfer";

export const onSubmit = async (data: z.infer<typeof TransferFormSchema>) => {
  console.log(data);

  await sendTransferRequest(data);
};
