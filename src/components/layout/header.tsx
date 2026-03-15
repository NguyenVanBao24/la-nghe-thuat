"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Container } from "@/components/ui";
import { useCartStore } from "@/store/cart-store";

const navLinks = [
    { href: "/gallery",       label: "Gallery"        },
    { href: "/create",        label: "Tạo Tranh"      },
    { href: "/shop",          label: "Cửa Hàng"       },
    { href: "/how-it-works",  label: "Quy Trình"      },
    { href: "/blog",          label: "Blog"            },
    { href: "/about",         label: "Về Chúng Tôi"   },
];

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Đổi style header khi scroll
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Đóng menu khi chuyển trang
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Khoá scroll body khi menu mobile mở
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm"
                    : "bg-transparent"
            )}
        >
            <Container>
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl md:text-2xl font-medium text-text-primary group-hover:text-primary transition-colors">
              Lá Nghệ Thuật
            </span>
                        <span className="font-sans text-xs tracking-widest uppercase text-text-muted">
              Leaf Art Studio
            </span>
                    </Link>

                    {/* Nav desktop */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "font-sans text-sm px-3 py-2 rounded-sm transition-colors duration-150",
                                    pathname === link.href
                                        ? "text-primary font-medium"
                                        : "text-text-secondary hover:text-text-primary hover:bg-surface"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <CartButton />
                        <Button href="/create" size="sm">
                            Tạo Tranh Ngay
                        </Button>
                    </div>

                    {/* Mobile: cart + hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        <CartButton />
                        <button
                            onClick={() => setIsMenuOpen((v) => !v)}
                            className="p-2 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>

                </div>
            </Container>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col">
                    <Container className="py-6 flex flex-col gap-1 flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "font-sans text-base px-4 py-3 rounded-md transition-colors",
                                    pathname === link.href
                                        ? "text-primary font-medium bg-primary-light"
                                        : "text-text-secondary hover:text-text-primary hover:bg-surface"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-6 pt-6 border-t border-border">
                            <Button href="/create" className="w-full" size="lg">
                                Tạo Tranh Ngay
                            </Button>
                        </div>
                    </Container>
                </div>
            )}
        </header>
    );
}

// Cart icon button — tách riêng để sau gắn số lượng vào dễ
function CartButton() {
    const totalItems = useCartStore((state) => state.totalItems);
    const cartCount = totalItems();

    return (
        <Link
            href="/cart"
            className="relative p-2 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
            aria-label="Giỏ hàng"
        >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-white text-xs flex items-center justify-center font-medium">
          {cartCount}
        </span>
            )}
        </Link>
    );
}