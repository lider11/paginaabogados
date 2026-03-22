import { Link } from 'react-router-dom';

const icpRoutes = [
  {
    id: 'empresa',
    title: 'Ruta Empresas',
    href: '/rutas/empresas',
    subtitle: 'Gobierno corporativo, contingencias y compliance',
    icon: '🏢',
    highlights: ['Orden societario y actas', 'Riesgos contractuales', 'Decisiones con trazabilidad']
  },
  {
    id: 'familia',
    title: 'Ruta Familias',
    href: '/rutas/familias',
    subtitle: 'Patrimonio, sucesión y protección de activos',
    icon: '👨‍👩‍👧',
    highlights: ['Estructura patrimonial', 'Documentación crítica', 'Plan de continuidad familiar']
  }
];

export default function RoutesSection({ onRouteSelect }) {
  return (
    <section id="rutas" className="mx-auto max-w-6xl px-5 pb-12 pt-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-800">Empieza por la ruta que mejor describe tu caso</h2>
        <p className="mt-2 max-w-2xl text-slate-600">Selecciona tu perfil y te proponemos prioridades legales desde el primer contacto.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {icpRoutes.map((route) => (
            <article key={route.id} aria-labelledby={`route-title-${route.id}`} className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 id={`route-title-${route.id}`} className="text-xl font-bold text-blue-900 transition-colors group-hover:text-blue-700">{route.title}</h3>
                  <p className="mt-1.5 text-sm font-medium text-slate-500">{route.subtitle}</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl" aria-hidden="true">{route.icon}</span>
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
                  type="button"
                  onClick={(e) => onRouteSelect(e, route)}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-800 hover:shadow"
                >
                  Aplicar esta ruta
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
      </div>
    </section>
  );
}
