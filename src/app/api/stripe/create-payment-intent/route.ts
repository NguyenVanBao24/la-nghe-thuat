import { NextRequest, NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/stripe";

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        if (!amount || amount < 10000) {
            return NextResponse.json(
                { error: "Số tiền không hợp lệ" },
                { status: 400 }
            );
        }

        const paymentIntent = await createPaymentIntent(amount);

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("[POST /api/stripe/create-payment-intent]", error);
        return NextResponse.json(
            { error: "Tạo payment intent thất bại" },
            { status: 500 }
        );
    }
}