"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState } from "react";

const LANGUAGES = [
  { code: "it", countryCode: "it", label: "Italiano" },
  { code: "en", countryCode: "gb", label: "English" },
  { code: "es", countryCode: "es", label: "Español" },
  { code: "de", countryCode: "de", label: "Deutsch" },
] as const;

interface NavbarProps {
  brandName: string;
}

function FlagImage({ countryCode, label }: { countryCode: string; label: string }) {
  return (
    <Image
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      width={24}
      height={18}
      alt={label}
      className="rounded-sm object-cover"
    />
  );
}

function scrollToSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar({ brandName }: NavbarProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);

  function switchLocale(nextLocale: string) {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    startTransition(() => {
      router.replace(segments.join("/"));
    });
  }

  function handleNavClick(id: string) {
    setMenuOpen(false);
    scrollToSection(id);
  }

  const NAV_LINKS = [
    { id: "top",         label: t("tour360")         },
    { id: "description", label: t("descriptionLink") },
    { id: "location",    label: t("locationLink")    },
    { id: "reviews",     label: t("reviewsLink")     },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-ochre/20">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">

        {/* Brand */}
        <span
          className="text-lg md:text-xl text-charcoal flex-shrink-0 cursor-pointer"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          onClick={() => handleNavClick("top")}
        >
          {brandName}
        </span>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium text-warm-gray">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="hover:text-terracotta transition-colors whitespace-nowrap"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side: hamburger (mobile) + flags */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Language flags */}
          <div className="flex items-center gap-1">
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
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-ochre/10 bg-ivory/98">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="block w-full text-left px-6 py-3.5 text-sm text-warm-gray hover:text-terracotta hover:bg-ochre/5 transition-colors border-b border-ochre/5 last:border-0"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
