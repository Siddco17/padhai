# Calibration protocol

Hardware is assumed as in `../bom.md` and `../README.md`. Firmware starts in CAL until `CAL_A` / `CAL_B` are pasted.

## Mechanical

1. Fit a tube at the **bottom** of the bottle (side hole + hot glue, or a rigid straw to the floor of the bottle).
2. Other end of the tube onto the HX710B / MPS20 port. Sensor on the bench, **dry**. Vent the second (atmosphere) port if the module has two nipples.
3. Tape a ruler to the bottle. Zero at the inner floor, or record a fixed offset and subtract it.
4. Fill slowly. Tap the tube to knock out bubbles. Wait ~10 s at each point.

## Wiring (HX710B is not I2C)

| Module | ESP32 DevKit |
|--------|------------|
| VCC / VIN | **3V3** (not 5 V) |
| GND | GND |
| OUT / DOUT | GPIO 16 |
| SCK / SCLK / SLC | GPIO 17 |
| LCD SDA / SCL | GPIO 21 / 22 (LCD VCC on 3V3) |

## Fill / drain table (8–10 points)

Serial **115200**. Type `c`. Each line is `raw,<counts>` (average of 8 conversions).

Use the same heights going **up** and **down**:

`0, 5, 10, 15, 20, 25, 30, 35, 40 cm` (skip 40 if the bottle is shorter).

At each height:

1. Match the meniscus to the ruler (eye level).
2. Wait for Serial raw to settle (± a few hundred counts).
3. Copy one value into `template.csv` with `direction=fill` or `drain`, `cycle=1`.

Repeat **20 cm fill** as `cycle=2` and `cycle=3` (repeatability).

Do not drain by sucking on the tube (wet the sensor). Pour or siphon from the bottle mouth.

## Least squares

```bash
python3 fit.py template.csv
```

or run `fit.m` in MATLAB. Fit uses **fill, cycle 1**: \(h = a \cdot \mathrm{raw} + b\).

Paste the printed `CAL_A` / `CAL_B` into `hydrostatic_level.ino`, flash, type `r`. LCD is height in cm. GPIO 2 (onboard LED) lights if \(h > 45\) cm.

## Static characteristics (for the report)

After the fit prints them, copy into `../report.md`:

- Sensitivity \(a\) (cm/count)
- Linearity error: max \(|a\cdot\mathrm{raw}+b - h_{\text{ruler}}|\) as % of span
- Hysteresis: max \(|h_{\text{fill}}-h_{\text{drain}}|\) at the same ruler height, % span
- Repeatability: range of the 20 cm repeats, % span
- Resolution: \(|a|\) per count, and std of the 20 cm repeats if you logged them

## Sample file

`sample.csv` is synthetic. Do not put those numbers in the submitted table. Use it only to test `fit.py` / `fit.m`.
