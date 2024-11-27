import { PAYMENT_API } from "@/lib/apiEndPoint";

export const isSubscriptionActive = async (
  userId: string,
): Promise<boolean> => {
  const response = await fetch(
    `${PAYMENT_API}get-subscription-status/${userId}`,
  );

  const data: {
    type: "Success";
    isActive: boolean;
  } = await response.json();

  return data.isActive;
};
