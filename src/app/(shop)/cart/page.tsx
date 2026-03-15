import type { Metadata } from "next";
import { CartClient } from "@/components/cart/cart-client";

export const metadata: Metadata = {
    title: "Giỏ Hàng",
    description: "Xem lại đơn hàng trước khi thanh toán.",
};

export default function CartPage() {
    return <CartClient />;
}