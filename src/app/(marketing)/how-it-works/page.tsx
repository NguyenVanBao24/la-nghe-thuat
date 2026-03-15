import { generatePageMetadata } from "@/lib/metadata";
import { HowItWorksClient } from "@/components/how-it-works/how-it-works-client";

export const metadata = generatePageMetadata({
    title:       "Quy Trình — Từ Ảnh Đến Tác Phẩm",
    description: "6 bước đơn giản để biến bức ảnh của bạn thành tác phẩm nghệ thuật độc nhất trên lá tự nhiên.",
    path:        "/how-it-works",
});

export default function HowItWorksPage() {
    return <HowItWorksClient />;
}