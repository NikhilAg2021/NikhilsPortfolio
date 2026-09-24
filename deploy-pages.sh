#!/usr/bin/env bash
# Builds the static (no-backend) version of the site and publishes it to the
# gh-pages branch, which GitHub Pages serves at
# https://nikhilag2021.github.io/NikhilsPortfolio/
#
# Usage (Git Bash):  ./deploy-pages.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
SHA="$(git -C "$ROOT" rev-parse --short HEAD)"

echo "Building static site..."
(cd "$ROOT/frontend" && npm run build:pages >/dev/null)
touch "$ROOT/frontend/dist/.nojekyll" # serve files as-is, skip Jekyll processing

# Check out gh-pages in a throwaway worktree so the main working folder is untouched.
WT="$(mktemp -d)"
git -C "$ROOT" fetch -q origin gh-pages
git -C "$ROOT" worktree add -q --detach "$WT" origin/gh-pages
trap 'git -C "$ROOT" worktree remove --force "$WT"' EXIT

git -C "$WT" rm -rq --ignore-unmatch .
cp -r "$ROOT/frontend/dist/." "$WT/"
git -C "$WT" add -A

if git -C "$WT" diff --cached --quiet; then
  echo "Nothing changed since the last deploy."
  exit 0
fi

git -C "$WT" commit -q -m "Deploy portfolio site from main@$SHA"
git -C "$WT" push -q origin HEAD:gh-pages
echo "Deployed main@$SHA. GitHub Pages usually updates within a minute or two."
