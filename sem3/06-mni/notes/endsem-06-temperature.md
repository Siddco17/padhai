---
tags: [course/mni, endsem]
---

# Block 6 — RTD and thermocouple (1 h)

The thermistor equation and the thermistor bridge are already in block 1. This block is the metal RTD and the thermocouple. December 2022 Q6 is 10 marks (self-heating time, then a \(\pm 10\,\mathrm{V}\) design). November 2022 Q1 is 5 marks on an iron–constantan couple.

`resources/notes/Temperature_NPTEL.pdf` is the short professor page. The numericals PDF in `resources/` (`RTD-Thermistor-Thermocouple_Numericals.pdf`) is worth the tables if a number in this note does not match the photocopy in your hand.

## Theory

**RTD.** A metal’s resistance rises almost linearly with temperature. Pt100 means \(100\,\Omega\) at \(0^\circ\mathrm{C}\). It is stable and not very sensitive. The current you use to measure it heats it. That self-heating is a first-order temperature rise with its own time constant. The reading is the fluid temperature plus that offset, and the offset has not finished arriving until a few time constants have passed.

**Thermocouple.** Two different metals joined at the hot junction. The voltage depends on the temperature **difference** between the hot junction and the cold junction. You either hold the cold junction at a known temperature or add a voltage that stands in for it. Between two temperatures the paper fits \(E=xT+yT^2\).

## Formulas

\[
R=R_0(1+\alpha\Delta T)
\]

| Symbol | Meaning |
|---|---|
| \(R_0\) | resistance at the reference temperature, usually \(0^\circ\mathrm{C}\) |
| \(\alpha\) | temperature coefficient, per °C. The paper’s \(0.43\%/^\circ\mathrm{C}\) is \(0.0043\) per °C |
| \(\Delta T\) | Celsius temperature, if \(R_0\) is the \(0^\circ\mathrm{C}\) resistance |

Self-heating. Electrical power \(P=V^2/R\) produces a steady temperature rise \(\Delta T\) above the fluid. Thermal conductance \(G=P/\Delta T\). Heat capacity \(C\) is the specific heat the paper gives, in J/°C.

\[
\tau=\frac{C}{G}=\frac{C\,\Delta T}{P}
\]

The extra temperature grows as \(\Delta T(1-e^{-t/\tau})\). It is within 5% of its final value at \(t=3\tau\).

Thermocouple, cold junction at \(0^\circ\mathrm{C}\):

\[
E(T,0)=xT+yT^2
\]

If the couple is read against a cold junction at \(T_\mathrm{ref}\) and a compensation circuit adds \(E(T_\mathrm{ref}, 0)\),

\[
E(T,0)=E(T, T_\mathrm{ref})+E(T_\mathrm{ref}, 0).
\]

## Derivation — the self-heating time constant

1. In the steady state the electrical power leaves as heat: \(P=G\Delta T\), so \(G=P/\Delta T\).
2. While the sensor is still warming, stored heat is \(C\) times the extra temperature \(\theta\): \(C\dot\theta=P-G\theta\).
3. That is a first-order equation with time constant \(C/G\) and final value \(P/G=\Delta T\).
4. Substitute \(G=P/\Delta T\) and you get \(\tau=C\Delta T/P\).

## Solved — December 2022 Q6(a), self-heating

Pt100, so \(R=100\,\Omega\). Supply \(5\,\mathrm{V}\). The sensor sits \(10^\circ\mathrm{C}\) above the fluid once it has settled. Specific heat \(0.5\,\mathrm{J}/^\circ\mathrm{C}\). (If your photocopy says \(0.51\), use \(0.51\). The arithmetic is the same shape.)

1. \(P=V^2/R=25/100=0.25\,\mathrm{W}\).
2. \(\tau=0.5\times 10/0.25=20\,\mathrm{s}\).
3. The self-heating offset is a step of \(10^\circ\mathrm{C}\) on a first-order system. 5% of it is still missing at \(3\tau\).

**Box:** \(\tau=20\,\mathrm{s}\). Wait \(3\tau=60\,\mathrm{s}\) before calling the reading valid.

## Solved — December 2022 Q6(b), \(\pm 10\,\mathrm{V}\)

The photocopy is a design, so state the assumptions. Take \(\alpha=0.43\%/^\circ\mathrm{C}=0.0043\) per °C, \(R_0=100\,\Omega\) at \(0^\circ\mathrm{C}\), and the two required points as \(-10\,\mathrm{V}\) at \(-20^\circ\mathrm{C}\) and \(+10\,\mathrm{V}\) at \(+20^\circ\mathrm{C}\). (Both ends printed as “20 °C” cannot be built. Check the sign on the paper.)

1. \(R(-20)=100(1-0.0043\times 20)=91.4\,\Omega\). \(R(+20)=108.6\,\Omega\).
2. Quarter bridge, three fixed arms of \(100\,\Omega\), RTD in the fourth, so the bridge is balanced at \(0^\circ\mathrm{C}\).
3. At \(+20^\circ\mathrm{C}\), \(\delta=0.086\):
   \[
   \frac{E_o}{V_s}=\frac{0.086}{4+2\times 0.086}=0.0206.
   \]
   At \(-20^\circ\mathrm{C}\) the output reverses.
4. Choose \(V_s=5\,\mathrm{V}\). Then \(E_o=\pm 0.103\,\mathrm{V}\) at the two ends.
5. A differential amplifier of gain \(10/0.103=97\) takes that to \(\pm 10\,\mathrm{V}\).

**Box:** \(100\,\Omega\) quarter bridge, \(V_s=5\,\mathrm{V}\), gain \(97\). Any other \(V_s\) is fine if the gain is adjusted so that \(0.0206\, V_s\times\mathrm{gain}=10\).

## Solved — November 2022 Q1, iron–constantan

\(0\) to \(300^\circ\mathrm{C}\). \(E(100,0)=5268\,\mu\mathrm{V}\), \(E(300,0)=16325\,\mu\mathrm{V}\). Fit \(E=xT+yT^2\) on that span. Then an emf of \(13600\,\mu\mathrm{V}\) against a \(20^\circ\mathrm{C}\) junction, with a compensation voltage of \(1200\,\mu\mathrm{V}\).

1. 
   \[
   \begin{aligned}
   100x+10000 y&=5268 \\
   300x+90000 y&=16325.
   \end{aligned}
   \]
2. Multiply the first equation by 3 and subtract from the second: \(60000 y=491\), so \(y=0.008683\,\mu\mathrm{V}/^\circ\mathrm{C}^2\).
3. \(x=(5268-86.83)/100=51.81\,\mu\mathrm{V}/^\circ\mathrm{C}\).
4. Ideal straight line from \(0\) to \(300^\circ\mathrm{C}\), using the \(300^\circ\mathrm{C}\) point as full scale: at \(100^\circ\mathrm{C}\) the line predicts \(16325/3=5442\,\mu\mathrm{V}\). Actual is \(5268\). Deviation \(=-174\,\mu\mathrm{V}\).
   \[
   \text{nonlinearity}=\frac{-174}{16325}\times 100=-1.06\% \text{ of full scale}.
   \]
5. Compensation puts the cold junction back to \(0^\circ\mathrm{C}\): \(E(T,0)=13600+1200=14800\,\mu\mathrm{V}\).
6. \(0.008683\, T^2+51.81\, T-14800=0\). The positive root is \(T=273^\circ\mathrm{C}\).

**Box:** \(x=51.8\,\mu\mathrm{V}/^\circ\mathrm{C}\), \(y=0.00868\,\mu\mathrm{V}/^\circ\mathrm{C}^2\), nonlinearity \(-1.06\%\) of full scale, hot junction \(273^\circ\mathrm{C}\).

## Practice

1. A Pt100 has \(\alpha=0.00385\) per °C. Find \(R\) at \(50^\circ\mathrm{C}\), and the sensitivity in \(\Omega/^\circ\mathrm{C}\).
2. Same couple as the solved question. The meter reads \(8000\,\mu\mathrm{V}\) against a \(0^\circ\mathrm{C}\) junction. Estimate \(T\) with the quadratic you already have.

### Answers

1. \(R=100(1+0.00385\times 50)=119.25\,\Omega\). Sensitivity \(=\alpha R_0=0.385\,\Omega/^\circ\mathrm{C}\).
2. \(0.008683 T^2+51.81 T-8000=0\). \(T=151^\circ\mathrm{C}\).
