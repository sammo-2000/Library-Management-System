import { z } from "zod";
import { TransferFormSchema } from "@/app/transfer/type/form.schema";

export const onSubmit = async (data: z.infer<typeof TransferFormSchema>) => {
  console.log(data);
};
