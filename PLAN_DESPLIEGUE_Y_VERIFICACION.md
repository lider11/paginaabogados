# Plan de despliegue y verificación

## Objetivo
Asegurar que las rutas ICP funcionen tanto en modo SPA como en modo fallback legacy.

## Pasos de despliegue
1. Instalar dependencias:
   ```bash
   npm ci
   ```
2. Build + sync de estáticos:
   ```bash
   npm run build
   ```
3. Levantar servicio backend:
   ```bash
   npm start
   ```

## Verificación funcional
Ejecutar:
```bash
curl -i https://TU-DOMINIO/rutas/empresas
curl -i https://TU-DOMINIO/rutas/familias
curl -i https://TU-DOMINIO/api/health
curl -i https://TU-DOMINIO/api/version
```

## Resultado esperado
- `/rutas/empresas` y `/rutas/familias` retornan HTML válido (status 200).
- `/api/health` responde con `status: ok` y `staticDir`.
- `/api/version` responde con versión activa (`appVersion`).

## Checklist post-release
- [ ] No hay 404 en rutas ICP.
- [ ] Hero y copy esperados visibles.
- [ ] CTA de rutas navega correctamente.
- [ ] Embudo de contacto (WhatsApp/email) funcional.

## Troubleshooting rápido
- Si hay 404 en rutas ICP, verificar presencia de `public/rutas/*.html`.
- Si se ve versión vieja, limpiar cache CDN/browser y validar `x-ui-version` en HTML.
- Si falla SPA, confirmar que `public/assets/*` fue sincronizado durante build.
