import "server-only";
import { Metadata } from "next";
import { getAllBranches } from "@/api/inventory/branch";
import { getAllMedias } from "@/api/inventory/get.all.medias";
import { TransferMedia } from "@/app/transfer/components/transferMedia";

export const metadata: Metadata = {
  title: "Type amount to transfer between branches",
};

export default async function SelectStockPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const branchId = (await params).branchId;

  const branches = await getAllBranches();
  const currentBranch = branches.filter((_) => _.id === Number(branchId));
  const otherBranches = branches.filter((_) => _.id !== Number(branchId));
  const medias = await getAllMedias();

  if (typeof medias === "string") return <div>{medias}</div>;

  return (
    <TransferMedia
      currentBranch={currentBranch[0]}
      otherBranches={otherBranches}
      medias={medias}
    />
  );
}
