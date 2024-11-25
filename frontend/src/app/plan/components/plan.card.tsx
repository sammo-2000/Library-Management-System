import "server-only";
import { planType } from "@/app/plan/data/plan.data";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlanButton } from "@/app/plan/components/plan.button";

export const PlanCard = ({ plan }: { plan: planType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.info}</CardDescription>
      </CardHeader>
      <CardFooter>
        <PlanButton plan={plan} />
      </CardFooter>
    </Card>
  );
};
