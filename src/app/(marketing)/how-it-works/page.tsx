import type { Metadata } from "next";
import { HowItWorksClient } from "@/components/how-it-works/how-it-works-client";

export const metadata: Metadata = {
    title: "Quy Trình",
    description: "Tìm hiểu quy trình tạo ra một tác phẩm tranh lá handmade từ A đến Z.",
};

export default function HowItWorksPage() {
    return <HowItWorksClient />;
}