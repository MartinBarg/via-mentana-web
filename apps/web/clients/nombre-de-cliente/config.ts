import type { ClientConfig } from "../../lib/types/client";

const config: ClientConfig = {
  id: "nombre-de-cliente",
  brandName: "Andrea's Properties",
  heroToursCount: 2,

  hero: {
    tagline: {
      it: "Fai una visita virtuale e prenota in base al tuo stile, con calma",
      en: "Take a virtual tour and book according to your fit, stress-free",
      es: "Hacé una visita virtual y alquilá acorde a tu fit tranquilo",
      de: "Mach eine virtuelle Tour und buche passend zu deinem Stil, in Ruhe",
    },
    ctaLabel: {
      it: "Prenota",
      en: "Book",
      es: "Alquila",
      de: "Buchen",
    },
    zones: [
      {
        id: "roma",
        label: {
          it: "Roma",
          en: "Rome",
          es: "Roma",
          de: "Rom",
        },
      },
    ],
  },

  properties: [
    // ── Propiedad A: Studio Via Mentana ─────────────────────────────────────
    {
      id: "studio-via-mentana",
      zone: "roma",
      airbnbUrl:
        "https://es.airbnb.com/rooms/1005789413503850183",
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7Mzpz?logo=-1&info=0&fs=0&vr=0&sd=1&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://www.google.com/maps?q=41.907142,12.503251&z=16&output=embed",

      hero: {
        title: {
          it: "Studio a Roma",
          en: "Studio in Rome",
          es: "Studio en Roma",
          de: "Studio in Rom",
        },
        subtitle: {
          it: "Un'esperienza unica nel cuore della città eterna",
          en: "A unique experience in the heart of the eternal city",
          es: "Una experiencia única en el corazón de la ciudad eterna",
          de: "Ein einzigartiges Erlebnis im Herzen der ewigen Stadt",
        },
      },

      description: {
        title: {
          it: "Lo Studio",
          en: "The Studio",
          es: "El Studio",
          de: "Das Studio",
        },
        body: {
          it: "Lo studio dispone di un comodo letto matrimoniale, una zona cucina completamente attrezzata con tutto il necessario per cucinare, piano d'appoggio e ampio spazio di deposito. Bagno privato completo, armadio e ampio spazio per riporre gli oggetti di uso quotidiano.",
          en: "The studio features a comfortable double bed, a fully equipped kitchen area with everything you need to cook, ample counter space and storage. Full private bathroom, wardrobe and space for everyday essentials.",
          es: "El studio cuenta con una cómoda cama doble, una zona de cocina completamente equipada con todo lo necesario para cocinar, espacio de apoyo y amplio lugar de guardado. Baño completo privado, placard y espacio para guardar elementos de uso cotidiano.",
          de: "Das Studio verfügt über ein komfortables Doppelbett, einen voll ausgestatteten Küchenbereich mit allem Nötigen zum Kochen, Arbeitsfläche und großzügigem Stauraum. Privates Vollbad, Kleiderschrank und Platz für den täglichen Bedarf.",
        },
        amenityKeys: ["fridge", "kitchen", "bathroom", "wifi", "cleaning", "linens"],
      },

      location: {
        title: {
          it: "La Posizione",
          en: "Location",
          es: "Ubicación",
          de: "Lage",
        },
        subtitle: {
          it: "Quartiere Castro Pretorio, Roma",
          en: "Castro Pretorio neighborhood, Rome",
          es: "Barrio Castro Pretorio, Roma",
          de: "Viertel Castro Pretorio, Rom",
        },
        description: {
          it: "Lo studio si trova nel vivace quartiere Castro Pretorio, a pochi passi dalla stazione metro B e dalla Biblioteca Nazionale Centrale. Una posizione strategica per esplorare Roma, con ristoranti, caffè e servizi di ogni tipo raggiungibili a piedi.",
          en: "The studio is located in the vibrant Castro Pretorio neighborhood, steps away from Metro B and the National Central Library. A strategic position to explore Rome, with restaurants, cafés and services all within walking distance.",
          es: "El studio se encuentra en el animado barrio Castro Pretorio, a pocos pasos del Metro B y la Biblioteca Nacional Central. Una posición estratégica para explorar Roma, con restaurantes, cafés y servicios de todo tipo a distancia caminando.",
          de: "Das Studio befindet sich im lebhaften Viertel Castro Pretorio, nur wenige Schritte von der U-Bahn B und der Nationalbibliothek entfernt. Eine strategische Lage zur Erkundung Roms, mit Restaurants, Cafés und Einrichtungen aller Art in Gehweite.",
        },
        categories: [
          {
            key: "pizza",
            label: { it: "Pizzerie", en: "Pizza places", es: "Pizzerías", de: "Pizzerien" },
            places: [
              { name: { it: "Pizzeria da Claudio", en: "Pizzeria da Claudio", es: "Pizzeria da Claudio", de: "Pizzeria da Claudio" }, distance: "350" },
              { name: { it: "Forno Conti", en: "Forno Conti", es: "Forno Conti", de: "Forno Conti" }, distance: "500" },
              { name: { it: "Pizzeria Al Forno", en: "Pizzeria Al Forno", es: "Pizzeria Al Forno", de: "Pizzeria Al Forno" }, distance: "650" },
            ],
          },
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Trattoria Monti", en: "Trattoria Monti", es: "Trattoria Monti", de: "Trattoria Monti" }, distance: "400" },
              { name: { it: "Osteria dell'Angelo", en: "Osteria dell'Angelo", es: "Osteria dell'Angelo", de: "Osteria dell'Angelo" }, distance: "550" },
              { name: { it: "Ristorante Il Tulipano", en: "Ristorante Il Tulipano", es: "Ristorante Il Tulipano", de: "Ristorante Il Tulipano" }, distance: "300" },
            ],
          },
          {
            key: "coffee",
            label: { it: "Caffè", en: "Coffee shops", es: "Cafés", de: "Cafés" },
            places: [
              { name: { it: "Bar San Pietro", en: "Bar San Pietro", es: "Bar San Pietro", de: "Bar San Pietro" }, distance: "200" },
              { name: { it: "Caffè Colombia", en: "Caffè Colombia", es: "Caffè Colombia", de: "Caffè Colombia" }, distance: "350" },
              { name: { it: "Bar Termini", en: "Bar Termini", es: "Bar Termini", de: "Bar Termini" }, distance: "600" },
            ],
          },
          {
            key: "library",
            label: { it: "Biblioteche", en: "Libraries", es: "Bibliotecas", de: "Bibliotheken" },
            places: [
              { name: { it: "Biblioteca Nazionale Centrale", en: "National Central Library", es: "Biblioteca Nacional Central", de: "Nationalbibliothek" }, distance: "400" },
              { name: { it: "Biblioteca Statale", en: "State Library", es: "Biblioteca Estatal", de: "Staatsbibliothek" }, distance: "700" },
            ],
          },
          {
            key: "metro",
            label: { it: "Metro", en: "Metro", es: "Metro", de: "U-Bahn" },
            places: [
              { name: { it: "Metro B – Castro Pretorio", en: "Metro B – Castro Pretorio", es: "Metro B – Castro Pretorio", de: "U-Bahn B – Castro Pretorio" }, distance: "100" },
              { name: { it: "Metro A/B – Termini", en: "Metro A/B – Termini", es: "Metro A/B – Termini", de: "U-Bahn A/B – Termini" }, distance: "600" },
            ],
          },
          {
            key: "bus",
            label: { it: "Autobus", en: "Bus", es: "Colectivos", de: "Bus" },
            places: [
              { name: { it: "Via Volturno (linee 90, 92)", en: "Via Volturno (lines 90, 92)", es: "Via Volturno (líneas 90, 92)", de: "Via Volturno (Linien 90, 92)" }, distance: "150" },
              { name: { it: "Stazione Termini (tutte le linee)", en: "Termini Station (all lines)", es: "Estación Termini (todas las líneas)", de: "Bahnhof Termini (alle Linien)" }, distance: "600" },
            ],
          },
        ],
      },

      reviews: {
        title: { it: "Recensioni", en: "Reviews", es: "Reseñas", de: "Bewertungen" },
        subtitle: {
          it: "Cosa dicono i nostri ospiti",
          en: "What our guests say",
          es: "Lo que dicen nuestros huéspedes",
          de: "Was unsere Gäste sagen",
        },
        items: [
          {
            id: "giulia",
            author: "Giulia M.",
            country: "Deutschland",
            rating: 5,
            comment: {
              it: "Sistemazione meravigliosa! Lo studio è esattamente come descritto — elegante, pulito e perfettamente posizionato. Il tour virtuale mi ha convinto immediatamente.",
              en: "Wonderful place! The studio is exactly as described — elegant, clean and perfectly located. The virtual tour convinced me straight away.",
              es: "¡Lugar maravilloso! El studio es exactamente como se describe — elegante, limpio y perfectamente ubicado. El tour virtual me convenció de inmediato.",
              de: "Wunderschöner Ort! Das Studio ist genau wie beschrieben — elegant, sauber und perfekt gelegen. Die virtuelle Tour hat mich sofort überzeugt.",
            },
          },
          {
            id: "james",
            author: "James R.",
            country: "United Kingdom",
            rating: 5,
            comment: {
              it: "Assolutamente fantastico. La posizione è perfetta — a pochi passi dal Colosseo. Il tour 360 nel sito mi ha permesso di decidere facilmente. Consiglio vivamente!",
              en: "Absolutely loved it. The location is perfect — within walking distance to the Colosseum. The 360 tour on the listing made it easy to decide. Highly recommend!",
              es: "Me encantó absolutamente. La ubicación es perfecta — a poca distancia del Coliseo. El tour 360 del listado me facilitó la decisión. ¡Lo recomiendo muchísimo!",
              de: "Absolut geliebt. Die Lage ist perfekt — nur wenige Gehminuten vom Kolosseum entfernt. Der 360-Tour im Inserat hat die Entscheidung leicht gemacht. Sehr empfehlenswert!",
            },
          },
          {
            id: "sofia",
            author: "Sofía L.",
            country: "España",
            rating: 5,
            comment: {
              it: "Lo studio è bellissimo ed esattamente quello che si vede nel tour virtuale. Un'esperienza autentica a Roma, mi sono sentita come a casa. Tornerei senza esitare.",
              en: "The studio is beautiful and exactly what you see in the virtual tour. An authentic experience in Rome, I felt right at home. Would go back without hesitation.",
              es: "El studio es precioso y exactamente lo que se ve en el tour virtual. Una experiencia auténtica en Roma, me sentí como en casa. Volvería sin dudar.",
              de: "Das Studio ist wunderschön und genau das, was man im virtuellen Rundgang sieht. Ein authentisches Erlebnis in Rom, ich fühlte mich wie zu Hause. Würde jederzeit wiederkommen.",
            },
          },
          {
            id: "marco",
            author: "Marco B.",
            country: "Italia",
            rating: 5,
            comment: {
              it: "Posto meraviglioso nel cuore di Roma. L'appartamento è esattamente come nel tour 360, cucina completamente attrezzata e bagno impeccabile. Tornerò presto!",
              en: "A wonderful place in the heart of Rome. The apartment is exactly as shown in the 360 tour, fully equipped kitchen and impeccable bathroom. I'll be back soon!",
              es: "Un lugar maravilloso en el corazón de Roma. El apartamento es exactamente como en el tour 360, cocina completamente equipada y baño impecable. ¡Vuelvo pronto!",
              de: "Ein wunderbarer Ort im Herzen Roms. Die Wohnung ist genau wie im 360-Tour, voll ausgestattete Küche und makellose Badezimmer. Ich komme bald wieder!",
            },
          },
        ],
      },

      cta: {
        title: {
          it: "Pronto a vivere Roma?",
          en: "Ready to experience Rome?",
          es: "¿Listo para vivir Roma?",
          de: "Bereit, Rom zu erleben?",
        },
        subtitle: {
          it: "Prenota il tuo soggiorno nello Studio Via Mentana e scopri la città eterna come un locale.",
          en: "Book your stay at Studio Via Mentana and discover the eternal city like a local.",
          es: "Reservá tu estadía en Studio Via Mentana y descubrí la ciudad eterna como un local.",
          de: "Buchen Sie Ihren Aufenthalt im Studio Via Mentana und entdecken Sie die ewige Stadt wie ein Einheimischer.",
        },
      },

      footerTagline: {
        it: "Un'esperienza autentica nel cuore di Roma",
        en: "An authentic experience in the heart of Rome",
        es: "Una experiencia auténtica en el corazón de Roma",
        de: "Ein authentisches Erlebnis im Herzen Roms",
      },
    },

    // ── Propiedad B: Residenza Nazionale ────────────────────────────────────
    {
      id: "loft-at-rome",
      zone: "roma",
      airbnbUrl:
        "https://es.airbnb.com/rooms/39883216",
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7MBmV?logo=-1&info=0&fs=0&vr=0&sd=1&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://www.google.com/maps?q=Via+Sapri,+6,+00185+Roma+RM&z=16&output=embed",

      hero: {
        title: {
          it: "Loft a Roma",
          en: "Loft at Rome",
          es: "Loft en Roma",
          de: "Loft in Rom",
        },
        subtitle: {
          it: "Un loft luminoso e moderno nel cuore di Roma",
          en: "A bright, modern loft in the heart of Rome",
          es: "Un loft luminoso y moderno en el corazón de Roma",
          de: "Ein helles, modernes Loft im Herzen Roms",
        },
      },

      description: {
        title: {
          it: "Il Loft",
          en: "The Loft",
          es: "El Loft",
          de: "Das Loft",
        },
        body: {
          it: "Un luminoso loft nel cuore di Roma, con soffitti alti e un'atmosfera moderna e accogliente. Dispone di un'ampia zona living con cucina aperta completamente attrezzata, letto matrimoniale confortevole e tutto il necessario per un soggiorno piacevole nella città eterna.",
          en: "A bright loft in the heart of Rome, with high ceilings and a modern, welcoming atmosphere. Features a spacious living area with fully equipped open kitchen, comfortable double bed and everything you need for a wonderful stay in the eternal city.",
          es: "Un luminoso loft en el corazón de Roma, con techos altos y una atmósfera moderna y acogedora. Cuenta con una amplia zona de estar con cocina abierta completamente equipada, cómoda cama matrimonial y todo lo necesario para una estadía placentera en la ciudad eterna.",
          de: "Ein helles Loft im Herzen Roms mit hohen Decken und einer modernen, einladenden Atmosphäre. Verfügt über einen großzügigen Wohnbereich mit voll ausgestatteter offener Küche, komfortablem Doppelbett und allem, was Sie für einen angenehmen Aufenthalt in der ewigen Stadt benötigen.",
        },
        amenityKeys: ["fridge", "kitchen", "oven", "wifi", "iron", "tv"],
      },

      location: {
        title: {
          it: "La Posizione",
          en: "Location",
          es: "Ubicación",
          de: "Lage",
        },
        subtitle: {
          it: "Quartiere Castro Pretorio, Roma",
          en: "Castro Pretorio neighborhood, Rome",
          es: "Barrio Castro Pretorio, Roma",
          de: "Viertel Castro Pretorio, Rom",
        },
        description: {
          it: "Il loft si trova nel vivace quartiere Castro Pretorio, a pochi passi dalla stazione metro B e dalla Biblioteca Nazionale Centrale. Una posizione strategica per esplorare Roma, con ristoranti, caffè e servizi di ogni tipo raggiungibili a piedi.",
          en: "The loft is located in the vibrant Castro Pretorio neighborhood, steps away from Metro B and the National Central Library. A strategic position to explore Rome, with restaurants, cafés and services all within walking distance.",
          es: "El loft se encuentra en el animado barrio Castro Pretorio, a pocos pasos del Metro B y la Biblioteca Nacional Central. Una posición estratégica para explorar Roma, con restaurantes, cafés y servicios de todo tipo a distancia caminando.",
          de: "Das Loft befindet sich im lebhaften Viertel Castro Pretorio, nur wenige Schritte von der U-Bahn B und der Nationalbibliothek entfernt. Eine strategische Lage zur Erkundung Roms, mit Restaurants, Cafés und Einrichtungen aller Art in Gehweite.",
        },
        categories: [
          {
            key: "pizza",
            label: { it: "Pizzerie", en: "Pizza places", es: "Pizzerías", de: "Pizzerien" },
            places: [
              { name: { it: "Pizzeria da Claudio", en: "Pizzeria da Claudio", es: "Pizzeria da Claudio", de: "Pizzeria da Claudio" }, distance: "350" },
              { name: { it: "Forno Conti", en: "Forno Conti", es: "Forno Conti", de: "Forno Conti" }, distance: "500" },
              { name: { it: "Pizzeria Al Forno", en: "Pizzeria Al Forno", es: "Pizzeria Al Forno", de: "Pizzeria Al Forno" }, distance: "650" },
            ],
          },
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Trattoria Monti", en: "Trattoria Monti", es: "Trattoria Monti", de: "Trattoria Monti" }, distance: "400" },
              { name: { it: "Osteria dell'Angelo", en: "Osteria dell'Angelo", es: "Osteria dell'Angelo", de: "Osteria dell'Angelo" }, distance: "550" },
              { name: { it: "Ristorante Il Tulipano", en: "Ristorante Il Tulipano", es: "Ristorante Il Tulipano", de: "Ristorante Il Tulipano" }, distance: "300" },
            ],
          },
          {
            key: "coffee",
            label: { it: "Caffè", en: "Coffee shops", es: "Cafés", de: "Cafés" },
            places: [
              { name: { it: "Bar San Pietro", en: "Bar San Pietro", es: "Bar San Pietro", de: "Bar San Pietro" }, distance: "200" },
              { name: { it: "Caffè Colombia", en: "Caffè Colombia", es: "Caffè Colombia", de: "Caffè Colombia" }, distance: "350" },
              { name: { it: "Bar Termini", en: "Bar Termini", es: "Bar Termini", de: "Bar Termini" }, distance: "600" },
            ],
          },
          {
            key: "library",
            label: { it: "Biblioteche", en: "Libraries", es: "Bibliotecas", de: "Bibliotheken" },
            places: [
              { name: { it: "Biblioteca Nazionale Centrale", en: "National Central Library", es: "Biblioteca Nacional Central", de: "Nationalbibliothek" }, distance: "400" },
              { name: { it: "Biblioteca Statale", en: "State Library", es: "Biblioteca Estatal", de: "Staatsbibliothek" }, distance: "700" },
            ],
          },
          {
            key: "metro",
            label: { it: "Metro", en: "Metro", es: "Metro", de: "U-Bahn" },
            places: [
              { name: { it: "Metro B – Castro Pretorio", en: "Metro B – Castro Pretorio", es: "Metro B – Castro Pretorio", de: "U-Bahn B – Castro Pretorio" }, distance: "100" },
              { name: { it: "Metro A/B – Termini", en: "Metro A/B – Termini", es: "Metro A/B – Termini", de: "U-Bahn A/B – Termini" }, distance: "600" },
            ],
          },
          {
            key: "bus",
            label: { it: "Autobus", en: "Bus", es: "Colectivos", de: "Bus" },
            places: [
              { name: { it: "Via Volturno (linee 90, 92)", en: "Via Volturno (lines 90, 92)", es: "Via Volturno (líneas 90, 92)", de: "Via Volturno (Linien 90, 92)" }, distance: "150" },
              { name: { it: "Stazione Termini (tutte le linee)", en: "Termini Station (all lines)", es: "Estación Termini (todas las líneas)", de: "Bahnhof Termini (alle Linien)" }, distance: "600" },
            ],
          },
        ],
      },

      reviews: {
        title: { it: "Recensioni", en: "Reviews", es: "Reseñas", de: "Bewertungen" },
        subtitle: {
          it: "Cosa dicono i nostri ospiti",
          en: "What our guests say",
          es: "Lo que dicen nuestros huéspedes",
          de: "Was unsere Gäste sagen",
        },
        items: [
          {
            id: "anna",
            author: "Anna P.",
            country: "Italia",
            rating: 5,
            comment: {
              it: "Loft spettacolare, spazioso e pieno di luce. La cucina era completamente attrezzata e il letto comodissimo. Una delle migliori sistemazioni che abbia mai avuto a Roma.",
              en: "Spectacular loft, spacious and full of light. The kitchen was fully equipped and the bed super comfortable. One of the best places I've ever stayed in Rome.",
              es: "Loft espectacular, amplio y lleno de luz. La cocina estaba completamente equipada y la cama comodísima. Una de las mejores estadías que he tenido en Roma.",
              de: "Spektakuläres Loft, geräumig und lichtdurchflutet. Die Küche war voll ausgestattet und das Bett sehr bequem. Eine der besten Unterkünfte, die ich je in Rom hatte.",
            },
          },
          {
            id: "david",
            author: "David M.",
            country: "United States",
            rating: 5,
            comment: {
              it: "Assolutamente fantastico. Il loft è moderno, pulito e in una posizione imbattibile. Il tour virtuale rispecchia perfettamente la realtà — nessuna sorpresa, solo piacevoli conferme.",
              en: "Absolutely fantastic. The loft is modern, clean and in an unbeatable location. The virtual tour perfectly matches reality — no surprises, just pleasant confirmations.",
              es: "Absolutamente fantástico. El loft es moderno, limpio y en una ubicación inmejorable. El tour virtual refleja perfectamente la realidad — sin sorpresas, solo confirmaciones agradables.",
              de: "Absolut fantastisch. Das Loft ist modern, sauber und in unschlagbarer Lage. Der virtuelle Rundgang spiegelt die Realität perfekt wider — keine Überraschungen, nur angenehme Bestätigungen.",
            },
          },
          {
            id: "elena",
            author: "Elena V.",
            country: "España",
            rating: 5,
            comment: {
              it: "Soggiorno meraviglioso. Il loft è esattamente come nelle foto, con soffitti alti e tanta luce naturale. La televisione e la cucina completa sono stati un grande plus per il nostro soggiorno lungo.",
              en: "Wonderful stay. The loft is exactly as in the photos, with high ceilings and lots of natural light. The TV and full kitchen were a great plus for our longer stay.",
              es: "Estadía maravillosa. El loft es exactamente como en las fotos, con techos altos y mucha luz natural. La televisión y la cocina completa fueron un gran plus para nuestra estadía larga.",
              de: "Wunderbarer Aufenthalt. Das Loft ist genau wie auf den Fotos, mit hohen Decken und viel Tageslicht. Der Fernseher und die voll ausgestattete Küche waren ein großes Plus für unseren längeren Aufenthalt.",
            },
          },
          {
            id: "pierre",
            author: "Pierre L.",
            country: "France",
            rating: 5,
            comment: {
              it: "Posizione perfetta per visitare Roma. Il loft è accogliente, silenzioso e dotato di tutto il necessario. Ci torneremmo senza esitazione.",
              en: "Perfect location to visit Rome. The loft is welcoming, quiet and has everything you need. We would go back without hesitation.",
              es: "Ubicación perfecta para visitar Roma. El loft es acogedor, silencioso y tiene todo lo necesario. Volveríamos sin dudarlo.",
              de: "Perfekte Lage für einen Rombesuch. Das Loft ist einladend, ruhig und hat alles, was man braucht. Wir würden ohne zu zögern wiederkommen.",
            },
          },
        ],
      },

      cta: {
        title: {
          it: "Pronto a svegliarti nel cuore culturale di Roma?",
          en: "Ready to wake up in Rome's cultural heart?",
          es: "¿Querés despertar en el corazón cultural de Roma?",
          de: "Bereit, im kulturellen Herzen Roms aufzuwachen?",
        },
        subtitle: {
          it: "Prenota il tuo soggiorno al Loft at Rome e vivi Roma come gli accademici di un tempo.",
          en: "Book your stay at Loft at Rome and experience Rome like the scholars of old.",
          es: "Reservá tu estadía en Loft at Rome y viví Roma como los académicos de antaño.",
          de: "Buchen Sie Ihren Aufenthalt im Loft at Rome und erleben Sie Rom wie die Gelehrten von einst.",
        },
      },

      footerTagline: {
        it: "Spazio, luce e comfort nel cuore della città eterna",
        en: "Space, light and comfort in the heart of the eternal city",
        es: "Espacio, luz y confort en el corazón de la ciudad eterna",
        de: "Raum, Licht und Komfort im Herzen der ewigen Stadt",
      },
    },
  ],
};

export default config;
