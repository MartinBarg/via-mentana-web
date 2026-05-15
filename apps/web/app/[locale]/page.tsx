import { getClientConfig } from "@/lib/config";
import { loc } from "@/lib/utils";
import Navbar, { type NavCtaConfig } from "@/components/Navbar";
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

  let navCta: NavCtaConfig | undefined;
  if (config.hero) {
    if (config.hero.ctaSingle) {
      navCta = { type: "single", label: loc(config.hero.ctaLabel, locale), url: config.hero.ctaSingle.url };
    } else {
      const items = heroProperties
        .filter((p) => p.hero.ctaUrl ?? p.airbnbUrl)
        .map((p) => ({
          label: p.hero.ctaLabel ? loc(p.hero.ctaLabel, locale) : loc(p.hero.title, locale),
          url: (p.hero.ctaUrl ?? p.airbnbUrl) as string,
        }));
      if (items.length > 0) {
        navCta = { type: "dropdown", label: loc(config.hero.ctaLabel, locale), items };
      }
    }
  }

  return (
    <main>
      <Navbar brandName={config.brandName} brandLogoUrl={config.brandLogoUrl} cta={navCta} />
      <HeroSection properties={heroProperties} hero={config.hero} locale={locale} />
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
