"use client";

import { useTranslations } from "next-intl";

const AMENITY_KEYS = [
  "fridge",
  "kitchen",
  "bathroom",
  "wifi",
  "cleaning",
  "linens",
] as const;

export default function DescriptionSection() {
  const t = useTranslations("description");

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
              {t("title")}
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
              {t("body")}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xs text-ochre mb-4 font-medium tracking-widest uppercase">
              {t("amenities_title")}
            </h3>
            <ul className="divide-y divide-ochre/10">
              {AMENITY_KEYS.map((key) => (
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
