import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ whatsappLink }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
        >
          Lexiuridicus
        </Link>

        <div className="hidden gap-5 text-sm font-medium text-slate-600 md:flex">
          <a href="/#servicios" className="transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Servicios</a>
          <a href="/#metodologia" className="transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Metodología</a>
          <a href="/#rutas" className="transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Rutas</a>
          <a href="/#contacto" className="transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Contacto</a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:text-sm"
          >
            Agendar asesoría
          </a>
          <button
            type="button"
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 md:hidden"
          >
            Menú
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-3 text-sm font-medium text-slate-700">
            <a href="/#servicios" onClick={() => setIsMobileMenuOpen(false)} className="rounded-md px-1 py-1.5 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Servicios</a>
            <a href="/#metodologia" onClick={() => setIsMobileMenuOpen(false)} className="rounded-md px-1 py-1.5 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Metodología</a>
            <a href="/#rutas" onClick={() => setIsMobileMenuOpen(false)} className="rounded-md px-1 py-1.5 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Rutas</a>
            <a href="/#contacto" onClick={() => setIsMobileMenuOpen(false)} className="rounded-md px-1 py-1.5 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2">Contacto</a>
          </div>
        </div>
      )}
    </header>
  );
}
