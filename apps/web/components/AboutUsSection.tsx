"use client";

import type { AboutUsConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface AboutUsSectionProps {
  aboutUs: AboutUsConfig;
  locale: string;
  variant?: "light" | "dark";
}

export default function AboutUsSection({ aboutUs, locale, variant = "light" }: AboutUsSectionProps) {
  const isDark = variant === "dark";

  return (
    <section className={`py-20 px-6 ${isDark ? "bg-transparent" : "bg-ivory"}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`grid gap-12 items-center ${aboutUs.imageUrl ? "md:grid-cols-2" : "max-w-2xl"}`}>
          <div>
            <h2
              className={`text-3xl md:text-4xl mb-6 leading-tight ${isDark ? "text-ivory" : "text-charcoal"}`}
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(aboutUs.title, locale)}
            </h2>
            <p className={`text-base leading-relaxed ${isDark ? "text-ivory/70" : "text-warm-gray"}`}>
              {loc(aboutUs.body, locale)}
            </p>
          </div>
          {aboutUs.imageUrl && (
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={aboutUs.imageUrl}
                alt={loc(aboutUs.title, locale)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
