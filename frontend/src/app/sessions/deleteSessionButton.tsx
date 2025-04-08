"use client";
import { deleteSessions } from "@/api/auth/getId";
import { Button } from "@/components/ui/button";
import { deleteToken } from "@/functions/auth/deleteToken";
import { useState } from "react";

const DeleteSessionButton = ({ session, index }) => {
  const [deleted, setDeleted] = useState(false);
  const handleLogout = async () => {
    if (index === -1) await deleteToken();
    const data = await deleteSessions(session.jti);
    if (data.length !== 0) setDeleted(true);
  };

  if (deleted) return null;

  return (
    <div
      className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"} flex items-center justify-between rounded-lg p-4`}
    >
      <div>{index === -1 ? "Current Sessions" : `Session ${index + 1}`}</div>

      <Button variant={"destructive"} onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default DeleteSessionButton;
