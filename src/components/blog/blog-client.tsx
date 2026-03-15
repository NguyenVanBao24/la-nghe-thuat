"use client";

import { useState, useMemo } from "react";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { BlogGrid }   from "./blog-grid";
import { BlogFilter } from "./blog-filter";
import Link from "next/link";

export interface BlogPostMeta {
    slug: string;
    title: string;
    excerpt: string;
    coverEmoji: string;
    author: string;
    publishedAt: string;
    tags: string[];
    readingTimeMinutes: number;
    isFeatured: boolean;
}

const mockPosts: BlogPostMeta[] = [
    {
        slug: "y-nghia-la-bo-de-trong-nghe-thuat",
        title: "Ý Nghĩa Của Lá Bồ Đề Trong Nghệ Thuật Phương Đông",
        excerpt: "Lá bồ đề không chỉ là một loài cây — đó là biểu tượng của sự giác ngộ, bình an và trí tuệ trong văn hoá Phật giáo hàng nghìn năm.",
        coverEmoji: "🍃",
        author: "Minh Anh",
        publishedAt: "2024-02-10",
        tags: ["văn hoá", "lá bồ đề", "nghệ thuật"],
        readingTimeMinutes: 5,
        isFeatured: true,
    },
    {
        slug: "quy-trinh-lam-tranh-la-tu-nhien",
        title: "Quy Trình Tạo Ra Một Tác Phẩm Tranh Lá Thủ Công",
        excerpt: "Từ việc chọn lá, xử lý, phơi khô đến khắc từng đường nét — mỗi tác phẩm là cả một hành trình kỳ công của người nghệ nhân.",
        coverEmoji: "✍️",
        author: "Minh Anh",
        publishedAt: "2024-02-15",
        tags: ["quy trình", "handmade", "nghệ thuật"],
        readingTimeMinutes: 7,
        isFeatured: true,
    },
    {
        slug: "chon-anh-dep-de-lam-tranh-la",
        title: "Cách Chọn Ảnh Phù Hợp Để Tạo Tranh Lá Đẹp Nhất",
        excerpt: "Không phải bức ảnh nào cũng phù hợp để làm tranh lá. Bài viết này hướng dẫn bạn chọn ảnh có độ tương phản tốt, bố cục rõ ràng.",
        coverEmoji: "📸",
        author: "Thu Hà",
        publishedAt: "2024-02-20",
        tags: ["hướng dẫn", "chụp ảnh"],
        readingTimeMinutes: 4,
        isFeatured: false,
    },
    {
        slug: "qua-tang-y-nghia-tranh-la",
        title: "Tranh Lá — Món Quà Ý Nghĩa Cho Mọi Dịp",
        excerpt: "Sinh nhật, kỷ niệm ngày cưới, lễ tốt nghiệp hay Tết — một tác phẩm tranh lá handmade luôn là món quà khiến người nhận xúc động.",
        coverEmoji: "🎁",
        author: "Thu Hà",
        publishedAt: "2024-03-01",
        tags: ["quà tặng", "dịp đặc biệt"],
        readingTimeMinutes: 3,
        isFeatured: false,
    },
    {
        slug: "su-khac-biet-giua-cac-loai-la",
        title: "Lá Bồ Đề, Lá Phong, Lá Sen — Khác Nhau Như Thế Nào?",
        excerpt: "Mỗi loại lá có đặc tính riêng về kết cấu, kích thước và khả năng hiển thị chi tiết. Hiểu rõ để chọn đúng loại cho tác phẩm của bạn.",
        coverEmoji: "🌿",
        author: "Minh Anh",
        publishedAt: "2024-03-05",
        tags: ["kiến thức", "loại lá"],
        readingTimeMinutes: 6,
        isFeatured: false,
    },
    {
        slug: "bao-quan-tranh-la-tu-nhien",
        title: "Cách Bảo Quản Tranh Lá Tự Nhiên Bền Đẹp Theo Năm Tháng",
        excerpt: "Tranh lá tự nhiên cần được bảo quản đúng cách để giữ được vẻ đẹp và độ bền. Tránh ánh nắng trực tiếp, độ ẩm cao và cách đóng khung đúng.",
        coverEmoji: "🖼️",
        author: "Thu Hà",
        publishedAt: "2024-03-10",
        tags: ["hướng dẫn", "bảo quản"],
        readingTimeMinutes: 4,
        isFeatured: false,
    },
];

export type BlogTagFilter = "all" | string;

export function BlogClient() {
    const [tagFilter, setTagFilter] = useState<BlogTagFilter>("all");

    const allTags = useMemo(() => {
        const tags = mockPosts.flatMap((p) => p.tags);
        return ["all", ...Array.from(new Set(tags))];
    }, []);

    const filtered = useMemo(() => {
        if (tagFilter === "all") return mockPosts;
        return mockPosts.filter((p) => p.tags.includes(tagFilter));
    }, [tagFilter]);

    const featured = mockPosts.filter((p) => p.isFeatured);

    return (
        <>
            <div className="bg-warm/30 border-b border-border">
                <Container className="py-14 flex flex-col gap-3">
                    <LabelText accent>Kiến Thức & Cảm Hứng</LabelText>
                    <Heading size="lg">Blog</Heading>
                    <Text muted className="max-w-lg">
                        Câu chuyện từ xưởng vẽ, hướng dẫn chọn ảnh, ý nghĩa của từng loại lá và nhiều hơn nữa.
                    </Text>
                </Container>
            </div>

            <Section className="bg-white">
                <Container className="flex flex-col gap-16">

                    {featured.length > 0 && (
                        <div className="flex flex-col gap-6">
                            <LabelText accent>Bài Viết Nổi Bật</LabelText>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {featured.map((post) => (
                                    <FeaturedPostCard key={post.slug} post={post} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <LabelText accent>Tất Cả Bài Viết</LabelText>
                            <BlogFilter
                                tags={allTags}
                                active={tagFilter}
                                onChange={setTagFilter}
                            />
                        </div>
                        <BlogGrid posts={filtered} />
                    </div>

                </Container>
            </Section>
        </>
    );
}

function FeaturedPostCard({post}: { post: BlogPostMeta }) {
    return (
        <Link href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl overflow-hidden border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
            <div
                className="aspect-[16/9] bg-gradient-to-br from-warm/60 to-primary-light/40 flex items-center justify-center">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
        {post.coverEmoji}
</span>
            </div>
            <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-medium text-primary bg-primary-light px-2.5 py-0.5 rounded-full"
                        >
              {tag}
            </span>
                    ))}
                </div>
                <Heading as="h3" size="sm" className="group-hover:text-primary transition-colors">
                    {post.title}
                </Heading>
                <Text size="sm" muted className="line-clamp-2 flex-1">
                    {post.excerpt}
                </Text>
                <div className="flex items-center gap-3 pt-2 border-t border-border mt-auto">
                    <Text size="sm" muted>{post.author}</Text>
                    <span className="text-border">·</span>
                    <Text size="sm" muted>{post.readingTimeMinutes} phút đọc</Text>
                </div>
            </div>
        </Link>
    );
}
