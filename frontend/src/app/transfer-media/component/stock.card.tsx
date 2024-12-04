import { StockQuantity } from "@/api/inventory/trasnfer";
import { CardStyle } from "@/app/transfer-media/component/component.css";
import Link from "next/link";

export const StockCard = async ({ stock }: { stock: StockQuantity }) => {
  return (
    <Link
      href={`/transfer-media/${stock.BranchId}/${stock.Medium.id}`}
      className={CardStyle}
    >
      <span className={"text-lg"}>
        <strong>{stock.Medium.title}</strong>
      </span>
      <div className={"mt-auto flex flex-col gap-2"}>
        <span className={"text-sm"}>
          <strong>In Stock:</strong> {stock.quantity}
        </span>
        <span className={"text-sm"}>
          <strong>Reserved:</strong> {stock.reserved}
        </span>
        <span className={"text-sm"}>
          <strong>Borrowed:</strong> {stock.borrowed}
        </span>
      </div>
    </Link>
  );
};
