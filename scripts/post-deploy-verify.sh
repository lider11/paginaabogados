#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Uso: $0 <dominio_o_url_base>"
  echo "Ejemplo: $0 https://lexiuridicus.site"
  exit 1
fi

BASE_URL="$1"
BASE_URL="${BASE_URL%/}"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

HOME_HTML="$TMP_DIR/home.html"
VERSION_JSON="$TMP_DIR/version.json"

echo "== Verificación de despliegue =="
echo "Base URL: $BASE_URL"

echo "\n[1/5] Descargando home..."
curl -fsSL "$BASE_URL" -o "$HOME_HTML"

echo "[2/5] Verificando meta x-ui-version..."
if grep -q 'name="x-ui-version"' "$HOME_HTML"; then
  grep -o 'name="x-ui-version" content="[^"]*"' "$HOME_HTML" | head -n 1
else
  echo "ERROR: No se encontró meta x-ui-version en la home."
  exit 2
fi

echo "[3/5] Verificando textos de versión nueva..."
if grep -q 'Protege tu empresa y tu patrimonio' "$HOME_HTML"; then
  echo "OK: Hero actualizado detectado."
else
  echo "WARN: No se detecta el Hero nuevo en HTML inicial. Puede hidratarse por JS."
fi

if grep -q 'Empieza por la ruta que mejor describe tu caso' "$HOME_HTML"; then
  echo "OK: Copy de rutas actualizado detectado."
else
  echo "WARN: No se detecta copy nuevo de rutas en HTML inicial."
fi

echo "[4/5] Consultando /api/version..."
if curl -fsSL "$BASE_URL/api/version" -o "$VERSION_JSON"; then
  cat "$VERSION_JSON"
else
  echo "WARN: /api/version no disponible desde este dominio (podría ser hosting estático)."
fi

echo "[5/5] Verificando que /rutas/empresas no entregue versión legacy..."
RUTAS_HTML="$TMP_DIR/rutas_empresas.html"
curl -fsSL "$BASE_URL/rutas/empresas" -o "$RUTAS_HTML"
if grep -q 'Iniciar Ruta Empresas' "$RUTAS_HTML"; then
  echo "ERROR: Se detectó contenido legacy (Iniciar Ruta Empresas)."
  exit 3
fi
if grep -q 'Aplicar esta ruta\|Ver detalles ruta\|Ruta Empresas' "$RUTAS_HTML"; then
  echo "OK: /rutas/empresas parece apuntar a versión actual."
else
  echo "WARN: No se pudo confirmar visualmente la versión de /rutas/empresas."
fi

echo "\nVerificación finalizada."
