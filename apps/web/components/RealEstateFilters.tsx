"use client";

import { useState, useMemo, useRef } from "react";
import type { PropertyConfig, HeroZone } from "@/lib/types/client";
import { loc } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type OpType = "alquiler" | "venta";
type Currency = "ARS" | "USD";

export interface RealEstateFilterAPI {
  filteredProperties: PropertyConfig[];
  isFiltered: boolean;
  activeCount: number;
  state: {
    opType: OpType | null;
    zones: string[];
    ambientes: number[];
    currency: Currency | null;
    priceRange: [number, number] | null;
    m2Range: [number, number] | null;
  };
  available: {
    ambientes: number[];
    zones: string[];
    priceMin: number;
    priceMax: number;
    currencies: Currency[];
    m2Min: number;
    m2Max: number;
  };
  setOpType: (v: OpType | null) => void;
  toggleZone: (id: string) => void;
  clearZones: () => void;
  toggleAmbiente: (n: number) => void;
  setCurrency: (c: Currency) => void;
  setPriceRange: (range: [number, number]) => void;
  setM2Range: (range: [number, number]) => void;
  clearAll: () => void;
}

// ─── Cross-reactive helper ────────────────────────────────────────────────────
// Applies all raw filters EXCEPT the one named in `exclude`.
// Uses raw (unvalidated) values so there's no circular dependency between filters.

function applyExcept(
  base: PropertyConfig[],
  exclude: "zone" | "ambientes" | "price" | "m2",
  zones: string[],
  ambientes: number[],
  opType: OpType | null,
  currency: Currency | null,
  priceFilterRaw: [number, number] | null,
  m2FilterRaw: [number, number] | null,
): PropertyConfig[] {
  let r = base;
  if (exclude !== "zone" && zones.length > 0)
    r = r.filter((p) => p.zone && zones.includes(p.zone));
  if (exclude !== "ambientes" && ambientes.length > 0)
    r = r.filter((p) => p.ambientes !== undefined && ambientes.includes(p.ambientes));
  if (exclude !== "price" && priceFilterRaw && opType && currency) {
    const [lo, hi] = priceFilterRaw;
    r = r.filter((p) => {
      const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
      if (!price || price.currency !== currency) return true;
      return price.amount >= lo && price.amount <= hi;
    });
  }
  if (exclude !== "m2" && m2FilterRaw) {
    const [lo, hi] = m2FilterRaw;
    r = r.filter((p) => p.m2 === undefined || (p.m2 >= lo && p.m2 <= hi));
  }
  return r;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
// All derived state uses useMemo — no setState inside useEffect.
// Each filter's available options are computed from byOpType + ALL other raw filters
// (excluding itself), making every filter fully cross-reactive.

export function useRealEstateFilters(properties: PropertyConfig[]): RealEstateFilterAPI {
  const [opType, setOpTypeRaw] = useState<OpType | null>(null);
  const [zonesRaw, setZones] = useState<string[]>([]);
  const [ambientesRaw, setAmbientes] = useState<number[]>([]);
  const [currencyRaw, setCurrencyRaw] = useState<Currency | null>(null);
  const [priceFilterRaw, setPriceFilterRaw] = useState<[number, number] | null>(null);
  const [m2FilterRaw, setM2FilterRaw] = useState<[number, number] | null>(null);

  // Step 1: filter by opType
  const byOpType = useMemo(() =>
    opType === null
      ? properties
      : properties.filter((p) => p.operationType?.includes(opType)),
    [properties, opType]
  );

  // Step 2: derive currency from byOpType + zones + ambientes (no price/m2)
  // Computing currency first breaks the circular dependency between currency and price options.
  const forCurrencyBase = useMemo(() => {
    let r = byOpType;
    if (zonesRaw.length > 0) r = r.filter((p) => p.zone && zonesRaw.includes(p.zone));
    if (ambientesRaw.length > 0) r = r.filter((p) => p.ambientes !== undefined && ambientesRaw.includes(p.ambientes));
    return r;
  }, [byOpType, zonesRaw, ambientesRaw]);

  const availableCurrencies = useMemo((): Currency[] => {
    if (!opType) return [];
    const set = new Set<Currency>();
    forCurrencyBase.forEach((p) => {
      const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
      if (price) set.add(price.currency);
    });
    return Array.from(set) as Currency[];
  }, [forCurrencyBase, opType]);

  const currency = useMemo((): Currency | null => {
    if (availableCurrencies.length === 0) return null;
    if (availableCurrencies.length === 1) return availableCurrencies[0];
    if (currencyRaw && availableCurrencies.includes(currencyRaw)) return currencyRaw;
    return availableCurrencies[0];
  }, [availableCurrencies, currencyRaw]);

  // Step 3: cross-reactive option sets — each excludes its own filter
  const forZoneOptions = useMemo(() =>
    applyExcept(byOpType, "zone", zonesRaw, ambientesRaw, opType, currency, priceFilterRaw, m2FilterRaw),
    [byOpType, zonesRaw, ambientesRaw, opType, currency, priceFilterRaw, m2FilterRaw]
  );

  const forAmbientesOptions = useMemo(() =>
    applyExcept(byOpType, "ambientes", zonesRaw, ambientesRaw, opType, currency, priceFilterRaw, m2FilterRaw),
    [byOpType, zonesRaw, ambientesRaw, opType, currency, priceFilterRaw, m2FilterRaw]
  );

  const forM2Options = useMemo(() =>
    applyExcept(byOpType, "m2", zonesRaw, ambientesRaw, opType, currency, priceFilterRaw, m2FilterRaw),
    [byOpType, zonesRaw, ambientesRaw, opType, currency, priceFilterRaw, m2FilterRaw]
  );

  // Step 4: available options derived from their respective cross-reactive sets
  const availableZones = useMemo(() => {
    const set = new Set<string>();
    forZoneOptions.forEach((p) => { if (p.zone) set.add(p.zone); });
    return Array.from(set);
  }, [forZoneOptions]);

  const availableAmbientes = useMemo(() => {
    const set = new Set<number>();
    forAmbientesOptions.forEach((p) => { if (p.ambientes !== undefined) set.add(p.ambientes); });
    return Array.from(set).sort((a, b) => a - b);
  }, [forAmbientesOptions]);

  // Price range: from zones+ambientes base (not m2, to avoid over-constraining currency detection)
  const availablePriceRange = useMemo((): [number, number] => {
    if (!opType || !currency) return [0, 0];
    const amounts = forCurrencyBase
      .filter((p) => {
        const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
        return price?.currency === currency;
      })
      .map((p) => (opType === "alquiler" ? p.rentalPrice! : p.salePrice!).amount);
    if (amounts.length === 0) return [0, 0];
    return [Math.min(...amounts), Math.max(...amounts)];
  }, [forCurrencyBase, opType, currency]);

  const availableM2Range = useMemo((): [number, number] => {
    const vals = forM2Options.map((p) => p.m2).filter((v): v is number => v !== undefined);
    if (vals.length === 0) return [0, 0];
    return [Math.min(...vals), Math.max(...vals)];
  }, [forM2Options]);

  // Step 5: effective (clamped/cleaned) derived values — no useEffect needed
  const effectiveAmbientes = useMemo(() =>
    ambientesRaw.filter((a) => availableAmbientes.includes(a)),
    [ambientesRaw, availableAmbientes]
  );

  const priceRange = useMemo((): [number, number] | null => {
    if (!priceFilterRaw) return null;
    const [aMin, aMax] = availablePriceRange;
    if (aMin === aMax) return null;
    const lo = Math.max(aMin, Math.min(priceFilterRaw[0], aMax));
    const hi = Math.max(aMin, Math.min(priceFilterRaw[1], aMax));
    if (lo === aMin && hi === aMax) return null;
    return [lo, hi];
  }, [priceFilterRaw, availablePriceRange]);

  const m2Range = useMemo((): [number, number] | null => {
    if (!m2FilterRaw) return null;
    const [aMin, aMax] = availableM2Range;
    if (aMin === aMax) return null;
    const lo = Math.max(aMin, Math.min(m2FilterRaw[0], aMax));
    const hi = Math.max(aMin, Math.min(m2FilterRaw[1], aMax));
    if (lo === aMin && hi === aMax) return null;
    return [lo, hi];
  }, [m2FilterRaw, availableM2Range]);

  // Step 6: final result — apply all effective filters to byOpType
  const finalFiltered = useMemo(() => {
    let r = byOpType;
    if (zonesRaw.length > 0) r = r.filter((p) => p.zone && zonesRaw.includes(p.zone));
    if (effectiveAmbientes.length > 0) r = r.filter((p) => p.ambientes !== undefined && effectiveAmbientes.includes(p.ambientes));
    if (priceRange && opType && currency) {
      const [pMin, pMax] = priceRange;
      r = r.filter((p) => {
        const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
        if (!price || price.currency !== currency) return true;
        return price.amount >= pMin && price.amount <= pMax;
      });
    }
    if (m2Range) {
      const [mMin, mMax] = m2Range;
      r = r.filter((p) => p.m2 === undefined || (p.m2 >= mMin && p.m2 <= mMax));
    }
    return r;
  }, [byOpType, zonesRaw, effectiveAmbientes, priceRange, opType, currency, m2Range]);

  const activeCount = [
    opType !== null,
    zonesRaw.length > 0,
    ambientesRaw.length > 0,
    priceFilterRaw !== null,
    m2FilterRaw !== null,
  ].filter(Boolean).length;

  return {
    filteredProperties: finalFiltered,
    isFiltered: activeCount > 0,
    activeCount,
    state: { opType, zones: zonesRaw, ambientes: effectiveAmbientes, currency, priceRange, m2Range },
    available: {
      ambientes: availableAmbientes,
      zones: availableZones,
      priceMin: availablePriceRange[0],
      priceMax: availablePriceRange[1],
      currencies: availableCurrencies,
      m2Min: availableM2Range[0],
      m2Max: availableM2Range[1],
    },
    setOpType: (v) => {
      setOpTypeRaw(v);
      setPriceFilterRaw(null);
    },
    toggleZone: (id) =>
      setZones((prev) =>
        prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id]
      ),
    clearZones: () => setZones([]),
    toggleAmbiente: (n) =>
      setAmbientes((prev) =>
        prev.includes(n) ? prev.filter((a) => a !== n) : [...prev, n]
      ),
    setCurrency: (c) => setCurrencyRaw(c),
    setPriceRange: (r) => setPriceFilterRaw(r),
    setM2Range: (r) => setM2FilterRaw(r),
    clearAll: () => {
      setOpTypeRaw(null);
      setZones([]);
      setAmbientes([]);
      setCurrencyRaw(null);
      setPriceFilterRaw(null);
      setM2FilterRaw(null);
    },
  };
}

// ─── DualRangeSlider ─────────────────────────────────────────────────────────

function DualRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  formatValue,
  accent,
  step = 1,
  dark = false,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
  formatValue: (v: number) => string;
  accent: string;
  step?: number;
  dark?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function snapToStep(value: number) {
    return Math.round(value / step) * step;
  }

  function valueFromClientX(clientX: number) {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return snapToStep(min + pct * (max - min));
  }

  const range = max - min;
  const leftPct = range > 0 ? ((valueMin - min) / range) * 100 : 0;
  const rightPct = range > 0 ? ((valueMax - min) / range) * 100 : 100;

  const handleBase: React.CSSProperties = {
    backgroundColor: "#fff",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: `2px solid ${accent}`,
  };

  return (
    <div className="pt-1 pb-2">
      <div className={`flex justify-between text-xs font-semibold mb-3 tabular-nums ${dark ? "text-white/80" : "text-charcoal"}`}>
        <span>{formatValue(valueMin)}</span>
        <span>{formatValue(valueMax)}</span>
      </div>
      <div className="relative h-5 mx-2" ref={trackRef}>
        <div className={`absolute inset-x-0 h-[3px] top-1/2 -translate-y-1/2 rounded-full ${dark ? "bg-white/20" : "bg-charcoal/15"}`} />
        <div
          className="absolute h-[3px] top-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%`, backgroundColor: accent }}
        />
        <div
          className="absolute w-[16px] h-[16px] rounded-full shadow-md cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ ...handleBase, left: `${leftPct}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
            const v = Math.min(valueFromClientX(e.clientX), valueMax - step);
            if (v !== valueMin) onChangeMin(v);
          }}
          onPointerUp={(e) => { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); }}
        />
        <div
          className="absolute w-[16px] h-[16px] rounded-full shadow-md cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ ...handleBase, left: `${rightPct}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
            const v = Math.max(valueFromClientX(e.clientX), valueMin + step);
            if (v !== valueMax) onChangeMax(v);
          }}
          onPointerUp={(e) => { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); }}
        />
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(amount: number, currency: Currency): string {
  if (currency === "ARS") {
    if (amount >= 1_000_000)
      return `$${(amount / 1_000_000).toLocaleString("es-AR", { maximumFractionDigits: 1 })}M`;
    if (amount >= 1_000)
      return `$${Math.round(amount / 1_000)}k`;
    return `$${amount}`;
  } else {
    if (amount >= 1_000_000)
      return `US$${(amount / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}M`;
    if (amount >= 1_000)
      return `US$${Math.round(amount / 1_000).toLocaleString("es-AR")}k`;
    return `US$${amount.toLocaleString("es-AR")}`;
  }
}

function priceStep(currency: Currency, range: number): number {
  if (currency === "ARS") {
    if (range > 100_000_000) return 10_000_000;
    if (range > 10_000_000) return 1_000_000;
    if (range > 1_000_000) return 100_000;
    if (range > 200_000) return 50_000;
    return 10_000;
  } else {
    if (range > 500_000) return 10_000;
    if (range > 100_000) return 5_000;
    if (range > 20_000) return 1_000;
    return 100;
  }
}

// ─── RealEstateInlineFilters ──────────────────────────────────────────────────

export interface RealEstateInlineFiltersProps {
  api: RealEstateFilterAPI;
  allZones: HeroZone[];
  locale: string;
  accent: string;
  labels: {
    rental: string;
    purchase: string;
    monthlyPrice: string;
    totalPrice: string;
    rooms: string;
    zone: string;
    m2: string;
    clearFilters: string;
    selectOpFirst: string;
    noProps: string;
  };
}

export function RealEstateInlineFilters({
  api,
  allZones,
  locale,
  accent,
  labels,
}: RealEstateInlineFiltersProps) {
  const { state, available, isFiltered, setOpType, toggleZone, toggleAmbiente, setCurrency, setPriceRange, setM2Range, clearAll } = api;
  const { opType, zones: selectedZones, ambientes, currency, priceRange, m2Range } = state;

  const hasPriceData = opType !== null && available.priceMin < available.priceMax;
  const hasM2Data = available.m2Min < available.m2Max;

  const pMin = priceRange ? priceRange[0] : available.priceMin;
  const pMax = priceRange ? priceRange[1] : available.priceMax;
  const pStep = currency ? priceStep(currency, available.priceMax - available.priceMin) : 1;

  const mMin = m2Range ? m2Range[0] : available.m2Min;
  const mMax = m2Range ? m2Range[1] : available.m2Max;

  const btnActive: React.CSSProperties = { backgroundColor: accent, borderColor: accent, color: "#fff" };
  const btnIdle: React.CSSProperties = { backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.82)" };
  const btnMuted: React.CSSProperties = { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.28)" };

  return (
    <div className="flex flex-col mb-3 flex-shrink-0">
      {/* Row 1: Alquiler/Compra + Borrar */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5 flex-1">
          {(["alquiler", "venta"] as OpType[]).map((v) => (
            <button
              key={v}
              onClick={() => setOpType(opType === v ? null : v)}
              className="px-3 py-1.5 text-xs rounded-full font-medium border transition-colors flex-1 text-center"
              style={opType === v ? btnActive : btnIdle}
            >
              {v === "alquiler" ? labels.rental : labels.purchase}
            </button>
          ))}
        </div>
        <button
          onClick={clearAll}
          className="text-xs font-medium transition-colors flex-shrink-0 px-2.5 py-1.5 rounded-full border"
          style={isFiltered ? { ...btnIdle, borderColor: "rgba(255,255,255,0.35)" } : btnMuted}
        >
          {labels.clearFilters}
        </button>
      </div>

      <div className="h-px bg-white/10 mb-3" />

      {/* Row 2: Precio */}
      <div className="mb-3">
        {opType === null ? (
          <p className="text-[11px] text-white/35 py-0.5 italic">{labels.selectOpFirst}</p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-semibold text-white/45 uppercase tracking-wider">
                {opType === "alquiler" ? labels.monthlyPrice : labels.totalPrice}
              </p>
              {available.currencies.length > 1 && (
                <div className="flex gap-1">
                  {available.currencies.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className="px-2 py-0.5 text-[10px] rounded-full border transition-colors font-semibold"
                      style={currency === c ? btnActive : btnIdle}
                    >
                      {c === "ARS" ? "ARS $" : "USD"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {hasPriceData && currency ? (
              <DualRangeSlider
                min={available.priceMin}
                max={available.priceMax}
                valueMin={pMin}
                valueMax={pMax}
                onChangeMin={(v) => setPriceRange([v, pMax])}
                onChangeMax={(v) => setPriceRange([pMin, v])}
                formatValue={(v) => formatPrice(v, currency)}
                accent={accent}
                step={pStep}
                dark
              />
            ) : (
              <p className="text-xs text-white/30 italic py-1">{labels.noProps}</p>
            )}
          </>
        )}
      </div>

      <div className="h-px bg-white/10 mb-3" />

      {/* Row 3: Ambientes + m² */}
      <div className="flex gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-white/45 uppercase tracking-wider mb-1.5">{labels.rooms}</p>
          {available.ambientes.length === 0 ? (
            <p className="text-xs text-white/30 italic">{labels.noProps}</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {available.ambientes.map((n) => (
                <button
                  key={n}
                  onClick={() => toggleAmbiente(n)}
                  className="w-8 h-7 rounded-lg text-xs font-semibold border transition-colors flex items-center justify-center"
                  style={ambientes.includes(n) ? btnActive : btnIdle}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-white/45 uppercase tracking-wider mb-1">{labels.m2}</p>
          {hasM2Data ? (
            <DualRangeSlider
              min={available.m2Min}
              max={available.m2Max}
              valueMin={mMin}
              valueMax={mMax}
              onChangeMin={(v) => setM2Range([v, mMax])}
              onChangeMax={(v) => setM2Range([mMin, v])}
              formatValue={(v) => `${v}m²`}
              accent={accent}
              step={5}
              dark
            />
          ) : (
            <p className="text-xs text-white/30 italic pt-1">{labels.noProps}</p>
          )}
        </div>
      </div>

      <div className="h-px bg-white/10 mb-3" />

      {/* Row 4: Zona */}
      <div>
        <p className="text-[10px] font-semibold text-white/45 uppercase tracking-wider mb-1.5">{labels.zone}</p>
        {available.zones.length === 0 && selectedZones.length === 0 ? (
          <p className="text-xs text-white/30 italic">{labels.noProps}</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {allZones.map((zone) => {
              const checked = selectedZones.includes(zone.id);
              const isAvail = available.zones.includes(zone.id);
              if (!checked && !isAvail) return null;
              return (
                <button
                  key={zone.id}
                  onClick={() => toggleZone(zone.id)}
                  className="px-2.5 py-1 text-xs rounded-full border transition-colors font-medium"
                  style={checked ? btnActive : isAvail ? btnIdle : btnMuted}
                >
                  {loc(zone.label, locale)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
