import {
  Calendar,
  Home,
  Inbox,
  LogIn,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  deleteToken,
  getServerAuth,
} from "@/components/Auth/ServerProtectedRoute";

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

export async function AppSidebar() {
  // const { authenticated, logout } = useAuth();

  const authItem = (await getServerAuth())
    ? {
        title: "Logout",
        url: "#",
        icon: LogOut,
        onClick: deleteToken,
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
