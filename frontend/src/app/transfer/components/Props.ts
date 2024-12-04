import { Branch } from "@/api/inventory/branch";
import { Media } from "@/types/inventoryServiceTypes";

export type TransferProps = {
  currentBranch: Branch;
  otherBranches: Branch[];
  medias: Media[];
};
