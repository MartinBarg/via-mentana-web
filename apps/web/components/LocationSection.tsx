"use client";

import { useTranslations } from "next-intl";

const POI_GROUPS = [
  {
    category: "pizza",
    icon: "🍕",
    placeKeys: ["pizza1", "pizza2", "pizza3"],
  },
  {
    category: "restaurant",
    icon: "🍽️",
    placeKeys: ["restaurant1", "restaurant2", "restaurant3"],
  },
  {
    category: "coffee",
    icon: "☕",
    placeKeys: ["coffee1", "coffee2", "coffee3"],
  },
  {
    category: "library",
    icon: "📚",
    placeKeys: ["library1", "library2"],
  },
  {
    category: "metro",
    icon: "🚇",
    placeKeys: ["metro1", "metro2"],
  },
  {
    category: "bus",
    icon: "🚌",
    placeKeys: ["bus1", "bus2"],
  },
] as const;

export default function LocationSection() {
  const t = useTranslations("location");

  return (
    <section id="location" className="py-24 px-6 bg-charcoal text-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t("title")}
          </h2>
          <p className="text-terracotta font-medium text-lg">{t("subtitle")}</p>
          <p className="text-ivory/60 mt-4 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        {/* Mapa */}
        <div className="mb-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.8!2d12.4964!3d41.8975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sCastro%20Pretorio%2C%20Roma%20RM%2C%20Italia!5e0!3m2!1ses!2sar!4v1"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* POI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {POI_GROUPS.map(({ category, icon, placeKeys }) => (
            <div
              key={category}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <h4 className="font-semibold text-terracotta mb-3 text-sm uppercase tracking-wide">
                {t(`categories.${category}`)}
              </h4>
              <ul className="space-y-2">
                {placeKeys.map((key) => (
                  <li key={key} className="flex items-baseline justify-between gap-2">
                    <span className="text-ivory/70 text-sm leading-tight">
                      {t(`places.${key}`)}
                    </span>
                    <span className="text-terracotta/70 text-xs font-medium whitespace-nowrap flex-shrink-0">
                      {t(`places.${key}_dist`)}
                      {t("distance")}
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
