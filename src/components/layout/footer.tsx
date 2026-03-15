import Link from "next/link";
import { Container } from "@/components/ui";
import { Text, LabelText } from "@/components/ui";

const footerLinks = {
    "Khám Phá": [
        { href: "/gallery",      label: "Gallery"         },
        { href: "/shop",         label: "Cửa Hàng"        },
        { href: "/create",       label: "Tạo Tranh"       },
        { href: "/how-it-works", label: "Quy Trình"       },
    ],
    "Thông Tin": [
        { href: "/about",        label: "Về Chúng Tôi"    },
        { href: "/blog",         label: "Blog"             },
        { href: "/contact",      label: "Liên Hệ"         },
        { href: "/faq",          label: "FAQ"              },
    ],
    "Chính Sách": [
        { href: "/shipping",     label: "Vận Chuyển"      },
        { href: "/returns",      label: "Đổi Trả"         },
        { href: "/privacy",      label: "Bảo Mật"         },
        { href: "/terms",        label: "Điều Khoản"      },
    ],
};

export function Footer() {
    return (
        <footer className="bg-surface border-t border-border">

            {/* Main footer */}
            <Container className="py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Brand column */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <Link href="/" className="flex flex-col leading-none w-fit">
              <span className="font-serif text-2xl font-medium text-text-primary">
                Lá Nghệ Thuật
              </span>
                            <span className="font-sans text-xs tracking-widest uppercase text-text-muted">
                Leaf Art Studio
              </span>
                        </Link>
                        <Text size="sm" className="max-w-xs">
                            Biến khoảnh khắc của bạn thành tác phẩm nghệ thuật độc đáo trên lá tự nhiên — thủ công, tinh tế, và mang đậm hơi thở thiên nhiên.
                        </Text>
                        <div className="flex flex-col gap-1 mt-2">
                            <Text size="sm" muted>
                                Email: hello@langhethuat.vn
                            </Text>
                            <Text size="sm" muted>
                                Zalo: 0901 234 567
                            </Text>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group} className="flex flex-col gap-4">
                            <LabelText accent>{group}</LabelText>
                            <ul className="flex flex-col gap-2.5">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="font-sans text-sm text-text-secondary hover:text-primary transition-colors duration-150"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </Container>

            {/* Bottom bar */}
            <div className="border-t border-border">
                <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <Text size="sm" muted>
                        © {new Date().getFullYear()} Lá Nghệ Thuật. Tất cả quyền được bảo lưu.
                    </Text>
                    <Text size="sm" muted>
                        Handcrafted with care in Vietnam
                    </Text>
                </Container>
            </div>

        </footer>
    );
}