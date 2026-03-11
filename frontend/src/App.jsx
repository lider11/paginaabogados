import { useEffect, useState } from 'react';

const API_URL = '/api/services';

const serviceIcons = {
  'Tradición de Acciones': '📄',
  'Patrimonio de Familia': '🏡',
  'Gobierno Corporativo': '🏛️',
  'Imagen Empresarial': '✨'
};

const whatsappLink = 'https://wa.me/573000000000';

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
            <a href="#contacto" className="hover:text-blue-800">Contacto</a>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-blue-900 px-3 py-2 text-xs font-semibold text-white sm:text-sm"
          >
            Agendar asesoría
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5 pb-10 pt-10">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white shadow-xl shadow-blue-900/20 sm:p-12">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">Lexiuridicus</p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Soluciones jurídicas para proteger y proyectar tu futuro</h1>
          <p className="mt-4 max-w-3xl text-blue-100">
            Acompañamos a personas, familias y empresas con una asesoría integral, cercana y estratégica.
            Trabajamos en prevención, estructura legal y crecimiento sostenible.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1">Atención personalizada</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Soporte corporativo y familiar</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Enfoque preventivo</span>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contacto" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-900">Hablar con un asesor</a>
            <a href="#servicios" className="rounded-lg border border-white/50 px-4 py-2 text-sm font-semibold text-white">Ver servicios</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-10 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-blue-900">+10</p>
          <p className="text-sm text-slate-600">Años de enfoque jurídico empresarial</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-blue-900">4</p>
          <p className="text-sm text-slate-600">Líneas especializadas de servicio</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-blue-900">100%</p>
          <p className="text-sm text-slate-600">Acompañamiento personalizado</p>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-6xl px-5 pb-12">
        <h2 className="text-3xl font-bold text-slate-800">Servicios legales especializados</h2>
        <p className="mt-1 text-slate-600">Estas son nuestras líneas principales de acompañamiento jurídico.</p>

        {loading && <p className="mt-4 text-slate-600">Cargando servicios...</p>}
        {error && <p className="mt-4 font-semibold text-red-700">{error}</p>}

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-3xl" aria-hidden="true">{serviceIcons[service.title] || '⚖️'}</span>
              <h3 className="mt-3 text-lg font-semibold text-blue-800">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="metodologia" className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-blue-700">01. Diagnóstico legal</p>
            <p className="mt-2 text-sm text-slate-600">Analizamos tu situación para definir riesgos, oportunidades y la mejor estrategia.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-blue-700">02. Plan de acción</p>
            <p className="mt-2 text-sm text-slate-600">Diseñamos una ruta jurídica clara con tiempos, documentos y responsables.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-blue-700">03. Implementación</p>
            <p className="mt-2 text-sm text-slate-600">Acompañamos la ejecución y seguimiento hasta materializar cada decisión legal.</p>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-6xl px-5 py-10">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-blue-900">¿Listo para fortalecer tu seguridad jurídica?</h2>
          <p className="mt-2 text-slate-700">Agenda una asesoría y recibe una ruta legal clara para tu caso.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white">WhatsApp</a>
            <a href="mailto:contacto@lexiuridicus.site" className="rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-900">Correo</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
