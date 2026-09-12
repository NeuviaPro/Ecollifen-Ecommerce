#!/bin/bash
# Despliegue a producción.
#
# La rama `production` NO contiene código fuente: lleva el BUILD (el contenido
# de dist/) en su raíz. cPanel Git Version Control la clona en el servidor y su
# .cpanel.yml hace el rsync hacia public_html.
#
# Por eso este script cambia de rama a mitad de camino, y por eso hay que tener
# cuidado: entre el checkout y el final, el directorio de trabajo tiene el build
# encima del proyecto.
set -e

RAMA_ORIGEN=$(git rev-parse --abbrev-ref HEAD)
TEMPORAL=/tmp/ecollifen-build

# Se vuelve a la rama de partida PASE LO QUE PASE: error, Ctrl+C o push
# rechazado. Sin esto, un fallo a medio camino dejaba el repo parado en
# `production`, con el build volcado sobre el código fuente y sin package.json
# ni src/ — exactamente lo que ocurrió el 2026-09-11, cuando el push se rechazó
# por divergencia y `set -e` abortó antes de volver.
restaurar() {
    git checkout "$RAMA_ORIGEN" --quiet 2>/dev/null || true
    rm -rf "$TEMPORAL"
}
trap restaurar EXIT

# Con cambios sin confirmar, el checkout a production fallaría a medias y
# dejaría el repo en un estado difícil de leer. Mejor no empezar.
if [ -n "$(git status --porcelain)" ]; then
    echo "✗ Hay cambios sin confirmar. Haz commit (o stash) antes de desplegar."
    exit 1
fi

echo "→ Compilando…"
npm run build

echo "→ Guardando el build aparte…"
rm -rf "$TEMPORAL"
cp -a dist/. "$TEMPORAL"

echo "→ Cambiando a production…"
git checkout production --quiet

# OJO con el "/." final: con `cp -a origen/* .` el comodín NO incluye los
# archivos que empiezan por punto, así que .htaccess nunca entraba en la rama
# —ni llegaba al servidor— y con él se quedaban fuera la página 404 propia, la
# compresión y las cabeceras de caché. El que hay hoy en public_html es un
# resto de los despliegues por FTP: sigue ahí solo porque el rsync no borra.
echo "→ Copiando el build (incluidos los archivos ocultos)…"
cp -a "$TEMPORAL"/. .

echo "→ Confirmando…"
git add -A
if git diff --cached --quiet; then
    echo "  sin cambios respecto al último despliegue."
else
    git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')" --quiet
fi

echo "→ Subiendo…"
git push origin production

echo "✓ Build publicado en la rama production."
echo "  Falta el último paso, en cPanel: Git Version Control → Deploy HEAD Commit."
