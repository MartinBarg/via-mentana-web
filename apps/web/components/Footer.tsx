"use client";

import { useTranslations } from "next-intl";

interface FooterProps {
  brandName: string;
  airbnbUrl: string;
  tagline: string;
}

export default function Footer({ brandName, airbnbUrl, tagline }: FooterProps) {
  const t = useTranslations("footer");

  return (
    <footer className="bg-charcoal text-ivory/60 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p
            className="text-ivory text-lg mb-1"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {brandName}
          </p>
          <p className="text-sm">{tagline}</p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a
            href={airbnbUrl}
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
