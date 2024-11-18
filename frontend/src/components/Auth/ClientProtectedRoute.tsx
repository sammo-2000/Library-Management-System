"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '../../lib/utils';
import { parseCookies } from "nookies";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login'); // Redirect to sign-in if token is missing
    }
  }, []);

  return <>{children}</>;
};


export function isAuthenticated() {
  const cookies = parseCookies();
  return cookies.authToken ? true : false;
}



