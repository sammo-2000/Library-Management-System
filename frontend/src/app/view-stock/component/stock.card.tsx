import { StockQuantity } from "@/api/inventory/stock.by.branch.id";
import { CardStyle } from "@/app/view-stock/component/component.css";

export const StockCard = async ({ stock }: { stock: StockQuantity }) => {
  return (
    <div className={CardStyle}>
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
    </div>
  );
};
