const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const frontendDist = path.join(rootDir, 'frontend', 'dist');
const publicDir = path.join(rootDir, 'public');
const publicAssets = path.join(publicDir, 'assets');

if (!fs.existsSync(frontendDist)) {
  console.error('[sync] No existe frontend/dist. Ejecuta primero el build del frontend.');
  process.exit(1);
}

fs.mkdirSync(publicDir, { recursive: true });

const distIndex = path.join(frontendDist, 'index.html');
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, path.join(publicDir, 'index.html'));
}

if (fs.existsSync(publicAssets)) {
  fs.rmSync(publicAssets, { recursive: true, force: true });
}

const distAssets = path.join(frontendDist, 'assets');
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, publicAssets, { recursive: true });
}

console.log('[sync] frontend/dist sincronizado en public (index.html + assets).');
