import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://leafora.vn";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/checkout",
                    "/cart",
                    "/account",
                    "/order-confirmed",
                ],
            },
        ],
        sitemap: `${appUrl}/sitemap.xml`,
    };
}