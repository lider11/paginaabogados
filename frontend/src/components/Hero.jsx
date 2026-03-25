import { useEffect, useMemo, useState } from 'react';
import { FUNNEL_EVENTS, trackFunnelEvent } from '../utils/analytics';

const trustPills = [
  'Respuesta inicial en menos de 24h',
  'Diagnóstico sin compromiso',
  'Ruta legal accionable en 48h'
];

const ctaVariants = {
  A: {
    ctaText: 'Agendar diagnóstico ahora',
    subText: 'Habla con un abogado hoy',
    sticky: false
  },
  B: {
    ctaText: 'Recibir orientación legal hoy',
    subText: 'SLA: respuesta < 30 min hábil',
    sticky: true
  }
};

export default function Hero({ diagnosticOffer }) {
  const [variant, setVariant] = useState('A');

  useEffect(() => {
    const key = 'lexiuridicus_cta_variant';
    const saved = sessionStorage.getItem(key);

    if (saved && (saved === 'A' || saved === 'B')) {
      setVariant(saved);
      return;
    }

    const selected = Math.random() < 0.5 ? 'A' : 'B';
    sessionStorage.setItem(key, selected);
    setVariant(selected);
  }, []);

  const activeVariant = useMemo(() => ctaVariants[variant] || ctaVariants.A, [variant]);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 pt-10">
      <div className="hero-panel relative overflow-hidden rounded-3xl p-8 text-white sm:p-14">
        <div className="absolute -right-10 -top-8 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden="true"></div>
        <div className="absolute -bottom-12 -left-6 h-56 w-56 rounded-full bg-indigo-300/20 blur-3xl" aria-hidden="true"></div>

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <span aria-hidden="true">⚖️</span>
            Firma legal estratégica
          </span>

          <h1 className="hero-panel__title mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Protege tu empresa y tu patrimonio<br className="hidden md:block" /> con decisiones jurídicas claras
          </h1>

          <p className="hero-panel__lead mt-5 text-lg leading-relaxed">
            Te ayudamos a prevenir riesgos legales, ordenar decisiones críticas y actuar con seguridad
            jurídica sin perder velocidad de negocio.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <span key={pill} className="hero-panel__pill rounded-full border px-3 py-1 text-xs font-medium">
                {pill}
              </span>
            ))}
          </div>

          <p className="hero-panel__offer mt-6 inline-flex rounded-full border px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur-sm">
            <span className="mr-2" aria-hidden="true">💡</span> {diagnosticOffer}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              onClick={() => trackFunnelEvent(FUNNEL_EVENTS.START, { start_source: `hero_cta_${variant}` })}
              className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-900 shadow-lg transition-all hover:scale-105 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {activeVariant.ctaText}
            </a>
            <a href="#metodologia" className="hero-panel__secondary-cta rounded-xl border px-6 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-white/50">Ver cómo trabajamos</a>
          </div>

          <p className="hero-panel__subtext mt-3 text-xs">
            {activeVariant.subText}
          </p>
        </div>
      </div>

      <div className="-mt-5 grid gap-4 px-1 pt-8 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-blue-900">+10</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Años asesorando decisiones críticas</p>
          <p className="mt-1 text-xs text-slate-500">Menos improvisación, más control jurídico.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-blue-900">4</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Unidades especializadas</p>
          <p className="mt-1 text-xs text-slate-500">Empresa, familia, cumplimiento y patrimonio.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-3xl font-extrabold text-blue-900">24/7</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Canales abiertos para contacto</p>
          <p className="mt-1 text-xs text-slate-500">Te orientamos desde el primer mensaje.</p>
        </div>
      </div>

      {activeVariant.sticky && (
        <div className="hero-sticky-cta" role="region" aria-label="Acción rápida de asesoría">
          <p className="hero-sticky-cta__text">{activeVariant.subText}</p>
          <a href="#contacto" className="hero-sticky-cta__button">{activeVariant.ctaText}</a>
        </div>
      )}
    </section>
  );
}
