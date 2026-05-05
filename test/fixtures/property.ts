import type { PropertyConfig } from "@/lib/types/client";

export const fullProperty: PropertyConfig = {
  id: "test-property",
  airbnbUrl: "https://www.airbnb.mx/rooms/test",
  kuulaEmbedUrl: "https://kuula.co/share/test",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?test",

  hero: {
    title: { it: "Studio a Roma", en: "Studio in Rome", es: "Studio en Roma", de: "Studio in Rom" },
    subtitle: { it: "Sottotitolo IT", en: "Subtitle EN", es: "Subtítulo ES", de: "Untertitel DE" },
  },

  description: {
    title: { it: "Lo Studio", en: "The Studio", es: "El Studio", de: "Das Studio" },
    body: { it: "Corpo IT", en: "Body EN", es: "Cuerpo ES", de: "Körper DE" },
    amenityKeys: ["fridge", "wifi"],
  },

  location: {
    title: { it: "Posizione", en: "Location", es: "Ubicación", de: "Lage" },
    subtitle: { it: "Sottotitolo", en: "Subtitle", es: "Subtítulo", de: "Untertitel" },
    description: { it: "Descrizione IT", en: "Description EN", es: "Descripción ES", de: "Beschreibung DE" },
    categories: [
      {
        key: "metro",
        label: { it: "Metro", en: "Metro", es: "Metro", de: "U-Bahn" },
        places: [
          {
            name: { it: "Castro Pretorio", en: "Castro Pretorio", es: "Castro Pretorio", de: "Castro Pretorio" },
            distance: "100",
          },
        ],
      },
    ],
  },

  reviews: {
    title: { it: "Recensioni", en: "Reviews", es: "Reseñas", de: "Bewertungen" },
    subtitle: { it: "Cosa dicono", en: "What they say", es: "Lo que dicen", de: "Was sie sagen" },
    items: [
      {
        id: "test-reviewer",
        author: "Test User",
        country: "Italy",
        rating: 5,
        comment: { it: "Ottimo IT", en: "Great EN", es: "Genial ES", de: "Toll DE" },
      },
    ],
  },

  cta: {
    title: { it: "Prenota", en: "Book now", es: "Reserva", de: "Buchen" },
    subtitle: { it: "Subtitolo", en: "Subtitle", es: "Subtítulo", de: "Untertitel" },
  },

  footerTagline: { it: "Tagline IT", en: "Tagline EN", es: "Tagline ES", de: "Tagline DE" },
};

export const minimalProperty: PropertyConfig = {
  id: "minimal-property",
  hero: {
    title: { it: "Minimo IT", en: "Minimal EN", es: "Mínimo ES", de: "Minimal DE" },
    subtitle: { it: "Sub IT", en: "Sub EN", es: "Sub ES", de: "Sub DE" },
  },
};
