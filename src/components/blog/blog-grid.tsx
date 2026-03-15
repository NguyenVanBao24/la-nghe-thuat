import { Heading, Text } from "@/components/ui";
import { type BlogPostMeta } from "./blog-client";
import Link from "next/link";

interface BlogGridProps {
    posts: BlogPostMeta[];
}

export function BlogGrid({ posts }: BlogGridProps) {
    if (posts.length === 0) {
        return (
            <div className="py-16 flex flex-col items-center gap-3">
                <span className="text-4xl opacity-30">📝</span>
                <Text muted>Không có bài viết nào trong chủ đề này.</Text>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
        </div>
    );
}

function BlogCard({ post }: { post: BlogPostMeta }) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-lg overflow-hidden border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
        >
            <div className="aspect-[16/9] bg-gradient-to-br from-surface to-warm/30 flex items-center justify-center">
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
        {post.coverEmoji}
</span>
            </div>

            <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded-full"
                        >
              {tag}
            </span>
                    ))}
                </div>

                <Heading
                    as="h3"
                    size="sm"
                    className="group-hover:text-primary transition-colors line-clamp-2"
                >
                    {post.title}
                </Heading>

                <Text size="sm" muted className="line-clamp-2 flex-1">
                    {post.excerpt}
                </Text>

                <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
                    <Text size="sm" muted>{post.author}</Text>
                    <Text size="sm" muted>{post.readingTimeMinutes} phút đọc</Text>
                </div>
            </div>
        </Link>
    );
}