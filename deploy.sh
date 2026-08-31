#!/bin/bash

# ─── Log setup ─────────────────────────────────────────
LOGFILE="deploy.log"
exec > >(tee -a "$LOGFILE") 2>&1

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  DEPLOY $(date '+%Y-%m-%d %H:%M:%S')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

set -e

# ─── Colores ───────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ─── Helpers ───────────────────────────────────────────
info()    { echo -e "${BLUE}→${NC} $1"; }
success() { echo -e "${GREEN}✓${NC} $1"; }
warning() { echo -e "${YELLOW}⚠${NC} $1"; }
error()   { echo -e "${RED}✗ ERROR:${NC} $1"; echo ""; echo "Deploy fallido — revisa deploy.log para más detalles"; echo ""; read -p "Presiona Enter para cerrar..."; exit 1; }

# ─── Verificaciones iniciales ──────────────────────────
info "Verificando rama actual..."
CURRENT_BRANCH=$(git branch --show-current)
echo "  Rama: $CURRENT_BRANCH"
if [ "$CURRENT_BRANCH" != "main" ]; then
  error "Debes estar en main para deployar. Rama actual: $CURRENT_BRANCH"
fi

info "Verificando cambios sin commitear..."
if ! git diff-index --quiet HEAD --; then
  error "Tienes cambios sin commitear en main. Haz commit primero."
fi
success "Rama y estado OK"

# ─── Push main ─────────────────────────────────────────
info "Pusheando main a GitHub..."
git push origin main
success "main actualizado en GitHub"

# ─── Build ─────────────────────────────────────────────
info "Buildeando Ecollifen..."
npm run build
success "Build completado"

# ─── Verificar que dist/ existe ────────────────────────
if [ ! -d "dist" ]; then
  error "La carpeta dist/ no existe. El build falló."
fi
echo "  Archivos en dist/:"
ls dist/

# ─── Copia temporal ────────────────────────────────────
TMP_DIR="/tmp/ecollifen-build-$(date +%s)"
info "Guardando build en $TMP_DIR..."
cp -r dist/ "$TMP_DIR"
echo "  Archivos copiados:"
ls "$TMP_DIR"
success "Build guardado"

# ─── Switch a production ───────────────────────────────
info "Cambiando a rama production..."
git checkout production
success "En rama production"

# ─── Limpieza ──────────────────────────────────────────
info "Limpiando build anterior..."
find . -not -name '.git' \
       -not -name '.gitignore' \
       -not -name '.cpanel.yml' \
       -not -path './.git/*' \
       -maxdepth 1 \
       -delete
success "Limpieza completada"

# ─── Copia del nuevo build ─────────────────────────────
info "Copiando nuevo build..."
cp -r "$TMP_DIR"/* .
rm -rf "$TMP_DIR"
echo "  Archivos en production:"
ls .
success "Build copiado"

# ─── Commit y push production ──────────────────────────
info "Commiteando..."
git add -A

if git diff-index --quiet HEAD --; then
  warning "No hay cambios nuevos respecto al último deploy"
else
  git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"
  info "Pusheando production a GitHub..."
  git push origin production
  success "production actualizado en GitHub"
fi

# ─── Volver a main ─────────────────────────────────────
git checkout main
success "De vuelta en main"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}  Deploy exitoso${NC}"
echo "  Ahora ve a cPanel:"
echo "  1. Update from Remote"
echo "  2. Deploy HEAD Commit"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Presiona Enter para cerrar..."