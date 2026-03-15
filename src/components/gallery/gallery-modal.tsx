"use client";

import { useEffect } from "react";
import { Button, Badge } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { X, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { type GalleryItem } from "./gallery-client";
import { type LeafType } from "@/types";

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

interface GalleryModalProps {
    item: GalleryItem;
    onClose: () => void;
}

export function GalleryModal({ item, onClose }: GalleryModalProps) {
    // Đóng bằng ESC
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Modal box — stopPropagation để click bên trong không đóng */}
            <div
                className="bg-white rounded-xl shadow-lg w-full max-w-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Ảnh */}
                    <div className="aspect-square bg-gradient-to-br from-warm/50 to-primary-light/30 flex items-center justify-center">
            <span className="text-[120px] opacity-20">
              {leafEmojis[item.leafType]}
            </span>
                    </div>

                    {/* Nội dung */}
                    <div className="p-6 flex flex-col gap-5">
                        {/* Header modal */}
                        <div className="flex items-start justify-between gap-2">
                            <LabelText accent>Chi Tiết Tác Phẩm</LabelText>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-sm hover:bg-surface transition-colors text-text-muted"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Heading as="h3" size="sm">{item.title}</Heading>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="primary">{leafLabels[item.leafType]}</Badge>
                                {item.isSold && <Badge variant="default">Đã bán</Badge>}
                                {item.isFeatured && <Badge variant="warm">Nổi bật</Badge>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 py-4 border-y border-border">
                            <Row label="Kích thước" value={item.size} />
                            <Row label="Chất liệu"  value={leafLabels[item.leafType]} />
                            <Row label="Kỹ thuật"   value="Thủ công 100%" />
                            <div className="flex justify-between items-center pt-1">
                                <Text size="sm" muted>Giá</Text>
                                <Text className="font-serif text-xl font-medium text-primary">
                                    {formatPrice(item.price)}
                                </Text>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 mt-auto">
                            {item.isSold ? (
                                <Button
                                    href="/create"
                                    className="w-full gap-2"
                                >
                                    Tạo Tranh Tương Tự
                                    <ArrowRight size={16} />
                                </Button>
                            ) : (
                                <>
                                    <Button href="/create" className="w-full gap-2">
                                        Tạo Tranh Của Tôi
                                        <ArrowRight size={16} />
                                    </Button>
                                    <Button
                                        href={`/shop/${item.id}`}
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        Mua Tác Phẩm Này
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between items-center">
            <Text size="sm" muted>{label}</Text>
            <Text size="sm" className="font-medium text-text-primary">{value}</Text>
        </div>
    );
}