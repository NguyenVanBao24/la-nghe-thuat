import type { Metadata } from "next";
import { BlogClient } from "@/components/blog/blog-client";

export const metadata: Metadata = {
    title: "Blog",
    description: "Kiến thức về tranh lá tự nhiên, nghệ thuật handmade và câu chuyện từ xưởng vẽ.",
};

export default function BlogPage() {
    return <BlogClient />;
}