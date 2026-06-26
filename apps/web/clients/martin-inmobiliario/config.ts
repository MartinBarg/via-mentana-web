import type { ClientConfig } from "../../lib/types/client";

const config: ClientConfig = {
  id: "martin-inmobiliario",
  brandName: "Martin Inmobiliario",
  backgroundPersonImageUrl: "/martin-inmobiliario/hombre-traje.jpg",
  transparentNav: true,
  theme: {
    accent: "#1040CC",
    accentDark: "#0A30B0",
  },
  heroToursCount: 8,

  aboutUs: {
    title: {
      it: "Chi Siamo",
      en: "About Us",
      es: "Quiénes Somos",
      de: "Über Uns",
    },
    body: {
      it: "Martin Inmobiliario è un'azienda boutique di real estate con sede a Buenos Aires. Siamo specializzati in proprietà residenziali di alto livello nei quartieri più esclusivi della città e del Gran Buenos Aires. Il nostro team di consulenti accompagna ogni fase del processo di acquisto, vendita o locazione con attenzione personalizzata e profonda conoscenza del mercato locale.",
      en: "Martin Inmobiliario is a boutique real estate company based in Buenos Aires. We specialize in high-end residential properties in the most exclusive neighborhoods of the city and Greater Buenos Aires. Our team of advisors guides you through every step of the buying, selling, or rental process with personalized attention and deep knowledge of the local market.",
      es: "Martin Inmobiliario es una empresa boutique de bienes raíces con sede en Buenos Aires. Nos especializamos en propiedades residenciales de alto estándar en los barrios más exclusivos de la ciudad y el Gran Buenos Aires. Nuestro equipo de asesores acompaña cada etapa del proceso de compra, venta o alquiler con atención personalizada y profundo conocimiento del mercado local.",
      de: "Martin Inmobiliario ist ein Boutique-Immobilienunternehmen mit Sitz in Buenos Aires. Wir sind auf hochwertige Wohnimmobilien in den exklusivsten Vierteln der Stadt und Groß-Buenos Aires spezialisiert. Unser Beraterteam begleitet Sie durch jeden Schritt des Kauf-, Verkaufs- oder Mietprozesses mit persönlicher Betreuung und tiefem Wissen über den lokalen Markt.",
    },
  },

  hero: {
    tagline: {
      it: "Proprietà di prestigio a Buenos Aires",
      en: "Prestige properties in Buenos Aires",
      es: "Propiedades de prestigio en Buenos Aires",
      de: "Prestige-Immobilien in Buenos Aires",
    },
    ctaLabel: {
      it: "Contattaci",
      en: "Contact us",
      es: "Contactanos",
      de: "Kontakt",
    },
    realEstateFilters: true,
    disableScrollHijack: true,
    zones: [
      { id: "palermo", label: { es: "Palermo", en: "Palermo", it: "Palermo", de: "Palermo" } },
      { id: "belgrano", label: { es: "Belgrano / Núñez", en: "Belgrano / Núñez", it: "Belgrano / Núñez", de: "Belgrano / Núñez" } },
      { id: "vicente-lopez", label: { es: "Vicente López", en: "Vicente López", it: "Vicente López", de: "Vicente López" } },
      { id: "san-isidro", label: { es: "San Isidro", en: "San Isidro", it: "San Isidro", de: "San Isidro" } },
      { id: "nordelta", label: { es: "Nordelta", en: "Nordelta", it: "Nordelta", de: "Nordelta" } },
      { id: "pilar", label: { es: "Pilar", en: "Pilar", it: "Pilar", de: "Pilar" } },
      { id: "tigre", label: { es: "Tigre", en: "Tigre", it: "Tigre", de: "Tigre" } },
    ],
  },

  reviews: {
    title: {
      it: "Referenze",
      en: "References",
      es: "Referencias",
      de: "Referenzen",
    },
    items: [
      {
        id: "ref-1",
        author: "Gabriela M.",
        country: "Buenos Aires",
        comment: {
          es: "Desde el primer contacto, Martín nos transmitió confianza total. Sabíamos que estábamos en manos de alguien serio y que realmente conoce el mercado.",
          en: "From the very first contact, Martín gave us complete confidence. We knew we were in the hands of someone serious who truly knows the market.",
          it: "Dal primo contatto, Martín ci ha trasmesso una fiducia totale. Sapevamo di essere nelle mani di qualcuno di serio che conosce davvero il mercato.",
          de: "Vom ersten Kontakt an gab uns Martín volles Vertrauen. Wir wussten, dass wir in den Händen von jemandem waren, der den Markt wirklich kennt.",
        },
      },
      {
        id: "ref-2",
        author: "Federico R.",
        country: "Buenos Aires",
        comment: {
          es: "Compramos en un momento complicado y Martín resolvió cada obstáculo que surgió. Tuvo una respuesta concreta para todo, nunca nos dejó solos en el proceso.",
          en: "We bought during a complicated period and Martín solved every obstacle that came up. He had a concrete answer for everything and never left us alone in the process.",
          it: "Abbiamo comprato in un momento complicato e Martín ha risolto ogni ostacolo che si presentava. Ha avuto una risposta concreta per tutto e non ci ha mai lasciato soli nel processo.",
          de: "Wir kauften in einer schwierigen Zeit und Martín löste jedes auftauchende Hindernis. Er hatte für alles eine konkrete Antwort und ließ uns im Prozess nie allein.",
        },
      },
      {
        id: "ref-3",
        author: "Valeria & Tomás",
        country: "Buenos Aires",
        comment: {
          es: "El trato fue impecable. Nunca nos sentimos presionados ni apurados. Martín escuchó lo que necesitábamos y trabajó en función de eso.",
          en: "The treatment was impeccable. We never felt pressured or rushed. Martín listened to what we needed and worked accordingly.",
          it: "Il trattamento è stato impeccabile. Non ci siamo mai sentiti sotto pressione o di fretta. Martín ha ascoltato ciò di cui avevamo bisogno e ha lavorato di conseguenza.",
          de: "Die Behandlung war makellos. Wir fühlten uns nie unter Druck gesetzt oder gehetzt. Martín hörte zu, was wir brauchten, und arbeitete entsprechend.",
        },
      },
      {
        id: "ref-4",
        author: "Ignacio P.",
        country: "Gran Buenos Aires",
        comment: {
          es: "Nos asesoró sobre zonas, precios y timing con una claridad que no encontramos en ningún otro lado. Su conocimiento del mercado es genuino y lo demuestra en cada conversación.",
          en: "He advised us on neighborhoods, prices, and timing with a clarity we didn't find anywhere else. His market knowledge is genuine and shows in every conversation.",
          it: "Ci ha consigliato su zone, prezzi e tempi con una chiarezza che non abbiamo trovato da nessun'altra parte. La sua conoscenza del mercato è genuina e lo dimostra in ogni conversazione.",
          de: "Er beriet uns zu Gegenden, Preisen und Timing mit einer Klarheit, die wir nirgendwo sonst fanden. Sein Marktwissen ist echt und zeigt sich in jedem Gespräch.",
        },
      },
      {
        id: "ref-5",
        author: "Carolina B.",
        country: "Buenos Aires",
        comment: {
          es: "Alquilamos a través de Martín y se encargó de absolutamente todo. La burocracia, los papeles, las consultas del propietario. Nosotros solo teníamos que tomar decisiones.",
          en: "We rented through Martín and he handled absolutely everything. The paperwork, the bureaucracy, the landlord's questions. We only had to make decisions.",
          it: "Abbiamo affittato tramite Martín e lui si è occupato di assolutamente tutto. La burocrazia, i documenti, le domande del proprietario. Noi dovevamo solo prendere decisioni.",
          de: "Wir mieteten über Martín und er kümmerte sich um absolut alles. Den Papierkram, die Bürokratie, die Fragen des Vermieters. Wir mussten nur Entscheidungen treffen.",
        },
      },
      {
        id: "ref-6",
        author: "Pablo L.",
        country: "Gran Buenos Aires",
        comment: {
          es: "La compra de nuestra casa fue compleja, con varios pasos que no entendíamos. Martín los explicó con paciencia y nos ayudó a tomar cada decisión con información real.",
          en: "Buying our house was complex, with several steps we didn't understand. Martín explained them patiently and helped us make each decision with real information.",
          it: "L'acquisto della nostra casa è stato complesso, con diversi passaggi che non capivamo. Martín li ha spiegati con pazienza e ci ha aiutato a prendere ogni decisione con informazioni reali.",
          de: "Der Kauf unseres Hauses war komplex, mit mehreren Schritten, die wir nicht verstanden. Martín erklärte sie geduldig und half uns, jede Entscheidung mit echten Informationen zu treffen.",
        },
      },
    ],
  },

  properties: [
    // ─── 1. Le Parc ───────────────────────────────────────────────────────────
    {
      id: "le-parc",
      zone: "palermo",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 2500, currency: "USD" }, { amount: 2500000, currency: "ARS" }],
      salePrice: [{ amount: 280000, currency: "USD" }, { amount: 280000000, currency: "ARS" }],
      ambientes: 3,
      m2: 110,
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7Tmvp?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Le+Parc+Av+Figueroa+Alcorta+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Le Parc · Figueroa Alcorta",
          en: "Le Parc · Figueroa Alcorta",
          es: "Le Parc · Figueroa Alcorta",
          de: "Le Parc · Figueroa Alcorta",
        },
        subtitle: {
          it: "Appartamento luminoso di fronte al parco con amenities di primo livello",
          en: "Bright apartment facing the park with top-tier amenities",
          es: "Luminoso departamento frente al parque con amenities de primer nivel",
          de: "Helle Wohnung mit Parkblick und erstklassigen Annehmlichkeiten",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Le%20Parc%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Eleganza sul parco",
          en: "Elegance by the park",
          es: "Elegancia sobre el parque",
          de: "Eleganz am Park",
        },
        body: {
          it: "Unità elegante nell'esclusivo edificio Le Parc, su Av. Figueroa Alcorta. Viste panoramiche sul parco, finiture di alta gamma e spazi di design. Amenities: piscina, palestra, SUM e posto auto.",
          en: "Elegant unit in the exclusive Le Parc building on Av. Figueroa Alcorta. Panoramic park views, high-end finishes, and designer spaces. Amenities include pool, gym, common room, and parking.",
          es: "Elegante unidad en el exclusivo edificio Le Parc, sobre Av. Figueroa Alcorta. Vistas panorámicas al parque, acabados de alta gama y espacios de diseño. Amenities: pool, gimnasio, SUM y cochera.",
          de: "Elegante Einheit im exklusiven Le Parc-Gebäude an der Av. Figueroa Alcorta. Panoramablick auf den Park, hochwertige Ausstattung und Designräume. Ausstattung: Pool, Fitnessstudio, Gemeinschaftsraum und Parkplatz.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: {
          it: "La Posizione",
          en: "Location",
          es: "Ubicación",
          de: "Lage",
        },
        subtitle: {
          it: "Palermo · Recoleta",
          en: "Palermo · Recoleta",
          es: "Palermo · Recoleta",
          de: "Palermo · Recoleta",
        },
        description: {
          it: "Situato nel corridoio verde tra Palermo e Recoleta, a pochi passi dai migliori ristoranti, musei e spazi culturali di Buenos Aires.",
          en: "Located in the green corridor between Palermo and Recoleta, steps from the best restaurants, museums, and cultural spaces in Buenos Aires.",
          es: "Ubicado en el corredor verde entre Palermo y Recoleta, a pasos de los mejores restaurantes, museos y espacios culturales de Buenos Aires.",
          de: "Im grünen Korridor zwischen Palermo und Recoleta gelegen, nur wenige Schritte von den besten Restaurants, Museen und Kulturräumen von Buenos Aires entfernt.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Don Julio", en: "Don Julio", es: "Don Julio", de: "Don Julio" }, distance: "800" },
              { name: { it: "El Preferido", en: "El Preferido", es: "El Preferido", de: "El Preferido" }, distance: "1200" },
            ],
          },
          {
            key: "coffee",
            label: { it: "Caffè", en: "Coffee", es: "Cafés", de: "Cafés" },
            places: [
              { name: { it: "Café Biasatti", en: "Café Biasatti", es: "Café Biasatti", de: "Café Biasatti" }, distance: "350" },
            ],
          },
          {
            key: "metro",
            label: { it: "Metro", en: "Metro", es: "Subte", de: "U-Bahn" },
            places: [
              { name: { it: "Estación Scalabrini Ortiz (Línea D)", en: "Scalabrini Ortiz Station (Line D)", es: "Estación Scalabrini Ortiz (Línea D)", de: "Bahnhof Scalabrini Ortiz (Linie D)" }, distance: "600" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Le Parc?",
          en: "Interested in Le Parc?",
          es: "¿Te interesa Le Parc?",
          de: "Interesse an Le Parc?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Le Parc · Figueroa Alcorta",
        en: "Le Parc · Figueroa Alcorta",
        es: "Le Parc · Figueroa Alcorta",
        de: "Le Parc · Figueroa Alcorta",
      },
    },

    // ─── 2. Chateaux ──────────────────────────────────────────────────────────
    {
      id: "chateaux",
      zone: "belgrano",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 2100, currency: "USD" }, { amount: 2100000, currency: "ARS" }],
      salePrice: [{ amount: 240000, currency: "USD" }, { amount: 240000000, currency: "ARS" }],
      ambientes: 2,
      m2: 85,
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7MBmV?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Chateaux+Av+Libertador+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Chateaux · Av. Libertador",
          en: "Chateaux · Av. Libertador",
          es: "Chateaux · Av. Libertador",
          de: "Chateaux · Av. Libertador",
        },
        subtitle: {
          it: "Classico ed elegante sulla migliore avenue di Buenos Aires",
          en: "Classic and elegant on the finest avenue in Buenos Aires",
          es: "Clásico y elegante sobre la mejor avenida de Buenos Aires",
          de: "Klassisch und elegant an der besten Avenue von Buenos Aires",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Chateaux%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Raffinatezza su Libertador",
          en: "Refinement on Libertador",
          es: "Refinamiento sobre Libertador",
          de: "Raffinesse am Libertador",
        },
        body: {
          it: "Unità di alto profilo nell'iconico edificio Chateaux, su Av. del Libertador. Interni classici con materiali nobili, luminosità eccellente e viste privilegiate. Edificio con porteria 24 ore, piscina e ampi spazi comuni.",
          en: "High-profile unit in the iconic Chateaux building on Av. del Libertador. Classic interiors with premium materials, excellent natural light, and privileged views. Building features 24-hour concierge, pool, and expansive common areas.",
          es: "Unidad de alto perfil en el icónico edificio Chateaux, sobre Av. del Libertador. Interiores clásicos con materiales nobles, excelente luminosidad y vistas privilegiadas. Edificio con portería 24 h, piscina y amplios espacios comunes.",
          de: "Hochkarätiges Objekt im ikonischen Chateaux-Gebäude an der Av. del Libertador. Klassische Innenräume mit edlen Materialien, ausgezeichnetem Lichteinfall und bevorzugten Ausblicken. Gebäude mit 24-h-Pforte, Pool und großzügigen Gemeinschaftsbereichen.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "Belgrano · Núñez",
          en: "Belgrano · Núñez",
          es: "Belgrano · Núñez",
          de: "Belgrano · Núñez",
        },
        description: {
          it: "Nell'elegante corridoio di Av. Libertador, con accesso diretto ai migliori clubes, ristoranti gastronomici e uscite verso il nord della città.",
          en: "On the elegant Av. Libertador corridor, with direct access to the finest clubs, gourmet restaurants, and northern exits of the city.",
          es: "En el elegante corredor de Av. Libertador, con acceso directo a los mejores clubes, restaurantes gastronómicos y salidas hacia el norte de la ciudad.",
          de: "Im eleganten Korridor der Av. Libertador, mit direktem Zugang zu den besten Clubs, Gourmetrestaurants und Ausfahrten in den Norden der Stadt.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Tegui", en: "Tegui", es: "Tegui", de: "Tegui" }, distance: "700" },
              { name: { it: "La Bourgogne", en: "La Bourgogne", es: "La Bourgogne", de: "La Bourgogne" }, distance: "1500" },
            ],
          },
          {
            key: "bus",
            label: { it: "Bus", en: "Bus", es: "Colectivo", de: "Bus" },
            places: [
              { name: { it: "Linea 67 · Libertador", en: "Line 67 · Libertador", es: "Línea 67 · Libertador", de: "Linie 67 · Libertador" }, distance: "100" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Chateaux?",
          en: "Interested in Chateaux?",
          es: "¿Te interesa Chateaux?",
          de: "Interesse an Chateaux?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Chateaux · Av. Libertador",
        en: "Chateaux · Av. Libertador",
        es: "Chateaux · Av. Libertador",
        de: "Chateaux · Av. Libertador",
      },
    },

    // ─── 3. Alrio ─────────────────────────────────────────────────────────────
    {
      id: "alrio",
      zone: "vicente-lopez",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 3200, currency: "USD" }, { amount: 3200000, currency: "ARS" }],
      salePrice: [{ amount: 380000, currency: "USD" }, { amount: 380000000, currency: "ARS" }],
      ambientes: 4,
      m2: 145,
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7TpZS?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Alrio+Vicente+Lopez+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Alrio · Vicente López",
          en: "Alrio · Vicente López",
          es: "Alrio · Vicente López",
          de: "Alrio · Vicente López",
        },
        subtitle: {
          it: "Residenza di categoria nel corridoio nord più quotato",
          en: "Premium residence in the most sought-after northern corridor",
          es: "Residencia de categoría en el corredor norte más cotizado",
          de: "Erstklassige Residenz im gefragtesten Nordkorridor",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Alrio%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Vivere a Vicente López",
          en: "Living in Vicente López",
          es: "Vivir en Vicente López",
          de: "Leben in Vicente López",
        },
        body: {
          it: "Il residenziale Alrio offre unità spaziose con finiture di qualità superiore nel cuore di Vicente López. Accesso rapido a Capital Federal e all'aeroporto internazionale, con la tranquillità e il verde del nord del GBA.",
          en: "Residencial Alrio offers spacious units with superior-quality finishes in the heart of Vicente López. Quick access to Capital Federal and the international airport, with the calm and greenery of northern GBA.",
          es: "Residencial Alrio ofrece unidades espaciosas con terminaciones de calidad superior en el corazón de Vicente López. Acceso rápido a Capital Federal y al aeropuerto internacional, con la tranquilidad y el verde del norte del GBA.",
          de: "Residencial Alrio bietet geräumige Einheiten mit hochwertiger Ausstattung im Herzen von Vicente López. Schneller Zugang zur Capital Federal und zum internationalen Flughafen, mit der Ruhe und dem Grün des nördlichen GBA.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "Vicente López · GBA Norte",
          en: "Vicente López · GBA Norte",
          es: "Vicente López · GBA Norte",
          de: "Vicente López · GBA Norte",
        },
        description: {
          it: "Vicente López è uno dei partiti più rinomati del Gran Buenos Aires, con ottima infrastruttura, scuole di alto livello e una vivace vita commerciale e gastronomica.",
          en: "Vicente López is one of the most prestigious districts of Greater Buenos Aires, with excellent infrastructure, top schools, and a vibrant commercial and gastronomic scene.",
          es: "Vicente López es uno de los partidos más reconocidos del Gran Buenos Aires, con excelente infraestructura, colegios de alto nivel y una animada vida comercial y gastronómica.",
          de: "Vicente López ist eines der renommiertesten Bezirke Groß-Buenos Aires, mit ausgezeichneter Infrastruktur, erstklassigen Schulen und einem lebhaften kommerziellen und gastronomischen Leben.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "La Parolaccia", en: "La Parolaccia", es: "La Parolaccia", de: "La Parolaccia" }, distance: "500" },
            ],
          },
          {
            key: "bus",
            label: { it: "Bus", en: "Bus", es: "Colectivo", de: "Bus" },
            places: [
              { name: { it: "Ramale Mitre · Estación Vicente López", en: "Mitre Line · Vicente López Station", es: "Ramal Mitre · Estación Vicente López", de: "Mitre-Linie · Bahnhof Vicente López" }, distance: "400" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Alrio?",
          en: "Interested in Alrio?",
          es: "¿Te interesa Alrio?",
          de: "Interesse an Alrio?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Alrio · Vicente López",
        en: "Alrio · Vicente López",
        es: "Alrio · Vicente López",
        de: "Alrio · Vicente López",
      },
    },

    // ─── 4. Casa4 ─────────────────────────────────────────────────────────────
    {
      id: "casa4",
      zone: "san-isidro",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 3500, currency: "USD" }, { amount: 3500000, currency: "ARS" }],
      salePrice: [{ amount: 520000, currency: "USD" }, { amount: 520000000, currency: "ARS" }],
      ambientes: 5,
      m2: 200,
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7TNK4?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=San+Isidro+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Casa4 · San Isidro",
          en: "Casa4 · San Isidro",
          es: "Casa4 · San Isidro",
          de: "Casa4 · San Isidro",
        },
        subtitle: {
          it: "Vita nel quartiere storico con giardino e spazi all'aria aperta",
          en: "Life in the historic neighborhood with garden and outdoor spaces",
          es: "Vida en el barrio histórico con jardín y espacios al aire libre",
          de: "Leben im historischen Viertel mit Garten und Außenbereichen",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Casa4%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "San Isidro: charme e natura",
          en: "San Isidro: charm and nature",
          es: "San Isidro: encanto y naturaleza",
          de: "San Isidro: Charme und Natur",
        },
        body: {
          it: "Casa4 propone un'abitazione con carattere nel cuore di San Isidro, uno dei quartieri più ambiti del nord del GBA. Giardino privato, espacios generosos e finiture cuidadas. A minutos del centro histórico e del río.",
          en: "Casa4 offers a characterful home in the heart of San Isidro, one of the most sought-after neighborhoods in northern GBA. Private garden, generous spaces, and careful finishes. Minutes from the historic center and the river.",
          es: "Casa4 propone una vivienda con carácter en el corazón de San Isidro, uno de los barrios más buscados del norte del GBA. Jardín privado, espacios generosos y terminaciones cuidadas. A minutos del centro histórico y del río.",
          de: "Casa4 bietet ein charaktervolles Zuhause im Herzen von San Isidro, einem der begehrtesten Viertel im Norden des GBA. Privatgarten, großzügige Räume und sorgfältige Ausstattung. Minuten vom historischen Zentrum und dem Fluss entfernt.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "San Isidro · GBA Norte",
          en: "San Isidro · GBA Norte",
          es: "San Isidro · GBA Norte",
          de: "San Isidro · GBA Norte",
        },
        description: {
          it: "San Isidro combina la tranquillità di un quartiere residenziale con la vicinanza al fiume, al centro storico e alle migliori scuole e università della zona nord.",
          en: "San Isidro combines the calm of a residential neighborhood with proximity to the river, the historic center, and the best schools and universities in the northern zone.",
          es: "San Isidro combina la tranquilidad de un barrio residencial con la cercanía al río, el centro histórico y los mejores colegios y universidades de la zona norte.",
          de: "San Isidro verbindet die Ruhe eines Wohnviertels mit der Nähe zum Fluss, dem historischen Zentrum und den besten Schulen und Universitäten der Nordzone.",
        },
        categories: [
          {
            key: "coffee",
            label: { it: "Caffè", en: "Coffee", es: "Cafés", de: "Cafés" },
            places: [
              { name: { it: "El Federal San Isidro", en: "El Federal San Isidro", es: "El Federal San Isidro", de: "El Federal San Isidro" }, distance: "300" },
            ],
          },
          {
            key: "bus",
            label: { it: "Treno", en: "Train", es: "Tren", de: "Zug" },
            places: [
              { name: { it: "Estazione San Isidro · Ramal Tigre", en: "San Isidro Station · Tigre Branch", es: "Estación San Isidro · Ramal Tigre", de: "Bahnhof San Isidro · Tigre-Zweig" }, distance: "500" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Casa4?",
          en: "Interested in Casa4?",
          es: "¿Te interesa Casa4?",
          de: "Interesse an Casa4?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Casa4 · San Isidro",
        en: "Casa4 · San Isidro",
        es: "Casa4 · San Isidro",
        de: "Casa4 · San Isidro",
      },
    },

    // ─── 5. Casa5 ─────────────────────────────────────────────────────────────
    {
      id: "casa5",
      zone: "palermo",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 5500, currency: "USD" }, { amount: 5500000, currency: "ARS" }],
      salePrice: [{ amount: 650000, currency: "USD" }, { amount: 650000000, currency: "ARS" }],
      ambientes: 4,
      m2: 280,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Barrio+Parque+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Casa5 · Barrio Parque",
          en: "Casa5 · Barrio Parque",
          es: "Casa5 · Barrio Parque",
          de: "Casa5 · Barrio Parque",
        },
        subtitle: {
          it: "Esclusivo e arboreo nel cuore di Palermo",
          en: "Exclusive and tree-lined in the heart of Palermo",
          es: "Exclusivo y arbolado en el corazón de Palermo",
          de: "Exklusiv und baumbestanden im Herzen von Palermo",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Casa5%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Barrio Parque: esclusività e verde",
          en: "Barrio Parque: exclusivity and greenery",
          es: "Barrio Parque: exclusividad y verde",
          de: "Barrio Parque: Exklusivität und Grün",
        },
        body: {
          it: "Barrio Parque è uno dei settori più esclusivi e silenziosi di Palermo. Casa5 offre un'abitazione con accesso diretto al parque, rodeada de vegetación y con la privacy que un immobile di lusso richiede.",
          en: "Barrio Parque is one of the most exclusive and quiet sectors of Palermo. Casa5 offers a home with direct access to the park, surrounded by vegetation, and with the privacy a luxury property demands.",
          es: "Barrio Parque es uno de los sectores más exclusivos y silenciosos de Palermo. Casa5 ofrece una vivienda con acceso directo al parque, rodeada de vegetación y con la privacidad que una propiedad de lujo requiere.",
          de: "Barrio Parque ist einer der exklusivsten und ruhigsten Bereiche von Palermo. Casa5 bietet ein Zuhause mit direktem Parkzugang, umgeben von Vegetation und mit der Privatsphäre, die eine Luxusimmobilie erfordert.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "Barrio Parque · Palermo",
          en: "Barrio Parque · Palermo",
          es: "Barrio Parque · Palermo",
          de: "Barrio Parque · Palermo",
        },
        description: {
          it: "A pochi passi dai parques bosques e dalle migliori gastronomia di Palermo, con connessione rapida al centro via Av. Santa Fe.",
          en: "Steps from the Palermo parks and the best restaurants in the neighborhood, with quick access to downtown via Av. Santa Fe.",
          es: "A pasos de los bosques de Palermo y la mejor gastronomía del barrio, con conexión rápida al centro por Av. Santa Fe.",
          de: "Unweit der Palermo-Parks und der besten Restaurants des Viertels, mit schnellem Zugang zur Innenstadt über die Av. Santa Fe.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Gran Dabbang", en: "Gran Dabbang", es: "Gran Dabbang", de: "Gran Dabbang" }, distance: "600" },
            ],
          },
          {
            key: "metro",
            label: { it: "Subte", en: "Metro", es: "Subte", de: "U-Bahn" },
            places: [
              { name: { it: "Palermo (Línea D)", en: "Palermo (Line D)", es: "Palermo (Línea D)", de: "Palermo (Linie D)" }, distance: "700" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Casa5?",
          en: "Interested in Casa5?",
          es: "¿Te interesa Casa5?",
          de: "Interesse an Casa5?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Casa5 · Barrio Parque",
        en: "Casa5 · Barrio Parque",
        es: "Casa5 · Barrio Parque",
        de: "Casa5 · Barrio Parque",
      },
    },

    // ─── 6. Casa6 ─────────────────────────────────────────────────────────────
    {
      id: "casa6",
      zone: "nordelta",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 6500, currency: "USD" }, { amount: 6500000, currency: "ARS" }],
      salePrice: [{ amount: 850000, currency: "USD" }, { amount: 850000000, currency: "ARS" }],
      ambientes: 5,
      m2: 350,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Nordelta+Tigre+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Casa6 · Nordelta",
          en: "Casa6 · Nordelta",
          es: "Casa6 · Nordelta",
          de: "Casa6 · Nordelta",
        },
        subtitle: {
          it: "Vivere sull'acqua nel mega-sviluppo più ambito del Delta",
          en: "Living on the water in the most sought-after mega-development in the Delta",
          es: "Vida sobre el agua en el mega-desarrollo más buscado del Delta",
          de: "Leben am Wasser in der begehrtesten Mega-Entwicklung des Deltas",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Casa6%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Nordelta: la città sull'acqua",
          en: "Nordelta: the city on the water",
          es: "Nordelta: la ciudad sobre el agua",
          de: "Nordelta: die Stadt am Wasser",
        },
        body: {
          it: "Casa6 si trova nella rinomata Nordelta, il mega-sviluppo urban nel Delta del Paraná. Accesso a laghi artificiali, club nautico, colegios bilingüi, shopping y gastronomia. La vita privada con tutti i servizi urbani.",
          en: "Casa6 is located in the renowned Nordelta, the urban mega-development in the Paraná Delta. Access to artificial lakes, nautical club, bilingual schools, shopping, and dining. Private living with all urban services.",
          es: "Casa6 se encuentra en la reconocida Nordelta, el mega-desarrollo urbano en el Delta del Paraná. Acceso a lagos artificiales, club náutico, colegios bilingües, shopping y gastronomía. Vida privada con todos los servicios urbanos.",
          de: "Casa6 befindet sich im renommierten Nordelta, der urbanen Mega-Entwicklung im Paraná-Delta. Zugang zu Kunstseen, Nautikclub, zweisprachigen Schulen, Shopping und Gastronomie. Privates Leben mit allen städtischen Diensten.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "Nordelta · Tigre",
          en: "Nordelta · Tigre",
          es: "Nordelta · Tigre",
          de: "Nordelta · Tigre",
        },
        description: {
          it: "Nordelta si trova a 35 km da Capital Federal con accesso diretto per la Panamericana. Ambiente sicuro, naturaleza excepcional y la tranquillità del Delta a portata di mano.",
          en: "Nordelta is 35 km from Capital Federal with direct access via the Panamericana. Safe environment, exceptional nature, and the tranquility of the Delta at your fingertips.",
          es: "Nordelta se encuentra a 35 km de Capital Federal con acceso directo por la Panamericana. Ambiente seguro, naturaleza excepcional y la tranquilidad del Delta al alcance de la mano.",
          de: "Nordelta liegt 35 km von der Capital Federal entfernt mit direktem Zugang über die Panamericana. Sichere Umgebung, außergewöhnliche Natur und die Ruhe des Deltas zum Greifen nah.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Las Balsas Nordelta", en: "Las Balsas Nordelta", es: "Las Balsas Nordelta", de: "Las Balsas Nordelta" }, distance: "400" },
            ],
          },
          {
            key: "bus",
            label: { it: "Accesso", en: "Access", es: "Acceso", de: "Zugang" },
            places: [
              { name: { it: "Accesso Panamericana km 35", en: "Panamericana highway km 35", es: "Acceso Panamericana km 35", de: "Panamericana km 35" }, distance: "2000" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Casa6?",
          en: "Interested in Casa6?",
          es: "¿Te interesa Casa6?",
          de: "Interesse an Casa6?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Casa6 · Nordelta",
        en: "Casa6 · Nordelta",
        es: "Casa6 · Nordelta",
        de: "Casa6 · Nordelta",
      },
    },

    // ─── 7. Casa7 ─────────────────────────────────────────────────────────────
    {
      id: "casa7",
      zone: "pilar",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 4800, currency: "USD" }, { amount: 4800000, currency: "ARS" }],
      salePrice: [{ amount: 480000, currency: "USD" }, { amount: 480000000, currency: "ARS" }],
      ambientes: 5,
      m2: 260,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Pilar+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Casa7 · Pilar",
          en: "Casa7 · Pilar",
          es: "Casa7 · Pilar",
          de: "Casa7 · Pilar",
        },
        subtitle: {
          it: "Spazi e natura a 45 minuti dalla città",
          en: "Space and nature 45 minutes from the city",
          es: "Espacios y naturaleza a 45 minutos de la ciudad",
          de: "Raum und Natur, 45 Minuten von der Stadt entfernt",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Casa7%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Pilar: il polo nord per eccellenza",
          en: "Pilar: the premier northern hub",
          es: "Pilar: el polo norte por excelencia",
          de: "Pilar: der führende Nordpol",
        },
        body: {
          it: "Casa7 a Pilar offre una casa spaziosa in un barrio cerrado, con amplios jardines, acceso a clubhouse e una comunidad de alto nivel. Ideal para famiglie che cercano qualità di vita senza rinunciare all'accesso alla città.",
          en: "Casa7 in Pilar offers a spacious home in a gated community, with large gardens, clubhouse access, and a high-caliber community. Ideal for families seeking quality of life without giving up city access.",
          es: "Casa7 en Pilar ofrece una casa espaciosa en barrio cerrado, con amplios jardines, acceso a clubhouse y una comunidad de alto nivel. Ideal para familias que buscan calidad de vida sin renunciar al acceso a la ciudad.",
          de: "Casa7 in Pilar bietet ein geräumiges Haus in einer Wohnanlage, mit großen Gärten, Clubhaus-Zugang und einer anspruchsvollen Gemeinschaft. Ideal für Familien, die Lebensqualität suchen, ohne den Stadtzugang aufzugeben.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "Pilar · GBA Norte",
          en: "Pilar · GBA Norte",
          es: "Pilar · GBA Norte",
          de: "Pilar · GBA Norte",
        },
        description: {
          it: "Pilar è il principale polo residenziale del norte del GBA, con decenas de barrios cerrados, scuole internazionali, shopping centers e un'economia locale molto dinamica.",
          en: "Pilar is the main residential hub of northern GBA, with dozens of gated communities, international schools, shopping centers, and a very dynamic local economy.",
          es: "Pilar es el principal polo residencial del norte del GBA, con decenas de barrios cerrados, colegios internacionales, shopping centers y una economía local muy dinámica.",
          de: "Pilar ist der wichtigste Wohnstandort im nördlichen GBA, mit Dutzenden von Wohnanlagen, internationalen Schulen, Einkaufszentren und einer sehr dynamischen lokalen Wirtschaft.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "El Fogón de Pilar", en: "El Fogón de Pilar", es: "El Fogón de Pilar", de: "El Fogón de Pilar" }, distance: "800" },
            ],
          },
          {
            key: "bus",
            label: { it: "Accesso", en: "Access", es: "Acceso", de: "Zugang" },
            places: [
              { name: { it: "Accesso Panamericana km 50", en: "Panamericana highway km 50", es: "Acceso Panamericana km 50", de: "Panamericana km 50" }, distance: "3000" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Casa7?",
          en: "Interested in Casa7?",
          es: "¿Te interesa Casa7?",
          de: "Interesse an Casa7?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Casa7 · Pilar",
        en: "Casa7 · Pilar",
        es: "Casa7 · Pilar",
        de: "Casa7 · Pilar",
      },
    },

    // ─── 8. Casa8 ─────────────────────────────────────────────────────────────
    {
      id: "casa8",
      zone: "tigre",
      operationType: ["alquiler", "venta"],
      rentalPrice: [{ amount: 5800, currency: "USD" }, { amount: 5800000, currency: "ARS" }],
      salePrice: [{ amount: 750000, currency: "USD" }, { amount: 750000000, currency: "ARS" }],
      ambientes: 4,
      m2: 310,
      googleMapsEmbedUrl:
        "https://maps.google.com/maps?q=Venice+Tigre+Buenos+Aires&output=embed",
      hero: {
        title: {
          it: "Casa8 · Venice Tigre",
          en: "Casa8 · Venice Tigre",
          es: "Casa8 · Venice Tigre",
          de: "Casa8 · Venice Tigre",
        },
        subtitle: {
          it: "Canali, natura e lusso nel cuore del Delta",
          en: "Canals, nature, and luxury in the heart of the Delta",
          es: "Canales, naturaleza y lujo en el corazón del Delta",
          de: "Kanäle, Natur und Luxus im Herzen des Deltas",
        },
        ctaUrl:
          "https://wa.me/5491150368810?text=%C2%A1Hola!%20Vi%20la%20publicaci%C3%B3n%20de%20Casa8%20y%20me%20intereso...",
      },
      description: {
        title: {
          it: "Venice Tigre: il Delta di lusso",
          en: "Venice Tigre: luxury Delta living",
          es: "Venice Tigre: el Delta de lujo",
          de: "Venice Tigre: Luxusleben im Delta",
        },
        body: {
          it: "Casa8 a Venice Tigre propone una residenza unica affacciata sui canali del Delta del Paraná. Acceso privato all'acqua, amarradero propio, inmensa naturaleza y la distanza giusta dalla città per vivere in modo privilegiato.",
          en: "Casa8 in Venice Tigre offers a unique residence overlooking the Paraná Delta canals. Private water access, private mooring, immense nature, and just the right distance from the city for a privileged lifestyle.",
          es: "Casa8 en Venice Tigre propone una residencia única con vista a los canales del Delta del Paraná. Acceso privado al agua, amarradero propio, inmensa naturaleza y la distancia justa de la ciudad para vivir de forma privilegiada.",
          de: "Casa8 in Venice Tigre bietet eine einzigartige Residenz mit Blick auf die Kanäle des Paraná-Deltas. Privater Wasserzugang, eigener Liegeplatz, immense Natur und der richtige Abstand zur Stadt für einen privilegierten Lebensstil.",
        },
        amenityKeys: ["pool", "sum", "gym", "laundry", "parking", "security"],
      },
      location: {
        title: { it: "La Posizione", en: "Location", es: "Ubicación", de: "Lage" },
        subtitle: {
          it: "Venice · Tigre · Delta",
          en: "Venice · Tigre · Delta",
          es: "Venice · Tigre · Delta",
          de: "Venice · Tigre · Delta",
        },
        description: {
          it: "Venice Tigre è un'urbanización isleña di alto standard, connessa con Tigre Centro per lancha e a 30 minuti dalla Capital Federal per la Panamericana.",
          en: "Venice Tigre is a high-standard island development, connected to Tigre Centro by boat and 30 minutes from Capital Federal via the Panamericana.",
          es: "Venice Tigre es una urbanización isleña de alto estándar, conectada con Tigre Centro por lancha y a 30 minutos de Capital Federal por la Panamericana.",
          de: "Venice Tigre ist eine hochwertige Insel-Bebauung, mit Boot mit Tigre Centro verbunden und 30 Minuten von der Capital Federal über die Panamericana entfernt.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Il Novo Mondo Tigre", en: "Il Novo Mondo Tigre", es: "Il Novo Mondo Tigre", de: "Il Novo Mondo Tigre" }, distance: "1500" },
            ],
          },
          {
            key: "bus",
            label: { it: "Accesso", en: "Access", es: "Acceso", de: "Zugang" },
            places: [
              { name: { it: "Puerto de Frutos · Tigre Centro", en: "Puerto de Frutos · Tigre Centro", es: "Puerto de Frutos · Tigre Centro", de: "Puerto de Frutos · Tigre Centro" }, distance: "2500" },
            ],
          },
        ],
      },
      cta: {
        title: {
          it: "Ti interessa Casa8?",
          en: "Interested in Casa8?",
          es: "¿Te interesa Casa8?",
          de: "Interesse an Casa8?",
        },
        subtitle: {
          it: "Scrivici su WhatsApp e un consulente ti risponderà in pochi minuti.",
          en: "Message us on WhatsApp and an advisor will get back to you in minutes.",
          es: "Escribinos por WhatsApp y un asesor te responderá en minutos.",
          de: "Schreiben Sie uns auf WhatsApp und ein Berater meldet sich in wenigen Minuten.",
        },
        buttonLabel: {
          it: "Contattaci su WhatsApp",
          en: "Contact us on WhatsApp",
          es: "Contactanos por WhatsApp",
          de: "WhatsApp-Kontakt",
        },
      },
      footerTagline: {
        it: "Casa8 · Venice Tigre",
        en: "Casa8 · Venice Tigre",
        es: "Casa8 · Venice Tigre",
        de: "Casa8 · Venice Tigre",
      },
    },
  ],
};

export default config;
