import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "warm" | "outlined" | "flat";
    hoverable?: boolean;
}

export function Card({
                         variant = "default",
                         hoverable = false,
                         className,
                         children,
                         ...props
                     }: CardProps) {
    const variants = {
        default:  "bg-white border border-border shadow-sm",
        warm:     "bg-warm border border-warm-dark/20",
        outlined: "bg-transparent border border-border",
        flat:     "bg-surface",
    };

    return (
        <div
            className={cn(
                "rounded-lg overflow-hidden",
                variants[variant],
                hoverable && "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pb-0", className)} {...props}>
            {children}
        </div>
    );
}

export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6", className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("px-6 py-4 border-t border-border bg-surface/50", className)}
            {...props}
        >
            {children}
        </div>
    );
}