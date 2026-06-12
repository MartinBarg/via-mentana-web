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
      it: "Scopri uno spazio dove il tempo si ferma",
      en: "Discover a space where time stands still",
      es: "Descubrí un espacio donde el tiempo se detiene",
      de: "Entdecke einen Ort, wo die Zeit stillsteht",
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
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Balearic+Islands&hl=es&z=15&output=embed",

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
          it: "Appartamento degli Ulivi",
          en: "Olivares Apartment",
          es: "Departamento Olivares",
          de: "Olivenhain-Apartment",
        },
        body: {
          it: "Un nido intimo per due, con pareti in pietra calcarea e travi a vista che portano con sé secoli di storia mallorchina. La luce entra morbida dalla finestra con vista sugli ulivi. Tutto qui parla di semplicità e cura: lenzuola di lino bianco, pavimenti di terracotta, silenzio. Ideale per una fuga in coppia in piena natura.",
          en: "An intimate nest for two, with limestone walls and exposed wooden beams that carry centuries of Mallorcan history. Light filters softly through the window overlooking the olive trees. Everything speaks of simplicity and care: white linen sheets, terracotta floors, silence. Ideal for a couples' escape in the heart of nature.",
          es: "Un nido íntimo para dos, con paredes de piedra caliza y vigas de madera a la vista que llevan siglos de historia mallorquina. La luz entra suave por la ventana con vista a los olivos. Todo habla de simplicidad y cuidado: sábanas de lino blanco, pisos de terracota, silencio. Ideal para una escapada en pareja en plena naturaleza.",
          de: "Ein intimes Nest für zwei, mit Kalksteinwänden und sichtbaren Holzbalken, die Jahrhunderte mallorquinischer Geschichte tragen. Das Licht fällt sanft durch das Fenster mit Blick auf die Olivenbäume. Alles spricht von Einfachheit und Sorgfalt: weiße Leinenbettwäsche, Terrakottaböden, Stille. Ideal für einen Paarurlaub inmitten der Natur.",
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
      imageUrl: "https://images.unsplash.com/photo-1691357249360-8dfa92dda58d?w=960&q=80",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Balearic+Islands&hl=es&z=15&output=embed",
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
      description: {
        title: {
          it: "Suite del Giardino",
          en: "Garden Suite",
          es: "Suite del Jardín",
          de: "Gartensuite",
        },
        body: {
          it: "La suite più luminosa della finca, con accesso diretto al giardino degli ulivi e alla piscina. Perfetta per chi vuole svegliarsi con il profumo del Mediterraneo e fare il bagno mattutino tra i silenzi della campagna. Tre posti letto, una terrazza con tavolo in pietra e l'ombra degli ulivi centenari.",
          en: "The brightest suite on the finca, with direct access to the olive garden and pool. Perfect for those who want to wake up to the scent of the Mediterranean and take a morning swim in the silence of the countryside. Three beds, a stone terrace and the shade of centuries-old olive trees.",
          es: "La suite más luminosa de la finca, con acceso directo al jardín de olivos y a la piscina. Perfecta para quienes quieren despertarse con el aroma del Mediterráneo y darse un baño mañanero entre los silencios del campo. Tres camas, una terraza con mesa de piedra y la sombra de los olivos centenarios.",
          de: "Die hellste Suite der Finca, mit direktem Zugang zum Olivengarten und Pool. Perfekt für alle, die mit dem Duft des Mittelmeers aufwachen und am Morgen im Schweigen des Landes schwimmen möchten. Drei Betten, eine Steinteasse und der Schatten jahrhundertealter Olivenbäume.",
        },
        amenityKeys: ["wifi", "fridge", "bathroom"],
      },
      location: sharedLocation,
      reviews: sharedReviews,
    },
    {
      id: "habitacion-patio",
      guests: 4,
      imageUrl: "https://images.unsplash.com/photo-1631724953362-965648cc302c?w=960&q=80",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Balearic+Islands&hl=es&z=15&output=embed",
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
      description: {
        title: {
          it: "Habitación del Patio",
          en: "Patio Room",
          es: "Habitación del Patio",
          de: "Patio-Zimmer",
        },
        body: {
          it: "Quattro posti letto distribuiti in un ambiente autentico con accesso diretto al patio in pietra della finca. Le mattine qui iniziano con colazione all'aperto mentre le montagne di Maiorca si stagliano all'orizzonte e i cavalli pascolano liberi nei campi. La stanza ideale per famiglie o piccoli gruppi che vogliono vivere la finca nella sua dimensione più vera.",
          en: "Four beds in an authentic room with direct access to the finca's stone patio. Mornings here start with breakfast outdoors while the Mallorcan mountains rise on the horizon and horses roam free in the fields. The ideal room for families or small groups who want to experience the finca at its most authentic.",
          es: "Cuatro camas en un ambiente auténtico con acceso directo al patio de piedra de la finca. Las mañanas empiezan con desayuno al aire libre mientras las montañas de Mallorca se recortan en el horizonte y los caballos pastan en libertad. La habitación ideal para familias o grupos pequeños que quieren vivir la finca en su dimensión más real.",
          de: "Vier Betten in einem authentischen Ambiente mit direktem Zugang zum Steinpatio der Finca. Die Morgen beginnen hier mit Frühstück im Freien, während die mallorquinischen Berge am Horizont aufsteigen und Pferde frei auf den Feldern grasen. Das ideale Zimmer für Familien oder kleine Gruppen, die die Finca in ihrer echtesten Form erleben wollen.",
        },
        amenityKeys: ["wifi", "fridge", "bathroom"],
      },
      location: sharedLocation,
      reviews: sharedReviews,
    },
    {
      id: "villa-completa",
      guests: 6,
      imageUrl: "https://images.unsplash.com/photo-1681038246005-b300835f0282?w=960&q=80",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Diseminado+Sector%2C+Num+2%2C+07230+Montu%C3%AFri%2C+Balearic+Islands&hl=es&z=15&output=embed",
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
      description: {
        title: {
          it: "Villa Completa",
          en: "Full Villa",
          es: "Villa Completa",
          de: "Komplette Villa",
        },
        body: {
          it: "Tutta la finca è vostra. Sei posti letto, piscina, patio, giardino degli ulivi, e i cavalli come vicini di casa. La scelta perfetta per gruppi di amici o famiglie allargate che vogliono vivere Maiorca in totale privacy, senza dividere spazi con nessuno. Notti stellate, barbecue al tramonto e la campagna mallorchina tutta per voi.",
          en: "The entire finca is yours. Six beds, pool, patio, olive garden, and horses as neighbours. The perfect choice for groups of friends or extended families who want to experience Mallorca in total privacy, without sharing spaces with anyone. Starry nights, barbecues at sunset and the Mallorcan countryside all to yourselves.",
          es: "Toda la finca es tuya. Seis camas, piscina, patio, jardín de olivos, y los caballos como vecinos. La elección perfecta para grupos de amigos o familias numerosas que quieren vivir Mallorca en total privacidad, sin compartir espacios con nadie. Noches estrelladas, asados al atardecer y el campo mallorquín todo para ustedes.",
          de: "Die gesamte Finca gehört euch. Sechs Betten, Pool, Patio, Olivengarten und Pferde als Nachbarn. Die perfekte Wahl für Freundesgruppen oder große Familien, die Mallorca in völliger Privatsphäre erleben wollen, ohne Räume mit anderen zu teilen. Sternennächte, Grillabende bei Sonnenuntergang und die mallorquinische Landschaft ganz für euch.",
        },
        amenityKeys: ["wifi", "fridge", "kitchen", "bathroom"],
      },
      location: sharedLocation,
      reviews: sharedReviews,
    },
  ],
};

export default config;
