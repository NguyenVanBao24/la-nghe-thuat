import { NextResponse } from "next/server";
import { getProducts } from "@/lib/db/products";

export async function GET() {
    try {
        const products = await getProducts();
        return NextResponse.json({ products });
    } catch (error) {
        console.error("[GET /api/products]", error);
        return NextResponse.json(
            { error: "Lỗi server" },
            { status: 500 }
        );
    }
}