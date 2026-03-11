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
        <body class="m-0 bg-slate-50 text-slate-900">
          <main class="mx-auto max-w-6xl px-5 py-10">
            <section class="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
              <p class="inline-block rounded-full bg-blue-900 px-3 py-1 text-sm font-semibold text-white">Lexiuridicus</p>
              <h1 class="mt-3 text-4xl font-bold text-slate-800 sm:text-5xl">Servicios Jurídicos Especializados</h1>
              <p class="mt-2 max-w-3xl text-slate-600">Impulsamos decisiones legales sólidas para empresas y familias.</p>
            </section>

            <section>
              <h2 class="mb-4 text-2xl font-semibold text-slate-800">Nuestros servicios</h2>
              <p id="status" class="text-slate-600">Cargando servicios...</p>
              <div id="grid" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"></div>
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
                  article.className = 'rounded-xl border border-slate-200 bg-white p-4 shadow-md shadow-slate-900/5';
                  article.innerHTML =
                    '<span class="text-2xl">' + (icons[service.title] || '⚖️') + '</span>' +
                    '<h3 class="mt-2 text-lg font-semibold text-blue-700">' + service.title + '</h3>' +
                    '<p class="mt-1 text-sm text-slate-600">' + service.description + '</p>';
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
    `);
  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
