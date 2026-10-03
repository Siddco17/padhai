# ECL305 EMFT — MST-1 map

**Sat 9 Sep 2026.** Questions are in [`midsem-2026.md`](midsem-2026.md). Score not in yet. This mid is 30 of the course.

**Scope:** teaching-plan topics 1–2 only (8 lect vectors + 10 lect electrostatics). Do **not** grind Biot–Savart, Ampere, Faraday, displacement current, waves, Poynting, Brewster.

**Local copies:** `resources/Sadiku_Elements_of_Electromagnetics.pdf`; `resources/classmate/NOTES/SECTION B/EMFT (BEFORE MID).pdf`; `resources/classmate/NOTES/EMFT Neeraj Sir Notes.pdf`; `resources/20260819T155744Z_78f6745e_EMF-T Practice Questions_Line _ Surface Integral.pdf`

**Eval that bites:** Mid is **30%**. Internals = \(( \mathrm{Mid} + \mathrm{TA} ) \times A^*\), round **up**. \(A^*=1\) only if attendance **> 75%**; \(A^*=0\) if **< 50%**. A 24/30 mid with 72% attendance is a 21 after the haircut.

**Success:** (1) \(\mathbf{i},\mathbf{j},\mathbf{k}\) / dot / cross and “a field is a value at every point” without notes, (2) convert a vector Cartesian \(\leftrightarrow\) cyl \(\leftrightarrow\) sph at a numbered point, (3) write \(d\mathbf{l},d\mathbf{S},dv\) and run a line + a surface integral, (4) Gauss on \(\mathbf{D}\) (sphere / cylinder / plane) and \(W=q\Delta V\) on a conservative \(\mathbf{E}\).

## Hours

| Block | Hours | Job |
|-------|-------|-----|
| 0 | 1.5 | Physics patch: \(\mathbf{i},\mathbf{j},\mathbf{k}\), dot, cross, what a field is, **then** coords |
| 1 | 2.5 | \(d\mathbf{l}/d\mathbf{S}/dv\), line/surface/volume integrals, grad / div / curl / Laplacian, div theorem, Stokes |
| 2 | 3.0 | Coulomb, \(\mathbf{E}\), \(\mathbf{D}\), Gauss, \(V\), dipole, energy |
| 3 | 2.0 | Timed 2022 MST (25, 1 h) + 2023 Feb MST (30, 1.5 h) |
| **If 8 h** | | Keep Block 0. Cut Block 3 to **one** PYQ year. |
| **If 10 h** | | Block 3 \(\to\) 3.0: both PYQ years + leftover Tutorial Sheet 2 |

First sitting is **Block 0**. Skipping it is how a Physics-FF pattern repeats.

## Topic × resource × paper

| Topic | Read | Drill |
|-------|------|-------|
| \(\mathbf{i},\mathbf{j},\mathbf{k}\), \(\lvert\mathbf{A}\rvert\), \(\hat{\mathbf{A}}\) | Neeraj p.1; Sadiku §1.3–1.6; BEFORE MID p.1 | BEFORE MID: \(3\mathbf{A}-\mathbf{B}\) |
| Dot / cross / projection / triple product | Sadiku §1.7 | 2022 MST Q3 (proj); Group C Q3 (parallelepiped) |
| What a field is | `../_meta/remediation.md`; EMF FINAL p.1 (field vs circuit) | Point to a vector \(\mathbf{A}(x,y,z)\) and say its value at two points |
| Cartesian \(\to\) cyl \(\to\) sph (points + vectors) | BEFORE MID pp.2–11; Sadiku ch.2 | 2022 Q4–Q5 all groups |
| \(d\mathbf{l},d\mathbf{S},dv\) | Sadiku §3.2; BEFORE MID pp.2–4, 20–21 | 2023 Feb Q2; BEFORE MID quarter-cylinder |
| Line integral | Tutorial Sheet 2 Q1–6 | **Q1, Q3, Q4**; 2023 Feb Q4 |
| Surface / volume integral | Tutorial Sheet 2 Q7–10 | **Q7, Q8, Q9** |
| Grad / \(\mathbf{E}=-\nabla V\) | BEFORE MID p.12; Sadiku §3.5, §4.8 | 2022 Group A Q7 |
| Div + divergence theorem | BEFORE MID pp.13, 16–17; Sadiku §3.6 | 2023 Feb Q3; 2022 Group D Q9 |
| Curl + Stokes | BEFORE MID pp.14, 17–19; Sadiku §3.7 | 2022 Group A Q8; Tutorial Q5–6 |
| Laplacian / Laplace | BEFORE MID p.15; Sadiku §3.8, §6.2 | 2022 Group A Q7; Group B Q7 |
| Coulomb + superposition | BEFORE MID pp.22–26; Sadiku §4.2 | BEFORE MID square / 4-charge; 2022 Group D Q8 |
| Line / surface / volume \(\mathbf{E}\) | Sadiku §4.3; Neeraj infinite line | 2022 Group A Q6; Group C Q8 |
| \(\mathbf{D}\) vs \(\mathbf{E}\), Gauss | Sadiku §4.4–4.6; Neeraj sphere | 2023 Feb Q3; 2022 Group C Q6, Q9 |
| Potential, work, conservative test | Sadiku §4.7–4.8; Neeraj “Work Done” | **2023 Feb Q4** |
| Dipole | Sadiku §4.9; Neeraj dipole page | **2023 Feb Q6** |
| Energy in the field | Sadiku §4.10 | **2023 Feb Q5** |

## PYQ files

- `resources/classmate/PYQS/EMFT Question Paper.pdf` — **10 Mar 2022**, 1 h, **25 marks**, Groups A–D. Vectors + electrostatics only. Sit **Group A** timed, then steal marks from B/C/D variants.
- `resources/classmate/PYQS/EMFT.pdf` p.1 — **28 Feb 2023**, 1.5 h, **30 marks**, COs 1–2. This is the current-pattern MST.
- Same PDF pp.2–3 — **2 May 2023**, 50 marks, magnetostatics + Maxwell + waves. **Skip** for MST-1 (not in BEFORE MID).
- Tutorial Sheet 2 (line / surface integral) — same-day Block 1 drill, not a past paper.

## Exam-day order

1. 1-mark traps: \(\mathbf{a}_x\cdot\mathbf{a}_\rho=\cos\phi\); grad of a vector / div of a scalar / curl of a scalar = **not defined**.
2. Projection / unit vector / convert the given \(\mathbf{A}\) at a point (you will finish these).
3. Gauss / \(\nabla\cdot\mathbf{D}=\rho_v\) / flux through a stated face (high marks, low drama if \(d\mathbf{S}\) is right).
4. Work / potential / energy / dipole (formulas from the sheet).
5. Stokes verify last if the clock dies — set up \(\oint\mathbf{A}\cdot d\mathbf{l}\) on each edge and \(\iint(\nabla\times\mathbf{A})\cdot d\mathbf{S}\); a labelled sketch still scores.

## Skip list (until after MST)

Magnetostatics, Faraday, displacement current, phasor Maxwell, \(\eta\), skin depth, Poynting, reflection, Brewster. Dielectric interface BCs (May 2023 Q6) only if Block 3 is done and you still have 20 min.
