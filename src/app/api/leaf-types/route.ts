import { NextResponse } from "next/server";
import { getLeafTypes } from "@/lib/db/leaf-types";

export async function GET() {
    try {
        const leafTypes = await getLeafTypes();
        return NextResponse.json({ leafTypes });
    } catch (error) {
        console.error("[GET /api/leaf-types]", error);
        return NextResponse.json(
            { error: "Lỗi server" },
            { status: 500 }
        );
    }
}