"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button, Card } from "@/components/ui";
import { Input, Textarea } from "@/components/ui";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@langhethuat.vn",
        href: "mailto:hello@langhethuat.vn",
    },
    {
        icon: Phone,
        label: "Zalo / Điện thoại",
        value: "0901 234 567",
        href: "tel:+84901234567",
    },
    {
        icon: MapPin,
        label: "Xưởng",
        value: "Nha Trang, Khánh Hoà",
        href: null,
    },
    {
        icon: Clock,
        label: "Giờ làm việc",
        value: "Thứ 2 – Thứ 7, 8:00 – 17:00",
        href: null,
    },
];

interface FormState {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const initialForm: FormState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export function ContactClient() {
    const [form, setForm]         = useState<FormState>(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted]   = useState(false);
    const [errors, setErrors]     = useState<Partial<FormState>>({});

    function validate(): boolean {
        const newErrors: Partial<FormState> = {};
        if (!form.name.trim())    newErrors.name    = "Vui lòng nhập họ tên";
        if (!form.email.trim())   newErrors.email   = "Vui lòng nhập email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            newErrors.email   = "Email không hợp lệ";
        if (!form.message.trim()) newErrors.message = "Vui lòng nhập nội dung";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        // TODO: gửi lên API route /api/contact
        await new Promise((r) => setTimeout(r, 1500)); // giả lập
        setIsSubmitting(false);
        setIsSubmitted(true);
        setForm(initialForm);
    }

    function handleChange(field: keyof FormState, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    }

    return (
        <div className="bg-white">

            {/* Header */}
            <div className="bg-warm/30 border-b border-border">
                <Container className="py-14 flex flex-col gap-3">
                    <LabelText accent>Liên Hệ</LabelText>
                    <Heading size="lg">Chúng Tôi Luôn Sẵn Sàng Lắng Nghe</Heading>
                    <Text muted className="max-w-lg">
                        Có câu hỏi về sản phẩm, muốn đặt hàng số lượng lớn, hay đơn giản là muốn
                        trò chuyện về nghệ thuật tranh lá — hãy liên hệ với chúng tôi.
                    </Text>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Form */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <Heading as="h2" size="md">Gửi Tin Nhắn</Heading>
                                <Text muted>Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</Text>
                            </div>

                            {isSubmitted ? (
                                <Card variant="flat" className="p-8 flex flex-col items-center text-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                                        <CheckCircle size={32} className="text-primary" />
                                    </div>
                                    <Heading as="h3" size="sm">Gửi Thành Công!</Heading>
                                    <Text muted>
                                        Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
                                    </Text>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setIsSubmitted(false)}
                                    >
                                        Gửi Tin Nhắn Khác
                                    </Button>
                                </Card>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Input
                                            label="Họ và tên"
                                            placeholder="Nguyễn Văn A"
                                            value={form.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            error={errors.name}
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="email@example.com"
                                            value={form.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            error={errors.email}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <Input
                                            label="Số điện thoại"
                                            type="tel"
                                            placeholder="0901 234 567"
                                            value={form.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                        />
                                        <Input
                                            label="Chủ đề"
                                            placeholder="Đặt tranh theo yêu cầu..."
                                            value={form.subject}
                                            onChange={(e) => handleChange("subject", e.target.value)}
                                        />
                                    </div>
                                    <Textarea
                                        label="Nội dung"
                                        placeholder="Mô tả yêu cầu của bạn..."
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                        error={errors.message}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        isLoading={isSubmitting}
                                        className="gap-2 self-start"
                                    >
                                        <Send size={16} />
                                        Gửi Tin Nhắn
                                    </Button>
                                </form>
                            )}
                        </div>

                        {/* Contact info */}
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <Heading as="h2" size="md">Thông Tin Liên Hệ</Heading>
                                <Text muted>Hoặc liên hệ trực tiếp qua các kênh dưới đây.</Text>
                            </div>

                            <div className="flex flex-col gap-4">
                                {contactInfo.map((item) => {
                                    const Icon = item.icon;
                                    const content = (
                                        <div className="flex items-start gap-4 p-5 rounded-lg border border-border bg-white hover:border-primary/40 transition-colors">
                                            <div className="w-10 h-10 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                                                <Icon size={18} className="text-primary" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <LabelText>{item.label}</LabelText>
                                                <Text className="font-medium text-text-primary">{item.value}</Text>
                                            </div>
                                        </div>
                                    );

                                    return item.href ? (
                                        <a key={item.label} href={item.href}>
                                            {content}
                                        </a>
                                    ) : (
                                        <div key={item.label}>{content}</div>
                                    );
                                })}
                            </div>

                            {/* Map placeholder */}
                            <div className="rounded-lg overflow-hidden border border-border aspect-video bg-surface flex items-center justify-center">
                                <div className="flex flex-col items-center gap-2 text-center p-6">
                                    <MapPin size={32} className="text-text-muted" />
                                    <Text size="sm" muted>Nha Trang, Khánh Hoà</Text>
                                    <Text size="sm" muted>Google Maps sẽ được tích hợp sau</Text>
                                </div>
                            </div>
                        </div>

                    </div>
                </Container>
            </Section>

        </div>
    );
}