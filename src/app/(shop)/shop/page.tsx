import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/shop-client";

export const metadata: Metadata = {
    title: "Cửa Hàng",
    description: "Mua tranh lá tự nhiên handmade có sẵn. Giao hàng toàn quốc.",
};

export default function ShopPage() {
    return <ShopClient />;
}