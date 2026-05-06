# Studio Via Mentana — Contexto del proyecto

Landing page de marketing para un apartamento Airbnb en Roma. Sitio estático, one-pager, multiidioma. **No hay backend activo ni API calls propios.**

Sitio live: https://via-mentana-web-web.vercel.app/
Repo: https://github.com/MartinBarg/via-mentana-web

## Stack

- **Next.js 16** con App Router
- **React 19** + **TypeScript 5** (strict mode)
- **Tailwind CSS 4** con `@theme` en `globals.css`
- **next-intl 4** para internacionalización
- **Vercel** para deploy (automático en cada push a `master`)

## Comandos

```bash
npm install          # instalar dependencias (workspace raíz)
npm run dev          # servidor en localhost:3000
npm run build        # build de producción
npm run lint         # ESLint
```

La app corre en `apps/web/` pero los scripts del workspace raíz (`package.json`) ya la apuntan correctamente. No hace falta `cd apps/web`.

## Estructura relevante

```
apps/web/
├── app/[locale]/         # Rutas dinámicas por idioma (page.tsx, layout.tsx)
├── clients/              # Un directorio por cliente
│   └── via-mentana/
│       └── config.ts     # Config completo del cliente (textos en 4 idiomas, URLs, reseñas)
├── components/           # Un componente por sección de la página
│   ├── Navbar.tsx
│   ├── HeroSection.tsx   # Embed 360° de Kuula
│   ├── PropertySections.tsx  # Wrapper que renderiza secciones por propiedad
│   ├── DescriptionSection.tsx
│   ├── LocationSection.tsx
│   ├── ReviewsSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── lib/
│   ├── config.ts         # Carga el config del cliente (server-only, usa CLIENT_ID)
│   ├── utils.ts          # loc(str, locale) — resuelve textos multiidioma
│   └── types/
│       └── client.ts     # Tipos TypeScript: ClientConfig, PropertyConfig, etc.
├── messages/             # Solo UI chrome: it.json, en.json, es.json, de.json
├── i18n/
│   ├── routing.ts        # Define locales y defaultLocale
│   └── request.ts        # Carga mensajes por locale
├── app/globals.css       # Paleta de colores y tipografía (Tailwind @theme)
├── proxy.ts              # Middleware next-intl (renombrado desde middleware.ts)
└── next.config.ts
```

## Internacionalización

- Locales: `it` (default), `en`, `es`, `de`
- Para añadir un idioma: crear `messages/<locale>.json` y agregarlo al array `locales` en `i18n/routing.ts`
- Las rutas son `/it`, `/en`, `/es`, `/de` — la raíz `/` redirige al locale default

## Paleta de colores

Definida en `app/globals.css` con variables Tailwind:

| Variable | Valor | Uso |
|----------|-------|-----|
| `ivory` | `#F5F4F1` | Fondo principal |
| `terracotta` | `#C8956C` | Acentos, CTAs |
| `terracotta-dark` | `#A97550` | Hover states |
| `charcoal` | `#1C1C1A` | Texto principal |
| `warm-gray` | `#6B6560` | Texto secundario |
| `ochre` | `#8B7355` | Bordes, detalles |

Tipografía: **Playfair Display** (headings) + **Inter** (body), cargadas desde Google Fonts.

## URLs del cliente

Las URLs ya no están hardcodeadas en componentes. Viven en `clients/<id>/config.ts`:

- **Airbnb:** `property.airbnbUrl`
- **Kuula:** `property.kuulaEmbedUrl`
- **Google Maps:** `property.googleMapsEmbedUrl`
- **Banderas:** CDN `flagcdn.com` en `Navbar.tsx` (esta sí es fija, es infraestructura)

## Variables de entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `CLIENT_ID` | Identificador del cliente a cargar (ej: `via-mentana`) | Sí (default: `via-mentana`) |

Ver `.env.example` en la raíz del repo.

## Lo que NO existe aún

- **Supabase:** hay un schema en `supabase/migrations/` pero no está conectado al frontend. Las reseñas son estáticas en `clients/<id>/config.ts`.
- **API routes:** no hay ninguna en `/app/api/`.

## Convenciones de código

- Un componente por sección, sin lógica compartida compleja entre ellos
- El **contenido** (títulos, descripciones, reseñas, URLs) viene de `clients/<id>/config.ts` via props
- Los **textos de UI** (labels de botones, nav links, etiquetas fijas) vienen de `messages/<locale>.json`
- Los componentes usan `loc(str, locale)` de `lib/utils.ts` para resolver textos multiidioma del config
- Estilos con clases Tailwind directamente en JSX, sin CSS modules
- Agregar un cliente nuevo = crear `clients/<nuevo-id>/config.ts` + agregar una línea en `lib/config.ts`

## Workflow de Git

**Nunca commitear directamente a `master`.** Toda funcionalidad se trabaja en su propia rama.

### Nomenclatura de ramas

| Prefijo | Cuándo usarlo |
|---------|--------------|
| `feature/<descripcion>` | Nueva funcionalidad |
| `fix/<descripcion>` | Corrección de bug |
| `hotfix/<descripcion>` | Fix urgente en producción |
| `docs/<descripcion>` | Solo documentación |
| `refactor/<descripcion>` | Refactor sin cambio funcional |
| `chore/<descripcion>` | Mantenimiento, dependencias, config |

Referencia: [Branch naming best practices](https://gist.github.com/kmilodenisglez/19640d4131a92a3dd53c215af31d55ee)

### Commits

Usar [Conventional Commits](https://www.conventionalcommits.org/). Formato:

```
tipo: qué se hizo

// para qué se hizo
```

Ejemplos:
```
feat: add tour visit tracking per property

// para poder medir el engagement de usuarios en cada tour
```
```
fix: correct mobile menu z-index

// para que el botón CTA sea siempre accesible en mobile
```

### Flujo típico

1. Crear rama y hacer los cambios
2. Correr `/update-docs` para actualizar README.md, CLAUDE.md y decisiones-tomadas.md
3. Commitear código + docs juntos en la misma rama
4. Correr `/review` para revisar antes de abrir la PR
5. Repetir 1-4 si hay correcciones
6. Push y PR — el merge lo hace el usuario desde GitHub

```bash
git checkout -b feature/mi-funcionalidad
# ... cambios de código ...
# /update-docs (actualiza docs)
git add .
git commit -m "feat: qué se hizo

// para qué se hizo"
git push origin feature/mi-funcionalidad
```
