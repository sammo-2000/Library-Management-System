"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getToken } from "@/functions/auth/getToken";
import { RESERVATION_API } from "@/lib/apiEndPoint";
import { redirect, useRouter } from "next/navigation";
import CancelButton from "./cancel.button";

async function cancelReservation(
  id: string,
  onSuccess: () => void,
  onError: (error: any) => void,
) {
  const token = await getToken();
  if (!token) {
    redirect("/login");
  }

  try {
    const res = await fetch(RESERVATION_API + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      onSuccess();
    } else {
      const error = await res.json();
      if (error.message) {
        onError(error.message);
      } else {
        onError("Failed to cancel reservation");
      }
    }
  } catch (err) {
    onError("Failed to cancel reservation");
  }
}

export default function CancelSection({ id }: { id: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [isCancelled, setIsCancelled] = useState(false); // Track if the cancellation is completed
  const router = useRouter();

  const handleSuccess = () => {
    setMessage("Reservation successfully cancelled!");
    setIsCancelled(true); // Mark as cancelled
    setTimeout(() => {
      router.push("/my-reservations");
    }, 2000); // Adjust the delay (in milliseconds) as needed
  };

  const handleError = (error: string) => {
    setErrorMessage("Failed to cancel reservation. Please try again.");
  };

  const handleCancelClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmCancel = () => {
    setShowModal(false); // Close the modal
    cancelReservation(id, handleSuccess, handleError); // Proceed with cancellation
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal without cancelling
  };

  return (
    <div>
      <CancelButton
        onClick={handleCancelClick}
        id={id}
        disabled={isCancelled}
      />
      {message && (
        <p className="my-2 rounded bg-green-500 p-2 text-white">{message}</p>
      )}
      {errorMessage && (
        <p className="my-2 rounded bg-red-500 p-2 text-white">{errorMessage}</p>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="text-lg font-bold">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this reservation?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmCancel}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
