import { INVENTORY_API } from "@/lib/apiEndPoint";
export const updateStockQuantity = async (
    branchId: number,
    mediaId: number
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${INVENTORY_API}stocks/update/${branchId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ MediaId: mediaId }), 
        }
      );
  
      if (!response.ok) {
        console.error("Failed to update stock:", response.statusText);
        return false;
      }
  
      return true;
    } catch (error) {
      console.error("Error updating stock:", error);
      return false;
    }
  };
  