import { Button, Container } from "@/components/ui";
import { Display, Text } from "@/components/ui";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
    return (
        <section className="bg-primary py-20 md:py-28 overflow-hidden relative">

            {/* Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-primary-dark/30" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />
            </div>

            <Container className="relative z-10 flex flex-col items-center text-center gap-8">
                <Display size="md" className="text-white max-w-2xl">
                    Tác Phẩm Của Bạn Đang Chờ Được Tạo Ra
                </Display>
                <Text size="lg" className="text-primary-light/80 max-w-xl">
                    Chỉ cần một bức ảnh — chúng tôi sẽ làm phần còn lại. Thử ngay miễn phí, không cần đăng ký.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        href="/create"
                        size="lg"
                        variant="warm"
                        className="gap-2"
                    >
                        Bắt Đầu Tạo Tranh
                        <ArrowRight size={18} />
                    </Button>
                    <Button
                        href="/gallery"
                        size="lg"
                        variant="ghost"
                        className="text-white hover:bg-white/10"
                    >
                        Xem Tác Phẩm Mẫu
                    </Button>
                </div>
            </Container>

        </section>
    );
}