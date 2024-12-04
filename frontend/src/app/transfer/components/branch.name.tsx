import { Branch } from "@/api/inventory/branch";

export const BranchName = ({ currentBranch }: { currentBranch: Branch }) => {
  return <span>{currentBranch.name}</span>;
};
