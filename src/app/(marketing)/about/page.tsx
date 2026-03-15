import type { Metadata } from "next";
import { AboutClient } from "@/components/about/about-client";

export const metadata: Metadata = {
    title: "Về Chúng Tôi",
    description: "Câu chuyện về Lá Nghệ Thuật — xưởng tranh handmade từ lá tự nhiên.",
};

export default function AboutPage() {
    return <AboutClient />;
}