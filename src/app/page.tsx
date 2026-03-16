import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/hero-section";

const HowItWorksSection = dynamic(() =>
    import("@/components/home/how-it-works-section").then((m) => m.HowItWorksSection)
);
const FeaturedGallery = dynamic(() =>
    import("@/components/home/featured-gallery").then((m) => m.FeaturedGallery)
);
const LeafTypesSection = dynamic(() =>
    import("@/components/home/leaf-types-section").then((m) => m.LeafTypesSection)
);
const CtaBanner = dynamic(() =>
    import("@/components/home/cta-banner").then((m) => m.CtaBanner)
);

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <HowItWorksSection />
            <FeaturedGallery />
            <LeafTypesSection />
            <CtaBanner />
        </>
    );
}