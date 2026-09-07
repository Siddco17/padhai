#!/usr/bin/env python3
"""Least-squares h = a * raw + b and static characteristics.

Default input is sample.csv (synthetic). Pass template.csv after the lab.
Stdlib only for the fit; matplotlib is optional for the curve plot.
"""

from __future__ import annotations

import csv
import sys
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).resolve().parent


def load_rows(path: Path) -> list[dict]:
    rows = []
    with path.open(newline="") as f:
        for row in csv.DictReader(f):
            if not row.get("raw") or not row.get("height_cm"):
                continue
            rows.append(
                {
                    "h": float(row["height_cm"]),
                    "direction": row["direction"].strip().lower(),
                    "cycle": int(row["cycle"]),
                    "raw": float(row["raw"]),
                }
            )
    return rows


def linreg(x: list[float], y: list[float]) -> tuple[float, float]:
    n = len(x)
    sx = sum(x)
    sy = sum(y)
    sxx = sum(xi * xi for xi in x)
    sxy = sum(xi * yi for xi, yi in zip(x, y))
    den = n * sxx - sx * sx
    if den == 0:
        raise ValueError("raw values are constant; cannot fit")
    a = (n * sxy - sx * sy) / den
    b = (sy - a * sx) / n
    return a, b


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE / "sample.csv"
    if not path.is_file():
        path = HERE / path
    rows = load_rows(path)
    if not rows:
        print(f"no data in {path} — record fill/drain rows first")
        return 1

    fill1 = [r for r in rows if r["direction"] == "fill" and r["cycle"] == 1]
    if len(fill1) < 3:
        print("need at least 3 fill/cycle-1 points")
        return 1

    raw = [r["raw"] for r in fill1]
    h = [r["h"] for r in fill1]
    a, b = linreg(raw, h)
    h_hat = [a * ri + b for ri in raw]
    resid = [hi - hj for hi, hj in zip(h_hat, h)]
    span = max(h) - min(h)
    if span <= 0:
        print("span is 0; use more than one height")
        return 1

    lin_cm = max(abs(e) for e in resid)
    lin_pct = 100.0 * lin_cm / span

    fill_c1 = {r["h"]: r["raw"] for r in fill1}
    drain_c1 = {
        r["h"]: r["raw"]
        for r in rows
        if r["direction"] == "drain" and r["cycle"] == 1
    }
    hyst_cm = 0.0
    for height, raw_f in fill_c1.items():
        if height not in drain_c1:
            continue
        dh = abs((a * raw_f + b) - (a * drain_c1[height] + b))
        hyst_cm = max(hyst_cm, dh)
    hyst_pct = 100.0 * hyst_cm / span

    by_h = defaultdict(list)
    for r in rows:
        if r["direction"] == "fill":
            by_h[r["h"]].append(a * r["raw"] + b)
    rep_cm = 0.0
    for vals in by_h.values():
        if len(vals) >= 2:
            rep_cm = max(rep_cm, max(vals) - min(vals))
    rep_pct = 100.0 * rep_cm / span
    res_count_cm = abs(a)

    print(f"file: {path}")
    print(f"fill cycle-1 points: {len(fill1)}")
    print(f"h = {a:.8g} * raw + {b:.8g}")
    print()
    print("Paste into hydrostatic_level.ino:")
    print(f"float CAL_A = {a:.8g}f;")
    print(f"float CAL_B = {b:.8g}f;")
    print()
    print(f"span                 {span:.3f} cm")
    print(f"sensitivity          {a:.6g} cm/count")
    print(f"linearity (max|e|)   {lin_cm:.4f} cm  ({lin_pct:.3f} % span)")
    print(f"hysteresis           {hyst_cm:.4f} cm  ({hyst_pct:.3f} % span)")
    print(f"repeatability        {rep_cm:.4f} cm  ({rep_pct:.3f} % span)")
    print(f"resolution (1 count) {res_count_cm:.6g} cm")
    print()
    print("h_cm  raw_fill  h_fit  residual_cm")
    for r, hh, e in zip(fill1, h_hat, resid):
        print(f"{r['h']:5.1f}  {r['raw']:9.0f}  {hh:6.3f}  {e:+7.4f}")

    try:
        import matplotlib.pyplot as plt
    except ImportError:
        return 0

    drain1 = [r for r in rows if r["direction"] == "drain" and r["cycle"] == 1]
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(raw, h, "o", label="fill (cycle 1)")
    if drain1:
        ax.plot(
            [r["raw"] for r in drain1],
            [r["h"] for r in drain1],
            "s",
            label="drain (cycle 1)",
        )
    x0, x1 = min(raw), max(raw)
    nline = 50
    xline = [x0 + (x1 - x0) * i / (nline - 1) for i in range(nline)]
    ax.plot(xline, [a * xi + b for xi in xline], "-", label="least squares")
    ax.set_xlabel("raw counts")
    ax.set_ylabel("ruler height (cm)")
    ax.set_title("Calibration (label axes; replace sample.csv after lab)")
    ax.grid(True)
    ax.legend()
    fig.tight_layout()
    out = path.with_name(path.stem + "_curve.png")
    fig.savefig(out, dpi=120)
    print(f"\nwrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
