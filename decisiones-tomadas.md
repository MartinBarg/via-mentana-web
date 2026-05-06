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
