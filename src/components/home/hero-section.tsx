import Link from "next/link";
import { Button } from "@/components/ui";
import { Display, Text, LabelText } from "@/components/ui";
import { Container } from "@/components/ui";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-warm/30 overflow-hidden">

            {/* Background texture — vòng tròn mờ trang trí */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-light/40" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-warm/60" />
            </div>

            <Container className="relative z-10 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left — nội dung */}
                    <div className="flex flex-col gap-8">
                        <LabelText accent className="flex items-center gap-2">
                            <Sparkles size={12} />
                            Handmade · Tự Nhiên · Độc Đáo
                        </LabelText>

                        <Display size="lg" className="text-text-primary">
                            Biến Ảnh Của Bạn Thành{" "}
                            <span className="text-primary italic">Tác Phẩm Nghệ Thuật</span>{" "}
                            Trên Lá Tự Nhiên
                        </Display>

                        <Text size="lg" className="max-w-md">
                            Tải ảnh lên, xem trước kết quả ngay lập tức, rồi để nghệ nhân
                            của chúng tôi tạo ra một tác phẩm thủ công độc nhất vô nhị dành riêng cho bạn.
                        </Text>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <Button href="/create" size="lg" className="gap-2">
                                Tạo Tranh Ngay
                                <ArrowRight size={18} />
                            </Button>
                            <Button href="/gallery" variant="ghost" size="lg">
                                Xem Gallery
                            </Button>
                        </div>

                        {/* Social proof nhỏ */}
                        <div className="flex items-center gap-6 pt-2">
                            <Stat value="500+" label="Tác phẩm" />
                            <div className="w-px h-8 bg-border" />
                            <Stat value="200+" label="Khách hàng" />
                            <div className="w-px h-8 bg-border" />
                            <Stat value="100%" label="Handmade" />
                        </div>
                    </div>

                    {/* Right — preview placeholder */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md aspect-square">

                            {/* Card chính */}
                            <div className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden border border-border">
                                <div className="w-full h-full bg-gradient-to-br from-warm/50 to-primary-light/30 flex flex-col items-center justify-center gap-4 p-8">
                                    <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                                        <span className="font-serif text-4xl text-primary">🍃</span>
                                    </div>
                                    <Text size="sm" muted className="text-center">
                                        Ảnh preview tác phẩm mẫu sẽ hiển thị ở đây
                                    </Text>
                                </div>
                            </div>

                            {/* Badge nổi — góc trên trái */}
                            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-md p-3 border border-border">
                                <Text size="sm" className="font-medium text-text-primary">Lá Bồ Đề</Text>
                                <Text size="sm" muted>15 × 20 cm</Text>
                            </div>

                            {/* Badge nổi — góc dưới phải */}
                            <div className="absolute -bottom-4 -right-4 bg-primary rounded-lg shadow-md p-3">
                                <Text size="sm" className="text-white font-medium">Handmade</Text>
                                <Text size="sm" className="text-primary-light/80">Độc nhất</Text>
                            </div>

                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex flex-col">
            <span className="font-serif text-2xl font-medium text-text-primary">{value}</span>
            <span className="font-sans text-xs text-text-muted">{label}</span>
        </div>
    );
}