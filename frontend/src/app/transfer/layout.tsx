import { Metadata } from "next";
import { getTransferPermissions } from "@/api/auth/permission/getTransferPermission";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Transfer Media",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const transfer = await getTransferPermissions();
  if (!transfer.transfer) redirect("/");

  return <>{children}</>;
}
