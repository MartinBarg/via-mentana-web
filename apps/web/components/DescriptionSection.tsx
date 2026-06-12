"use client";

import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface DescriptionSectionProps {
  property: PropertyConfig;
  locale: string;
  backgroundImageUrl?: string;
}

export default function DescriptionSection({ property, locale, backgroundImageUrl }: DescriptionSectionProps) {
  const t = useTranslations("description");

  if (!property.description) return null;

  const { title, body, amenityKeys } = property.description;

  const hasBg = !!backgroundImageUrl;

  return (
    <section id="description" className={`relative py-24 px-6 ${hasBg ? "" : "bg-ivory"}`}>
      {hasBg && (
        <div className="absolute inset-0 bg-charcoal/55 pointer-events-none" />
      )}
      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Texto */}
          <div>
            <h2
              className={`text-4xl md:text-5xl mb-6 ${hasBg ? "text-ivory" : "text-charcoal"}`}
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(title, locale)}
            </h2>
            <p className={`text-lg leading-relaxed ${hasBg ? "text-ivory/80" : "text-warm-gray"}`}>
              {loc(body, locale)}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className={`text-xs mb-4 font-medium tracking-widest uppercase ${hasBg ? "text-ivory/60" : "text-ochre"}`}>
              {t("amenities_title")}
            </h3>
            <ul className={`divide-y ${hasBg ? "divide-ivory/20" : "divide-ochre/10"}`}>
              {amenityKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className={`text-sm ${hasBg ? "text-ivory" : "text-charcoal"}`}>
                    {t(`amenities.${key}`)}
                  </span>
                  <span className="text-terracotta text-sm font-medium">✓</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
