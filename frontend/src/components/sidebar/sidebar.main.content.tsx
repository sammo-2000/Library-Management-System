import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import { getServerAuth } from "@/components/Auth/ServerProtectedRoute";
import {
  guestLinks,
  loggedOnLinks,
  sideBarType,
} from "@/components/sidebar/sidebar.data";

export const SidebarMainContent = async () => {
  const session = await getServerAuth();

  const links: sideBarType[] = session ? loggedOnLinks : guestLinks;

  return (
    <>
      {links.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            variant={"outline"}
            onClick={item.onClick || undefined}
          >
            <Link href={item.url}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};
