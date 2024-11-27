import {NextResponse} from "next/server";
import {getUserById} from "@/function/getUser";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;

  const user = await getUserById(userId);

  return NextResponse.json(
      { type: "Success", isActive: user && user.status === "ACTIVE" ? true : false },
      { status: 200 }
  );
}