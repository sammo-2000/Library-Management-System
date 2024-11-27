"use client"


import { useEffect, useState } from 'react';

const useClientAuth = (): string | boolean => {
  const [authToken, setAuthToken] = useState<string | boolean>(false);

  useEffect(() => {
    const cookieString = document.cookie;

    if (!cookieString) {
      setAuthToken(false); // No cookies present
      return;
    }

    const cookies: Record<string, string> = cookieString.split('; ').reduce((acc, currentCookie) => {
      const [key, value] = currentCookie.split('=');
      acc[key] = decodeURIComponent(value || ''); // Handle undefined value and decode
      return acc;
    }, {} as Record<string, string>);

    setAuthToken(cookies['authToken'] || false);
  }, []);

  return authToken;
};

export default useClientAuth;
