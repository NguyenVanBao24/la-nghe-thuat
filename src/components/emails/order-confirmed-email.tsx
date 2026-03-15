import * as React from "react";

interface OrderConfirmedEmailProps {
    orderCode:    string;
    customerName: string;
    items: {
        leafName:   string;
        sizeLabel:  string;
        quantity:   number;
        unitPrice:  number;
    }[];
    subtotal:    number;
    shippingFee: number;
    total:       number;
    address:     string;
}

export function OrderConfirmedEmail({
                                        orderCode,
                                        customerName,
                                        items,
                                        subtotal,
                                        shippingFee,
                                        total,
                                        address,
                                    }: OrderConfirmedEmailProps) {
    const formatPrice = (amount: number) =>
        new Intl.NumberFormat("vi-VN", {
            style:    "currency",
            currency: "VND",
        }).format(amount);

    return (
        <html>
        <body style={{fontFamily: "Georgia, serif", backgroundColor: "#FAFAF7", margin: 0, padding: 0}}>
        <div style={{maxWidth: "600px", margin: "0 auto", padding: "40px 20px"}}>

            {/* Header */}
            <div style={{textAlign: "center", marginBottom: "40px"}}>
                <h1 style={{fontFamily: "Georgia, serif", fontSize: "28px", color: "#1C1C1A", margin: 0}}>
                    Lá Nghệ Thuật
                </h1>
                <p style={{color: "#A8A89A", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase"}}>
                    Leaf Art Studio
                </p>
            </div>

            {/* Main card */}
            <div style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "40px",
                border: "1px solid #E2E0D6"
            }}>

                {/* Success icon */}
                <div style={{textAlign: "center", marginBottom: "24px"}}>
                    <div style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                        backgroundColor: "#E8F2EC",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <span style={{fontSize: "28px"}}>✓</span>
                    </div>
                </div>

                <h2 style={{textAlign: "center", color: "#1C1C1A", fontSize: "24px", marginBottom: "8px"}}>
                    Đặt Hàng Thành Công!
                </h2>
                <p style={{textAlign: "center", color: "#6B6B5E", marginBottom: "32px"}}>
                    Xin chào {customerName}, đơn hàng của bạn đã được xác nhận.
                </p>

                {/* Order code */}
                <div style={{
                    backgroundColor: "#FAFAF7",
                    borderRadius: "8px",
                    padding: "16px",
                    textAlign: "center",
                    marginBottom: "32px"
                }}>
                    <p style={{color: "#A8A89A", fontSize: "12px", margin: "0 0 4px 0"}}>Mã đơn hàng</p>
                    <p style={{
                        color: "#1C1C1A",
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: 0,
                        fontFamily: "monospace"
                    }}>
                        {orderCode}
                    </p>
                </div>

                {/* Items */}
                <h3 style={{color: "#1C1C1A", fontSize: "16px", marginBottom: "16px"}}>
                    Sản phẩm đã đặt
                </h3>
                <table style={{width: "100%", borderCollapse: "collapse", marginBottom: "24px"}}>
                    <thead>
                    <tr style={{borderBottom: "1px solid #E2E0D6"}}>
                        <th style={{
                            textAlign: "left",
                            padding: "8px 0",
                            color: "#A8A89A",
                            fontSize: "12px",
                            fontWeight: "normal"
                        }}>Sản phẩm
                        </th>
                        <th style={{
                            textAlign: "right",
                            padding: "8px 0",
                            color: "#A8A89A",
                            fontSize: "12px",
                            fontWeight: "normal"
                        }}>Thành tiền
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item, i) => (
                        <tr key={i} style={{borderBottom: "1px solid #E2E0D6"}}>
                            <td style={{padding: "12px 0"}}>
                                <p style={{margin: "0 0 2px 0", color: "#1C1C1A", fontSize: "14px"}}>
                                    {item.leafName} · {item.sizeLabel}
                                </p>
                                <p style={{margin: 0, color: "#A8A89A", fontSize: "12px"}}>
                                    x{item.quantity}
                                </p>
                            </td>
                            <td style={{padding: "12px 0", textAlign: "right", color: "#1C1C1A", fontSize: "14px"}}>
                                {formatPrice(item.unitPrice * item.quantity)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div style={{borderTop: "1px solid #E2E0D6", paddingTop: "16px", marginBottom: "32px"}}>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
                        <span style={{color: "#6B6B5E", fontSize: "14px"}}>Tạm tính</span>
                        <span style={{color: "#1C1C1A", fontSize: "14px"}}>{formatPrice(subtotal)}</span>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "8px"}}>
                        <span style={{color: "#6B6B5E", fontSize: "14px"}}>Phí vận chuyển</span>
                        <span style={{color: "#1C1C1A", fontSize: "14px"}}>{formatPrice(shippingFee)}</span>
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "12px",
                        paddingTop: "12px",
                        borderTop: "1px solid #E2E0D6"
                    }}>
                        <span style={{color: "#1C1C1A", fontSize: "16px", fontWeight: "bold"}}>Tổng cộng</span>
                        <span
                            style={{color: "#4A7C59", fontSize: "20px", fontWeight: "bold"}}>{formatPrice(total)}</span>
                    </div>
                </div>

                {/* Shipping address */}
                <div style={{backgroundColor: "#F5EDD6", borderRadius: "8px", padding: "16px", marginBottom: "32px"}}>
                    <p style={{color: "#A8A89A", fontSize: "12px", margin: "0 0 4px 0"}}>Địa chỉ giao hàng</p>
                    <p style={{color: "#1C1C1A", fontSize: "14px", margin: 0}}>{address}</p>
                </div>

                {/* Timeline */}
                <div style={{marginBottom: "32px"}}>
                    <h3 style={{color: "#1C1C1A", fontSize: "16px", marginBottom: "16px"}}>Tiếp theo</h3>
                    {[
                        {emoji: "✉️", text: "Email xác nhận đã được gửi đến bạn"},
                        {emoji: "🎨", text: "Nghệ nhân bắt đầu thực hiện trong 1–2 ngày làm việc"},
                        {emoji: "📦", text: "Đóng gói và giao hàng trong 5–7 ngày làm việc"},
                        {emoji: "🏠", text: "Tác phẩm đến tay bạn trong 7–12 ngày"},
                    ].map((step, i) => (
                        <div key={i} style={{display: "flex", gap: "12px", marginBottom: "12px"}}>
                            <span style={{fontSize: "18px"}}>{step.emoji}</span>
                            <p style={{
                                margin: 0,
                                color: "#6B6B5E",
                                fontSize: "14px",
                                lineHeight: "1.6"
                            }}>{step.text}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{textAlign: "center"}}>
                    <a href={`${process.env.NEXT_PUBLIC_APP_URL}/order-confirmed?code=${orderCode}`}
                          style={{
                              display: "inline-block",
                              backgroundColor: "#4A7C59",
                              color: "#ffffff",
                              padding: "14px 32px",
                              borderRadius: "8px",
                              textDecoration: "none",
                              fontSize: "16px"
                          }}
                    >
                        Xem Đơn Hàng
                    </a>
                </div>

            </div>

            {/* Footer */}
            <div style={{textAlign: "center", marginTop: "32px"}}>
                <p style={{color: "#A8A89A", fontSize: "12px"}}>
                    Lá Nghệ Thuật · Nha Trang, Khánh Hoà
                </p>
                <p style={{color: "#A8A89A", fontSize: "12px"}}>
                    hello@langhethuat.vn · 0901 234 567
                </p>
            </div>

        </div>
        </body>
        </html>
    );
}