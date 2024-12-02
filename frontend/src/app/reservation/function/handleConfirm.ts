// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

// export const handleConfirm = (
//   pickupLocation: string,
//   router: AppRouterInstance
// ): void => {
//   if (!pickupLocation) {
//     alert("Please select a pickup location.");
//     return;
//   }

//   alert("Reservation Confirmed!");
//   router.push("/reservation-success");
// };

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createReservation } from "@/api/reservation/create.reservation";

export const handleConfirm = async (
  accountId: number | null,
  branchId: string,
  router: AppRouterInstance
): Promise<void> => {
  if (!accountId) {
    alert("User account not found. Please log in.");
    return;
  }

  if (!branchId) {
    alert("Please select a pickup location.");
    return;
  }

  // Hard-code mediaId (you can replace it with a dynamic value if needed)
  const mediaId = 1;

  // Attempt to create a reservation
  const { success, message } = await createReservation(accountId, mediaId, parseInt(branchId));

  if (success) {
    alert(message);
    router.push("/reservation-success");
  } else {
    alert(message);
  }
};
