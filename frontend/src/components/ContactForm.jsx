import { useState } from 'react';
import { FUNNEL_EVENTS, trackFunnelEvent } from '../utils/analytics';

export default function ContactForm({ leadForm, onLeadFormChange, diagnosticOffer, whatsappLink, email }) {
  const [didStartForm, setDidStartForm] = useState(false);

  const handleWhatsappClick = () => {
    trackFunnelEvent(FUNNEL_EVENTS.WHATSAPP_CLICK, {
      channel: 'whatsapp',
      perfil: leadForm.perfil
    });

    trackFunnelEvent(FUNNEL_EVENTS.SUBMIT_INTENT, {
      channel: 'whatsapp',
      perfil: leadForm.perfil,
      urgencia: leadForm.urgencia
    });
  };

  const handleEmailClick = () => {
    trackFunnelEvent(FUNNEL_EVENTS.SUBMIT_INTENT, {
      channel: 'email',
      perfil: leadForm.perfil,
      urgencia: leadForm.urgencia
    });
  };

  const handleFormStart = () => {
    if (didStartForm) return;

    setDidStartForm(true);
    trackFunnelEvent(FUNNEL_EVENTS.START, {
      start_source: 'contact_form',
      form_name: 'precalificacion'
    });
  };

  const whatsappPrefill = encodeURIComponent(
    [
      'Hola, quiero agendar el diagnóstico legal inicial.',
      `Perfil: ${leadForm.perfil}`,
      `Necesidad: ${leadForm.necesidad}`,
      `Urgencia: ${leadForm.urgencia}`,
      `Ciudad: ${leadForm.ciudad || 'No especificada'}`
    ].join('\n')
  );
  const whatsappLeadLink = `${whatsappLink}?text=${whatsappPrefill}`;

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-5 pb-16 pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-blue-50/80 p-6 shadow-sm xl:p-12">
        <div className="absolute right-0 top-0 -mr-10 -mt-10 h-64 w-64 rounded-full bg-blue-200 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-indigo-200 opacity-30 blur-3xl"></div>

        <div className="relative z-10 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-blue-900">Agenda tu diagnóstico legal en 30 minutos</h2>
            <p className="mb-2 text-lg text-slate-700">Cuéntanos tu caso y te responderemos hoy mismo con la mejor ruta de acción.</p>
            <p className="mb-8 text-sm font-semibold text-blue-800">SLA: respondemos en &lt; 30 min hábil por WhatsApp.</p>

            <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-900">Oferta de entrada</p>
              <p className="mb-5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-base font-medium text-slate-800">{diagnosticOffer}</p>
              <ul className="space-y-4">
                <li className="flex items-start text-sm leading-snug text-slate-700"><span className="mr-3 font-bold text-blue-500">✓</span> Incluye evaluación de riesgos y prioridades legales para no improvisar.</li>
                <li className="flex items-start text-sm leading-snug text-slate-700"><span className="mr-3 font-bold text-blue-500">✓</span> Definimos próximos pasos, tiempos de ejecución y documentos críticos.</li>
                <li className="flex items-start text-sm leading-snug text-slate-700"><span className="mr-3 font-bold text-blue-500">✓</span> Aplica para empresas y familias con requerimientos preventivos o urgentes.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-1 text-xl font-bold text-blue-900">Comienza en 1 minuto</h3>
            <p className="mb-8 text-sm text-slate-500">Completas estos datos una sola vez y enviamos el contexto para acelerar tu asesoría.</p>

            <p id="contact-form-help" className="mb-6 text-xs text-slate-500">Todos los campos desplegables son obligatorios. Ciudad es opcional.</p>

            <div className="mb-8 grid gap-5 sm:grid-cols-2" aria-describedby="contact-form-help">
              <div className="block text-sm font-semibold text-slate-700">
                <label htmlFor="lead-perfil">Perfil</label>
                <select
                  id="lead-perfil"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                  required
                  value={leadForm.perfil}
                  onFocus={handleFormStart}
                  onChange={(e) => onLeadFormChange({ perfil: e.target.value })}
                >
                  <option>Empresa</option>
                  <option>Familia</option>
                </select>
              </div>
              <div className="block text-sm font-semibold text-slate-700">
                <label htmlFor="lead-necesidad">Necesidad principal</label>
                <select
                  id="lead-necesidad"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                  required
                  value={leadForm.necesidad}
                  onFocus={handleFormStart}
                  onChange={(e) => onLeadFormChange({ necesidad: e.target.value })}
                >
                  <option>Prevención legal</option>
                  <option>Urgencia legal</option>
                  <option>Revisión contractual</option>
                  <option>Protección patrimonial</option>
                </select>
              </div>
              <div className="block text-sm font-semibold text-slate-700">
                <label htmlFor="lead-urgencia">Urgencia</label>
                <select
                  id="lead-urgencia"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                  required
                  value={leadForm.urgencia}
                  onFocus={handleFormStart}
                  onChange={(e) => onLeadFormChange({ urgencia: e.target.value })}
                >
                  <option>Hoy</option>
                  <option>Esta semana</option>
                  <option>Este mes</option>
                </select>
              </div>
              <div className="block text-sm font-semibold text-slate-700">
                <label htmlFor="lead-ciudad">Ciudad</label>
                <input
                  id="lead-ciudad"
                  autoComplete="address-level2"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
                  placeholder="Ej. Bogotá"
                  value={leadForm.ciudad}
                  onFocus={handleFormStart}
                  onChange={(e) => onLeadFormChange({ ciudad: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row">
              <a
                href={whatsappLeadLink}
                target="_blank"
                rel="noreferrer"
                onClick={handleWhatsappClick}
                className="flex-1 rounded-xl bg-blue-900 px-6 py-4 text-center text-base font-bold text-white shadow-md transition-all hover:bg-blue-800 hover:shadow-lg focus:ring-4 focus:ring-blue-900/20 focus:outline-none"
              >
                Abrir en WhatsApp
              </a>
              <a
                href={`mailto:${email}`}
                onClick={handleEmailClick}
                className="flex flex-shrink-0 items-center justify-center rounded-xl border-2 border-slate-200 px-6 py-4 text-center text-sm font-bold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 focus:ring-4 focus:ring-slate-100 focus:outline-none"
              >
                o enviar Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
