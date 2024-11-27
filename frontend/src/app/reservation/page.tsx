"use client"
// pages/reservation.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
//import { format } from "date-fns";

export default function ReservationPage() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const router = useRouter();

  const handleConfirm = () => {
    if (!pickupLocation) {
      alert("Please select a pickup location.");
      return;
    }
    alert("Reservation Confirmed!");
    // Redirect to success page or handle reservation logic
    router.push("/reservation-success");
  };

  const handleCancel = () => {
    // Redirect back or clear form
    router.push("/");
  };

  const locations = [
    { id: 1, name: "Main Library - Downtown" },
    { id: 2, name: "West Branch Library" },
    { id: 3, name: "East Branch Library" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservation</h1>
        <p className="text-gray-600 mb-6">You are about to reserve: <span className="font-bold">[Media Name]</span></p>

        {/* Pickup Location */}
        <div className="mb-4">
          <label
            htmlFor="pickupLocation"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Pickup Location:
          </label>
          <select
            id="pickupLocation"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
          >
            <option value="">Select a branch...</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* Return Date */}
        {/* <div className="mb-4">
          <label
            htmlFor="returnDate"
            className="block text-gray-700 font-medium mb-2"
          >
            Select Return Date:
          </label>
          <input
            type="date"
            id="returnDate"
            value={returnDate ? format(returnDate, "yyyy-MM-dd") : ""}
            onChange={(e) => setReturnDate(new Date(e.target.value))}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div> */}

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
