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
├── components/           # Un componente por sección de la página
│   ├── Navbar.tsx
│   ├── HeroSection.tsx   # Embed 360° de Kuula
│   ├── DescriptionSection.tsx
│   ├── LocationSection.tsx
│   ├── ReviewsSection.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── messages/             # Traducciones: it.json, en.json, es.json, de.json
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

## URLs externas hardcodeadas

- **Airbnb:** enlace de reserva en `HeroSection.tsx` y `CTASection.tsx`
- **Kuula:** embed 360° en `HeroSection.tsx`
- **Google Maps:** embed en `LocationSection.tsx`
- **Banderas:** CDN `flagcdn.com` en `Navbar.tsx`

## Lo que NO existe aún

- **Supabase:** hay un schema en `supabase/migrations/` pero no está conectado al frontend. Las reseñas son estáticas en `messages/*.json`.
- **Variables de entorno:** no hay `.env` — todo el contenido es estático.
- **API routes:** no hay ninguna en `/app/api/`.

## Convenciones de código

- Un componente por sección, sin lógica compartida compleja entre ellos
- Los textos siempre vienen de `messages/<locale>.json` — nunca hardcodeados en componentes
- Estilos con clases Tailwind directamente en JSX, sin CSS modules

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

Usar [Conventional Commits](https://www.conventionalcommits.org/):
```
tipo: qué se hizo y para qué se hizo
```
Ejemplos: `feat: add contact form to capture leads`, `fix: correct mobile menu z-index blocking CTA`

### Flujo típico

```bash
git checkout -b feature/mi-funcionalidad
# ... cambios ...
git commit -m "feat: descripción del cambio y su propósito"
git push origin feature/mi-funcionalidad
# Crear PR hacia master desde GitHub
```
