import type { Metadata } from "next";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lá Nghệ Thuật — Tranh Lá Tự Nhiên Handmade",
    template: "%s | Lá Nghệ Thuật",
  },
  description:
      "Biến bức ảnh của bạn thành tác phẩm nghệ thuật độc đáo trên lá tự nhiên. Handmade, tinh tế, ý nghĩa.",
  keywords: ["tranh lá", "tranh lá bồ đề", "tranh handmade", "quà tặng nghệ thuật"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Lá Nghệ Thuật",
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
      <Header />
      {/* pt-16 md:pt-20 để nội dung không bị header fixed che */}
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      </body>
      </html>
  );
}