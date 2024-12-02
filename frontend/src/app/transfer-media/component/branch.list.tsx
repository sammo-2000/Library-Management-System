import { getAllBranches } from "@/api/inventory/branch";
import { BranchCard } from "@/app/transfer-media/component/branch.card";

export const BranchList = async ({ branchName }: { branchName?: string }) => {
  const branches = await getAllBranches(branchName);

  return (
    <div
      className={"my-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"}
    >
      {branches.map((branch) => {
        return <BranchCard key={branch.id} branch={branch} />;
      })}
    </div>
  );
};
