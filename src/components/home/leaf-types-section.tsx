import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { type LeafType } from "@/types";

const leafTypes: {
    type: LeafType;
    name: string;
    description: string;
    emoji: string;
    color: string;
}[] = [
    {
        type: "bodhi",
        name: "Lá Bồ Đề",
        description: "Thanh tịnh, tâm linh. Biểu tượng của sự giác ngộ và bình an.",
        emoji: "🍃",
        color: "bg-green-50 border-green-200",
    },
    {
        type: "maple",
        name: "Lá Phong",
        description: "Lãng mạn, tinh tế. Gợi nhớ mùa thu vàng rực rỡ.",
        emoji: "🍁",
        color: "bg-orange-50 border-orange-200",
    },
    {
        type: "lotus",
        name: "Lá Sen",
        description: "Thuần khiết, cao quý. Biểu tượng của sự trong sáng và vươn lên.",
        emoji: "🌿",
        color: "bg-emerald-50 border-emerald-200",
    },
    {
        type: "fern",
        name: "Lá Dương Xỉ",
        description: "Cổ điển, tự nhiên. Nét đẹp hoang dã của rừng nhiệt đới.",
        emoji: "🌱",
        color: "bg-teal-50 border-teal-200",
    },
];

export function LeafTypesSection() {
    return (
        <Section className="bg-white">
            <Container>

                <div className="text-center flex flex-col items-center gap-4 mb-12">
                    <LabelText accent>Chất Liệu</LabelText>
                    <Heading size="lg">Các Loại Lá Tự Nhiên</Heading>
                    <Text size="lg" muted className="max-w-lg">
                        Mỗi loại lá mang một vẻ đẹp và ý nghĩa riêng. Chọn loại phù hợp với câu chuyện của bạn.
                    </Text>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {leafTypes.map((leaf) => (
                        <Link
                            key={leaf.type}
                            href={`/create?leaf=${leaf.type}`}
                            className={`
                group flex flex-col gap-4 p-6 rounded-lg border-2
                transition-all duration-200 hover:shadow-md hover:-translate-y-1
                ${leaf.color}
              `}
                        >
                            <span className="text-4xl">{leaf.emoji}</span>
                            <div className="flex flex-col gap-1.5">
                                <Text className="font-serif text-lg font-medium text-text-primary group-hover:text-primary transition-colors">
                                    {leaf.name}
                                </Text>
                                <Text size="sm" muted>{leaf.description}</Text>
                            </div>
                            <Text size="sm" className="text-primary font-medium mt-auto">
                                Tạo tranh →
                            </Text>
                        </Link>
                    ))}
                </div>

            </Container>
        </Section>
    );
}