# Studio Via Mentana

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://via-mentana-web-web.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

Template white-label para landing pages de Airbnb. El cliente activo se selecciona via variable de entorno `CLIENT_ID` — un mismo repositorio puede servir múltiples propiedades en proyectos Vercel separados.

**Cliente actual:** Studio Via Mentana — un apartamento en Roma disponible en Airbnb. Sitio multiidioma con tour virtual 360°, mapa de ubicación y reseñas de huéspedes.

## Demo

🌐 **[Ver sitio en vivo](https://via-mentana-web-web.vercel.app/)**

## Características

- **White-label multi-cliente** — `CLIENT_ID` env var selecciona qué cliente cargar; un repo, N proyectos Vercel
- **Tour virtual 360°** — embed interactivo de Kuula para explorar el apartamento
- **Multiidioma** — Italiano, Inglés, Español y Alemán con detección automática de ruta
- **Diseño responsive** — mobile-first con menú hamburguesa en pantallas pequeñas
- **Secciones modulares** — descripción, amenidades, ubicación, POIs, reseñas y CTA — todas opcionales por propiedad
- **Deploy automático** — integración con Vercel en cada push a `master`

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Lenguaje | TypeScript 5 |
| i18n | next-intl 4 |
| Hosting | Vercel |

## Inicio rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/MartinBarg/via-mentana-web.git
cd via-mentana-web

# 2. Instalar dependencias
npm install

# 3. Configurar el cliente
cp .env.example .env.local
# Editar .env.local y setear CLIENT_ID=via-mentana (u otro cliente)

# 4. Levantar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000/it](http://localhost:3000/it) en el navegador.
Las rutas disponibles son `/it`, `/en`, `/es` y `/de`.

## Estructura del proyecto

```
pagina_web/
├── apps/
│   └── web/
│       ├── app/
│       │   └── [locale]/       # Rutas dinámicas por idioma
│       ├── clients/            # Config por cliente
│       │   └── via-mentana/    # Textos, URLs, reseñas de Via Mentana
│       ├── components/         # Navbar, Hero, PropertySections, Location, Reviews, CTA…
│       ├── lib/                # config.ts (carga cliente), utils.ts (loc), types/
│       ├── messages/           # UI chrome: labels, botones, nav (it, en, es, de)
│       └── i18n/               # Configuración de rutas e idiomas
├── supabase/
│   └── migrations/             # Schema de BD (integración futura)
├── .env.example                # Variables de entorno requeridas
├── vercel.json
└── package.json                # Workspace raíz
```

## Internacionalización

El sitio usa `next-intl` con routing dinámico por locale. Los idiomas disponibles se definen en `apps/web/i18n/routing.ts` y los textos en `apps/web/messages/<locale>.json`.

Para añadir un idioma nuevo:
1. Crear `apps/web/messages/<locale>.json` con todas las claves traducidas
2. Añadir el locale al array `locales` en `apps/web/i18n/routing.ts`

## Scripts disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo en `localhost:3000` |
| `npm run build` | Build de producción |
| `npm run lint` | Linting con ESLint |

## Deploy

El proyecto está conectado a **Vercel**. Cada push a `master` dispara un deploy automático.

Configuración requerida en cada proyecto Vercel:

| Variable | Valor |
|----------|-------|
| `CLIENT_ID` | `via-mentana` (o el id del cliente correspondiente) |

Para agregar un cliente nuevo: crear `apps/web/clients/<id>/config.ts` y registrarlo en `apps/web/lib/config.ts`.

## Roadmap

- [ ] Integración con Supabase para reseñas dinámicas y formulario de contacto
