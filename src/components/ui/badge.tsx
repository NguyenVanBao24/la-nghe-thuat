import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

const badgeVariants = cva(
    "inline-flex items-center font-sans font-medium rounded-full",
    {
        variants: {
            variant: {
                default:  "bg-surface text-text-secondary border border-border",
                primary:  "bg-primary-light text-primary-dark",
                warm:     "bg-warm text-text-primary",
                success:  "bg-green-50 text-green-700",
                warning:  "bg-yellow-50 text-yellow-700",
                danger:   "bg-red-50 text-red-600",
            },
            size: {
                sm: "text-xs px-2.5 py-0.5",
                md: "text-sm px-3 py-1",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "sm",
        },
    }
);

interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
        VariantProps<typeof badgeVariants> {}

export function Badge({ variant, size, className, children, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
    );
}

// Badge chuyên cho trạng thái đơn hàng
import { type OrderStatus } from "@/types";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const map: Record<OrderStatus, { label: string; variant: "default" | "primary" | "warm" | "success" | "warning" | "danger" }> = {
        pending_payment: { label: "Chờ thanh toán", variant: "warning" },
        confirmed:       { label: "Đã xác nhận",    variant: "primary" },
        in_production:   { label: "Đang sản xuất",  variant: "warm"    },
        completed:       { label: "Hoàn thành",      variant: "success" },
        shipped:         { label: "Đang giao",       variant: "primary" },
        delivered:       { label: "Đã nhận hàng",   variant: "success" },
        cancelled:       { label: "Đã huỷ",          variant: "danger"  },
    };

    const { label, variant } = map[status];

    return <Badge variant={variant}>{label}</Badge>;
}