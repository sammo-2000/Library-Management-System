import "server-only";
import { Metadata } from "next";
import { PlanList } from "@/app/plan/plan.list";

export const metadata: Metadata = {
  title: "Choose Your Plan",
  description: "Select the plan that best suits your needs",
};

export default async function PlanPage() {
  return <PlanList />;
}
