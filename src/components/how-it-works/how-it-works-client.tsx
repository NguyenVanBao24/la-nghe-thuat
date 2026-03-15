import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import {
    Upload, Eye, CheckCircle, Package,
    Truck, Star, Clock, Shield,
} from "lucide-react";

const steps = [
    {
        icon: Upload,
        step: "01",
        title: "Tải Ảnh Lên",
        description: "Chọn bức ảnh bạn muốn chuyển thành tranh lá. Ảnh chân dung, phong cảnh, hay bất kỳ khoảnh khắc ý nghĩa nào đều được.",
        tips: [
            "Ảnh độ phân giải cao cho kết quả tốt nhất",
            "Ảnh có độ tương phản rõ ràng",
            "Tránh ảnh quá tối hoặc quá sáng",
            "Định dạng JPG, PNG hoặc WEBP",
        ],
    },
    {
        icon: Eye,
        step: "02",
        title: "Xem Trước & Tuỳ Chỉnh",
        description: "Công cụ preview sẽ hiển thị bức ảnh của bạn trên lá tự nhiên. Chọn loại lá, kích thước và điều chỉnh theo ý muốn.",
        tips: [
            "Chọn loại lá phù hợp với chủ đề",
            "Điều chỉnh vị trí và kích thước ảnh",
            "Xem thử nhiều loại lá khác nhau",
            "Preview là mô phỏng — thực tế có thể khác nhẹ",
        ],
    },
    {
        icon: CheckCircle,
        step: "03",
        title: "Xác Nhận Đặt Hàng",
        description: "Hài lòng với preview? Điền thông tin giao hàng và thanh toán để xác nhận đơn hàng.",
        tips: [
            "Điền địa chỉ giao hàng chính xác",
            "Thanh toán qua Stripe an toàn",
            "Nhận email xác nhận ngay sau khi đặt",
            "Có thể thêm ghi chú cho nghệ nhân",
        ],
    },
    {
        icon: Package,
        step: "04",
        title: "Nghệ Nhân Thực Hiện",
        description: "Nghệ nhân của chúng tôi sẽ tạo ra tác phẩm hoàn toàn thủ công dựa trên bức ảnh và preview bạn đã chọn.",
        tips: [
            "Thời gian sản xuất 5–7 ngày làm việc",
            "Quy trình thủ công 100%",
            "Kiểm tra chất lượng kỹ trước khi đóng gói",
            "Chụp ảnh thực tế gửi cho bạn xem trước",
        ],
    },
    {
        icon: Truck,
        step: "05",
        title: "Đóng Gói & Giao Hàng",
        description: "Tác phẩm được đóng gói cẩn thận với hộp cứng chuyên dụng và giao đến tận tay bạn toàn quốc.",
        tips: [
            "Đóng gói chống sốc chuyên dụng",
            "Giao hàng toàn quốc 2–5 ngày",
            "Có thể theo dõi đơn hàng online",
            "Bảo hiểm hàng hóa trong quá trình vận chuyển",
        ],
    },
    {
        icon: Star,
        step: "06",
        title: "Nhận & Trân Trọng",
        description: "Tác phẩm nghệ thuật độc nhất của bạn đã sẵn sàng — trưng bày, tặng người thân, hay lưu giữ như một kỷ niệm quý giá.",
        tips: [
            "Kèm hướng dẫn bảo quản",
            "Chứng nhận handmade",
            "Đổi trả trong 7 ngày nếu không hài lòng",
            "Chia sẻ tác phẩm và nhận ưu đãi lần sau",
        ],
    },
];

const faqs = [
    {
        question: "Thời gian hoàn thành một tác phẩm là bao lâu?",
        answer: "Thông thường 5–7 ngày làm việc cho sản xuất, cộng thêm 2–5 ngày vận chuyển. Tổng thời gian từ khi đặt hàng đến khi nhận hàng là 7–12 ngày.",
    },
    {
        question: "Tôi có thể đặt làm tác phẩm kích thước lớn hơn không?",
        answer: "Có, chúng tôi nhận đơn kích thước đặc biệt theo yêu cầu. Vui lòng liên hệ trực tiếp để được tư vấn và báo giá.",
    },
    {
        question: "Nếu tôi không hài lòng với tác phẩm thì sao?",
        answer: "Chúng tôi có chính sách đổi trả trong 7 ngày. Nếu tác phẩm không đúng như preview hoặc có lỗi từ phía chúng tôi, bạn sẽ được làm lại miễn phí.",
    },
    {
        question: "Ảnh của tôi có được bảo mật không?",
        answer: "Hoàn toàn. Ảnh của bạn chỉ được dùng để tạo tác phẩm theo đơn hàng. Chúng tôi không chia sẻ hay sử dụng ảnh cho bất kỳ mục đích nào khác khi chưa có sự đồng ý.",
    },
    {
        question: "Tôi có thể đặt số lượng lớn để làm quà tặng tập thể không?",
        answer: "Có, chúng tôi nhận đơn sỉ từ 10 tác phẩm trở lên với giá ưu đãi. Phù hợp cho quà tặng công ty, sự kiện, đám cưới.",
    },
];

export function HowItWorksClient() {
    return (
        <div className="bg-white">

            {/* Header */}
            <div className="bg-warm/30 border-b border-border">
                <Container className="py-14 flex flex-col gap-3">
                    <LabelText accent>Quy Trình</LabelText>
                    <Heading size="lg">Từ Ảnh Đến Tác Phẩm</Heading>
                    <Text muted className="max-w-lg">
                        6 bước đơn giản để biến bức ảnh của bạn thành một tác phẩm nghệ thuật độc nhất trên lá tự nhiên.
                    </Text>
                </Container>
            </div>

            {/* Steps */}
            <Section>
                <Container>
                    <div className="flex flex-col gap-12">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isEven = index % 2 === 1;
                            return (
                                <div
                                    key={step.step}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
                                >
                                    {/* Content */}
                                    <div className={`flex flex-col gap-5 ${isEven ? "lg:order-2" : ""}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                                                <Icon size={22} className="text-primary" />
                                            </div>
                                            <span className="font-serif text-5xl font-light text-border">
                        {step.step}
                      </span>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <Heading as="h3" size="md">{step.title}</Heading>
                                            <Text size="lg" muted>{step.description}</Text>
                                        </div>
                                        <ul className="flex flex-col gap-2">
                                            {step.tips.map((tip) => (
                                                <li key={tip} className="flex items-start gap-2">
                                                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                                                    <Text size="sm" muted>{tip}</Text>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Visual */}
                                    <div className={`${isEven ? "lg:order-1" : ""}`}>
                                        <div className="aspect-square max-w-sm mx-auto rounded-xl bg-gradient-to-br from-warm/40 to-primary-light/30 border border-border flex items-center justify-center">
                                            <Icon size={80} className="text-primary opacity-20" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </Section>

            {/* Trust stats */}
            <Section className="bg-surface">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { icon: <Star size={24} />,   value: "500+",  label: "Tác phẩm đã tạo"    },
                            { icon: <Clock size={24} />,  value: "5–7",   label: "Ngày sản xuất"       },
                            { icon: <Shield size={24} />, value: "100%",  label: "Handmade thủ công"   },
                            { icon: <Truck size={24} />,  value: "Toàn quốc", label: "Giao hàng"       },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white rounded-lg border border-border p-6 flex flex-col items-center text-center gap-3"
                            >
                                <span className="text-primary">{stat.icon}</span>
                                <span className="font-serif text-3xl font-medium text-text-primary">
                  {stat.value}
                </span>
                                <Text size="sm" muted>{stat.label}</Text>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section>
                <Container size="md">
                    <div className="text-center flex flex-col items-center gap-4 mb-12">
                        <LabelText accent>Câu Hỏi Thường Gặp</LabelText>
                        <Heading size="lg">FAQ</Heading>
                    </div>
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.question}
                                className="p-6 rounded-lg border border-border bg-white flex flex-col gap-3"
                            >
                                <Text className="font-medium text-text-primary">{faq.question}</Text>
                                <Text size="sm" muted>{faq.answer}</Text>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="bg-primary">
                <Container className="flex flex-col items-center text-center gap-6">
                    <Heading size="lg" className="text-white">
                        Đã Hiểu Quy Trình Rồi?
                    </Heading>
                    <Text size="lg" className="text-primary-light/80 max-w-md">
                        Chỉ mất 2 phút để tải ảnh và xem trước tác phẩm của bạn.
                    </Text>
                    <Button href="/create" size="lg" variant="warm" className="gap-2">
                        Bắt Đầu Ngay
                        <ArrowRight size={18} />
                    </Button>
                </Container>
            </Section>

        </div>
    );
}