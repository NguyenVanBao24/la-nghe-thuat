import Link from "next/link";
import { Button, Container, Section, Card, Badge } from "@/components/ui";
import { Heading, Text, LabelText } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { type LeafType } from "@/types";

const mockArtworks = [
    { id: "1", title: "Chân Dung Mẹ",     leafType: "bodhi" as LeafType, price: 350000, size: "15×20cm" },
    { id: "2", title: "Hoàng Hôn Biển",   leafType: "maple" as LeafType, price: 420000, size: "20×25cm" },
    { id: "3", title: "Kỷ Niệm Cưới",     leafType: "lotus" as LeafType, price: 380000, size: "15×20cm" },
    { id: "4", title: "Bé Yêu",           leafType: "bodhi" as LeafType, price: 350000, size: "15×20cm" },
    { id: "5", title: "Núi Rừng Tây Bắc", leafType: "fern"  as LeafType, price: 450000, size: "20×25cm" },
    { id: "6", title: "Phố Cổ Hội An",    leafType: "maple" as LeafType, price: 400000, size: "20×25cm" },
];

const leafLabels: Record<LeafType, string> = {
    bodhi: "Lá Bồ Đề",
    maple: "Lá Phong",
    lotus: "Lá Sen",
    fern:  "Lá Dương Xỉ",
    other: "Khác",
};

export function FeaturedGallery() {
    return (
        <Section className="bg-surface">
            <Container>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex flex-col gap-3">
                        <LabelText accent>Tác Phẩm Nổi Bật</LabelText>
                        <Heading size="lg">Những Tác Phẩm Gần Đây</Heading>
                    </div>
                    <Button href="/gallery" variant="secondary" size="md" className="self-start md:self-auto">
                        Xem Tất Cả
                        <ArrowRight size={16} />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockArtworks.map((artwork) => (
                        <Link key={artwork.id} href={`/gallery/${artwork.id}`}>
                            <Card hoverable className="flex flex-col">

                                {/* Ảnh placeholder */}
                                <div className="aspect-[4/3] bg-gradient-to-br from-warm/60 to-primary-light/40 flex items-center justify-center">
                                    <span className="font-serif text-5xl opacity-30">🍃</span>
                                </div>

                                {/* Nội dung card — dùng div thuần, không dùng component riêng */}
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <Text className="font-medium text-text-primary">{artwork.title}</Text>
                                        <Badge variant="primary">{leafLabels[artwork.leafType]}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Text size="sm" muted>{artwork.size}</Text>
                                        <Text className="font-medium text-primary">
                                            {formatPrice(artwork.price)}
                                        </Text>
                                    </div>
                                </div>

                            </Card>
                        </Link>
                    ))}
                </div>

            </Container>
        </Section>
    );
}