"use client";

import { useTranslations } from "next-intl";

const AIRBNB_URL =
  "https://www.airbnb.mx/rooms/1005789413503850183?guests=1&adults=1&s=67&unique_share_id=009d20fc-2d8f-4091-828b-b286785004ec";

export default function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 px-6 bg-terracotta">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl text-ivory mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {t("title")}
        </h2>
        <p className="text-ivory/80 text-lg mb-10 leading-relaxed">
          {t("subtitle")}
        </p>
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-ivory text-terracotta font-bold px-10 py-5 rounded-full shadow-xl hover:bg-white transition-all duration-200 hover:scale-105 text-lg"
        >
          <svg className="w-6 h-6" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 1C7.716 1 1 7.716 1 16s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 4c2.392 0 4.633.68 6.534 1.855C19.94 8.5 18 10.576 16 12.84c-2-2.264-3.94-4.34-6.534-5.985A10.94 10.94 0 0116 5zm-9.5 9.5c1.5-2.5 3.5-4.5 6-5.5 1.5 1.5 3 3.5 4.5 5.5-1.5 2-3 4-4.5 5.5-2.5-1-4.5-3-6-5.5zm9.5 11.5c-2.392 0-4.633-.68-6.534-1.855 2.594-1.645 4.534-3.721 6.534-5.985 2 2.264 3.94 4.34 6.534 5.985A10.94 10.94 0 0116 26zm9.5-9.5c-1.5 2.5-3.5 4.5-6 5.5-1.5-1.5-3-3.5-4.5-5.5 1.5-2 3-4 4.5-5.5 2.5 1 4.5 3 6 5.5z" />
          </svg>
          {t("button")}
        </a>
      </div>
    </section>
  );
}
