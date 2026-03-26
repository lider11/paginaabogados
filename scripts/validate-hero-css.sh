#!/usr/bin/env bash
set -euo pipefail
CSS_FILE="${1:-public/assets/index-BMdKNx_n.css}"
classes=(
  "bg-gradient-to-br"
  "from-slate-950"
  "via-blue-900"
  "to-indigo-800"
  "text-blue-100\\/95"
  "text-blue-100\\/80"
  "bg-white\\/5"
  "bg-white\\/10"
  "border-white\\/25"
  "border-white\\/20"
  "shadow-blue-900\\/25"
  "bg-cyan-300\\/20"
  "bg-indigo-300\\/20"
)

echo "Validando clases críticas en: $CSS_FILE"
missing=0
for c in "${classes[@]}"; do
  if rg -F -q ".${c}" "$CSS_FILE"; then
    echo "OK   $c"
  else
    echo "MISS $c"
    missing=$((missing+1))
  fi
done

echo "Faltantes: $missing"
exit $missing
