"use client";

import { useTranslations } from "next-intl";

const AIRBNB_URL =
  "https://www.airbnb.mx/rooms/1005789413503850183?guests=1&adults=1&s=67&unique_share_id=009d20fc-2d8f-4091-828b-b286785004ec";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      className="relative w-full"
      style={{ height: "75vh", minHeight: 420 }}
    >
      {/* Kuula 360 iframe — ocupa todo el hero */}
      <iframe
        src="https://kuula.co/share/collection/7MVhN?logo=-1&info=0&fs=1&vr=1&sd=1&autorotate=0.16&thumbs=4&alpha=0.60&inst=0"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: "none" }}
      />

      {/* Overlay top — título */}
      <div className="absolute inset-x-0 top-0 pt-20 pb-10 px-6 bg-gradient-to-b from-charcoal/65 via-charcoal/25 to-transparent pointer-events-none">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="text-4xl md:text-7xl text-ivory mb-2 leading-tight drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t("title")}
          </h1>
          <p className="text-base md:text-xl text-ivory/75 drop-shadow">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* CTA + flecha scroll — bottom */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-5 pointer-events-none">
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
        >
          {t("cta")}
        </a>

        {/* Flecha scroll — señal visual para bajar en mobile */}
        <div className="pointer-events-none animate-bounce">
          <svg className="w-5 h-5 text-ivory/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
