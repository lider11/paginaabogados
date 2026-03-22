# Auditoría inicial de accesibilidad (Fase 1 · Paso 3)

Fecha: **22 de marzo de 2026**

## Alcance auditado
- Navegación principal y menú móvil
- Sección de rutas
- Formulario de contacto
- Toast de feedback
- Comportamiento de movimiento/animaciones

## Hallazgos críticos detectados
1. **Mensajes toast sin región anunciable** para tecnologías asistivas.
2. **Botón de “Aplicar ruta” sin `type="button"`** (riesgo de submit accidental al integrarse dentro de formularios futuros).
3. **Tarjetas de rutas sin relación explícita heading-region** para navegación estructural.
4. **Formulario sin guía accesible de obligatoriedad** y sin atributos requeridos en selects clave.
5. **No había política de reducción de movimiento** para usuarios con `prefers-reduced-motion`.

## Correcciones implementadas
- Toast con `role="status"`, `aria-live="polite"` y `aria-atomic="true"`.
- `type="button"` en CTA de aplicación de ruta.
- `article` de rutas con `aria-labelledby` + títulos de tarjeta en `h3`.
- Texto de ayuda para formulario con `aria-describedby`.
- `required` en campos de selección críticos (perfil, necesidad, urgencia).
- Regla global `prefers-reduced-motion: reduce` para atenuar animaciones/transiciones.

## Pendientes sugeridos (siguiente iteración)
- Auditoría automatizada de contraste y tab order por ruta completa.
- Validación de foco en estados dinámicos del chatbot.
- Revisión de contraste AA/AAA sobre gradientes oscuros.
