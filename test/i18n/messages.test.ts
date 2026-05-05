import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const MESSAGES_DIR = path.resolve(__dirname, "../../apps/web/messages");
const LOCALES = ["it", "en", "es", "de"] as const;

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) => {
    const full = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === "object" && !Array.isArray(v)
      ? getKeys(v as Record<string, unknown>, full)
      : [full];
  });
}

describe("i18n message files", () => {
  const messages: Record<string, Record<string, unknown>> = {};
  const keysets: Record<string, string[]> = {};

  for (const locale of LOCALES) {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    messages[locale] = JSON.parse(raw);
    keysets[locale] = getKeys(messages[locale]).sort();
  }

  it("all locale files exist", () => {
    for (const locale of LOCALES) {
      expect(
        fs.existsSync(path.join(MESSAGES_DIR, `${locale}.json`)),
        `${locale}.json should exist`
      ).toBe(true);
    }
  });

  it("all locale files have the same keys as English", () => {
    const enKeys = keysets["en"];
    for (const locale of LOCALES) {
      if (locale === "en") continue;
      expect(
        keysets[locale],
        `${locale}.json keys should match en.json`
      ).toEqual(enKeys);
    }
  });

  it("no locale has empty string values", () => {
    for (const locale of LOCALES) {
      const keys = keysets[locale];
      for (const key of keys) {
        const parts = key.split(".");
        let val: unknown = messages[locale];
        for (const part of parts) {
          val = (val as Record<string, unknown>)[part];
        }
        expect(val, `${locale}.json key "${key}" should not be empty`).not.toBe("");
      }
    }
  });
});
