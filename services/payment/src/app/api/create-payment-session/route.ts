import { catchError } from "@/function/catchError";
import { createPaymentSession } from "@/function/createPaymentSession";
import { validateBody } from "@/function/validateBody";
import { NextRequest, NextResponse } from "next/server";

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
  // TODO

  // If currently active, add new plan to the user profile otherwise continue with the payment
  // TODO

  // Create payment session
  const [error, session] = await catchError(
    createPaymentSession({ planType: data.planType })
  );
  if (error) {
    console.error(error);
    return NextResponse.json(
      { type: "Fail", message: { error: "Internal server error" } },
      { status: 500 }
    );
  }

  // Return payment session ID to user
  return NextResponse.json({ message: session }, { status: 201 });
}
