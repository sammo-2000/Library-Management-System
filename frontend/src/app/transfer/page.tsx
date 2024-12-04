import "server-only";
import { Metadata } from "next";
import { getAllBranches } from "@/api/inventory/branch";
import { getAllMedias } from "@/api/inventory/get.all.medias";
import { TransferMedia } from "@/app/transfer/components/transferMedia";

export const metadata: Metadata = {
  title: "Type amount to transfer between branches",
};

export default async function SelectStockPage() {
  const branches = await getAllBranches();
  const medias = await getAllMedias();

  if (typeof medias === "string") return <div>{medias}</div>;

  return <TransferMedia branches={branches} medias={medias.media} />;
}
