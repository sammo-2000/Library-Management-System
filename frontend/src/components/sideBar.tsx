"use client";

import { Calendar, Home, Inbox, Search, Settings, LogIn, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/Auth/AuthContext";

const baseItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Plan",
    url: "/plan",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { authenticated, logout } = useAuth();

  const authItem = authenticated
    ? {
        title: "Logout",
        url: "#",
        icon: LogOut,
        onClick: logout,
      }
    : {
        title: "Login",
        url: "/login",
        icon: LogIn,
        onClick: null, // No action for login
      };

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent className="p-2">
        {baseItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild variant={"outline"}>
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {/* Add Login/Logout button dynamically */}
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            variant={"outline"}
            onClick={authItem.onClick || undefined} // Call onClick if present
          >
            <a href={authItem.url}>
              <authItem.icon />
              <span>{authItem.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>

      <SidebarFooter>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SidebarFooter>
    </Sidebar>
  );
}
