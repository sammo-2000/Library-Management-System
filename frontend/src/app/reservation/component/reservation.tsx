"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ListBranches from "./pickup.location";
import { fetchBranches } from "../function/fetch.branches";
import { handleConfirm } from "../function/handleConfirm";
import { Branch } from "@/api/inventory/branch";
import { getUser } from "@/functions/auth/getUser";

export default function ReservationLogic() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(""); // Store branch ID
  const [selectedBranchName, setSelectedBranchName] = useState<string>(""); // Store branch name
  const [accountId, setAccountId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeData = async () => {
      // Fetch accountId
      const userInfo = await getUser();
      setAccountId(userInfo.userId);

      // Fetch branches
      const branchData = await fetchBranches();
      setBranches(branchData);
    };

    initializeData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Reservation
        </h1>
        <p className="mb-6 text-gray-600">
          You are about to reserve:{" "}
          <span className="font-bold">[Media Name]</span>
        </p>

        {/* Pickup Location Dropdown */}
        <ListBranches
          branches={branches}
          onChange={(branchId, branchName) => {
            setSelectedBranchId(branchId);
            setSelectedBranchName(branchName);
          }}
        />

        {/* Confirm and Cancel Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => router.push("/")}
            className="rounded-md bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm(accountId, selectedBranchId, router)}
            className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
