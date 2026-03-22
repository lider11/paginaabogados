# Auditoría inicial de accesibilidad (Fase 1 · Paso 3)

Fecha: **22 de marzo de 2026**

## Alcance auditado
- Navegación principal y menú móvil
- Sección de rutas (tab order completo)
- Formulario de contacto
- Toast de feedback
- Estados dinámicos de foco en chatbot
- Contraste de pares críticos y revisión en gradientes oscuros

## Automatización implementada
Se agregó el script `scripts/a11y-route-audit.js` y el comando:

- `npm run a11y:audit`

Este script valida automáticamente:
1. **Contraste AA** en pares críticos (texto/tarjetas/CTA/hero/footer).
2. **Tab order en rutas** (sin `tabIndex` positivo + semántica y jerarquía de foco).
3. **Foco dinámico chatbot** (semántica de diálogo, cierre por `Escape`, trampa de `Tab`, retorno de foco al launcher).

## Hallazgos críticos detectados
1. Mensajes toast sin región anunciable para tecnologías asistivas.
2. CTA de ruta sin `type="button"`.
3. Tarjetas de rutas sin relación heading-region explícita.
4. Formulario sin guía accesible de obligatoriedad y sin `required` en selects críticos.
5. Falta de política de reducción de movimiento.
6. Flujo de foco incompleto en estados dinámicos del chatbot.

## Correcciones implementadas
- Toast con `role="status"`, `aria-live="polite"`, `aria-atomic="true"`.
- `type="button"` en CTA de aplicación de ruta.
- `article` de rutas con `aria-labelledby` + título semántico `h3`.
- Texto de ayuda del formulario con `aria-describedby`.
- `required` en campos `perfil`, `necesidad`, `urgencia`.
- Regla global `prefers-reduced-motion: reduce`.
- Chatbot con:
  - `role="dialog"` + `aria-modal="false"`.
  - manejo de `Escape` para cierre.
  - trampa de foco con `Tab/Shift+Tab`.
  - retorno de foco al botón launcher al cerrar.

## Revisión de contraste AA/AAA sobre gradientes oscuros
- Se verificó cumplimiento **AA** en pares críticos definidos por script.
- La validación automatizada actual se centra en AA (4.5:1 para texto normal).
- Recomendación siguiente iteración: ampliar script para cobertura **AAA** en tipografía pequeña y estados hover/focus.

## Pendientes sugeridos (siguiente iteración)
- Auditoría de contraste por screenshot pixel-level en componentes complejos.
- Pruebas E2E de teclado en todo el sitio (no solo rutas + chatbot).
- Revisión manual con lector de pantalla (NVDA/VoiceOver) en journey completo.
