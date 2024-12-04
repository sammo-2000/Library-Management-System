import { INVENTORY_API } from "@/lib/apiEndPoint";
import { TransferForm } from "@/app/transfer/type/form.schema";

export const sendTransferRequest = async (transferData: TransferForm) => {
  const response = await fetch(`${INVENTORY_API}transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transferData),
  });

  const data = await response.json();

  return data.message as string;
};
