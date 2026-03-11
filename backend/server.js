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
  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lexiuridicus | Servicios Jurídicos</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-slate-50 text-slate-900">
        <header class="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
            <p class="font-bold text-blue-900">Lexiuridicus</p>
            <div class="hidden gap-5 text-sm text-slate-600 md:flex">
              <a href="#servicios" class="hover:text-blue-800">Servicios</a>
              <a href="#metodologia" class="hover:text-blue-800">Metodología</a>
              <a href="#diferenciales" class="hover:text-blue-800">Diferenciales</a>
              <a href="#contacto" class="hover:text-blue-800">Contacto</a>
            </div>
            <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" class="rounded-lg bg-blue-900 px-3 py-2 text-xs font-semibold text-white sm:text-sm">Agendar asesoría</a>
          </nav>
        </header>

        <main>
          <section class="mx-auto max-w-6xl px-5 pb-10 pt-10">
            <div class="rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white shadow-xl shadow-blue-900/20 sm:p-12">
              <p class="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium">Firma legal estratégica</p>
              <h1 class="mt-4 text-4xl font-bold sm:text-5xl">Decisiones jurídicas claras para empresas y familias</h1>
              <p class="mt-4 max-w-3xl text-blue-100">Convertimos temas legales complejos en planes accionables, con enfoque preventivo, cumplimiento normativo y visión empresarial.</p>
              <div class="mt-7 flex flex-wrap gap-3">
                <a href="#contacto" class="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-900">Solicitar diagnóstico</a>
                <a href="#servicios" class="rounded-lg border border-white/50 px-4 py-2 text-sm font-semibold text-white">Conocer servicios</a>
              </div>
            </div>
          </section>

          <section class="mx-auto grid max-w-6xl gap-4 px-5 pb-10 sm:grid-cols-3">
            <div class="rounded-xl border border-slate-200 bg-white p-4 text-center"><p class="text-2xl font-bold text-blue-900">+10</p><p class="text-sm text-slate-600">Años en asesoría legal corporativa</p></div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 text-center"><p class="text-2xl font-bold text-blue-900">4</p><p class="text-sm text-slate-600">Unidades de servicio especializadas</p></div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 text-center"><p class="text-2xl font-bold text-blue-900">24/7</p><p class="text-sm text-slate-600">Canales abiertos para respuesta inicial</p></div>
          </section>

          <section id="servicios" class="mx-auto max-w-6xl px-5 pb-12">
            <h2 class="text-3xl font-bold text-slate-800">Servicios legales especializados</h2>
            <p class="mt-1 text-slate-600">Líneas de trabajo diseñadas para proteger patrimonio, gobierno y crecimiento empresarial.</p>
            <p id="status" class="mt-4 text-slate-600">Cargando servicios...</p>
            <div id="grid" class="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4"></div>
          </section>

          <section id="metodologia" class="border-y border-slate-200 bg-white">
            <div class="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-3">
              <div class="rounded-xl bg-slate-50 p-5"><p class="text-sm font-semibold text-blue-700">01. Diagnóstico</p><p class="mt-2 text-sm text-slate-600">Levantamos hechos, riesgos e impacto jurídico.</p></div>
              <div class="rounded-xl bg-slate-50 p-5"><p class="text-sm font-semibold text-blue-700">02. Estrategia</p><p class="mt-2 text-sm text-slate-600">Definimos ruta legal, tiempos y documentos críticos.</p></div>
              <div class="rounded-xl bg-slate-50 p-5"><p class="text-sm font-semibold text-blue-700">03. Ejecución</p><p class="mt-2 text-sm text-slate-600">Implementamos y damos seguimiento hasta el cierre.</p></div>
            </div>
          </section>

          <section id="diferenciales" class="mx-auto max-w-6xl px-5 py-10">
            <h2 class="text-2xl font-bold text-slate-800">Buenas prácticas empresariales que aplicamos</h2>
            <div class="mt-4 grid gap-4 md:grid-cols-2">
              <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-800">Gobernanza y trazabilidad</p><p class="mt-2 text-sm text-slate-600">Cada caso tiene plan, hitos y evidencia documental para auditoría y control.</p></div>
              <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-800">Gestión de riesgos legales</p><p class="mt-2 text-sm text-slate-600">Priorizamos prevención para evitar contingencias y costos innecesarios.</p></div>
              <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-800">Comunicación ejecutiva</p><p class="mt-2 text-sm text-slate-600">Traducimos lenguaje legal a decisiones claras para líderes y equipos.</p></div>
              <div class="rounded-xl border border-slate-200 bg-white p-5"><p class="font-semibold text-slate-800">Confidencialidad y ética</p><p class="mt-2 text-sm text-slate-600">Protocolos de manejo de información y actuación profesional responsable.</p></div>
            </div>
          </section>

          <section id="contacto" class="mx-auto max-w-6xl px-5 pb-12">
            <div class="rounded-2xl border border-blue-200 bg-blue-50 p-6">
              <h2 class="text-2xl font-bold text-blue-900">Solicita una evaluación inicial</h2>
              <p class="mt-2 text-slate-700">Agenda una reunión y recibe una ruta legal priorizada para tu caso.</p>
              <div class="mt-4 flex flex-wrap gap-3">
                <a href="https://wa.me/573000000000" target="_blank" rel="noreferrer" class="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white">WhatsApp</a>
                <a href="mailto:contacto@lexiuridicus.site" class="rounded-lg border border-blue-300 px-4 py-2 text-sm font-semibold text-blue-900">contacto@lexiuridicus.site</a>
              </div>
            </div>
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
                article.className = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-lg';
                article.innerHTML =
                  '<span class="text-3xl">' + (icons[service.title] || '⚖️') + '</span>' +
                  '<h3 class="mt-3 text-lg font-semibold text-blue-800">' + service.title + '</h3>' +
                  '<p class="mt-2 text-sm leading-relaxed text-slate-600">' + service.description + '</p>';
                grid.appendChild(article);
              });
            })
            .catch(() => {
              const status = document.getElementById('status');
              status.className = 'mt-4 font-semibold text-red-700';
              status.textContent = 'No se logró cargar los servicios desde el backend.';
            });
        </script>
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
