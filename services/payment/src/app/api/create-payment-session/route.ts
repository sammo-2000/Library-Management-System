import { catchError } from "@/function/catchError";
import { createPaymentSession } from "@/function/createPaymentSession";
import { validateBody } from "@/function/validateBody";
import { NextRequest, NextResponse } from "next/server";
import {getUserById} from "@/function/getUser";

export async function POST(request: NextRequest) {
  // Get body from request
  const body = await request.json();

  // Validate body
  const data = await validateBody(body);
  if (typeof data === "string") {
    return NextResponse.json(
      { type: "Fail", message: { error: data } },
      { status: 400 }
    );
  }

  // Get user current status
  const user = await getUserById(data.userId);
  if (user && user.status === "ACTIVE") return NextResponse.json(
      { type: "Fail", message: { error: 'User already have an active account' } },
      { status: 400 }
  );

  // Create payment session
  const [error, session] = await catchError(
    createPaymentSession(data)
  );

  if (error) {
    return NextResponse.json(
      { type: "Fail", message: { error: "Internal server error" } },
      { status: 500 }
    );
  }

  // Return payment session ID to user
  return NextResponse.json(
    { type: "Success", message: session },
    { status: 201 }
  );
}
