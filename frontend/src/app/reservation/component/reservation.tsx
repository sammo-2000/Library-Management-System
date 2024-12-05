"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Add useSearchParams for query parameters
import ListBranches from "./pickup.location";
import { fetchBranches } from "../function/fetch.branches";
import { handleConfirm } from "../function/handleConfirm";
import { Branch } from "@/api/inventory/branch";
import { getUserInfo } from "@/api/auth/getId";
import { getStockQuantity } from "@/api/inventory/stock.quantity";
import { toast } from "sonner";

export default function ReservationLogic() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [selectedBranchName, setSelectedBranchName] = useState<string>("");
  const [accountId, setAccountId] = useState<number | null | undefined>(null);
  const [mediaName, setMediaName] = useState<string>(""); 
  const [mediaId, setMediaId] = useState<string>(""); 
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters

  useEffect(() => {
    const initializeData = async () => {
      // Fetch accountId
      const userInfo = await getUserInfo();
      setAccountId(userInfo?.id);

      // Fetch branches
      const branchData = await fetchBranches();
      setBranches(branchData);

      // Set media details from query parameters
      const mediaId = searchParams.get("mediaId") || "";
      const mediaName = searchParams.get("mediaName") || "";
      setMediaId(mediaId);
      setMediaName(mediaName);
    };

    initializeData();
  }, [searchParams]);

  useEffect(() => {
    const fetchStockQuantity = async () => {
      if (mediaId && selectedBranchId) {
        const quantity = await getStockQuantity(parseInt(selectedBranchId), parseInt(mediaId));
        setStockQuantity(quantity);
      }
    };
    fetchStockQuantity();
  }, [mediaId, selectedBranchId]);
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Reservation
        </h1>
        <p className="mb-6 text-gray-600">
          You are about to reserve: <span className="font-bold ml-3 bg-gray-100 p-1 rounded">{mediaName}</span>
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
            onClick={() => router.push("/search-media")}
            className="rounded-md bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600"
          >
            Cancel
          </button>
          {stockQuantity !== null && stockQuantity >= 1 ? (
      <button
        onClick={() => handleConfirm(accountId, selectedBranchId, router, mediaId)}
        className="rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600"
      >
        Confirm Reservation
      </button>
    ) : (
      <button
        onClick={() => toast("You have been added to the waitlist.")}
        className="rounded-md bg-yellow-500 px-4 py-2 text-white shadow hover:bg-yellow-600"
      >
        Join Waitlist
      </button>
    )}
        </div>
      </div>
    </div>
  );
}
