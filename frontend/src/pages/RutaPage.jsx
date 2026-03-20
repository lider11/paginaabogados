import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function RutaPage({ onRouteSelect }) {
  const { slug } = useParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const isEmpresa = slug === 'empresas';
  
  const content = isEmpresa 
    ? {
        title: 'Ruta Empresas: gobierno corporativo, contingencias y compliance',
        desc: 'Ruta diseñada para empresas que buscan orden legal, reducción de riesgo contractual y control de cumplimiento normativo.',
        steps: [
          { name: '1. Orden societario', detail: 'Estructuración de actas, libros y reglas de juego corporativas para mitigar conflictos y estandarizar la toma de decisiones.' },
          { name: '2. Riesgo contractual', detail: 'Auditoría y estandarización de contratos laborales, comerciales y con proveedores para evitar litigios futuros.' },
          { name: '3. Cumplimiento preventivo', detail: 'Mapa de riesgos legales y matriz de cumplimiento para blindar la operación del core business de la empresa.' }
        ],
        btnLabel: 'Solicitar diagnóstico para empresas',
        routeId: 'empresa'
      }
    : {
        title: 'Ruta Familias: patrimonio, sucesión y protección de activos',
        desc: 'Ruta diseñada para familias que buscan proteger su patrimonio, prever escenarios de riesgo y ordenar decisiones sucesorales con claridad.',
        steps: [
          { name: '1. Protección patrimonial', detail: 'Blindaje legal de activos, inmuebles y vehículos de inversión familiares mediante figuras de salvaguarda eficientes.' },
          { name: '2. Ruta sucesoral', detail: 'Planificación hereditaria con testamentos, donaciones y capitulaciones claras para evitar litigios y parálisis.' },
          { name: '3. Protocolo familiar', detail: 'Reglas explícitas para la sucesión dentro de la empresa familiar, gobierno de familia e instancias de manejo de conflictos.' }
        ],
        btnLabel: 'Solicitar diagnóstico para familias',
        routeId: 'familia'
      };

  return (
    <>
      <Helmet>
        <title>{isEmpresa ? 'Ruta Empresas' : 'Ruta Familias'} | Lexiuridicus</title>
        <meta name="description" content={content.desc} />
      </Helmet>
      
      <main className="mx-auto max-w-5xl px-5 py-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="mr-2 text-lg leading-none">←</span> Volver al inicio
          </Link>
        </div>

        <section className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 sm:p-16 text-white shadow-2xl shadow-blue-900/20 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl">{content.title}</h1>
            <p className="mt-6 text-lg text-blue-100/90 max-w-2xl leading-relaxed">{content.desc}</p>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800">Fases de intervención clave</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {content.steps.map((step, idx) => (
              <article key={step.name} className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all translate-y-0 hover:-translate-y-2">
                <div className="absolute top-0 left-8 -mt-5 flex items-center justify-center w-10 h-10 bg-blue-900 text-white font-bold rounded-xl shadow-md">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mt-2 mb-3">{step.name.split('. ')[1]}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="text-center pt-10 border-t border-slate-200">
          <button 
            onClick={(e) => {
              onRouteSelect(e, { id: content.routeId, title: isEmpresa ? 'Ruta Empresas' : 'Ruta Familias' });
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-blue-900 px-8 py-4 text-base font-extrabold tracking-wide text-white shadow-xl shadow-blue-900/30 transition-all hover:bg-blue-800 hover:scale-105 active:scale-95"
          >
            {content.btnLabel}
          </button>
        </div>
      </main>
    </>
  );
}
