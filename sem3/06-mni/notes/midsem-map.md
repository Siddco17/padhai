# ECL204 MNI — MST-1 map (10 h)

**Scope (this year’s board):** static characteristics, types of error, limiting error, linear + exponential regression, first-order dynamics (step / ramp / impulse / sine), Wheatstone + quarter/half/full, zeroth-order loading, op-amp (inverting / non-inverting / follower), differential amp, instrumentation amp, PMMC, meter extension including Ayrton.

**Do not grind in these 10 h:** second-order (Tutorial-1 Q4 only if you finish early), Schering / Wien / Maxwell, LVDT / CRO, thermistor *design*, ADC/DAC, IEEE-488, sensor survey.

**Success:** (1) accuracy ≠ precision ≠ resolution ≠ sensitivity in one sentence each, (2) a limiting-error combination including a power without looking up the rule, (3) first-order step/ramp/sine numbers, (4) Wheatstone Q/H/F + pot \(E_o/E_i\), (5) three op-amp gains + IA formula, (6) \(R_{sh}\), \(R_{se}\), one Ayrton string.

Each sitting: **read 20–35 min → closed-book recap → drill**. Do not open Bentley/Sawhney unless a formula is missing.

## Hours (10 h)

| Block | Hours | Job | Read first |
|-------|-------|-----|------------|
| 0 | 1.0 | Static defs + four dartboards; gross / systematic / random | `resources/notes/Static_Characteristics_1.pdf`, `Static_Characteristics_2.pdf`; `Classification_of_Errors.pdf` or Unit-2 §2.2; `p45-4-5_Wheatstone.pdf` error pages |
| 1 | 1.5 | Limiting error \(+\ -\ \times\ \div\) power; linear + exponential regression | `Limiting_Errors_2-16.pdf`; `Limiting_Error_A.pdf`; Unit-2 §2.5.4 and §2.5.6 |
| 2 | 1.5 | First-order step, ramp, impulse, sinusoidal | `Step_and_Ramp_Response_First_Order.pdf`; `Tutorial_Appendix_1.pdf`; `Tutorial_1.pdf` Q1–Q3 |
| 3 | 1.5 | Bridge; Q/H/F derivation; zeroth-order loading | `Bridge_and_Loading_Effect.pdf` (all 5 pp); `Wheatstone_Bridge.pdf` |
| 4 | 1.5 | Op-amp inv / non-inv / follower; diff amp; IA | ACD `resources/20260810T192659Z_OPAMP (2).pdf`; Bridge PDF pp. 3–4 |
| 5 | 1.5 | PMMC; ammeter / voltmeter / Ayrton | `PMMC.pdf`; `PMMC_Ohmmeter_Meter_Extension.pdf` |
| 6 | 1.5 | Timed 2022 first sessional (16 marks, 60 min) then mark | Close notes. Paper: `resources/pyqs/MI_PYQs.pdf` **p.3** |

## Topic × resource × paper

| Topic | Read | Drill |
|-------|------|-------|
| Accuracy / precision / resolution / threshold | `Static_Characteristics_1.pdf` | Recite the four bullets with the dartboard picture |
| Range, span, bias, sensitivity, hysteresis, linearity, drift | `Static_Characteristics_2.pdf` | Ex 2.5 \(0.2\,\Omega/^\circ\mathrm{C}\); Ex 2.10 error vs correction |
| Gross / systematic / random | `Classification_of_Errors.pdf`; Unit-2 §2.2 | Unit-2 SAQ 1(e) four cases |
| Limiting / guarantee error + FSD | `Limiting_Error_A.pdf`; `Limiting_Errors_2-16.pdf` | **0–150 V, 1% FSD at 75 V → 2%** |
| Combining limiting errors | same; Unit-2 §2.5.6 | \(R=P/I^2\Rightarrow\pm 3.5\%\) |
| Linear / exponential regression | Unit-2 §2.5.4; Tutorial-1 Q5–Q6 | **2022 MST Q1** \(y=ae^{bx}\) |
| 1st-order step / ramp / impulse / sine | Step-and-ramp PDF; Tutorial appendix | Tutorial-1 Q1–Q3; **2022 MST Q2, Q5** |
| Wheatstone balance + Q / H / F | Bridge notes pp. 1–2 | \(E_o=(E/4)\delta\), \((E/2)\delta\), \(E\delta\); endsem Q2(a) |
| Zeroth-order pot loading | Bridge notes p. 5 | \(E_o/E_i=k/[1+(R_p/R_L)k(1-k)]\); **2022 MST Q3** |
| Op-amp three configs | ACD OPAMP (2).pdf | Gains from golden rules, book closed |
| Diff amp + 3-op-amp IA | Bridge notes pp. 3–4 | \(v_o=(R_2/R_1)(1+2R_f/R_G)(v_2-v_1)\) |
| PMMC + meter extension | `PMMC.pdf`; meter-extension PDF | \(R_{sh}=R_m/(m-1)\), \(R_{se}=(m-1)R_m\); **2022 MST Q4** Ayrton |

## PYQ files

- [`resources/pyqs/MI_PYQs.pdf`](../resources/pyqs/MI_PYQs.pdf) **p.3** — First sessional Sept 2022, 1 h, 16 marks. **This is the MST template.**
- Same PDF pp. 1–2 = endsem Dec 2022. Overlap only: **Q2(a)** Q/H/F derivation, **Q2(b)** zeroth-order loading, **Q7** Ayrton. Skip Schering, thermistor design, capacitive tank.
- Same PDF p. 4 = second sessional Oct 2022 (Wien / Maxwell / thermistor). **Skip.**
- `resources/pyqs/PYQ_W23_*_EEL201.pdf` and `W24_*` are **Network Theory** misfiles. Ignore.

## 2022 first sessional (must finish in Block 6)

| Q | Marks | What | Sit in |
|---|-------|------|--------|
| 1 | 4 | Exponential regression \(y=ae^{bx}\) | Block 1, then 6 |
| 2 | 3 | 1st-order thermometer, ramp lag | Block 2, then 6 |
| 3 | 3 | 4–20 mA transmitter loading in Pa. Norton **\(R_N=10^4\,\Omega\)** as printed | Block 3, then 6 |
| 4 | 3 | Ayrton 10 mA / 100 mA / 1 A from 1 mA, 100 Ω + series ohmmeter | Block 5, then 6 |
| 5 | 3 | 1st-order step air→water→air, error at 20 s and 140 s | Block 2, then 6 |

## Exam-day order

1. Limiting-error or definition 1-markers.
2. First-order numbers (step leftover \(=e^{-t/\tau}\), ramp lag \(\to m\tau(1-e^{-t/\tau})\)).
3. Wheatstone / loading / IA algebra (one diagram).
4. Ayrton if it is on the paper — you have Block 5 now.
5. Regression last if the clock dies — write \(\ln y=\ln a+bx\) and the two normal equations even if the arithmetic is unfinished.
