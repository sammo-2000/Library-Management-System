import "server-only";
import { plans } from "@/app/plan/plan.data";
import { PlanCard } from "@/app/plan/plan.card";

export const PlanList = () => {
  return (
    <div className={"grid gap-4 md:grid-cols-2"}>
      {plans.map((plan, index) => {
        return <PlanCard key={index} plan={plan} />;
      })}
    </div>
  );
};
