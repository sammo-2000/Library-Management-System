import { getBranchById } from "@/api/inventory/branch";
import { notFound } from "next/navigation";

export const StockPageTitle = async ({ branchId }: { branchId: string }) => {
  const branch = await getBranchById(Number(branchId));
  if (!branch) return notFound();

  return <h1 className={"text-2xl font-bold"}>{branch.name}</h1>;
};
