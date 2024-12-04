import { Reservation } from "@/types/reservationServiceTypes";
import { CardStyle } from "./component.css";
import Link from "next/link";
import { INVENTORY_API } from "@/lib/apiEndPoint";
import { Media } from "@/types/inventoryServiceTypes";
import { Branch } from "@/api/inventory/branch";

export async function getMediaAndBranch(mediaId: string, branchId: string) {
  try {
    const [mediaRes, branchRes] = await Promise.all([
      fetch(INVENTORY_API + "media/" + mediaId),
      fetch(INVENTORY_API + "branches/" + branchId),
    ]);
    const [media, branch]: [media: Media, branch: Branch] = await Promise.all([
      mediaRes.json(),
      branchRes.json(),
    ]);
    return { media, branch };
  } catch (error) {
    console.error("Failed to fetch data");
    return { media: null, branch: null };
  }
}

export async function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}) {
  const { media, branch } = await getMediaAndBranch(
    reservation.mediaId,
    reservation.branchId,
  );
  return (
    <Link href={`/my-reservations/${reservation.id}`} className={CardStyle}>
      <div className="text-sm text-gray-400">
        Reservation ID: {reservation.id}
      </div>
      <div>
        <strong>Media: </strong>
        {media ? media.title : "Media not found"}
      </div>
      <div>
        <strong>from </strong> {branch ? branch.name : "Branch not found"}
      </div>
    </Link>
  );
}
