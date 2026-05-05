"use client";

import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface LocationSectionProps {
  property: PropertyConfig;
  locale: string;
}

export default function LocationSection({ property, locale }: LocationSectionProps) {
  const t = useTranslations("location");

  if (!property.location) return null;

  const { title, subtitle, description, categories } = property.location;

  return (
    <section id="location" className="py-24 px-6 bg-charcoal text-ivory">
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

        {/* Mapa */}
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
                {cat.places.map((place, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-3">
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
  );
}
