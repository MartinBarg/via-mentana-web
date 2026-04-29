"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

const LANGUAGES = [
  { code: "it", countryCode: "it", label: "Italiano" },
  { code: "en", countryCode: "gb", label: "English" },
  { code: "es", countryCode: "es", label: "Español" },
  { code: "de", countryCode: "de", label: "Deutsch" },
] as const;

function FlagImage({ countryCode, label }: { countryCode: string; label: string }) {
  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      srcSet={`https://flagcdn.com/48x36/${countryCode}.png 2x`}
      width="24"
      height="18"
      alt={label}
      className="rounded-sm object-cover"
    />
  );
}

function scrollTo(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    startTransition(() => {
      router.replace(segments.join("/"));
    });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-ochre/20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">

        {/* Brand */}
        <span
          className="text-lg md:text-xl text-charcoal flex-shrink-0 cursor-pointer"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          onClick={() => scrollTo("top")}
        >
          Studio Via Mentana
        </span>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-warm-gray">
          <button
            onClick={() => scrollTo("top")}
            className="hover:text-terracotta transition-colors whitespace-nowrap"
          >
            {t("tour360")}
          </button>
          <button
            onClick={() => scrollTo("description")}
            className="hover:text-terracotta transition-colors whitespace-nowrap"
          >
            {t("descriptionLink")}
          </button>
          <button
            onClick={() => scrollTo("location")}
            className="hover:text-terracotta transition-colors whitespace-nowrap"
          >
            {t("locationLink")}
          </button>
          <button
            onClick={() => scrollTo("reviews")}
            className="hover:text-terracotta transition-colors whitespace-nowrap"
          >
            {t("reviewsLink")}
          </button>
        </div>

        {/* Language flags */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {LANGUAGES.map(({ code, countryCode, label }) => (
            <button
              key={code}
              onClick={() => switchLocale(code)}
              disabled={isPending}
              title={label}
              className={`
                p-1.5 rounded transition-all duration-200
                ${locale === code
                  ? "ring-2 ring-terracotta ring-offset-1 scale-110"
                  : "opacity-50 hover:opacity-100 hover:scale-105"
                }
              `}
            >
              <FlagImage countryCode={countryCode} label={label} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
