"use client";

import { useState } from "react";
import { Container } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { LeafSelector }       from "./leaf-selector";
import { SizeSelector }       from "./size-selector";
import { ImageUploader }      from "./image-uploader";
import { PreviewPlaceholder } from "./preview-placeholder";
import { OrderSummary }       from "./order-summary";
import { type Leaf, type LeafSize } from "@/types";

// Data tạm — sau lấy từ Supabase
const mockLeaves: Leaf[] = [
    {
        id: "bodhi-1",
        type: "bodhi",
        name: "Lá Bồ Đề",
        nameEn: "Bodhi Leaf",
        description: "Thanh tịnh, tâm linh. Biểu tượng của sự giác ngộ.",
        imageUrl: "",
        isAvailable: true,
        availableSizes: [
            { id: "bodhi-sm", label: "Nhỏ (10×15cm)",  widthCm: 10, heightCm: 15, priceExtra: 0       },
            { id: "bodhi-md", label: "Vừa (15×20cm)",  widthCm: 15, heightCm: 20, priceExtra: 50000   },
            { id: "bodhi-lg", label: "Lớn (20×25cm)",  widthCm: 20, heightCm: 25, priceExtra: 100000  },
        ],
    },
    {
        id: "maple-1",
        type: "maple",
        name: "Lá Phong",
        nameEn: "Maple Leaf",
        description: "Lãng mạn, tinh tế. Gợi nhớ mùa thu.",
        imageUrl: "",
        isAvailable: true,
        availableSizes: [
            { id: "maple-sm", label: "Nhỏ (10×15cm)",  widthCm: 10, heightCm: 15, priceExtra: 0       },
            { id: "maple-md", label: "Vừa (15×20cm)",  widthCm: 15, heightCm: 20, priceExtra: 50000   },
            { id: "maple-lg", label: "Lớn (20×25cm)",  widthCm: 20, heightCm: 25, priceExtra: 100000  },
        ],
    },
    {
        id: "lotus-1",
        type: "lotus",
        name: "Lá Sen",
        nameEn: "Lotus Leaf",
        description: "Thuần khiết, cao quý.",
        imageUrl: "",
        isAvailable: true,
        availableSizes: [
            { id: "lotus-sm", label: "Nhỏ (10×15cm)",  widthCm: 10, heightCm: 15, priceExtra: 0       },
            { id: "lotus-md", label: "Vừa (15×20cm)",  widthCm: 15, heightCm: 20, priceExtra: 50000   },
        ],
    },
    {
        id: "fern-1",
        type: "fern",
        name: "Lá Dương Xỉ",
        nameEn: "Fern Leaf",
        description: "Cổ điển, tự nhiên.",
        imageUrl: "",
        isAvailable: true,
        availableSizes: [
            { id: "fern-sm", label: "Nhỏ (10×15cm)",   widthCm: 10, heightCm: 15, priceExtra: 0       },
            { id: "fern-md", label: "Vừa (15×20cm)",   widthCm: 15, heightCm: 20, priceExtra: 50000   },
            { id: "fern-lg", label: "Lớn (20×25cm)",   widthCm: 20, heightCm: 25, priceExtra: 100000  },
        ],
    },
];

const BASE_PRICE = 280000;

export function CreatePageClient() {
    const [selectedLeaf, setSelectedLeaf]       = useState<Leaf>(mockLeaves[0]);
    const [selectedSize, setSelectedSize]       = useState<LeafSize>(mockLeaves[0].availableSizes[1]);
    const [uploadedImage, setUploadedImage]     = useState<string | null>(null);
    const [quantity, setQuantity]               = useState(1);

    // Reset size về index 0 khi đổi loại lá
    function handleLeafChange(leaf: Leaf) {
        setSelectedLeaf(leaf);
        setSelectedSize(leaf.availableSizes[0]);
    }

    const totalPrice = (BASE_PRICE + selectedSize.priceExtra) * quantity;

    return (
        <div className="min-h-screen bg-surface">

            {/* Page header */}
            <div className="bg-white border-b border-border">
                <Container className="py-8">
                    <div className="flex flex-col gap-1">
                        <LabelText accent>Công Cụ Tạo Tranh</LabelText>
                        <Heading size="md">Tạo Tác Phẩm Của Bạn</Heading>
                        <Text muted>Chọn loại lá, tải ảnh lên và xem trước kết quả ngay.</Text>
                    </div>
                </Container>
            </div>

            {/* Main layout */}
            <Container className="py-10">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-8 items-start">

                    {/* Cột trái — Tuỳ chọn */}
                    <aside className="flex flex-col gap-6">
                        <LeafSelector
                            leaves={mockLeaves}
                            selected={selectedLeaf}
                            onChange={handleLeafChange}
                        />
                        <SizeSelector
                            sizes={selectedLeaf.availableSizes}
                            selected={selectedSize}
                            basePrice={BASE_PRICE}
                            onChange={setSelectedSize}
                        />
                        <ImageUploader
                            uploadedImage={uploadedImage}
                            onChange={setUploadedImage}
                        />
                    </aside>

                    {/* Cột giữa — Preview */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <Text className="font-medium text-text-primary">Xem Trước</Text>
                            {uploadedImage && (
                                <Text size="sm" muted>Kéo để điều chỉnh vị trí</Text>
                            )}
                        </div>
                        {/* ← ĐÂY LÀ SLOT — sau này thay bằng PreviewCanvas thật */}
                        <PreviewPlaceholder
                            leafType={selectedLeaf.type}
                            leafName={selectedLeaf.name}
                            uploadedImage={uploadedImage}
                            size={selectedSize}
                        />
                    </div>

                    {/* Cột phải — Tóm tắt đơn hàng */}
                    <aside>
                        <OrderSummary
                            leaf={selectedLeaf}
                            size={selectedSize}
                            quantity={quantity}
                            totalPrice={totalPrice}
                            uploadedImage={uploadedImage}
                            onQuantityChange={setQuantity}
                        />
                    </aside>

                </div>
            </Container>

        </div>
    );
}