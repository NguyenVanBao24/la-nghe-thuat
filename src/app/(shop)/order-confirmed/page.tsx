import type { Metadata } from "next";
import { OrderConfirmedClient } from "@/components/checkout/order-confirmed-client";

export const metadata: Metadata = {
    title: "Đặt Hàng Thành Công",
};

export default function OrderConfirmedPage() {
    return <OrderConfirmedClient />;
}