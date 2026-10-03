# ACD — mid-sem, September 2026

**Score: 9/30.**

VNIT ECE, Slot F. Paper header: Analog circuit design (ECLA303, ECL308). Time 1.5 h, marks 30.

Photos: [`../resources/pyqs/MST_2026_Sep_p1.jpg`](../resources/pyqs/MST_2026_Sep_p1.jpg), [`../resources/pyqs/MST_2026_Sep_p2.jpg`](../resources/pyqs/MST_2026_Sep_p2.jpg). Figures live on the photos; resistor nodes below are the readable ones.

![ACD mid page 1](../resources/pyqs/MST_2026_Sep_p1.jpg)

![ACD mid page 2](../resources/pyqs/MST_2026_Sep_p2.jpg)

## Q1 — find \(V_o\) (CO4, 4)

Op-amp. 2 V through 5 kΩ into the inverting input, 10 kΩ in the feedback. Non-inverting side has a 100 kΩ and a 10 kΩ. Read the photo for which node each of those two lands on. Node at the inverting input is marked \(V_x\).

## Q2 — T-network, \(V_o/V_i=-8\), find \(R\) (CO4, 4)

\(V_i\) — 20 kΩ — node A — 20 kΩ — node B — 20 kΩ — \(V_o\). \(R\) from B to ground. Op-amp: inverting input at A, non-inverting grounded, output is \(V_o\).

## Q3 — find \(V_o\) (CO4, 4)

Difference amp. \(V_1=2\,\mathrm{V}\) through \(R_1=10\,\mathrm{k}\Omega\) to inverting, feedback \(R_2=50\,\mathrm{k}\Omega\). \(V_2=6\,\mathrm{V}\) through \(R_3=20\,\mathrm{k}\Omega\) to non-inverting, \(R_4=30\,\mathrm{k}\Omega\) from non-inverting to ground.

## Q4 — gain–bandwidth (CO1, 2)

Non-inverting op-amp, closed-loop gain 100, 3 dB frequency 10 kHz. A job needs bandwidth 20 kHz. Highest gain still available?

## Q5 — differential gain and CMRR (CO1, 3)

\(A_d=200000\), CMRR = 100 dB. Inputs \(V_1=2.001\,\mathrm{V}\), \(V_2=1.999\,\mathrm{V}\). Find output. Op-amp does not saturate.

## Q6 — BJT operating points and gain (CO1, 6)

Multi-transistor circuit (diff pair Q1–Q2, tail, then Q4–Q5 to the output). Rails read as +15 V and \(V_{EE}=-15\,\mathrm{V}\). \(R_1=R_2=20\,\mathrm{k}\Omega\). Handwritten \(\beta=100\). Two inputs marked. Tail and output resistors: read the photo (one value is easy to misread). Find the operating point of every transistor and the voltage gain of the whole circuit.

## Q7 — design (CO3, 3)

Two op-amps. Every resistor \(\le 100\,\mathrm{k}\Omega\). Input impedance \(\ge 10\,\mathrm{k}\Omega\).

\[
V_o=2V_1+5V_2-10V_3
\]

## Q8 — switch A vs B (CO4, 2)

Ideal op-amp. \(V_o=V_{0A}\) with SW in A, \(V_o=V_{0B}\) with SW in B. Find \(V_{0B}/V_{0A}\).

5 V source, 1 kΩ resistors, inverting feedback 1 kΩ, non-inverting leg 1 kΩ to ground. Switch selects position A or B on the input network. Use the photo for the exact switch wiring.

## Q9 — practical integrator (CO4, 2)

\(R_1=120\,\mathrm{k}\Omega\), \(R_f=1.2\,\mathrm{M}\Omega\), \(C_f=10\,\mathrm{nF}\).

(a) Frequency above which it integrates. (b) DC gain. (c) Peak output for a 5 V peak sine at 10 kHz.
