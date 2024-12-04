import ReservationLogic from "./component/reservation";
import { getUser } from "@/functions/auth/getUser";
import { redirect } from "next/navigation";

export default async function ReservationPage() {
  const user = await getUser();
  if (!user) redirect("/login");

  return (  
     <div>
      <ReservationLogic/>
    </div>
  );
}
