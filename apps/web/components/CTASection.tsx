"use client";

import { useTranslations } from "next-intl";

const AIRBNB_URL =
  "https://www.airbnb.mx/rooms/1005789413503850183?guests=1&adults=1&s=67&unique_share_id=009d20fc-2d8f-4091-828b-b286785004ec";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-16 px-6 bg-terracotta">
      <div className="max-w-xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl text-ivory mb-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {t("title")}
        </h2>
        <p className="text-ivory/70 text-sm leading-relaxed mb-8">
          {t("subtitle")}
        </p>
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-ivory/50 text-ivory text-sm font-medium tracking-wide px-8 py-3 rounded-full hover:bg-ivory hover:text-terracotta transition-all duration-300"
        >
          {t("button")}
        </a>
      </div>
    </section>
  );
}
