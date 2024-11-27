import { getAllBranches } from "@/api/inventory/branches";

export const ListBranches = async ({ branchName }: { branchName?: string }) => {
  const branches = await getAllBranches(branchName);

  return <div></div>;
};
