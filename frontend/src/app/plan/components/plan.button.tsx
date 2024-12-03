"use client";

import { planType } from "@/app/plan/data/plan.data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { catchError } from "@/helpers/catchError";
import { createPaymentSession } from "@/api/subscription/create.payment.session";
import { loadStripePage } from "@/api/subscription/load.stripe.page";
import { UserType } from "@/functions/auth/decodeJWT";

export const PlanButton = ({
  plan,
  user,
}: {
  plan: planType;
  user: UserType | null;
}) => {
  const onClick = async () => {
    if (!user) {
      toast("Must be logged on | Redirecting...");
      window.location.replace("/login");
    } else {
      const [error, sessionId] = await catchError(
        createPaymentSession(plan, user.userId.toString()),
      );
      if (error || !sessionId) return;
      else await loadStripePage(sessionId);
    }
  };

  return (
    <Button onClick={onClick}>Subscribe to {plan.name.toLowerCase()}</Button>
  );
};
