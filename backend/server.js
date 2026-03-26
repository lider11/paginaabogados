const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;
const APP_VERSION = process.env.APP_VERSION || '2026-03-22-chatbot-funnel-v2';

app.use(cors());
app.use(express.json());

const services = [
  {
    id: 1,
    title: 'Tradición de Acciones',
    description:
      'Asesoría integral para estructurar y formalizar la transferencia de acciones con seguridad jurídica y cumplimiento normativo.'
  },
  {
    id: 2,
    title: 'Patrimonio de Familia',
    description:
      'Protección legal del patrimonio familiar mediante figuras jurídicas adecuadas y acompañamiento en cada etapa del proceso.'
  },
  {
    id: 3,
    title: 'Gobierno Corporativo',
    description:
      'Diseño e implementación de prácticas de gobierno corporativo para fortalecer la transparencia, el control y la toma de decisiones.'
  },
  {
    id: 4,
    title: 'Imagen Empresarial',
    description:
      'Soporte legal estratégico para la construcción y protección de la imagen empresarial frente a clientes, aliados y mercado.'
  }
];

const STATIC_SOURCE = process.env.STATIC_SOURCE || 'public';

function buildCandidateStaticDirs() {
  if (STATIC_SOURCE === 'dist') {
    return [
      process.env.FRONTEND_DIST,
      path.join(__dirname, '../frontend/dist'),
      path.join(__dirname, '../frontend/build'),
      path.join(process.cwd(), 'frontend/dist'),
      path.join(process.cwd(), 'frontend/build'),
      path.join(__dirname, '../public'),
      path.join(process.cwd(), 'public')
    ].filter(Boolean);
  }

  return [
    path.join(__dirname, '../public'),
    path.join(process.cwd(), 'public'),
    process.env.FRONTEND_DIST,
    path.join(__dirname, '../frontend/dist'),
    path.join(__dirname, '../frontend/build'),
    path.join(process.cwd(), 'frontend/dist'),
    path.join(process.cwd(), 'frontend/build')
  ].filter(Boolean);
}

const candidateStaticDirs = buildCandidateStaticDirs();

const staticDir = candidateStaticDirs.find((dir) => fs.existsSync(path.join(dir, 'index.html')));
const hasSpaIndex = Boolean(staticDir && fs.existsSync(path.join(staticDir, 'index.html')));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Lexiuridicus API',
    staticDir: staticDir || null
  });
});

app.get('/api/version', (_req, res) => {
  res.json({
    appVersion: APP_VERSION,
    staticSource: STATIC_SOURCE,
    staticDir: staticDir || null,
    hasSpaIndex,
    routeMode: hasSpaIndex ? 'spa' : 'legacy_fallback',
    nodeEnv: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/services', (_req, res) => {
  res.json(services);
});

function tryServeRoutePage(slug, res, next) {
  const rawSlug = String(slug || '').toLowerCase().replace(/\.html$/i, '');
  const safeSlug = rawSlug.replace(/[^a-z-]/gi, '');
  const routeFile = path.join(__dirname, `../public/rutas/${safeSlug}.html`);
  if (fs.existsSync(routeFile)) {
    return res.sendFile(routeFile);
  }
  return next();
}

app.get('/rutas/:slug.html', (req, res, next) => {
  if (hasSpaIndex) {
    return res.redirect(302, `/rutas/${req.params.slug}`);
  }
  return tryServeRoutePage(req.params.slug, res, next);
});

app.get('/rutas/:slug', (req, res, next) => {
  if (hasSpaIndex) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.sendFile(path.join(staticDir, 'index.html'));
  }
  return tryServeRoutePage(req.params.slug, res, next);
});

function renderEmbeddedFallback() {
  const publicIndex = path.join(__dirname, '../public/index.html');
  if (fs.existsSync(publicIndex)) {
    return fs.readFileSync(publicIndex, 'utf8');
  }

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lexiuridicus | Fallback operativo</title>
    <meta name="x-ui-version" content="${APP_VERSION}" />
    <style>
      body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
      .wrap { max-width: 980px; margin: 24px auto; padding: 0 20px 40px; }
      .notice { background: #fff7ed; color: #9a3412; border: 1px solid #fed7aa; padding: 10px 14px; border-radius: 10px; margin-bottom: 16px; font-size: 14px; }
      .hero { background: linear-gradient(130deg,#0f172a,#1e40af); border-radius: 16px; padding: 28px; color: #fff; box-shadow: 0 12px 30px rgba(15,23,42,.18); }
      .chip { display: inline-block; border: 1px solid rgba(255,255,255,.3); border-radius: 999px; padding: 6px 12px; font-size: 13px; margin-top: 10px; }
      .cta { display: inline-block; margin-top: 14px; background: #fff; color: #1e3a8a; border-radius: 10px; padding: 10px 14px; text-decoration: none; font-weight: 700; }
      .grid { margin-top: 18px; display: grid; gap: 14px; grid-template-columns: repeat(auto-fit,minmax(250px,1fr)); }
      .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
      .btn { display: inline-block; margin-top: 10px; background: #1e3a8a; color: #fff; border-radius: 8px; padding: 9px 12px; text-decoration: none; font-weight: 600; }
      h1,h2,p { margin: 0; }
      p { margin-top: 8px; color: #334155; }
      .hero p { color: #dbeafe; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <div class="notice">Modo fallback activo · versión <strong>${APP_VERSION}</strong>. Ejecuta <code>npm run build</code> para volver al modo SPA completo.</div>

      <section class="hero">
        <h1>Protege tu empresa y tu patrimonio con decisiones jurídicas claras</h1>
        <p>Te ayudamos a prevenir riesgos legales y actuar con seguridad jurídica desde el primer contacto.</p>
        <span class="chip">Diagnóstico legal inicial (30 min) + hoja de ruta en 48h</span><br/>
        <a class="cta" href="#contacto">Agendar diagnóstico ahora</a>
      </section>

      <section class="grid" style="margin-top:18px;">
        <article class="card">
          <h2>Ruta Empresas</h2>
          <p>Gobierno corporativo, riesgos contractuales y compliance.</p>
          <a class="btn" href="/rutas/empresas">Abrir ruta empresas</a>
        </article>
        <article class="card">
          <h2>Ruta Familias</h2>
          <p>Patrimonio, sucesión y protección de activos.</p>
          <a class="btn" href="/rutas/familias">Abrir ruta familias</a>
        </article>
      </section>

      <section id="contacto" class="card" style="margin-top:14px;">
        <h2>Contacto inmediato</h2>
        <p>Escríbenos por WhatsApp y enviamos orientación inicial hoy mismo.</p>
        <a class="btn" href="https://wa.me/573000000000" target="_blank" rel="noreferrer">Abrir WhatsApp</a>
      </section>
    </main>
  </body>
</html>`;
}

if (staticDir) {
  app.use(express.static(staticDir, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-store, max-age=0');
      }
    }
  }));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.sendFile(path.join(staticDir, 'index.html'));
  });
} else {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.status(200).set('Cache-Control', 'no-store, max-age=0').send(renderEmbeddedFallback());
  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
