# Just-in-time remediation (EE / EDC / NS / Physics)

**Mind:** [[Home]] · [[sem3/_maps/Dependency Map.canvas|Dependency Map]]

Goal: patch holes only when Sem 3 needs them. Cap catch-up at **~2–3 hrs/week** total unless MST week.

## ACD (confirmed by 9/30)
The September 2026 paper is the evidence: ideal op-amp, GBW/CMRR, and a BJT diff-pair operating point. Circuits first from Alexander (`prereq/Alexander_Sadiku_Fundamentals_of_Electric_Circuits.pdf`: laws, Thevenin, first-order). Then Boylestad 11e (`prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf`), only these sections, then redo [`../05-acd/notes/midsem-2026.md`](../05-acd/notes/midsem-2026.md) and return to Gaikwad.

1. Ideal voltage/current sources, [[KVL and KCL]], [[Voltage divider]] — Alexander
2. [[Thevenin and Norton]] — Alexander
3. Diode as a switch and clipper — Boylestad **1.6–1.9**, **2.8**
4. BJT operation and Q-point — Boylestad **3.3–3.6**, **4.2**, **4.5**, **4.13–4.14** (current mirror and current source: the tail of a diff pair)
5. Gain, \(Z_{in}\), \(Z_{out}\), \(r_e=V_T/I_E\) — Boylestad **5.4** and **5.15**
6. Diff pair, CMRR, gain–bandwidth — Boylestad **10.2**, **10.7**, **10.9**. This is ACD Q4–Q6.

**Leave closed:** Boylestad ch. 6–8 (FETs), **5.19–5.22** (hybrid and hybrid-π), ch. 12–17, and most of ch. 2 (rectifiers). Ch. 11 op-amp applications overlap Gaikwad; use Gaikwad for those.

## Before / with EMFT (Physics hole)
1. Vector basics: i,j,k / unit vectors; [[Vectors and fields|gradient intuition]]
2. [[Dot and cross product]] meaning (work, flux, “perpendicular”)
3. [[Coordinate systems]]: Cartesian first, then cylindrical/spherical when syllabus hits them
4. What “field” means (value at every point) — then Coulomb / Gauss from Hayt ch.1–3 slowly

**Do EMFT tutorial problems the same day** — reading alone won’t fix a Physics FF pattern.

## If NS = Network Theory / Networks
When ACD or MNI hits frequency / transfer ideas:
1. [[Impedance]] of R, L, C
2. Series/parallel RC
3. First-order time constant
4. Transfer function H(jω) at a hand-wavy level (pairs with SnS)

## If NS = something else
Update this file with the full name — remediation list changes.

## Weekly slot suggestion
- **Sun 60–90 min:** ACD prerequisite patch, then one question from the 2026 ACD paper. EMFT vectors only on the weeks the EMFT tutorial is the thing due.
- **MNI:** one 2026-paper question on two weeknights (loading, ramp, limiting error, bridge, Ayrton). This replaced the “easy AA one-pager” slot.
- Never let remediation steal DCHD lab/HDL time (2 credits of the 5)
