"use client";

import { useState, useMemo } from "react";
import { loc } from "@/lib/utils";
import Navbar, { type NavCtaConfig } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PropertySections from "@/components/PropertySections";
import CTASection from "@/components/CTASection";
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

  return (
    <main>
      {config.backgroundImageUrl && (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-charcoal"
          style={{ backgroundImage: `url(${config.backgroundImageUrl})` }}
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
        backgroundImageUrl={config.backgroundImageUrl}
      />
      {/* Sin key: todos los hijos son stateless. Si alguno suma useState en el futuro,
          agregar key={selectedProperty.id} aquí para forzar remount al cambiar propiedad */}
      {selectedProperty && (
        <PropertySections
          property={selectedProperty}
          locale={locale}
          backgroundImageUrl={config.backgroundImageUrl}
        />
      )}
      {selectedProperty?.cta && selectedProperty.airbnbUrl && (
        <CTASection
          airbnbUrl={selectedProperty.airbnbUrl}
          title={loc(selectedProperty.cta.title, locale)}
          subtitle={loc(selectedProperty.cta.subtitle, locale)}
        />
      )}
      <Footer
        brandName={config.brandName}
        tagline={footerTagline}
      />
    </main>
  );
}
