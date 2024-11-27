import { getTransferPermissions } from "@/api/auth/primission";
import { notFound } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const transfer = await getTransferPermissions();

  if (!transfer) {
    notFound();
  }

  return <>{children}</>;
}
