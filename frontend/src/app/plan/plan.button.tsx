"use client";

import { planType } from "@/app/plan/plan.data";
import { Button } from "@/components/ui/button";
import { getClientAuth } from "@/components/Auth/ClientProtectedRoute";
import { toast } from "sonner";
import { getStripeSessionId, loadStripePage } from "@/app/plan/load.stripe";
import { catchError } from "@/helpers/catchError";

export const PlanButton = ({ plan }: { plan: planType }) => {
  const token = getClientAuth();

  const onClick = async () => {
    if (!token) {
      toast("Must be logged on | Redirecting...");
      window.location.replace("/login");
    } else {
      const [error, sessionId] = await catchError(getStripeSessionId(plan));
      if (error || !sessionId) return;
      else await loadStripePage(sessionId);
    }
  };

  return (
    <Button onClick={onClick}>Subscribe to {plan.name.toLowerCase()}</Button>
  );
};
