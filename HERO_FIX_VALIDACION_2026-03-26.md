# Validación de corrección del Hero (2026-03-26)

## 1) Resumen de cambios por archivo

- `backend/server.js`
  - Se añadió `STATIC_SOURCE` (default `public`) y prioridad determinística de directorios estáticos.
  - `/api/version` ahora incluye `staticSource`.

- `public/assets`
  - Se dejó un único par activo (`index-Biwjj21m.js` + `index-BMdKNx_n.css`).
  - Se eliminaron artefactos obsoletos para reducir desalineación JS/CSS.
  - Se añadió `ASSETS_MANIFEST.md` con política operativa.

- `scripts/validate-hero-css.sh`
  - Script de smoke check para validar presencia de clases críticas del Hero en CSS servido.

## 2) Root cause confirmado

La regresión visual del Hero fue causada por desalineación entre clases requeridas por el JS activo y utilidades disponibles en el CSS servido, además de ambigüedad por múltiples orígenes estáticos.

## 3) Comandos ejecutados (evidencia)

### A) Clases críticas del Hero en CSS público
```bash
./scripts/validate-hero-css.sh public/assets/index-BMdKNx_n.css
```
Resultado: **Faltantes: 0**.

### B) Clases críticas del Hero en CSS dist
```bash
./scripts/validate-hero-css.sh frontend/dist/assets/index-gQj_t9sE.css
```
Resultado: **Faltantes: 0**.

### C) Verificación de origen estático activo en runtime
```bash
node backend/server.js >/tmp/lexiuridicus.log 2>&1 & PID=$!; sleep 1; curl -s http://localhost:4000/api/version; kill $PID; wait $PID 2>/dev/null || true
```
Resultado esperado/observado:
- `"staticSource":"public"`
- `"staticDir":".../public"`

## 4) Riesgos pendientes y siguientes pasos

1. Forzar purge de caché CDN/browser en cada release visual.
2. Añadir smoke visual automatizado (captura Hero + contraste) en post-deploy.
3. Consolidar pipeline para regenerar y publicar un único par de assets en cada release.
