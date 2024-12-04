import "server-only";
import { getStockQuantityForBranchById } from "@/api/inventory/stock.by.branch.id";
import { StockCard } from "@/app/view-stock/component/stock.card";
import { GridStyle } from "@/app/view-stock/component/component.css";

export const ListStocks = async ({ branchId }: { branchId: string }) => {
  const stocks = await getStockQuantityForBranchById(branchId);

  if (!stocks) return <div>No stock found for given branch</div>;

  return (
    <div className={GridStyle}>
      {stocks.map((stock) => {
        return <StockCard key={stock.MediaId} stock={stock} />;
      })}
    </div>
  );
};
