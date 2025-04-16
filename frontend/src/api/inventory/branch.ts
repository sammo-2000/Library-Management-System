import { INVENTORY_API } from "@/lib/apiEndPoint";

export type Branch = {
  id: number;
  name: string;
  City: {
    id: number;
    city: string;
  };
};

export const getAllBranches = async (
  branchName?: string,
): Promise<Branch[]> => {
  try {
    const response = await fetch(`${INVENTORY_API}branches`);
    const data: Branch[] = await response.json();

    if (branchName)
      return data.filter((branch) =>
        branch.name.toLowerCase().includes(branchName.toLowerCase()),
      );

    return data;
  } catch (error) {
    console.warn(error);
    return [];
  }
};

export const getBranchById = async (
  branchId: number,
): Promise<Branch | null> => {
  try {
    const response = await fetch(`${INVENTORY_API}branches`);
    const data: Branch[] = await response.json();

    const branch = data.find((branch) => branch.id === branchId);
    return branch || null;
  } catch (error) {
    console.warn(error);
    return null;
  }
};
