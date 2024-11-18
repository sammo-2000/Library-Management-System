"use client";

import { Button } from "@/components/ui/button";
import { PAYMENT_API } from "@/lib/apiEndPoint";
import { useState } from "react";
import { toast } from "sonner";
import { redirectToCheckout } from "./loadStripe";
import {useAuth} from '../../components/Auth/AuthContext';
import { useRouter } from "next/navigation";
export default function PlanButton({
  name,
  type,
}: {
  name: string;
  type: string;
}) {
  const [loading, setLoading] = useState(false)
  const { authenticated} = useAuth();;
  const router = useRouter();
  const handleClick = async () => {
    try {
      setLoading(true);

      if (!authenticated) {
        toast.error("Please sign in to proceed.");
        router.push("/login");
        setLoading(false);
        return;
      }

      const response = await fetch(`${PAYMENT_API}create-payment-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planType: type }),
      });

      const data: {
        type: "Fail" | "Success";
        message: { error: string } | { sessionId: string };
      } = await response.json();

      if (data.type === "Success" && "sessionId" in data.message) {
        // Success redirect to checkout
        toast("Redirecting to checkout now...");
        redirectToCheckout(data.message.sessionId);
      } else if (data.type === "Fail" && "error" in data.message) {
        // Fail show error
        toast(data.message.error);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast("Failed to create payment session");
    }
  };

  return (
    <Button disabled={loading} onClick={handleClick}>    
      {loading ? "Processing..." : `Get ${name} plan`}  
    </Button>
  );
}

// { type: "Fail" | "Success" , message: { error: string } | { sessionId: string } }
