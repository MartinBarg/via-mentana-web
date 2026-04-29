"use client";

import { useTranslations } from "next-intl";

const REVIEWERS = [
  { id: "giulia", author: "Giulia M.", country: "🇩🇪 Deutschland", rating: 5 },
  { id: "james",  author: "James R.",  country: "🇬🇧 United Kingdom", rating: 5 },
  { id: "sofia",  author: "Sofía L.",  country: "🇪🇸 España", rating: 5 },
  { id: "marco",  author: "Marco B.",  country: "🇮🇹 Italia", rating: 5 },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-terracotta" : "text-warm-gray/30"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const t = useTranslations("reviews");
  const avgRating = (REVIEWERS.reduce((s, r) => s + r.rating, 0) / REVIEWERS.length).toFixed(1);

  return (
    <section id="reviews" className="py-24 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl text-charcoal mb-3"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {t("title")}
          </h2>
          <p className="text-warm-gray mb-4">{t("subtitle")}</p>
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-ochre/10">
            <StarRating rating={5} />
            <span className="text-2xl font-bold text-charcoal">{avgRating}</span>
            <span className="text-warm-gray text-sm">{t("rating_label")}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWERS.map((reviewer) => (
            <div
              key={reviewer.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-ochre/10 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-charcoal">{reviewer.author}</p>
                  <p className="text-sm text-warm-gray">{reviewer.country}</p>
                </div>
                <StarRating rating={reviewer.rating} />
              </div>
              <p className="text-warm-gray leading-relaxed text-sm">
                "{t(`items.${reviewer.id}_comment`)}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
