"use client";

import { useState, useMemo } from "react";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { ProductGrid }  from "./product-grid";
import { ShopFilter }   from "./shop-filter";
import { type Product, type ProductStatus } from "@/types";
import { type LeafType } from "@/types";

// Data tạm — sau lấy từ Supabase
const mockProducts: Product[] = [
    {
        id: "p1", slug: "chan-dung-me-bodhi",
        title: "Chân Dung Mẹ", description: "Tác phẩm chân dung người mẹ trên lá bồ đề, nét khắc tinh tế.",
        price: 350000, images: [], leafType: "bodhi",
        size: { id: "s1", label: "15×20cm", widthCm: 15, heightCm: 20, priceExtra: 0 },
        status: "available", tags: ["chân dung", "gia đình"], createdAt: "2024-01-10", isFeatured: true,
    },
    {
        id: "p2", slug: "hoang-hon-bien-maple",
        title: "Hoàng Hôn Biển", description: "Cảnh hoàng hôn trên biển được khắc lên lá phong.",
        price: 420000, images: [], leafType: "maple",
        size: { id: "s2", label: "20×25cm", widthCm: 20, heightCm: 25, priceExtra: 100000 },
        status: "available", tags: ["phong cảnh"], createdAt: "2024-01-15", isFeatured: true,
    },
    {
        id: "p3", slug: "ky-niem-cuoi-lotus",
        title: "Kỷ Niệm Cưới", description: "Ảnh cưới được khắc tinh tế trên lá sen.",
        price: 380000, images: [], leafType: "lotus",
        size: { id: "s3", label: "15×20cm", widthCm: 15, heightCm: 20, priceExtra: 0 },
        status: "sold", tags: ["đôi lứa"], createdAt: "2024-01-20", isFeatured: false,
    },
    {
        id: "p4", slug: "nui-rung-tay-bac-fern",
        title: "Núi Rừng Tây Bắc", description: "Phong cảnh núi rừng hùng vĩ trên lá dương xỉ.",
        price: 450000, images: [], leafType: "fern",
        size: { id: "s4", label: "20×25cm", widthCm: 20, heightCm: 25, priceExtra: 100000 },
        status: "available", tags: ["phong cảnh"], createdAt: "2024-02-01", isFeatured: true,
    },
    {
        id: "p5", slug: "be-yeu-bodhi",
        title: "Bé Yêu", description: "Chân dung em bé đáng yêu trên lá bồ đề.",
        price: 350000, images: [], leafType: "bodhi",
        size: { id: "s5", label: "15×20cm", widthCm: 15, heightCm: 20, priceExtra: 0 },
        status: "available", tags: ["chân dung", "trẻ em"], createdAt: "2024-02-05", isFeatured: false,
    },
    {
        id: "p6", slug: "pho-co-hoi-an-maple",
        title: "Phố Cổ Hội An", description: "Vẻ đẹp phố cổ Hội An được khắc trên lá phong.",
        price: 400000, images: [], leafType: "maple",
        size: { id: "s6", label: "20×25cm", widthCm: 20, heightCm: 25, priceExtra: 100000 },
        status: "reserved", tags: ["phong cảnh", "kiến trúc"], createdAt: "2024-02-10", isFeatured: false,
    },
];

export type ShopFilterType = "all" | LeafType;
export type ShopSortType   = "newest" | "price-asc" | "price-desc";
export type StatusFilterType = "all" | "available";

export function ShopClient() {
    const [leafFilter, setLeafFilter]       = useState<ShopFilterType>("all");
    const [statusFilter, setStatusFilter]   = useState<StatusFilterType>("available");
    const [sort, setSort]                   = useState<ShopSortType>("newest");

    const filtered = useMemo(() => {
        let result = [...mockProducts];

        if (leafFilter !== "all") {
            result = result.filter((p) => p.leafType === leafFilter);
        }
        if (statusFilter === "available") {
            result = result.filter((p) => p.status === "available");
        }
        if (sort === "price-asc")  result.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

        return result;
    }, [leafFilter, statusFilter, sort]);

    return (
        <>
            {/* Page header */}
            <div className="bg-warm/30 border-b border-border">
                <Container className="py-14 flex flex-col gap-3">
                    <LabelText accent>Mua Ngay</LabelText>
                    <Heading size="lg">Cửa Hàng</Heading>
                    <Text muted className="max-w-lg">
                        Những tác phẩm tranh lá handmade có sẵn — mua ngay, giao hàng toàn quốc.
                    </Text>
                </Container>
            </div>

            <Section className="bg-white">
                <Container>
                    <ShopFilter
                        leafFilter={leafFilter}
                        statusFilter={statusFilter}
                        sort={sort}
                        total={filtered.length}
                        onLeafFilterChange={setLeafFilter}
                        onStatusFilterChange={setStatusFilter}
                        onSortChange={setSort}
                    />
                    <div className="mt-8">
                        <ProductGrid products={filtered} />
                    </div>
                </Container>
            </Section>
        </>
    );
}