"use server"
import { USERID_API } from "@/lib/apiEndPoint";
import { cookies } from "next/headers"; // Import cookies from Next.js for server-side token retrieval.
import { getServerAuth } from "@/components/Auth/ServerProtectedRoute";

export type UserInfo = {
  id: number;
  role: string;
};


export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    // Retrieve the token from the server-side cookies.
    const token = await getServerAuth();
   // console.log(token)

    if (!token) {
      console.error("Authentication token not found.");
      return null;
    }

    // Make the API request to fetch user information.
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
    console.log(`data.id: ${data.id}`)
    console.log(`data.role: ${data.role}`)
    return data; // Return the parsed user information.

  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
