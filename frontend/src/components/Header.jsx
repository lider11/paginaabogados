import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FUNNEL_EVENTS, trackFunnelEvent } from '../utils/analytics';

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
    <header className="site-header">
      <nav className="site-header__nav mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          to="/"
          className="site-header__brand"
        >
          Lexiuridicus
        </Link>

        <div className="hidden gap-5 text-sm font-medium md:flex">
          <a href="/#servicios" className="site-header__link">Servicios</a>
          <a href="/#metodologia" className="site-header__link">Metodología</a>
          <a href="/#rutas" className="site-header__link">Rutas</a>
          <a href="/#contacto" className="site-header__link">Contacto</a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackFunnelEvent(FUNNEL_EVENTS.WHATSAPP_CLICK, { channel: 'whatsapp', source: 'header_cta' });
              trackFunnelEvent(FUNNEL_EVENTS.SUBMIT_INTENT, { channel: 'whatsapp', source: 'header_cta' });
            }}
            className="site-header__cta"
          >
            Agendar asesoría
          </a>
          <button
            type="button"
            aria-controls="mobile-nav"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="site-header__menu-btn md:hidden"
          >
            Menú
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="site-header__mobile md:hidden"
        >
          <div className="flex flex-col gap-3 text-sm font-medium">
            <a href="/#servicios" onClick={() => setIsMobileMenuOpen(false)} className="site-header__mobile-link">Servicios</a>
            <a href="/#metodologia" onClick={() => setIsMobileMenuOpen(false)} className="site-header__mobile-link">Metodología</a>
            <a href="/#rutas" onClick={() => setIsMobileMenuOpen(false)} className="site-header__mobile-link">Rutas</a>
            <a href="/#contacto" onClick={() => setIsMobileMenuOpen(false)} className="site-header__mobile-link">Contacto</a>
          </div>
        </div>
      )}
    </header>
  );
}
