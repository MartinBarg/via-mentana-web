"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import type { PropertyConfig, ClientHeroConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";
import { useRealEstateFilters, RealEstateInlineFilters } from "@/components/RealEstateFilters";

interface HeroSectionProps {
  properties: PropertyConfig[];
  hero?: ClientHeroConfig;
  locale: string;
  selectedPropertyId: string;
  onSelectProperty: (id: string) => void;
  backgroundImageUrl?: string;
  noOverlay?: boolean;
}

const CARD_WIDTH_PX = 480;

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 12h10M11 20h2" />
    </svg>
  );
}

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

export default function HeroSection({ properties, hero, locale, selectedPropertyId, onSelectProperty, backgroundImageUrl, noOverlay }: HeroSectionProps) {
  const t = useTranslations("hero");

  const isRealEstate = hero?.realEstateFilters === true;

  // Real estate filter hook (always called — hook rules)
  const reFilters = useRealEstateFilters(properties);

  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [maxScrollOffset, setMaxScrollOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Mobile scrollbar state
  const [scrollbarThumb, setScrollbarThumb] = useState({ left: 0, width: 100 });
  const [isDraggingScrollbar, setIsDraggingScrollbar] = useState(false);

  // Desktop scrollbar state
  const [isDraggingDesktopScrollbar, setIsDraggingDesktopScrollbar] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const filterDesktopRef = useRef<HTMLDivElement>(null);
  const filterMobileRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const toursContainerRef = useRef<HTMLDivElement>(null);

  // Mobile scrollbar refs
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const scrollbarTrackRef = useRef<HTMLDivElement>(null);
  const dragStartScrollbarX = useRef(0);
  const dragStartCarouselScroll = useRef(0);

  // Desktop scrollbar refs
  const desktopScrollbarTrackRef = useRef<HTMLDivElement>(null);
  const dragStartDesktopScrollbarX = useRef(0);
  const dragStartDesktopTranslateX = useRef(0);

  const zones = hero?.zones ?? [];

  const filteredProperties = useMemo(() => {
    if (isRealEstate) return reFilters.filteredProperties;
    if (hero?.guestFilter) {
      return selectedGuests === null
        ? properties
        : properties.filter((p) => p.guests !== undefined && p.guests >= selectedGuests);
    }
    return selectedZones.length === 0
      ? properties
      : properties.filter((p) => p.zone && selectedZones.includes(p.zone));
  }, [isRealEstate, reFilters.filteredProperties, properties, selectedZones, selectedGuests, hero?.guestFilter]);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) ?? properties[0];
  const ctaUrl = hero?.ctaSingle
    ? hero.ctaSingle.url
    : (selectedProperty?.hero.ctaUrl ?? selectedProperty?.airbnbUrl);

  useEffect(() => {
    const track = trackRef.current;
    const container = toursContainerRef.current;
    if (!track || !container) return;
    const observer = new ResizeObserver(() => {
      setMaxScrollOffset(Math.max(0, track.scrollWidth - container.clientWidth));
      setContainerWidth(container.clientWidth);
    });
    observer.observe(track);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    function updateScrollbar() {
      const maxScroll = el!.scrollWidth - el!.clientWidth;
      const widthPct = el!.scrollWidth > 0 ? (el!.clientWidth / el!.scrollWidth) * 100 : 100;
      const leftPct = maxScroll > 0 ? (el!.scrollLeft / maxScroll) * (100 - widthPct) : 0;
      setScrollbarThumb({ left: leftPct, width: widthPct });
    }
    updateScrollbar();
    el.addEventListener("scroll", updateScrollbar, { passive: true });
    const ro = new ResizeObserver(updateScrollbar);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollbar);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    const widthPct = el.scrollWidth > 0 ? (el.clientWidth / el.scrollWidth) * 100 : 100;
    setScrollbarThumb({ left: 0, width: widthPct });
  }, [filteredProperties]);

  useEffect(() => {
    const track = trackRef.current;
    const container = toursContainerRef.current;
    if (!track || !container) return;
    const raf = requestAnimationFrame(() => {
      setMaxScrollOffset(Math.max(0, track.scrollWidth - container.clientWidth));
      setContainerWidth(container.clientWidth);
    });
    return () => cancelAnimationFrame(raf);
  }, [filteredProperties]);

  useEffect(() => {
    if (filteredProperties.length === 0) return;
    const isVisible = filteredProperties.some((p) => p.id === selectedPropertyId);
    if (!isVisible) onSelectProperty(filteredProperties[0].id);
  }, [filteredProperties, selectedPropertyId, onSelectProperty]);

  function handleScrollbarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = mobileCarouselRef.current;
    const track = scrollbarTrackRef.current;
    if (!el || !track) return;
    e.preventDefault();
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft = ratio * maxScroll;
    setIsDraggingScrollbar(true);
    dragStartScrollbarX.current = e.clientX;
    dragStartCarouselScroll.current = el.scrollLeft;
    track.setPointerCapture(e.pointerId);
  }

  function handleScrollbarPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingScrollbar) return;
    const el = mobileCarouselRef.current;
    const track = scrollbarTrackRef.current;
    if (!el || !track) return;
    const dx = e.clientX - dragStartScrollbarX.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const newScroll = dragStartCarouselScroll.current + (dx / track.clientWidth) * el.scrollWidth;
    el.scrollLeft = Math.max(0, Math.min(maxScroll, newScroll));
  }

  function handleScrollbarPointerUp() {
    setIsDraggingScrollbar(false);
  }

  function handleDesktopScrollbarPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const track = desktopScrollbarTrackRef.current;
    if (!track || !wrapperRef.current) return;
    e.preventDefault();
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const desiredTranslateX = Math.max(0, Math.min(maxScrollOffset, ratio * maxScrollOffset));
    window.scrollTo({ top: wrapperRef.current.offsetTop + desiredTranslateX });
    setIsDraggingDesktopScrollbar(true);
    dragStartDesktopScrollbarX.current = e.clientX;
    dragStartDesktopTranslateX.current = desiredTranslateX;
    track.setPointerCapture(e.pointerId);
  }

  function handleDesktopScrollbarPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingDesktopScrollbar) return;
    const track = desktopScrollbarTrackRef.current;
    if (!track || !wrapperRef.current || !trackRef.current) return;
    const dx = e.clientX - dragStartDesktopScrollbarX.current;
    const totalContentWidth = trackRef.current.scrollWidth;
    const newTranslateX = Math.max(0, Math.min(maxScrollOffset,
      dragStartDesktopTranslateX.current + (dx / track.clientWidth) * totalContentWidth
    ));
    window.scrollTo({ top: wrapperRef.current.offsetTop + newTranslateX });
  }

  function handleDesktopScrollbarPointerUp() {
    setIsDraggingDesktopScrollbar(false);
  }

  const toggleZone = (zoneId: string) => {
    setTranslateX(0);
    setSelectedZones((prev) =>
      prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId]
    );
  };

  const toggleGuests = (n: number) => {
    setTranslateX(0);
    setSelectedGuests((prev) => (prev === n ? null : n));
    setFilterOpen(false);
  };

  const isFiltered = isRealEstate
    ? reFilters.isFiltered
    : hero?.guestFilter
      ? selectedGuests !== null
      : selectedZones.length > 0;

  const desktopThumbWidth = containerWidth > 0 && maxScrollOffset > 0
    ? (containerWidth / (containerWidth + maxScrollOffset)) * 100
    : 100;
  const desktopThumbLeft = maxScrollOffset > 0
    ? (translateX / maxScrollOffset) * (100 - desktopThumbWidth)
    : 0;

  // Labels for the real estate inline filters
  const reLabels = {
    rental: t("reRental"),
    purchase: t("rePurchase"),
    price: t("rePrice"),
    monthlyPrice: t("reMonthlyPrice"),
    totalPrice: t("reTotalPrice"),
    rooms: t("reRooms"),
    zone: t("reZone"),
    m2: t("reM2"),
    clearFilters: t("reClearFilters"),
    selectOpFirst: t("reSelectOpFirst"),
    noProps: t("reNoProps"),
  };

  // Non-RE filter dropdown (zone checkboxes or guest picker)
  const filterDropdown = (panelClass: string) => (
    <div className={`absolute left-0 top-full mt-2 ${panelClass} bg-ivory rounded-2xl shadow-2xl overflow-hidden z-50`}>
      {hero?.guestFilter ? (
        <>
          <button
            onClick={() => { setTranslateX(0); setSelectedGuests(null); setFilterOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors border-b border-ochre/20"
          >
            <FilterCheckbox checked={selectedGuests === null} />
            {t("showAll")}
          </button>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => toggleGuests(n)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors"
            >
              <FilterCheckbox checked={selectedGuests === n} />
              {n}
            </button>
          ))}
        </>
      ) : (
        <>
          <button
            onClick={() => { setTranslateX(0); setSelectedZones([]); setFilterOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors border-b border-ochre/20"
          >
            <FilterCheckbox checked={!isFiltered} />
            {t("showAll")}
          </button>
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => toggleZone(zone.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors"
            >
              <FilterCheckbox checked={selectedZones.includes(zone.id)} />
              {loc(zone.label, locale)}
            </button>
          ))}
        </>
      )}
    </div>
  );

  // Shared scrollbar for desktop
  const desktopScrollbar = (
    <div
      ref={desktopScrollbarTrackRef}
      className="flex-1 relative h-[1.75rem] rounded-full bg-white/10 border border-white/20 overflow-hidden touch-none cursor-pointer"
      onPointerDown={handleDesktopScrollbarPointerDown}
      onPointerMove={handleDesktopScrollbarPointerMove}
      onPointerUp={handleDesktopScrollbarPointerUp}
    >
      <div className="absolute inset-1">
        <div
          className="absolute inset-y-0 rounded-full bg-ivory/60"
          style={{ left: `${desktopThumbLeft}%`, width: `${desktopThumbWidth}%` }}
        />
      </div>
    </div>
  );

  // Shared scrollbar for mobile
  const mobileScrollbar = (
    <div
      ref={scrollbarTrackRef}
      className="flex-1 relative h-[1.75rem] rounded-full bg-white/10 border border-white/20 overflow-hidden touch-none cursor-pointer"
      onPointerDown={handleScrollbarPointerDown}
      onPointerMove={handleScrollbarPointerMove}
      onPointerUp={handleScrollbarPointerUp}
    >
      <div className="absolute inset-1">
        <div
          className="absolute inset-y-0 rounded-full bg-ivory/60"
          style={{ left: `${scrollbarThumb.left}%`, width: `${scrollbarThumb.width}%` }}
        />
      </div>
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
        className={`sticky top-0 h-[100svh] md:h-screen overflow-hidden flex flex-col md:flex-row ${backgroundImageUrl ? "bg-transparent" : "bg-charcoal"}`}
        style={{ paddingTop: "4rem" }}
      >
        {backgroundImageUrl && !noOverlay && (
          <div className="absolute inset-0 bg-charcoal/55 pointer-events-none z-0" />
        )}

        {/* Left column */}
        <div className="flex flex-col justify-center px-8 md:px-12 w-full md:w-[37.5%] flex-shrink-0 z-10 h-[37.5svh] md:h-auto">
          {hero?.tagline && (
            <p
              className="text-ivory text-3xl md:text-5xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(hero.tagline, locale)}
            </p>
          )}
          {hero && ctaUrl && (
            <a
              id="hero-cta"
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
            >
              {loc(hero.ctaLabel, locale)}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          )}
        </div>

        {/* Right column — desktop */}
        <div className="hidden md:flex flex-col flex-1 min-w-0 py-6 pr-6">

          {/* RE: inline filters above everything */}
          {isRealEstate && (
            <RealEstateInlineFilters
              api={reFilters}
              allZones={hero?.zones ?? []}
              locale={locale}
              accent="var(--color-terracotta)"
              labels={reLabels}
            />
          )}

          {/* Non-RE: filter button + scrollbar in same row */}
          {!isRealEstate && (zones.length > 0 || hero?.guestFilter || maxScrollOffset > 0) && (
            <div ref={filterDesktopRef} className="relative flex items-center gap-3 mb-4 flex-shrink-0">
              {(zones.length > 0 || hero?.guestFilter) && (
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setFilterOpen((o) => !o)}
                    aria-expanded={filterOpen}
                    aria-haspopup="listbox"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-ivory text-sm font-medium px-4 py-2 rounded-full border border-white/20 transition-colors"
                  >
                    <FunnelIcon className="w-4 h-4" />
                    {hero?.guestFilter
                      ? (selectedGuests !== null ? `${selectedGuests}` : t("guestsLabel"))
                      : t("filterLabel")}
                  </button>
                  {filterOpen && filterDropdown("w-52")}
                </div>
              )}
              {isFiltered && (
                <span className="text-ivory/60 text-xs flex-shrink-0">
                  {hero?.guestFilter ? t("guestsFilteredBadge") : t("filteredBadge")}
                </span>
              )}
              {maxScrollOffset > 0 && desktopScrollbar}
            </div>
          )}

          {/* RE: "Filtros aplicados" + scrollbar row */}
          {isRealEstate && (
            <div className="flex items-center gap-3 mb-3 flex-shrink-0">
              {isFiltered && (
                <span className="text-ivory/55 text-xs flex-shrink-0 whitespace-nowrap">
                  {t("reAppliedFilters")}
                </span>
              )}
              {desktopScrollbar}
            </div>
          )}

          {/* Tour cards track */}
          <div ref={toursContainerRef} className="flex-1 overflow-hidden relative">
            <div
              ref={trackRef}
              className="flex gap-4 h-full"
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {filteredProperties.map((property) => (
                <TourCard
                  key={property.id}
                  property={property}
                  locale={locale}
                  cardWidthPx={CARD_WIDTH_PX}
                  isSelected={selectedPropertyId === property.id}
                  onSelect={() => onSelectProperty(property.id)}
                  showSelectButton={properties.length > 1}
                  selectLabel={t("select")}
                  selectedLabel={t("selected")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column — mobile */}
        <div className="flex md:hidden flex-col flex-1 min-w-0 py-4 px-4 overflow-hidden">

          {/* RE: inline filters */}
          {isRealEstate && (
            <RealEstateInlineFilters
              api={reFilters}
              allZones={hero?.zones ?? []}
              locale={locale}
              accent="var(--color-terracotta)"
              labels={reLabels}
            />
          )}

          {/* Scrollbar row (non-RE has filter button here too) */}
          <div ref={filterMobileRef} className="relative flex items-center gap-3 mb-3 flex-shrink-0">
            {/* Non-RE filter button */}
            {!isRealEstate && (zones.length > 0 || hero?.guestFilter) && (
              <button
                onClick={() => setFilterOpen((o) => !o)}
                aria-expanded={filterOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-2 bg-white/10 text-ivory text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 flex-shrink-0"
              >
                <FunnelIcon className="w-3.5 h-3.5" />
                {hero?.guestFilter
                  ? (selectedGuests !== null ? `${selectedGuests}` : t("guestsLabel"))
                  : t("filterLabel")}
              </button>
            )}
            {/* Non-RE filtered badge */}
            {isFiltered && !isRealEstate && (
              <span className="text-ivory/60 text-xs flex-shrink-0">
                {hero?.guestFilter ? t("guestsFilteredBadge") : t("filteredBadge")}
              </span>
            )}
            {/* RE: "Filtros aplicados" badge */}
            {isRealEstate && isFiltered && (
              <span className="text-ivory/55 text-xs flex-shrink-0 whitespace-nowrap">
                {t("reAppliedFilters")}
              </span>
            )}
            {filterOpen && !isRealEstate && filterDropdown("w-52")}
            {mobileScrollbar}
          </div>

          {/* Carousel */}
          <div
            ref={mobileCarouselRef}
            className="flex-1 flex gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredProperties.map((property) => (
              <div key={property.id} className="flex-shrink-0 w-[75vw] h-full">
                <TourCard
                  property={property}
                  locale={locale}
                  cardWidthPx={undefined}
                  isSelected={selectedPropertyId === property.id}
                  onSelect={() => onSelectProperty(property.id)}
                  showSelectButton={properties.length > 1}
                  selectLabel={t("select")}
                  selectedLabel={t("selected")}
                />
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
  isSelected,
  onSelect,
  showSelectButton,
  selectLabel,
  selectedLabel,
}: {
  property: PropertyConfig;
  locale: string;
  cardWidthPx: number | undefined;
  isSelected: boolean;
  onSelect: () => void;
  showSelectButton: boolean;
  selectLabel: string;
  selectedLabel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [iframeActive, setIframeActive] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !property.kuulaEmbedUrl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIframeActive(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [property.kuulaEmbedUrl]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden flex-shrink-0 h-full border border-white/10"
      style={cardWidthPx ? { width: cardWidthPx } : { width: "100%" }}
    >
      {property.kuulaEmbedUrl ? (
        <iframe
          src={iframeActive ? property.kuulaEmbedUrl : undefined}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          scrolling="no"
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: "none" }}
        />
      ) : property.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={property.imageUrl}
          alt={loc(property.hero.title, locale)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-white/5" />
      )}

      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-charcoal/70 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 top-0 px-5 pt-4 pointer-events-none">
        <p
          className="text-ivory text-lg font-semibold drop-shadow"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {loc(property.hero.title, locale)}
        </p>
        {showSelectButton && (
          <button
            onClick={onSelect}
            className={`pointer-events-auto ` + (isSelected
              ? "mt-2 flex items-center gap-1.5 bg-terracotta text-ivory text-xs font-medium px-3 py-1 rounded-full"
              : "mt-2 text-ivory border border-white/40 text-xs font-medium px-3 py-1 rounded-full hover:border-white/70 transition-colors"
            )}
          >
            {isSelected && (
              <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
            {isSelected ? selectedLabel : selectLabel}
          </button>
        )}
      </div>
    </div>
  );
}
