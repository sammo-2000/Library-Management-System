import "server-only";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { BranchList } from "@/app/view-stock/component/branch.list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select Branch To Start Transfer",
};

const SearchBranches = dynamic(() =>
  import("./component/branch.search").then(
    (component) => component.BranchSearch,
  ),
);

export default async function SelectBranch({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const branchName = (await searchParams).branchName;
  if (Array.isArray(branchName)) return notFound();

  return (
    <div>
      <SearchBranches branchName={branchName} />
      <BranchList branchName={branchName} />
    </div>
  );
}
