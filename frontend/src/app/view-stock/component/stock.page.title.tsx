import { getBranchById } from "@/api/inventory/branch";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

export const StockPageTitle = async ({ branchId }: { branchId: string }) => {
  const branch = await getBranchById(Number(branchId));
  if (!branch) return notFound();

  return (
    <div className={"flex items-center justify-between"}>
      <h1 className={"text-2xl font-bold"}>{branch.name}</h1>
      <Link href={`/transfer`} className={buttonVariants()}>
        <ArrowRightLeft />
        <span>Transfer</span>
      </Link>
    </div>
  );
};
