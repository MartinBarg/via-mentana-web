"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface LocationSectionProps {
  property: PropertyConfig;
  locale: string;
}

// Total scroll budget to play through the whole video (in vh units)
const VIDEO_SCROLL_VH = 300;
// Progress threshold (0–1) at which the title starts rising
const TITLE_RAISE_START = 0.82;

export default function LocationSection({ property, locale }: LocationSectionProps) {
  const t = useTranslations("location");

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoZoneRef = useRef<HTMLDivElement>(null);

  const [titleTranslateY, setTitleTranslateY] = useState(0);

  const videoUrl = property.location?.videoUrl;
  const posterUrl = videoUrl?.replace(/\.mp4$/, "-poster.jpg");

  // iOS Safari: play()+pause() unlocks seeking for muted videos without requiring a user gesture.
  // Without this, iOS ignores preload="auto" and video.duration stays NaN, breaking scrubbing.
  useEffect(() => {
    if (!videoUrl || !videoZoneRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!entry.isIntersecting || !video || video.readyState >= 2) return;
        video
          .play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {
            // Fallback for browsers that still refuse play() — just trigger load
            video.load();
          });
      },
      { rootMargin: "0px 0px 400px 0px" } // start loading 400px before zone enters viewport
    );

    observer.observe(videoZoneRef.current);
    return () => observer.disconnect();
  }, [videoUrl]);

  // Scrub video as user scrolls through the video zone
  useEffect(() => {
    if (!videoUrl) return;

    let rafPending = false;

    const scrub = () => {
      rafPending = false;
      const zone = videoZoneRef.current;
      const video = videoRef.current;
      if (!zone || !video || !video.duration) return;

      const scrollable = zone.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, (window.scrollY - zone.offsetTop) / scrollable));
      const targetTime = progress * video.duration;

      // Skip seek if we're still on the same frame (avoids redundant decoder work)
      const frameDuration = 1 / 30;
      if (Math.abs(video.currentTime - targetTime) >= frameDuration * 0.5) {
        // fastSeek is optimized for scrubbing in browsers that support it (Firefox, Safari)
        const v = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
        if (typeof v.fastSeek === "function") {
          v.fastSeek(targetTime);
        } else {
          v.currentTime = targetTime;
        }
      }

      if (progress >= TITLE_RAISE_START) {
        const raise = ((progress - TITLE_RAISE_START) / (1 - TITLE_RAISE_START)) * 80;
        setTitleTranslateY(raise);
      } else {
        setTitleTranslateY(0);
      }
    };

    const onScroll = () => {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(scrub);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [videoUrl]);

  // Skip the video zone when the user scrolls UP from the content section.
  // Only wheel/touch events are intercepted so that programmatic scrolls
  // (e.g. navbar anchor links) pass through normally.
  useEffect(() => {
    if (!videoUrl) return;

    const getContentThreshold = () => {
      const zone = videoZoneRef.current;
      if (!zone) return Infinity;
      return zone.offsetTop + zone.offsetHeight - window.innerHeight;
    };

    const jumpToBeforeZone = () => {
      const zone = videoZoneRef.current;
      if (zone) window.scrollTo({ top: Math.max(0, zone.offsetTop - 1), behavior: "instant" });
    };

    // Desktop: wheel event
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY >= 0) return; // only upward scroll
      if (window.scrollY <= getContentThreshold()) return; // not in content zone
      e.preventDefault();
      jumpToBeforeZone();
    };

    // Mobile: touch events
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      // dy < 0 → finger moved down → page scrolls up
      const dy = touchStartY - e.touches[0].clientY;
      if (dy >= 0) return;
      if (window.scrollY <= getContentThreshold()) return;
      e.preventDefault();
      jumpToBeforeZone();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [videoUrl]);

  if (!property.location) return null;

  const { title, subtitle, description, categories } = property.location;

  return (
    <>
      {/* ── Video scroll zone ── */}
      {videoUrl && (
        <div
          id="location"
          ref={videoZoneRef}
          style={{ height: `${VIDEO_SCROLL_VH}vh` }}
          className="relative"
        >
          <div className="sticky top-0 h-screen overflow-hidden bg-black">
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />

            {/* Bottom gradient for text readability */}
            <div
              className="absolute inset-x-0 bottom-0 h-64 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}
              aria-hidden="true"
            />

            {/* Title + subtitle overlay — rises near video end */}
            <div
              className="absolute inset-x-0 bottom-0 pb-14 text-center pointer-events-none will-change-transform"
              style={{ transform: `translateY(${-titleTranslateY}px)` }}
              aria-hidden="true"
            >
              <h2
                className="text-5xl md:text-6xl text-ivory drop-shadow-lg"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                {loc(title, locale)}
              </h2>
              <p className="text-terracotta font-medium text-lg mt-3 drop-shadow">
                {loc(subtitle, locale)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Location content section ── */}
      <section
        id={!videoUrl ? "location" : undefined}
        className="py-24 px-6 bg-charcoal text-ivory"
      >
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl mb-4"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(title, locale)}
            </h2>
            <p className="text-terracotta font-medium text-lg">{loc(subtitle, locale)}</p>
            <p className="text-ivory/50 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              {loc(description, locale)}
            </p>
          </div>

          {/* Map */}
          {property.googleMapsEmbedUrl && (
            <div className="mb-16 rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={property.googleMapsEmbedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}

          {/* POI grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.key}
                className="border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors"
              >
                <h4 className="font-medium text-terracotta mb-3 text-xs uppercase tracking-widest">
                  {loc(cat.label, locale)}
                </h4>
                <ul className="space-y-2">
                  {cat.places.map((place) => (
                    <li key={place.name["en"]} className="flex items-baseline justify-between gap-3">
                      <span className="text-ivory/65 text-sm leading-tight">
                        {loc(place.name, locale)}
                      </span>
                      <span className="text-ivory/35 text-xs font-light whitespace-nowrap flex-shrink-0">
                        {place.distance}{t("distance")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
