# ECL211 Signals & Systems — MST-1 map

**Scope:** Section A mid notes + ECL211 W24 mid only. Do **not** grind sampling reconstruction, Laplace ROC, Z-transform, or state-space (those last two are endsem / the EE `EEL202` paper).

**Local copies**

- Mid notes: `resources/classmate/NOTES/SECTION A/SNS SEC A-1 (MID).pdf` (55 pp). Longer twin: `SNS Sec A midsem.pdf`
- ECL211 W24: `resources/20260831T062106Z_92314064_SNS_midsem_W24_solutions_new (1).pdf` (18 Oct 2024)
- Older ECL211 sessionals: `resources/classmate/PYQS/SNS (1).pdf` (Sept 2022, 15 marks / 60 min); `Signals and systems pyqs (1).pdf` (Sept 2023, 30 marks)
- Drill: `resources/zot-hub/Practice Questions - LTI Problems.pdf` + solutions; `Short Notes - Graphical Convolution.pdf`
- Book: `resources/Oppenheim SNS.pdf` ch.1–3 (stop before 3.9 filtering)

**Success:** (1) scale/shift/reverse a sketch without a second try, (2) DT sinusoid: periodic or not, and the smallest \(N\), (3) graphical CT convolution in cases, (4) \(h=\mathrm{d}s/\mathrm{d}t\) on the RC, (5) FS analysis \(a_k\) and synthesis from a few \(a_k\).

## Hours

| Block | Hours | Job |
|-------|-------|-----|
| 0 | 0.75 | Euler, geometric sum, energy as \(\int|x|^2\) |
| 1 | 2.0 | Signals: types, \(E/P\), transforms, \(\delta/u\), periodicity |
| 2 | 1.0 | System properties (H, A, TI, causal, BIBO, memory) |
| 3 | 2.5 | LTI: impulse decomp, CT/DT convolution, RC |
| 4 | 1.75 | FS + timed W24 |
| **If 6 h** | | Cut Block 0 to 20 min; skip DTFS rect-pulse algebra |

## Topic × resource × paper

| Topic | Read | Drill |
|-------|------|-------|
| CT/DT, analog vs digital | SEC A-1 pp.1–2 | 1-line: which quadrant is a sampled-but-not-quantized waveform |
| Energy / power | SEC A-1 pp.2–4; Oppenheim 1.1.2 | 2023 Q1.4–1.5; pulse vs step vs ramp |
| Flip / scale / shift / \(x(at+b)\) | SEC A-1 pp.4–8 | **W24 Q1**; 2020 mid \(x(3-2t)\) |
| \(u(t),u[n],\delta(t),\delta[n]\), sifting | SEC A-1 pp.9–10 | 2023 Q4 (integral of a shifted \(\delta\)) |
| CT / DT periodicity; sum of sinusoids | SEC A-1 pp.10–15 | **W24 Q2**; 2023 Q1.1–1.3; \(\cos n\) trap |
| Even / odd | Oppenheim 1.2.3 | 2023 Q1.6 \(e^{t}u(t)\) |
| Euler / \(e^{j\Omega t}\) | SEC A-1 pp.16–17 | Recite \(T=2\pi/\Omega\) |
| Homogeneous / additive / linear | SEC A-1 pp.18–22 | \(y=2x+3\); \(y=\sin x\); 2023 Q2 |
| TI / causal / BIBO / memoryless | SEC A-1 pp.22–25 | \(y=tx\); \(y=x(t+1)\); 2022 Q3 (fails all five) |
| DT convolution (flip-shift-sum) | SEC A-1 pp.26–30, 34–36 | **W24 Q3**; notes \(\{1,1,1\}*\{1,2,3\}\) |
| CT graphical convolution | SEC A-1 pp.31–34; zot-hub Graphical Convolution | **W24 Q4b**; 2022 Q4; notes ramp \(\ast\) pulse |
| \(h=\mathrm{d}s/\mathrm{d}t\); RC | Oppenheim 2.4; zot-hub LTI P5.3–P5.4 | **W24 Q4a** |
| LTI causal / stable from \(h\) | SEC A-1 pp.37–38 | \(h=u\) causal, not BIBO; \(h=e^{-2t}u\) both |
| Eigenfunction \(e^{st}\to H(s)e^{st}\) | SEC A-1 pp.39–40 | One sentence; do **not** open Laplace ROC |
| CTFS analysis / synthesis | SEC A-1 pp.40–51; Oppenheim 3.3–3.5 | **W24 Q5–Q6**; 2022 Q1; sine line spectra |
| Dirichlet + FS properties + Parseval | SEC A-1 pp.47–51 | 2020 Q2 Parseval |
| DTFS + \(\lvert f\rvert\le 1/2\) | SEC A-1 pp.51–55 | \(\cos(2\pi\cdot 0.6 n)=\cos(2\pi\cdot 0.4 n)\) |

## PYQ files

- `resources/…SNS_midsem_W24_solutions_new (1).pdf` — **the paper to sit**. Q1 sketches, Q2 DT period, Q3 DT LTI, Q4 RC + pulse convolution, Q5–Q6 FS.
- Sept 2023 mid (`Signals and systems pyqs (1).pdf` p.1) — 30 marks: \(E/P\), periodicity, properties, sifting, accumulator \(h[n]\), first-order circuit.
- Sept 2022 first sessional (`SNS (1).pdf` p.1) — 15 marks / 60 min: FS sketch, graphical convolution, “fails all properties,” energy vs power.
- zot-hub `PYQ W24 Mid SNS EEL202.pdf` / `PYQ W23 Mid SNS EEL202.pdf` — **EE** paper. Steal transformation / \(E/P\) / convolution items only. **Skip** the state-space question.

## Exam-day order

1. Sketches (W24 Q1) — five minutes, full marks if the kinks are labelled.
2. Periodicity yes/no + \(N\) (no pictures).
3. Convolution (impulse decomp or cases) — this is where time dies; write the overlap limits before integrating.
4. FS: \(a_k\) of a \(\delta\) in one period is \(1/T\); synthesis is Euler, not a new integral.
5. Property table last if the clock is tight — one counter-example per “no.”
