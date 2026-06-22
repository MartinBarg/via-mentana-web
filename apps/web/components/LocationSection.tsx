"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface LocationSectionProps {
  property: PropertyConfig;
  locale: string;
}

// Scroll budget for video scrubbing (vh units)
const VIDEO_SCROLL_VH = 300;
// Extra scroll budget for the curtain-open animation (after video finishes)
const CURTAIN_SCROLL_VH = 100;
// Total zone height
const TOTAL_SCROLL_VH = VIDEO_SCROLL_VH + CURTAIN_SCROLL_VH;
// Fraction of total zone used for video scrubbing (300/400 = 0.75)
const VIDEO_FRACTION = VIDEO_SCROLL_VH / TOTAL_SCROLL_VH;
// Title starts rising at 80% of the video phase = 0.75 * 0.80 = 0.60 of total
const TITLE_RAISE_START = VIDEO_FRACTION * 0.8;
// Curtain opens after video is fully played
const CURTAIN_START = VIDEO_FRACTION;

export default function LocationSection({ property, locale }: LocationSectionProps) {
  const t = useTranslations("location");

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRefRight = useRef<HTMLVideoElement>(null);
  const videoZoneRef = useRef<HTMLDivElement>(null);

  // Vertical offset in px for the title overlay: large = near bottom, 0 = resting at top-20
  const [titleOffset, setTitleOffset] = useState(0);
  // 0 = curtain closed (video covers screen), 1 = curtain fully open
  const [curtainProgress, setCurtainProgress] = useState(0);

  const videoUrl = property.location?.videoUrl;
  const posterUrl = videoUrl?.replace(/\.mp4$/, "-poster.jpg");

  // iOS Safari ignores preload="auto". On first user interaction call play()+pause() on both
  // video elements to unlock seeking before the user reaches the location section.
  useEffect(() => {
    if (!videoUrl) return;

    const unlock = () => {
      [videoRef.current, videoRefRight.current].forEach((video) => {
        if (!video || video.readyState >= 2) return;
        video
          .play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {
            video.load();
          });
      });
    };

    window.addEventListener("touchstart", unlock, { passive: true, once: true });
    window.addEventListener("scroll", unlock, { passive: true, once: true });
    window.addEventListener("click", unlock, { passive: true, once: true });

    return () => {
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
      window.removeEventListener("click", unlock);
    };
  }, [videoUrl]);

  // Scrub both video panels as user scrolls, then animate title rise and curtain open
  useEffect(() => {
    if (!videoUrl) return;

    let rafPending = false;

    const seekBoth = (targetTime: number) => {
      const frameDuration = 1 / 30;
      [videoRef.current, videoRefRight.current].forEach((v) => {
        if (!v) return;
        if (Math.abs(v.currentTime - targetTime) < frameDuration * 0.5) return;
        const vf = v as HTMLVideoElement & { fastSeek?: (t: number) => void };
        if (typeof vf.fastSeek === "function") {
          vf.fastSeek(targetTime);
        } else {
          v.currentTime = targetTime;
        }
      });
    };

    const scrub = () => {
      rafPending = false;
      const zone = videoZoneRef.current;
      const video = videoRef.current;
      if (!zone || !video || !video.duration) return;

      const scrollable = zone.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, (window.scrollY - zone.offsetTop) / scrollable));

      // Video scrubs only through the VIDEO_FRACTION of total scroll budget
      const videoProgress = Math.min(1, progress / VIDEO_FRACTION);
      seekBoth(videoProgress * video.duration);

      // Title offset: starts near viewport bottom, rises to 0 (top-20 resting position)
      const bottomOffset = window.innerHeight - 200;
      if (progress < TITLE_RAISE_START) {
        setTitleOffset(bottomOffset);
      } else if (progress < CURTAIN_START) {
        const raise = (progress - TITLE_RAISE_START) / (CURTAIN_START - TITLE_RAISE_START);
        setTitleOffset((1 - raise) * bottomOffset);
      } else {
        setTitleOffset(0);
      }

      // Curtain opens after video is done
      if (progress >= CURTAIN_START) {
        setCurtainProgress((progress - CURTAIN_START) / (1 - CURTAIN_START));
      } else {
        setCurtainProgress(0);
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
          style={{ height: `${TOTAL_SCROLL_VH}vh` }}
          className="relative z-10"
        >
          <div className="sticky top-0 h-screen overflow-hidden">

            {/* Layer 1: left curtain panel — shows left half of video, slides left */}
            <div
              className="absolute inset-0 z-10 overflow-hidden will-change-transform"
              style={{
                clipPath: "inset(0 50% 0 0)",
                transform: `translateX(${-curtainProgress * 50}%)`,
              }}
              aria-hidden="true"
            >
              <video
                ref={videoRef}
                src={videoUrl}
                poster={posterUrl}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Layer 2: right curtain panel — shows right half of video, slides right */}
            <div
              className="absolute inset-0 z-10 overflow-hidden will-change-transform"
              style={{
                clipPath: "inset(0 0 0 50%)",
                transform: `translateX(${curtainProgress * 50}%)`,
              }}
              aria-hidden="true"
            >
              <video
                ref={videoRefRight}
                src={videoUrl}
                poster={posterUrl}
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Layer 3: bottom gradient — fades out as curtain opens */}
            <div
              className="absolute inset-x-0 bottom-0 h-64 pointer-events-none z-20"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
                opacity: 1 - curtainProgress,
              }}
              aria-hidden="true"
            />

            {/* Layer 4: title overlay — always visible above curtain, rises from bottom to top */}
            <div
              className="absolute inset-x-0 top-20 text-center pointer-events-none will-change-transform z-30"
              style={{ transform: `translateY(${titleOffset}px)` }}
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
      {/* margin-top: -100vh overlaps this section behind the curtain zone so the
          content (map, POIs) is revealed through the opening panels */}
      <section
        id={!videoUrl ? "location" : undefined}
        className="py-24 px-6 bg-charcoal text-ivory"
        style={videoUrl ? { marginTop: "-100vh" } : undefined}
      >
        <div className="max-w-5xl mx-auto">

          {/* Header — title/subtitle only shown when there's no video (video delivers them via animation) */}
          <div className="text-center mb-16">
            {!videoUrl && (
              <>
                <h2
                  className="text-4xl md:text-5xl mb-4"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  {loc(title, locale)}
                </h2>
                <p className="text-terracotta font-medium text-lg">{loc(subtitle, locale)}</p>
              </>
            )}
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
