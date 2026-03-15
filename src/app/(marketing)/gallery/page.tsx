import type { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/gallery-client";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Khám phá các tác phẩm tranh lá tự nhiên handmade độc đáo.",
};

export default function GalleryPage() {
    return <GalleryClient />;
}