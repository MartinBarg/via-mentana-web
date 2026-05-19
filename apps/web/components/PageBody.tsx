"use client";

import { useState } from "react";
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
  navCta?: NavCtaConfig;
}

export default function PageBody({ config, heroProperties, locale, navCta }: PageBodyProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useState(config.properties[0]?.id ?? "");

  const selectedProperty =
    config.properties.find((p) => p.id === selectedPropertyId) ?? config.properties[0];

  const selectedPropertyLabel =
    config.properties.length > 1 && selectedProperty
      ? loc(selectedProperty.hero.title, locale)
      : undefined;

  const footerTagline = config.properties[0]?.footerTagline
    ? loc(config.properties[0].footerTagline, locale)
    : "";

  return (
    <main>
      <Navbar
        brandName={config.brandName}
        brandLogoUrl={config.brandLogoUrl}
        cta={navCta}
        selectedPropertyLabel={selectedPropertyLabel}
      />
      <HeroSection
        properties={heroProperties}
        hero={config.hero}
        locale={locale}
        selectedPropertyId={selectedPropertyId}
        onSelectProperty={setSelectedPropertyId}
      />
      {selectedProperty && (
        <PropertySections
          key={selectedProperty.id}
          property={selectedProperty}
          locale={locale}
        />
      )}
      {selectedProperty?.cta && selectedProperty.airbnbUrl && (
        <CTASection
          key={selectedProperty.id}
          airbnbUrl={selectedProperty.airbnbUrl}
          title={loc(selectedProperty.cta.title, locale)}
          subtitle={loc(selectedProperty.cta.subtitle, locale)}
        />
      )}
      <Footer
        brandName={config.brandName}
        airbnbUrl={config.properties[0]?.airbnbUrl}
        tagline={footerTagline}
      />
    </main>
  );
}
