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
  path.join(__dirname, '../public')
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
  app.get('/', (_req, res) => {
    res.status(200).send(`
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Lexiuridicus</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 2rem; color: #0f172a; }
            .box { max-width: 760px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem 1.25rem; }
            code { background: #f1f5f9; padding: 0.1rem 0.35rem; border-radius: 6px; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>Lexiuridicus API activa</h1>
            <p>La ruta raíz funciona correctamente ✅</p>
            <p>Falta publicar el frontend compilado. Genera el build y súbelo para que esta URL muestre la web React.</p>
            <p>Rutas API disponibles: <code>/api/health</code> y <code>/api/services</code>.</p>
          </div>
        </body>
      </html>
    `);
  });
}

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
