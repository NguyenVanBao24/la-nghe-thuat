"use client";

import { Card } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { ArrowRight, Shield, Truck, RefreshCw } from "lucide-react";

const SHIPPING_FEE = 35000;

export function CartSummaryBox() {
    const { totalPrice, totalItems } = useCartStore();
    const subtotal = totalPrice();
    const total    = subtotal + SHIPPING_FEE;

    return (
        <div className="flex flex-col gap-4 sticky top-24">
            <Card className="p-6 flex flex-col gap-5">

                <div className="flex flex-col gap-1">
                    <LabelText accent>Tóm Tắt</LabelText>
                    <Heading as="h3" size="sm">Chi Tiết Đơn Hàng</Heading>
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-3 py-4 border-y border-border">
                    <div className="flex justify-between">
                        <Text size="sm" muted>
                            Tạm tính ({totalItems()} sản phẩm)
                        </Text>
                        <Text size="sm" className="font-medium">{formatPrice(subtotal)}</Text>
                    </div>
                    <div className="flex justify-between">
                        <Text size="sm" muted>Phí vận chuyển</Text>
                        <Text size="sm" className="font-medium">{formatPrice(SHIPPING_FEE)}</Text>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <Text className="font-medium text-text-primary">Tổng cộng</Text>
                        <Text className="font-serif text-2xl font-medium text-primary">
                            {formatPrice(total)}
                        </Text>
                    </div>
                </div>

                {/* CTA */}
                <Button href="/checkout" size="lg" className="w-full gap-2">
                    Tiến Hành Thanh Toán
                    <ArrowRight size={16} />
                </Button>

                <Text size="sm" muted className="text-center">
                    Thời gian sản xuất 5–7 ngày làm việc
                </Text>
            </Card>

            {/* Trust badges */}
            <Card variant="flat" className="p-4">
                <div className="flex flex-col gap-3">
                    {[
                        { icon: Shield,    text: "Thanh toán bảo mật SSL"       },
                        { icon: Truck,     text: "Giao hàng toàn quốc 2–5 ngày" },
                        { icon: RefreshCw, text: "Đổi trả trong 7 ngày"          },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-3">
                            <Icon size={16} className="text-primary flex-shrink-0" />
                            <Text size="sm" muted>{text}</Text>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
}