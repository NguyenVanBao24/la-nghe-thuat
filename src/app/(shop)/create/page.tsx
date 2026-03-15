import type { Metadata } from "next";
import { CreatePageClient } from "@/components/create/create-page-client";

export const metadata: Metadata = {
    title: "Tạo Tranh",
    description: "Tải ảnh lên và xem trước tác phẩm của bạn trên lá tự nhiên.",
};

export default function CreatePage() {
    return <CreatePageClient />;
}