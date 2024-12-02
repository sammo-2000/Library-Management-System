"use client";

import { planType } from "@/app/plan/data/plan.data";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { catchError } from "@/helpers/catchError";
import { createPaymentSession } from "@/api/subscription/create.payment.session";
import { loadStripePage } from "@/api/subscription/load.stripe.page";
import { getUser } from "@/functions/auth/getUser";

export const PlanButton = async ({ plan }: { plan: planType }) => {
  const user = await getUser();

  const onClick = async () => {
    if (!user) {
      toast("Must be logged on | Redirecting...");
      window.location.replace("/login");
    } else {
      const [error, sessionId] = await catchError(
        createPaymentSession(plan, user.userId),
      );
      if (error || !sessionId) return;
      else await loadStripePage(sessionId);
    }
  };

  return (
    <Button onClick={onClick}>Subscribe to {plan.name.toLowerCase()}</Button>
  );
};
