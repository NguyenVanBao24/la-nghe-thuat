"use client";

import { Card } from "@/components/ui";
import { Text } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { type CartItem, type LeafType } from "@/types";
import Image from "next/image"

const leafEmojis: Record<LeafType, string> = {
    bodhi: "🍃",
    maple: "🍁",
    lotus: "🌿",
    fern:  "🌱",
    other: "🍀",
};

const leafLabels: Record<LeafType, string> = {
    bodhi: "Lá Bồ Đề",
    maple: "Lá Phong",
    lotus: "Lá Sen",
    fern:  "Lá Dương Xỉ",
    other: "Khác",
};

interface CartItemRowProps {
    item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
    const { updateQty, removeItem } = useCartStore();

    const leafType = (item.leafId ?? "bodhi") as LeafType;

    return (
        <Card className="p-5">
            <div className="flex items-start gap-4">

                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-warm/50 to-primary-light/30 border border-border flex items-center justify-center flex-shrink-0">
                    {item.previewImageUrl ? (
                        <Image
                            src={item.previewImageUrl}
                            alt={item.leafName}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-3xl opacity-40">
              {leafEmojis[leafType]}
            </span>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col gap-0.5">
                            <Text className="font-medium text-text-primary">
                                {item.type === "custom" ? "Tranh Theo Yêu Cầu" : item.leafName}
                            </Text>
                            <Text size="sm" muted>
                                {leafLabels[leafType]} · {item.sizeLabel}
                            </Text>
                            {item.note && (
                                <Text size="sm" muted className="italic">
                                    Ghi chú: {item.note}
                                </Text>
                            )}
                        </div>

                        {/* Xoá */}
                        <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 rounded-sm text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                            aria-label="Xoá sản phẩm"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    {/* Bottom: quantity + price */}
                    <div className="flex items-center justify-between">

                        {/* Quantity control */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-sm border border-border flex items-center justify-center hover:bg-surface transition-colors"
                                aria-label="Giảm số lượng"
                            >
                                <Minus size={12} />
                            </button>
                            <Text size="sm" className="font-medium w-5 text-center">
                                {item.quantity}
                            </Text>
                            <button
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-sm border border-border flex items-center justify-center hover:bg-surface transition-colors"
                                aria-label="Tăng số lượng"
                            >
                                <Plus size={12} />
                            </button>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col items-end">
                            <Text className="font-medium text-primary">
                                {formatPrice(item.unitPrice * item.quantity)}
                            </Text>
                            {item.quantity > 1 && (
                                <Text size="sm" muted>
                                    {formatPrice(item.unitPrice)} / cái
                                </Text>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </Card>
    );
}