import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  guestLinks,
  loggedOnLinks,
  sideBarType,
} from "@/components/sidebar/sidebar.data";
import { getToken } from "@/functions/auth/getToken";

export const SidebarMainContent = async () => {
  const session = await getToken();

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
