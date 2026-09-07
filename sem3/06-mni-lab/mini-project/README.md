# Liquid-level measurement using hydrostatic pressure

ECL204 MNI mini-project (15 of 100). Gauge pressure at the tank bottom is \(P = \rho g h\); height is **calibrated against a ruler**.

```
Water column h → MPS20N0040D (gauge) → HX710B (24-bit) → ESP32 → 16×2 LCD (cm)
                                      ↘ Serial CAL dump → least-squares h = a·raw + b
```

| File | What |
|------|------|
| [bom.md](bom.md) | What to order (not a BMP280) |
| [hydrostatic_level/hydrostatic_level.ino](hydrostatic_level/hydrostatic_level.ino) | Firmware for ESP32 Dev Module: CAL dump + RUN height |
| [calibration/protocol.md](calibration/protocol.md) | Wiring, 8–10 point fill/drain, hysteresis |
| [calibration/template.csv](calibration/template.csv) | Empty table for the real lab |
| [calibration/sample.csv](calibration/sample.csv) | Synthetic data to test the fitter only |
| [calibration/fit.py](calibration/fit.py) / [fit.m](calibration/fit.m) | Least squares + static characteristics |
| [report.md](report.md) | MNI-language report (fill numbers after the lab) |

## Afternoon 1 — wire and LCD

1. Order the kit in `bom.md` if it is not on the bench.
2. Tube from near the **bottom** of the bottle to the sensor port. Sensor stays **dry** on the bench; bleed bubbles.
3. Arduino IDE: board **ESP32 Dev Module**. Flash `hydrostatic_level.ino`. Serial **115200**: type `c` for CAL (prints averaged raw), `r` for RUN.
4. LCD should show `CAL raw=...`. If it is blank, set `LCD_ADDR` to `0x3F`, or power-cycle with the LCD on **3.3 V** (not 5 V).

## Afternoon 2 — calibration

Follow `calibration/protocol.md`. Paste rows into `template.csv`. Run:

```bash
python3 calibration/fit.py calibration/template.csv
```

or open `fit.m` in MATLAB. Copy `CAL_A` / `CAL_B` into the sketch, flash, demo fill/drain in 3 minutes.

`sample.csv` is **not** a measurement. Use it only to check that the fitter runs:

```bash
python3 calibration/fit.py
```
