import { useEffect, useState } from 'react';

const API_URL = '/api/services';
const whatsappLink = 'https://wa.me/573000000000';
const email = 'contacto@lexiuridicus.site';
const diagnosticOffer = 'Diagnóstico legal inicial (30 min) + hoja de ruta priorizada en 48h';
const socialProofStats = [
  { value: '150+', label: 'Diagnósticos legales realizados' },
  { value: '92%', label: 'Clientes que continúan a fase de estrategia' },
  { value: '48h', label: 'Tiempo promedio de entrega de hoja de ruta' }
];

const successCases = [
  {
    title: 'PyME de servicios B2B',
    challenge: 'Riesgo contractual y cobros atrasados que impactaban flujo de caja.',
    action: 'Estandarización contractual + protocolo de negociación y soporte de cobranza.',
    result: 'Disminución de disputas y mejora de recuperación de cartera en 90 días.'
  },
  {
    title: 'Empresa familiar en expansión',
    challenge: 'Decisiones sin trazabilidad en junta y conflictos entre socios.',
    action: 'Implementación de reglas de gobierno corporativo y actas estructuradas.',
    result: 'Mayor claridad de roles y reducción de fricción en decisiones estratégicas.'
  },
  {
    title: 'Familia con patrimonio inmobiliario',
    challenge: 'Exposición por falta de estructura sucesoral y protección de activos.',
    action: 'Diseño de ruta patrimonial con priorización documental y cronograma legal.',
    result: 'Patrimonio organizado, riesgos mitigados y plan de continuidad definido.'
  }
];

const testimonials = [
  {
    quote: 'Pasamos de apagar incendios legales a tener un plan claro con prioridades semanales.',
    author: 'Gerente General',
    company: 'Comercializadora regional'
  },
  {
    quote: 'En la primera sesión entendimos riesgos y acciones concretas para proteger nuestro patrimonio.',
    author: 'Representante de familia',
    company: 'Bogotá'
  }
];

const serviceIcons = {
  'Tradición de Acciones': '📄',
  'Patrimonio de Familia': '🏡',
  'Gobierno Corporativo': '🏛️',
  'Imagen Empresarial': '✨'
};

function App() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('No fue posible cargar los servicios.');
        return res.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se logró conectar con el backend de Lexiuridicus.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <p className="font-bold text-blue-900">Lexiuridicus</p>
          <div className="hidden gap-5 text-sm text-slate-600 md:flex">
            <a href="#servicios" className="hover:text-blue-800">Servicios</a>
            <a href="#metodologia" className="hover:text-blue-800">Metodología</a>
            <a href="#diferenciales" className="hover:text-blue-800">Diferenciales</a>
            <a href="#contacto" className="hover:text-blue-800">Contacto</a>
          </div>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-lg bg-blue-900 px-3 py-2 text-xs font-semibold text-white sm:text-sm">
            Agendar asesoría
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-10">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white shadow-xl shadow-blue-900/20 sm:p-12">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">Firma legal estratégica</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Decisiones jurídicas claras para empresas y familias</h1>
          <p className="mt-4 max-w-3xl text-blue-100">
            Convertimos temas legales complejos en planes accionables, con enfoque preventivo,
            cumplimiento normativo y visión empresarial.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            {diagnosticOffer}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contacto" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-900">Solicitar diagnóstico</a>
            <a href="#servicios" className="rounded-lg border border-white/50 px-4 py-2 text-sm font-semibold text-white">Conocer servicios</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-10 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center"><p className="text-2xl font-bold text-blue-900">+10</p><p className="text-sm text-slate-600">Años en asesoría legal corporativa</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center"><p className="text-2xl font-bold text-blue-900">4</p><p className="text-sm text-slate-600">Unidades de servicio especializadas</p></div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center"><p className="text-2xl font-bold text-blue-900">24/7</p><p className="text-sm text-slate-600">Canales abiertos para respuesta inicial</p></div>
      </section>

      <section id="servicios" className="mx-auto max-w-6xl px-5 pb-12">
        <h2 className="text-3xl font-bold text-slate-800">Servicios legales especializados</h2>
        <p className="mt-1 text-slate-600">Líneas de trabajo diseñadas para proteger patrimonio, gobierno y crecimiento empresarial.</p>
        {loading && <p className="mt-4 text-slate-600">Cargando servicios...</p>}
        {error && <p className="mt-4 font-semibold text-red-700">{error}</p>}

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="text-3xl" aria-hidden="true">{serviceIcons[service.title] || '⚖️'}</span>
              <h3 className="mt-3 text-lg font-semibold text-blue-800">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="metodologia" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-5"><p className="text-sm font-semibold text-blue-700">01. Diagnóstico</p><p className="mt-2 text-sm text-slate-600">Levantamos hechos, riesgos e impacto jurídico.</p></div>
          <div className="rounded-xl bg-slate-50 p-5"><p className="text-sm font-semibold text-blue-700">02. Estrategia</p><p className="mt-2 text-sm text-slate-600">Definimos ruta legal, tiempos y documentos críticos.</p></div>
          <div className="rounded-xl bg-slate-50 p-5"><p className="text-sm font-semibold text-blue-700">03. Ejecución</p><p className="mt-2 text-sm text-slate-600">Implementamos y damos seguimiento hasta el cierre.</p></div>
        </div>
      </section>

      <section id="diferenciales" className="mx-auto max-w-6xl px-5 py-10">
        <h2 className="text-2xl font-bold text-slate-800">Buenas prácticas empresariales que aplicamos</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-semibold text-slate-800">Gobernanza y trazabilidad</p><p className="mt-2 text-sm text-slate-600">Cada caso tiene plan, hitos y evidencia documental para auditoría y control.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-semibold text-slate-800">Gestión de riesgos legales</p><p className="mt-2 text-sm text-slate-600">Priorizamos prevención para evitar contingencias y costos innecesarios.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-semibold text-slate-800">Comunicación ejecutiva</p><p className="mt-2 text-sm text-slate-600">Traducimos lenguaje legal a decisiones claras para líderes y equipos.</p></div>
          <div className="rounded-xl border border-slate-200 bg-white p-5"><p className="font-semibold text-slate-800">Confidencialidad y ética</p><p className="mt-2 text-sm text-slate-600">Protocolos de manejo de información y actuación profesional responsable.</p></div>
        </div>
      </section>

      <section id="evidencia" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <h2 className="text-2xl font-bold text-slate-800">Prueba social y evidencia de resultados</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Compartimos indicadores, casos y testimonios para que evalúes nuestra forma de trabajo con evidencia.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {socialProofStats.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-2xl font-bold text-blue-900">{item.value}</p>
                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800">Casos representativos</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              {successCases.map((item) => (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-blue-800">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600"><strong>Problema:</strong> {item.challenge}</p>
                  <p className="mt-2 text-sm text-slate-600"><strong>Intervención:</strong> {item.action}</p>
                  <p className="mt-2 text-sm text-slate-700"><strong>Resultado:</strong> {item.result}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800">Lo que dicen nuestros clientes</h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {testimonials.map((item) => (
                <blockquote key={item.quote} className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm italic text-slate-700">“{item.quote}”</p>
                  <footer className="mt-3 text-xs font-semibold text-blue-900">{item.author} · {item.company}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-blue-900">Solicita una evaluación inicial</h2>
          <p className="mt-2 text-slate-700">Agenda una reunión y recibe una ruta legal priorizada para tu caso.</p>
          <div className="mt-4 rounded-xl border border-blue-200 bg-white p-4">
            <p className="text-sm font-semibold text-blue-900">Oferta de entrada</p>
            <p className="mt-1 text-sm text-slate-700">{diagnosticOffer}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Incluye evaluación de riesgos y prioridades legales.</li>
              <li>Definimos próximos pasos, tiempos y documentos críticos.</li>
              <li>Aplica para empresas y familias con necesidades preventivas o urgentes.</li>
            </ul>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white">WhatsApp</a>
            <a href={`mailto:${email}`} className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-900">{email}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
