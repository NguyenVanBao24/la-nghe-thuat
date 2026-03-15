"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button } from "@/components/ui";
import { CartItemRow }    from "./cart-item-row";
import { CartSummaryBox } from "./cart-summary-box";
import { useCartStore }   from "@/store/cart-store";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

export function CartClient() {
    const { items, clearCart } = useCartStore();

    // Giỏ hàng trống
    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] bg-surface flex items-center justify-center">
                <div className="flex flex-col items-center gap-6 text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-white border border-border flex items-center justify-center">
                        <ShoppingBag size={36} className="text-text-muted" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Heading as="h2" size="md">Giỏ hàng trống</Heading>
                        <Text muted className="max-w-sm">
                            Bạn chưa có sản phẩm nào. Hãy tạo một tác phẩm tranh lá độc đáo của riêng bạn.
                        </Text>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button href="/shop" variant="secondary" size="lg">
                            Xem Cửa Hàng
                        </Button>
                        <Button href="/create" size="lg" className="gap-2">
                            Tạo Tranh Ngay
                            <ArrowRight size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">

            {/* Header */}
            <div className="bg-white border-b border-border">
                <Container className="py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <LabelText accent>Đơn Hàng</LabelText>
                            <Heading size="md">Giỏ Hàng ({items.length})</Heading>
                        </div>
                        <button
                            onClick={clearCart}
                            className="text-sm text-text-muted hover:text-red-500 transition-colors"
                        >
                            Xoá tất cả
                        </button>
                    </div>
                </Container>
            </div>

            <Container className="py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

                    {/* Left — danh sách sản phẩm */}
                    <div className="flex flex-col gap-4">

                        <Link
                            href="/create"
                            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors w-fit"
                        >
                            <ArrowLeft size={16} />
                            <Text size="sm">Tiếp tục tạo tranh</Text>
                        </Link>

                        {/* Items */}
                        <div className="flex flex-col gap-4">
                            {items.map((item) => (
                                <CartItemRow key={item.id} item={item} />
                            ))}
                        </div>

                    </div>

                    {/* Right — tóm tắt + checkout */}
                    <CartSummaryBox />

                </div>
            </Container>
        </div>
    );
}