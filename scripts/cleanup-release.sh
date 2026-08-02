#!/usr/bin/env bash
# 发布后删除复制到各子包的 README.md，保持子包目录干净（不维护副本）。
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGES=(core bar line pie stack scatter wordcloud bar-horizontal table echarts-readymade)

for pkg in "${PACKAGES[@]}"; do
  if [ -f "$ROOT_DIR/packages/$pkg/README.md" ]; then
    rm "$ROOT_DIR/packages/$pkg/README.md"
    echo "cleaned: packages/$pkg/README.md"
  fi
done

echo "Cleanup done."
