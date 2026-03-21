const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;
const APP_VERSION = process.env.APP_VERSION || '2026-03-21-hero-sync-v2';

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

const candidateStaticDirs = [
  process.env.FRONTEND_DIST,
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, '../frontend/build'),
  path.join(__dirname, '../public'),
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'frontend/dist'),
  path.join(process.cwd(), 'frontend/build')
].filter(Boolean);

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
    <title>Lexiuridicus | Servicios Jurídicos</title>
    <meta name="x-ui-version" content="${APP_VERSION}" />
    <style>
      body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; background: #f8fafc; color: #0f172a; }
      .wrap { max-width: 860px; margin: 8vh auto; padding: 0 20px; }
      .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 22px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06); }
      h1 { margin: 0 0 8px; color: #1e3a8a; }
      p { margin: 8px 0; color: #334155; }
      code { background: #f1f5f9; padding: 2px 6px; border-radius: 6px; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <h1>Lexiuridicus</h1>
        <p>Modo fallback activo. No se encontró un build estático válido para SPA.</p>
        <p>Versión activa: <code>${APP_VERSION}</code></p>
        <p>Ejecuta <code>npm run build</code> para regenerar <code>frontend/dist</code> y sincronizar <code>public/</code>.</p>
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
