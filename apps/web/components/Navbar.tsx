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
  brandLogoUrl?: string;
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

export default function Navbar({ brandName, brandLogoUrl }: NavbarProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

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
        <div
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          onClick={() => handleNavClick("top")}
        >
          {brandLogoUrl ? (
            <Image
              src={brandLogoUrl}
              alt={brandName}
              width={28}
              height={28}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="w-7 h-7 rounded-full bg-terracotta flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              VM
            </span>
          )}
          <span
            className="text-lg md:text-xl text-charcoal"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {brandName}
          </span>
        </div>

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

          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              disabled={isPending}
              className="flex items-center gap-1 p-1.5 rounded hover:bg-ochre/10 transition-colors"
              aria-label="Cambiar idioma"
            >
              {(() => {
                const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
                return <FlagImage countryCode={current.countryCode} label={current.label} />;
              })()}
              <svg
                className="w-3 h-3 text-warm-gray"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-ivory border border-ochre/20 rounded shadow-md py-1 z-50">
                {LANGUAGES.filter((l) => l.code !== locale).map(({ code, countryCode, label }) => (
                  <button
                    key={code}
                    onClick={() => { switchLocale(code); setLangOpen(false); }}
                    disabled={isPending}
                    title={label}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-ochre/10 transition-colors text-sm text-warm-gray whitespace-nowrap"
                  >
                    <FlagImage countryCode={countryCode} label={label} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
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
