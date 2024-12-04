import React from "react";
import {
  Calendar,
  ChartCandlestick,
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

export const guestLinks: sideBarType[] = [
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
  {
    title: "Login",
    url: "/login",
    icon: <LogIn />,
  },
];

export const memberLinks: sideBarType[] = [
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
  {
    title: "Inbox",
    url: "#",
    icon: <Inbox />,
  },
  {
    title: "My Reservations",
    url: "/my-reservations",
    icon: <Calendar />,
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

export const staffLinks: sideBarType[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Search",
    url: "/search-media",
    icon: <Search />,
  },
  {
    title: "Inbox",
    url: "#",
    icon: <Inbox />,
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

export const managerLinks: sideBarType[] = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Search",
    url: "/search-media",
    icon: <Search />,
  },
  {
    title: "Inbox",
    url: "#",
    icon: <Inbox />,
  },
  {
    title: "View Stock",
    url: "/view-stock",
    icon: <ChartCandlestick />,
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
