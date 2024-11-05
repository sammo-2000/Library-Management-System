import Stripe from "stripe";
import { env } from "@/types/envType";
import { paymentSession } from "@/types/paymentSessionType";

const stripe = new Stripe(env.SECRET_KEY);

export const createPaymentSession = async (
  data: paymentSession
): Promise<{ sessionId: string }> => {
  // Set name of the item based on the plan type
  const itemName =
    data.planType === "month" ? "Monthly subscription" : "Yearly subscription";

  // Set price based on the plan type
  const price = data.planType === "month" ? env.MONTH_PRICE : env.YEAR_PRICE;

  // Create payment session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: itemName,
          },
          recurring: {
            interval: data.planType,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: env.SUCCESS_URL,
    cancel_url: env.CANCEL_URL,
  });

  // Return payment session ID
  return { sessionId: session.id };
};
