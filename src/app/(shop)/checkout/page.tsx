import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";

export const metadata: Metadata = {
    title: "Thanh Toán",
    description: "Hoàn tất đơn hàng tranh lá của bạn.",
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}