import { Link } from 'react-router-dom';

const icpRoutes = [
  {
    id: 'empresa',
    title: 'Ruta Empresas',
    href: '/rutas/empresas',
    subtitle: 'Gobierno corporativo, contingencias y compliance',
    highlights: ['Orden societario y actas', 'Riesgos contractuales', 'Decisiones con trazabilidad']
  },
  {
    id: 'familia',
    title: 'Ruta Familias',
    href: '/rutas/familias',
    subtitle: 'Patrimonio, sucesión y protección de activos',
    highlights: ['Estructura patrimonial', 'Documentación crítica', 'Plan de continuidad familiar']
  }
];

export default function RoutesSection({ onRouteSelect }) {
  return (
    <section id="rutas" className="mx-auto max-w-6xl px-5 pb-10 pt-4">
      <h2 className="text-2xl font-bold text-slate-800">Elige tu ruta según tu perfil</h2>
      <p className="mt-2 text-slate-600">Segmentamos el diagnóstico para acelerar decisiones según tipo de cliente.</p>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {icpRoutes.map((route) => (
          <article key={route.id} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">{route.title}</p>
                <p className="mt-1.5 text-sm font-medium text-slate-500">{route.subtitle}</p>
              </div>
            </div>
            
            <ul className="mt-4 space-y-2">
              {route.highlights.map((item) => (
                <li key={item} className="flex items-start text-sm text-slate-700">
                  <span className="mr-2 text-blue-500 text-base leading-none">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={(e) => onRouteSelect(e, route)}
                className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow"
              >
                Pre-llenar perfil
              </button>
              <Link 
                to={route.href} 
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
              >
                Ver detalles ruta
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
