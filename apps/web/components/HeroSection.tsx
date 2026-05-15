"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback } from "react";
import type { PropertyConfig, ClientHeroConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface HeroSectionProps {
  properties: PropertyConfig[];
  hero?: ClientHeroConfig;
  locale: string;
}

const CARD_WIDTH_PX = 480;
const VISIBLE_CARDS = 4;

export default function HeroSection({ properties, hero, locale }: HeroSectionProps) {
  const t = useTranslations("hero");

  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const zones = hero?.zones ?? [];

  const filteredProperties =
    selectedZones.length === 0
      ? properties
      : properties.filter((p) => p.zone && selectedZones.includes(p.zone));

  const extraCards = Math.max(0, filteredProperties.length - VISIBLE_CARDS);
  const extraScrollPx = extraCards * CARD_WIDTH_PX;

  // Scroll-hijack: vertical scroll within the wrapper drives horizontal translation
  const handleScroll = useCallback(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const scrolledIn = -rect.top;
    if (scrolledIn <= 0 || extraScrollPx === 0) {
      setTranslateX(0);
      return;
    }
    const maxOffset = (filteredProperties.length - VISIBLE_CARDS) * CARD_WIDTH_PX;
    const offset = Math.min(scrolledIn, maxOffset);
    setTranslateX(offset);
  }, [extraScrollPx, filteredProperties.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Reset translation when filter changes
  useEffect(() => {
    setTranslateX(0);
  }, [selectedZones]);

  // Close filter on outside click
  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [filterOpen]);

  // Close CTA dropdown on outside click
  useEffect(() => {
    if (!ctaOpen) return;
    const handler = (e: MouseEvent) => {
      if (ctaRef.current && !ctaRef.current.contains(e.target as Node)) {
        setCtaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ctaOpen]);

  const toggleZone = (zoneId: string) => {
    setSelectedZones((prev) =>
      prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId]
    );
  };

  const isFiltered = selectedZones.length > 0;
  const isSingleCta = !!hero?.ctaSingle;

  const ctaItems = filteredProperties
    .filter((p) => p.hero.ctaUrl ?? p.airbnbUrl)
    .map((p) => ({
      label: p.hero.ctaLabel ? loc(p.hero.ctaLabel, locale) : loc(p.hero.title, locale),
      url: (p.hero.ctaUrl ?? p.airbnbUrl) as string,
    }));

  return (
    // Outer wrapper: taller than viewport to provide scroll budget for horizontal translation
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${extraScrollPx}px)` }}
      className="relative"
    >
      {/* Sticky inner section that stays in place while user scrolls through cards */}
      <section
        className="sticky top-0 h-screen overflow-hidden flex bg-charcoal"
        style={{ paddingTop: "4rem" /* navbar height */ }}
      >
        {/* Left column — 1/4 width */}
        <div className="flex flex-col justify-center px-8 md:px-12 w-full md:w-1/4 flex-shrink-0 z-10">
          {hero?.tagline && (
            <p
              className="text-ivory text-xl md:text-2xl leading-snug mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(hero.tagline, locale)}
            </p>
          )}

          {/* CTA button */}
          {hero && (
            <div ref={ctaRef} className="relative">
              {isSingleCta ? (
                <a
                  href={hero.ctaSingle!.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
                >
                  {loc(hero.ctaLabel, locale)}
                </a>
              ) : (
                <>
                  <button
                    onClick={() => setCtaOpen((o) => !o)}
                    className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
                  >
                    {loc(hero.ctaLabel, locale)}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${ctaOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {ctaOpen && ctaItems.length > 0 && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-ivory rounded-2xl shadow-2xl overflow-hidden z-50">
                      {ctaItems.map((item) => (
                        <a
                          key={item.url}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setCtaOpen(false)}
                          className="block px-5 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right column — 3/4 width */}
        <div className="hidden md:flex flex-col flex-1 min-w-0 py-6 pr-6">
          {/* Zone filter — above tours only */}
          {zones.length > 0 && (
            <div ref={filterRef} className="relative flex items-center gap-3 mb-4 flex-shrink-0">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-ivory text-sm font-medium px-4 py-2 rounded-full border border-white/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
                </svg>
                {t("filterLabel")}
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isFiltered && (
                <span className="text-ivory/60 text-xs">
                  {t("filteredBadge")}
                </span>
              )}

              {filterOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-ivory rounded-2xl shadow-2xl overflow-hidden z-50">
                  {/* Show all option */}
                  <button
                    onClick={() => {
                      setSelectedZones([]);
                      setFilterOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors border-b border-ochre/20"
                  >
                    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${!isFiltered ? "bg-terracotta border-terracotta" : "border-warm-gray"}`}>
                      {!isFiltered && (
                        <svg className="w-3 h-3 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {t("showAll")}
                  </button>

                  {zones.map((zone) => {
                    const checked = selectedZones.includes(zone.id);
                    return (
                      <button
                        key={zone.id}
                        onClick={() => toggleZone(zone.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors"
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${checked ? "bg-terracotta border-terracotta" : "border-warm-gray"}`}>
                          {checked && (
                            <svg className="w-3 h-3 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {loc(zone.label, locale)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Tour cards track */}
          <div className="flex-1 overflow-hidden relative">
            <div
              className="flex gap-4 h-full transition-transform duration-100 ease-linear"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {filteredProperties.map((property) => (
                <TourCard
                  key={property.id}
                  property={property}
                  locale={locale}
                  cardWidthPx={CARD_WIDTH_PX}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: horizontal swipe */}
        <div className="flex md:hidden flex-col flex-1 min-w-0 py-4 pr-4">
          {zones.length > 0 && (
            <div ref={filterRef} className="relative flex items-center gap-3 mb-3 flex-shrink-0">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className="flex items-center gap-2 bg-white/10 text-ivory text-xs font-medium px-3 py-1.5 rounded-full border border-white/20"
              >
                {t("filterLabel")}
                <svg className={`w-3 h-3 transition-transform ${filterOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isFiltered && <span className="text-ivory/60 text-xs">{t("filteredBadge")}</span>}

              {filterOpen && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-ivory rounded-2xl shadow-2xl overflow-hidden z-50">
                  <button
                    onClick={() => { setSelectedZones([]); setFilterOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 border-b border-ochre/20"
                  >
                    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${!isFiltered ? "bg-terracotta border-terracotta" : "border-warm-gray"}`}>
                      {!isFiltered && <svg className="w-3 h-3 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </span>
                    {t("showAll")}
                  </button>
                  {zones.map((zone) => {
                    const checked = selectedZones.includes(zone.id);
                    return (
                      <button key={zone.id} onClick={() => toggleZone(zone.id)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${checked ? "bg-terracotta border-terracotta" : "border-warm-gray"}`}>
                          {checked && <svg className="w-3 h-3 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </span>
                        {loc(zone.label, locale)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div
            className="flex-1 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredProperties.map((property) => (
              <div key={property.id} className="snap-start flex-shrink-0 w-[80vw] h-full">
                <TourCard property={property} locale={locale} cardWidthPx={undefined} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TourCard({
  property,
  locale,
  cardWidthPx,
}: {
  property: PropertyConfig;
  locale: string;
  cardWidthPx: number | undefined;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0 h-full border border-white/10"
      style={cardWidthPx ? { width: cardWidthPx } : { width: "100%" }}
    >
      {property.kuulaEmbedUrl ? (
        <iframe
          src={property.kuulaEmbedUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          scrolling="no"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: "none" }}
        />
      ) : (
        <div className="absolute inset-0 bg-white/5" />
      )}

      {/* Property title overlay at top */}
      <div className="absolute inset-x-0 top-0 px-5 pt-4 pb-8 bg-gradient-to-b from-charcoal/70 to-transparent pointer-events-none">
        <p
          className="text-ivory text-lg font-semibold drop-shadow"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {loc(property.hero.title, locale)}
        </p>
      </div>
    </div>
  );
}
