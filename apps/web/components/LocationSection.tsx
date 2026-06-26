"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import type { PropertyConfig } from "@/lib/types/client";
import { loc } from "@/lib/utils";

interface LocationSectionProps {
  property: PropertyConfig;
  locale: string;
}

export default function LocationSection({ property, locale }: LocationSectionProps) {
  const t = useTranslations("location");
  const [activeTab, setActiveTab] = useState<"map" | "aerial">("map");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!property.location) return null;

  const { title, subtitle, description, categories } = property.location;
  const hasAerial = !!property.aerialVideoUrl;

  function handlePlay() {
    videoRef.current?.play();
    setIsPlaying(true);
  }

  function handlePause() {
    videoRef.current?.pause();
    setIsPlaying(false);
  }

  function handleTabChange(tab: "map" | "aerial") {
    setActiveTab(tab);
    setIsPlaying(false);
    setProgress(0);
    videoRef.current?.pause();
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (v && v.duration) setProgress(v.currentTime / v.duration);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current;
    if (v && v.duration) {
      v.currentTime = Number(e.target.value) * v.duration;
      setProgress(Number(e.target.value));
    }
  }

  return (
    <section id="location" className="py-24 px-6 bg-charcoal text-ivory">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {loc(title, locale)}
          </h2>
          <p className="text-terracotta font-medium text-lg">{loc(subtitle, locale)}</p>
          <p className="text-ivory/50 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
            {loc(description, locale)}
          </p>
        </div>

        {/* Mapa / Toma aérea */}
        {(property.googleMapsEmbedUrl || hasAerial) && (
          <div className="mb-16">
            {/* Tabs — solo si hay video */}
            {hasAerial && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => handleTabChange("map")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "map"
                      ? "bg-terracotta text-ivory"
                      : "bg-white/10 text-ivory/60 hover:bg-white/15 hover:text-ivory"
                  }`}
                >
                  Mapa
                </button>
                <button
                  onClick={() => handleTabChange("aerial")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === "aerial"
                      ? "bg-terracotta text-ivory"
                      : "bg-white/10 text-ivory/60 hover:bg-white/15 hover:text-ivory"
                  }`}
                >
                  Toma aérea
                </button>
              </div>
            )}

            {/* Map */}
            {activeTab === "map" && property.googleMapsEmbedUrl && (
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <iframe
                  src={property.googleMapsEmbedUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {/* Aerial video — controles custom para evitar botón fullscreen/PiP en mobile */}
            {activeTab === "aerial" && property.aerialVideoUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black" style={{ height: 300 }}>
                  {/* Video sin controles nativos */}
                  <video
                    ref={videoRef}
                    src={property.aerialVideoUrl}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    playsInline
                    disablePictureInPicture
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => { setIsPlaying(false); setProgress(0); }}
                  />

                  {/* Overlay play — solo cuando está pausado */}
                  {!isPlaying && (
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center group"
                      aria-label="Reproducir video"
                    >
                      <span className="absolute inset-0 bg-black/30" />
                      <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-terracotta/90 group-hover:bg-terracotta transition-colors shadow-2xl">
                        <svg className="w-8 h-8 text-ivory ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </button>
                  )}

                  {/* Barra de controles custom — solo cuando está reproduciendo */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent">
                      {/* Botón pausa */}
                      <button onClick={handlePause} aria-label="Pausar" className="shrink-0 text-ivory hover:text-terracotta transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      </button>
                      {/* Barra de progreso */}
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.001}
                        value={progress}
                        onChange={handleSeek}
                        className="flex-1 h-1 appearance-none rounded-full cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, var(--color-terracotta) ${progress * 100}%, rgba(255,255,255,0.3) ${progress * 100}%)`,
                        }}
                        aria-label="Progreso del video"
                      />
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        {/* POI grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="border border-white/10 rounded-xl p-5 hover:bg-white/5 transition-colors"
            >
              <h4 className="font-medium text-terracotta mb-3 text-xs uppercase tracking-widest">
                {loc(cat.label, locale)}
              </h4>
              <ul className="space-y-2">
                {cat.places.map((place) => (
                  <li key={place.name["en"]} className="flex items-baseline justify-between gap-3">
                    <span className="text-ivory/65 text-sm leading-tight">
                      {loc(place.name, locale)}
                    </span>
                    <span className="text-ivory/35 text-xs font-light whitespace-nowrap flex-shrink-0">
                      {place.distance}{t("distance")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
