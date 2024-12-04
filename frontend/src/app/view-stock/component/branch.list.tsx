import { getAllBranches } from "@/api/inventory/branch";
import { BranchCard } from "@/app/view-stock/component/branch.card";
import { GridStyle } from "@/app/view-stock/component/component.css";

export const BranchList = async ({ branchName }: { branchName?: string }) => {
  const branches = await getAllBranches(branchName);

  return (
    <div className={GridStyle}>
      {branches.map((branch) => {
        return <BranchCard key={branch.id} branch={branch} />;
      })}
    </div>
  );
};
