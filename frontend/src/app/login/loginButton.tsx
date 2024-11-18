"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { toast } from "sonner";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
   
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast("Sign in attempt failed");
    }
  };

  return (
    <Button disabled={loading} onClick={handleClick}>
      {loading ? "Processing..." : `Sign In`}
    </Button>
  );
}

