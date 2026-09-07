# Liquid-level measurement using hydrostatic pressure (gauge sensor)

**Course:** ECL204 Measurements & Instrumentation (lab + mini-project, 15 of 100)  
**Team:** Thrishanth, Siddharth Sharma  
**Sensor (signup sheet):** pressure sensor  
**Do not treat this file as finished numbers.** Main tables stay blank until the bottle, ruler, and MPS20N0040D + HX710B kit are on the bench. Appendix A is synthetic only, to show that the least-squares scripts run.

---

## 1. Objective

To realize a **measurement system** that reports liquid height \(h\) from gauge pressure at the base of a column, then to **calibrate** that system against an independent length standard and to report the usual static characteristics.

This is the same measurand as the department’s ultrasonic liquid-level experiment, but the transduction is hydrostatic pressure (Unit 3: diaphragms, strain-gauge bridges) rather than time-of-flight.

---

## 2. Principle of measurement

For a liquid of density \(\rho\) in a gravitational field \(g\), the **gauge** pressure at depth \(h\) (free surface at atmospheric pressure \(P_\mathrm{atm}\)) is

\[
P = \rho g h.
\]

Rearranged, the measurand is

\[
h = \frac{P}{\rho g}.
\]

**Gauge vs absolute vs differential.** An absolute sensor (BMP280-class barometer) measures \(P_\mathrm{atm}+\rho g h\). Campus weather is order 1 kPa, which is already \(\sim 10\,\mathrm{cm}\) of water, so the calibration standard is lost in the atmosphere. A **gauge** sensor (or a differential sensor with one port to atmosphere) rejects \(P_\mathrm{atm}\) to first order. The MPS20N0040D-D on the HX710B module is used as a gauge device: one side of the diaphragm sees the tube, the other sees atmosphere.

**Transducer.** The MPS20N0040D is a MEMS diaphragm with a piezoresistive **Wheatstone bridge** (input/output impedance typically 4–6 kΩ). Diaphragm deflection → strain → \(\Delta R\) → millivolt-level bridge output. Full-scale is specified near 40 kPa (\(\approx 4.1\,\mathrm{m}\) of water). A 30–50 cm bottle uses only a fraction of that span; the report must say so (use of a small part of FSO raises the relative importance of offset and hysteresis).

The HX710B is a 24-bit delta-sigma ADC with a bridge front-end (same clocked DOUT/SCK protocol as HX711). It is **signal conditioning + ADC**, not I2C. Firmware never claims a factory pascal scale: the **chain** (sensor + ADC + averaging) is calibrated in one shot as

\[
h = a \cdot \mathrm{raw} + b.
\]

That is the same least-squares idea as the MATLAB linear-regression lab.

**Air column.** The module is specified for non-corrosive **gas** on the port. Water is not admitted into the die. A short trapped-air tube couples hydrostatic pressure to the diaphragm. Any “air spring” nonlinearity is not modelled; it appears in the **linearity residual** after the fit. Bubbles are an error source (Section 7).

---

## 3. Measurement chain

```
[ water column h ]
        |
        |  P = ρ g h  (gauge)
        v
[ MPS20N0040D diaphragm + bridge ]
        |
        |  mV
        v
[ HX710B 24-bit ADC, gain 128 ]
        |
        |  raw counts (8-sample average)
        v
[ ESP32 DevKit ]
        |
        +--> 16×2 I2C LCD  (h in cm)     [display]
        +--> Serial CAL dump             [calibration]
        +--> GPIO 2 if h > 45 cm         [range flag]
        |
[ ruler / known h ] -- least squares --> a, b
```

Block-diagram language for the viva: **sensor → conditioning → conversion → display**, with an independent **standard** (ruler) closing the calibration loop.

| Block | Role (Bentley / Doebelin) |
|-------|---------------------------|
| Column + tube | Coupling of measurand \(h\) to pressure |
| Diaphragm + bridge | Primary sensing element |
| HX710B | Amplification, filtering, analog-to-digital conversion |
| Average of 8 samples | Crude digital filter (reduces display flicker) |
| \(h=a\cdot\mathrm{raw}+b\) | Static calibration of the whole chain |
| LCD | Readout |

Firmware: `mini-project/hydrostatic_level/hydrostatic_level.ino` (Arduino-ESP32 core). Dumb on purpose: no Wi-Fi, no “smart tank.”

---

## 4. Apparatus

- MPS20N0040D-D + HX710B module (0–40 kPa), ESP32 DevKit (WROOM-32), 16×2 I2C LCD on 3.3 V (address 0x27 or 0x3F)
- PET bottle (1–1.5 L), silicone tube, steel ruler (1 mm), breadboard
- Water at room temperature (density taken as \(998\,\mathrm{kg\,m^{-3}}\) unless a thermometer reading is noted)

Wiring is in `calibration/protocol.md`. Clock pin names on cheap boards vary (`SCK` / `SCLK` / `SLC`); the protocol is still HX711-style, not I2C.

---

## 5. Calibration procedure

1. Zero the ruler at the inner floor of the bottle (or record a fixed offset).
2. Serial monitor at 115200 baud; CAL mode (`c`) prints `raw,<counts>`.
3. **Fill** in steps of 5 cm from 0 to \(\sim 40\) cm (8–10 points). At each step wait for the meniscus and for Serial to settle; log one averaged raw value.
4. **Drain** through the same heights (hysteresis).
5. Repeat 20 cm fill two more times (repeatability).
6. Fit **fill, cycle 1** only:

\[
\min_{a,b} \sum_i \bigl( a \cdot \mathrm{raw}_i + b - h_i \bigr)^2.
\]

Python: `python3 calibration/fit.py calibration/template.csv`  
MATLAB: `fit.m` (same formulae, `polyfit`).

7. Paste `CAL_A`, `CAL_B` into the sketch, flash, RUN mode (`r`). Demo: pour water, LCD tracks centimetres.

Theoretical slope if the ADC were already in pascals: \(dh/dP = 1/(\rho g) \approx 0.102\,\mathrm{cm/Pa}\). We do **not** use that as the displayed calibration; we use the ruler. The theoretical slope is only a sanity check if someone later converts counts to kPa from a datasheet.

---

## 6. Static characteristics (fill after the lab)

Definitions follow the Unit 1 list (static characteristics, least squares) and the usual lab-journal wording.

**Span** \(H = h_\max - h_\min\) (ruler).

| Quantity | Definition used here | Measured |
|----------|----------------------|----------|
| Sensitivity | \(a = dh/d(\mathrm{raw})\) from the fill LS fit |  ___ cm/count |
| Linearity error | \(\max_i \lvert a\cdot\mathrm{raw}_i+b-h_i\rvert / H \times 100\%\) (fill, cycle 1) |  ___ % span |
| Hysteresis | \(\max \lvert h_\mathrm{fill}-h_\mathrm{drain}\rvert / H \times 100\%\) at the same ruler \(h\) |  ___ % span |
| Repeatability | range of indicated \(h\) at 20 cm fill, cycles 1–3, / \(H \times 100\%\) |  ___ % span |
| Resolution | \(\lvert a\rvert\) (one count); also std of repeats if logged |  ___ cm |

Datasheet hysteresis for the MEMS element is quoted around \(\pm 0.7\%\) FSO of **pressure**, which is not the same as hysteresis of **our** 40 cm bottle in % of **our** span. Do not copy the datasheet row into the table above.

### 6.1 Calibration data (lab)

Copy from `template.csv`. Strike this table if the CSV is attached as an appendix instead.

| \(h\) ruler (cm) | raw fill | raw drain | \(h\) fit fill (cm) | residual (cm) |
|------------------|----------|-----------|---------------------|---------------|
| 0 |  |  |  |  |
| 5 |  |  |  |  |
| 10 |  |  |  |  |
| 15 |  |  |  |  |
| 20 |  |  |  |  |
| 25 |  |  |  |  |
| 30 |  |  |  |  |
| 35 |  |  |  |  |
| 40 |  |  |  |  |

Repeatability (20 cm fill): cycle 1 ___  cycle 2 ___  cycle 3 ___

**Fit (lab):** \(a=\) ______ , \(b=\) ______

Attach the Python/MATLAB plot of raw vs ruler height (fill and drain markers, LS line).

---

## 7. Error budget (short)

Order-of-magnitude only. Combine in the viva as “dominant / negligible,” not a full GUM table unless asked.

| Source | Mechanism | Size (order) |
|--------|-----------|----------------|
| Ruler | 1 mm graduation, parallax | \(\sim 1\,\mathrm{mm}\) |
| Density / temperature | \(\rho(T)\); \(\sim 0.2\%\) per \(10^\circ\mathrm{C}\) for water near 20 °C | few mm on a 40 cm column per 10 °C if \(\rho\) is assumed fixed |
| Atmosphere | Gauge connection; residual if vent is blocked | should be small if the vent port is open |
| ADC quantization | 24-bit HX710B vs ESP32 on-chip ADC | one count is \(\lvert a\rvert\) after calibration; averaging 8 samples reduces display jitter |
| Use of span | 40 cm water \(\approx 3.9\,\mathrm{kPa}\) vs 40 kPa FSO | offset, 1/f noise, and hysteresis of the sensor weigh more than they would near FSO |
| Tube / bubbles | Air pocket, meniscus in the tube, leak | often the largest **practical** error; shows up as hysteresis and drift |
| Alignment | Ruler not vertical; bottle not uniform area | systematic \(h\) error |

The ESP32’s on-chip ADC is 12-bit, 3.3 V full-scale, and nonlinear — the wrong converter for a millivolt bridge. That sentence is the Unit 4 justification for HX710B. Power the module from 3.3 V so DOUT never exceeds the ESP32’s pin rating.

---

## 8. Results and discussion

*Write after Afternoon 2. Suggested structure:*

- State \(a\), \(b\), and the five static numbers from `fit.py`.
- Compare linearity and hysteresis to the MEMS datasheet **qualitatively** (different FSO).
- If drain lies above fill (or vice versa), say whether bubbles or tube creep is the likely cause.
- Confirm the LCD demo: pour, settle, readout vs ruler at two points (e.g. 10 cm and 30 cm).

There is no IoT result to discuss.

---

## 9. Conclusion

A gauge pressure chain plus a ruler calibration is a complete MNI measurement system for liquid level: identified measurand, identified standard, least-squares static model, and a short error budget. The live display is only the last block of that chain.

---

## 10. References

1. J. P. Bentley, *Principles of Measurement Systems*.
2. E. O. Doebelin, *Measurement Systems: Application and Design*.
3. MPS20N0040D pressure-sensor datasheet (bridge, 0–40 kPa, hysteresis / linearity specs).
4. HX710 / HX710B 24-bit ADC datasheet (DOUT/SCK protocol).
5. ECL204 laboratory manual: liquid-level measurement; linear regression in MATLAB.

---

## Appendix A — Fitter check (not lab data)

`calibration/sample.csv` is synthetic. It exists so `fit.py` and `fit.m` can be run before the module arrives. **Do not copy these coefficients onto the ESP32 for the demo, and do not put them in Section 6.**

Run:

```bash
python3 calibration/fit.py
```

Expected: a printout of \(a\), \(b\), and linearity / hysteresis / repeatability. If matplotlib is installed, also `sample_curve.png`.
