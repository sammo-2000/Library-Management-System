import "server-only";
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
import { Ban } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Failed",
  description: "There was an issue processing your payment.",
};

export default function PaymentFailPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-10">
      <Card className="max-w-sm">
        <CardHeader>
          <span className="flex items-center justify-center py-4">
            <Ban className="text-destructive" size={50} />
          </span>
          <CardTitle className="text-center text-destructive">
            Payment Failed!
          </CardTitle>
          <CardDescription>
            We&apos;re sorry, but there was an issue processing your payment.
            Please try again.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/frontend/public" className={buttonVariants()}>
            Go to Dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
