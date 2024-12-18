import "server-only";
import { CircleCheckBig } from "lucide-react";
import { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your payment has been processed successfully.",
};

export default function PaymentSuccessPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-10">
      <Card className="max-w-sm">
        <CardHeader>
          <span className="flex items-center justify-center py-4">
            <CircleCheckBig className="text-success" size={50} />
          </span>
          <CardTitle className="text-center text-success">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Thank you for your payment. Your subscription is now active!
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/" className={buttonVariants()}>
            Go to Dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
