"use client";

import { useTranslations } from "next-intl";

const POI_GROUPS = [
  { category: "pizza",      placeKeys: ["pizza1",      "pizza2",      "pizza3"]      },
  { category: "restaurant", placeKeys: ["restaurant1", "restaurant2", "restaurant3"] },
  { category: "coffee",     placeKeys: ["coffee1",     "coffee2",     "coffee3"]     },
  { category: "library",    placeKeys: ["library1",    "library2"]                   },
  { category: "metro",      placeKeys: ["metro1",      "metro2"]                     },
  { category: "bus",        placeKeys: ["bus1",        "bus2"]                       },
] as const;

export default function LocationSection() {
  const t = useTranslations("location");

  return (
    <section id="location" className="py-24 px-6 bg-charcoal text-ivory">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t("title")}
          </h2>
          <p className="text-terracotta font-medium text-lg">{t("subtitle")}</p>
          <p className="text-ivory/50 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Mapa — Castro Pretorio metro station */}
        <div className="mb-16 rounded-2xl overflow-hidden border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.3!2d12.4993!3d41.9042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a30bb10b65%3A0xe49a8f14a3f6f52c!2sCastro%20Pretorio%20(Metro%20B)!5e0!3m2!1sit!2sit!4v1"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* POI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {POI_GROUPS.map(({ category, placeKeys }) => (
            <div
              key={category}
              className="border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <h4 className="font-medium text-terracotta mb-3 text-xs uppercase tracking-widest">
                {t(`categories.${category}`)}
              </h4>
              <ul className="space-y-2">
                {placeKeys.map((key) => (
                  <li key={key} className="flex items-baseline justify-between gap-3">
                    <span className="text-ivory/65 text-sm leading-tight">
                      {t(`places.${key}`)}
                    </span>
                    <span className="text-ivory/35 text-xs font-light whitespace-nowrap flex-shrink-0">
                      {t(`places.${key}_dist`)}{t("distance")}
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
