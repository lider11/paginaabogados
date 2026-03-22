#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DEFAULT_BUDGET_FILE = path.join(process.cwd(), 'performance-budgets.json');
const DEFAULT_REPORTS_DIR = path.join(process.cwd(), '.reports', 'lighthouse');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function parseArgs(argv) {
  const args = { budgetFile: DEFAULT_BUDGET_FILE, reportsDir: DEFAULT_REPORTS_DIR };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--budget') args.budgetFile = argv[++i];
    else if (token === '--reports') args.reportsDir = argv[++i];
    else if (token === '--help' || token === '-h') args.help = true;
  }
  return args;
}

function normalizeTemplate(urlPath) {
  if (!urlPath || urlPath === '/') return 'home';
  if (urlPath.startsWith('/rutas/')) return 'ruta';
  return 'default';
}

function extractMetricValue(report, metricKey) {
  const audits = report.audits || {};

  const lighthouseAuditMap = {
    lcp_ms: 'largest-contentful-paint',
    inp_ms: 'interaction-to-next-paint',
    cls: 'cumulative-layout-shift'
  };

  const auditId = lighthouseAuditMap[metricKey];
  if (!auditId || !audits[auditId]) return null;

  return audits[auditId].numericValue;
}

function formatMs(value) {
  return `${Math.round(value)}ms`;
}

function evaluateReport(report, templateBudget) {
  const results = [];

  for (const [metricKey, threshold] of Object.entries(templateBudget)) {
    const value = extractMetricValue(report, metricKey);
    if (value == null) {
      results.push({ metricKey, status: 'warning', message: `Métrica no encontrada: ${metricKey}` });
      continue;
    }

    const pass = value <= threshold;
    const valueText = metricKey === 'cls' ? value.toFixed(3) : formatMs(value);
    const thresholdText = metricKey === 'cls' ? threshold.toFixed(3) : formatMs(threshold);

    results.push({
      metricKey,
      status: pass ? 'pass' : 'fail',
      message: `${metricKey} ${valueText} (budget ${thresholdText})`
    });
  }

  return results;
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    console.log('Uso: node scripts/check-performance-budget.js [--budget performance-budgets.json] [--reports .reports/lighthouse]');
    process.exit(0);
  }

  if (!fs.existsSync(args.budgetFile)) {
    console.error(`No existe archivo de presupuesto: ${args.budgetFile}`);
    process.exit(1);
  }

  if (!fs.existsSync(args.reportsDir)) {
    console.error(`No existe carpeta de reportes Lighthouse: ${args.reportsDir}`);
    process.exit(1);
  }

  const budget = readJson(args.budgetFile);
  const reportFiles = fs.readdirSync(args.reportsDir).filter((f) => f.endsWith('.json'));

  if (!reportFiles.length) {
    console.error(`No se encontraron reportes JSON en: ${args.reportsDir}`);
    process.exit(1);
  }

  let hasFailures = false;

  for (const fileName of reportFiles) {
    const fullPath = path.join(args.reportsDir, fileName);
    const report = readJson(fullPath);
    const pageUrl = report.finalDisplayedUrl || report.finalUrl || '';
    const urlPath = (() => {
      try {
        return new URL(pageUrl).pathname;
      } catch (_e) {
        return '/';
      }
    })();

    const template = normalizeTemplate(urlPath);
    const templateBudget = budget.templates?.[template] || budget.templates?.default;

    if (!templateBudget) {
      console.warn(`⚠️  Sin presupuesto definido para template '${template}' (${fileName})`);
      continue;
    }

    console.log(`\nEvaluando ${fileName}`);
    console.log(`URL: ${pageUrl || '(sin URL)'} | template: ${template}`);

    const results = evaluateReport(report, templateBudget);
    for (const result of results) {
      if (result.status === 'pass') {
        console.log(`✅ ${result.message}`);
      } else if (result.status === 'warning') {
        console.log(`⚠️  ${result.message}`);
      } else {
        hasFailures = true;
        console.log(`❌ ${result.message}`);
      }
    }
  }

  if (hasFailures) {
    console.error('\nResultado: presupuesto de performance NO cumplido.');
    process.exit(1);
  }

  console.log('\nResultado: presupuesto de performance cumplido.');
}

main();
