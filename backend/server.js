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

const staticDir = candidateStaticDirs.find((dir) => fs.existsSync(path.join(dir, 'index.html')));

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
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-slate-50 text-slate-900">
          <main class="mx-auto max-w-6xl px-5 py-12">
            <section class="rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white">
              <p class="inline-block rounded-full bg-white/15 px-4 py-1 text-sm">Lexiuridicus</p>
              <h1 class="mt-4 text-4xl font-bold">Soluciones jurídicas para proteger y proyectar tu futuro</h1>
              <p class="mt-3 text-blue-100">No encontramos archivos estáticos publicados, pero tu API está funcionando.</p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-semibold">Servicios</h2>
              <p id="status" class="mt-2 text-slate-600">Cargando servicios...</p>
              <div id="grid" class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4"></div>
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
              .then((res) => res.json())
              .then((list) => {
                const grid = document.getElementById('grid');
                const status = document.getElementById('status');
                status.remove();
                list.forEach((service) => {
                  const article = document.createElement('article');
                  article.className = 'rounded-2xl border border-slate-200 bg-white p-5 shadow';
                  article.innerHTML =
                    '<span class="text-3xl">' + (icons[service.title] || '⚖️') + '</span>' +
                    '<h3 class="mt-3 text-lg font-semibold text-blue-800">' + service.title + '</h3>' +
                    '<p class="mt-2 text-sm text-slate-600">' + service.description + '</p>';
                  grid.appendChild(article);
                });
              })
              .catch(() => {
                const status = document.getElementById('status');
                status.className = 'font-semibold text-red-700';
                status.textContent = 'No se logró cargar los servicios desde el backend.';
              });
          </script>
        </body>
      </html>
    `);  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
