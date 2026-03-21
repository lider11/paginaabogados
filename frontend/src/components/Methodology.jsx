const phases = [
  {
    id: '01',
    title: 'Diagnóstico',
    icon: '🧭',
    description: 'Levantamos hechos, riesgos e impacto jurídico. Identificamos puntos críticos que requieren atención inmediata y estructurada.'
  },
  {
    id: '02',
    title: 'Estrategia',
    icon: '🗂️',
    description: 'Definimos ruta legal, tiempos y documentos críticos. Diseñamos un plan de acción ejecutivo a la medida de tu caso corporativo.'
  },
  {
    id: '03',
    title: 'Ejecución',
    icon: '✅',
    description: 'Implementamos y damos seguimiento hasta el cierre, mitigando riesgos operativos y garantizando el cumplimiento normativo acordado.'
  }
];

export default function Methodology() {
  return (
    <section id="metodologia" className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800">Metodología de trabajo</h2>
          <p className="mt-2 text-slate-600">Una ruta visual de 3 etapas para pasar de incertidumbre legal a decisiones ejecutables.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.id} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-md">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl" aria-hidden="true">{phase.icon}</span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-blue-700">{phase.id}</p>
              <h3 className="mt-1 text-xl font-bold text-slate-800">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
