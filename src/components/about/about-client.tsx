import { Container, Section } from "@/components/ui";
import { Display, Heading, Text, LabelText, Quote } from "@/components/ui";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";

const values = [
    {
        emoji: "🍃",
        title: "Thuần Tự Nhiên",
        description: "Chúng tôi chỉ dùng lá tự nhiên được thu hái có chọn lọc, không hoá chất, không nhân tạo.",
    },
    {
        emoji: "✋",
        title: "Thủ Công 100%",
        description: "Mỗi tác phẩm được thực hiện hoàn toàn bằng tay — không máy móc, không in ấn.",
    },
    {
        emoji: "💚",
        title: "Có Ý Nghĩa",
        description: "Chúng tôi tin rằng nghệ thuật đẹp nhất là nghệ thuật kể được câu chuyện của người sở hữu nó.",
    },
    {
        emoji: "🌱",
        title: "Bền Vững",
        description: "Quy trình sản xuất thân thiện môi trường, lá được thu hái tự nhiên không ảnh hưởng đến hệ sinh thái.",
    },
];

const team = [
    {
        name: "Nguyễn Minh Anh",
        role: "Nghệ nhân & Người sáng lập",
        bio: "15 năm kinh nghiệm trong nghệ thuật khắc lá truyền thống. Học nghề tại Huế, mang kỹ thuật cổ điển kết hợp với phong cách hiện đại.",
        emoji: "👩‍🎨",
    },
    {
        name: "Trần Thu Hà",
        role: "Nghệ nhân chính",
        bio: "Chuyên về tranh chân dung và phong cảnh. Tốt nghiệp Đại học Mỹ thuật TP.HCM, đam mê nghệ thuật thủ công truyền thống.",
        emoji: "🎨",
    },
];

export function AboutClient() {
    return (
        <div className="bg-white">

            {/* Hero */}
            <div className="bg-warm/30 border-b border-border">
                <Container className="py-20 md:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col gap-6">
                            <LabelText accent>Câu Chuyện Của Chúng Tôi</LabelText>
                            <Display size="md">
                                Nghệ Thuật Bắt Đầu Từ{" "}
                                <span className="text-primary italic">Một Chiếc Lá</span>
                            </Display>
                            <Text size="lg" muted>
                                Lá Nghệ Thuật ra đời từ tình yêu với vẻ đẹp mong manh của thiên nhiên
                                và khát vọng lưu giữ những khoảnh khắc đáng nhớ theo một cách thật đặc biệt.
                            </Text>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-warm/60 to-primary-light/40 flex items-center justify-center border border-border">
                                <span className="text-[100px]">🍃</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Story */}
            <Section>
                <Container size="md" className="flex flex-col gap-10">
                    <div className="flex flex-col gap-3 text-center items-center">
                        <LabelText accent>Hành Trình</LabelText>
                        <Heading size="lg">Từ Niềm Đam Mê Đến Xưởng Nghệ Thuật</Heading>
                    </div>

                    <Quote>
                        Tôi bắt đầu khắc lá từ năm 18 tuổi, khi nhìn thấy một người nghệ nhân già
                        ở Huế tạo ra những bức tranh kỳ diệu từ những chiếc lá bồ đề. Từ đó,
                        tôi biết đây là con đường của mình.
                    </Quote>

                    <div className="flex flex-col gap-6">
                        <Text size="lg" muted>
                            Năm 2018, sau nhiều năm học hỏi và tích lũy, chúng tôi thành lập Lá Nghệ Thuật
                            tại Nha Trang với mục tiêu đơn giản: đưa nghệ thuật truyền thống đến gần hơn
                            với cuộc sống hiện đại.
                        </Text>
                        <Text size="lg" muted>
                            Mỗi ngày, chúng tôi nhận những bức ảnh từ khách hàng — ảnh gia đình, ảnh
                            cưới, ảnh con cái, phong cảnh — và biến chúng thành những tác phẩm nghệ thuật
                            độc nhất trên lá tự nhiên. Không có hai tác phẩm nào giống nhau.
                        </Text>
                        <Text size="lg" muted>
                            Đến nay chúng tôi đã tạo ra hơn 500 tác phẩm cho khách hàng trên khắp
                            Việt Nam và một số quốc gia khác. Mỗi tác phẩm là một câu chuyện,
                            mỗi chiếc lá là một trang ký ức.
                        </Text>
                    </div>
                </Container>
            </Section>

            {/* Values */}
            <Section className="bg-surface">
                <Container>
                    <div className="text-center flex flex-col items-center gap-4 mb-12">
                        <LabelText accent>Giá Trị Cốt Lõi</LabelText>
                        <Heading size="lg">Những Gì Chúng Tôi Tin</Heading>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="bg-white rounded-lg border border-border p-6 flex flex-col gap-4"
                            >
                                <span className="text-4xl">{value.emoji}</span>
                                <div className="flex flex-col gap-2">
                                    <Heading as="h3" size="sm">{value.title}</Heading>
                                    <Text size="sm" muted>{value.description}</Text>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Team */}
            <Section>
                <Container>
                    <div className="text-center flex flex-col items-center gap-4 mb-12">
                        <LabelText accent>Đội Ngũ</LabelText>
                        <Heading size="lg">Những Người Tạo Ra Tác Phẩm</Heading>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="flex flex-col items-center text-center gap-4 p-8 rounded-xl border border-border bg-white"
                            >
                                <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                                    <span className="text-4xl">{member.emoji}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Heading as="h3" size="sm">{member.name}</Heading>
                                    <LabelText accent>{member.role}</LabelText>
                                </div>
                                <Text size="sm" muted className="leading-relaxed">
                                    {member.bio}
                                </Text>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="bg-warm/30">
                <Container className="flex flex-col items-center text-center gap-6">
                    <Heading size="lg">Sẵn Sàng Tạo Tác Phẩm?</Heading>
                    <Text size="lg" muted className="max-w-md">
                        Hãy để chúng tôi biến khoảnh khắc đặc biệt của bạn thành một tác phẩm nghệ thuật độc nhất.
                    </Text>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button href="/create" size="lg" className="gap-2">
                            Tạo Tranh Ngay
                            <ArrowRight size={18} />
                        </Button>
                        <Button href="/contact" variant="secondary" size="lg">
                            Liên Hệ Với Chúng Tôi
                        </Button>
                    </div>
                </Container>
            </Section>

        </div>
    );
}