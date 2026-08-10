# padhai

## Cursor Cloud specific instructions

This repo is a **static, dependency-free** study vault. There is **no package manager, no build step, no backend, and no database** — do not look for `package.json`, `requirements.txt`, etc.

Two things live here:
- `sem3/` — Markdown notes and placeholder folders per subject (PDFs are gitignored). Nothing to run; just read the files.
- `docs/index.html` — a single self-contained static web guide (vanilla HTML/CSS/JS, no dependencies) deployed to GitHub Pages via `.github/workflows/pages.yml` on push to `main`.

### Running / previewing the web guide locally
Serve the `docs/` folder with any static server, e.g.:

```
python3 -m http.server 8000 --directory docs
```

Then open `http://localhost:8000/`. You can also just open `docs/index.html` directly with `file://`. There is nothing to install or compile — this IS the dev workflow.

### Non-obvious notes
- Lint/test/build: there are none. Correctness = the page renders and its JS (tab switching + subject search filter) works in a browser.
- The Subjects tab search filter matches on subject **name and course code only** (not the short ids like `emft`/`sns`). So searching `emft` returns no cards while `electro` or `ECL305` matches "Electromagnetic Fields" — this is expected, not a bug.
- Google Fonts are loaded from a CDN; offline the page still renders fine with fallback system fonts.
