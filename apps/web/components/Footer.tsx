"use client";

import { useTranslations } from "next-intl";

const AIRBNB_URL =
  "https://www.airbnb.mx/rooms/1005789413503850183?guests=1&adults=1&s=67&unique_share_id=009d20fc-2d8f-4091-828b-b286785004ec";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-charcoal text-ivory/60 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p
            className="text-ivory text-lg mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Studio Via Mentana
          </p>
          <p className="text-sm">{t("tagline")}</p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta transition-colors"
          >
            {t("links.airbnb")}
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="hover:text-terracotta transition-colors"
          >
            {t("links.top")}
          </a>
        </div>

        <p className="text-xs text-ivory/30">
          © {new Date().getFullYear()} · {t("credits")}
        </p>
      </div>
    </footer>
  );
}
