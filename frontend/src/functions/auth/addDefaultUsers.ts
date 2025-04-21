"use server";

import { SIGN_API } from "@/lib/apiEndPoint";

export const addDefaultUsers = async () => {
  try {
    await fetch(`${SIGN_API}accounts/set-default`);
  } catch {}
};
