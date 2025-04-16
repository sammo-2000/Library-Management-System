import { deleteToken } from "@/functions/auth/deleteToken";
import {
  Calendar,
  ChartCandlestick,
  Home,
  Inbox,
  Lock,
  LogIn,
  LogOut,
  Search,
  Settings,
  TabletSmartphone,
} from "lucide-react";
import React from "react";

export type sideBarType = {
  title: string;
  url: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export const memberWithLogout: sideBarType[] = [
  {
    title: "Logout",
    url: "/",
    icon: <LogOut />,
    onClick: deleteToken,
  },
];

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
  {
    title: "Sign Up",
    url: "/sign-up",
    icon: <Lock />,
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
    title: "Sessions",
    url: "/sessions",
    icon: <TabletSmartphone />,
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
    title: "Sessions",
    url: "/sessions",
    icon: <TabletSmartphone />,
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
    title: "Sessions",
    url: "/sessions",
    icon: <TabletSmartphone />,
  },
  {
    title: "Logout",
    url: "/",
    icon: <LogOut />,
    onClick: deleteToken,
  },
];
