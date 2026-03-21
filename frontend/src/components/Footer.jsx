const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', label: 'Abrir Facebook' },
  { name: 'Instagram', href: 'https://instagram.com', label: 'Abrir Instagram' },
  { name: 'Pinterest', href: 'https://pinterest.com', label: 'Abrir Pinterest' },
  { name: 'LinkedIn', href: 'https://linkedin.com', label: 'Abrir LinkedIn' },
  { name: 'TikTok', href: 'https://tiktok.com', label: 'Abrir TikTok' }
];

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-900/30 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="inline-flex rounded-full border border-blue-300/40 bg-blue-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-100">
            Lexiuridicus
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
            Firma legal estratégica para empresas y familias. Diseñamos rutas jurídicas claras para decisiones críticas.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-blue-100">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <a className="transition hover:text-white" href="mailto:contacto@lexiuridicus.site">
                ✉️ contacto@lexiuridicus.site
              </a>
            </li>
            <li>📍 Bogotá, Colombia</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-blue-100">Síguenos</h3>
          <nav aria-label="Redes sociales" className="mt-4 flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 transition hover:border-cyan-200/60 hover:bg-cyan-400/20 hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-5 py-4 text-xs text-slate-400">
          © {new Date().getFullYear()} Lexiuridicus. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
