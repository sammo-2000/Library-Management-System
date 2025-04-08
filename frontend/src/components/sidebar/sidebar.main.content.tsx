import { getUserInfo } from "@/api/auth/getId";
import {
  guestLinks,
  managerLinks,
  memberLinks,
  sideBarType,
  staffLinks,
} from "@/components/sidebar/sidebar.data";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export const SidebarMainContent = async () => {
  let role = "";

  const user = await getUserInfo();
  if (user) role = user.role;

  let links: sideBarType[] = [];
  switch (role) {
    case "freeMember":
    case "paidMember":
      links = memberLinks;
      break;
    case "receptionist":
    case "callCenterOperator":
      links = staffLinks;
      break;
    case "manager":
      links = managerLinks;
      break;
    default:
      links = guestLinks;
  }

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
