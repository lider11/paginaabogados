# Taxonomía de eventos de embudo (v1_2026_03)

## Eventos estandarizados
- `view`: visualización de plantilla o ruta.
- `start`: inicio explícito de interacción de embudo.
- `qualify`: respuesta de clasificación del lead.
- `whatsapp_click`: clic en CTA de WhatsApp.
- `submit_intent`: intención de contacto enviada por canal.
- `booked`: proxy de cierre inicial (evento de booking/agenda).

## Campos comunes
Todos los eventos enviados por `trackFunnelEvent` incluyen:
- `funnel_version`
- `page_path`

## Fuentes instrumentadas
- `App.jsx`: `view`, `qualify`.
- `Hero.jsx`: `start` (A/B CTA principal).
- `ContactForm.jsx`: `start`, `whatsapp_click`, `submit_intent`.
- `Header.jsx`: `whatsapp_click`, `submit_intent`.
- `WhatsAppFunnelChatbot.jsx`: `start`, `qualify`, `whatsapp_click`, `submit_intent`, `booked`.

## KPI fase 2 vinculados
- **+20% CTR a WhatsApp:** `whatsapp_click / view`.
- **+15% completion de pre-cualificación:** usuarios que disparan `qualify` en los 3 campos clave.
- **-10% abandono en primer scroll:** usuarios con `start` (hero/chatbot/form) antes de salir sin `submit_intent`.
