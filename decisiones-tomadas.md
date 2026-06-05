# Decisiones tomadas

Registro de decisiones arquitectónicas con su contexto y rationale. Útil para entender por qué el proyecto está estructurado como está.

---

## Arquitectura white-label: un repo, múltiples clientes
**Fecha:** 2026-05-05
**PR:** #5

**Qué se decidió:** Mantener todo el template y todos los configs de clientes en un único repositorio. Cada cliente tiene su carpeta `clients/<id>/config.ts`. Un proyecto Vercel por cliente apunta al mismo repo con una variable de entorno `CLIENT_ID` distinta.

**Por qué:** Permite mantener el template (componentes, estilos, i18n) en un único lugar. Un fix o mejora al template beneficia automáticamente a todos los clientes en el próximo deploy. No hay que sincronizar cambios entre repos.

**Alternativas descartadas:**
- *Fork por cliente* — genera N repos que hay que mantener en sync manualmente cuando cambia el template. Escala muy mal.
- *Monorepo con una app por cliente* — más complejo de configurar, overkill para el tamaño actual del proyecto.

---

## Contenido en config del cliente, no en messages JSON
**Fecha:** 2026-05-05
**PR:** #5

**Qué se decidió:** Los textos de contenido (títulos, descripciones, reseñas, URLs de Airbnb/Kuula/Maps) viven en `clients/<id>/config.ts` como `LocalizedString` con las 4 locales. Los archivos `messages/*.json` se reservan únicamente para UI chrome: labels de botones, links del nav, etiquetas fijas.

**Por qué:** Cada cliente tiene su propio contenido — no tiene sentido mezclarlo en los archivos de traducción globales. Además, el contenido del cliente no debería cambiar si se agrega un idioma nuevo al template.

**Alternativas descartadas:**
- *Todo en messages JSON con prefijo por cliente* — contamina los archivos de i18n con contenido de negocio, hace difícil agregar un cliente sin tocar archivos globales.

---

## Config del hero a nivel cliente (`ClientHeroConfig`), separado de `PropertyConfig`
**Fecha:** 2026-05-15
**PR:** #21

**Qué se decidió:** La configuración de la sección hero (tagline, CTA, zonas de filtro) vive en `ClientConfig.hero` como `ClientHeroConfig`, no dentro de cada `PropertyConfig`. Las propiedades solo declaran `zone` (id de zona) y opcionalmente `hero.ctaLabel` / `hero.ctaUrl` para sobreescribir su entrada en el dropdown multi-CTA.

**Por qué:** El tagline, el botón CTA y las opciones de zona son conceptos del cliente como conjunto, no de una propiedad individual. Ponerlos en `ClientConfig` evita duplicar los mismos valores en cada propiedad y hace que agregar una nueva propiedad a un cliente existente no requiera tocar la configuración del hero.

**Alternativas descartadas:**
- *Tagline y CTA en `PropertyConfig`* — obliga a repetir los mismos valores en cada propiedad del mismo cliente; el filtro de zonas tampoco tiene sentido en una propiedad individual.
- *CTA siempre como lista desplegable* — para clientes con una sola propiedad, un link directo es más simple y no requiere un menú. El modo `ctaSingle` / multi-CTA hace ambos casos sin bifurcaciones en el componente.

---

## Una sola instancia de cada sección; contenido reactivo a la propiedad seleccionada
**Fecha:** 2026-05-20
**PR:** #31

**Qué se decidió:** La página tiene exactamente una instancia de cada sección (Hero → Detalles → Ubicación → Reseñas → CTA → Footer), sin importar cuántas propiedades tenga el cliente. El contenido de las secciones (descripción, ubicación, reseñas, CTA) se actualiza reactivamente cuando el usuario selecciona una propiedad distinta en el hero. El footer negro no tiene CTA — ese rol pertenece únicamente a `CTASection` (la sección beige antes del footer).

**Por qué:** Renderizar una `PropertySections` por cada propiedad (el enfoque anterior) duplicaba las secciones en la página. La selección en el hero es una decisión de navegación, no de layout: el usuario elige qué propiedad ver, y el contenido abajo se actualiza en lugar de apilarse.

El footer sin CTA evita redundancia: el usuario ya vio el botón de reserva en `CTASection` justo antes. El footer es navegación de cierre (volver arriba), no conversión.

**Nota técnica:** `PropertySections` y sus hijos son stateless (sin `useState`). Por eso no se usa `key` para forzar remount al cambiar propiedad — React actualiza props in-place. Si algún hijo suma estado interno en el futuro, agregar `key={selectedProperty.id}` en `PageBody.tsx` para resetear ese estado al cambiar propiedad.

**Alternativas descartadas:**
- *Renderizar todas las propiedades y mostrar/ocultar con CSS* — deja todo el DOM montado, complica accesibilidad y scroll, y no escala bien con muchas propiedades.
- *CTA en el footer* — genera dos llamados a la acción en pantallas cercanas; el footer queda sobrecargado y pierde su rol de cierre limpio.

---

## Lazy-load de iframes Kuula con unload al salir del viewport
**Fecha:** 2026-06-05
**PR:** #45

**Qué se decidió:** Los iframes de Kuula en `TourCard` se cargan via `IntersectionObserver` con threshold 15%: el atributo `src` se setea cuando la card entra al viewport y se limpia (`undefined`) cuando sale. El threshold 15% se calculó a partir del layout real (`w-[75vw]`, `gap-5`, `pr-4` en el contenedor del carrusel mobile) y garantiza que nunca haya más de 2 iframes WebGL activos simultáneamente en ningún dispositivo mobile hasta 767px.

**Por qué:** Con 3+ propiedades (cliente `andreas-properties`), todos los iframes arrancaban a la vez. Cada uno inicializa un contexto WebGL y carga texturas 3D. En iOS Safari el tercer iframe reventaba el límite de memoria del tab y el OS mataba la página con el error "ocurrió un problema varias veces".

**Alternativas descartadas:**
- *Lazy-load sin unload (solo cargar al entrar, nunca descargar)* — eventualmente los 3 iframes quedan activos al mismo tiempo cuando el usuario scrollea toda la lista. No resuelve el problema de fondo.
- *Solo cargar la card seleccionada/activa* — funciona, pero implica que cada cambio de selección recarga el tour desde cero. En conexiones lentas el UX se degrada notablemente.
- *Reemplazar con thumbnail estático en mobile* — elimina el problema pero también elimina el "wow factor" del tour 3D en mobile, que es parte del producto.
