"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/types/envType";


export const getServerAuth = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("authToken");
};

export const deleteToken = async () => {
  const cookieStore = await cookies();
  cookieStore.set("authToken", "", {
    maxAge: -1, // Expire immediately
    path: "/", // Ensure it's the same path as where the cookie was set
  });
  //redirect(env.BASE_URL);
};
