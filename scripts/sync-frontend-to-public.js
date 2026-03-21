const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const frontendDist = path.join(rootDir, 'frontend', 'dist');
const publicDir = path.join(rootDir, 'public');
const backendPublicDir = path.join(rootDir, 'backend', 'public');

if (!fs.existsSync(frontendDist)) {
  console.error('[sync] No existe frontend/dist. Ejecuta primero el build del frontend.');
  process.exit(1);
}

const syncToTarget = (targetDir) => {
  const targetAssets = path.join(targetDir, 'assets');
  const distIndex = path.join(frontendDist, 'index.html');
  const distAssets = path.join(frontendDist, 'assets');

  fs.mkdirSync(targetDir, { recursive: true });

  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, path.join(targetDir, 'index.html'));
  }

  if (fs.existsSync(targetAssets)) {
    fs.rmSync(targetAssets, { recursive: true, force: true });
  }

  if (fs.existsSync(distAssets)) {
    fs.cpSync(distAssets, targetAssets, { recursive: true });
  }
};

syncToTarget(publicDir);
syncToTarget(backendPublicDir);

console.log('[sync] frontend/dist sincronizado en public y backend/public (index.html + assets).');
