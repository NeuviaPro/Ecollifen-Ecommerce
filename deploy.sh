#!/bin/bash
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
error()   { echo -e "${RED}✗${NC} $1"; exit 1; }

# ─── Verificaciones iniciales ──────────────────────────
info "Verificando rama actual..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  error "Debes estar en main para deployar. Rama actual: $CURRENT_BRANCH"
fi

info "Verificando cambios sin commitear..."
if ! git diff-index --quiet HEAD --; then
  error "Tienes cambios sin commitear en main. Haz commit primero."
fi

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

# ─── Copia temporal ────────────────────────────────────
TMP_DIR="/tmp/ecollifen-build-$(date +%s)"
info "Guardando build en $TMP_DIR..."
cp -r dist/ "$TMP_DIR"
success "Build guardado"

# ─── Switch a production ───────────────────────────────
info "Cambiando a rama production..."
git checkout production
success "En rama production"

# ─── Limpieza ──────────────────────────────────────────
info "Limpiando build anterior..."
find .