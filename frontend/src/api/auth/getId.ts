"use server";
import { SIGN_API, USERID_API } from "@/lib/apiEndPoint";

import { deleteToken } from "@/functions/auth/deleteToken";
import { getToken } from "@/functions/auth/getToken";

export type UserInfo = {
  id: number;
  role: string;
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const token = await getToken();
    if (!token) return null;

    const response = await fetch(`${USERID_API}userId`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      await deleteToken();
      return null;
    }

    const data: UserInfo = await response.json();

    if (!data) return null;

    return data;
  } catch (error) {
    return null;
  }
};

interface Session {
  jti: string;
  token: string;
  userId: number;
  created_at: string;
}

export const getSessions = async (): Promise<Session[]> => {
  try {
    const token = await getToken();
    if (!token) return [];

    const response = await fetch(`${SIGN_API}sessions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch sessions");
      return [];
    }

    const data: Session[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return [];
  }
};

export const deleteSessions = async (sessionId: string): Promise<string[]> => {
  try {
    const token = await getToken();
    if (!token) return [];

    const response = await fetch(`${SIGN_API}sessions/${sessionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch sessions");
      return [];
    }

    const data: { message: string[] } = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return [];
  }
};
