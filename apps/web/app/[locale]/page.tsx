import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DescriptionSection from "@/components/DescriptionSection";
import LocationSection from "@/components/LocationSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <DescriptionSection />
      <LocationSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
