import "server-only";

import { getToken } from "@/functions/auth/getToken";
import { env } from "@/types/envType";
import { notFound, redirect } from "next/navigation";

type Permissions = {
  transfer: boolean;
};

export const getTransferPermissions = async (): Promise<Permissions> => {
  const token = await getToken();

  if (!token) redirect("/login");

  const response = await fetch(`${env.AUTH_SERVICE_BASE_URL}users-permission`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      service: "inventory",
    }),
  });

  const data: { error; permission } = await response.json();

  if (data.error) return notFound();

  return data.permission.transferMedia;
};
