export default function Methodology() {
  return (
    <section id="metodologia" className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-6 border border-slate-100 shadow-sm transition hover:shadow-md hover:bg-white hover:-translate-y-1">
          <p className="text-sm font-bold text-blue-700 tracking-wide uppercase">01. Diagnóstico</p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">Levantamos hechos, riesgos e impacto jurídico. Identificamos puntos críticos que requieren atención inmediata y estructurada.</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-6 border border-slate-100 shadow-sm transition hover:shadow-md hover:bg-white hover:-translate-y-1">
          <p className="text-sm font-bold text-blue-700 tracking-wide uppercase">02. Estrategia</p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">Definimos ruta legal, tiempos y documentos críticos. Diseñamos un plan de acción ejecutivo a la medida de tu caso corporativo.</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-6 border border-slate-100 shadow-sm transition hover:shadow-md hover:bg-white hover:-translate-y-1">
          <p className="text-sm font-bold text-blue-700 tracking-wide uppercase">03. Ejecución</p>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">Implementamos y damos seguimiento hasta el cierre, mitigando riesgos operativos y garantizando el cumplimiento normativo acordado.</p>
        </div>
      </div>
    </section>
  );
}
