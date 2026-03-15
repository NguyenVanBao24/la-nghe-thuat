import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

// ─── Display — dùng cho Hero heading lớn ───
interface DisplayProps extends HTMLAttributes<HTMLHeadingElement> {
    size?: "xl" | "lg" | "md";
}

export function Display({ size = "lg", className, children, ...props }: DisplayProps) {
    const sizes = {
        xl: "text-5xl md:text-7xl",
        lg: "text-4xl md:text-6xl",
        md: "text-3xl md:text-5xl",
    };

    return (
        <h1
            className={cn(
                "font-serif font-light tracking-tight text-text-primary",
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
}

// ─── Heading — h1 đến h4 ───
interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: "h1" | "h2" | "h3" | "h4";
    size?: "lg" | "md" | "sm";
}

export function Heading({
                            as: Tag = "h2",
                            size = "md",
                            className,
                            children,
                            ...props
                        }: HeadingProps) {
    const sizes = {
        lg: "text-3xl md:text-4xl",
        md: "text-2xl md:text-3xl",
        sm: "text-xl md:text-2xl",
    };

    return (
        <Tag
            className={cn(
                "font-serif font-medium text-text-primary",
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

// ─── Text — body copy ───
interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
    size?: "lg" | "md" | "sm";
    muted?: boolean;
    as?: "p" | "span" | "div";
}

export function Text({
                         size = "md",
                         muted = false,
                         as: Tag = "p",
                         className,
                         children,
                         ...props
                     }: TextProps) {
    const sizes = {
        lg: "text-lg",
        md: "text-base",
        sm: "text-sm",
    };

    return (
        <Tag
            className={cn(
                "font-sans leading-relaxed",
                sizes[size],
                muted ? "text-text-muted" : "text-text-secondary",
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

// ─── Label — uppercase nhỏ, dùng cho tag, section label ───
interface LabelTextProps extends HTMLAttributes<HTMLSpanElement> {
    accent?: boolean;
}

export function LabelText({ accent = false, className, children, ...props }: LabelTextProps) {
    return (
        <span
            className={cn(
                "font-sans text-xs font-medium tracking-widest uppercase",
                accent ? "text-primary" : "text-text-muted",
                className
            )}
            {...props}
        >
      {children}
    </span>
    );
}

// ─── Quote — italic serif, dùng cho tagline ───
export function Quote({ className, children, ...props }: HTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote
            className={cn(
                "font-serif italic text-xl md:text-2xl font-light text-text-secondary",
                "border-l-2 border-warm-dark pl-6",
                className
            )}
            {...props}
        >
            {children}
        </blockquote>
    );
}