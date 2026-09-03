#!/usr/bin/env bash
# Full Beeper WhatsApp backfill → auto-file academic PDFs/photos.
# Requires Beeper Desktop open (API on http://127.0.0.1:23373).
set -euo pipefail
cd "$(dirname "$0")"
PY=.venv/bin/python

echo "Waiting for Beeper Desktop API…"
for _ in $(seq 1 60); do
  if $PY ingest.py accounts >/dev/null 2>&1; then
    echo "Beeper API ready."
    break
  fi
  sleep 3
done

if ! $PY ingest.py accounts >/dev/null 2>&1; then
  echo "error: Beeper Desktop API not reachable. Open Beeper Desktop and retry." >&2
  exit 1
fi

echo "Scanning entire WhatsApp history…"
$PY ingest.py scan --all

echo "Auto-filing academic attachments…"
$PY ingest.py auto

echo "Done. Review sem3/_meta/beeper-ingest-log.md and sem3/_inbox/unsorted/ for leftovers."
