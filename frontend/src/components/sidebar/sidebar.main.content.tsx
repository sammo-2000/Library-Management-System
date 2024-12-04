import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  guestLinks,
  managerLinks,
  memberLinks,
  sideBarType,
  staffLinks,
} from "@/components/sidebar/sidebar.data";
import { getToken } from "@/functions/auth/getToken";
import { decodeJWT } from "@/functions/auth/decodeJWT";

export const SidebarMainContent = async () => {
  const token = await getToken();
  let role = "";
  if (token) {
    const user = decodeJWT(token);
    role = user.role;
  }

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
