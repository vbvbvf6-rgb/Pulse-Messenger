#!/bin/bash
set -e

echo "[start] Applying database migrations..."
pnpm --filter @workspace/db run push --accept-data-loss || \
  pnpm --filter @workspace/db run push-force || \
  echo "[start] DB push failed — continuing anyway"

echo "[start] Starting server on port ${PORT:-8080}..."
PORT=${PORT:-8080} NODE_ENV=production node --enable-source-maps \
  /home/runner/workspace/artifacts/api-server/dist/index.mjs
