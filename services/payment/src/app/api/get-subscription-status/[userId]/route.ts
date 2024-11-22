import {NextRequest, NextResponse} from "next/server";
import {getUserById} from "@/function/getUser";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }): Promise<Response> {
    const { userId } = await params;

    const user = await getUserById(userId);

    return NextResponse.json(
        { type: "Success", isActive: user && user.status === 'ACTIVE' ? true : false },
        { status: 200 }
    );
}