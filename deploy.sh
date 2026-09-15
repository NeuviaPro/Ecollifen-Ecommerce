#!/bin/bash
set -e

echo "→ Building Ecollifen..."
npm run build

echo "→ Guardando build temporalmente..."
cp -r dist/ /tmp/ecollifen-build

echo "→ Switching to production..."
git checkout production

echo "→ Copiando nuevo build..."
cp -r /tmp/ecollifen-build/* .

echo "→ Limpiando temporal..."
rm -rf /tmp/ecollifen-build

echo "→ Committing..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"

echo "→ Pushing production..."
git push origin production

echo "→ Volviendo a main..."
git checkout main

echo "✓ Listo"