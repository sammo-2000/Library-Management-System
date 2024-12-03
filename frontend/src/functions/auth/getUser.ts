"use server";

import { getToken } from "@/functions/auth/getToken";
import { decodeJWT } from "@/functions/auth/decodeJWT";

export const getUser = async () => {
  const token = await getToken();
  if (!token) return null;
  return decodeJWT(token);
};
