#!/bin/bash

set -e

PROJECT_DIR="$(pwd)"
BUILD_DIR="/tmp/ecollifen-build"

cleanup() {
    echo "→ Limpiando..."
    rm -rf "$BUILD_DIR"

    echo "→ Volviendo a main..."
    git checkout main
}

trap cleanup EXIT

echo "→ Building Ecollifen..."

npm run build

echo "→ Guardando build temporalmente..."

rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"
cp -r dist/. "$BUILD_DIR/"

echo "→ Actualizando production..."

git fetch origin
git checkout production
git reset --hard origin/production

echo "→ Limpiando build anterior..."

find . -maxdepth 1 \
    ! -name '.git' \
    ! -name '.gitignore' \
    ! -name '.cpanel.yml' \
    ! -name '.git' \
    ! -path './.git' \
    -delete

echo "→ Copiando nuevo build..."

cp -r "$BUILD_DIR"/. .

echo "→ Committing..."

git add -A

git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')" || {
    echo "→ No hay cambios para commit."
}

echo "→ Pushing production..."

git push origin production

echo "✓ Deploy terminado"