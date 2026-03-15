import type { Metadata } from "next";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { JsonLd } from "@/components/shared/json-ld";
import { localBusinessJsonLd } from "@/lib/jsonld";
import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import {AuthProvider} from "@/components/shared/auth-provider";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://leafora.vn";

export const metadata: Metadata = {
    metadataBase: new URL(appUrl),
    title: {
        default:  "Lá Nghệ Thuật — Tranh Lá Tự Nhiên Handmade",
        template: "%s | Lá Nghệ Thuật",
    },
    description:
        "Biến bức ảnh của bạn thành tác phẩm nghệ thuật độc đáo trên lá tự nhiên. Handmade, tinh tế, ý nghĩa.",
    keywords: [
        "tranh lá", "tranh lá bồ đề", "tranh handmade",
        "quà tặng nghệ thuật", "tranh lá tự nhiên", "leaf art",
    ],
    authors:  [{ name: "Lá Nghệ Thuật" }],
    creator:  "Lá Nghệ Thuật",
    openGraph: {
        type:     "website",
        locale:   "vi_VN",
        siteName: "Lá Nghệ Thuật",
        url:      appUrl,
    },
    twitter: {
        card: "summary_large_image",
    },
    robots: {
        index:  true,
        follow: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
        <body className="min-h-screen flex flex-col bg-background text-text-primary">
            <JsonLd data={localBusinessJsonLd()} />
            <GoogleAnalytics gaId="G-XXXXXXXXXX" />
            <AuthProvider>
                <Header />
                <main className="flex-1 pt-16 md:pt-20">
                    {children}
                </main>
                <Footer />
            </AuthProvider>
        </body>
        </html>
    );
}