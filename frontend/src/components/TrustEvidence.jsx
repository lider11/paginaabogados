const credentials = [
  'Miembros activos del Colegio de Abogados de Bogotá',
  'Protocolos internos de revisión jurídica por doble validación',
  'Trazabilidad documental y entregables firmados por responsable'
];

const cases = [
  {
    title: 'Caso Empresa · Riesgo contractual',
    result: 'Se redujo un potencial litigio en fase precontractual mediante rediseño de cláusulas críticas.'
  },
  {
    title: 'Caso Familia · Protección patrimonial',
    result: 'Se estructuró plan sucesorio y blindaje documental en 10 días hábiles.'
  }
];

const testimonials = [
  {
    name: 'Gerencia PyME (validado)',
    quote: 'Nos dieron claridad jurídica accionable y no teoría. En 48h teníamos prioridades y responsables.'
  },
  {
    name: 'Cliente familiar (validado)',
    quote: 'El proceso fue claro y ordenado; ahora sabemos qué hacer y en qué orden.'
  }
];

export default function TrustEvidence() {
  return (
    <section id="confianza" className="mx-auto max-w-6xl px-5 pb-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800">Bloque de confianza verificable</h2>
        <p className="mt-2 text-slate-600">Casos, testimonios y credenciales para tomar decisiones con respaldo.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-blue-900">Credenciales</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {credentials.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-blue-900">Casos verificados</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              {cases.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-slate-800">{item.title}</p>
                  <p>{item.result}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-lg font-bold text-blue-900">Testimonios validados</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              {testimonials.map((item) => (
                <li key={item.name}>
                  <p className="italic">“{item.quote}”</p>
                  <p className="mt-1 font-semibold text-slate-800">{item.name}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
