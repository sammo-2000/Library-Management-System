import { INVENTORY_API } from "@/lib/apiEndPoint";

export const getStockQuantity = async (
    branchId: number,
    mediaId: number
  ): Promise<number | null> => {
    try {
      const response = await fetch(`${INVENTORY_API}stocks/${branchId}`);
      if (!response.ok) {
        console.error("Failed to fetch stock data:", response.statusText);
        return null;
      }
  
      
      const stocks = await response.json();
     
      const stock = stocks.find(
        (item: { MediaId: number; BranchId: number; quantity: number }) =>
          item.MediaId === mediaId && item.BranchId === branchId
      );
      
      return stock?.quantity ?? null;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return null;
    }
  };
  