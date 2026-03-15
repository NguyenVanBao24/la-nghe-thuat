"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { Heading, Text } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { Lock } from "lucide-react";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormProps {
    amount:       number;
    isProcessing: boolean;
    onSuccess:    (paymentIntentId: string) => void;
}

export function PaymentForm({ amount, isProcessing, onSuccess }: PaymentFormProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading]       = useState(true);
    const [error, setError]               = useState<string | null>(null);

    useEffect(() => {
        async function fetchClientSecret() {
            try {
                const res = await fetch("/api/stripe/create-payment-intent", {
                    method:  "POST",
                    headers: { "Content-Type": "application/json" },
                    body:    JSON.stringify({ amount }),
                });

                if (!res.ok) throw new Error("Không thể tạo payment intent");

                const { clientSecret } = await res.json();
                setClientSecret(clientSecret);
            } catch {
                setError("Có lỗi xảy ra. Vui lòng thử lại.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchClientSecret();
    }, [amount]);

    if (isLoading) {
        return (
            <Card className="p-6 flex items-center justify-center min-h-[200px]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    <Text size="sm" muted>Đang tải form thanh toán...</Text>
                </div>
            </Card>
        );
    }

    if (error || !clientSecret) {
        return (
            <Card className="p-6 flex flex-col items-center gap-4">
                <Text className="text-red-500">{error}</Text>
                <Button onClick={() => window.location.reload()} variant="secondary">
                    Thử lại
                </Button>
            </Card>
        );
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: "stripe",
                    variables: {
                        colorPrimary:    "#4A7C59",
                        colorBackground: "#ffffff",
                        colorText:       "#1C1C1A",
                        borderRadius:    "8px",
                        fontFamily:      "Inter, system-ui, sans-serif",
                    },
                },
            }}
        >
            <CheckoutForm
                amount={amount}
                isProcessing={isProcessing}
                onSuccess={onSuccess}
            />
        </Elements>
    );
}

function CheckoutForm({
                          amount,
                          isProcessing,
                          onSuccess,
                      }: PaymentFormProps) {
    const stripe   = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setError(null);

        const { error: submitError } = await elements.submit();
        if (submitError) {
            setError(submitError.message ?? "Có lỗi xảy ra");
            setIsLoading(false);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (confirmError) {
            setError(confirmError.message ?? "Thanh toán thất bại");
            setIsLoading(false);
            return;
        }

        if (paymentIntent?.status === "succeeded") {
            onSuccess(paymentIntent.id);
        }

        setIsLoading(false);
    }

    return (
        <Card className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Heading as="h2" size="sm">Thanh Toán</Heading>
                <div className="flex items-center gap-1.5 text-text-muted">
                    <Lock size={14} />
                    <Text size="sm" muted>Bảo mật SSL</Text>
                </div>
            </div>

            {/* Số tiền */}
            <div className="p-4 rounded-lg bg-primary-light border border-primary/20 flex items-center justify-between">
                <Text className="font-medium text-primary">Tổng thanh toán</Text>
                <Text className="font-serif text-2xl font-medium text-primary">
                    {formatPrice(amount)}
                </Text>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <PaymentElement />

                {error && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <Text size="sm" className="text-red-600">{error}</Text>
                    </div>
                )}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    isLoading={isLoading || isProcessing}
                    disabled={!stripe || !elements}
                >
                    <Lock size={16} />
                    Thanh Toán {formatPrice(amount)}
                </Button>
            </form>

            <Text size="sm" muted className="text-center">
                Thông tin thẻ được mã hoá và bảo mật bởi Stripe.
                Chúng tôi không lưu thông tin thẻ của bạn.
            </Text>
        </Card>
    );
}