import type { LocalizedString, SupportedLocale } from "./types/client";

export function loc(str: LocalizedString, locale: string): string {
  return str[locale as SupportedLocale] ?? str["en"];
}
