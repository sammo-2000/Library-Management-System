import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// // Set the JWT token in cookies
export const setAuthToken = (token: string) => {
  Cookies.set("authToken", token, { expires: 1, path: "/" }); // Expires in 1 day
};

