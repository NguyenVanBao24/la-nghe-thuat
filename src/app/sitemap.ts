import { MetadataRoute } from "next";
import { createServerClient } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://leafora.vn";
    const supabase = createServerClient();

    // Lấy products
    const { data: products } = await supabase
        .from("products")
        .select("slug, updated_at")
        .eq("status", "available");

    // Lấy blog posts
    const { data: posts } = await supabase
        .from("blog_posts")
        .select("slug, updated_at")
        .eq("is_published", true);

    // Trang tĩnh
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${appUrl}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${appUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${appUrl}/create`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${appUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${appUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${appUrl}/how-it-works`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${appUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${appUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
    ];

    // Product pages
    const productPages: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
        url: `${appUrl}/shop/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
        url: `${appUrl}/blog/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...blogPages];
}