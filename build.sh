#!/bin/bash
set -euo pipefail

# Simple build script for Cloudflare Pages without external dependencies
echo "Installing dependencies..."
npm ci --prefer-offline

echo "Building with vinext..."
./node_modules/.bin/vinext build

echo "Build complete!"
