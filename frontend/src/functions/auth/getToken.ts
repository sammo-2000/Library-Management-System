"use server";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const getToken = async (): Promise<string> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) return notFound();

  return authToken.value;
};
