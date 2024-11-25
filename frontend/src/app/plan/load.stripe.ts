import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { PAYMENT_API } from "@/lib/apiEndPoint";
import { planType } from "@/app/plan/plan.data";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
);

export const loadStripePage = async (sessionId: string) => {
  const stripe = await stripePromise;
  if (!stripe) return toast("Failed to load payment gateway");
  await stripe.redirectToCheckout({ sessionId });
};

export const getStripeSessionId = async (
  plan: planType,
): Promise<string | null> => {
  const response = await fetch(`${PAYMENT_API}create-payment-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ planType: plan.type }),
  });

  const data: {
    type: "Fail" | "Success";
    message: { error: string } | { sessionId: string };
  } = await response.json();

  if (data.type === "Success" && "sessionId" in data.message) {
    toast("Redirecting to checkout now...");
    return data.message.sessionId as string;
  } else if (data.type === "Fail" && "error" in data.message) {
    toast(data.message.error);
  }
  return null;
};
