// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuthToken, clearAuthToken } from "@/lib/utils";

interface AuthContextProps {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(getAuthToken()); // Check if token exists on mount
  }, []);

  const login = () => {
    setAuthenticated(true); // Update state to logged in
  };

  const logout = () => {
    clearAuthToken(); // Clear the token
    setAuthenticated(false); // Update state to logged out
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
