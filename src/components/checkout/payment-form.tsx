"use client";

import { useState } from "react";
import { Heading, Text } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { Input } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { Lock, CreditCard } from "lucide-react";

interface PaymentFormProps {
    amount:       number;
    isProcessing: boolean;
    onSuccess:    (paymentIntentId: string) => void;
}

export function PaymentForm({ amount, isProcessing, onSuccess }: PaymentFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Phase 6 — tích hợp Stripe Elements thật
    // Hiện tại giả lập flow để test UI
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 2000)); // giả lập Stripe processing
        setIsLoading(false);
        onSuccess("pi_mock_" + Date.now()); // mock paymentIntentId
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

            {/* Số tiền cần thanh toán */}
            <div className="p-4 rounded-lg bg-primary-light border border-primary/20 flex items-center justify-between">
                <Text className="font-medium text-primary">Tổng thanh toán</Text>
                <Text className="font-serif text-2xl font-medium text-primary">
                    {formatPrice(amount)}
                </Text>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Card number mock — sau thay bằng Stripe Elements */}
                <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-sm font-medium text-text-primary">
                        Số thẻ
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="4242 4242 4242 4242"
                            defaultValue="4242 4242 4242 4242"
                            readOnly
                            className="w-full font-sans text-base text-text-primary bg-white border border-border rounded-sm px-4 py-2.5 pr-12 focus:outline-none focus:border-primary"
                        />
                        <CreditCard
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                        />
                    </div>
                    <Text size="sm" muted>
                        Đây là môi trường test — dùng thẻ 4242 4242 4242 4242
                    </Text>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Ngày hết hạn"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        readOnly
                    />
                    <Input
                        label="CVC"
                        placeholder="123"
                        defaultValue="123"
                        readOnly
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    isLoading={isLoading || isProcessing}
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