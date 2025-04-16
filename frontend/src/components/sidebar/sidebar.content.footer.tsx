import { getUserInfo } from "@/api/auth/getId";
import {
  FooterName,
  FooterNoUser,
  FooterUser,
} from "@/components/sidebar/sidebar.content.user.footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/functions/auth/getUser";

export const SidebarContentFooter = async () => {
  const isLoggedOn = await getUserInfo();
  const user = await getUser();

  return (
    <div className={"flex items-center gap-2"}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className={"flex flex-col"}>
        <FooterName user={user} />

        {isLoggedOn && user ? <FooterUser user={user} /> : <FooterNoUser />}
      </div>
    </div>
  );
};
