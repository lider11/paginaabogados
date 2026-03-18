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

  return '<!doctype html><html lang="es"><body><h1>Lexiuridicus</h1></body></html>';
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
