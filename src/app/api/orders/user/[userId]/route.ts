import { NextRequest, NextResponse } from "next/server";
import { getOrdersByUserId } from "@/lib/db/orders";

export async function GET(
    _req: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const orders = await getOrdersByUserId(params.userId);
        return NextResponse.json({ orders });
    } catch (error) {
        console.error("[GET /api/orders/user/:userId]", error);
        return NextResponse.json(
            { error: "Lỗi server" },
            { status: 500 }
        );
    }
}