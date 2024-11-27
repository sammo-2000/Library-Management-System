import { getAllBranches } from "@/api/inventory/branch";
import { CardBranch } from "@/app/transfer-media/component/card.branch";

export const ListBranches = async ({ branchName }: { branchName?: string }) => {
  const branches = await getAllBranches(branchName);

  return (
    <div
      className={"my-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"}
    >
      {branches.map((branch) => {
        return <CardBranch key={branch.id} branch={branch} />;
      })}
    </div>
  );
};
