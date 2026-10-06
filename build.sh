#!/bin/bash
set -euo pipefail

# Cloudflare Pages build: installs dependencies, then builds and packages the
# site into out/ (see scripts/package-pages.mjs).
echo "Installing dependencies..."
npm ci --prefer-offline

echo "Building with vinext..."
npm run build

echo "Build complete!"
