import { RESERVATION_API } from "@/lib/apiEndPoint";
import { getToken } from "@/functions/auth/getToken";
import { cookies } from "next/headers";

async function getReservations() {
  const token = await getToken();
  if (!token) {
    console.log("No token found");
  } else {
    const res = await fetch("http://localhost:3004/api/reservation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Failed to fetch reservations");
      console.log(await res.json());
    }
    const reservations = await res.json();
    console.log("Reservations:" + reservations);
    return reservations;
  }
}
export default async function MyReservationsPage() {
  const reservations = await getReservations();
  return <div>page</div>;
}
