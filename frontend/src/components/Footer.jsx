const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', label: 'Abrir Facebook' },
  { name: 'Instagram', href: 'https://instagram.com', label: 'Abrir Instagram' },
  { name: 'Pinterest', href: 'https://pinterest.com', label: 'Abrir Pinterest' },
  { name: 'LinkedIn', href: 'https://linkedin.com', label: 'Abrir LinkedIn' },
  { name: 'TikTok', href: 'https://tiktok.com', label: 'Abrir TikTok' }
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow site-footer__glow--right" />
      <div className="site-footer__glow site-footer__glow--left" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="site-footer__badge">Lexiuridicus</p>
          <p className="site-footer__text mt-4 max-w-sm text-sm leading-relaxed">
            Firma legal estratégica para empresas y familias. Diseñamos rutas jurídicas claras para decisiones críticas.
          </p>
        </div>

        <div>
          <h3 className="site-footer__title">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm site-footer__text">
            <li>
              <a className="site-footer__link" href="mailto:contacto@lexiuridicus.site">
                ✉️ contacto@lexiuridicus.site
              </a>
            </li>
            <li>📍 Bogotá, Colombia</li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__title">Síguenos</h3>
          <nav aria-label="Redes sociales" className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="site-footer__social"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="mx-auto w-full max-w-6xl px-5 py-4 text-xs site-footer__text-muted">
          © {new Date().getFullYear()} Lexiuridicus. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
