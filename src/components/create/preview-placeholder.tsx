import { cn } from "@/lib/utils";
import { Text } from "@/components/ui";
import { ImageIcon } from "lucide-react";
import { type LeafType, type LeafSize } from "@/types";

const leafEmojis: Record<LeafType, string> = {
    bodhi: "🍃",
    maple: "🍁",
    lotus: "🌿",
    fern:  "🌱",
    other: "🍀",
};

interface PreviewPlaceholderProps {
    leafType: LeafType;
    leafName: string;
    uploadedImage: string | null;
    size: LeafSize;
}

// ─────────────────────────────────────────────────────────
// SLOT NÀY SẼ ĐƯỢC THAY BẰNG <PreviewCanvas /> Ở PHASE 9
// Props interface giữ nguyên — chỉ thay nội dung bên trong
// Width: 100% | Min-height: 500px | Aspect: tự do
// ─────────────────────────────────────────────────────────
export function PreviewPlaceholder({
                                       leafType,
                                       leafName,
                                       uploadedImage,
                                       size,
                                   }: PreviewPlaceholderProps) {
    return (
        <div
            className={cn(
                "w-full min-h-[500px] rounded-xl border-2 border-dashed",
                "flex flex-col items-center justify-center",
                "bg-white transition-all duration-300",
                uploadedImage
                    ? "border-primary/40 bg-primary-light/10"
                    : "border-border bg-surface"
            )}
        >
            {uploadedImage ? (
                // Có ảnh — hiện mock preview
                <div className="flex flex-col items-center gap-6 p-8 text-center">
                    <div className="relative w-64 h-64">
                        {/* Lá nền */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[140px] opacity-20">{leafEmojis[leafType]}</span>
                        </div>
                        {/* Ảnh người dùng đè lên */}
                        <img
                            src={uploadedImage}
                            alt="Preview"
                            className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-lg opacity-80 mix-blend-multiply"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Text className="font-medium text-text-primary">
                            {leafName} · {size.label}
                        </Text>
                        <Text size="sm" muted>
                            Đây là bản xem trước mô phỏng. Tác phẩm thật sẽ được nghệ nhân thực hiện thủ công.
                        </Text>
                    </div>
                </div>
            ) : (
                // Chưa có ảnh
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                    <span className="text-8xl opacity-20">{leafEmojis[leafType]}</span>
                    <div className="flex flex-col gap-2 items-center">
                        <Text className="font-medium text-text-secondary flex items-center gap-2">
                            <ImageIcon size={16} />
                            Tải ảnh lên để xem trước
                        </Text>
                        <Text size="sm" muted>
                            Chọn ảnh ở cột bên trái để thấy ảnh của bạn
                            trên {leafName}
                        </Text>
                    </div>
                </div>
            )}
        </div>
    );
}