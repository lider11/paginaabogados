# Prompt recomendado para resolver definitivamente la falla del Hero

Usa este prompt en un agente técnico (IA o desarrollador) para ejecutar una corrección completa y verificable:

---

Eres un **ingeniero frontend/backend senior** encargado de corregir una regresión visual en producción.

## Contexto
- Proyecto: `Lexiuridicus` (React + Vite + Express).
- Problema: el bloque **Hero** aparece sin degradado (fondo gris/plano) y con texto de bajo contraste.
- Ya se detectó que existen **desalineaciones entre bundles JS/CSS** y múltiples orígenes estáticos (`frontend/dist` y `public`).

## Objetivo
Aplicar una solución **estable y definitiva** para que el Hero mantenga fondo/contraste correctos en todos los entornos (local, staging y producción) y evitar regresiones.

## Tareas obligatorias
1. **Unificar origen estático** de frontend:
   - Definir una sola fuente de publicación por defecto.
   - Dejar mecanismo explícito de override por variable de entorno.

2. **Eliminar desalineación JS/CSS**:
   - Verificar qué `index.html` y qué hashes `index-*.js/css` se sirven realmente.
   - Garantizar que las clases usadas por Hero existen en el CSS final servido.

3. **Robustecer Hero ante fallos de utilidades**:
   - Migrar estilos críticos del Hero (degradado y contraste) a clases semánticas estables.
   - Evitar dependencia exclusiva de utilidades frágiles en artefactos compilados legacy.

4. **Limpiar assets obsoletos**:
   - Mantener solo el par activo JS/CSS en carpeta pública.
   - Documentar política de assets para evitar acumulación de hashes viejos.

5. **Trazabilidad operativa**:
   - Exponer en endpoint de versión qué origen estático está activo.
   - Documentar pasos de diagnóstico rápido post-deploy.

## Criterios de aceptación
- El Hero renderiza degradado visible y contraste correcto en producción.
- `/api/version` indica claramente el `staticSource` y `staticDir` efectivos.
- Solo existe un par activo de assets públicos (sin archivos legacy sobrantes).
- Existe documentación corta de operación para el equipo.
- Se adjunta evidencia de validación (comandos ejecutados y resultado).

## Validación mínima a ejecutar
- Verificar rutas activas y origen estático.
- Confirmar presencia de clases críticas del Hero en CSS servido.
- Confirmar que no hay assets obsoletos en carpeta pública.
- Probar carga de `/` con hard refresh (sin caché).

## Formato de entrega esperado
1. Resumen de cambios por archivo.
2. Root cause confirmado.
3. Lista de comandos ejecutados (con salida breve).
4. Riesgos pendientes y siguientes pasos.

---

Si hay conflicto entre “corregir rápido” y “solución durable”, prioriza la solución durable con rollback simple.
