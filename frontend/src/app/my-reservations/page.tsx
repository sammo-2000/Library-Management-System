import { RESERVATION_API } from "@/lib/apiEndPoint";
import { getToken } from "@/functions/auth/getToken";
import { Reservation } from "@/types/reservationServiceTypes";
import { ReservationList } from "./reservation.list";
import { redirect } from "next/navigation";

async function getReservations() {
  const token = await getToken();
  console.log("Token:" + token);
  if (!token) {
    redirect("/login");
  } else {
    const res = await fetch(RESERVATION_API + "?collected=false", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Failed to fetch reservations");
      console.log(await res.json());
      return null;
    }
    const reservations: Reservation[] = await res.json();
    console.log(reservations[0]);
    return reservations;
  }
}
export default async function MyReservationsPage() {
  const reservations = await getReservations();
  return (
    <div>
      <div className="rounded bg-white p-4 shadow">
        <h1 className="text-3xl">
          <strong>My Reservations</strong>
        </h1>
      </div>
      {reservations ? (
        <ReservationList reservations={reservations} />
      ) : (
        <div className="bg-white p-4 text-xl">No reservations found</div>
      )}
    </div>
  );
}
