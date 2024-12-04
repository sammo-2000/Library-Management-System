import "server-only";
import { getStockQuantityForBranchById } from "@/api/inventory/trasnfer";
import { StockCard } from "@/app/transfer-media/component/stock.card";
import { GridStyle } from "@/app/transfer-media/component/component.css";

export const ListStocks = async ({ branchId }: { branchId: string }) => {
  const stocks = await getStockQuantityForBranchById(branchId);

  if (!stocks) return <div>No stock found for given branch</div>;

  return (
    <div className={GridStyle}>
      {stocks.map((stock) => {
        return <StockCard key={stock.MediaId} item={stock} />;
      })}
    </div>
  );
};
