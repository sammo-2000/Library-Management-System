import Link from "next/link";
import { UserType } from "@/functions/auth/decodeJWT";
import { isSubscriptionActive } from "@/api/subscription/get.subscription.status";

export const FooterName = ({ user }: { user: UserType | null }) => {
  return (
    <span className={"font-bold"}>{user ? user.name : "Not logged on"}</span>
  );
};

export const FooterUser = async ({ user }: { user: UserType }) => {
  const isActive = await isSubscriptionActive(user.userId);
  return (
    <>
      {isActive ? (
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
    </>
  );
};

export const FooterNoUser = () => {
  return (
    <Link href={"/login"} className={"text-sm text-muted-foreground underline"}>
      Login
    </Link>
  );
};
