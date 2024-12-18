import { getToken } from "@/functions/auth/getToken";
import { RESERVATION_API } from "@/lib/apiEndPoint";
import { Reservation } from "@/types/reservationServiceTypes";
import { getMediaAndBranch } from "../reservation.card";
import { formatDate } from "@/helpers/dates";
import { redirect } from "next/navigation";
import CancelButton from "./cancel.button";
import CancelSection from "./cancel.section";

async function getReservationById(id: string, token: string) {
  const res = await fetch(RESERVATION_API + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    return null;
  }
  const reservation: Reservation = await res.json();
  return reservation;
}

export default async function ReservationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }
  const reservation = await getReservationById(id, token);
  if (!reservation) {
    return <div>Reservation not found</div>;
  }
  const { media, branch } = await getMediaAndBranch(
    reservation.mediaId,
    reservation.branchId,
  );
  const reservationStatus = reservation.collectedAt
    ? "Collected"
    : reservation.notificationSent
      ? "Ready for Pickup"
      : "Waiting for Availability";
  return (
    <div className="h-4/5 rounded bg-white p-8 text-lg">
      <h1>
        <strong>ReservationID:</strong> {id}
      </h1>
      <h2>
        <strong>Reservation for:</strong> {media?.title}
      </h2>
      <h2>
        <strong>Branch:</strong> {branch?.name}
      </h2>
      <h2>
        <strong>Reserved on:</strong> {formatDate(reservation.reservedAt)}
      </h2>
      <h2>
        <strong>Status:</strong> {reservationStatus}
      </h2>
      <CancelSection id={id} />
    </div>
  );
}
