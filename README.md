# Studio Via Mentana

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://via-mentana-web-web.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

Landing page para **Studio Via Mentana**, un apartamento en Roma disponible en Airbnb. Sitio multiidioma con tour virtual 360°, mapa de ubicación y reseñas de huéspedes.

## Demo

🌐 **[Ver sitio en vivo](https://via-mentana-web-web.vercel.app/)**

## Características

- **Tour virtual 360°** — embed interactivo de Kuula para explorar el apartamento
- **Multiidioma** — Italiano, Inglés, Español y Alemán con detección automática de ruta
- **Diseño responsive** — mobile-first con menú hamburguesa en pantallas pequeñas
- **Secciones completas** — descripción, amenidades, ubicación, puntos de interés, reseñas y CTA de reserva
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

# 3. Levantar el servidor de desarrollo
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
│       ├── components/         # Navbar, Hero, Location, Reviews, CTA…
│       ├── messages/           # Traducciones JSON (it, en, es, de)
│       └── i18n/               # Configuración de rutas e idiomas
├── supabase/
│   └── migrations/             # Schema de BD (integración futura)
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

El proyecto está conectado a **Vercel**. Cada push a `master` dispara un deploy automático. No se requiere configuración adicional — Next.js es detectado automáticamente.

## Roadmap

- [ ] Integración con Supabase para reseñas dinámicas y formulario de contacto
