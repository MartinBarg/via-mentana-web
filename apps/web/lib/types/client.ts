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
  zone?: string;
  guests?: number;
  imageUrl?: string;
  airbnbUrl?: string;
  kuulaEmbedUrl?: string;
  googleMapsEmbedUrl?: string;
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
    ctaLabel?: LocalizedString;
    ctaUrl?: string;
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
    videoUrl?: string;
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
    buttonLabel?: LocalizedString;
  };
  footerTagline?: LocalizedString;
}

export interface AboutUsConfig {
  title: LocalizedString;
  body: LocalizedString;
  imageUrl?: string;
}

export interface HeroZone {
  id: string;
  label: LocalizedString;
}

export interface ClientHeroConfig {
  tagline: LocalizedString;
  ctaLabel: LocalizedString;
  zones?: HeroZone[];
  guestFilter?: boolean;
  ctaSingle?: { url: string };
}

export interface ClientConfig {
  id: string;
  brandName: string;
  brandLogoUrl?: string;
  backgroundImageUrl?: string;
  backgroundPersonImageUrl?: string;
  transparentNav?: boolean;
  heroToursCount?: number;
  hero?: ClientHeroConfig;
  aboutUs?: AboutUsConfig;
  properties: PropertyConfig[];
}
