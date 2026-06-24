"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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

export function useRealEstateFilters(properties: PropertyConfig[]): RealEstateFilterAPI {
  const [opType, setOpTypeRaw] = useState<OpType | null>(null);
  const [zonesRaw, setZones] = useState<string[]>([]);
  const [ambientesRaw, setAmbientes] = useState<number[]>([]);
  const [currencyRaw, setCurrencyRaw] = useState<Currency | null>(null);
  const [priceFilterRaw, setPriceFilterRaw] = useState<[number, number] | null>(null);
  const [m2FilterRaw, setM2FilterRaw] = useState<[number, number] | null>(null);

  const byOpType = useMemo(() =>
    opType === null
      ? properties
      : properties.filter((p) => p.operationType?.includes(opType)),
    [properties, opType]
  );

  // Derive currency from byOpType + zones + ambientes (no price/m2 to avoid circular deps)
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

  // Cross-reactive option sets
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

  const effectiveAmbientes = useMemo(() =>
    ambientesRaw.filter((a) => availableAmbientes.includes(a)),
    [ambientesRaw, availableAmbientes]
  );

  const priceRange = useMemo((): [number, number] | null => {
    if (!priceFilterRaw) return null;
    const [aMin, aMax] = availablePriceRange;
    const lo = Math.max(aMin, Math.min(priceFilterRaw[0], aMax));
    const hi = Math.max(aMin, Math.min(priceFilterRaw[1], aMax));
    if (lo === aMin && hi === aMax) return null;
    return [lo, hi];
  }, [priceFilterRaw, availablePriceRange]);

  const m2Range = useMemo((): [number, number] | null => {
    if (!m2FilterRaw) return null;
    const [aMin, aMax] = availableM2Range;
    const lo = Math.max(aMin, Math.min(m2FilterRaw[0], aMax));
    const hi = Math.max(aMin, Math.min(m2FilterRaw[1], aMax));
    if (lo === aMin && hi === aMax) return null;
    return [lo, hi];
  }, [m2FilterRaw, availableM2Range]);

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
    priceRange !== null,
    m2Range !== null,
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
  min, max, valueMin, valueMax, onChangeMin, onChangeMax, formatValue, accent, step = 1,
}: {
  min: number; max: number;
  valueMin: number; valueMax: number;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
  formatValue: (v: number) => string;
  accent: string;
  step?: number;
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
  const leftPct = range > 0 ? ((valueMin - min) / range) * 100 : 50;
  const rightPct = range > 0 ? ((valueMax - min) / range) * 100 : 50;

  const handleBase: React.CSSProperties = {
    backgroundColor: "#fff",
    top: "50%",
    transform: "translate(-50%, -50%)",
    border: `2px solid ${accent}`,
  };

  return (
    <div className="pt-1 pb-2">
      <div className="flex justify-between text-xs font-semibold text-charcoal mb-3 tabular-nums">
        <span>{formatValue(valueMin)}</span>
        <span>{formatValue(valueMax)}</span>
      </div>
      <div className="relative h-5 mx-2" ref={trackRef}>
        <div className="absolute inset-x-0 h-[3px] top-1/2 -translate-y-1/2 rounded-full bg-charcoal/15" />
        <div
          className="absolute h-[3px] top-1/2 -translate-y-1/2 rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%`, backgroundColor: accent }}
        />
        <div
          className="absolute w-[18px] h-[18px] rounded-full shadow-md cursor-grab active:cursor-grabbing touch-none z-10"
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
          className="absolute w-[18px] h-[18px] rounded-full shadow-md cursor-grab active:cursor-grabbing touch-none z-10"
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
// 5 individual filter chips (closed by default), each expands its own panel when clicked.

export interface RealEstateInlineFiltersProps {
  api: RealEstateFilterAPI;
  allZones: HeroZone[];
  locale: string;
  accent: string;
  labels: {
    rental: string;
    purchase: string;
    price: string;
    monthlyPrice: string;
    totalPrice: string;
    rooms: string;
    zone: string;
    m2: string;
    clearFilters: string;
    selectOpFirst: string;
    noProps: string;
    currencyARS: string;
    currencyUSD: string;
  };
}

type FilterKey = "opType" | "price" | "ambientes" | "zone" | "m2";

// Defined outside the parent component to avoid "component created during render" lint error
function FilterChip({
  id, label, summary, isActive, isOpen, accent, onToggle,
}: {
  id: FilterKey;
  label: string;
  summary?: string | null;
  isActive: boolean;
  isOpen: boolean;
  accent: string;
  onToggle: (id: FilterKey) => void;
}) {
  return (
    <button
      onClick={() => onToggle(id)}
      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap flex-shrink-0"
      style={isActive || isOpen
        ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
        : { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)" }
      }
    >
      {summary ?? label}
      <svg
        className={`w-3 h-3 flex-shrink-0 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function RealEstateInlineFilters({
  api, allZones, locale, accent, labels,
}: RealEstateInlineFiltersProps) {
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openFilter) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpenFilter(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openFilter]);

  const toggle = (f: FilterKey) => setOpenFilter((o) => (o === f ? null : f));

  const { state, available, isFiltered } = api;
  const { opType, zones: selectedZones, ambientes, currency, priceRange, m2Range } = state;

  const hasPriceData = opType !== null && available.priceMax > 0;
  const hasM2Data = available.m2Max > 0;

  const pMin = priceRange ? priceRange[0] : available.priceMin;
  const pMax = priceRange ? priceRange[1] : available.priceMax;
  const pStep = currency ? priceStep(currency, available.priceMax - available.priceMin) : 1;
  const mMin = m2Range ? m2Range[0] : available.m2Min;
  const mMax = m2Range ? m2Range[1] : available.m2Max;

  const opTypeSummary = opType ? (opType === "alquiler" ? labels.rental : labels.purchase) : null;
  const ambientesSummary = ambientes.length > 0 ? ambientes.join(", ") : null;
  const zoneSummary = selectedZones.length === 1
    ? (allZones.find((z) => z.id === selectedZones[0]) ? loc(allZones.find((z) => z.id === selectedZones[0])!.label, locale) : selectedZones[0])
    : selectedZones.length > 1 ? `${selectedZones.length}` : null;
  const m2Summary = m2Range ? `${m2Range[0]}–${m2Range[1]}` : null;

  // Panel content styles (light bg, dark text)
  const panelBtnActive: React.CSSProperties = { backgroundColor: accent, borderColor: accent, color: "#fff" };
  const panelBtnIdle: React.CSSProperties = { backgroundColor: "transparent", borderColor: "#d1cdc9", color: "#1C1C1A" };

  return (
    <div ref={containerRef} className="relative mb-3 flex-shrink-0">
      {/* Chips row */}
      <div className="flex items-center gap-2 flex-wrap">
        <FilterChip id="opType" label={`${labels.rental} / ${labels.purchase}`} summary={opTypeSummary} isActive={!!opType} isOpen={openFilter === "opType"} accent={accent} onToggle={toggle} />
        <FilterChip id="price" label={labels.price} isActive={!!priceRange} isOpen={openFilter === "price"} accent={accent} onToggle={toggle} />
        <FilterChip id="ambientes" label={labels.rooms} summary={ambientesSummary} isActive={ambientes.length > 0} isOpen={openFilter === "ambientes"} accent={accent} onToggle={toggle} />
        <FilterChip id="zone" label={labels.zone} summary={zoneSummary} isActive={selectedZones.length > 0} isOpen={openFilter === "zone"} accent={accent} onToggle={toggle} />
        <FilterChip id="m2" label={labels.m2} summary={m2Summary ? `${m2Summary} m²` : null} isActive={!!m2Range} isOpen={openFilter === "m2"} accent={accent} onToggle={toggle} />
        <button
          onClick={api.clearAll}
          className="text-xs font-medium transition-colors px-2.5 py-1.5 rounded-full border flex-shrink-0"
          style={isFiltered
            ? { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.85)" }
            : { backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.28)" }
          }
        >
          {labels.clearFilters}
        </button>
      </div>

      {/* Expandable panel — absolute so it overlays tour cards without resizing them */}
      {openFilter && (
        <div
          className="absolute left-0 right-0 top-full mt-1 bg-ivory rounded-2xl shadow-2xl z-50 overflow-x-hidden overflow-y-auto"
          style={{ border: "1px solid rgba(0,0,0,0.08)", maxHeight: "55svh" }}
        >
          {/* Alquiler / Compra */}
          {openFilter === "opType" && (
            <div className="p-4">
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-3">
                {labels.rental} / {labels.purchase}
              </p>
              <div className="flex gap-2">
                {(["alquiler", "venta"] as OpType[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => api.setOpType(opType === v ? null : v)}
                    className="px-4 py-2 text-sm rounded-xl font-medium border transition-colors flex-1 text-center"
                    style={opType === v ? panelBtnActive : panelBtnIdle}
                  >
                    {v === "alquiler" ? labels.rental : labels.purchase}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Precio */}
          {openFilter === "price" && (
            <div className="p-4">
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-3">
                {labels.price}
              </p>
              {opType === null ? (
                <>
                  <p className="text-xs text-warm-gray mb-3">{labels.selectOpFirst}</p>
                  <div className="flex gap-2">
                    {(["alquiler", "venta"] as OpType[]).map((v) => (
                      <button
                        key={v}
                        onClick={() => api.setOpType(v)}
                        className="px-3 py-1.5 text-xs rounded-lg font-medium border transition-colors flex-1 text-center"
                        style={panelBtnIdle}
                      >
                        {v === "alquiler" ? labels.rental : labels.purchase}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-warm-gray mb-2">
                    {opType === "alquiler" ? labels.monthlyPrice : labels.totalPrice}
                  </p>
                  {available.currencies.length > 1 && (
                    <div className="flex gap-1.5 mb-3">
                      {available.currencies.map((c) => (
                        <button
                          key={c}
                          onClick={() => api.setCurrency(c)}
                          className="px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors"
                          style={currency === c ? panelBtnActive : panelBtnIdle}
                        >
                          {c === "ARS" ? labels.currencyARS : labels.currencyUSD}
                        </button>
                      ))}
                    </div>
                  )}
                  {hasPriceData && currency ? (
                    <DualRangeSlider
                      min={available.priceMin}
                      max={available.priceMax}
                      valueMin={pMin}
                      valueMax={pMax}
                      onChangeMin={(v) => api.setPriceRange([v, pMax])}
                      onChangeMax={(v) => api.setPriceRange([pMin, v])}
                      formatValue={(v) => formatPrice(v, currency)}
                      accent={accent}
                      step={pStep}
                    />
                  ) : (
                    <p className="text-xs text-warm-gray italic">{labels.noProps}</p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Ambientes */}
          {openFilter === "ambientes" && (
            <div className="p-4">
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-3">
                {labels.rooms}
              </p>
              {available.ambientes.length === 0 ? (
                <p className="text-xs text-warm-gray italic">{labels.noProps}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {available.ambientes.map((n) => (
                    <button
                      key={n}
                      onClick={() => api.toggleAmbiente(n)}
                      className="w-10 h-10 rounded-xl text-sm font-medium border transition-colors"
                      style={ambientes.includes(n) ? panelBtnActive : panelBtnIdle}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Zona */}
          {openFilter === "zone" && (
            <div className="p-4">
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-3">
                {labels.zone}
              </p>
              {available.zones.length === 0 && selectedZones.length === 0 ? (
                <p className="text-xs text-warm-gray italic">{labels.noProps}</p>
              ) : (
                <div className="space-y-1">
                  {allZones.map((zone) => {
                    const checked = selectedZones.includes(zone.id);
                    const isAvail = available.zones.includes(zone.id);
                    if (!checked && !isAvail) return null;
                    return (
                      <button
                        key={zone.id}
                        onClick={() => api.toggleZone(zone.id)}
                        className="w-full flex items-center gap-3 py-1.5 text-sm text-charcoal hover:text-charcoal/70 transition-colors text-left"
                      >
                        <span
                          className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
                          style={checked
                            ? { backgroundColor: accent, borderColor: accent }
                            : { backgroundColor: "transparent", borderColor: "#9B9490" }
                          }
                        >
                          {checked && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        {loc(zone.label, locale)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* m² */}
          {openFilter === "m2" && (
            <div className="p-4">
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-3">
                m²
              </p>
              {hasM2Data ? (
                <DualRangeSlider
                  min={available.m2Min}
                  max={available.m2Max}
                  valueMin={mMin}
                  valueMax={mMax}
                  onChangeMin={(v) => api.setM2Range([v, mMax])}
                  onChangeMax={(v) => api.setM2Range([mMin, v])}
                  formatValue={(v) => `${v} m²`}
                  accent={accent}
                  step={5}
                />
              ) : (
                <p className="text-xs text-warm-gray italic">{labels.noProps}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
