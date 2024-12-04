import { Branch } from "@/api/inventory/branch";
import Link from "next/link";
import { CardStyle } from "@/app/view-stock/component/component.css";

export const BranchCard = ({ branch }: { branch: Branch }) => {
  return (
    <Link href={`/view-stock/${branch.id}`} className={CardStyle}>
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
