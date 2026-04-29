"use client";

import { useTranslations } from "next-intl";

const AMENITIES = [
  { key: "fridge", icon: "🧊" },
  { key: "kitchen", icon: "🍳" },
  { key: "bathroom", icon: "🚿" },
  { key: "wifi", icon: "📶" },
  { key: "cleaning", icon: "🧹" },
  { key: "linens", icon: "🛏️" },
] as const;

export default function DescriptionSection() {
  const t = useTranslations("description");

  return (
    <section id="description" className="py-24 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
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

          <div>
            <h3 className="text-sm text-ochre mb-6 font-medium tracking-widest uppercase">
              {t("amenities_title")}
            </h3>
            <ul className="grid grid-cols-1 gap-3">
              {AMENITIES.map(({ key, icon }) => (
                <li
                  key={key}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-ochre/10 shadow-sm"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-charcoal font-medium">
                    {t(`amenities.${key}`)}
                  </span>
                  <span className="ml-auto text-terracotta font-bold text-lg">✓</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
