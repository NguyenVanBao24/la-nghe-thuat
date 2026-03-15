import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";

const buttonVariants = cva(
    // Base styles — áp dụng cho tất cả variant
    "inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none select-none",
    {
        variants: {
            variant: {
                // Nút chính — xanh lá đậm
                primary:
                    "bg-primary text-white hover:bg-primary-dark active:scale-[0.98]",
                // Nút phụ — viền xanh lá
                secondary:
                    "border border-primary text-primary bg-transparent hover:bg-primary-light active:scale-[0.98]",
                // Nút ghost — không viền, không nền
                ghost:
                    "text-text-secondary hover:text-text-primary hover:bg-surface active:scale-[0.98]",
                // Nút warm — nền vàng nhạt
                warm:
                    "bg-warm text-text-primary hover:bg-warm-dark hover:text-white active:scale-[0.98]",
                // Nút nguy hiểm
                danger:
                    "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
            },
            size: {
                sm:  "h-8  px-4  text-sm   rounded-sm",
                md:  "h-11 px-6  text-base rounded-sm",
                lg:  "h-13 px-8  text-lg   rounded-md",
                xl:  "h-15 px-10 text-xl   rounded-md",
                icon: "h-10 w-10 rounded-sm",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, href, children, disabled, ...props }, ref) => {
        const classes = cn(buttonVariants({ variant, size }), className);
        const content = isLoading ? (
            <>
                <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                <span>Đang xử lý...</span>
            </>
        ) : children;

        if (href) {
            return (
                <Link href={href} className={classes}>
                    {content}
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={classes}
                {...props}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };