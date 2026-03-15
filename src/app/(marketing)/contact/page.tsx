import { generatePageMetadata } from "@/lib/metadata";
import { ContactClient } from "@/components/contact/contact-client";

export const metadata = generatePageMetadata({
    title:       "Liên Hệ — Lá Nghệ Thuật",
    description: "Liên hệ với Lá Nghệ Thuật để được tư vấn và đặt tranh theo yêu cầu.",
    path:        "/contact",
});

export default function ContactPage() {
    return <ContactClient />;
}