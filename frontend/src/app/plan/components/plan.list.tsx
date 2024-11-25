import "server-only";
import { plans } from "@/app/plan/data/plan.data";
import { PlanCard } from "@/app/plan/components/plan.card";

export const PlanList = () => {
  return (
    <div className={"grid gap-4 md:grid-cols-2"}>
      {plans.map((plan, index) => {
        return <PlanCard key={index} plan={plan} />;
      })}
    </div>
  );
};
