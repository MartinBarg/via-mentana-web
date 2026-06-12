import type { ClientConfig } from "../../lib/types/client";

const config: ClientConfig = {
  id: "finca-caballo-blanco",
  brandName: "Finca Caballo Blanco",
  brandLogoUrl: "/logo-finca-caballo-blanco.png",
  backgroundImageUrl: "/cabalgata.jpg",
  transparentNav: true,
  heroToursCount: 1,

  hero: {
    tagline: {
      it: "Esplora la finca in 360° e prenota il tuo soggiorno in tutta calma",
      en: "Take a 360° tour of the finca and book your stay at your own pace",
      es: "Recorrés la finca en 360° y reservás tu estadía sin apuros",
      de: "Erkunde die Finca in 360° und buchen Sie Ihren Aufenthalt in aller Ruhe",
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
  },

  properties: [
    {
      id: "habitacion-1",
      kuulaEmbedUrl:
        "https://kuula.co/share/collection/7TpZS?logo=-1&info=0&fs=1&vr=0&sd=1&gyro=0&thumbs=-1&alpha=0.60&inst=0&keys=0",
      googleMapsEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2000!2d3.036855!3d39.561988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1",

      hero: {
        title: {
          it: "Finca Caballo Blanco",
          en: "Finca Caballo Blanco",
          es: "Finca Caballo Blanco",
          de: "Finca Caballo Blanco",
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

      location: {
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
                  it: "Es Cruce",
                  en: "Es Cruce",
                  es: "Es Cruce",
                  de: "Es Cruce",
                },
                distance: "1800",
              },
              {
                name: {
                  it: "Sa Nostra Cuina",
                  en: "Sa Nostra Cuina",
                  es: "Sa Nostra Cuina",
                  de: "Sa Nostra Cuina",
                },
                distance: "900",
              },
            ],
          },
          {
            key: "coffee",
            label: {
              it: "Caffè",
              en: "Coffee shops",
              es: "Cafés",
              de: "Cafés",
            },
            places: [
              {
                name: {
                  it: "Bar Can Pieres",
                  en: "Bar Can Pieres",
                  es: "Bar Can Pieres",
                  de: "Bar Can Pieres",
                },
                distance: "600",
              },
              {
                name: {
                  it: "Bar Ca Na Poeta",
                  en: "Bar Ca Na Poeta",
                  es: "Bar Ca Na Poeta",
                  de: "Bar Ca Na Poeta",
                },
                distance: "750",
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
                  it: "Fermata Montuïri (linea 491 verso Palma)",
                  en: "Montuïri stop (line 491 to Palma)",
                  es: "Parada Montuïri (línea 491 a Palma)",
                  de: "Haltestelle Montuïri (Linie 491 nach Palma)",
                },
                distance: "1200",
              },
            ],
          },
        ],
      },

      reviews: {
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
      },

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
  ],
};

export default config;
