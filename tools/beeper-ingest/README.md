# Beeper → padhai ingest

Watches **WhatsApp** (via Beeper Desktop) for **PDFs and photos**, queues them for **your approval**, then files them into the matching `sem3/<course>/resources/` folder and appends a commit-able log.

## One-time setup

1. Beeper Desktop must be running (API at `http://127.0.0.1:23373`).
2. Create a token: **Beeper → Settings → Integrations → Approved connections → +**
3. Copy env file and paste the token:

```bash
cd ~/Documents/padhai/tools/beeper-ingest
cp .env.example .env
# edit .env → set BEEPER_ACCESS_TOKEN=...
```

4. Use the local venv (already created) or recreate:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
```

## Daily use

```bash
cd ~/Documents/padhai/tools/beeper-ingest

# sanity-check WhatsApp is connected
.venv/bin/python ingest.py accounts

# backfill recent attachments into the approval queue
.venv/bin/python ingest.py scan --hours 48

# OR live-watch (leave running)
.venv/bin/python ingest.py watch

# approve / refile / skip (auto-commits sem3/_meta/beeper-ingest-log.md)
.venv/bin/python ingest.py review
```

During `review`:

- **Enter** — accept suggested course
- **0..N** — pick a course from the list
- **u** — file under `sem3/_inbox/unsorted/`
- **s** — skip
- **q** — quit

## What gets committed

PDFs/photos stay **local** (gitignored). The ingest log at `sem3/_meta/beeper-ingest-log.md` is committed after approvals so the repo keeps an index without binaries.
