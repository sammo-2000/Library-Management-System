import { getToken } from "@/functions/auth/getToken";
import { redirect } from "next/navigation";
import { RESERVATION_API } from "@/lib/apiEndPoint";

export const getReservedQuantity = async (
  mediaId: number,
  branchId: number,
): Promise<number> => {
  try {
    const token = await getToken();

    if (!token) redirect("/login");

    const response = await fetch(
      `${RESERVATION_API}?mediaId=${mediaId}&branchId=${branchId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    console.log(data.length);

    return data.length ? data.length : 0;
  } catch (error) {
    console.error(error);
    return -1;
  }
};
