#!/bin/bash
set -e

echo "→ Building..."
npm run build

echo "→ Switching to production branch..."
git checkout production

echo "→ Copying dist contents..."
cp -r dist/* .

echo "→ Committing build..."
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M')"

echo "→ Pushing to origin/production..."
git push origin production

echo "→ Back to main..."
git checkout main

echo "✓ Deploy pushed"

chmod +x deploy.sh