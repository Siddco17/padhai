---
tags: [course/mni, endsem]
aliases: [MNI bridges, endsem topic 1]
---

# Block 1 — Bridges (2.5 h)

December 2022 re-exam Q2 is 14 marks (quarter/half/full, zero-order loading, Schering, thermistor quarter). Q4, the thermistor design, is another 5. This is the largest block on the paper.

The class sheets to keep open while you derive: `resources/notes/Bridge_and_Loading_Effect.pdf` pages 1, 2 and 5, and `AC_Bridges.pdf` page 7 for Schering. Sawhney’s Figure 14.11 is the labelled Wheatstone if the handwriting is hard to read.

## Theory

A bridge is four arms. The source is across one diagonal. The detector is across the other.

**Null.** Adjust an arm until the detector reads zero. The unknown does not depend on the source voltage.

**Deflection.** Leave it slightly unbalanced. The detector voltage *is* the measurement. Strain gauges, thermistors, and the level probe are used this way.

A zero-order instrument has output \(K\) times input, right now, with no lag. A potentiometer is zero-order until a meter loads the wiper. That loading is part of the same 14-mark question, so it sits in this block.

## Formulas

Wheatstone, sensor \(R_\theta\) on the bottom right, \(R_4\) above it, \(R_3\) top left, \(R_2\) bottom left:

\[
\frac{E_o}{V_s} = \frac{R_2}{R_2+R_3} - \frac{R_\theta}{R_\theta+R_4}
\]

Balance, \(E_o = 0\): \(R_4/R_\theta = R_3/R_2\), which is the same as \(R_2 R_4 = R_3 R_\theta\).

| Symbol | Meaning |
|---|---|
| \(V_s\) | supply across the bridge |
| \(E_o\) | open-circuit detector voltage |
| \(R_2, R_3\) | fixed resistors on the left branch |
| \(R_4\) | fixed resistor above the sensor |
| \(R_\theta\) | sensor resistance |
| \(\delta\) | \(\Delta R/R\), the fractional change of an arm that started at \(R\) |

All four arms start equal to \(R\).

| Bridge | Active arms | \(E_o/V_s\) |
|---|---|---|
| Quarter | one arm, \(R(1+\delta)\) | \(\delta/(4+2\delta)\approx\delta/4\) |
| Half | two adjacent arms, opposite sign | \(\delta/2\), exact |
| Full | opposite corners the same sign | \(\delta\), exact |

Gauge factor, if the arm is a strain gauge: \(\mathrm{GF}=(\Delta R/R)/(\Delta\ell/\ell)\), so \(\delta=\mathrm{GF}\cdot\varepsilon\) and a quarter bridge gives \(E_o/V_s=\mathrm{GF}\cdot\varepsilon/4\).

Thermistor:

\[
R_T = K\exp(\beta/\theta), \qquad \frac{\Delta R_T}{R_T}\approx -\frac{\beta}{\theta^2}\Delta\theta
\]

| Symbol | Meaning |
|---|---|
| \(K\) | constant for that bead, ohms |
| \(\beta\) | material constant, kelvin |
| \(\theta\) | absolute temperature. \(0^\circ\mathrm{C}=273\,\mathrm{K}\) |

Deflection-bridge design, output 0 at the cold end, half-scale at the midpoint, full-scale at the hot end:

\[
R_4 = \frac{R_M(R_L+R_H)-2 R_L R_H}{R_L+R_H-2 R_M}, \qquad r=\frac{R_3}{R_2}=\frac{R_4}{R_L}
\]

\[
\frac{E_o}{V_s}=\frac{R_L}{R_L+R_4}-\frac{R_H}{R_H+R_4}
\]

\(R_L, R_M, R_H\) are the thermistor resistances at the cold, mid, and hot temperatures.

Schering. Unknown \(C_x\) in series with loss \(r_x\). Standard capacitor \(C_2\). Resistor \(R_3\). \(R_4\) in parallel with \(C_4\).

\[
C_x = C_2\frac{R_4}{R_3}, \qquad r_x = R_3\frac{C_4}{C_2}, \qquad D=\omega C_4 R_4
\]

\(D=\tan\delta\) is the dissipation factor. \(\omega=2\pi f\).

Loaded potentiometer, wiper a fraction \(k\) up from the bottom, meter \(R_L\) from wiper to bottom, pot resistance \(R_p\):

\[
\frac{E_o}{E_i}=\frac{k}{1+(R_p/R_L)\,k(1-k)}
\]

| Bridge | What you write |
|---|---|
| Maxwell, \(1<Q<10\) | \(L_x=R_2 R_3 C_4\), \(R_x=R_2 R_3/R_4\), \(Q=\omega C_4 R_4\). \(C_4\) is **parallel** with \(R_4\). |
| Hay, \(Q>10\) | \(L_x\approx R_2 R_3 C_4\), \(Q=1/(\omega C_4 R_4)\). \(C_4\) is **series** with \(R_4\). |
| De Sauty | \(C_1/C_2=R_4/R_3\) |
| Wien, matched arms | \(f=1/(2\pi RC)\) and \(R_4=2R_3\) |

Maxwell’s disadvantage: for a high-\(Q\) coil, \(R_4=Q/(\omega C_4)\) becomes enormous. Use Hay above \(Q=10\).

## Derivations

### Quarter, half, full

The class page uses \(R_1\) where this note uses the changing arm. The results match.

![Class Wheatstone and the quarter-bridge line](figures/source/class-wheatstone-quarter.jpg)

1. Start from the divider formula with every arm equal to \(R\). Then \(E_o=0\).
2. **Quarter.** Only the top-right arm becomes \(R(1+\delta)\). The sensor in the formula is still \(R\), and \(R_4=R(1+\delta)\).
   \[
   \frac{E_o}{V_s}=\frac12-\frac{R}{R+R(1+\delta)}=\frac12-\frac{1}{2+\delta}=\frac{\delta}{4+2\delta}.
   \]
   Strain-gauge \(\delta\) is a few thousandths, so \(2\delta\) drops out of the denominator and \(E_o/V_s\approx\delta/4\).
3. **Half.** Top-right becomes \(R(1+\delta)\) and bottom-right becomes \(R(1-\delta)\). Left arms stay \(R\).
   \[
   \frac{E_o}{V_s}=\frac12-\frac{1-\delta}{2}=\frac{\delta}{2}.
   \]
   Exact. The \(2\delta\) terms cancelled.
4. **Full.** Top-left and bottom-right are \(R(1-\delta)\). Top-right and bottom-left are \(R(1+\delta)\). Opposite corners carry the same sign.
   \[
   \frac{E_o}{V_s}=\frac{1+\delta}{2}-\frac{1-\delta}{2}=\delta.
   \]
   Exact, and four times the quarter-bridge approximation.

![Class half-bridge and full-bridge results](figures/source/class-half-full-bridge.jpg)

A temperature change multiplies every metal gauge by the same factor. In the full bridge that factor is in every arm and cancels, so a temperature rise does not look like strain.

Sawhney’s Figure 14.14 is the Thevenin circuit behind \(E_o=E\,\Delta R/(4R)\). Read that page if the approximation step feels thin: `Wheatstone_Bridge.pdf` page 3, also saved as `figures/source/sawhney-wheatstone-thevenin-14-14.jpg`.

### Thermistor fraction, then the design resistor

1. \(R_T=K e^{\beta/\theta}\). Take logs: \(\ln R_T=\ln K+\beta/\theta\).
2. Differentiate: \((1/R_T)\,dR_T/d\theta=-\beta/\theta^2\).
3. So \(\Delta R_T/R_T\approx-(\beta/\theta^2)\Delta\theta\). Hotter means lower resistance.
4. At balance, a small change in one arm gives \(E_o/E_{in}\approx(1/4)(\Delta R_T/R_T)\).
5. A thermistor from \(0\) to \(50^\circ\mathrm{C}\) is **not** a small \(\delta\). Design the bridge instead of using \(\delta/4\).
6. Force \(E=0\) at the cold resistance \(R_L\), \(E=V_\mathrm{max}/2\) at the mid resistance \(R_M\), and \(E=V_\mathrm{max}\) at the hot resistance \(R_H\). Balance at the cold end gives \(R_4=r R_L\) with \(r=R_3/R_2\).
7. Setting the mid output equal to half the hot output, and clearing the algebra, produces the \(R_4\) formula in the table above. Then \(V_s\) comes from the hot-end divider equation.

### Schering

![Class Schering bridge](figures/source/class-schering.jpg)

1. Opposite arms multiply: \(Z_1 Z_4=Z_2 Z_3\).
2. \(Z_1=r_x-j/(\omega C_x)\), \(Z_2=-j/(\omega C_2)\), \(Z_3=R_3\), \(Z_4=R_4/(1+j\omega C_4 R_4)\).
3. Multiply through by \(1+j\omega C_4 R_4\) and split real and imaginary parts.
4. Real parts: \(r_x=R_3 C_4/C_2\). Imaginary parts: \(C_x=C_2 R_4/R_3\).
5. \(D=\omega C_x r_x\). Substitute the two results and \(C_x\) and \(r_x\) cancel, leaving \(D=\omega C_4 R_4\).

The notebook photo `resources/notes/ac-bridges/03_Schering_Bridge_Derivation.jpg` is the same derivation with their labels (\(C_x=R_1 C_3/R_2\)). Use it if you want the handwriting next to the algebra. Their \(C_1\) is this note’s \(C_4\).

### Loaded potentiometer

![Class loading of a zero-order potentiometer](figures/source/class-zero-order-loading.jpg)

1. Unloaded, the bottom segment is \(k R_p\) and the top is \((1-k)R_p\), so \(E_o/E_i=k\).
2. The meter \(R_L\) sits in parallel with the bottom segment.
3. The loaded divider reduces to
   \[
   \frac{E_o}{E_i}=\frac{k}{1+(R_p/R_L)\,k(1-k)}.
   \]
4. At mid-travel, \(k=1/2\), the error as a percent of the ideal tap voltage is \(100/(1+4 R_L/R_p)\). If \(R_L=R_p\), that is 20%.

## Solved — December 2022 re-exam Q4, and the Schering numbers

**Thermistor design.** \(R(\theta)=0.0585\exp(3260/\theta)\). Input \(0\) to \(50^\circ\mathrm{C}\). Output \(0\) to \(1\,\mathrm{V}\). Approximately linear.

1. \(\theta=273\), \(298\), \(323\,\mathrm{K}\).
2. \(R_L=8979\,\Omega\), \(R_M=3297\,\Omega\), \(R_H=1414\,\Omega\). Check one: \(e^{3260/273}=e^{11.941}\approx 1.535\times 10^5\), times \(0.0585\) is \(8979\,\Omega\).
3. 
   \[
   R_4=\frac{3297(8979+1414)-2(8979)(1414)}{8979+1414-2(3297)}=\frac{8.877\times 10^6}{3798}=2337\,\Omega.
   \]
4. \(r=R_3/R_2=2337/8979=0.260\). If you pick \(R_2=10\,\mathrm{k}\Omega\), then \(R_3=2.60\,\mathrm{k}\Omega\).
5. Hot-end ratio:
   \[
   \frac{E_o}{V_s}=\frac{8979}{11316}-\frac{1414}{3751}=0.4165, \qquad V_s=\frac{1}{0.4165}=2.40\,\mathrm{V}.
   \]

**Box:** \(V_s=2.40\,\mathrm{V}\), \(R_4=2337\,\Omega\), \(R_3/R_2=0.260\).

An \(r\) near \(0.25\) is the usual thermistor answer. The bridge bends the opposite way to the thermistor, and the leftover nonlinearity is about 1% of full scale. A metal RTD is already nearly straight, so you would pick \(r\) near 100 instead, to keep the bridge from bending it.

**Schering, a numerical in the same shape.** Balance at \(C_2=500\,\mathrm{pF}\), \(R_3=1\,\mathrm{k}\Omega\), \(R_4=2\,\mathrm{k}\Omega\), \(C_4=0.1\,\mu\mathrm{F}\), \(f=50\,\mathrm{Hz}\).

\[
C_x=500\,\mathrm{pF}\times\frac{2000}{1000}=1000\,\mathrm{pF}, \qquad r_x=1000\times\frac{0.1\times 10^{-6}}{500\times 10^{-12}}=200\,\mathrm{k}\Omega
\]

\[
D=2\pi\times 50\times 0.1\times 10^{-6}\times 2000=0.0628
\]

## Practice

1. Full bridge, \(120\,\Omega\) gauges, \(\mathrm{GF}=2\), strain \(500\times 10^{-6}\), supply \(5\,\mathrm{V}\). Find \(E_o\).
2. December 2020, 4 marks. \(R_\theta=0.0885\exp(3150/\theta)\), range \(0\) to \(75^\circ\mathrm{C}\), output \(0\) to \(1\,\mathrm{V}\). Find \(V_s\), \(R_4\), and \(R_3/R_2\). Use the same three-point formula. Mid temperature is \(37.5^\circ\mathrm{C}\).
3. A \(10\,\mathrm{k}\Omega\) potentiometer is at \(k=0.5\) on a \(20\,\mathrm{V}\) supply. A \(10\,\mathrm{k}\Omega\) meter is connected from the wiper to the bottom. Find the reading, and the error as a percent of the ideal \(10\,\mathrm{V}\).

### Answers

1. \(\delta=2\times 500\times 10^{-6}=10^{-3}\). Full bridge: \(E_o=5\times 10^{-3}=5\,\mathrm{mV}\).
2. \(R(0^\circ\mathrm{C})=9079\,\Omega\), \(R(37.5^\circ\mathrm{C})=2253\,\Omega\), \(R(75^\circ\mathrm{C})=755\,\Omega\). Then \(R_4=1586\,\Omega\), \(R_3/R_2=0.175\), \(V_s=1.89\,\mathrm{V}\).
3. \(E_o/E_i=0.5/[1+(1)(0.5)(0.5)]=0.4\). Reading \(8\,\mathrm{V}\). That is \(2\,\mathrm{V}\) low, 20% of the ideal \(10\,\mathrm{V}\).

Maxwell and Hay, if a 1-mark “which bridge” appears: notebook photo `resources/notes/ac-bridges/02_Maxwell_Hays_Bridge_Formulas.jpg`. Hay’s circuit, with \(C\) in series with \(R\), is `05_Hays_Bridge_Circuit_Derivation.jpg`. De Sauty, Schering, and Wien on one page: `01_DeSauty_Schering_Wien_Formulas.jpg`.
