import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Upload, Eye, ShoppingBag } from "lucide-react";

const steps = [
    {
        icon: Upload,
        number: "01",
        title: "Tải Ảnh Lên",
        description:
            "Chọn bức ảnh yêu thích của bạn — ảnh chân dung, phong cảnh, hay kỷ niệm đặc biệt đều được.",
    },
    {
        icon: Eye,
        number: "02",
        title: "Xem Trước Kết Quả",
        description:
            "Công cụ preview sẽ cho bạn thấy ngay ảnh trông như thế nào khi được thể hiện trên lá tự nhiên.",
    },
    {
        icon: ShoppingBag,
        number: "03",
        title: "Đặt Hàng & Nhận Tranh",
        description:
            "Xác nhận đặt hàng, nghệ nhân sẽ tạo ra tác phẩm thủ công và giao đến tận tay bạn.",
    },
];

export function HowItWorksSection() {
    return (
        <Section className="bg-white">
            <Container>

                {/* Header */}
                <div className="text-center flex flex-col items-center gap-4 mb-16">
                    <LabelText accent>Quy Trình</LabelText>
                    <Heading size="lg">Đơn Giản Chỉ 3 Bước</Heading>
                    <Text size="lg" muted className="max-w-xl">
                        Từ bức ảnh của bạn đến tác phẩm nghệ thuật trên lá — quy trình nhanh gọn, kết quả tinh tế.
                    </Text>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                    {/* Đường kết nối giữa các bước — chỉ hiện trên desktop */}
                    <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-border" />

                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.number} className="flex flex-col items-center text-center gap-5">

                                {/* Icon circle */}
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                                        <Icon size={32} className="text-primary" />
                                    </div>
                                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-warm-dark text-white font-sans text-xs font-medium flex items-center justify-center">
                    {step.number}
                  </span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Heading as="h3" size="sm">{step.title}</Heading>
                                    <Text muted>{step.description}</Text>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </Container>
        </Section>
    );
}