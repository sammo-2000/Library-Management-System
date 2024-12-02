"use server";

import { cookies } from "next/headers";

export const setToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("authToken", token, {
    secure: true,
    httpOnly: true,
    expires: 1,
    path: "/",
    sameSite: "none",
  });
};
