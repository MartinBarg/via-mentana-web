import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import config from "@/clients/via-mentana/config";
import type { LocalizedString } from "@/lib/types/client";

const LOCALES = ["it", "en", "es", "de"] as const;
const MESSAGES_DIR = path.resolve(__dirname, "../../apps/web/messages");

function allLocalesPresent(str: LocalizedString): boolean {
  return LOCALES.every((l) => typeof str[l] === "string" && str[l].trim() !== "");
}

function getAmenityKeys(): Set<string> {
  const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, "en.json"), "utf-8"));
  return new Set(Object.keys(en.description?.amenities ?? {}));
}

describe("via-mentana config", () => {
  it("has a valid id and brandName", () => {
    expect(config.id).toBe("via-mentana");
    expect(config.brandName).toBeTruthy();
  });

  it("has at least one property", () => {
    expect(config.properties.length).toBeGreaterThan(0);
  });

  it("each property hero has all 4 locales with non-empty text", () => {
    for (const prop of config.properties) {
      expect(allLocalesPresent(prop.hero.title), `${prop.id} hero.title`).toBe(true);
      expect(allLocalesPresent(prop.hero.subtitle), `${prop.id} hero.subtitle`).toBe(true);
    }
  });

  it("description LocalizedStrings have all 4 locales", () => {
    for (const prop of config.properties) {
      if (!prop.description) continue;
      expect(allLocalesPresent(prop.description.title), `${prop.id} description.title`).toBe(true);
      expect(allLocalesPresent(prop.description.body), `${prop.id} description.body`).toBe(true);
    }
  });

  it("amenityKeys in config exist in messages/en.json", () => {
    const validKeys = getAmenityKeys();
    for (const prop of config.properties) {
      if (!prop.description) continue;
      for (const key of prop.description.amenityKeys) {
        expect(validKeys.has(key), `amenityKey "${key}" not found in en.json description.amenities`).toBe(true);
      }
    }
  });

  it("airbnbUrl is a valid URL when present", () => {
    for (const prop of config.properties) {
      if (!prop.airbnbUrl) continue;
      expect(() => new URL(prop.airbnbUrl!)).not.toThrow();
      expect(prop.airbnbUrl).toContain("airbnb");
    }
  });

  it("kuulaEmbedUrl is a valid URL when present", () => {
    for (const prop of config.properties) {
      if (!prop.kuulaEmbedUrl) continue;
      expect(() => new URL(prop.kuulaEmbedUrl!)).not.toThrow();
      expect(prop.kuulaEmbedUrl).toContain("kuula");
    }
  });

  it("googleMapsEmbedUrl is a valid URL when present", () => {
    for (const prop of config.properties) {
      if (!prop.googleMapsEmbedUrl) continue;
      expect(() => new URL(prop.googleMapsEmbedUrl!)).not.toThrow();
      expect(prop.googleMapsEmbedUrl).toContain("google.com/maps");
    }
  });

  it("location categories have all 4 locales on labels and place names", () => {
    for (const prop of config.properties) {
      if (!prop.location) continue;
      for (const cat of prop.location.categories) {
        expect(allLocalesPresent(cat.label), `${prop.id} category "${cat.key}" label`).toBe(true);
        for (const place of cat.places) {
          expect(allLocalesPresent(place.name), `${prop.id} place in "${cat.key}"`).toBe(true);
        }
      }
    }
  });

  it("review comments have all 4 locales", () => {
    for (const prop of config.properties) {
      if (!prop.reviews) continue;
      for (const reviewer of prop.reviews.items) {
        expect(allLocalesPresent(reviewer.comment), `reviewer ${reviewer.id} comment`).toBe(true);
      }
    }
  });
});
