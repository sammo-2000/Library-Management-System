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
import { getUser } from "@/functions/auth/getUser";

export const PlanCard = async ({ plan }: { plan: planType }) => {
  const user = await getUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.info}</CardDescription>
      </CardHeader>
      <CardFooter>
        <PlanButton plan={plan} user={user} />
      </CardFooter>
    </Card>
  );
};
