
import { getStockQuantity } from "@/api/inventory/stock.quantity";
import { updateStockQuantity } from "@/api/inventory/update.stock";
import { createReservation } from "@/api/reservation/create.reservation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const handleConfirm = async (
  accountId: number | null | undefined,
  branchId: string,
  router: AppRouterInstance,
  mediaId: string 
): Promise<void> => {
  if (!accountId) {
    toast("User account not found. Please log in.");
    return;
  }

  if (!branchId) {
    toast("Please select a pickup location.");
    return;
  }

  const stockQuantity = await getStockQuantity(parseInt(branchId), parseInt(mediaId));

  if (stockQuantity === null) {
    toast("Unable to fetch stock data. Please try again later.");
    return;
  }

  if (stockQuantity < 1) {
    toast("The selected media is out of stock at this location.");
    return;
  }

  const { success, message } = await createReservation(
    accountId.toString(),
    mediaId,
    branchId
  );

  if (success) {
    const stockUpdated = await updateStockQuantity(parseInt(branchId), parseInt(mediaId));

    if (!stockUpdated) {
      toast("Reservation successful, but failed to update stock. Please contact support.");
      return;
    }

    toast(message);
    router.push("/search-media");
  } else {
    toast(message);
  }
};
