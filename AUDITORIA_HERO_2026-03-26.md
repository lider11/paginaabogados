# Auditoría técnica: falla visual del Hero

**Fecha:** 26-03-2026  
**Alcance:** diagnóstico del problema de fondo/contraste del Hero en producción.

## 1) Hallazgo principal

La falla del Hero **no es un único bug de JSX**, sino una combinación de **desalineación entre bundles JS y CSS estáticos** + **múltiples puntos de entrada** de frontend.

En términos prácticos: el Hero renderiza clases utilitarias (por ejemplo `bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-800`), pero el CSS servido en algunos despliegues no incluye todas esas utilidades, por lo que el panel queda sin degradado y el texto blanco pierde contraste.

---

## 2) Evidencia técnica

### 2.1 Selección de carpeta estática en backend

El backend prioriza `frontend/dist` por delante de `public` cuando ambos existen. Esto hace que diferentes entornos puedan servir frontend distinto según qué carpeta esté presente al deploy.

Referencia:
- `backend/server.js` (`candidateStaticDirs` y resolución de `staticDir`).

### 2.2 Existen dos index de SPA con assets distintos

- `frontend/dist/index.html` referencia `index-pFLezqas.js` + `index-gQj_t9sE.css`.
- `public/index.html` referencia `index-Biwjj21m.js` + `index-BMdKNx_n.css`.

Si el backend sirve una carpeta u otra, cambia el bundle activo y por tanto el set de clases requeridas.

### 2.3 Acumulación de assets versionados en `public/assets`

Se detectan múltiples pares históricos de `index-*.js/css` en `public/assets` (no solo el vigente), lo que incrementa riesgo de desalineación/caché/confusión operativa.

### 2.4 Bundle JS del Hero exige utilidades específicas

El bundle activo de `public/assets/index-Biwjj21m.js` usa clases de Hero como:
- `bg-gradient-to-br`
- `from-slate-950`
- `via-blue-900`
- `to-indigo-800`
- `text-blue-100/95`
- `bg-white/5`
- `shadow-blue-900/25`

Si cualquiera de estas no existe en el CSS cargado, el degradado o contraste se rompe.

---

## 3) Causa raíz (Root Cause)

### RCA-1: desacople entre JS servido y utilidades CSS disponibles
El Hero está escrito con utilidades que dependen de un catálogo CSS concreto; cuando el CSS servido no contiene esas utilidades, el fondo desaparece visualmente.

### RCA-2: doble origen de artefactos estáticos
Hay dos posibles frontend runtime (`frontend/dist` y `public`) con hashes distintos. Dependiendo del entorno/orden de carpetas, se sirve uno u otro.

### RCA-3: proceso de build/deploy no determinístico
El repositorio conserva múltiples artefactos compilados y no hay una regla fuerte de “single source of truth” para assets publicados.

### RCA-4: caché de navegador/CDN
Aunque se parchen archivos, el cliente puede seguir consumiendo CSS/JS en caché, perpetuando el síntoma.

---

## 4) Impacto

- Hero sin fondo degradado (se percibe “gris plano”).
- Texto principal con bajo contraste al quedar blanco sobre fondo claro.
- Degradación de percepción visual y confianza en primera impresión (bloque más importante de la landing).

---

## 5) Recomendaciones correctivas

## Prioridad alta (inmediata)

1. **Unificar origen estático**: definir una sola carpeta de publicación (`frontend/dist` *o* `public`) y eliminar ambigüedad.
2. **Limpiar assets obsoletos** en `public/assets` para mantener únicamente el par JS/CSS vigente.
3. **Versionar release id** en `index.html` y validar en `/api/version` para verificar qué build está en producción.
4. **Purge de caché** navegador/CDN tras cada deploy visual.

## Prioridad media (1 sprint)

5. **Pipeline determinístico**: build frontend + sync a destino único + checksum de assets.
6. **Smoke test de UI** post-deploy: validar que el Hero tiene `background-image != none` y contraste mínimo.
7. **Checklist de consistencia**: el CSS servido debe contener todas las clases críticas usadas por Hero/CTA.

## Prioridad estructural

8. Migrar gradientes críticos del Hero a clase semántica fija (`.hero-panel`) para reducir dependencia de utilidades dinámicas en compilados legacy.
9. Agregar monitoreo sintético (captura visual de hero) para detectar regresiones.

---

## 6) Conclusión ejecutiva

La falla del Hero se explica por **inconsistencia entre artefactos estáticos servidos y clases CSS requeridas por el JS activo**, agravada por una estrategia de despliegue con múltiples fuentes de frontend.  
No es solo “un color mal puesto”: es un problema de **gobierno de build/deploy de assets**.

