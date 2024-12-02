
import {RESERVATION_API } from "@/lib/apiEndPoint";
import { getServerAuth } from "@/components/Auth/ServerProtectedRoute";
export const createReservation = async (
    accountId: number,
    mediaId: number,
    branchId: number
  ): Promise<{ success: boolean; message: string }> => {
    try {
        const token = await getServerAuth();
        // console.log(token)
     
         if (!token) {
           console.error("Authentication token not found.");
           return { success: false, message: "Authentication token not found." };
         }
      const response = await fetch(RESERVATION_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({ accountId, mediaId, branchId }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        return { success: false, message: error.message || "Reservation failed." };
      }
  
      return { success: true, message: "Reservation successful!" };
    } catch (error) {
      console.error("Error posting reservation:", error);
      return { success: false, message: "Failed to create reservation." };
    }
  };
  