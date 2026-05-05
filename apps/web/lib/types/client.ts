export type SupportedLocale = "it" | "en" | "es" | "de";
export type LocalizedString = Record<SupportedLocale, string>;

export interface ReviewerConfig {
  id: string;
  author: string;
  country: string;
  rating: number;
  comment: LocalizedString;
}

export interface POIPlace {
  name: LocalizedString;
  distance: string;
}

export interface POICategory {
  key: string;
  label: LocalizedString;
  places: POIPlace[];
}

export interface PropertyConfig {
  id: string;
  airbnbUrl?: string;
  kuulaEmbedUrl?: string;
  googleMapsEmbedUrl?: string;
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
  };
  description?: {
    title: LocalizedString;
    body: LocalizedString;
    amenityKeys: string[];
  };
  location?: {
    title: LocalizedString;
    subtitle: LocalizedString;
    description: LocalizedString;
    categories: POICategory[];
  };
  reviews?: {
    title: LocalizedString;
    subtitle: LocalizedString;
    items: ReviewerConfig[];
  };
  cta?: {
    title: LocalizedString;
    subtitle: LocalizedString;
  };
  footerTagline?: LocalizedString;
}

export interface ClientConfig {
  id: string;
  brandName: string;
  heroToursCount?: number;
  properties: PropertyConfig[];
}
