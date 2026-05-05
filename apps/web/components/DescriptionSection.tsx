"use client";

import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface DescriptionSectionProps {
  property: PropertyConfig;
  locale: string;
}

export default function DescriptionSection({ property, locale }: DescriptionSectionProps) {
  const t = useTranslations("description");

  if (!property.description) return null;

  const { title, body, amenityKeys } = property.description;

  return (
    <section id="description" className="py-24 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Texto */}
          <div>
            <h2
              className="text-4xl md:text-5xl text-charcoal mb-6"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(title, locale)}
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
              {loc(body, locale)}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xs text-ochre mb-4 font-medium tracking-widest uppercase">
              {t("amenities_title")}
            </h3>
            <ul className="divide-y divide-ochre/10">
              {amenityKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-center justify-between py-2.5"
                >
                  <span className="text-charcoal text-sm">
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
