import { Branch } from "@/api/inventory/branch";
import { Media } from "@/api/inventory/get.all.medias";

export type TransferProps = {
  branches: Branch[];
  medias: Media[];
};
