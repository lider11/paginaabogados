export const FUNNEL_EVENTS = {
  VIEW: 'view',
  START: 'start',
  QUALIFY: 'qualify',
  WHATSAPP_CLICK: 'whatsapp_click',
  SUBMIT_INTENT: 'submit_intent',
  BOOKED: 'booked'
};

export function trackFunnelEvent(eventName, payload = {}) {
  if (!window.gtag) return;

  window.gtag('event', eventName, {
    ...payload,
    funnel_version: 'v1_2026_03',
    page_path: window.location.pathname
  });
}
