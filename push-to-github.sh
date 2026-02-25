#!/usr/bin/env bash
# Push this repo to GitHub. Requires GITHUB_TOKEN env var with push permission.
# Usage: GITHUB_TOKEN=your_token_here ./push-to-github.sh

set -e
cd "$(dirname "$0")"

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: Set GITHUB_TOKEN first. Example:"
  echo "  export GITHUB_TOKEN=github_pat_xxxx"
  echo "  ./push-to-github.sh"
  exit 1
fi

echo "Setting remote and pushing..."
git remote set-url origin "https://BWM2025:${GITHUB_TOKEN}@github.com/BWM2025/ApexORCA.git"
git push -u origin main

echo "Clearing token from remote URL..."
git remote set-url origin "https://github.com/BWM2025/ApexORCA.git"

echo "Done. Code is on GitHub. Go to Vercel and import BWM2025/ApexORCA (root: apps/web)."
