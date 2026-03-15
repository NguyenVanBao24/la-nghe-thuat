import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Dùng ở mọi component: cn("base-class", condition && "extra-class")
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Format giá tiền VND
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(amount);
}

// Format ngày tháng
export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(date));
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "...";
}

// Slug từ tiếng Việt
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}