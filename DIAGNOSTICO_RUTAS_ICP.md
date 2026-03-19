# Diagnóstico de funcionamiento de rutas ICP/persona

## Contexto
Se evaluó la funcionalidad de “Rutas por perfil” implementada en la landing (Ruta Empresas / Ruta Familias) en tres superficies:
1. SPA React (`frontend/src/App.jsx`).
2. Página estática (`public/index.html`).
3. Fallback embebido del backend (`backend/server.js`).

---

## 1) Diagnóstico actual

### 1.1 Lo que ya funciona bien
- **Rutas definidas por ICP** con propuesta de valor diferenciada para Empresas y Familias.
- **Prellenado del formulario** al hacer clic en una ruta (perfil, necesidad, urgencia).
- **Navegación al bloque de contacto** tras selección de ruta.
- **Integración con WhatsApp**: el mensaje se construye con datos de precalificación.
- **Paridad funcional razonable** entre SPA, estático y fallback embebido.

### 1.2 Fricciones detectadas
1. **Visibilidad de cambio percibido**
   - Aunque hay actualización de estado, para algunos usuarios no es suficientemente obvio que la acción se ejecutó.
   - Si la ruta seleccionada coincide con valores por defecto, la percepción de “no pasó nada” persiste.

2. **Dependencia de contexto de despliegue**
   - Hay diferencias de comportamiento según se sirva desde `frontend/dist`, `public/index.html` o fallback embebido.
   - Esto complica depuración y consistencia UX si el entorno no está claramente identificado.

3. **Sin persistencia de ruta seleccionada**
   - Si el usuario recarga, se pierde la selección de ruta.
   - No existe recuerdo de contexto (session/local storage o query params) para retomar el flujo.

4. **Ausencia de telemetría del micro-funnel de rutas**
   - No se mide cuántos usuarios hacen clic en cada ruta.
   - No se observa cuántos completan formulario ni cuántos abren WhatsApp por ruta.

5. **Estados y feedback no estandarizados**
   - Existen distintos patrones de feedback entre modos (SPA/estático/fallback).
   - No hay un único “estado de ruta activa” reusable de punta a punta.

---

## 2) Riesgo de negocio asociado
- **Pérdida de conversión** por falta de claridad en la interacción (usuarios no perciben efecto del clic).
- **Menor calidad de lead** al no asegurar continuidad de contexto de ruta.
- **Dificultad para optimizar** por ausencia de métricas por etapa del flujo de rutas.
- **Inconsistencia de marca/experiencia** cuando cambia el modo de servido.

---

## 3) Plan de mejoras (priorizado)

## Prioridad alta (0-2 semanas)
1. **Unificar estado de ruta activa**
   - Implementar una sola fuente de verdad por modo (objeto `routeState`) con:
     - `routeId`,
     - `label`,
     - `appliedAt`,
     - `source` (click/manual).

2. **Feedback UX inequívoco**
   - Añadir toast/alerta breve “Ruta X aplicada” + foco visual en formulario.
   - Resaltar temporalmente campos actualizados (2-3 segundos).

3. **Persistencia mínima de contexto**
   - Guardar `routeId` en `sessionStorage`.
   - Rehidratar al cargar y aplicar automáticamente al formulario.

4. **Paridad funcional obligatoria SPA/estático/fallback**
   - Definir checklist único de aceptación para los 3 modos.

## Prioridad media (2-4 semanas)
1. **Instrumentación de eventos**
   - Eventos sugeridos:
     - `route_selected` (route_id),
     - `route_applied` (form_prefilled=true),
     - `contact_scroll_reached`,
     - `whatsapp_opened` (route_id, perfil, urgencia),
     - `email_clicked`.

2. **Precalificación progresiva**
   - Mostrar campos avanzados solo tras selección de ruta.
   - Reducir carga cognitiva inicial y aumentar completion rate.

3. **URL con contexto**
   - Soporte a `?route=empresa|familia`.
   - Permitir campañas segmentadas y debugging más rápido.

## Prioridad estratégica (1-2 meses)
1. **A/B testing de rutas**
   - Test de copies por ICP.
   - Test de orden de bloques y ubicación de CTA por ruta.

2. **Scoring básico del lead**
   - Reglas simples por urgencia + necesidad + perfil para priorización comercial.

3. **Sincronización backend/comercial**
   - Estandarizar payload enviado a CRM/hoja de seguimiento.

---

## 4) Métricas objetivo de control
- **CTR en botones de ruta** (empresas vs familias).
- **% usuarios con ruta aplicada** sobre visitantes de sección rutas.
- **% apertura de WhatsApp tras ruta aplicada**.
- **Tiempo medio de ruta seleccionada a clic WhatsApp**.
- **Lead calificado (%)** por ruta.
- **Tasa de reunión agendada** por ruta.

---

## 5) Recomendación ejecutiva
La funcionalidad de rutas ya existe y aporta valor, pero hoy está en una etapa “operativa básica”. El mayor salto de rendimiento vendrá de convertirla en un flujo medible y persistente: selección clara, feedback inequívoco, conservación del contexto y analítica por etapa. Esto permitirá optimizar la calidad del lead y la conversión sin depender solo de cambios visuales.
