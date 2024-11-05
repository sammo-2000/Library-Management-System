import "server-only";
import { Metadata } from "next";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlanButton from "./planButton";

export const metadata: Metadata = {
  title: "Choose Your Plan",
  description: "Select the plan that best suits your needs",
};

const planType = [
  {
    type: "month",
    name: "Monthly",
    info: "£5 per month, billed monthly, cancel anytime",
  },
  {
    type: "year",
    name: "Yearly",
    info: "£50 per year, billed annually, cancel anytime",
  },
];

export default async function PlanPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Choose Your Plan</h1>
      <p className="text-muted-foreground">
        Select a plan to unlock full access to the library.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {planType.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.info}</CardDescription>
            </CardHeader>
            <CardFooter className="justify-end">
              <PlanButton name={plan.name} type={plan.type} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
