#!/bin/bash
set -e

echo "→ Building Ecollifen..."
npm run build

echo "→ Guardando build temporalmente..."
cp -r dist/ /tmp/ecollifen-build

echo "→ Switching to production..."
git checkout production

echo "→ Limpiando build anterior..."
    find . -not -name '.git' \
        -not -name '.gitignore' \
        -not -name '.cpanel.yml' \
        -not -path './.git/*' \
        -maxdepth 1 \
        -delete

echo "→ Copiando nuevo build..."
cp -r /tmp/ecollifen-build/* .

echo "→ Limpiando temporal..."
rm -rf /tmp/ecollifen-build

echo "→ Committing..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"

echo "→ Pushing production..."
git push origin production

# echo "→ Volviendo a main..."
# git checkout main

echo "✓ Listo"