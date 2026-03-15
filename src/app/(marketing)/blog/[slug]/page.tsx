import type { Metadata } from "next";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // TODO: fetch post từ MDX theo slug
    return {
        title: params.slug.replace(/-/g, " "),
        description: "Bài viết từ Lá Nghệ Thuật.",
    };
}

export default function BlogPostPage({ params }: Props) {
    return <BlogPostDetail slug={params.slug} />;
}