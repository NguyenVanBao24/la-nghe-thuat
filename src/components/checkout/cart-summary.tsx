"use client";

import { Card } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { type LeafType } from "@/types";

const leafEmojis: Record<LeafType, string> = {
    bodhi: "🍃",
    maple: "🍁",
    lotus: "🌿",
    fern:  "🌱",
    other: "🍀",
};

const SHIPPING_FEE = 35000;

export function CartSummary() {
    const { items, totalPrice } = useCartStore();
    const subtotal = totalPrice();

    return (
        <Card className="sticky top-24 flex flex-col gap-5 p-6">
            <div className="flex flex-col gap-1">
                <LabelText accent>Đơn Hàng</LabelText>
                <Heading as="h3" size="sm">Tóm Tắt</Heading>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-4 py-4 border-y border-border">
                {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">

                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-md bg-surface border border-border flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">
                {item.leafId ? leafEmojis[item.leafId as LeafType] ?? "🍃" : "🍃"}
              </span>
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                            <Text className="font-medium text-text-primary text-sm truncate">
                                {item.leafName}
                            </Text>
                            <Text size="sm" muted>{item.sizeLabel}</Text>
                            <Text size="sm" muted>x{item.quantity}</Text>
                        </div>

                        <Text className="font-medium text-text-primary text-sm flex-shrink-0">
                            {formatPrice(item.unitPrice * item.quantity)}
                        </Text>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <Text size="sm" muted>Tạm tính</Text>
                    <Text size="sm" className="font-medium">{formatPrice(subtotal)}</Text>
                </div>
                <div className="flex justify-between">
                    <Text size="sm" muted>Phí vận chuyển</Text>
                    <Text size="sm" className="font-medium">{formatPrice(SHIPPING_FEE)}</Text>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                    <Text className="font-medium text-text-primary">Tổng cộng</Text>
                    <Text className="font-serif text-xl font-medium text-primary">
                        {formatPrice(subtotal + SHIPPING_FEE)}
                    </Text>
                </div>
            </div>

        </Card>
    );
}