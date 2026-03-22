#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const files = {
  routes: path.join(ROOT, 'frontend/src/components/RoutesSection.jsx'),
  chatbot: path.join(ROOT, 'frontend/src/components/WhatsAppFunnelChatbot.jsx')
};

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function luminance({ r, g, b }) {
  const srgb = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(a, b) {
  const l1 = luminance(hexToRgb(a));
  const l2 = luminance(hexToRgb(b));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function runContrastChecks() {
  // pares críticos usados en rutas + gradientes oscuros
  const checks = [
    { name: 'Rutas card text', fg: '#334155', bg: '#ffffff', min: 4.5 },
    { name: 'Rutas CTA primary', fg: '#ffffff', bg: '#1e3a8a', min: 4.5 },
    { name: 'Rutas CTA secondary', fg: '#334155', bg: '#ffffff', min: 4.5 },
    { name: 'Hero dark gradient text', fg: '#dbeafe', bg: '#0f172a', min: 4.5 },
    { name: 'Footer text on dark', fg: '#cbd5e1', bg: '#0f172a', min: 4.5 }
  ];

  let failed = false;
  checks.forEach((c) => {
    const ratio = contrastRatio(c.fg, c.bg);
    const pass = ratio >= c.min;
    console.log(`${pass ? '✅' : '❌'} ${c.name}: ${ratio.toFixed(2)} (mín ${c.min})`);
    if (!pass) failed = true;
  });

  return !failed;
}

function runTabOrderChecks(routesSource) {
  const checks = [
    { name: 'Sin tabindex positivo', pass: !/tabIndex\s*=\s*{?\s*[1-9]/.test(routesSource) },
    { name: 'Botón principal con type', pass: /<button\s+[^>]*type="button"[^>]*onClick=\{\(e\) => onRouteSelect/.test(routesSource) },
    { name: 'Tarjetas con heading semántico', pass: /<h3\s+id=\{`route-title-\$\{route\.id\}`\}/.test(routesSource) },
    { name: 'Tarjetas con aria-labelledby', pass: /<article[^>]*aria-labelledby=\{`route-title-\$\{route\.id\}`\}/.test(routesSource) }
  ];

  let failed = false;
  checks.forEach((c) => {
    console.log(`${c.pass ? '✅' : '❌'} ${c.name}`);
    if (!c.pass) failed = true;
  });

  return !failed;
}

function runChatbotFocusChecks(chatbotSource) {
  const checks = [
    { name: 'Dialog semantics', pass: /role="dialog"/.test(chatbotSource) && /aria-modal="false"/.test(chatbotSource) },
    { name: 'Focus trap on Tab', pass: /if \(event\.key !== 'Tab'\)/.test(chatbotSource) },
    { name: 'Cierre con Escape', pass: /event\.key === 'Escape'/.test(chatbotSource) },
    { name: 'Retorno de foco al launcher', pass: /launcherRef\.current\?\.focus\(\)/.test(chatbotSource) }
  ];

  let failed = false;
  checks.forEach((c) => {
    console.log(`${c.pass ? '✅' : '❌'} ${c.name}`);
    if (!c.pass) failed = true;
  });

  return !failed;
}

function main() {
  const routesSource = read(files.routes);
  const chatbotSource = read(files.chatbot);

  console.log('--- Contraste (WCAG AA) ---');
  const contrastOk = runContrastChecks();

  console.log('\n--- Tab order (ruta completa) ---');
  const tabOrderOk = runTabOrderChecks(routesSource);

  console.log('\n--- Foco dinámico chatbot ---');
  const chatbotOk = runChatbotFocusChecks(chatbotSource);

  if (!contrastOk || !tabOrderOk || !chatbotOk) {
    console.error('\nResultado: auditoría A11y automatizada con fallos.');
    process.exit(1);
  }

  console.log('\nResultado: auditoría A11y automatizada OK.');
}

main();
