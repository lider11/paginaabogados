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
- `ContactForm.jsx`: `start`, `whatsapp_click`, `submit_intent`.
- `Header.jsx`: `whatsapp_click`, `submit_intent`.
- `WhatsAppFunnelChatbot.jsx`: `qualify`, `whatsapp_click`, `submit_intent`, `booked`.
