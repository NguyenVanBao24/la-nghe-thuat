"use client";

import { useState, useMemo } from "react";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { GalleryFilter }  from "./gallery-filter";
import { GalleryGrid }    from "./gallery-grid";
import { GalleryModal }   from "./gallery-modal";
import { type LeafType }  from "@/types";

// Data tạm — sau lấy từ Supabase
export interface GalleryItem {
    id: string;
    title: string;
    leafType: LeafType;
    size: string;
    price: number;
    imageUrl: string;
    isSold: boolean;
    isFeatured: boolean;
    tags: string[];
}

const mockGallery: GalleryItem[] = [
    { id: "1",  title: "Chân Dung Mẹ",       leafType: "bodhi", size: "15×20cm", price: 350000, imageUrl: "", isSold: false, isFeatured: true,  tags: ["chân dung", "gia đình"] },
    { id: "2",  title: "Hoàng Hôn Biển",     leafType: "maple", size: "20×25cm", price: 420000, imageUrl: "", isSold: false, isFeatured: true,  tags: ["phong cảnh"] },
    { id: "3",  title: "Kỷ Niệm Cưới",       leafType: "lotus", size: "15×20cm", price: 380000, imageUrl: "", isSold: true,  isFeatured: false, tags: ["đôi lứa", "cưới hỏi"] },
    { id: "4",  title: "Bé Yêu",             leafType: "bodhi", size: "15×20cm", price: 350000, imageUrl: "", isSold: false, isFeatured: false, tags: ["chân dung", "trẻ em"] },
    { id: "5",  title: "Núi Rừng Tây Bắc",   leafType: "fern",  size: "20×25cm", price: 450000, imageUrl: "", isSold: false, isFeatured: true,  tags: ["phong cảnh"] },
    { id: "6",  title: "Phố Cổ Hội An",      leafType: "maple", size: "20×25cm", price: 400000, imageUrl: "", isSold: false, isFeatured: false, tags: ["phong cảnh", "kiến trúc"] },
    { id: "7",  title: "Ông Bà Nội",         leafType: "bodhi", size: "15×20cm", price: 350000, imageUrl: "", isSold: true,  isFeatured: false, tags: ["chân dung", "gia đình"] },
    { id: "8",  title: "Ruộng Bậc Thang",    leafType: "fern",  size: "20×25cm", price: 450000, imageUrl: "", isSold: false, isFeatured: false, tags: ["phong cảnh"] },
    { id: "9",  title: "Tốt Nghiệp",         leafType: "lotus", size: "15×20cm", price: 380000, imageUrl: "", isSold: false, isFeatured: false, tags: ["chân dung"] },
    { id: "10", title: "Cặp Đôi Đà Lạt",     leafType: "maple", size: "20×25cm", price: 420000, imageUrl: "", isSold: false, isFeatured: true,  tags: ["đôi lứa", "phong cảnh"] },
    { id: "11", title: "Ba Và Con Gái",       leafType: "bodhi", size: "15×20cm", price: 350000, imageUrl: "", isSold: false, isFeatured: false, tags: ["chân dung", "gia đình"] },
    { id: "12", title: "Làng Chài Sáng Sớm", leafType: "fern",  size: "20×25cm", price: 450000, imageUrl: "", isSold: false, isFeatured: false, tags: ["phong cảnh"] },
];

export type FilterType = "all" | LeafType;
export type SortType   = "newest" | "price-asc" | "price-desc";

export function GalleryClient() {
    const [filter, setFilter]           = useState<FilterType>("all");
    const [sort, setSort]               = useState<SortType>("newest");
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const filtered = useMemo(() => {
        let result = [...mockGallery];

        // Filter theo loại lá
        if (filter !== "all") {
            result = result.filter((item) => item.leafType === filter);
        }

        // Sort
        if (sort === "price-asc")  result.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

        return result;
    }, [filter, sort]);

    return (
        <>
            {/* Page header */}
            <div className="bg-warm/30 border-b border-border">
                <Container className="py-14 flex flex-col gap-3">
                    <LabelText accent>Tác Phẩm</LabelText>
                    <Heading size="lg">Gallery</Heading>
                    <Text muted className="max-w-lg">
                        Mỗi tác phẩm là một câu chuyện được kể trên lá tự nhiên —
                        thủ công, độc nhất, và đầy ý nghĩa.
                    </Text>
                </Container>
            </div>

            <Section className="bg-white">
                <Container>

                    {/* Filter & sort bar */}
                    <GalleryFilter
                        filter={filter}
                        sort={sort}
                        total={filtered.length}
                        onFilterChange={setFilter}
                        onSortChange={setSort}
                    />

                    {/* Grid */}
                    <div className="mt-8">
                        <GalleryGrid
                            items={filtered}
                            onItemClick={setSelectedItem}
                        />
                    </div>

                </Container>
            </Section>

            {/* Modal xem chi tiết */}
            {selectedItem && (
                <GalleryModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </>
    );
}