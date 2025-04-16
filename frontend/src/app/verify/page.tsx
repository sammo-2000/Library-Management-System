"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getToken } from "@/functions/auth/getToken";
import { SIGN_API } from "@/lib/apiEndPoint";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  verificationCode: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  async function onSubmit({ verificationCode }: z.infer<typeof FormSchema>) {
    const token = await getToken();
    if (!token) router.push("/login");
    setError(null);
    const response = await fetch(`${SIGN_API}sessions/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: token,
        verificationCode,
      }),
    });
    const data = await response.json();
    if (data.message[0] === "Session verified successfully")
      return window.location.replace("/");
    else setError(data.message[0]);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md"
        >
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          {error && <div className="text-red-500">{error}</div>}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyPage;
