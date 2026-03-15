import { generatePageMetadata } from "@/lib/metadata";
import { BlogClient } from "@/components/blog/blog-client";

export const metadata = generatePageMetadata({
    title:       "Blog — Kiến Thức Tranh Lá Tự Nhiên",
    description: "Câu chuyện từ xưởng vẽ, hướng dẫn chọn ảnh, ý nghĩa của từng loại lá và nhiều hơn nữa.",
    path:        "/blog",
});

export default function BlogPage() {
    return <BlogClient />;
}