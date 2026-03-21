const trustPills = [
  'Atención consultiva',
  'Ruta en 48h',
  'Enfoque preventivo'
];

export default function Hero({ diagnosticOffer }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-900 to-indigo-800 p-8 text-white shadow-2xl shadow-blue-900/25 sm:p-14">
        <div className="absolute -right-10 -top-8 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true"></div>
        <div className="absolute -bottom-12 -left-6 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" aria-hidden="true"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <span aria-hidden="true">⚖️</span>
            Firma legal estratégica
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Decisiones jurídicas claras<br className="hidden md:block" /> para empresas y familias
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-blue-100/95">
            Convertimos temas legales complejos en planes accionables, con enfoque preventivo,
            cumplimiento normativo y visión empresarial.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <span key={pill} className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-medium text-blue-50">
                {pill}
              </span>
            ))}
          </div>

          <p className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
            <span className="mr-2" aria-hidden="true">💡</span> {diagnosticOffer}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contacto" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-900 shadow-lg transition-all hover:scale-105 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-white/50">Solicitar diagnóstico</a>
            <a href="#servicios" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50">Conocer servicios</a>
          </div>
        </div>
      </div>

      <div className="-mt-5 grid gap-4 px-1 pt-8 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-blue-900">+10</p>
          <p className="mt-1 text-sm font-medium text-slate-600">Años en asesoría corporativa</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-blue-900">4</p>
          <p className="mt-1 text-sm font-medium text-slate-600">Unidades de servicio</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-blue-900">24/7</p>
          <p className="mt-1 text-sm font-medium text-slate-600">Canales de respuesta inicial</p>
        </div>
      </div>
    </section>
  );
}
