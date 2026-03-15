import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/db/orders";
import { sendOrderConfirmedEmail } from "@/lib/email";
import { type CartItem, type ShippingAddress } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            items,
            shippingAddress,
            stripePaymentIntentId,
            subtotal,
            shippingFee,
            total,
            userId,
            note,
        } = body as {
            items:                 CartItem[];
            shippingAddress:       ShippingAddress;
            stripePaymentIntentId: string;
            subtotal:              number;
            shippingFee:           number;
            total:                 number;
            userId?:               string;
            note?:                 string;
        };

        // Validate
        if (!items?.length) {
            return NextResponse.json(
                { error: "Không có sản phẩm trong đơn hàng" },
                { status: 400 }
            );
        }
        if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.email) {
            return NextResponse.json(
                { error: "Thiếu thông tin giao hàng" },
                { status: 400 }
            );
        }
        if (!stripePaymentIntentId) {
            return NextResponse.json(
                { error: "Thiếu thông tin thanh toán" },
                { status: 400 }
            );
        }

        // Tạo đơn hàng
        const orderCode = await createOrder({
            items,
            shippingAddress,
            stripePaymentIntentId,
            subtotal,
            shippingFee,
            total,
            userId,
            note,
        });

        // Gửi email xác nhận — không throw nếu lỗi, không ảnh hưởng đơn hàng
        try {
            const address = [
                shippingAddress.addressLine,
                shippingAddress.ward,
                shippingAddress.district,
                shippingAddress.province,
            ].join(", ");

            await sendOrderConfirmedEmail({
                to:           shippingAddress.email,
                orderCode,
                customerName: shippingAddress.fullName,
                items:        items.map((item) => ({
                    leafName:  item.leafName,
                    sizeLabel: item.sizeLabel,
                    quantity:  item.quantity,
                    unitPrice: item.unitPrice,
                })),
                subtotal,
                shippingFee,
                total,
                address,
            });
        } catch (emailError) {
            console.error("[Email] Gửi email thất bại:", emailError);
        }

        return NextResponse.json({ orderCode }, { status: 201 });

    } catch (error) {
        console.error("[POST /api/orders]", error);
        return NextResponse.json(
            { error: "Tạo đơn hàng thất bại" },
            { status: 500 }
        );
    }
}