#!/usr/bin/env bash
# 发布前把根目录 README.md 复制到各子包，使子包发布时能带上 README。
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGES=(core bar line pie stack scatter wordcloud bar-horizontal table echarts-readymade)

for pkg in "${PACKAGES[@]}"; do
  cp "$ROOT_DIR/README.md" "$ROOT_DIR/packages/$pkg/README.md"
  echo "prepared: packages/$pkg/README.md"
done

echo "Release preparation done."
