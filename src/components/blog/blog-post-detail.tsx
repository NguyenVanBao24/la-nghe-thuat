import { Container } from "@/components/ui";
import { Heading, Text, LabelText, Quote } from "@/components/ui";
import { Button } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type BlogPostMeta } from "./blog-client";
import Link from "next/link";

// Mock content — sau đọc từ MDX file
const mockPost: BlogPostMeta & { content: string } = {
    slug: "y-nghia-la-bo-de-trong-nghe-thuat",
    title: "Ý Nghĩa Của Lá Bồ Đề Trong Nghệ Thuật Phương Đông",
    excerpt: "Lá bồ đề không chỉ là một loài cây — đó là biểu tượng của sự giác ngộ.",
    coverEmoji: "🍃",
    author: "Minh Anh",
    publishedAt: "2024-02-10",
    tags: ["văn hoá", "lá bồ đề", "nghệ thuật"],
    readingTimeMinutes: 5,
    isFeatured: true,
    content: `
    Trong văn hoá Phật giáo, cây bồ đề là nơi Đức Phật Thích Ca Mâu Ni đạt được giác ngộ
    sau 49 ngày thiền định. Từ đó, lá bồ đề trở thành biểu tượng thiêng liêng của sự
    tỉnh thức, bình an và trí tuệ.

    Nghệ thuật khắc tranh trên lá bồ đề bắt nguồn từ các tu viện Phật giáo ở Myanmar,
    Thái Lan và Campuchia — nơi các nhà sư sử dụng kỹ thuật này để ghi lại các hình ảnh
    tôn giáo và truyền đạt thông điệp tâm linh.

    Ngày nay, nghệ thuật này đã vượt ra khỏi phạm vi tôn giáo và trở thành một hình thức
    nghệ thuật đương đại được yêu thích — đặc biệt là việc sử dụng hình ảnh cá nhân như
    chân dung gia đình, kỷ niệm đặc biệt để tạo ra những tác phẩm đầy ý nghĩa.
  `,
};

interface BlogPostDetailProps {
    slug: string;
}

export function BlogPostDetail({ slug: _ }: BlogPostDetailProps) {
    const post = mockPost; // TODO: fetch theo slug từ MDX

    return (
        <div className="bg-white min-h-screen">

            {/* Hero */}
            <div className="bg-warm/30 border-b border-border">
                <Container size="md" className="py-14 flex flex-col gap-6">

                    <Link href="/blog"
                          className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors w-fit"
                    >
                        <ArrowLeft size={16}/>
                        <Text size="sm">Quay lại Blog</Text>
                    </Link>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium text-primary bg-primary-light px-2.5 py-0.5 rounded-full"
                                >
                  {tag}
                </span>
                            ))}
                        </div>
                        <Heading size="lg">{post.title}</Heading>
                        <div className="flex items-center gap-3">
                            <Text size="sm" muted>{post.author}</Text>
                            <span className="text-border">·</span>
                            <Text size="sm" muted>
                                {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                            </Text>
                            <span className="text-border">·</span>
                            <Text size="sm" muted>{post.readingTimeMinutes} phút đọc</Text>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Cover image */}
            <div className="bg-gradient-to-br from-warm/40 to-primary-light/30 py-16 flex items-center justify-center">
                <span className="text-[120px]">{post.coverEmoji}</span>
            </div>

            {/* Content */}
            <Container size="sm" className="py-14">
                <div className="flex flex-col gap-6">

                    <Quote>
                        {post.excerpt}
                    </Quote>

                    {/* Nội dung bài viết — sau render MDX */}
                    {post.content.trim().split("\n\n").map((paragraph, i) => (
                        <Text key={i} size="lg" className="text-text-secondary leading-relaxed">
                            {paragraph.trim()}
                        </Text>
                    ))}

                </div>

                {/* CTA cuối bài */}
                <div
                    className="mt-16 p-8 rounded-xl bg-warm/40 border border-warm-dark/20 flex flex-col items-center gap-4 text-center">
                    <LabelText accent>Cảm Hứng Rồi?</LabelText>
                    <Heading as="h3" size="sm">
                        Tạo Tác Phẩm Tranh Lá Của Riêng Bạn
                    </Heading>
                    <Text muted className="max-w-sm">
                        Tải ảnh lên và xem ngay bức ảnh của bạn trên lá tự nhiên.
                    </Text>
                    <Button href="/create" size="lg" className="gap-2">
                        Bắt Đầu Ngay
                        <ArrowRight size={16}/>
                    </Button>
                </div>

            </Container>
        </div>
    );
}