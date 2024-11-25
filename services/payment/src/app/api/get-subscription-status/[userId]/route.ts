import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/function/getUser";

export async function GET(
  request: NextRequest,
  context: { params: { userId: string } }
): Promise<Response> {
  const { userId } = context.params; // Correctly access `params`

  const user = await getUserById(userId);

  return NextResponse.json(
    { type: "Success", isActive: user && user.status === "ACTIVE" },
    { status: 200 }
  );
}
