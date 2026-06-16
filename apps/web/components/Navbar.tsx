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
  selectedPropertyLabel?: string;
  transparent?: boolean;
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
  size,
  open,
  onToggle,
}: {
  cta: NavCtaConfig;
  size: "sm" | "md";
  open: boolean;
  onToggle: () => void;
}) {
  const sizeClasses = size === "sm" ? "text-xs px-3.5 py-1.5" : "text-sm px-5 py-2";
  const baseClasses = `inline-flex items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-ivory font-semibold rounded-full shadow-md flex-shrink-0 ${sizeClasses}`;

  if (cta.type === "single") {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
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
        className={baseClasses}
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

export default function Navbar({ brandName, brandLogoUrl, cta, selectedPropertyLabel, transparent }: NavbarProps) {
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
    const heroCta = document.getElementById("hero-cta");
    if (!heroCta) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(heroCta);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 ${transparent ? "" : "bg-ivory/95 backdrop-blur-sm border-b border-ochre/20"}`}>
      {transparent && (
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
      )}
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">

        {/* Brand + selected property chip */}
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
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
              className={`text-lg md:text-xl transition-opacity duration-300 ${transparent ? "text-ivory" : "text-charcoal"} ${
                !heroVisible ? "hidden md:inline" : ""
              }`}
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {brandName}
            </span>
          </div>
          {selectedPropertyLabel && (
            <span
              className={`hidden md:inline text-xs px-2.5 py-1 rounded-full whitespace-nowrap max-w-[120px] truncate transition-opacity duration-300 ${transparent ? "text-ivory/70 bg-white/10 border border-white/20" : "text-warm-gray bg-ochre/10 border border-ochre/20"} ${
                heroVisible ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {selectedPropertyLabel}
            </span>
          )}
        </div>

        {/* Nav links — desktop */}
        <div className={`hidden md:flex items-center gap-5 text-sm font-medium ${transparent ? "text-ivory/80" : "text-warm-gray"}`}>
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
        {cta && !heroVisible && (
          <div ref={ctaDesktopRef} className="relative hidden md:block flex-shrink-0">
            <CtaButton
              cta={cta}
              size="md"
              open={ctaOpen}
              onToggle={() => setCtaOpen((o) => !o)}
            />
          </div>
        )}

        {/* Right side: hamburger (mobile) + language dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">

          {/* CTA sticky — mobile, appears when hero scrolls out */}
          {cta && !heroVisible && (
            <div ref={ctaMobileRef} className="relative md:hidden">
              <CtaButton
                cta={cta}
                size="sm"
                open={ctaOpen}
                onToggle={() => setCtaOpen((o) => !o)}
              />
            </div>
          )}

          {/* Hamburger — mobile only */}
          <button
            className={`md:hidden p-2 transition-colors ${transparent ? "text-ivory hover:text-ivory/70" : "text-charcoal hover:text-terracotta"}`}
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
              className={`flex items-center gap-1 p-1.5 rounded transition-colors ${transparent ? "hover:bg-white/10" : "hover:bg-ochre/10"}`}
              aria-label="Cambiar idioma"
            >
              {(() => {
                const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];
                return <FlagImage countryCode={current.countryCode} label={current.label} />;
              })()}
              <svg
                className={`w-3 h-3 ${transparent ? "text-ivory/60" : "text-warm-gray"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className={`absolute right-0 top-full mt-1 rounded shadow-md py-1 z-50 border ${transparent ? "bg-charcoal/90 border-white/10" : "bg-ivory border-ochre/20"}`}>
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
        <div className={`md:hidden border-t ${transparent ? "border-white/10 bg-charcoal/90" : "border-ochre/10 bg-ivory/98"}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`block w-full text-left px-6 py-3.5 text-sm transition-colors border-b last:border-0 ${transparent ? "text-ivory/80 hover:text-ivory hover:bg-white/5 border-white/5" : "text-warm-gray hover:text-terracotta hover:bg-ochre/5 border-ochre/5"}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
