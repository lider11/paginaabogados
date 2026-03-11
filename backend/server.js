const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
