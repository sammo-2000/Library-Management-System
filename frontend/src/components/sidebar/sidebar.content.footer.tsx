import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isSubscriptionActive } from "@/api/subscription/get.subscription.status";
import Link from "next/link";

export const SidebarContentFooter = async () => {
  return (
    <div className={"flex items-center gap-2"}>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <span className={"font-bold"}> USER-NAME </span>
        {(await isSubscriptionActive("1")) ? (
          <span className={"text-sm text-muted-foreground"}>
            Subscription active
          </span>
        ) : (
          <Link
            href={"/plan"}
            className={"text-sm text-muted-foreground underline"}
          >
            Subscription inactive
          </Link>
        )}
      </div>
    </div>
  );
};
