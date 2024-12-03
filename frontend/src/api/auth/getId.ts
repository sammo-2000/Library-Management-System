"use server"
import { USERID_API } from "@/lib/apiEndPoint";
import { getServerAuth } from "@/components/Auth/ServerProtectedRoute";

export type UserInfo = {
  id: number;
  role: string;
};


export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {

    const token = await getServerAuth();
  
    if (!token) {
      console.error("Authentication token not found.");
      return null;
    }

    
    const response = await fetch(`${USERID_API}userId`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`, // Include token in the Authorization header.
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch user info:", response.statusText);
      return null;
    }

    const data: UserInfo = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
