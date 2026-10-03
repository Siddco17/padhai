# ECL308 ACD — MST-1 map

**Sat.** September 2026 paper and the **9/30** are in [`midsem-2026.md`](midsem-2026.md). Use this file as the formula bank while redoing that paper.

**Scope:** handwritten mid-sem syllabus only. Do **not** grind Schmitt, filters, oscillators, 555, ADC/DAC, PLL, 723.

**Local copies:** `resources/notes/MST_Syllabus.pdf`, `resources/practice/GATE_opamp_01Sep2026.pdf`

**Success:** (1) DC+AC a DIBO/DIUBO without notes, (2) virtual short on any linear op-amp, (3) slew / GBW / offset numerically, (4) design a summing circuit and write the IA formula.

## Hours

| Block | Hours | Job |
|-------|-------|-----|
| 0 | 1.5 | EE/EDC patch: KVL, divider, Thevenin, \(I_C\approx I_E\), \(r_e=V_T/I_E\) |
| 1 | 3.5 | Unit I — four configs, cascade, current mirror, level shifter |
| 2 | 3.0 | Unit II — 741, feedback, CMRR, offset, slew, GBW |
| 3 | 3.5 | Unit III — linear apps only |
| 4 | 3.5 | Timed 2022 + 2023 MST, then GATE holes |
| **If 14 h** | | Cut Block 0 to 45 min; stop GATE after Q30 |

## Topic × resource × paper

| Topic | Read | Drill |
|-------|------|-------|
| KVL / divider / Thevenin / \(r_e\) | `_meta/prereq/Alexander_Sadiku…` (KVL + Thevenin only); `_meta/remediation.md` | Assignment 1 p.1 tail current |
| DIBO / DIUBO / SIBO / SIUBO DC+AC | `resources/notes/Section_A_ACD.pdf`; `resources/notes/Unit_II_Differential_Amplifier.pdf` | Unit-II tutorials (last 2 pages); Assignment 1; 2022 MST Q1–3; **2023 Q1 is \(r_\pi\)** |
| Cascaded (starred) | Section A notes; Assignment 1 p.2 | 2023 MST Q3 (Darlington cascade) |
| Current mirror | `resources/zot-hub-edc/Short_Notes_BJT_Current_Mirror.pdf` | 2022 MST Q1 |
| Level shifter | Unit-II §2.3 / §2.6.1 (why DIUBO needs it) | 1-line reason + one sketch |
| 741 blocks + pins + typical numbers | `resources/notes/741_OPAMP.pdf` | Recite pins 1–8 and the table |
| Golden rules / follower / inv / non-inv | OPAMP pdf p.2; `resources/notes/ACD_notes_24258.pdf` p.5 | GATE Q8, Q10, Q39, Q48, Q75 |
| Voltage-series \(A_f,R_i,R_o,BW\) | `resources/notes/ACD_Formulas.pdf`; Gaikwad ch.3 | 2022 Q8; GATE Q2, Q14 |
| CMRR | Gaikwad ch.4; OPAMP table | GATE Q1, Q3, Q43; 2022 Q9 |
| Offset / bias / \(R_C=R_1\parallel R_F\) | Gaikwad ch.4 | 2023 Q6; GATE Q4, Q7, Q49 |
| Slew rate | OPAMP typical \(0.5\,\mathrm{V/\mu s}\) | 2023 Q7; GATE Q9, Q30 |
| Compensated GBW | same as 2022 Q6 | **2022 Q6 = GATE Q17** (answer 32); Set B at 30 kHz → 20; GATE Q41 |
| Summing design | Gaikwad ch.6 | **2023 Q8** \(V_o=V_1+3V_2-2(V_3+3V_4)\) |
| Difference amp | `resources/notes/ACD_notes_24258.pdf` p.1 | GATE Q6, Q44, Q52, Q69 |
| Instrumentation amp | `resources/notes/ACD_notes_24258.pdf` pp.3–4 | **2023 Q9** |
| T-network | syllabus p.3; Kanodia Q5 | Kanodia Q5 → \(450\,\mathrm{k}\Omega\); GATE Q77 |
| Integrator / differentiator waveforms | Gaikwad ch.6 | GATE Q36, Q37, Q40 |
| V–I / I–V / VCCS / CCCS | Gaikwad ch.6 Howland + transimpedance | GATE Q47, Q78 |

## PYQ files

- `resources/pyqs/MST_2022.pdf` — 1 h, 25 marks, two sets
- `resources/pyqs/MST_2023.pdf` and `ACD_24.pdf` — 2023 mid (25, 1.5 h) + 2023 endsem (ignore endsem for MST)
- `resources/practice/Assignment_1.pdf` — Unit I only
- GATE scan: practice **syllabus-tagged** items first (list in `crash-course.md` Block 4). Skip filters / Schmitt / regulators.

## 741 internals (must draw)

Input **DIBO** → intermediate **DIUBO** → **level shifter** → push-pull **output**.

Pins (8-DIP): 1 offset null, 2 inverting, 3 non-inverting, 4 \(-\mathrm{V_{EE}}\), 5 offset null, 6 output, 7 \(+\mathrm{V_{CC}}\), 8 NC.

## Exam-day order

1. Any Unit I DC/AC with numbers (you will finish these).
2. Virtual-short / design / IA (high marks, low algebra if formulas are cold).
3. GBW / slew / offset (2–4 marks each, 2 minutes).
4. Sketch problems last if time is tight — label axes and \(\pm V_{sat}\).
