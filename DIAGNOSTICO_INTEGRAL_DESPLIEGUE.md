# Diagnóstico integral de despliegue

Fecha: 21 de marzo de 2026

## Problema detectado
En producción se observó comportamiento inconsistente en rutas ICP (`/rutas/empresas`, `/rutas/familias`) cuando no existe un build SPA válido en `frontend/dist`.

## Hallazgo técnico
El backend depende de `tryServeRoutePage` para servir HTML legacy desde `public/rutas/*.html` como respaldo. Si los handlers de rutas ICP no están registrados, esas URLs pueden terminar en 404 o en un flujo que no corresponde al embudo esperado.

## Impacto
- Pérdida de continuidad de navegación en rutas ICP.
- Riesgo de caída de conversión en usuarios segmentados por ruta.
- Dificultad para validar despliegue si no existe build completo.

## Decisión de hotfix
Restaurar handlers explícitos para:
- `GET /rutas/:slug.html`
- `GET /rutas/:slug`

Con esto se mantiene compatibilidad con la versión legacy de `public/rutas/*` y se evita bloqueo del embudo cuando el build SPA no está disponible.

## Recomendaciones
1. Mantener este hotfix como capa de compatibilidad.
2. Garantizar en CI/CD que `npm run build` genera `frontend/dist` en cada release.
3. Monitorear 404 y rutas ICP en logs post-despliegue.
4. Evolucionar a estrategia SPA pura solo cuando haya garantía de build + rollback.
