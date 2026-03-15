import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "full";
}

export function Container({
                              size = "lg",
                              className,
                              children,
                              ...props
                          }: ContainerProps) {
    const sizes = {
        sm:   "max-w-2xl",
        md:   "max-w-4xl",
        lg:   "max-w-6xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn(
                "w-full mx-auto px-6 md:px-8 xl:px-10",
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

// Section — thêm padding dọc chuẩn
interface SectionProps extends HTMLAttributes<HTMLElement> {
    as?: "section" | "div" | "article";
}

export function Section({
                            as: Tag = "section",
                            className,
                            children,
                            ...props
                        }: SectionProps) {
    return (
        <Tag
            className={cn("py-20 md:py-28", className)}
            {...props}
        >
            {children}
        </Tag>
    );
}