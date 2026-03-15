import { resend } from "@/lib/resend";
import { render } from "@react-email/render";
import { OrderConfirmedEmail } from "@/components/emails/order-confirmed-email";

interface SendOrderConfirmedEmailParams {
    to:           string;
    orderCode:    string;
    customerName: string;
    items: {
        leafName:  string;
        sizeLabel: string;
        quantity:  number;
        unitPrice: number;
    }[];
    subtotal:    number;
    shippingFee: number;
    total:       number;
    address:     string;
}

export async function sendOrderConfirmedEmail(params: SendOrderConfirmedEmailParams) {
    const html = await render(
        OrderConfirmedEmail({
            orderCode:    params.orderCode,
            customerName: params.customerName,
            items:        params.items,
            subtotal:     params.subtotal,
            shippingFee:  params.shippingFee,
            total:        params.total,
            address:      params.address,
        })
    );

    const { error } = await resend.emails.send({
        from:    "Lá Nghệ Thuật <onboarding@resend.dev>",
        to:      params.to,
        subject: `Xác nhận đơn hàng ${params.orderCode} — Lá Nghệ Thuật`,
        html,
    });

    if (error) throw new Error(error.message);
}