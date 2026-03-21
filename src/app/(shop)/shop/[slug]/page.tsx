import type { Metadata } from "next";
import { ProductDetail } from "@/components/shop/product-detail";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        title: `Tranh lá — ${params.slug}`,
        description: "Chi tiết tác phẩm tranh lá tự nhiên handmade.",
    };
}

export default function ProductPage({ params }: Props) {
    return <ProductDetail slug={params.slug} />;
}