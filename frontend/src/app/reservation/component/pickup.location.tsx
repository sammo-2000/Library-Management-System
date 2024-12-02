import React from "react";
import { Branch } from "@/api/inventory/branch";

type ListBranchesProps = {
  branches: Branch[];
  onChange: (branchId: string, branchName: string) => void;
};

const ListBranches = ({ branches, onChange }: ListBranchesProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="pickupLocation"
        className="block text-gray-700 font-medium mb-2"
      >
        Select Pickup Location:
      </label>
      <select
        id="pickupLocation"
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue) {
            // Split the value to extract branchId and branchName
            const [branchId, branchName] = selectedValue.split("|");
            onChange(branchId, branchName);
          } else {
            onChange("", "");
          }
        }}
        className="w-full border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mb-2"
      >
        <option value="">Select a branch...</option>
        {branches.map((branch) => (
          <option key={branch.id} value={`${branch.id}|${branch.name}`}>
            {branch.name} ({branch.City.city})
          </option>
        ))}
      </select>
    </div>
  );
};

export default ListBranches;
