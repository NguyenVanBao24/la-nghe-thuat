"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button, Badge } from "@/components/ui";
import { Card } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ShoppingBag, Shield, Truck, RefreshCw } from "lucide-react";
import { type Product, type LeafType } from "@/types";

const leafLabels: Record<LeafType, string> = {
    bodhi: "Lá Bồ Đề",
    maple: "Lá Phong",
    lotus: "Lá Sen",
    fern:  "Lá Dương Xỉ",
    other: "Khác",
};

const leafEmojis: Record<LeafType, string> = {
    bodhi: "🍃",
    maple: "🍁",
    lotus: "🌿",
    fern:  "🌱",
    other: "🍀",
};

// Mock — sau fetch từ Supabase theo slug
const mockProduct: Product = {
    id: "p1", slug: "chan-dung-me-bodhi",
    title: "Chân Dung Mẹ",
    description: "Tác phẩm chân dung người mẹ được khắc tinh tế trên lá bồ đề. Mỗi đường nét đều được nghệ nhân thực hiện thủ công, tạo nên một tác phẩm độc nhất vô nhị mang đầy tình cảm và ý nghĩa.",
    price: 350000, images: [], leafType: "bodhi",
    size: { id: "s1", label: "15×20cm", widthCm: 15, heightCm: 20, priceExtra: 0 },
    status: "available", tags: ["chân dung", "gia đình"],
    createdAt: "2024-01-10", isFeatured: true,
};

interface ProductDetailProps {
    slug: string;
}

export function ProductDetail({  }: ProductDetailProps) {
    const router = useRouter();
    const product = mockProduct; // TODO: fetch theo slug
    const [quantity, setQuantity] = useState(1);

    const isAvailable = product.status === "available";

    function handleBuy() {
        // TODO: thêm vào cart store rồi redirect
        router.push("/checkout");
    }

    return (
        <div className="bg-white min-h-screen">
            <Container className="py-10">

                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
                >
                    <ArrowLeft size={16} />
                    <Text size="sm">Quay lại cửa hàng</Text>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Ảnh sản phẩm */}
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square rounded-xl bg-gradient-to-br from-warm/50 to-primary-light/30 flex items-center justify-center border border-border overflow-hidden">
              <span className="text-[140px] opacity-20">
                {leafEmojis[product.leafType]}
              </span>
                        </div>
                        {/* Thumbnail row — sau thay bằng ảnh thật */}
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-md bg-surface border border-border flex items-center justify-center cursor-pointer hover:border-primary transition-colors"
                                >
                                    <span className="text-2xl opacity-20">{leafEmojis[product.leafType]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <LabelText accent>Tranh Có Sẵn</LabelText>
                                {product.isFeatured && <Badge variant="warm" size="sm">Nổi bật</Badge>}
                            </div>
                            <Heading size="lg">{product.title}</Heading>
                            <div className="flex items-center gap-3">
                                <Badge variant="primary">{leafLabels[product.leafType]}</Badge>
                                <Text size="sm" muted>{product.size.label}</Text>
                            </div>
                            <Text className="font-serif text-3xl font-medium text-primary">
                                {formatPrice(product.price)}
                            </Text>
                        </div>

                        <Text muted>{product.description}</Text>

                        {/* Tags */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {product.tags.map((tag) => (
                                <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                            ))}
                        </div>

                        {/* Quantity + CTA */}
                        {isAvailable && (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <Text size="sm" className="font-medium text-text-primary w-20">
                                        Số lượng
                                    </Text>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:bg-surface transition-colors"
                                        >
                                            −
                                        </button>
                                        <Text className="font-medium w-4 text-center">{quantity}</Text>
                                        <button
                                            onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                            className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:bg-surface transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <Button
                                    size="lg"
                                    className="w-full gap-2"
                                    onClick={handleBuy}
                                >
                                    <ShoppingBag size={18} />
                                    Mua Ngay — {formatPrice(product.price * quantity)}
                                </Button>
                                <Button href="/create" variant="secondary" size="lg" className="w-full">
                                    Hoặc Tạo Tranh Của Riêng Bạn
                                </Button>
                            </div>
                        )}

                        {/* Trust badges */}
                        <Card variant="flat" className="p-4">
                            <div className="grid grid-cols-3 gap-4">
                                <TrustItem icon={<Shield size={18} />}    label="Handmade 100%" />
                                <TrustItem icon={<Truck size={18} />}     label="Giao toàn quốc" />
                                <TrustItem icon={<RefreshCw size={18} />} label="Đổi trả 7 ngày" />
                            </div>
                        </Card>

                    </div>
                </div>

            </Container>
        </div>
    );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-primary">{icon}</span>
            <Text size="sm" muted>{label}</Text>
        </div>
    );
}