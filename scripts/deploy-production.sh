#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:-lexiuridicus}"
BRANCH="${BRANCH:-main}"
REMOTE="${REMOTE:-origin}"
BASE_URL="${1:-}"

log() { echo "[deploy] $*"; }

log "Branch: $BRANCH | Remote: $REMOTE | App: $APP_NAME"

log "Actualizando repositorio..."
git fetch "$REMOTE"
git checkout "$BRANCH"
git pull "$REMOTE" "$BRANCH"

log "Instalando dependencias (backend + frontend)..."
if [[ -f "backend/package-lock.json" ]]; then
  npm --prefix backend ci
else
  npm --prefix backend install
fi

if [[ -f "frontend/package-lock.json" ]]; then
  npm --prefix frontend ci
else
  npm --prefix frontend install
fi

log "Compilando frontend y sincronizando public/..."
npm run build

if command -v pm2 >/dev/null 2>&1; then
  log "Reiniciando PM2 app: $APP_NAME"
  pm2 restart "$APP_NAME" || pm2 start npm --name "$APP_NAME" -- start
  pm2 save
else
  log "PM2 no disponible. Inicia el servicio manualmente con: npm start"
fi

if [[ -n "$BASE_URL" ]]; then
  log "Ejecutando verificación post-despliegue..."
  npm run verify:deploy -- "$BASE_URL"
else
  log "Sin URL de verificación. Puedes correr: npm run verify:deploy -- https://tu-dominio"
fi

log "Despliegue finalizado."
