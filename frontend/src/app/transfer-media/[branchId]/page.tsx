import "server-only";
import { Metadata } from "next";
import { StockPageTitle } from "@/app/transfer-media/component/stock.page.title";
import { ListStocks } from "@/app/transfer-media/component/stock.list";

export const metadata: Metadata = {
  title: "Select Stock To Begin Transfer",
};

export default async function SelectStockPage({
  params,
}: {
  params: Promise<{ branchId: string }>;
}) {
  const branchId = (await params).branchId;

  return (
    <div>
      <StockPageTitle branchId={branchId} />

      <ListStocks branchId={branchId} />
    </div>
  );
}
