"use client";

import { useState, useMemo } from "react";
import { loc } from "@/lib/utils";
import Navbar, { type NavCtaConfig } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PropertySections from "@/components/PropertySections";
import CTASection from "@/components/CTASection";
import AboutUsSection from "@/components/AboutUsSection";
import Footer from "@/components/Footer";
import type { ClientConfig, PropertyConfig } from "@/lib/types/client";

interface PageBodyProps {
  config: ClientConfig;
  heroProperties: PropertyConfig[];
  locale: string;
}

export default function PageBody({ config, heroProperties, locale }: PageBodyProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useState(config.properties[0]?.id ?? "");

  const selectedProperty =
    config.properties.find((p) => p.id === selectedPropertyId) ?? config.properties[0];

  const selectedPropertyLabel =
    config.properties.length > 1 && selectedProperty
      ? loc(selectedProperty.hero.title, locale)
      : undefined;

  const navCta = useMemo((): NavCtaConfig | undefined => {
    if (!config.hero) return undefined;
    if (config.hero.ctaSingle) {
      return { type: "single", label: loc(config.hero.ctaLabel, locale), url: config.hero.ctaSingle.url };
    }
    const url = selectedProperty?.hero.ctaUrl ?? selectedProperty?.airbnbUrl;
    if (!url) return undefined;
    return { type: "single", label: loc(config.hero.ctaLabel, locale), url };
  }, [config.hero, locale, selectedProperty]);

  const footerTagline = selectedProperty?.footerTagline
    ? loc(selectedProperty.footerTagline, locale)
    : "";

  const hasDarkBackground = !!(config.backgroundPersonImageUrl || config.backgroundImageUrl);

  const themeVars = config.theme ? ({
    ...(config.theme.accent ? { "--color-terracotta": config.theme.accent } : {}),
    ...(config.theme.accentDark ? { "--color-terracotta-dark": config.theme.accentDark } : {}),
  } as React.CSSProperties) : undefined;

  return (
    <main style={themeVars}>
      {config.backgroundImageUrl && (
        <div
          className="fixed inset-x-0 top-0 min-h-[100lvh] -z-10 bg-cover bg-center bg-no-repeat bg-charcoal"
          style={{ backgroundImage: `url(${config.backgroundImageUrl})` }}
        />
      )}
      {config.backgroundPersonImageUrl && (
        <div
          className="fixed inset-x-0 top-0 min-h-[100lvh] -z-10"
          style={{
            backgroundColor: "#0a0a0a",
            backgroundImage: `url(${config.backgroundPersonImageUrl})`,
            backgroundPosition: "left center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <Navbar
        brandName={config.brandName}
        brandLogoUrl={config.brandLogoUrl}
        cta={navCta}
        selectedPropertyLabel={selectedPropertyLabel}
        transparent={config.transparentNav}
      />
      <HeroSection
        properties={heroProperties}
        hero={config.hero}
        locale={locale}
        selectedPropertyId={selectedPropertyId}
        onSelectProperty={setSelectedPropertyId}
        backgroundImageUrl={config.backgroundImageUrl ?? (config.backgroundPersonImageUrl ? "__dark__" : undefined)}
        noOverlay={!!config.backgroundPersonImageUrl}
      />
      {/* Sin key: todos los hijos son stateless. Si alguno suma useState en el futuro,
          agregar key={selectedProperty.id} aquí para forzar remount al cambiar propiedad */}
      {config.aboutUs && (
        <AboutUsSection aboutUs={config.aboutUs} locale={locale} variant={hasDarkBackground ? "dark" : "light"} />
      )}
      {selectedProperty && (
        <PropertySections
          property={selectedProperty}
          locale={locale}
          backgroundImageUrl={config.backgroundImageUrl}
        />
      )}
      {selectedProperty?.cta && (selectedProperty.hero.ctaUrl ?? selectedProperty.airbnbUrl) && (
        <CTASection
          ctaUrl={(selectedProperty.hero.ctaUrl ?? selectedProperty.airbnbUrl)!}
          title={loc(selectedProperty.cta.title, locale)}
          subtitle={loc(selectedProperty.cta.subtitle, locale)}
          buttonLabel={selectedProperty.cta.buttonLabel ? loc(selectedProperty.cta.buttonLabel, locale) : undefined}
        />
      )}
      <Footer
        brandName={config.brandName}
        tagline={footerTagline}
      />
    </main>
  );
}
