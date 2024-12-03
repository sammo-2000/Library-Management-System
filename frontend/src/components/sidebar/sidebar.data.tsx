import React from "react";
import {
  ArrowLeftRight,
  Calendar,
  Home,
  Inbox,
  LogIn,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import { deleteToken } from "@/functions/auth/deleteToken";

export type sideBarType = {
  title: string;
  url: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

const base: sideBarType[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Plan",
    url: "/plan",
    icon: <Calendar />,
  },
  {
    title: "Search",
    url: "/search-media",
    icon: <Search />,
  },
];

export const loggedOnLinks: sideBarType[] = [
  ...base,
  {
    title: "Inbox",
    url: "#",
    icon: <Inbox />,
  },
  {
    title: "Transfer",
    url: "/transfer-media",
    icon: <ArrowLeftRight />,
  },
  {
    title: "Settings",
    url: "#",
    icon: <Settings />,
  },
  {
    title: "Logout",
    url: "/",
    icon: <LogOut />,
    onClick: deleteToken,
  },
];

export const guestLinks: sideBarType[] = [
  ...base,
  {
    title: "Login",
    url: "/login",
    icon: <LogIn />,
  },
];
