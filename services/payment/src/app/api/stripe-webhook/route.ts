import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "@/types/envType";
import prisma from "../../../../prisma/prisma";
import {getUserById} from "@/function/getUser";

const stripe = new Stripe(env.SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
});

// Makes sure NextJS returns raw data
export const dynamicParams = false;

export async function POST(req: NextRequest) {
    // Verify the event by fetching it from Stripe
    let event: Stripe.Event;

    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature") as string | string[];

        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            env.WEBHOOK_KEY,
        );
    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json(
            { error: `Webhook Error: ${error.message}` },
            { status: 400 },
        );
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
        case "invoice.paid": {
            // Handle the checkout.session.completed event
            const session = event.data.object as Stripe.Checkout.Session;

            // Update the appointment status
            if (!session.metadata)
                return NextResponse.json(
                    { error: "No session metadata" },
                    { status: 400 },
                );

            const userId = session.metadata.userId
            const user = await getUserById(userId);

            if (!user) {
                await prisma.user.create({
                    data: {
                        userId,
                        status: "ACTIVE",
                    }
                })
            }
            else {
                await prisma.user.update({
                    where: { userId: session.metadata.userId },
                    data: {
                        status: "ACTIVE",
                    },
                });
            }


            break;
        }
        default:
            console.warn(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
}