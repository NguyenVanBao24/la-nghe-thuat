"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { useCartStore } from "@/store/cart-store";
import { ShippingForm }  from "./shipping-form";
import { CartSummary }   from "./cart-summary";
import { PaymentForm }   from "./payment-form";
import { type ShippingAddress } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type CheckoutStep = "shipping" | "payment";

export function CheckoutClient() {
    const router    = useRouter();
    const cartStore = useCartStore();
    const [step, setStep]                     = useState<CheckoutStep>("shipping");
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
    const [isProcessing, setIsProcessing]     = useState(false);

    // Redirect nếu cart trống
    if (cartStore.items.length === 0) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center p-8">
                    <span className="text-6xl opacity-30">🛒</span>
                    <Heading as="h2" size="md">Giỏ hàng trống</Heading>
                    <Text muted>Bạn chưa có sản phẩm nào trong giỏ hàng.</Text>
                    <Link
                        href="/create"
                        className="text-primary font-medium hover:underline"
                    >
                        Tạo tranh ngay →
                    </Link>
                </div>
            </div>
        );
    }

    async function handlePaymentSuccess(paymentIntentId: string) {
        if (!shippingAddress) return;
        setIsProcessing(true);

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartStore.items,
                    shippingAddress,
                    stripePaymentIntentId: paymentIntentId,
                    subtotal:    cartStore.totalPrice(),
                    shippingFee: 35000,
                    total:       cartStore.totalPrice() + 35000,
                }),
            });

            if (!res.ok) throw new Error("Tạo đơn hàng thất bại");

            const { orderCode } = await res.json();
            cartStore.clearCart();
            router.push(`/order-confirmed?code=${orderCode}`);
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra. Vui lòng liên hệ hỗ trợ.");
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className="min-h-screen bg-surface">

            {/* Header */}
            <div className="bg-white border-b border-border">
                <Container className="py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <LabelText accent>Đặt Hàng</LabelText>
                            <Heading size="sm">Thanh Toán</Heading>
                        </div>

                        {/* Step indicator */}
                        <div className="hidden sm:flex items-center gap-3">
                            <StepDot
                                label="Giao hàng"
                                active={step === "shipping"}
                                done={step === "payment"}
                            />
                            <div className="w-8 h-px bg-border" />
                            <StepDot
                                label="Thanh toán"
                                active={step === "payment"}
                                done={false}
                            />
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

                    {/* Left — form */}
                    <div className="flex flex-col gap-6">

                        {/* Back button */}
                        {step === "payment" ? (
                            <button
                                onClick={() => setStep("shipping")}
                                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
                            >
                                <ArrowLeft size={16} />
                                <Text size="sm">Quay lại thông tin giao hàng</Text>
                            </button>
                        ) : (
                            <Link
                                href="/cart"
                                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors w-fit"
                            >
                                <ArrowLeft size={16} />
                                <Text size="sm">Quay lại giỏ hàng</Text>
                            </Link>
                        )}

                        {step === "shipping" && (
                            <ShippingForm
                                onSubmit={(address) => {
                                    setShippingAddress(address);
                                    setStep("payment");
                                }}
                            />
                        )}

                        {step === "payment" && shippingAddress && (
                            <PaymentForm
                                amount={cartStore.totalPrice() + 35000}
                                isProcessing={isProcessing}
                                onSuccess={handlePaymentSuccess}
                            />
                        )}
                    </div>

                    {/* Right — cart summary */}
                    <CartSummary />

                </div>
            </Container>
        </div>
    );
}

function StepDot({
                     label,
                     active,
                     done,
                 }: {
    label: string;
    active: boolean;
    done: boolean;
}) {
    return (
        <div className="flex items-center gap-2">
            <div className={`
        w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors
        ${done   ? "bg-primary text-white"              : ""}
        ${active ? "bg-primary text-white ring-2 ring-primary/30" : ""}
        ${!done && !active ? "bg-border text-text-muted" : ""}
      `}>
                {done ? "✓" : ""}
            </div>
            <Text size="sm" className={active || done ? "text-primary font-medium" : "text-text-muted"}>
                {label}
            </Text>
        </div>
    );
}