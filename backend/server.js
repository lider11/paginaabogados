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

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Lexiuridicus API' });
});

app.get('/api/services', (_req, res) => {
  res.json(services);
});

const candidateStaticDirs = [
  process.env.FRONTEND_DIST,
  path.join(__dirname, '../frontend/dist'),
  path.join(__dirname, '../frontend/build'),
  path.join(__dirname, '../public'),
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'frontend/dist'),
  path.join(process.cwd(), 'frontend/build')
].filter(Boolean);

const staticDir = candidateStaticDirs.find((dir) => {
  const indexPath = path.join(dir, 'index.html');
  return fs.existsSync(indexPath);
});

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

    return res.status(200).send(`
      <!doctype html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Lexiuridicus | Servicios Jurídicos</title>
          <style>
            :root {
              font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              color: #0f172a;
              background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
            }
            * { box-sizing: border-box; }
            body { margin: 0; }
            .page { max-width: 1080px; margin: 0 auto; padding: 2.5rem 1.25rem 3.5rem; }
            .hero {
              margin-bottom: 2rem;
              background: #fff;
              border: 1px solid #e5e7eb;
              border-radius: 1rem;
              padding: 2rem;
              box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
            }
            .badge {
              display:inline-block;
              background:#1e3a8a;
              color:#fff;
              border-radius:999px;
              padding:.35rem .75rem;
              font-weight:600;
              font-size:.85rem;
            }
            h1 { margin: .8rem 0 .6rem; font-size: clamp(1.8rem, 4vw, 2.8rem); }
            .hero p { margin: 0; color:#334155; }
            .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1rem; }
            .card {
              background:#fff;
              border:1px solid #e5e7eb;
              border-radius:.8rem;
              padding:1rem;
              box-shadow:0 8px 18px rgba(15,23,42,.06);
            }
            .icon { font-size:1.35rem; }
            .card h3 { margin: .45rem 0; color:#1d4ed8; }
            .card p { margin:0; color:#334155; }
            .error { color:#b91c1c; font-weight:600; }
          </style>
        </head>
        <body>
          <main class="page">
            <section class="hero">
              <p class="badge">Lexiuridicus</p>
              <h1>Servicios Jurídicos Especializados</h1>
              <p>Impulsamos decisiones legales sólidas para empresas y familias.</p>
            </section>

            <section>
              <h2>Nuestros servicios</h2>
              <p id="status">Cargando servicios...</p>
              <div id="grid" class="grid"></div>
            </section>
          </main>

          <script>
            const icons = {
              'Tradición de Acciones': '📄',
              'Patrimonio de Familia': '🏡',
              'Gobierno Corporativo': '🏛️',
              'Imagen Empresarial': '✨'
            };

            fetch('/api/services')
              .then((res) => {
                if (!res.ok) throw new Error('Error de API');
                return res.json();
              })
              .then((list) => {
                const grid = document.getElementById('grid');
                const status = document.getElementById('status');
                status.remove();

                list.forEach((service) => {
                  const article = document.createElement('article');
                  article.className = 'card';
                  article.innerHTML =
                    '<span class="icon">' + (icons[service.title] || '⚖️') + '</span>' +
                    '<h3>' + service.title + '</h3>' +
                    '<p>' + service.description + '</p>';
                  grid.appendChild(article);
                });
              })
              .catch(() => {
                const status = document.getElementById('status');
                status.className = 'error';
                status.textContent = 'No se logró cargar los servicios desde el backend.';
              });
          </script>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
