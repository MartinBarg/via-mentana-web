"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

const LANGUAGES = [
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
] as const;

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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-ivory/90 backdrop-blur-sm border-b border-ochre/20">
      <span
        className="text-xl text-charcoal"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Studio Via Mentana
      </span>

      <div className="flex items-center gap-1">
        {LANGUAGES.map(({ code, flag, label }) => (
          <button
            key={code}
            onClick={() => switchLocale(code)}
            disabled={isPending}
            title={label}
            className={`
              px-2 py-1 rounded text-lg transition-all duration-200
              ${locale === code
                ? "bg-terracotta/20 ring-1 ring-terracotta scale-110"
                : "hover:bg-terracotta/10 opacity-60 hover:opacity-100"
              }
            `}
          >
            {flag}
          </button>
        ))}
      </div>
    </nav>
  );
}
