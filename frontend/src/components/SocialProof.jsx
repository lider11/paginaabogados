import React from 'react';

const socialProofStats = [
  { value: '150+', label: 'Diagnósticos legales realizados' },
  { value: '92%', label: 'Clientes a fase de estrategia' },
  { value: '48h', label: 'Entrega de hoja de ruta' }
];

const successCases = [
  {
    title: 'PyME de servicios B2B',
    challenge: 'Riesgo contractual y cobros atrasados que impactaban flujo de caja.',
    action: 'Estandarización contractual y soporte de cobranza.',
    result: 'Disminución de disputas y mejora de recuperación en 90 días.'
  },
  {
    title: 'Empresa en expansión',
    challenge: 'Decisiones sin trazabilidad en junta y conflictos entre socios.',
    action: 'Implementación de reglas de gobierno corporativo y actas.',
    result: 'Mayor claridad de roles y reducción de fricción en decisiones.'
  },
  {
    title: 'Patrimonio inmobiliario',
    challenge: 'Exposición por falta de estructura sucesoral y protección de activos.',
    action: 'Diseño de ruta patrimonial y cronograma legal.',
    result: 'Patrimonio organizado y plan de continuidad definido.'
  }
];

const testimonials = [
  {
    quote: 'En una sesión entendimos riesgos y salimos con prioridades claras para actuar sin improvisar.',
    author: 'Gerente General',
    company: 'Comercializadora regional'
  },
  {
    quote: 'La hoja de ruta nos permitió ordenar decisiones familiares que llevábamos meses aplazando.',
    author: 'Representante',
    company: 'Familia empresaria'
  },
  {
    quote: 'La metodología evitó reprocesos y nos dio seguridad jurídica para negociar con aliados.',
    author: 'Directora Administrativa',
    company: 'PyME de servicios'
  }
];

export default function SocialProof() {
  return (
    <>
      <section id="evidencia" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-800">Prueba social y evidencia de resultados</h2>
            <p className="mt-4 text-slate-600">Compartimos indicadores, casos y testimonios para que evalúes nuestra forma de trabajo con evidencia.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {socialProofStats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 text-center shadow-sm">
                <p className="text-4xl font-extrabold text-blue-900">{item.value}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Corte de indicadores: marzo 2026. Base consolidada de casos atendidos y documentados en procesos de diagnóstico inicial.
          </p>

          <div className="mt-16">
            <h3 className="mb-8 text-center text-2xl font-bold text-slate-800">Casos representativos</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {successCases.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                  <p className="mb-4 border-b border-blue-50 pb-3 text-lg font-bold text-blue-800">{item.title}</p>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-600"><strong className="text-slate-800">Problema:</strong> {item.challenge}</p>
                    <p className="text-sm text-slate-600"><strong className="text-slate-800">Intervención:</strong> {item.action}</p>
                    <p className="rounded-lg border border-green-100 bg-green-50/50 p-3 text-sm text-slate-700"><strong className="text-green-800">Resultado:</strong> {item.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-800">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.quote} className="relative rounded-2xl border border-blue-100 bg-blue-50/50 p-8 shadow-sm">
              <p className="mb-3 text-yellow-500" aria-hidden="true">★★★★★</p>
              <p className="relative z-10 pt-1 text-sm italic leading-relaxed text-slate-700">“{item.quote}”</p>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
