import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
});

export async function createPaymentIntent(amount: number) {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "vnd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return paymentIntent;
}