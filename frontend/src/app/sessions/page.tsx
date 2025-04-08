import { getSessions } from "@/api/auth/getId";
import { getToken } from "@/functions/auth/getToken";
import { redirect } from "next/navigation";
import DeleteSessionButton from "./deleteSessionButton";

const SessionPage = async () => {
  const token = await getToken();
  if (!token) redirect("/login");
  const sessions = await getSessions();
  const currentSession = sessions.find((session) => session.token === token);

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold text-primary">Current sessions</h1>
      <DeleteSessionButton session={currentSession} index={-1} />

      <h2 className="text-xl font-bold text-secondary-foreground">
        Other sessions
      </h2>
      {sessions.map((session, index) => {
        if (session.token === token) return null;
        else
          return (
            <DeleteSessionButton key={index} session={session} index={index} />
          );
      })}
    </div>
  );
};

export default SessionPage;
