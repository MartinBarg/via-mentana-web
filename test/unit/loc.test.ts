import { describe, it, expect } from "vitest";
import { loc } from "@/lib/utils";
import type { LocalizedString } from "@/lib/types/client";

const str: LocalizedString = {
  it: "Testo italiano",
  en: "English text",
  es: "Texto español",
  de: "Deutscher Text",
};

describe("loc()", () => {
  it("returns Italian for locale 'it'", () => {
    expect(loc(str, "it")).toBe("Testo italiano");
  });

  it("returns English for locale 'en'", () => {
    expect(loc(str, "en")).toBe("English text");
  });

  it("returns Spanish for locale 'es'", () => {
    expect(loc(str, "es")).toBe("Texto español");
  });

  it("returns German for locale 'de'", () => {
    expect(loc(str, "de")).toBe("Deutscher Text");
  });

  it("falls back to English for unknown locale 'fr'", () => {
    expect(loc(str, "fr")).toBe("English text");
  });

  it("falls back to English for empty string locale", () => {
    expect(loc(str, "")).toBe("English text");
  });

  it("falls back to English for uppercase 'EN' (case-sensitive)", () => {
    expect(loc(str, "EN")).toBe("English text");
  });

  it("returns empty string when Italian value is '' — ?? does not trigger fallback for empty string", () => {
    const withEmptyIt: LocalizedString = { it: "", en: "fallback", es: "", de: "" };
    expect(loc(withEmptyIt, "it")).toBe("");
  });
});
