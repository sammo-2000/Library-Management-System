import { Branch } from "@/api/inventory/branch";
import Link from "next/link";

export const BranchCard = ({ branch }: { branch: Branch }) => {
  return (
    <Link
      href={`/transfer-media/${branch.id}`}
      className={
        "flex flex-col gap-2 rounded-lg border-2 bg-card p-4 shadow transition-all hover:scale-105 hover:border-primary"
      }
    >
      <span>
        <strong>Branch Name: </strong>
        {branch.name}
      </span>
      <span>
        <strong>located in</strong> {branch.City.city}
      </span>
    </Link>
  );
};
