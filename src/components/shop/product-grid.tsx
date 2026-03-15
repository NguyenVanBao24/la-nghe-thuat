import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { Text } from "@/components/ui";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
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

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="py-24 flex flex-col items-center gap-3">
                <span className="text-5xl opacity-30">🛍️</span>
                <Text muted>Không có sản phẩm nào phù hợp.</Text>
                <Text size="sm" muted>Thử thay đổi bộ lọc hoặc tạo tranh theo yêu cầu.</Text>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const isAvailable = product.status === "available";

    return (
        <div className={cn(
            "group flex flex-col rounded-lg overflow-hidden border border-border bg-white",
            "transition-all duration-200",
            isAvailable && "hover:shadow-md hover:-translate-y-0.5"
        )}>

            {/* Ảnh */}
            <Link href={`/shop/${product.slug}`}>
                <div className="relative aspect-[4/3] bg-gradient-to-br from-warm/50 to-primary-light/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
                "text-7xl transition-transform duration-300",
                isAvailable && "group-hover:scale-110"
            )}>
              {leafEmojis[product.leafType]}
            </span>
                    </div>

                    {/* Status badge */}
                    <div className="absolute top-3 left-3">
                        {product.status === "sold" && (
                            <Badge variant="default">Đã bán</Badge>
                        )}
                        {product.status === "reserved" && (
                            <Badge variant="warning">Đã đặt cọc</Badge>
                        )}
                        {product.isFeatured && product.status === "available" && (
                            <Badge variant="warm">Nổi bật</Badge>
                        )}
                    </div>
                </div>
            </Link>

            {/* Info */}
            <div className="p-5 flex flex-col gap-4 flex-1">
                <div className="flex flex-col gap-2 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <Link href={`/shop/${product.slug}`}>
                            <Text className="font-medium text-text-primary hover:text-primary transition-colors">
                                {product.title}
                            </Text>
                        </Link>
                        <Badge variant="primary" size="sm">
                            {leafLabels[product.leafType]}
                        </Badge>
                    </div>
                    <Text size="sm" muted className="line-clamp-2">
                        {product.description}
                    </Text>
                    <div className="flex items-center justify-between mt-auto pt-1">
                        <Text size="sm" muted>{product.size.label}</Text>
                        <Text className={cn(
                            "font-medium",
                            isAvailable ? "text-primary" : "text-text-muted line-through"
                        )}>
                            {formatPrice(product.price)}
                        </Text>
                    </div>
                </div>

                {/* CTA */}
                {isAvailable ? (
                    <Button
                        href={`/shop/${product.slug}`}
                        variant="secondary"
                        size="sm"
                        className="w-full gap-2"
                    >
                        <ShoppingBag size={14} />
                        Xem & Mua
                    </Button>
                ) : (
                    <Button
                        href="/create"
                        variant="ghost"
                        size="sm"
                        className="w-full"
                    >
                        Tạo Tranh Tương Tự
                    </Button>
                )}
            </div>

        </div>
    );
}