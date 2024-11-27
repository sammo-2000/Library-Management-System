import "server-only";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { ListBranches } from "@/app/transfer-media/component/list.branches";

const SearchBranches = dynamic(() =>
  import("./component/search.branches").then(
    (component) => component.SearchBranches,
  ),
);

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const branchName = (await searchParams).branchName;
  if (Array.isArray(branchName)) return notFound();

  return (
    <div>
      <SearchBranches branchName={branchName} />
      <ListBranches branchName={branchName} />
    </div>
  );
}
