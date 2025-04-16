"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteToken = async () => {
  (await cookies()).delete("authToken");
  redirect("/login");
};
