# Diagnóstico 2026 del sitio Lexiuridicus

Fecha de diagnóstico: **22 de marzo de 2026**.

## 1) Resumen ejecutivo

El sitio tiene una base sólida de conversión (hero claro, rutas por perfil, CTA a WhatsApp y formulario de pre-calificación), pero aún está en un nivel **MVP comercial** frente a estándares 2026 en diseño web, performance y gobernanza digital.

**Nivel actual estimado:** 6/10  
**Objetivo recomendado (90 días):** 8.5/10

---

## 2) Diagnóstico por estándar 2026

## A. UX y Conversión (CRO)

### Hallazgos
- Existe propuesta de valor clara y CTA principal visible en hero.
- Hay dos embudos paralelos (formulario y chatbot/WhatsApp), pero no hay orquestación unificada de journey.
- No se observa una página/estado de confirmación con seguimiento de conversiones por canal.

### Riesgo
- Fuga de leads por duplicidad de caminos y falta de micro-estados de avance (ej. paso completado, expectativa de respuesta, SLA visible por canal).

### Recomendación 2026
- Diseñar un **funnel unificado omnicanal** (web form + WhatsApp + email) con eventos y estado de lead en una sola taxonomía.

---

## B. Diseño visual y sistema UI

### Hallazgos
- Diseño visual moderno y consistente en secciones clave.
- Mezcla de estilos utilitarios y CSS manual.
- No se evidencia tokenización formal (color/espaciado/tipografía/estados) como Design System.

### Riesgo
- Escalabilidad limitada para nuevas páginas/rutas y mayor deuda visual.

### Recomendación 2026
- Crear **Design Tokens** y librería de componentes (botones, cards, inputs, alertas, badges, CTA flotante).

---

## C. Accesibilidad (A11y)

### Hallazgos
- Hay prácticas positivas: `aria-label` en menú móvil, skip-link, foco visible en varios elementos.
- Falta estandarizar accesibilidad en todo el funnel: validaciones con mensajes accesibles, contraste auditado, y navegación por teclado en todos los componentes interactivos.

### Riesgo
- Cumplimiento parcial y posible fricción para usuarios con necesidades de asistencia.

### Recomendación 2026
- Objetivo mínimo: **WCAG 2.2 AA** de punta a punta (navegación, formularios, estados, feedback).

---

## D. Performance y Core Web Vitals

### Hallazgos
- Se entrega SPA con bundling correcto y hash de assets.
- Se utiliza Tailwind vía CDN en `index.html` (debe evitarse en producción).
- No hay presupuesto de performance explícito (LCP/INP/CLS por plantilla).

### Riesgo
- Variación de rendimiento en móvil/redes lentas.

### Recomendación 2026
- Pasar a build local de estilos (sin CDN), definir **performance budgets** y monitoreo continuo de CWV por release.

---

## E. SEO técnico y discoverability

### Hallazgos
- Hay metadatos básicos (title, description, OG/Twitter).
- No se observa estrategia robusta de Schema.org por tipo de servicio legal ni contenido transaccional por intención.

### Riesgo
- Menor visibilidad orgánica para búsquedas de intención alta (servicios jurídicos específicos).

### Recomendación 2026
- Implementar **SEO programático moderado**: páginas por servicio/ruta con schema estructurado, FAQ, y enlazado interno por clúster.

---

## F. Analítica, privacidad y medición

### Hallazgos
- Existen eventos `gtag` en puntos clave.
- No se evidencia diccionario formal de eventos, gobierno de naming o consentimiento granular.

### Riesgo
- Datos incompletos/inconsistentes para optimización de adquisición.

### Recomendación 2026
- Definir plan de medición (GA4 + servidor + CRM), consentimiento y trazabilidad de lead por canal.

---

## 3) Plan de implementación (90 días)

## Fase 1 (Semanas 1-3): Base técnica y calidad
**Objetivo:** estabilizar performance, accesibilidad y medición.

1. Migrar estilos Tailwind CDN a pipeline local del frontend.
2. Definir performance budget por plantilla:
   - LCP < 2.5s (móvil p75)
   - INP < 200ms (móvil p75)
   - CLS < 0.1
3. Auditoría A11y inicial y corrección de issues críticos (teclado, contraste, etiquetas, errores de formulario).
4. Estandarizar taxonomía de eventos de embudo (view, start, qualify, whatsapp_click, submit_intent, booked).

**Entregables:**
- Checklist A11y AA base
- Dashboard de CWV y funnel
- Guía de eventos v1

---

## Fase 2 (Semanas 4-7): Funnel y confianza
**Objetivo:** aumentar tasa de contacto efectivo.

1. Unificar chatbot + formulario en journey de un solo estado de lead.
2. Agregar mensajes de expectativa y SLA (ej. “respondemos en < 30 min hábil”).
3. Implementar prueba A/B en CTA principal (copy + ubicación + sticky behavior).
4. Añadir bloque de confianza verificable (casos, testimonios validados, credenciales profesionales).

**KPIs meta fase 2:**
- +20% CTR a WhatsApp
- +15% completion de pre-cualificación
- -10% abandono en primer scroll

---

## Fase 3 (Semanas 8-12): Escala SEO + sistema de diseño
**Objetivo:** escalar captación orgánica y consistencia de producto.

1. Implementar Design Tokens y librería de componentes reusable.
2. Crear plantillas SEO para páginas de servicio (intención transaccional).
3. Añadir schema estructurado (Organization, LegalService, FAQ, Breadcrumb).
4. Automatizar QA de release (Lighthouse CI + tests de regresión visual + smoke tests de rutas críticas).

**KPIs meta fase 3:**
- +25% sesiones orgánicas en páginas de servicio
- +15% leads orgánicos calificados
- Score Lighthouse (mobile): Perf > 85, A11y > 95, SEO > 95

---

## 4) Backlog priorizado (Impacto vs Esfuerzo)

## Quick wins (alto impacto / bajo esfuerzo)
- Migrar Tailwind CDN a build local.
- Añadir estado de éxito post-WhatsApp con próximos pasos.
- Normalizar nomenclatura de eventos analytics.
- Corregir enlaces sociales placeholder por URLs reales.

## Proyectos estratégicos (alto impacto / esfuerzo medio-alto)
- Funnel omnicanal unificado con tracking end-to-end.
- Design system con tokens y gobernanza.
- SEO por clúster de servicios legales + schema.

---

## 5) Riesgos y mitigación

- **Riesgo:** crecer en features sin sistema UI → **Mitigación:** design tokens desde sprint 1.
- **Riesgo:** decisiones por intuición sin datos limpios → **Mitigación:** plan de medición y gobernanza de eventos.
- **Riesgo:** degradación de performance por iteraciones rápidas → **Mitigación:** performance budget bloqueante en CI.

---

## 6) Próximo paso sugerido

Iniciar una **semana 0** de alineación (producto, legal, marketing, tecnología) para aprobar:
1. KPI norte del funnel.
2. Taxonomía de eventos.
3. Roadmap técnico de Fase 1.

---

## 7) Estado de implementación (avance)

### Fase 1 · Tarea 2 (Performance budget por plantilla) ✅
Se implementó configuración operativa en el repositorio:

- Archivo `performance-budgets.json` con presupuestos por plantilla (`home`, `ruta`, `default`):
  - `lcp_ms`: 2500
  - `inp_ms`: 200
  - `cls`: 0.1
- Script `scripts/check-performance-budget.js` para evaluar reportes Lighthouse JSON y fallar CI si excede budget.
- Scripts npm:
  - `npm run perf:budget`
  - `npm run perf:budget:help`

> Requisito de ejecución: disponer de reportes Lighthouse JSON en `.reports/lighthouse/`.


### Fase 1 · Paso 3 (Auditoría A11y inicial y correcciones críticas) ✅
Se ejecutó una auditoría inicial y se dejó evidencia en `ACCESSIBILITY_AUDITORIA_FASE1.md`, incluyendo correcciones críticas en componentes clave (toast, rutas, formulario, reducción de movimiento y foco dinámico de chatbot). Además, se automatizó una primera verificación con `npm run a11y:audit` (contraste AA, tab order en rutas y foco dinámico del chatbot).
