"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { useAuthStore } from "@/store/auth-store";
import { OrderStatusBadge } from "@/components/ui";
import { formatPrice, formatDate } from "@/lib/utils";
import { LogOut, Package, User, ArrowRight } from "lucide-react";
import {OrderStatus} from "@/types";

interface OrderItem {
    id:         string;
    leaf_name:  string;
    size_label: string;
    quantity:   number;
    unit_price: number;
}

interface Order {
    id:          string;
    order_code:  string;
    status:      OrderStatus;
    total:       number;
    created_at:  string;
    order_items: OrderItem[];
    shipping_addresses: {
        full_name: string;
        province:  string;
    }[];
}

export function AccountClient() {
    const router    = useRouter();
    const { user, signOut, isLoading } = useAuthStore();
    const [orders, setOrders]     = useState<Order[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    // Redirect nếu chưa đăng nhập
    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    // Fetch orders
    useEffect(() => {
        if (!user) return;

        async function fetchOrders() {
            try {
                const res = await fetch(`/api/orders/user/${user!.id}`);
                if (res.ok) {
                    const { orders } = await res.json();
                    setOrders(orders ?? []);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsFetching(false);
            }
        }

        fetchOrders();
    }, [user]);

    async function handleSignOut() {
        await signOut();
        router.push("/");
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-surface">

            {/* Header */}
            <div className="bg-white border-b border-border">
                <Container className="py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <LabelText accent>Tài Khoản</LabelText>
                            <Heading size="md">
                                Xin chào, {user.user_metadata?.full_name ?? "Bạn"}
                            </Heading>
                            <Text size="sm" muted>{user.email}</Text>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            className="gap-2 text-text-muted"
                        >
                            <LogOut size={16} />
                            Đăng xuất
                        </Button>
                    </div>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">

                        {/* Sidebar */}
                        <div className="flex flex-col gap-2">
                            <NavItem icon={<Package size={16} />} label="Đơn hàng" active />
                            <NavItem icon={<User size={16} />}    label="Thông tin" />
                        </div>

                        {/* Orders */}
                        <div className="flex flex-col gap-6">
                            <Heading as="h2" size="sm">Lịch Sử Đơn Hàng</Heading>

                            {isFetching ? (
                                <div className="py-12 flex justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                </div>
                            ) : orders.length === 0 ? (
                                <Card className="p-12 flex flex-col items-center gap-4 text-center">
                                    <span className="text-5xl opacity-30">📦</span>
                                    <Heading as="h3" size="sm">Chưa có đơn hàng nào</Heading>
                                    <Text muted>Tạo tác phẩm tranh lá đầu tiên của bạn.</Text>
                                    <Button href="/create" className="gap-2">
                                        Tạo Tranh Ngay
                                        <ArrowRight size={16} />
                                    </Button>
                                </Card>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {orders.map((order) => (
                                        <OrderCard key={order.id} order={order} />
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </Container>
            </Section>
        </div>
    );
}

function OrderCard({ order }: { order: Order }) {
    return (
        <Card className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <Text className="font-mono font-medium text-text-primary">
                            {order.order_code}
                        </Text>
                        <OrderStatusBadge status={order.status} />
                    </div>
                    <Text size="sm" muted>
                        {formatDate(order.created_at)}
                        {order.shipping_addresses?.[0] && (
                            <> · {order.shipping_addresses[0].full_name} — {order.shipping_addresses[0].province}</>
                        )}
                    </Text>
                </div>
                <Text className="font-serif text-xl font-medium text-primary flex-shrink-0">
                    {formatPrice(order.total)}
                </Text>
            </div>

            {/* Items */}
            <div className="flex flex-col gap-2 py-4 border-y border-border">
                {order.order_items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                        <Text size="sm" muted>
                            {item.leaf_name} · {item.size_label} × {item.quantity}
                        </Text>
                        <Text size="sm" className="font-medium">
                            {formatPrice(item.unit_price * item.quantity)}
                        </Text>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <Link
                    href={`/order-confirmed?code=${order.order_code}`}
                    className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
                >
                    Xem chi tiết
                    <ArrowRight size={14} />
                </Link>
                {order.status === "delivered" && (
                    <Button href="/create" variant="secondary" size="sm">
                        Đặt lại
                    </Button>
                )}
            </div>
        </Card>
    );
}

function NavItem({
                     icon,
                     label,
                     active = false,
                 }: {
    icon:    React.ReactNode;
    label:   string;
    active?: boolean;
}) {
    return (
        <button className={`
      flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors text-left
      ${active
            ? "bg-primary-light text-primary"
            : "text-text-secondary hover:bg-surface hover:text-text-primary"
        }
    `}>
            {icon}
            {label}
        </button>
    );
}