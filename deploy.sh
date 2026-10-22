#!/usr/bin/env bash
# Deploy helper — push-triggered Actions is currently dead on this repo
# (GitHub-side; likely flag residue). Until support fixes it, deploys are:
#   push, then manually dispatch the workflow, then verify.
# Usage: bash deploy.sh "commit message"
set -e
MSG="${1:-site update}"
cd "$(dirname "$0")"
git add -A
git commit -m "$MSG" || echo "(nothing to commit)"
GIT_TERMINAL_PROMPT=0 git push
sleep 5
GH="/c/Program Files/GitHub CLI/gh.exe"
[ -f "$GH" ] || GH=gh
"$GH" workflow run deploy.yml --ref main
echo "dispatched — watch: $("$GH" run list --limit 1 --json databaseId --jq '.[0].databaseId')"
