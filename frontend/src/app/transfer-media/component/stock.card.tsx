import { StockQuantity } from "@/api/inventory/trasnfer";
import { CardStyle } from "@/app/transfer-media/component/component.css";
import Link from "next/link";
import { getReservedQuantity } from "@/api/reservation/get.reserved.quantity";
import { getBorrowQuantity } from "@/api/borrow/get.borrow.quantity";

export const StockCard = async ({ item }: { item: StockQuantity }) => {
  const stock = item.Medium;
  const reservedQuantity = await getReservedQuantity(
    item.MediaId,
    item.BranchId,
  );
  const borrowQuantity = await getBorrowQuantity(item.MediaId, item.BranchId);

  return (
    <Link
      href={`/transfer-media/${item.BranchId}/${stock.id}`}
      className={CardStyle}
    >
      <span className={"text-lg"}>
        <strong>{stock.title}</strong>
      </span>
      <div className={"mt-auto flex flex-col gap-2"}>
        <span className={"text-sm"}>
          <strong>In Stock:</strong> {item.quantity}
        </span>
        <span className={"text-sm"}>
          <strong>Reserved:</strong> {reservedQuantity}
        </span>
        <span className={"text-sm"}>
          <strong>Borrowed:</strong> {borrowQuantity}
        </span>
      </div>
    </Link>
  );
};
