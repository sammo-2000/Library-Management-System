"use client"
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { getAuthToken } from '../../lib/utils';
// import { parseCookies } from "nookies";


// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const router = useRouter();

//   useEffect(() => {
//     const token = getAuthToken();
//     if (!token) {
//       router.push('/login'); // Redirect to sign-in if token is missing
//     }
//   }, []);

//   return <>{children}</>;
// };


// export function isAuthenticated() {
//   const cookies = parseCookies();
//   return cookies.authToken ? true : false;
// }


export const getClientAuth = (): string | boolean => {
  if (typeof document === 'undefined') {
    console.error('getClientAuth called outside of browser context.');
    return false;
  }

  const cookieString = document.cookie;

  if (!cookieString) {
    return false; // No cookies present
  }

  const cookies: Record<string, string> = cookieString.split('; ').reduce((acc, currentCookie) => {
    const [key, value] = currentCookie.split('=');
    acc[key] = decodeURIComponent(value || ''); // Handle undefined value and decode
    return acc;
  }, {} as Record<string, string>);

  return cookies['authToken'] || false;
};



