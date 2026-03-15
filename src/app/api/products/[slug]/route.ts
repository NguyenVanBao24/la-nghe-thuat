import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/db/products";

export async function GET(
    _req: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const product = await getProductBySlug(params.slug);

        if (!product) {
            return NextResponse.json(
                { error: "Không tìm thấy sản phẩm" },
                { status: 404 }
            );
        }

        return NextResponse.json({ product });

    } catch (error) {
        console.error("[GET /api/products/:slug]", error);
        return NextResponse.json(
            { error: "Lỗi server" },
            { status: 500 }
        );
    }
}