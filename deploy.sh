#!/bin/bash
set -e

echo "→ Building Ecollifen..."
npm run build

echo "→ Switching to production branch..."
git checkout production

echo "→ Cleaning old build..."
git rm -rf . --quiet
git checkout HEAD -- .cpanel.yml
git checkout HEAD -- .gitignore

echo "→ Copying new build..."
cp -r dist/. .

echo "→ Committing build..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"

echo "→ Pushing to origin/production..."
git push origin production

echo "→ Back to main..."
git checkout main

echo "✓ Build pusheado a production"