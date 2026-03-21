const serviceIcons = {
  'Tradición de Acciones': '📄',
  'Patrimonio de Familia': '🏡',
  'Gobierno Corporativo': '🏛️',
  'Imagen Empresarial': '✨'
};

const outcomes = [
  'Evitas contingencias y costos innecesarios.',
  'Recibes decisiones priorizadas y ejecutables.',
  'Alineas lo legal con tus objetivos de negocio.'
];

export default function ServicesSection({ services, loading, error }) {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-16">
      <div className="rounded-3xl bg-gradient-to-b from-slate-100 to-white p-6 sm:p-10">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">Servicios clave</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-800 sm:text-4xl">¿Qué resolvemos por ti?</h2>
          <p className="mt-4 text-slate-600">Intervenciones legales enfocadas en resultados, no en trámites interminables.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {outcomes.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">{item}</span>
            ))}
          </div>
        </div>

        {loading && <div className="flex justify-center py-10"><p className="font-medium text-slate-500 animate-pulse">Cargando catálogo de servicios...</p></div>}

        {error && (
          <div className="mx-auto mb-6 max-w-3xl rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0"><span className="text-amber-400">⚠️</span></div>
              <div className="ml-3"><p className="text-sm text-amber-700">{error}</p></div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl transition-colors group-hover:bg-blue-100" aria-hidden="true">
                {serviceIcons[service.title] || '⚖️'}
              </div>
              <h3 className="text-xl font-bold text-blue-900 transition-colors group-hover:text-blue-700">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
              <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Asesoría estratégica</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
