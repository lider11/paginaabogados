export default function Hero({ diagnosticOffer }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-10">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white shadow-xl shadow-blue-900/20 sm:p-14">
        <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-wider">Firma legal estratégica</span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">Decisiones jurídicas claras<br className="hidden md:block"/> para empresas y familias</h1>
        <p className="mt-5 max-w-2xl text-lg text-blue-100/90 leading-relaxed">
          Convertimos temas legales complejos en planes accionables, con enfoque preventivo,
          cumplimiento normativo y visión empresarial.
        </p>
        <p className="mt-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white shadow-sm backdrop-blur-sm">
          <span className="mr-2">💡</span> {diagnosticOffer}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 items-center">
          <a href="#contacto" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-900 shadow-lg hover:bg-slate-50 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-white/50">Solicitar diagnóstico</a>
          <a href="#servicios" className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/60 transition-all focus:outline-none focus:ring-2 focus:ring-white/50">Conocer servicios</a>
        </div>
      </div>
      
      <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-3">
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
