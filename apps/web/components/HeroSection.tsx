"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import type { PropertyConfig, ClientHeroConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface HeroSectionProps {
  properties: PropertyConfig[];
  hero?: ClientHeroConfig;
  locale: string;
}

const CARD_WIDTH_PX = 480;

// Reusable funnel icon for the location filter button
function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
    </svg>
  );
}

// Reusable checkbox with checkmark for filter options
function FilterCheckbox({ checked }: { checked: boolean }) {
  return (
    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${checked ? "bg-terracotta border-terracotta" : "border-warm-gray"}`}>
      {checked && (
        <svg className="w-3 h-3 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
  );
}

export default function HeroSection({ properties, hero, locale }: HeroSectionProps) {
  const t = useTranslations("hero");

  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [maxScrollOffset, setMaxScrollOffset] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  // Separate refs for desktop/mobile filter — both exist in DOM simultaneously (one hidden via CSS)
  const filterDesktopRef = useRef<HTMLDivElement>(null);
  const filterMobileRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const toursContainerRef = useRef<HTMLDivElement>(null);

  const zones = hero?.zones ?? [];

  const filteredProperties = useMemo(
    () =>
      selectedZones.length === 0
        ? properties
        : properties.filter((p) => p.zone && selectedZones.includes(p.zone)),
    [properties, selectedZones]
  );

  // Memoize CTA items — derived from filtered properties and locale
  const ctaItems = useMemo(
    () =>
      filteredProperties
        .filter((p) => p.hero.ctaUrl ?? p.airbnbUrl)
        .map((p) => ({
          label: p.hero.ctaLabel ? loc(p.hero.ctaLabel, locale) : loc(p.hero.title, locale),
          url: (p.hero.ctaUrl ?? p.airbnbUrl) as string,
        })),
    [filteredProperties, locale]
  );

  // Measure the real max scroll distance via ResizeObserver (async callback — no setState-in-effect issue)
  useEffect(() => {
    const track = trackRef.current;
    const container = toursContainerRef.current;
    if (!track || !container) return;
    const observer = new ResizeObserver(() => {
      setMaxScrollOffset(Math.max(0, track.scrollWidth - container.clientWidth));
    });
    observer.observe(track);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Scroll-hijack: reads from DOM refs directly — no stale closures
  const handleScroll = useCallback(() => {
    if (!wrapperRef.current || !trackRef.current || !toursContainerRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const scrolledIn = -rect.top;
    if (scrolledIn <= 0) {
      setTranslateX(0);
      return;
    }
    const max = Math.max(0, trackRef.current.scrollWidth - toursContainerRef.current.clientWidth);
    setTranslateX(Math.min(scrolledIn, max));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close filter on outside click — checks both desktop and mobile refs
  useEffect(() => {
    if (!filterOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = filterDesktopRef.current?.contains(target);
      const inMobile = filterMobileRef.current?.contains(target);
      if (!inDesktop && !inMobile) setFilterOpen(false);
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
    setTranslateX(0);
    setSelectedZones((prev) =>
      prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId]
    );
  };

  const isFiltered = selectedZones.length > 0;
  const isSingleCta = !!hero?.ctaSingle;

  // Shared filter dropdown content (used in both desktop and mobile)
  const filterDropdown = (width: string) => (
    <div className={`absolute left-0 top-full mt-2 ${width} bg-ivory rounded-2xl shadow-2xl overflow-hidden z-50`}>
      <button
        onClick={() => { setTranslateX(0); setSelectedZones([]); setFilterOpen(false); }}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors border-b border-ochre/20"
      >
        <FilterCheckbox checked={!isFiltered} />
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
            <FilterCheckbox checked={checked} />
            {loc(zone.label, locale)}
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      id="hero"
      ref={wrapperRef}
      style={{ height: `calc(100vh + ${maxScrollOffset}px)` }}
      className="relative"
    >
      <section
        className="sticky top-0 h-screen overflow-hidden flex flex-col md:flex-row bg-charcoal"
        style={{ paddingTop: "4rem" }}
      >
        {/* Left column — 37.5% width */}
        <div className="flex flex-col justify-center px-8 md:px-12 w-full md:w-[37.5%] flex-shrink-0 z-10 h-[37.5vh] md:h-auto">
          {hero?.tagline && (
            <p
              className="text-ivory text-3xl md:text-5xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(hero.tagline, locale)}
            </p>
          )}

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
                    aria-expanded={ctaOpen}
                    aria-haspopup="listbox"
                    className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
                  >
                    {loc(hero.ctaLabel, locale)}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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

        {/* Right column — desktop */}
        <div className="hidden md:flex flex-col flex-1 min-w-0 py-6 pr-6">
          {zones.length > 0 && (
            <div ref={filterDesktopRef} className="relative flex items-center gap-3 mb-4 flex-shrink-0">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                aria-expanded={filterOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-ivory text-sm font-medium px-4 py-2 rounded-full border border-white/20 transition-colors"
              >
                <FunnelIcon className="w-4 h-4" />
                {t("filterLabel")}
              </button>

              {isFiltered && (
                <span className="text-ivory/60 text-xs">{t("filteredBadge")}</span>
              )}

              {filterOpen && filterDropdown("w-56")}
            </div>
          )}

          {/* Tour cards track — no CSS transition: scroll-driven animation must be instantaneous */}
          <div ref={toursContainerRef} className="flex-1 overflow-hidden relative">
            <div
              ref={trackRef}
              className="flex gap-4 h-full"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {filteredProperties.map((property) => (
                <TourCard key={property.id} property={property} locale={locale} cardWidthPx={CARD_WIDTH_PX} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column — mobile (horizontal swipe) */}
        <div className="flex md:hidden flex-col flex-1 min-w-0 py-4 pr-4">
          {zones.length > 0 && (
            <div ref={filterMobileRef} className="relative flex items-center gap-3 mb-3 flex-shrink-0">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                aria-expanded={filterOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-2 bg-white/10 text-ivory text-xs font-medium px-3 py-1.5 rounded-full border border-white/20"
              >
                <FunnelIcon className="w-3.5 h-3.5" />
                {t("filterLabel")}
              </button>
              {isFiltered && <span className="text-ivory/60 text-xs">{t("filteredBadge")}</span>}
              {filterOpen && filterDropdown("w-52")}
            </div>
          )}

          {/* scrollbarWidth hides scrollbar in Firefox; [&::-webkit-scrollbar]:hidden for Chrome/Safari */}
          <div
            className="flex-1 flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
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
