import { Reservation } from "@/types/reservationServiceTypes";
import { GridStyle } from "./component.css";
import { ReservationCard } from "./reservation.card";

export const ReservationList = async ({
  reservations,
}: {
  reservations: Reservation[];
}) => {
  return (
    <div className={GridStyle}>
      {reservations.map((reservation) => {
        return (
          <ReservationCard key={reservation.id} reservation={reservation} />
        );
      })}
    </div>
  );
};
