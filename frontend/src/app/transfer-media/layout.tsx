import { Metadata } from "next";
import { getUser } from "@/functions/auth/getUser";

export const metadata: Metadata = {
  title: "Transfer Media",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const transfer = await getTransferPermissions();
  const transfer = await getUser();

  console.log(transfer);

  return <>{children}</>;
}
