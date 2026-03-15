import { NextRequest, NextResponse } from "next/server";
import { getOrderByCode } from "@/lib/db/orders";

export async function GET(
    _req: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        const order = await getOrderByCode(params.code);

        if (!order) {
            return NextResponse.json(
                { error: "Không tìm thấy đơn hàng" },
                { status: 404 }
            );
        }

        return NextResponse.json({ order });

    } catch (error) {
        console.error("[GET /api/orders/:code]", error);
        return NextResponse.json(
            { error: "Lỗi server" },
            { status: 500 }
        );
    }
}