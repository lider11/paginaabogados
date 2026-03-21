const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', label: 'Abrir Facebook' },
  { name: 'Instagram', href: 'https://instagram.com', label: 'Abrir Instagram' },
  { name: 'Pinterest', href: 'https://pinterest.com', label: 'Abrir Pinterest' },
  { name: 'LinkedIn', href: 'https://linkedin.com', label: 'Abrir LinkedIn' },
  { name: 'TikTok', href: 'https://tiktok.com', label: 'Abrir TikTok' }
];

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-800">Lexiuridicus</p>
          <p className="text-xs text-slate-500">Firma legal estratégica para empresas y familias.</p>
        </div>

        <nav aria-label="Redes sociales" className="flex flex-wrap gap-2">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
