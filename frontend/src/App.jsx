import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4000/api/services';

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
        <p>
          Acompañamos personas y empresas con soluciones legales claras,
          confiables y orientadas a resultados.
        </p>
      </section>

      <section className="services">
        <h2>Nuestros 4 servicios</h2>

        {loading && <p>Cargando servicios...</p>}
        {error && <p className="error">{error}</p>}

        <div className="grid">
          {services.map((service) => (
            <article key={service.id} className="card">
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
