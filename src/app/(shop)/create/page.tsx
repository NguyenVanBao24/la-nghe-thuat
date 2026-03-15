import { generatePageMetadata } from "@/lib/metadata";
import { CreatePageClient } from "@/components/create/create-page-client";

export const metadata = generatePageMetadata({
    title:       "Tạo Tranh Lá — Upload Ảnh & Xem Trước",
    description: "Tải ảnh lên và xem trước ngay tác phẩm của bạn trên lá tự nhiên. Miễn phí, không cần đăng ký.",
    path:        "/create",
});

export default function CreatePage() {
    return <CreatePageClient />;
}