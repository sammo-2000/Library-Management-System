"use client";

import { planType } from "@/app/plan/data/plan.data";
import { Button } from "@/components/ui/button";
import { getClientAuth } from "@/components/Auth/ClientProtectedRoute";
import { toast } from "sonner";
import { catchError } from "@/helpers/catchError";
import { createPaymentSession } from "@/api/subscription/create.payment.session";
import { loadStripePage } from "@/api/subscription/load.stripe.page";

export const PlanButton = ({ plan }: { plan: planType }) => {
  const token = getClientAuth();

  const onClick = async () => {
    if (!token) {
      toast("Must be logged on | Redirecting...");
      window.location.replace("/login");
    } else {
      const userId = ??? // TODO: get user ID
      const [error, sessionId] = await catchError(
        createPaymentSession(plan, userId),
      );
      if (error || !sessionId) return;
      else await loadStripePage(sessionId);
    }
  };

  return (
    <Button onClick={onClick}>Subscribe to {plan.name.toLowerCase()}</Button>
  );
};
