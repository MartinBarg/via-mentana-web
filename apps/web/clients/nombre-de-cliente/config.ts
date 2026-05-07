import type { ClientConfig } from "../../lib/types/client";

const config: ClientConfig = {
  id: "nombre-de-cliente",
  brandName: "Nombre de cliente",
  heroToursCount: 2,

  properties: [
    // ── Propiedad A: Studio Via Mentana ─────────────────────────────────────
    {
      id: "studio-via-mentana",
      airbnbUrl:
        "https://es.airbnb.com/rooms/1005789413503850183",
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7MVhN?logo=-1&info=0&fs=1&vr=1&sd=1&autorotate=0.16&thumbs=4&alpha=0.60&inst=0",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.3!2d12.4993!3d41.9042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a30bb10b65%3A0xe49a8f14a3f6f52c!2sCastro%20Pretorio%20(Metro%20B)!5e0!3m2!1sit!2sit!4v1",

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
      id: "residenza-nazionale",
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7MCLL?logo=-1&info=0&fs=1&vr=1&sd=1&autorotate=0.16&thumbs=4&alpha=0.60&inst=0",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.1!2d12.4981!3d41.9030!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a8b7a12345%3A0xabc123def456!2sBiblioteca+Nazionale+Centrale+di+Roma!5e0!3m2!1sit!2sit!4v1",

      hero: {
        title: {
          it: "Residenza Nazionale",
          en: "Residenza Nazionale",
          es: "Residenza Nazionale",
          de: "Residenza Nazionale",
        },
        subtitle: {
          it: "Eleganza e comfort nel cuore del quartiere accademico di Roma",
          en: "Elegance and comfort in the heart of Rome's academic district",
          es: "Elegancia y confort en el corazón del barrio académico de Roma",
          de: "Eleganz und Komfort im Herzen des akademischen Viertels Roms",
        },
      },

      description: {
        title: {
          it: "La Residenza",
          en: "The Residence",
          es: "La Residencia",
          de: "Die Residenz",
        },
        body: {
          it: "La residenza offre un'ampia camera da letto con letto matrimoniale, soggiorno separato e cucina completamente attrezzata. Dispone di bagno privato con doccia, armadio a muro e balcone con vista sul giardino interno.",
          en: "The residence offers a spacious bedroom with double bed, separate living area and fully equipped kitchen. It features a private bathroom with shower, built-in wardrobe and a balcony overlooking the inner garden.",
          es: "La residencia ofrece un amplio dormitorio con cama matrimonial, sala de estar independiente y cocina totalmente equipada. Cuenta con baño privado con ducha, armario empotrado y balcón con vista al jardín interior.",
          de: "Die Residenz bietet ein geräumiges Schlafzimmer mit Doppelbett, separaten Wohnbereich und voll ausgestattete Küche. Verfügt über Privatbad mit Dusche, Einbauschrank und Balkon mit Blick auf den Innengarten.",
        },
        amenityKeys: ["fridge", "kitchen", "bathroom", "wifi", "linens"],
      },

      location: {
        title: {
          it: "La Posizione",
          en: "Location",
          es: "Ubicación",
          de: "Lage",
        },
        subtitle: {
          it: "Viale Castro Pretorio, Roma",
          en: "Viale Castro Pretorio, Rome",
          es: "Viale Castro Pretorio, Roma",
          de: "Viale Castro Pretorio, Rom",
        },
        description: {
          it: "La residenza si trova di fronte alla Biblioteca Nazionale Centrale, nel tranquillo quartiere universitario di Castro Pretorio. A pochi metri dalla metro B e a breve distanza a piedi dai principali musei e attrazioni culturali di Roma.",
          en: "The residence is located opposite the National Central Library, in the quiet university district of Castro Pretorio. Steps from Metro B and a short walk from Rome's main museums and cultural attractions.",
          es: "La residencia se ubica frente a la Biblioteca Nazionale Centrale, en el tranquilo barrio universitario de Castro Pretorio. A metros del Metro B y a poca distancia caminando de los principales museos y atracciones culturales de Roma.",
          de: "Die Residenz liegt gegenüber der Nationalbibliothek, im ruhigen Universitätsviertel Castro Pretorio. Wenige Meter von der U-Bahn B und einem kurzen Spaziergang von Roms wichtigsten Museen und Kulturattraktionen entfernt.",
        },
        categories: [
          {
            key: "pizza",
            label: { it: "Pizzerie", en: "Pizza places", es: "Pizzerías", de: "Pizzerien" },
            places: [
              { name: { it: "Pizzeria Il Bibliofilo", en: "Pizzeria Il Bibliofilo", es: "Pizzeria Il Bibliofilo", de: "Pizzeria Il Bibliofilo" }, distance: "200" },
              { name: { it: "Forno Castro", en: "Forno Castro", es: "Forno Castro", de: "Forno Castro" }, distance: "480" },
            ],
          },
          {
            key: "restaurant",
            label: { it: "Ristoranti", en: "Restaurants", es: "Restaurantes", de: "Restaurants" },
            places: [
              { name: { it: "Trattoria Accademica", en: "Trattoria Accademica", es: "Trattoria Accademica", de: "Trattoria Accademica" }, distance: "300" },
              { name: { it: "Osteria del Sapere", en: "Osteria del Sapere", es: "Osteria del Sapere", de: "Osteria del Sapere" }, distance: "520" },
            ],
          },
          {
            key: "coffee",
            label: { it: "Caffè", en: "Coffee shops", es: "Cafés", de: "Cafés" },
            places: [
              { name: { it: "Caffè Nazionale", en: "Caffè Nazionale", es: "Caffè Nazionale", de: "Caffè Nazionale" }, distance: "150" },
              { name: { it: "Bar Universitario", en: "Bar Universitario", es: "Bar Universitario", de: "Bar Universitario" }, distance: "350" },
            ],
          },
          {
            key: "library",
            label: { it: "Biblioteche", en: "Libraries", es: "Bibliotecas", de: "Bibliotheken" },
            places: [
              { name: { it: "Biblioteca Nazionale Centrale", en: "National Central Library", es: "Biblioteca Nacional Central", de: "Nationalbibliothek" }, distance: "80" },
            ],
          },
          {
            key: "metro",
            label: { it: "Metro", en: "Metro", es: "Metro", de: "U-Bahn" },
            places: [
              { name: { it: "Metro B – Castro Pretorio", en: "Metro B – Castro Pretorio", es: "Metro B – Castro Pretorio", de: "U-Bahn B – Castro Pretorio" }, distance: "120" },
              { name: { it: "Metro A/B – Termini", en: "Metro A/B – Termini", es: "Metro A/B – Termini", de: "U-Bahn A/B – Termini" }, distance: "600" },
            ],
          },
          {
            key: "bus",
            label: { it: "Autobus", en: "Bus", es: "Colectivos", de: "Bus" },
            places: [
              { name: { it: "Via Castro Pretorio (linee 71, 492)", en: "Via Castro Pretorio (lines 71, 492)", es: "Via Castro Pretorio (líneas 71, 492)", de: "Via Castro Pretorio (Linien 71, 492)" }, distance: "100" },
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
            id: "lucia",
            author: "Lucía F.",
            country: "España",
            rating: 5,
            comment: {
              it: "Appartamento spettacolare di fronte alla Biblioteca Nazionale. Silenzioso, moderno e ottimamente posizionato. Il balcone con vista sul giardino è un plus incredibile.",
              en: "Spectacular apartment right across from the National Library. Quiet, modern and superbly located. The garden-view balcony is an incredible bonus.",
              es: "Apartamento espectacular frente a la Biblioteca Nacional. Silencioso, moderno y muy bien ubicado. El balcón con vista al jardín es un plus increíble.",
              de: "Spektakuläre Wohnung direkt gegenüber der Nationalbibliothek. Ruhig, modern und hervorragend gelegen. Der Balkon mit Gartenblick ist ein unglaubliches Highlight.",
            },
          },
          {
            id: "thomas",
            author: "Thomas K.",
            country: "Deutschland",
            rating: 5,
            comment: {
              it: "Ottimo appartamento vicino ai principali musei e università di Roma. La cucina ben attrezzata e il letto comodissimo. Lo consiglio al 100%.",
              en: "Excellent apartment near Rome's main museums and universities. Well-equipped kitchen and very comfortable bed. 100% recommended.",
              es: "Excelente apartamento cerca de los principales museos y universidades de Roma. La cocina bien equipada y la cama muy cómoda. Recomiendo al 100%.",
              de: "Ausgezeichnete Wohnung in der Nähe der wichtigsten Museen und Universitäten Roms. Gut ausgestattete Küche und sehr bequemes Bett. 100% empfehlenswert.",
            },
          },
          {
            id: "camille",
            author: "Camille R.",
            country: "France",
            rating: 5,
            comment: {
              it: "Un soggiorno perfetto. Il quartiere è tranquillo ma centrale, ideale per esplorare Roma a piedi. Torneremmo senza dubbio.",
              en: "A perfect stay. The neighborhood is quiet but central, ideal for exploring Rome on foot. We would definitely come back.",
              es: "Una estancia perfecta. El barrio es tranquilo pero céntrico, ideal para explorar Roma a pie. Volveríamos sin duda.",
              de: "Ein perfekter Aufenthalt. Das Viertel ist ruhig aber zentral, ideal um Rom zu Fuß zu erkunden. Wir würden definitiv wiederkommen.",
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
          it: "Prenota il tuo soggiorno alla Residenza Nazionale e vivi Roma come gli accademici di un tempo.",
          en: "Book your stay at Residenza Nazionale and experience Rome like the scholars of old.",
          es: "Reservá tu estadía en Residenza Nazionale y viví Roma como los académicos de antaño.",
          de: "Buchen Sie Ihren Aufenthalt in der Residenza Nazionale und erleben Sie Rom wie die Gelehrten von einst.",
        },
      },

      footerTagline: {
        it: "Cultura, storia e comfort nel cuore universitario di Roma",
        en: "Culture, history and comfort in the heart of Rome's academic district",
        es: "Cultura, historia y confort en el corazón universitario de Roma",
        de: "Kultur, Geschichte und Komfort im Herzen des akademischen Roms",
      },
    },
  ],
};

export default config;
