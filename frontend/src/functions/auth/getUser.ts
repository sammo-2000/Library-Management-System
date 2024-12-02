"use server";

import { getToken } from "@/functions/auth/getToken";
import { decodeJWT } from "@/functions/auth/decodeJWT";

export const getUser = async () => {
  const token = await getToken();
  return decodeJWT(token);
};
