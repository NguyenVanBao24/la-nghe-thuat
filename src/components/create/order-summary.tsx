"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, Card, Badge } from "@/components/ui";
import { Text, LabelText, Heading } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, AlertCircle } from "lucide-react";
import { type Leaf, type LeafSize } from "@/types";
import { nanoid } from "nanoid";
import { useCartStore } from "@/store/cart-store";

const BASE_PRICE = 280000;
const SHIPPING_FEE = 35000;

interface OrderSummaryProps {
    leaf: Leaf;
    size: LeafSize;
    quantity: number;
    totalPrice: number;
    uploadedImage: string | null;
    onQuantityChange: (qty: number) => void;
}

export function OrderSummary({
                                 leaf,
                                 size,
                                 quantity,
                                 totalPrice,
                                 uploadedImage,
                                 onQuantityChange,
                             }: OrderSummaryProps) {
    const router = useRouter();
    const canOrder = uploadedImage !== null;
    const unitPrice = BASE_PRICE + size.priceExtra;

    function handleOrder() {
        if (!canOrder) return;

        useCartStore.getState().addItem({
            id:              nanoid(),
            type:            "custom",
            leafId:          leaf.type,
            leafName:        leaf.name,
            sizeLabel:       size.label,
            quantity,
            unitPrice,
            userImageUrl:    uploadedImage ?? undefined,
            previewImageUrl: uploadedImage ?? undefined,
        });
        router.push("/checkout");
    }

    return (
        <Card className="sticky top-24 flex flex-col gap-5 p-6">

            <div className="flex flex-col gap-1">
                <LabelText accent>Tóm Tắt Đơn Hàng</LabelText>
                <Heading as="h3" size="sm">Chi Tiết</Heading>
            </div>

            {/* Thông tin đã chọn */}
            <div className="flex flex-col gap-3 py-4 border-y border-border">
                <Row label="Loại lá"    value={leaf.name} />
                <Row label="Kích thước" value={size.label} />
                <Row label="Đơn giá"    value={formatPrice(unitPrice)} />
            </div>

            {/* Số lượng */}
            <div className="flex items-center justify-between">
                <Text size="sm" className="font-medium text-text-primary">Số lượng</Text>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:bg-surface transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <Text className="font-medium w-4 text-center">{quantity}</Text>
                    <button
                        onClick={() => onQuantityChange(Math.min(10, quantity + 1))}
                        className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:bg-surface transition-colors"
                    >
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            {/* Tổng tiền */}
            <div className="flex flex-col gap-2 py-4 border-y border-border">
                <Row label="Tạm tính"   value={formatPrice(totalPrice)} />
                <Row label="Vận chuyển" value={formatPrice(SHIPPING_FEE)} muted />
                <div className="flex justify-between items-center pt-2">
                    <Text className="font-medium text-text-primary">Tổng cộng</Text>
                    <Text className="font-serif text-xl font-medium text-primary">
                        {formatPrice(totalPrice + SHIPPING_FEE)}
                    </Text>
                </div>
            </div>

            {/* Cảnh báo nếu chưa upload ảnh */}
            {!canOrder && (
                <div className="flex items-start gap-2 p-3 rounded-md bg-warm/60 border border-warm-dark/20">
                    <AlertCircle size={16} className="text-warm-dark flex-shrink-0 mt-0.5" />
                    <Text size="sm" className="text-text-secondary">
                        Vui lòng tải ảnh lên trước khi đặt hàng.
                    </Text>
                </div>
            )}

            {/* CTA */}
            <Button
                size="lg"
                className="w-full"
                disabled={!canOrder}
                onClick={handleOrder}
            >
                Đặt Hàng Ngay
            </Button>

            <Text size="sm" muted className="text-center">
                Thời gian sản xuất: 5–7 ngày làm việc
            </Text>

        </Card>
    );
}

function Row({
                 label,
                 value,
                 muted = false,
             }: {
    label: string;
    value: string;
    muted?: boolean;
}) {
    return (
        <div className="flex justify-between items-center">
            <Text size="sm" muted={muted}>{label}</Text>
            <Text size="sm" className={cn("font-medium", muted ? "text-text-muted" : "text-text-primary")}>
                {value}
            </Text>
        </div>
    );
}