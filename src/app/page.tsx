import { HeroSection }         from "@/components/home/hero-section";
import { HowItWorksSection }   from "@/components/home/how-it-works-section";
import { FeaturedGallery }     from "@/components/home/featured-gallery";
import { LeafTypesSection }    from "@/components/home/leaf-types-section";
import { CtaBanner }           from "@/components/home/cta-banner";

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