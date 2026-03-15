import { generatePageMetadata } from "@/lib/metadata";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata = generatePageMetadata({
    title:       "Gallery — Tác Phẩm Tranh Lá",
    description: "Khám phá các tác phẩm tranh lá tự nhiên handmade độc đáo. Lá bồ đề, lá phong, lá sen và nhiều hơn nữa.",
    path:        "/gallery",
});

export default function GalleryPage() {
    return <GalleryClient />;
}