"use client";

import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface HeroSectionProps {
  properties: PropertyConfig[];
  locale: string;
}

function gridClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-3";
  return "grid-cols-2";
}

export default function HeroSection({ properties, locale }: HeroSectionProps) {
  const t = useTranslations("cta");
  const primary = properties[0];
  const isSingle = properties.length === 1;

  if (isSingle) {
    return (
      <section
        className="relative w-full"
        style={{ height: "75vh", minHeight: 420 }}
      >
        {primary?.kuulaEmbedUrl ? (
          <iframe
            src={primary.kuulaEmbedUrl}
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
          <div className="absolute inset-0 bg-charcoal" />
        )}

        <div className="absolute inset-x-0 top-0 pt-20 pb-10 px-6 bg-gradient-to-b from-charcoal/65 via-charcoal/25 to-transparent pointer-events-none">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-7xl text-ivory mb-2 leading-tight drop-shadow-lg"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {primary && loc(primary.hero.title, locale)}
            </h1>
            <p className="text-base md:text-xl text-ivory/75 drop-shadow">
              {primary && loc(primary.hero.subtitle, locale)}
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-5 pointer-events-none">
          {primary?.airbnbUrl && (
            <a
              href={primary.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
            >
              {t("button")}
            </a>
          )}
          <div className="pointer-events-none animate-bounce">
            <svg className="w-5 h-5 text-ivory/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-charcoal pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-6xl text-ivory mb-2 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {primary && loc(primary.hero.title, locale)}
          </h1>
          <p className="text-base md:text-xl text-ivory/75">
            {primary && loc(primary.hero.subtitle, locale)}
          </p>
        </div>

        <div className={`grid ${gridClass(properties.length)} gap-4`}>
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-2xl overflow-hidden border border-white/10"
              style={{ height: 320 }}
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
                  style={{ touchAction: "none" }}
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <p className="text-ivory/30 text-sm">{loc(property.hero.title, locale)}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {primary?.airbnbUrl && (
          <div className="flex justify-center mt-8">
            <a
              href={primary.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold px-7 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105 text-sm"
            >
              {t("button")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
