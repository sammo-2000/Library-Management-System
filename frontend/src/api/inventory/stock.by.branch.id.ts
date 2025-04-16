import { getBorrowQuantity } from "@/api/borrow/get.borrow.quantity";
import { getReservedQuantity } from "@/api/reservation/get.reserved.quantity";
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
  borrowed: number;
  reserved: number;
  Medium: Medium;
};

export const getStockQuantityForBranchById = async (
  branchId: string,
): Promise<StockQuantity[] | void> => {
  const response = await fetch(`${INVENTORY_API}stocks/${branchId}`);

  if (!response.ok) return console.warn(response.statusText);

  const data: StockQuantity[] = await response.json();

  return await Promise.all(
    data.map(async (stock) => {
      const reserved = await getReservedQuantity(stock.MediaId, stock.BranchId);
      const borrowed = await getBorrowQuantity(stock.MediaId, stock.BranchId);

      return {
        ...stock,
        reserved,
        borrowed,
      };
    }),
  );
};
