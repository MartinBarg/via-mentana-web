import type { ClientConfig } from "../../lib/types/client";

const config: ClientConfig = {
  id: "nombre-de-cliente",
  brandName: "Andrea's Properties",
  heroToursCount: 3,

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
      {
        id: "milan",
        label: {
          it: "Milano",
          en: "Milan",
          es: "Milán",
          de: "Mailand",
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

    // ── Propiedad C: Departamento Milán ─────────────────────────────────────
    {
      id: "departamento-milan",
      zone: "milan",
      airbnbUrl:
        "https://www.airbnb.es/rooms/1578306128279972231",
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7Tmvp?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://www.google.com/maps?q=Piazza+Firenze,+4,+20154+Milano&z=16&output=embed",

      hero: {
        title: {
          it: "Appartamento a Milano",
          en: "Apartment in Milan",
          es: "Departamento en Milán",
          de: "Wohnung in Mailand",
        },
        subtitle: {
          it: "Stile e comfort nel cuore del quartiere Brera",
          en: "Style and comfort in the heart of the Brera district",
          es: "Estilo y confort en el corazón del barrio Brera",
          de: "Stil und Komfort im Herzen des Brera-Viertels",
        },
      },

      description: {
        title: {
          it: "L'Appartamento",
          en: "The Apartment",
          es: "El Departamento",
          de: "Die Wohnung",
        },
        body: {
          it: "L'appartamento dispone di un'ampia camera da letto matrimoniale con armadi a muro, comodini e aria condizionata, e di un luminoso soggiorno con cucina a vista completamente attrezzata con forno a gas, frigorifero con congelatore, macchinetta del caffè e bollitore. Il divano letto matrimoniale, la TV al plasma e le finestre affacciate su Piazza Firenze completano uno spazio moderno e funzionale. Il bagno finestrato è dotato di lavabo, bidet, doccia e tutti gli accessori necessari.",
          en: "The apartment features a spacious double bedroom with built-in wardrobes, bedside tables and air conditioning, and a bright living room with open fully equipped kitchen including gas oven, fridge-freezer, coffee maker and kettle. A double sofa bed, plasma TV and windows overlooking Piazza Firenze complete a modern and functional space. The windowed bathroom comes with basin, bidet, shower and all the accessories you need.",
          es: "El departamento cuenta con un amplio dormitorio doble con armarios empotrados, mesitas de noche y aire acondicionado, y un luminoso salón con cocina abierta totalmente equipada con horno de gas, nevera con congelador, cafetera y hervidor. Un cómodo sofá cama doble, televisor de plasma y ventanas con vistas a Piazza Firenze completan un espacio moderno y funcional. El baño con ventana incluye lavabo, bidé, ducha y todos los accesorios necesarios.",
          de: "Die Wohnung verfügt über ein geräumiges Doppelschlafzimmer mit Einbauschränken, Nachttischen und Klimaanlage sowie ein helles Wohnzimmer mit offener, voll ausgestatteter Küche mit Gasherd, Kühl-Gefrier-Kombination, Kaffeemaschine und Wasserkocher. Ein Doppelschlafsofa, ein Plasma-TV und Fenster mit Blick auf die Piazza Firenze vervollständigen den modernen und funktionalen Raum. Das Fensterbad ist mit Waschbecken, Bidet, Dusche und allen notwendigen Accessoires ausgestattet.",
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
          it: "Quartiere Brera, Milano",
          en: "Brera neighborhood, Milan",
          es: "Barrio Brera, Milán",
          de: "Brera-Viertel, Mailand",
        },
        description: {
          it: "L'appartamento si trova in Piazza Firenze, nel cuore del quartiere Brera — uno dei più ambiti di Milano, celebre per la Pinacoteca di Brera, le boutique di design e i locali dell'aperitivo. Un angolo di città autentico e raffinato, dove convivono arte, moda e vita quotidiana. Il tram 14, proprio davanti all'ingresso, collega direttamente al Duomo in pochi minuti, rendendo ogni spostamento semplice e senza pensieri.",
          en: "The apartment is located on Piazza Firenze, in the heart of the Brera district — one of Milan's most sought-after neighborhoods, famous for the Pinacoteca di Brera, design boutiques and aperitivo bars. A refined and authentic corner of the city where art, fashion and everyday life come together. Tram 14, right at the entrance, connects directly to the Duomo in minutes, making every journey effortless.",
          es: "El departamento se encuentra en Piazza Firenze, en el corazón del barrio Brera — uno de los más cotizados de Milán, famoso por la Pinacoteca di Brera, las boutiques de diseño y los bares de aperitivo. Un rincón auténtico y refinado de la ciudad donde conviven el arte, la moda y la vida cotidiana. El tranvía 14, justo en la puerta, conecta directamente con el Duomo en minutos, haciendo cada trayecto simple y sin complicaciones.",
          de: "Die Wohnung befindet sich an der Piazza Firenze im Herzen des Brera-Viertels — einem der begehrtesten Stadtteile Mailands, bekannt für die Pinacoteca di Brera, Designboutiquen und Aperitivo-Bars. Eine authentische und elegante Ecke der Stadt, in der Kunst, Mode und Alltagsleben zusammenkommen. Die Straßenbahn 14, direkt vor dem Eingang, verbindet in wenigen Minuten mit dem Dom und macht jeden Weg mühelos.",
        },
        categories: [
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Osteria di Brera", en: "Osteria di Brera", es: "Osteria di Brera", de: "Osteria di Brera" }, distance: "250" },
              { name: { it: "Trattoria Madonnina", en: "Trattoria Madonnina", es: "Trattoria Madonnina", de: "Trattoria Madonnina" }, distance: "400" },
              { name: { it: "Ristorante Solferino", en: "Ristorante Solferino", es: "Ristorante Solferino", de: "Ristorante Solferino" }, distance: "500" },
            ],
          },
          {
            key: "coffee",
            label: { it: "Caffè", en: "Coffee shops", es: "Cafés", de: "Cafés" },
            places: [
              { name: { it: "Bar Brera", en: "Bar Brera", es: "Bar Brera", de: "Bar Brera" }, distance: "150" },
              { name: { it: "Caffè Vecchia Brera", en: "Caffè Vecchia Brera", es: "Caffè Vecchia Brera", de: "Caffè Vecchia Brera" }, distance: "300" },
              { name: { it: "Pasticceria Marchesi", en: "Pasticceria Marchesi", es: "Pasticceria Marchesi", de: "Pasticceria Marchesi" }, distance: "600" },
            ],
          },
          {
            key: "museum",
            label: { it: "Musei e cultura", en: "Museums & culture", es: "Museos y cultura", de: "Museen & Kultur" },
            places: [
              { name: { it: "Pinacoteca di Brera", en: "Pinacoteca di Brera", es: "Pinacoteca di Brera", de: "Pinacoteca di Brera" }, distance: "350" },
              { name: { it: "Castello Sforzesco", en: "Castello Sforzesco", es: "Castello Sforzesco", de: "Castello Sforzesco" }, distance: "900" },
              { name: { it: "Duomo di Milano", en: "Milan Cathedral", es: "Duomo de Milán", de: "Mailänder Dom" }, distance: "1800" },
            ],
          },
          {
            key: "metro",
            label: { it: "Metro", en: "Metro", es: "Metro", de: "U-Bahn" },
            places: [
              { name: { it: "Moscova (M2)", en: "Moscova (M2)", es: "Moscova (M2)", de: "Moscova (M2)" }, distance: "400" },
              { name: { it: "Lanza (M2)", en: "Lanza (M2)", es: "Lanza (M2)", de: "Lanza (M2)" }, distance: "550" },
            ],
          },
          {
            key: "bus",
            label: { it: "Tram", en: "Tram", es: "Tranvía", de: "Straßenbahn" },
            places: [
              { name: { it: "Tram 14 – Piazza Firenze (→ Duomo)", en: "Tram 14 – Piazza Firenze (→ Duomo)", es: "Tranvía 14 – Piazza Firenze (→ Duomo)", de: "Tram 14 – Piazza Firenze (→ Dom)" }, distance: "0" },
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
            id: "chiara",
            author: "Chiara F.",
            country: "Italia",
            rating: 5,
            comment: {
              it: "Appartamento meraviglioso nel quartiere più bello di Milano. Spazioso, luminoso e curatissimo. Il tram sotto casa è comodissimo e il tour virtuale rispecchia perfettamente la realtà. Tornerò senza dubbi.",
              en: "Wonderful apartment in the most beautiful neighborhood in Milan. Spacious, bright and immaculately kept. The tram downstairs is super convenient and the virtual tour perfectly matches reality. I'll definitely be back.",
              es: "Departamento maravilloso en el barrio más lindo de Milán. Amplio, luminoso y muy bien cuidado. El tranvía en la puerta es comodísimo y el tour virtual refleja perfectamente la realidad. Vuelvo sin dudarlo.",
              de: "Wunderbare Wohnung im schönsten Viertel Mailands. Geräumig, hell und tadellos gepflegt. Die Straßenbahn direkt vor der Tür ist super praktisch und der virtuelle Rundgang spiegelt die Realität perfekt wider. Ich komme definitiv wieder.",
            },
          },
          {
            id: "lucas",
            author: "Lucas B.",
            country: "France",
            rating: 5,
            comment: {
              it: "Posizione imbattibile a due passi dalla Pinacoteca di Brera. L'appartamento è moderno, pulito e dotato di tutto il necessario. La cucina completamente attrezzata e l'aria condizionata hanno reso il soggiorno perfetto.",
              en: "Unbeatable location steps from the Pinacoteca di Brera. The apartment is modern, clean and has everything you need. The fully equipped kitchen and air conditioning made for a perfect stay.",
              es: "Ubicación inmejorable a pasos de la Pinacoteca di Brera. El departamento es moderno, limpio y tiene todo lo necesario. La cocina completamente equipada y el aire acondicionado hicieron que la estadía fuera perfecta.",
              de: "Unschlagbare Lage, nur wenige Schritte von der Pinacoteca di Brera entfernt. Die Wohnung ist modern, sauber und hat alles, was man braucht. Die voll ausgestattete Küche und die Klimaanlage haben den Aufenthalt perfekt gemacht.",
            },
          },
          {
            id: "marta",
            author: "Marta G.",
            country: "España",
            rating: 5,
            comment: {
              it: "Milano come non l'avevo mai vissuta. Svegliarsi a Brera è un privilegio — tutto è a portata di mano, dall'aperitivo al museo. L'appartamento è esattamente come nel tour 360, nessuna sorpresa.",
              en: "Milan like I'd never experienced it. Waking up in Brera is a privilege — everything is within reach, from aperitivo to the museum. The apartment is exactly as in the 360 tour, no surprises.",
              es: "Milán como nunca lo había vivido. Despertar en Brera es un privilegio — todo está al alcance, desde el aperitivo hasta el museo. El departamento es exactamente como en el tour 360, sin sorpresas.",
              de: "Mailand wie ich es noch nie erlebt hatte. In Brera aufzuwachen ist ein Privileg — alles ist in Reichweite, vom Aperitivo bis zum Museum. Die Wohnung ist genau wie im 360-Tour, keine Überraschungen.",
            },
          },
          {
            id: "thomas",
            author: "Thomas K.",
            country: "Deutschland",
            rating: 5,
            comment: {
              it: "Soggiorno eccellente. L'appartamento è spazioso, curato e in una delle zone più vivaci della città. Il portiere mattutino ci ha fatto sentire sempre al sicuro. Consiglio vivamente a chiunque voglia vivere la Milano autentica.",
              en: "Excellent stay. The apartment is spacious, well-kept and in one of the city's most vibrant areas. The morning concierge made us feel safe at all times. Highly recommend for anyone who wants to experience authentic Milan.",
              es: "Estadía excelente. El departamento es amplio, bien cuidado y en una de las zonas más vibrantes de la ciudad. El conserje matutino nos hizo sentir seguros en todo momento. Lo recomiendo ampliamente a quienes quieran vivir el Milán auténtico.",
              de: "Ausgezeichneter Aufenthalt. Die Wohnung ist geräumig, gepflegt und in einem der lebendigsten Viertel der Stadt. Der morgendliche Concierge hat uns immer das Gefühl der Sicherheit gegeben. Sehr empfehlenswert für alle, die das authentische Mailand erleben möchten.",
            },
          },
        ],
      },

      cta: {
        title: {
          it: "Pronto a vivere Milano?",
          en: "Ready to experience Milan?",
          es: "¿Listo para vivir Milán?",
          de: "Bereit, Mailand zu erleben?",
        },
        subtitle: {
          it: "Prenota il tuo soggiorno al Brera Apartment e scopri la città della moda e del design come un locale.",
          en: "Book your stay at the Brera Apartment and discover the city of fashion and design like a local.",
          es: "Reservá tu estadía en el Brera Apartment y descubrí la ciudad de la moda y el diseño como un local.",
          de: "Buchen Sie Ihren Aufenthalt im Brera Apartment und entdecken Sie die Stadt der Mode und des Designs wie ein Einheimischer.",
        },
      },

      footerTagline: {
        it: "Arte, design e vita autentica nel cuore di Brera",
        en: "Art, design and authentic life in the heart of Brera",
        es: "Arte, diseño y vida auténtica en el corazón de Brera",
        de: "Kunst, Design und authentisches Leben im Herzen von Brera",
      },
    },
  ],
};

export default config;
