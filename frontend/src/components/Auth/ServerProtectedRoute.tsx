"use server";

import { cookies } from "next/headers";


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
  
};
