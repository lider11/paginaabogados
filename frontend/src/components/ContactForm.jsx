export default function ContactForm({ leadForm, onLeadFormChange, diagnosticOffer, whatsappLink, email }) {
  const handleWhatsappClick = () => {
    if (window.gtag) {
      window.gtag('event', 'click_whatsapp', { lead_perfil: leadForm.perfil });
    }
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
      <div className="rounded-3xl border border-blue-200 bg-blue-50/80 p-6 xl:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Solicita una evaluación inicial</h2>
            <p className="text-slate-700 text-lg mb-8">Agenda una reunión y recibe una ruta legal priorizada y específica para tu caso.</p>
            
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm mb-6">
              <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-3">Oferta de entrada</p>
              <p className="text-base font-medium text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-5">{diagnosticOffer}</p>
              <ul className="space-y-4">
                <li className="flex items-start text-sm text-slate-700 leading-snug"><span className="mr-3 text-blue-500 font-bold">✓</span> Incluye evaluación de riesgos y prioridades legales para no improvisar.</li>
                <li className="flex items-start text-sm text-slate-700 leading-snug"><span className="mr-3 text-blue-500 font-bold">✓</span> Definimos próximos pasos, tiempos de ejecución y documentos críticos.</li>
                <li className="flex items-start text-sm text-slate-700 leading-snug"><span className="mr-3 text-blue-500 font-bold">✓</span> Aplica para empresas y familias con requerimientos preventivos o urgentes.</li>
              </ul>
            </div>
          </div>
          
          <div className="rounded-3xl border border-blue-100 bg-white p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-1">Formulario de precalificación</h3>
            <p className="text-sm text-slate-500 mb-8">Este resumen de datos se enviará automáticamente al abrir WhatsApp para agilizar la llamada.</p>
            
            <div className="grid gap-5 sm:grid-cols-2 mb-8">
              <label className="block text-sm font-semibold text-slate-700">
                Perfil
                <select
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                  value={leadForm.perfil}
                  onChange={(e) => onLeadFormChange({ perfil: e.target.value })}
                >
                  <option>Empresa</option>
                  <option>Familia</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Necesidad principal
                <select
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                  value={leadForm.necesidad}
                  onChange={(e) => onLeadFormChange({ necesidad: e.target.value })}
                >
                  <option>Prevención legal</option>
                  <option>Urgencia legal</option>
                  <option>Revisión contractual</option>
                  <option>Protección patrimonial</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Urgencia
                <select
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                  value={leadForm.urgencia}
                  onChange={(e) => onLeadFormChange({ urgencia: e.target.value })}
                >
                  <option>Hoy</option>
                  <option>Esta semana</option>
                  <option>Este mes</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Ciudad
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                  placeholder="Ej. Bogotá"
                  value={leadForm.ciudad}
                  onChange={(e) => onLeadFormChange({ ciudad: e.target.value })}
                />
              </label>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100 mt-auto">
              <a 
                href={whatsappLeadLink} 
                target="_blank" 
                rel="noreferrer" 
                onClick={handleWhatsappClick}
                className="flex-1 text-center rounded-xl bg-blue-900 px-6 py-4 text-base font-bold text-white shadow-md hover:bg-blue-800 hover:shadow-lg transition-all focus:ring-4 focus:ring-blue-900/20 outline-none"
              >
                Abrir en WhatsApp
              </a>
              <a 
                href={`mailto:${email}`} 
                className="flex-shrink-0 text-center rounded-xl border-2 border-slate-200 px-6 py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center focus:ring-4 focus:ring-slate-100 outline-none"
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
