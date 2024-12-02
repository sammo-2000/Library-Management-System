"use server";

import { cookies } from "next/headers";

export const getToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken");

  if (!authToken) return null;

  return authToken.value;
};
