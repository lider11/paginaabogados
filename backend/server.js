const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

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

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Lexiuridicus API',
    staticDir: staticDir || null
  });
});

app.get('/api/services', (_req, res) => {
  res.json(services);
});

function renderEmbeddedFallback() {
  const publicIndex = path.join(__dirname, '../public/index.html');
  if (fs.existsSync(publicIndex)) {
    return fs.readFileSync(publicIndex, 'utf8');
  }

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lexiuridicus | Servicios Jurídicos</title>
        <style>
          :root { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #0f172a; background: #f8fafc; }
          body { margin: 0; background: #f8fafc; color: #0f172a; }
          .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
          .header { position: sticky; top: 0; background: #fff; border-bottom: 1px solid #e2e8f0; }
          .nav { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; }
          .brand { font-weight: 800; color: #1e3a8a; margin: 0; }
          .hero { margin: 24px 0; border-radius: 18px; padding: 28px; background: linear-gradient(90deg,#0f172a,#1e3a8a); color: #fff; }
          .pill { display: inline-block; padding: 6px 10px; border-radius: 999px; font-size: 13px; background: rgba(255,255,255,.15); }
          .offer { margin-top: 10px; display: inline-block; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(255,255,255,.35); font-size: 14px; }
          .grid { display: grid; gap: 12px; }
          .grid-3 { grid-template-columns: repeat(auto-fit,minmax(230px,1fr)); }
          .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; }
          .section { padding: 20px 0; }
          h1,h2,h3,p { margin-top: 0; }
          .muted { color: #475569; }
        </style>
      </head>
      <body>
        <header class="header">
          <nav class="container nav">
            <p class="brand">Lexiuridicus</p>
          </nav>
        </header>
        <main class="container">
          <section class="hero">
            <span class="pill">Firma legal estratégica</span>
            <h1>Decisiones jurídicas claras para empresas y familias</h1>
            <p>Convertimos temas legales complejos en planes accionables, con enfoque preventivo, cumplimiento normativo y visión empresarial.</p>
            <span class="offer">Diagnóstico legal inicial (30 min) + hoja de ruta priorizada en 48h</span>
          </section>

          <section class="section">
            <h2>Prueba social y evidencia de resultados</h2>
            <div class="grid grid-3">
              <article class="card"><strong>150+</strong><p class="muted">Diagnósticos legales realizados</p></article>
              <article class="card"><strong>92%</strong><p class="muted">Clientes que continúan a fase de estrategia</p></article>
              <article class="card"><strong>48h</strong><p class="muted">Tiempo promedio de entrega de hoja de ruta</p></article>
            </div>
          </section>

          <section class="section">
            <h2>Testimonios breves</h2>
            <div class="grid grid-3">
              <blockquote class="card">“En una sesión entendimos riesgos y salimos con prioridades claras para actuar sin improvisar.”</blockquote>
              <blockquote class="card">“La hoja de ruta en 48 horas nos permitió ordenar decisiones familiares que llevábamos meses aplazando.”</blockquote>
              <blockquote class="card">“La metodología evitó reprocesos y nos dio seguridad jurídica para negociar con aliados estratégicos.”</blockquote>
            </div>
          </section>
        </main>
      </body>
    </html>
  `;
}

if (staticDir) {
  app.use(express.static(staticDir));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.sendFile(path.join(staticDir, 'index.html'));
  });
} else {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }

    return res.status(200).send(renderEmbeddedFallback());
  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
