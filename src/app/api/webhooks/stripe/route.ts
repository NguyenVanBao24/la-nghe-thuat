import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    const body      = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
            { error: "Thiếu stripe signature" },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("[Stripe Webhook] Invalid signature:", err);
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    const supabase = createServerClient();

    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            await supabase
                .from("orders")
                .update({ status: "confirmed" })
                .eq("stripe_payment_intent_id", paymentIntent.id);
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            await supabase
                .from("orders")
                .update({ status: "cancelled" })
                .eq("stripe_payment_intent_id", paymentIntent.id);
            break;
        }
        default:
            console.log(`[Stripe Webhook] Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}