"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button } from "@/components/ui";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";

function OrderConfirmedContent() {
    const params    = useSearchParams();
    const orderCode = params.get("code") ?? "LA-XXXXXXX";

    const steps = [
        {
            icon: Mail,
            title: "Email xác nhận",
            description: "Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ của bạn.",
        },
        {
            icon: Package,
            title: "Sản xuất thủ công",
            description: "Nghệ nhân sẽ bắt đầu thực hiện tác phẩm trong 1–2 ngày làm việc.",
        },
        {
            icon: CheckCircle,
            title: "Giao hàng",
            description: "Tác phẩm sẽ đến tay bạn trong 7–12 ngày kể từ khi đặt hàng.",
        },
    ];

    return (
        <div className="min-h-screen bg-surface flex items-center">
            <Container size="sm" className="py-20">
                <div className="bg-white rounded-xl border border-border p-8 md:p-12 flex flex-col items-center text-center gap-8">

                    {/* Icon */}
                    <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center">
                        <CheckCircle size={40} className="text-primary" />
                    </div>

                    {/* Heading */}
                    <div className="flex flex-col gap-3">
                        <LabelText accent>Đặt Hàng Thành Công</LabelText>
                        <Heading size="lg">Cảm Ơn Bạn!</Heading>
                        <Text size="lg" muted>
                            Đơn hàng của bạn đã được xác nhận. Nghệ nhân sẽ sớm bắt đầu
                            tạo ra tác phẩm độc nhất dành riêng cho bạn.
                        </Text>
                    </div>

                    {/* Order code */}
                    <div className="w-full p-4 rounded-lg bg-surface border border-border flex flex-col gap-1">
                        <Text size="sm" muted>Mã đơn hàng</Text>
                        <Text className="font-mono font-medium text-text-primary text-lg">
                            {orderCode}
                        </Text>
                        <Text size="sm" muted>Lưu mã này để tra cứu đơn hàng</Text>
                    </div>

                    {/* Next steps */}
                    <div className="w-full flex flex-col gap-4">
                        <Text className="font-medium text-text-primary">Tiếp theo</Text>
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.title}
                                    className="flex items-start gap-4 p-4 rounded-lg bg-surface text-left"
                                >
                                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                                        <Icon size={16} className="text-primary" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <Text className="font-medium text-text-primary text-sm">
                                            {step.title}
                                        </Text>
                                        <Text size="sm" muted>{step.description}</Text>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Button href="/gallery" variant="secondary" className="flex-1">
                            Xem Gallery
                        </Button>
                        <Button href="/create" className="flex-1 gap-2">
                            Tạo Tranh Mới
                            <ArrowRight size={16} />
                        </Button>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export function OrderConfirmedClient() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-surface" />}>
            <OrderConfirmedContent />
        </Suspense>
    );
}