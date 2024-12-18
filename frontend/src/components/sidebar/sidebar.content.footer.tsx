import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUser } from "@/functions/auth/getUser";
import {
  FooterName,
  FooterNoUser,
  FooterUser,
} from "@/components/sidebar/sidebar.content.user.footer";

export const SidebarContentFooter = async () => {
  const user = await getUser();

  return (
    <div className={"flex items-center gap-2"}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className={"flex flex-col"}>
        <FooterName user={user} />

        {user ? <FooterUser user={user} /> : <FooterNoUser />}
      </div>
    </div>
  );
};
