#!/bin/bash
# Vercel "Ignored Build Step" (vercel.json ignoreCommand).
# Exit 0 skips the build; exit 1 builds.
# Production (pushes to main) always builds. Previews skip when every changed
# file is a .md file or sits under docs/.

if [ "$VERCEL_ENV" = "production" ]; then
  echo "Production deploy: building."
  exit 1
fi

# Compare with the last deployed commit when Vercel gives one, else the parent.
base="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"
if ! git cat-file -e "$base^{commit}" 2>/dev/null; then base="HEAD^"; fi

if ! changed=$(git diff --name-only "$base" HEAD 2>/dev/null) || [ -z "$changed" ]; then
  echo "Could not list changed files: building to be safe."
  exit 1
fi

if echo "$changed" | grep -qvE '(\.md$|^docs/)'; then
  echo "Site files changed: building preview."
  exit 1
fi

echo "Only .md or docs/ files changed: skipping preview."
exit 0
