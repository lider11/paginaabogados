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
    <main className="page">
      <section className="hero">
        <p className="badge">Lexiuridicus</p>
        <h1>Servicios Jurídicos Especializados</h1>
        <p className="hero-text">
          Impulsamos decisiones legales sólidas para empresas y familias,
          combinando estrategia, prevención y cumplimiento.
        </p>
      </section>

      <section className="services">
        <h2>Nuestros servicios</h2>

        {loading && <p>Cargando servicios...</p>}
        {error && <p className="error">{error}</p>}

        <div className="grid">
          {services.map((service) => (
            <article key={service.id} className="card">
              <span className="icon" aria-hidden="true">
                {serviceIcons[service.title] || '⚖️'}
              </span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
