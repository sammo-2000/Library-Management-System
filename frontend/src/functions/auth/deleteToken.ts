"use server";

import { cookies } from "next/headers";

export const deleteToken = async () => {
  (await cookies()).delete("authToken");
};
