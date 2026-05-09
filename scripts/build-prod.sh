#!/bin/bash
set -e

echo "[build] Installing dependencies..."
pnpm install --frozen-lockfile

echo "[build] Building frontend..."
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/pulse run build

echo "[build] Building API server..."
pnpm --filter @workspace/api-server run build

echo "[build] Done."
