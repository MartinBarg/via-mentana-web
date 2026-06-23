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

// ─── Hook ────────────────────────────────────────────────────────────────────
// All derived values are computed with useMemo — no setState inside useEffect.
// Currency, clamped ranges, and invalid ambientes are derived, not synced.

export function useRealEstateFilters(properties: PropertyConfig[]): RealEstateFilterAPI {
  // Raw user selections (only mutated by explicit user actions, never by effects)
  const [opType, setOpTypeRaw] = useState<OpType | null>(null);
  const [zonesRaw, setZones] = useState<string[]>([]);
  const [ambientesRaw, setAmbientes] = useState<number[]>([]);
  const [currencyRaw, setCurrencyRaw] = useState<Currency | null>(null);
  const [priceFilterRaw, setPriceFilterRaw] = useState<[number, number] | null>(null);
  const [m2FilterRaw, setM2FilterRaw] = useState<[number, number] | null>(null);

  // Step 1: by operationType
  const byOpType = useMemo(() =>
    opType === null
      ? properties
      : properties.filter((p) => p.operationType?.includes(opType)),
    [properties, opType]
  );

  // Step 2: by zones
  const byZone = useMemo(() =>
    zonesRaw.length === 0
      ? byOpType
      : byOpType.filter((p) => p.zone && zonesRaw.includes(p.zone)),
    [byOpType, zonesRaw]
  );

  // Step 3: available ambientes; effective ambientes = intersection with available
  const availableAmbientes = useMemo(() => {
    const set = new Set<number>();
    byZone.forEach((p) => { if (p.ambientes !== undefined) set.add(p.ambientes); });
    return Array.from(set).sort((a, b) => a - b);
  }, [byZone]);

  const ambientes = useMemo(() =>
    ambientesRaw.filter((a) => availableAmbientes.includes(a)),
    [ambientesRaw, availableAmbientes]
  );

  const byAmbientes = useMemo(() =>
    ambientes.length === 0
      ? byZone
      : byZone.filter((p) => p.ambientes !== undefined && ambientes.includes(p.ambientes)),
    [byZone, ambientes]
  );

  // Step 4: available currencies; effective currency = auto-select or user pick
  const availableCurrencies = useMemo((): Currency[] => {
    if (!opType) return [];
    const set = new Set<Currency>();
    byAmbientes.forEach((p) => {
      const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
      if (price) set.add(price.currency);
    });
    return Array.from(set) as Currency[];
  }, [byAmbientes, opType]);

  const currency = useMemo((): Currency | null => {
    if (availableCurrencies.length === 0) return null;
    if (availableCurrencies.length === 1) return availableCurrencies[0];
    if (currencyRaw && availableCurrencies.includes(currencyRaw)) return currencyRaw;
    return availableCurrencies[0];
  }, [availableCurrencies, currencyRaw]);

  // Available price range from byAmbientes
  const pricePropsForRange = useMemo(() => {
    if (!opType || !currency) return [];
    return byAmbientes.filter((p) => {
      const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
      return price?.currency === currency;
    });
  }, [byAmbientes, opType, currency]);

  const availablePriceRange = useMemo((): [number, number] => {
    if (pricePropsForRange.length === 0) return [0, 0];
    const amounts = pricePropsForRange.map((p) =>
      (opType === "alquiler" ? p.rentalPrice! : p.salePrice!).amount
    );
    return [Math.min(...amounts), Math.max(...amounts)];
  }, [pricePropsForRange, opType]);

  // Effective price range: clamp raw selection to available range (pure derivation, no effect)
  const priceRange = useMemo((): [number, number] | null => {
    if (!priceFilterRaw) return null;
    const [aMin, aMax] = availablePriceRange;
    if (aMin === aMax) return null;
    const lo = Math.max(aMin, Math.min(priceFilterRaw[0], aMax));
    const hi = Math.max(aMin, Math.min(priceFilterRaw[1], aMax));
    if (lo === aMin && hi === aMax) return null; // full range = no constraint
    return [lo, hi];
  }, [priceFilterRaw, availablePriceRange]);

  // Step 5: filter by price
  const byPrice = useMemo(() => {
    if (!priceRange || !opType || !currency) return byAmbientes;
    const [pMin, pMax] = priceRange;
    return byAmbientes.filter((p) => {
      const price = opType === "alquiler" ? p.rentalPrice : p.salePrice;
      if (!price || price.currency !== currency) return true;
      return price.amount >= pMin && price.amount <= pMax;
    });
  }, [byAmbientes, priceRange, opType, currency]);

  // Step 6: available m2 range; effective m2 range = clamped raw selection
  const availableM2Range = useMemo((): [number, number] => {
    const vals = byPrice.map((p) => p.m2).filter((v): v is number => v !== undefined);
    if (vals.length === 0) return [0, 0];
    return [Math.min(...vals), Math.max(...vals)];
  }, [byPrice]);

  const m2Range = useMemo((): [number, number] | null => {
    if (!m2FilterRaw) return null;
    const [aMin, aMax] = availableM2Range;
    if (aMin === aMax) return null;
    const lo = Math.max(aMin, Math.min(m2FilterRaw[0], aMax));
    const hi = Math.max(aMin, Math.min(m2FilterRaw[1], aMax));
    if (lo === aMin && hi === aMax) return null;
    return [lo, hi];
  }, [m2FilterRaw, availableM2Range]);

  // Step 7: filter by m2
  const finalFiltered = useMemo(() => {
    if (!m2Range) return byPrice;
    const [mMin, mMax] = m2Range;
    return byPrice.filter((p) =>
      p.m2 === undefined || (p.m2 >= mMin && p.m2 <= mMax)
    );
  }, [byPrice, m2Range]);

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
    state: { opType, zones: zonesRaw, ambientes, currency, priceRange, m2Range },
    available: {
      ambientes: availableAmbientes,
      priceMin: availablePriceRange[0],
      priceMax: availablePriceRange[1],
      currencies: availableCurrencies,
      m2Min: availableM2Range[0],
      m2Max: availableM2Range[1],
    },
    setOpType: (v) => {
      setOpTypeRaw(v);
      setPriceFilterRaw(null); // reset price when op type changes
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

  const handleStyle = {
    backgroundColor: accent,
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div className="pt-1 pb-2">
      <div className="flex justify-between text-xs font-semibold text-charcoal mb-3 tabular-nums">
        <span>{formatValue(valueMin)}</span>
        <span>{formatValue(valueMax)}</span>
      </div>
      <div className="relative h-5 mx-2" ref={trackRef}>
        {/* Background track */}
        <div className="absolute inset-x-0 h-[3px] top-1/2 -translate-y-1/2 rounded-full bg-charcoal/15" />

        {/* Active range highlight */}
        <div
          className="absolute h-[3px] top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${leftPct}%`,
            right: `${100 - rightPct}%`,
            backgroundColor: accent,
          }}
        />

        {/* Min handle */}
        <div
          className="absolute w-[18px] h-[18px] rounded-full border-2 border-white shadow-md cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ ...handleStyle, left: `${leftPct}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
            const v = Math.min(valueFromClientX(e.clientX), valueMax - step);
            if (v !== valueMin) onChangeMin(v);
          }}
          onPointerUp={(e) => {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          }}
        />

        {/* Max handle */}
        <div
          className="absolute w-[18px] h-[18px] rounded-full border-2 border-white shadow-md cursor-grab active:cursor-grabbing touch-none z-10"
          style={{ ...handleStyle, left: `${rightPct}%` }}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
            const v = Math.max(valueFromClientX(e.clientX), valueMin + step);
            if (v !== valueMax) onChangeMax(v);
          }}
          onPointerUp={(e) => {
            (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
          }}
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

// ─── OpTypeToggle (shared between main section and price sub-section) ─────────

function OpTypeToggle({
  value,
  onChange,
  accent,
  labelAlquiler,
  labelCompra,
  size = "md",
}: {
  value: OpType | null;
  onChange: (v: OpType | null) => void;
  accent: string;
  labelAlquiler: string;
  labelCompra: string;
  size?: "sm" | "md";
}) {
  const baseBtn = size === "sm"
    ? "px-3 py-1.5 text-xs rounded-lg font-medium border transition-colors flex-1 text-center"
    : "px-4 py-2 text-sm rounded-xl font-medium border transition-colors flex-1 text-center";

  const activeStyle = { backgroundColor: accent, borderColor: accent, color: "#fff" };
  const inactiveStyle = { backgroundColor: "transparent", borderColor: "#d1cdc9", color: "#1C1C1A" };

  return (
    <div className="flex gap-2">
      <button
        className={baseBtn}
        style={value === "alquiler" ? activeStyle : inactiveStyle}
        onClick={() => onChange(value === "alquiler" ? null : "alquiler")}
      >
        {labelAlquiler}
      </button>
      <button
        className={baseBtn}
        style={value === "venta" ? activeStyle : inactiveStyle}
        onClick={() => onChange(value === "venta" ? null : "venta")}
      >
        {labelCompra}
      </button>
    </div>
  );
}

// ─── FilterSection wrapper ────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  noPadding = false,
}: {
  title: string;
  children: React.ReactNode;
  noPadding?: boolean;
}) {
  return (
    <div className="border-b border-charcoal/8 last:border-b-0 py-4">
      <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-3 px-4">
        {title}
      </p>
      <div className={noPadding ? "" : "px-4"}>{children}</div>
    </div>
  );
}

// ─── RealEstateFilterPanel ────────────────────────────────────────────────────

export interface RealEstateFilterPanelProps {
  open: boolean;
  onClose: () => void;
  api: RealEstateFilterAPI;
  zones: HeroZone[];
  locale: string;
  accent: string;
  labels: {
    filters: string;
    rental: string;
    purchase: string;
    price: string;
    monthlyPrice: string;
    totalPrice: string;
    rooms: string;
    zone: string;
    m2: string;
    clearFilters: string;
    allZones: string;
    selectOpFirst: string;
    currency: string;
  };
  panelClass?: string;
}

export function RealEstateFilterPanel({
  open,
  onClose,
  api,
  zones,
  locale,
  accent,
  labels,
  panelClass = "w-80",
}: RealEstateFilterPanelProps) {
  if (!open) return null;

  const { state, available, setOpType, toggleZone, toggleAmbiente, setCurrency, setPriceRange, setM2Range, clearAll } = api;
  const { opType, zones: selectedZones, ambientes, currency, priceRange, m2Range } = state;

  // Price range values: use selectedPriceRange if set, else available range
  const pMin = priceRange ? priceRange[0] : available.priceMin;
  const pMax = priceRange ? priceRange[1] : available.priceMax;
  const pStep = currency ? priceStep(currency, available.priceMax - available.priceMin) : 1;

  // m2 range values
  const mMin = m2Range ? m2Range[0] : available.m2Min;
  const mMax = m2Range ? m2Range[1] : available.m2Max;
  const hasPriceData = opType !== null && available.priceMin < available.priceMax;
  const hasM2Data = available.m2Min < available.m2Max;

  return (
    <div
      className={`absolute left-0 top-full mt-2 ${panelClass} bg-ivory rounded-2xl shadow-2xl z-50 overflow-hidden`}
      style={{ border: "1px solid rgba(0,0,0,0.08)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-charcoal/8"
        style={{ borderBottomColor: "rgba(28,28,26,0.08)" }}
      >
        <span className="text-sm font-semibold text-charcoal">{labels.filters}</span>
        <div className="flex items-center gap-3">
          {api.isFiltered && (
            <button
              onClick={clearAll}
              className="text-xs text-warm-gray hover:text-charcoal underline underline-offset-2 transition-colors"
            >
              {labels.clearFilters}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-charcoal/8 text-warm-gray hover:text-charcoal transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[70vh]">

        {/* 1. Alquiler / Compra */}
        <FilterSection title={`${labels.rental} / ${labels.purchase}`}>
          <OpTypeToggle
            value={opType}
            onChange={setOpType}
            accent={accent}
            labelAlquiler={labels.rental}
            labelCompra={labels.purchase}
          />
        </FilterSection>

        {/* 2. Precio */}
        <FilterSection title={labels.price} noPadding>
          <div className="px-4">
            {opType === null ? (
              /* No opType selected → show mini picker */
              <div>
                <p className="text-xs text-warm-gray mb-2">{labels.selectOpFirst}</p>
                <OpTypeToggle
                  value={opType}
                  onChange={setOpType}
                  accent={accent}
                  labelAlquiler={labels.rental}
                  labelCompra={labels.purchase}
                  size="sm"
                />
              </div>
            ) : (
              <div>
                {/* Monthly/Total label */}
                <p className="text-xs text-warm-gray mb-2">
                  {opType === "alquiler" ? labels.monthlyPrice : labels.totalPrice}
                </p>

                {/* Currency selector when multiple currencies */}
                {available.currencies.length > 1 && (
                  <div className="flex gap-1.5 mb-3">
                    {available.currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCurrency(c)}
                        className="px-2.5 py-1 text-xs rounded-lg border font-medium transition-colors"
                        style={
                          currency === c
                            ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                            : { backgroundColor: "transparent", borderColor: "#d1cdc9", color: "#1C1C1A" }
                        }
                      >
                        {c === "ARS" ? "Pesos $" : "Dólares US$"}
                      </button>
                    ))}
                  </div>
                )}

                {/* Range slider */}
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
                  />
                ) : (
                  <p className="text-xs text-warm-gray italic py-1">
                    {labels.selectOpFirst}
                  </p>
                )}
              </div>
            )}
          </div>
        </FilterSection>

        {/* 3. Ambientes */}
        <FilterSection title={labels.rooms}>
          {available.ambientes.length === 0 ? (
            <p className="text-xs text-warm-gray italic">—</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {available.ambientes.map((n) => {
                const selected = ambientes.includes(n);
                return (
                  <button
                    key={n}
                    onClick={() => toggleAmbiente(n)}
                    className="w-9 h-9 rounded-xl text-sm font-medium border transition-colors"
                    style={
                      selected
                        ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                        : { backgroundColor: "transparent", borderColor: "#d1cdc9", color: "#1C1C1A" }
                    }
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          )}
        </FilterSection>

        {/* 4. Zona */}
        {zones.length > 0 && (
          <FilterSection title={labels.zone}>
            <div className="space-y-1">
              {zones.map((zone) => {
                const checked = selectedZones.includes(zone.id);
                return (
                  <button
                    key={zone.id}
                    onClick={() => toggleZone(zone.id)}
                    className="w-full flex items-center gap-3 py-1.5 text-sm text-charcoal hover:text-charcoal/70 transition-colors text-left"
                  >
                    <span
                      className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
                      style={
                        checked
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
          </FilterSection>
        )}

        {/* 5. m² */}
        <FilterSection title="m²" noPadding>
          <div className="px-4">
            {hasM2Data ? (
              <DualRangeSlider
                min={available.m2Min}
                max={available.m2Max}
                valueMin={mMin}
                valueMax={mMax}
                onChangeMin={(v) => setM2Range([v, mMax])}
                onChangeMax={(v) => setM2Range([mMin, v])}
                formatValue={(v) => `${v} m²`}
                accent={accent}
                step={5}
              />
            ) : (
              <p className="text-xs text-warm-gray italic py-1">—</p>
            )}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
