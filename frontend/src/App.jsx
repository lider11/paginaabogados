import { useEffect, useState } from 'react';

const API_URL = '/api/services';

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
        if (!res.ok) {
          throw new Error('No fue posible cargar los servicios.');
        }

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
    <main className="mx-auto max-w-6xl px-5 py-10">
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
        <p className="inline-block rounded-full bg-blue-900 px-3 py-1 text-sm font-semibold text-white">
          Lexiuridicus
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-800 sm:text-5xl">
          Servicios Jurídicos Especializados
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Impulsamos decisiones legales sólidas para empresas y familias,
          combinando estrategia, prevención y cumplimiento.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-slate-800">Nuestros servicios</h2>

        {loading && <p className="text-slate-600">Cargando servicios...</p>}
        {error && <p className="font-semibold text-red-700">{error}</p>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/5"
            >
              <span className="text-2xl" aria-hidden="true">
                {serviceIcons[service.title] || '⚖️'}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-blue-700">{service.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
