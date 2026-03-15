import { generatePageMetadata } from "@/lib/metadata";
import { AboutClient } from "@/components/about/about-client";

export const metadata = generatePageMetadata({
    title:       "Về Chúng Tôi — Câu Chuyện Lá Nghệ Thuật",
    description: "Câu chuyện về Lá Nghệ Thuật — xưởng tranh handmade từ lá tự nhiên tại Nha Trang.",
    path:        "/about",
});

export default function AboutPage() {
    return <AboutClient />;
}