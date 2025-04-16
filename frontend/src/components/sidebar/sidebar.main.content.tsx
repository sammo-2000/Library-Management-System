import { getAuthUser } from "@/api/auth/getId";
import {
  guestLinks,
  managerLinks,
  memberLinks,
  memberWithLogout,
  sideBarType,
  staffLinks,
} from "@/components/sidebar/sidebar.data";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";

export const SidebarMainContent = async () => {
  let role = "";

  const user = await getAuthUser();
  console.log(user);
  if (user && typeof user !== "string") role = user.role;
  if (user && user === "Session not verified") role = "memberWithLogout";

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
    case "memberWithLogout":
      links = memberWithLogout;
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
