import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";
import { Text } from "@/components/ui";
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

interface GalleryGridProps {
    items: GalleryItem[];
    onItemClick: (item: GalleryItem) => void;
}

export function GalleryGrid({ items, onItemClick }: GalleryGridProps) {
    if (items.length === 0) {
        return (
            <div className="py-24 flex flex-col items-center gap-3">
                <span className="text-5xl opacity-30">🍃</span>
                <Text muted>Không có tác phẩm nào trong danh mục này.</Text>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    className="group text-left flex flex-col rounded-lg overflow-hidden border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                    {/* Ảnh */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-warm/50 to-primary-light/30 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-20 group-hover:scale-110 transition-transform duration-300">
                {leafEmojis[item.leafType]}
              </span>
                        </div>

                        {/* Badges nổi */}
                        <div className="absolute top-3 left-3 flex gap-2">
                            {item.isFeatured && (
                                <Badge variant="warm" size="sm">Nổi bật</Badge>
                            )}
                            {item.isSold && (
                                <Badge variant="default" size="sm">Đã bán</Badge>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                            <Text className="font-medium text-text-primary group-hover:text-primary transition-colors">
                                {item.title}
                            </Text>
                            <Badge variant="primary" size="sm">
                                {leafLabels[item.leafType]}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <Text size="sm" muted>{item.size}</Text>
                            <Text
                                className={cn(
                                    "text-sm font-medium",
                                    item.isSold ? "text-text-muted line-through" : "text-primary"
                                )}
                            >
                                {formatPrice(item.price)}
                            </Text>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}