import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/contact-client";

export const metadata: Metadata = {
    title: "Liên Hệ",
    description: "Liên hệ với Lá Nghệ Thuật để được tư vấn và đặt tranh theo yêu cầu.",
};

export default function ContactPage() {
    return <ContactClient />;
}