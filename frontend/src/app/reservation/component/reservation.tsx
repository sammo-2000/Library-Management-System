"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListBranches from "./pickup.location";
import { fetchBranches } from "../function/fetch.branches";
import { handleConfirm } from "../function/handleConfirm";
import { Branch } from "@/api/inventory/branch";
import { getUserInfo } from "@/api/auth/getId";

export default function ReservationLogic() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>(""); // Store branch ID
  const [selectedBranchName, setSelectedBranchName] = useState<string>(""); // Store branch name
  const [accountId, setAccountId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeData = async () => {
      // Fetch accountId
      const userInfo = await getUserInfo();
      console.log(userInfo?.id)
      setAccountId(userInfo?.id || null);

      // Fetch branches
      const branchData = await fetchBranches();
      setBranches(branchData);
    };

    initializeData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservation</h1>
        <p className="text-gray-600 mb-6">
          You are about to reserve: <span className="font-bold">[Media Name]</span>
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
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm(accountId, selectedBranchId, router)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}