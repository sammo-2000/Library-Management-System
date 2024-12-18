"use client";

import { Button } from "@/components/ui/button";
import { getToken } from "@/functions/auth/getToken";
import { RESERVATION_API } from "@/lib/apiEndPoint";
import { redirect } from "next/navigation";
import { MouseEventHandler } from "react";

async function cancelReservation(id: string) {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }
  const res = await fetch(RESERVATION_API + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    redirect("/my-reservations");
  } else {
    const error = await res.json();
    console.error("Failed to cancel reservation", error);
  }
}

export default function CancelButton({
  id,
  onClick,
  disabled,
}: {
  id: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      className="bg-red-600 p-4 text-white hover:bg-red-700"
      disabled={disabled}
    >
      Cancel Reservation
    </Button>
  );
}
