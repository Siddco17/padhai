---
tags: [course/mni, endsem]
---

# Block 4 — Capacitive sensors (1.5 h)

Needs the bridge equation from block 1. December 2022 Q5 is 11 marks: a coaxial level probe in a deflection bridge, then a sliding-dielectric capacitor. The November 2021 endsem asks the same level bridge with a 10 V supply.

Class drawings: `resources/notes/capacitive-transducers/03_Liquid_Level_Capacitive_Sensor.jpg` and `02_Differential_and_Variable_Dielectric.jpg`. The bridge formula is Bentley’s equation 9.21, because the professor notes do not write this one out. The page is saved below.

## Theory

\[
C=\frac{\varepsilon_0\varepsilon_r A}{d}
\]

| Symbol | Meaning |
|---|---|
| \(\varepsilon_0\) | \(8.854\times 10^{-12}\,\mathrm{F/m}\). The papers often print \(8.85\,\mathrm{pF/m}\), which is the same number |
| \(\varepsilon_r\) | dielectric constant. Air is 1 |
| \(A\) | overlapping area, m\(^2\) |
| \(d\) | gap, m |

Three ways to move \(C\): change the gap, change the overlap, or change the dielectric. A single gap is nonlinear in displacement. A differential pair (one gap grows while the other shrinks) is linear in a bridge.

## Formulas

**Gap.** From a rest gap \(d_0\), the plate moves closer by \(x\):

\[
C=\frac{C_0}{1-x/d_0}
\]

**Differential pair** in an AC bridge, equal resistors on the other two arms:

\[
\frac{E_o}{V_s}=\frac{x}{2d_0}
\]

in Bentley’s connection (his equation 9.23). Your class sheet for the same push-pull pair writes \(V_\mathrm{out}/V_s=x/d_0\) when the two capacitors are the two arms of one divider. Use the formula that matches the circuit you drew. Both are linear in \(x\) and independent of frequency.

**Coaxial level probe.** Inner and outer radii in the ratio \(b/a\), length \(\ell\), liquid height \(h\), liquid dielectric \(\varepsilon_r\):

\[
C_h=\frac{2\pi\varepsilon_0}{\ln(b/a)}\big[\ell+(\varepsilon_r-1)h\big]
\]

\(C_h\) is linear in \(h\). The bridge around it is not, unless the resistor ratio is very large.

**Level in a deflection bridge.** Bentley’s equation 9.21. \(C_0\) is the fixed capacitor. \(R_3/R_2\) is the resistor ratio. \(C_{h,\min}\) is the probe capacitance when the tank is empty.

\[
E_\mathrm{Th}=V_s\left(\frac{1}{1+C_0/C_h}-\frac{1}{1+R_3/R_2}\right)
\]

Zero output when the tank is empty:

\[
C_0=C_{h,\min}\frac{R_3}{R_2}
\]

If \(R_3/R_2\) is large,

\[
E_\mathrm{Th}\approx V_s\frac{R_2}{R_3}\left(\frac{C_h}{C_{h,\min}}-1\right)
\]

which *is* linear in \(h\), because \(C_h\) is linear in \(h\).

**Sliding dielectric**, sheet as thick as the gap, inserted a distance \(x\) along plates of length \(L\) and width \(w\):

\[
C=\frac{\varepsilon_0 w}{d}\big[L+(\varepsilon_r-1)x\big]
\]

![Bentley: capacitance level bridge and the push-pull result](figures/source/bentley-capacitive-level-bridge.jpg)

The level-probe drawing in the class photos:

![Coaxial capacitive level probe](../resources/notes/capacitive-transducers/03_Liquid_Level_Capacitive_Sensor.jpg)

## Derivation — why empty-tank balance fixes \(C_0\)

1. The two capacitor arms are a divider. The two resistor arms are the other divider.
2. Open-circuit output is the difference of the two divider fractions. With the book’s polarity,
   \[
   \frac{E_\mathrm{Th}}{V_s}=\frac{1}{1+C_0/C_h}-\frac{1}{1+R_3/R_2}.
   \]
3. Set \(E_\mathrm{Th}=0\). The fractions match, so \(C_0/C_h=R_3/R_2\).
4. That has to happen at the empty tank, where \(C_h=C_{h,\min}\). Hence \(C_0=C_{h,\min}(R_3/R_2)\).
5. As the tank fills, \(C_h\) rises, \(C_0/C_h\) falls, and the first fraction grows. \(E_\mathrm{Th}\) rises.
6. \(C_h\) itself is linear in \(h\). The bridge fraction \(1/(1+C_0/C_h)\) is not linear in \(C_h\). That is the nonlinearity the question asks you to explain. It gets small when \(R_3/R_2\) is large, because the approximation above becomes a straight line.

## Solved — December 2022 re-exam Q5

Probe length \(\ell=9\,\mathrm{m}\), liquid from \(h=0\) to \(8\,\mathrm{m}\), \(b/a=1.5\), \(\varepsilon_r=2.5\), \(\varepsilon_0=8.85\,\mathrm{pF/m}\). Bridge resistors \(100\,\Omega\) and \(10\,\mathrm{k}\Omega\), so \(R_3/R_2=100\). Supply \(15\,\mathrm{V}\).

1. \(\ln(1.5)=0.4055\).
2. Empty, \(h=0\):
   \[
   C_{h,\min}=\frac{2\pi\times 8.85}{0.4055}\times 9=1234\,\mathrm{pF}.
   \]
3. \(C_0=1234\times 100=1.234\times 10^5\,\mathrm{pF}=0.123\,\mu\mathrm{F}\).
4. Full, \(h=8\):
   \[
   C_h=\frac{2\pi\times 8.85}{0.4055}\big[9+(2.5-1)\times 8\big]=2880\,\mathrm{pF}.
   \]
5. 
   \[
   \frac{E}{15}=\frac{1}{1+123400/2880}-\frac{1}{1+100}=0.01290, \qquad E=0.194\,\mathrm{V}.
   \]
6. At \(h=4\,\mathrm{m}\), \(C_h=2057\,\mathrm{pF}\) and \(E=0.0974\,\mathrm{V}\). A straight line from \(0\) to \(0.194\,\mathrm{V}\) would give \(0.0968\,\mathrm{V}\) at half height. The difference is \(0.0006\,\mathrm{V}\), which is \(0.33\%\) of full-scale deflection.

**Box:** \(C_0=0.123\,\mu\mathrm{F}\). At \(h=8\,\mathrm{m}\), \(E_\mathrm{Th}=0.194\,\mathrm{V}\). Nonlinearity at \(4\,\mathrm{m}\) is \(0.33\%\) of full scale, because \(E\) depends on \(1/(1+C_0/C_h)\) while \(C_h\) is linear in \(h\).

**(b) Sliding dielectric, same question.** Square plates, side \(5\,\mathrm{cm}\), gap \(1\,\mathrm{mm}\). Sheet \(1\,\mathrm{mm}\) thick, \(\varepsilon_r=4\), air \(\varepsilon_r=1\). Find \(C\) at \(x=2.5\,\mathrm{cm}\) and at \(x=5.0\,\mathrm{cm}\).

\[
C=\frac{8.854\times 10^{-12}\times 0.05}{0.001}\big[0.05+(4-1)x\big]
\]

At \(x=2.5\,\mathrm{cm}\), \(C=55.3\,\mathrm{pF}\). At \(x=5.0\,\mathrm{cm}\), the gap is full of dielectric and \(C=88.5\,\mathrm{pF}\), which is \(4\times\varepsilon_0 A/d\).

## Practice

1. November 2021 endsem. Same probe and the same \(100\,\Omega\) / \(10\,\mathrm{k}\Omega\) bridge, but \(V_s=10\,\mathrm{V}\). Find \(C_0\), \(E_\mathrm{Th}\) at \(h=8\,\mathrm{m}\), and the nonlinearity at \(h=4\,\mathrm{m}\).
2. November 2022 endsem Q7(b). Parallel plates \(40\,\mathrm{mm}\times 40\,\mathrm{mm}\), gap \(0.5\,\mathrm{mm}\), air dielectric. Find \(C\). Find the change in gap that changes \(C\) by \(5\,\mathrm{pF}\). Find the sensitivity \(dC/dd\).

### Answers

1. \(C_0\) is unchanged, \(0.123\,\mu\mathrm{F}\). \(E_\mathrm{Th}=0.129\,\mathrm{V}\) at \(h=8\,\mathrm{m}\). The nonlinearity is still \(0.33\%\) of full scale, because both the reading and the full-scale reading scaled with \(V_s\).
2. \(C=\varepsilon_0 A/d=28.3\,\mathrm{pF}\). A \(5\,\mathrm{pF}\) change needs \(|\Delta d|=0.088\,\mathrm{mm}\). Sensitivity \(dC/dd=-C/d=-56.7\,\mathrm{pF/mm}\) at that gap. The minus sign means a larger gap lowers \(C\).
