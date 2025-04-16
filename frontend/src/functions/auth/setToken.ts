"use server";

import { cookies } from "next/headers";

export const setToken = async (token: string) => {
  const now = new Date();
  const cookieStore = await cookies();

  cookieStore.set({
    name: "authToken",
    value: token,
    secure: true,
    httpOnly: true,
    expires: new Date(now.getTime() + 24 * 60 * 60 * 1000),
    path: "/",
    sameSite: "strict",
  });
};
