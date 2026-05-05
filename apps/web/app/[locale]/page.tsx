import { getClientConfig } from "@/lib/config";
import { loc } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PropertySections from "@/components/PropertySections";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const config = await getClientConfig();

  const heroProperties = config.properties.slice(
    0,
    config.heroToursCount ?? config.properties.length
  );

  const primary = config.properties[0];
  const primaryAirbnbUrl = primary?.airbnbUrl;
  const ctaTitle = primary?.cta ? loc(primary.cta.title, locale) : "";
  const ctaSubtitle = primary?.cta ? loc(primary.cta.subtitle, locale) : "";
  const footerTagline = primary?.footerTagline ? loc(primary.footerTagline, locale) : "";

  return (
    <main>
      <Navbar brandName={config.brandName} />
      <HeroSection properties={heroProperties} locale={locale} />
      {config.properties.map((property) => (
        <PropertySections key={property.id} property={property} locale={locale} />
      ))}
      {primary?.cta && primaryAirbnbUrl && (
        <CTASection airbnbUrl={primaryAirbnbUrl} title={ctaTitle} subtitle={ctaSubtitle} />
      )}
      <Footer brandName={config.brandName} airbnbUrl={primaryAirbnbUrl} tagline={footerTagline} />
    </main>
  );
}
