import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from 'js-cookie';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




// Set the JWT token in cookies
export const setAuthToken = (token: string) => {
  Cookies.set('authToken', token, { expires: 1, path: '/' }); // Expires in 1 day
};

// Get the JWT token from cookies
export const getAuthToken = () => {
  const token = Cookies.get("authToken"); // Check if token exists in cookies
  return !!token; // Return true if token is present
}

// Clear the JWT token
export const clearAuthToken = () => {
  Cookies.remove('authToken');
};
