"use client";

import { useTranslations } from "next-intl";

const AIRBNB_URL =
  "https://www.airbnb.mx/rooms/1005789413503850183?guests=1&adults=1&s=67&unique_share_id=009d20fc-2d8f-4091-828b-b286785004ec";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative w-full" style={{ height: "100svh" }}>
      {/* Kuula 360 iframe */}
      <iframe
        src="https://kuula.co/share/collection/7MVhN?logo=-1&info=0&fs=1&vr=1&sd=1&autorotate=0.16&thumbs=4&alpha=0.60&inst=0"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
        className="absolute inset-0 w-full h-full"
      />

      {/* Overlay superior con título */}
      <div className="absolute inset-x-0 top-0 pt-24 pb-12 px-6 bg-gradient-to-b from-charcoal/70 via-charcoal/30 to-transparent pointer-events-none">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-5xl md:text-7xl text-ivory mb-3 leading-tight drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t("title")}
          </h1>
          <p className="text-lg md:text-xl text-ivory/80 drop-shadow">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* CTA inferior */}
      <div className="absolute inset-x-0 bottom-8 flex justify-center pointer-events-auto">
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-base"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
