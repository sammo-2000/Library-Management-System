import { Branch, getAllBranches } from "@/api/inventory/branch";

export const fetchBranches = async (): Promise<Branch[]> => {
  try {
    return await getAllBranches();
  } catch (error) {
    console.warn("Failed to fetch branches", error);
    return [];
  }
};
