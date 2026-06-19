"use client";

import type { AboutUsConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface AboutUsSectionProps {
  aboutUs: AboutUsConfig;
  locale: string;
}

export default function AboutUsSection({ aboutUs, locale }: AboutUsSectionProps) {
  return (
    <section className="py-20 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl md:text-4xl text-charcoal mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {loc(aboutUs.title, locale)}
            </h2>
            <p className="text-warm-gray text-base leading-relaxed">
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
