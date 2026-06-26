export type SupportedLocale = "it" | "en" | "es" | "de";
export type LocalizedString = Record<SupportedLocale, string>;

export interface ReviewerConfig {
  id: string;
  author: string;
  country: string;
  rating?: number;
  comment: LocalizedString;
}

export interface ClientReviewsConfig {
  title: LocalizedString;
  subtitle?: LocalizedString;
  items: ReviewerConfig[];
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

export interface PropertyPrice {
  amount: number;
  currency: "ARS" | "USD";
}

export interface PropertyConfig {
  id: string;
  zone?: string;
  guests?: number;
  operationType?: ("alquiler" | "venta")[];
  rentalPrice?: PropertyPrice[];
  salePrice?: PropertyPrice[];
  ambientes?: number;
  m2?: number;
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
  realEstateFilters?: boolean;
  ctaSingle?: { url: string };
  disableScrollHijack?: boolean;
}

export interface ClientTheme {
  accent?: string;
  accentDark?: string;
}

export interface ClientConfig {
  id: string;
  brandName: string;
  brandLogoUrl?: string;
  backgroundImageUrl?: string;
  backgroundPersonImageUrl?: string;
  transparentNav?: boolean;
  theme?: ClientTheme;
  heroToursCount?: number;
  hero?: ClientHeroConfig;
  aboutUs?: AboutUsConfig;
  reviews?: ClientReviewsConfig;
  properties: PropertyConfig[];
}
