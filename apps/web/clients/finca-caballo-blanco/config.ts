import type { ClientConfig } from "../../lib/types/client";

const sharedLocation = {
  title: {
    it: "La Posizione",
    en: "Location",
    es: "Ubicación",
    de: "Lage",
  },
  subtitle: {
    it: "Montuïri, Maiorca",
    en: "Montuïri, Mallorca",
    es: "Montuïri, Mallorca",
    de: "Montuïri, Mallorca",
  },
  description: {
    it: "Situata nel comune di Montuïri, nel centro di Maiorca, la finca si trova in piena natura tra campi e silenzio. A pochi chilometri dalle principali attrazioni dell'isola — spiagge, borghi storici e mercati locali — con facile accesso in auto dall'aeroporto e da Palma.",
    en: "Located in the municipality of Montuïri, in central Mallorca, the finca sits in the middle of nature surrounded by fields and silence. Just a few kilometres from the island's main attractions — beaches, historic villages and local markets — with easy car access from the airport and Palma.",
    es: "Ubicada en el municipio de Montuïri, en el centro de Mallorca, la finca se encuentra en plena naturaleza entre campos y silencio. A pocos kilómetros de las principales atracciones de la isla — playas, pueblos históricos y mercados locales — con fácil acceso en coche desde el aeropuerto y Palma.",
    de: "Im Gemeindegebiet Montuïri, im Herzen Mallorcas gelegen, befindet sich die Finca mitten in der Natur zwischen Feldern und Stille. Nur wenige Kilometer von den Hauptattraktionen der Insel entfernt — Strände, historische Dörfer und lokale Märkte — mit einfachem Fahrzeugzugang vom Flughafen und Palma.",
  },
  categories: [
    {
      key: "restaurant",
      label: {
        it: "Ristoranti",
        en: "Restaurants",
        es: "Restaurantes",
        de: "Restaurants",
      },
      places: [
        {
          name: {
            it: "Es Cruce (incrocio Palma–Manacor)",
            en: "Es Cruce (Palma–Manacor crossroads)",
            es: "Es Cruce (cruce Palma–Manacor)",
            de: "Es Cruce (Kreuzung Palma–Manacor)",
          },
          distance: "2500",
        },
        {
          name: {
            it: "Sa Placa Montuïri",
            en: "Sa Placa Montuïri",
            es: "Sa Placa Montuïri",
            de: "Sa Placa Montuïri",
          },
          distance: "3200",
        },
        {
          name: {
            it: "Can Matevet (Montuïri)",
            en: "Can Matevet (Montuïri)",
            es: "Can Matevet (Montuïri)",
            de: "Can Matevet (Montuïri)",
          },
          distance: "3500",
        },
      ],
    },
    {
      key: "beach",
      label: {
        it: "Spiagge",
        en: "Beaches",
        es: "Playas",
        de: "Strände",
      },
      places: [
        {
          name: {
            it: "Platja de Sa Ràpita",
            en: "Platja de Sa Ràpita",
            es: "Platja de Sa Ràpita",
            de: "Platja de Sa Ràpita",
          },
          distance: "18000",
        },
        {
          name: {
            it: "Platja d'Es Trenc",
            en: "Platja d'Es Trenc",
            es: "Platja d'Es Trenc",
            de: "Platja d'Es Trenc",
          },
          distance: "20000",
        },
        {
          name: {
            it: "Platja de Cala Pi",
            en: "Platja de Cala Pi",
            es: "Platja de Cala Pi",
            de: "Platja de Cala Pi",
          },
          distance: "22000",
        },
      ],
    },
    {
      key: "coffee",
      label: {
        it: "Bar e caffè",
        en: "Bars & coffee",
        es: "Bares y cafés",
        de: "Bars & Cafés",
      },
      places: [
        {
          name: {
            it: "Bar Es Dau (Montuïri)",
            en: "Bar Es Dau (Montuïri)",
            es: "Bar Es Dau (Montuïri)",
            de: "Bar Es Dau (Montuïri)",
          },
          distance: "3100",
        },
        {
          name: {
            it: "Bar Can Pieres (Montuïri)",
            en: "Bar Can Pieres (Montuïri)",
            es: "Bar Can Pieres (Montuïri)",
            de: "Bar Can Pieres (Montuïri)",
          },
          distance: "3400",
        },
      ],
    },
    {
      key: "bus",
      label: {
        it: "Autobus",
        en: "Bus",
        es: "Bus",
        de: "Bus",
      },
      places: [
        {
          name: {
            it: "TIB Linea 491 (Montuïri → Palma)",
            en: "TIB Line 491 (Montuïri → Palma)",
            es: "TIB Línea 491 (Montuïri → Palma)",
            de: "TIB Linie 491 (Montuïri → Palma)",
          },
          distance: "3200",
        },
      ],
    },
  ],
};

const sharedReviews = {
  title: {
    it: "Recensioni",
    en: "Reviews",
    es: "Reseñas",
    de: "Bewertungen",
  },
  subtitle: {
    it: "Cosa dicono i nostri ospiti",
    en: "What our guests say",
    es: "Lo que dicen nuestros huéspedes",
    de: "Was unsere Gäste sagen",
  },
  items: [
    {
      id: "silvia",
      author: "Silvia",
      country: "España",
      rating: 5,
      comment: {
        it: "È una casa di campagna con cavalli, hanno un'area comune molto bella, con piscina e zona prendisole.",
        en: "It's a country house with horses, they have a very nice common area, with a pool and a sunbathing spot.",
        es: "Es una casa de campo con caballos, tienen una zona común que está muy bien, con piscina, y zona para tomar el sol.",
        de: "Es ist ein Landhaus mit Pferden, sie haben einen sehr schönen Gemeinschaftsbereich, mit Pool und Sonnenterrasse.",
      },
    },
    {
      id: "sergiu",
      author: "Sergiu",
      country: "España",
      rating: 4,
      comment: {
        it: "La finca è molto bella in generale, con cavalli, molta tranquillità, ideale per staccare dalla routine.",
        en: "The finca is very beautiful overall, with horses, great tranquility, ideal for disconnecting.",
        es: "La finca muy bonita en general, con caballos, mucha tranquilidad, ideal para desconectar.",
        de: "Die Finca ist insgesamt sehr schön, mit Pferden, viel Ruhe, ideal um abzuschalten.",
      },
    },
    {
      id: "yhisleym",
      author: "Yhisleym",
      country: "Colombia",
      rating: 5,
      comment: {
        it: "L'atmosfera rustica del posto, le luci nelle aree comuni di notte. L'attenzione fenomenale. Il convivere con altri cagnolini e vedere i cavalli. L'accoglienza di Jordi e Andrea dal primo giorno è stata calorosa, attenta, aperta e davvero piacevole.",
        en: "The rustic feel of the place, the lighting in the common areas at night. The service was phenomenal. Being around other dogs and seeing the horses. Jordi and Andrea's hospitality from day one was welcoming, attentive, open and very pleasant.",
        es: "Lo rústico del sitio, las luces en las áreas comunes en las noches. La atención fenomenal. El estar conviviendo con otros perritos y ver los caballos. La atención de Jordi y Andrea desde el día 1 fue acogedora, atenta, abierta y muy agradable.",
        de: "Das rustikale Ambiente, die Beleuchtung der Gemeinschaftsbereiche abends. Die Betreuung war phänomenal. Das Zusammensein mit anderen Hunden und die Pferde beobachten. Jordi und Andreas Gastfreundschaft war vom ersten Tag an herzlich, aufmerksam, offen und sehr angenehm.",
      },
    },
    {
      id: "mercedes",
      author: "Mercedes",
      country: "Alemania",
      rating: 4.5,
      comment: {
        it: "La camera era spaziosa e il letto molto comodo. C'era molto spazio nel patio comune per sedersi e passeggiare. Circondato dalla natura. Ci hanno fornito tutto il necessario in camera (asciugacapelli, ombrellone, asciugamani extra).",
        en: "The room was spacious and the bed very comfortable. There was plenty of space in the common patio to sit and stroll. Surrounded by nature. They provided everything we needed in the room (hair dryer, umbrella, extra towels).",
        es: "La habitación era amplia y la cama muy cómoda. Había mucho sitio en el patio común para sentarse y pasear. Estaba rodeado de naturaleza. Nos ofrecieron todo lo que necesitamos en la habitación (secador de pelo, sombrilla, toallas extras).",
        de: "Das Zimmer war geräumig und das Bett sehr bequem. Im gemeinsamen Innenhof war viel Platz zum Sitzen und Spazieren. Umgeben von Natur. Sie haben uns alles Nötige im Zimmer bereitgestellt (Haartrockner, Sonnenschirm, extra Handtücher).",
      },
    },
  ],
};

const config: ClientConfig = {
  id: "finca-caballo-blanco",
  brandName: "Finca Caballo Blanco",
  brandLogoUrl: "/logo-finca-caballo-blanco.png",
  backgroundImageUrl: "/cabalgata.jpg",
  transparentNav: true,
  heroToursCount: 4,

  hero: {
    tagline: {
      it: "Scopri uno spazio dove il tempo si ferma tra cavalli e paesaggi mediterranei",
      en: "Discover a space where time stands still among horses and Mediterranean landscapes",
      es: "Descubrí un espacio donde el tiempo se detiene entre caballos y paisajes mediterráneos",
      de: "Entdecke einen Ort, wo die Zeit zwischen Pferden und mediterranen Landschaften stillsteht",
    },
    ctaLabel: {
      it: "Prenota",
      en: "Book",
      es: "Reservar",
      de: "Buchen",
    },
    ctaSingle: {
      url: "https://www.booking.com/hotel/es/finca-caballo-blanco.html",
    },
    guestFilter: true,
  },

  properties: [
    {
      id: "habitacion-1",
      guests: 2,
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7TpZS?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Illes+Balears&hl=es&z=15&output=embed",

      hero: {
        title: {
          it: "Appartamento degli Ulivi",
          en: "Olivares Apartment",
          es: "Departamento Olivares",
          de: "Olivenhain-Apartment",
        },
        subtitle: {
          it: "Cavalli, piscina e natura nel cuore di Maiorca",
          en: "Horses, pool and nature in the heart of Mallorca",
          es: "Caballos, piscina y naturaleza en el corazón de Mallorca",
          de: "Pferde, Pool und Natur im Herzen Mallorcas",
        },
      },

      description: {
        title: {
          it: "La Finca",
          en: "The Finca",
          es: "La Finca",
          de: "Die Finca",
        },
        body: {
          it: "Finca Caballo Blanco è un autentico agriturismo nel cuore di Maiorca, circondato da natura, ulivi e cavalli al pascolo. Goditi la piscina, i giardini e la tranquillità della campagna maiorchina lontano dal caos della città. Un'esperienza unica per chi cerca pace, contatto con gli animali e la bellezza dell'isola.",
          en: "Finca Caballo Blanco is an authentic rural retreat in the heart of Mallorca, surrounded by nature, olive trees and free-roaming horses. Enjoy the pool, the gardens and the tranquility of the Mallorcan countryside far from city noise. A unique experience for those seeking peace, connection with animals and the beauty of the island.",
          es: "Finca Caballo Blanco es un retiro rural auténtico en el corazón de Mallorca, rodeado de naturaleza, olivos y caballos en libertad. Disfrutá de la piscina, los jardines y la tranquilidad del campo mallorquín lejos del ruido de la ciudad. Una experiencia única para quienes buscan paz, contacto con animales y la belleza de la isla.",
          de: "Finca Caballo Blanco ist ein authentisches Landgut im Herzen Mallorcas, umgeben von Natur, Olivenbäumen und frei laufenden Pferden. Genießen Sie den Pool, die Gärten und die Ruhe der mallorquinischen Landschaft, fern vom Stadtlärm. Ein einzigartiges Erlebnis für alle, die Frieden, Tierkontakt und die Schönheit der Insel suchen.",
        },
        amenityKeys: ["wifi", "fridge", "kitchen", "bathroom"],
      },

      location: sharedLocation,

      reviews: sharedReviews,

      cta: {
        title: {
          it: "Pronto per la tua fuga a Maiorca?",
          en: "Ready for your Mallorca escape?",
          es: "¿Listo para tu escapada a Mallorca?",
          de: "Bereit für Ihre Mallorca-Auszeit?",
        },
        subtitle: {
          it: "Prenota il tuo soggiorno a Finca Caballo Blanco e vivi la campagna maiorchina circondata da cavalli e natura.",
          en: "Book your stay at Finca Caballo Blanco and experience the Mallorcan countryside surrounded by horses and nature.",
          es: "Reservá tu estadía en Finca Caballo Blanco y viví el campo mallorquín rodeado de caballos y naturaleza.",
          de: "Buchen Sie Ihren Aufenthalt in der Finca Caballo Blanco und erleben Sie die mallorquinische Landschaft umgeben von Pferden und Natur.",
        },
      },

      footerTagline: {
        it: "Un'esperienza autentica nella campagna di Maiorca",
        en: "An authentic experience in the Mallorcan countryside",
        es: "Una experiencia auténtica en el campo mallorquín",
        de: "Ein authentisches Erlebnis auf dem Land Mallorcas",
      },
    },
    {
      id: "suite-jardin",
      guests: 3,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Illes+Balears&hl=es&z=15&output=embed",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=960&q=80",
      hero: {
        title: {
          it: "Suite del Giardino",
          en: "Garden Suite",
          es: "Suite del Jardín",
          de: "Gartensuite",
        },
        subtitle: {
          it: "Piscina privata e giardino con ulivi",
          en: "Private pool and olive tree garden",
          es: "Piscina privada y jardín de olivos",
          de: "Privater Pool und Olivengarten",
        },
      },
      location: sharedLocation,
      reviews: sharedReviews,
    },
    {
      id: "habitacion-patio",
      guests: 4,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Illes+Balears&hl=es&z=15&output=embed",
      imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=960&q=80",
      hero: {
        title: {
          it: "Habitación del Patio",
          en: "Patio Room",
          es: "Habitación del Patio",
          de: "Patio-Zimmer",
        },
        subtitle: {
          it: "Patio autentico con vista sulle montagne",
          en: "Authentic patio with mountain views",
          es: "Patio auténtico con vistas a la montaña",
          de: "Authentischer Patio mit Bergblick",
        },
      },
      location: sharedLocation,
      reviews: sharedReviews,
    },
    {
      id: "villa-completa",
      guests: 6,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Illes+Balears&hl=es&z=15&output=embed",
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=960&q=80",
      hero: {
        title: {
          it: "Villa Completa",
          en: "Full Villa",
          es: "Villa Completa",
          de: "Komplette Villa",
        },
        subtitle: {
          it: "Tutta la finca per il tuo gruppo",
          en: "The entire finca for your group",
          es: "Toda la finca para tu grupo",
          de: "Die gesamte Finca für Ihre Gruppe",
        },
      },
      location: sharedLocation,
      reviews: sharedReviews,
    },
  ],
};

export default config;
