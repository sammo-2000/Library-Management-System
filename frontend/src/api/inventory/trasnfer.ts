import { INVENTORY_API } from "@/lib/apiEndPoint";

export type Medium = {
  id: number;
  type: string;
  title: string;
  description: string;
  publishedDate: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  publisherId: number;
  genreId: number;
};

export type StockQuantity = {
  quantity: number;
  BranchId: number;
  MediaId: number;
  Medium: Medium;
};

export const getStockQuantityForBranchById = async (
  branchId: string,
): Promise<StockQuantity[] | void> => {
  const response = await fetch(`${INVENTORY_API}stocks/${branchId}`);

  if (!response.ok) return console.error(response.statusText);

  return await response.json();
};
