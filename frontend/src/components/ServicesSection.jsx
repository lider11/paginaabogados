const serviceIcons = {
  'Tradición de Acciones': '📄',
  'Patrimonio de Familia': '🏡',
  'Gobierno Corporativo': '🏛️',
  'Imagen Empresarial': '✨'
};

export default function ServicesSection({ services, loading, error }) {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Servicios legales especializados</h2>
        <p className="mt-4 text-slate-600">Líneas de trabajo diseñadas para proteger patrimonio, asegurar gobierno corporativo y escalar operaciones empresariales.</p>
      </div>
      
      {loading && <div className="flex justify-center py-10"><p className="text-slate-500 font-medium animate-pulse">Cargando catálogo de servicios...</p></div>}
      
      {error && (
        <div className="mx-auto max-w-3xl rounded-xl border-l-4 border-amber-400 bg-amber-50 p-4 shadow-sm mb-6">
          <div className="flex">
            <div className="flex-shrink-0"><span className="text-amber-400">⚠️</span></div>
            <div className="ml-3"><p className="text-sm text-amber-700">{error}</p></div>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <article key={service.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-50 text-3xl group-hover:bg-blue-100 transition-colors mb-5" aria-hidden="true">
              {serviceIcons[service.title] || '⚖️'}
            </div>
            <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
