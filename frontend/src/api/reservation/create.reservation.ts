import { getToken } from "@/functions/auth/getToken";
import { RESERVATION_API } from "@/lib/apiEndPoint";

export const createReservation = async (
  accountId: string,
  mediaId: string,
  branchId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = await getToken();

    if (!token) {
      console.warn("Authentication token not found.");
      return { success: false, message: "Authentication token not found." };
    }
    const response = await fetch(RESERVATION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ accountId, mediaId, branchId }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        message: error.message || "Reservation failed.",
      };
    }

    return { success: true, message: "Reservation successful!" };
  } catch (error) {
    console.warn("Error posting reservation:", error);
    return { success: false, message: "Failed to create reservation." };
  }
};
