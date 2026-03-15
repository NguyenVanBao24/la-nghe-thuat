import { type Metadata } from "next";

const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? "https://leafora.vn";
const siteName = "Lá Nghệ Thuật";
const defaultDescription = "Biến bức ảnh của bạn thành tác phẩm nghệ thuật độc đáo trên lá tự nhiên. Handmade, tinh tế, ý nghĩa.";

interface GenerateMetadataParams {
    title:        string;
    description?: string;
    path?:        string;
    image?:       string;
    type?:        "website" | "article";
}

export function generatePageMetadata({
                                         title,
                                         description = defaultDescription,
                                         path        = "",
                                         image,
                                         type        = "website",
                                     }: GenerateMetadataParams): Metadata {
    const url      = `${appUrl}${path}`;
    const ogImage  = image ?? `${appUrl}/og?title=${encodeURIComponent(title)}`;

    return {
        title,
        description,
        metadataBase: new URL(appUrl),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName,
            type,
            locale:   "vi_VN",
            images: [
                {
                    url:    ogImage,
                    width:  1200,
                    height: 630,
                    alt:    title,
                },
            ],
        },
        twitter: {
            card:        "summary_large_image",
            title,
            description,
            images:      [ogImage],
        },
    };
}