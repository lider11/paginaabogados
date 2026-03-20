import { Link } from 'react-router-dom';

export default function Header({ whatsappLink }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="font-bold text-blue-900 text-lg tracking-tight">Lexiuridicus</Link>
        <div className="hidden gap-5 text-sm font-medium text-slate-600 md:flex">
          <a href="/#servicios" className="hover:text-blue-900 transition-colors">Servicios</a>
          <a href="/#metodologia" className="hover:text-blue-900 transition-colors">Metodología</a>
          <a href="/#rutas" className="hover:text-blue-900 transition-colors">Rutas</a>
          <a href="/#contacto" className="hover:text-blue-900 transition-colors">Contacto</a>
        </div>
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-lg bg-blue-900 px-4 py-2.5 text-xs font-semibold text-white sm:text-sm hover:bg-blue-800 transition shadow-sm hover:shadow">
          Agendar asesoría
        </a>
      </nav>
    </header>
  );
}
