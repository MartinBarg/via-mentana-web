"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition, useState, useEffect, useRef } from "react";

export type NavCtaItem = { label: string; url: string };
export type NavCtaConfig =
  | { type: "single"; label: string; url: string }
  | { type: "dropdown"; label: string; items: NavCtaItem[] };

const LANGUAGES = [
  { code: "it", countryCode: "it", label: "Italiano" },
  { code: "en", countryCode: "gb", label: "English" },
  { code: "es", countryCode: "es", label: "Español" },
  { code: "de", countryCode: "de", label: "Deutsch" },
] as const;

interface NavbarProps {
  brandName: string;
  brandLogoUrl?: string;
  cta?: NavCtaConfig;
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

function CtaButton({
  cta,
  heroVisible,
  size,
  open,
  onToggle,
}: {
  cta: NavCtaConfig;
  heroVisible: boolean;
  size: "sm" | "md";
  open: boolean;
  onToggle: () => void;
}) {
  const sizeClasses = size === "sm" ? "text-xs px-3.5 py-1.5" : "text-sm px-5 py-2";
  const baseClasses = `inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold rounded-full shadow-md transition-all duration-300 flex-shrink-0 ${sizeClasses}`;
  const visibilityClasses = heroVisible
    ? "opacity-0 pointer-events-none scale-95"
    : "opacity-100 pointer-events-auto scale-100";

  if (cta.type === "single") {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClasses} ${visibilityClasses}`}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`${baseClasses} ${visibilityClasses}`}
      >
        {cta.label}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-ivory rounded-2xl shadow-2xl overflow-hidden z-50">
          {cta.items.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onToggle}
              className="block px-5 py-3 text-sm text-charcoal hover:bg-terracotta/10 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default function Navbar({ brandName, brandLogoUrl, cta }: NavbarProps) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const langRef = useRef<HTMLDivElement>(null);
  const ctaDesktopRef = useRef<HTMLDivElement>(null);
  const ctaMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!ctaOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (!ctaDesktopRef.current?.contains(target) && !ctaMobileRef.current?.contains(target)) {
        setCtaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ctaOpen]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

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

        {/* CTA sticky — desktop, appears when hero scrolls out */}
        {cta && (
          <div ref={ctaDesktopRef} className="relative hidden md:block flex-shrink-0">
            <CtaButton
              cta={cta}
              heroVisible={heroVisible}
              size="md"
              open={ctaOpen}
              onToggle={() => setCtaOpen((o) => !o)}
            />
          </div>
        )}

        {/* Right side: hamburger (mobile) + language dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* CTA sticky — mobile, appears when hero scrolls out */}
          {cta && (
            <div ref={ctaMobileRef} className="relative md:hidden">
              <CtaButton
                cta={cta}
                heroVisible={heroVisible}
                size="sm"
                open={ctaOpen}
                onToggle={() => setCtaOpen((o) => !o)}
              />
            </div>
          )}

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
          <div className="relative" ref={langRef}>
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
                    className="flex items-center justify-center w-full px-3 py-2 hover:bg-ochre/10 transition-colors"
                  >
                    <FlagImage countryCode={countryCode} label={label} />
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
