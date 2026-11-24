---
tags: [course/mni, endsem]
---

# Block 5 — Meters (1.5 h)

Ayrton’s shunt is on the October 2020 mid (5 marks), the September 2022 sessional, and December 2022 Q7 (6 marks). The September 2026 mid opens with voltmeter loading and asks for the construction of a PMMC.

Read `resources/notes/PMMC.pdf` page 2 for the instrument drawing, and pages 1–2 of `PMMC_Ohmmeter_Meter_Extension.pdf` if you want the shunt algebra in the professor’s handwriting.

![PMMC instrument](figures/source/pmmc-instrument.jpg)

## Theory

A PMMC is a coil in the radial field of a permanent magnet. Current in the coil produces a torque. Hair springs produce a restoring torque and also carry the current in. At equilibrium the deflection is proportional to current, so the scale is linear. An aluminium former gives eddy-current damping. It is a DC instrument. On AC the mean torque is zero and the pointer stays at zero.

To read a larger current, put a shunt across the movement so the extra current bypasses the coil. To read a larger voltage, put a multiplier in series. An Ayrton shunt is a chain of resistors. Changing range never leaves the movement unshunted while you switch.

A voltmeter is a load. Its resistance is the sensitivity in \(\mathrm{k}\Omega/\mathrm{V}\) times the range you selected.

## Formulas

\[
T_d = NBA\, I = GI, \qquad T_c = k\theta, \qquad \theta = \frac{GI}{k}
\]

| Symbol | Meaning |
|---|---|
| \(N\) | turns on the coil |
| \(B\) | flux density in the gap, T |
| \(A\) | area of the coil, m\(^2\) |
| \(I\) | coil current, A |
| \(G\) | \(NBA\), the galvanometer constant |
| \(k\) | spring constant, N·m per radian (or per degree, if that is how the paper states it) |
| \(\theta\) | deflection |

Shunt and multiplier. \(I_m\) and \(V_m=I_m R_m\) are the movement’s own full-scale current and voltage. \(m\) is the factor by which you extend the range.

\[
R_{sh}=\frac{R_m}{m-1}, \quad m=\frac{I}{I_m}
\qquad
R_{se}=(m-1)R_m, \quad m=\frac{V}{V_m}
\]

Ayrton string \(S=R_1+R_2+\cdots\), designed on the **lowest** current range, where the whole string is the shunt:

\[
S=\frac{I_m R_m}{I_\mathrm{low}-I_m}
\]

On any range \(I\), the portion of the string still acting as the shunt is

\[
R_\mathrm{shunt}(I)=\frac{I_m(R_m+S)}{I}
\]

The difference between two of those values is the resistor between those taps.

Voltmeter loading. Source \(E_o\) with internal resistance \(R_o\), meter resistance \(R_m\):

\[
V_L=E_o\frac{R_m}{R_m+R_o}
\]

\(R_m=(\mathrm{k}\Omega/\mathrm{V})\times(\text{range in volts})\), with the result in \(\mathrm{k}\Omega\).

## Derivation — the Ayrton tap

1. On the lowest range the entire string \(S\) is across the movement. The movement current is \(I_m\) when the line current is \(I_\mathrm{low}\).
2. Voltage across the movement equals voltage across the shunt:
   \[
   I_m R_m=(I_\mathrm{low}-I_m)S.
   \]
   Solve for \(S\).
3. On a higher range, part of the string has moved into series with the movement. Call the remaining shunt \(R_s\). The series piece is \(S-R_s\).
4. Voltage balance:
   \[
   (I-I_m)R_s=I_m(R_m+S-R_s).
   \]
5. Collect \(R_s\): \(I R_s=I_m(R_m+S)\), so \(R_s=I_m(R_m+S)/I\).
6. The resistor between the \(I_a\) tap and the \(I_b\) tap is \(R_s(I_a)-R_s(I_b)\).

## Solved — December 2022 Q7, which is also the October 2020 mid

Movement \(R_m=100\,\Omega\), \(I_m=50\,\mu\mathrm{A}\). Ranges \(1\,\mathrm{mA}\), \(10\,\mathrm{mA}\), \(50\,\mathrm{mA}\), \(100\,\mathrm{mA}\).

1. Lowest range, whole string is the shunt:
   \[
   S=\frac{50\times 10^{-6}\times 100}{0.001-50\times 10^{-6}}=\frac{0.005}{0.00095}=5.263\,\Omega.
   \]
2. \(I_m(R_m+S)=50\times 10^{-6}\times 105.263=5.263\times 10^{-3}\).
3. Shunt still in circuit at each tap:
   \[
   \begin{aligned}
   R_s(1\,\mathrm{mA})&=5.263\,\Omega \\
   R_s(10\,\mathrm{mA})&=0.5263\,\Omega \\
   R_s(50\,\mathrm{mA})&=0.1053\,\Omega \\
   R_s(100\,\mathrm{mA})&=0.05263\,\Omega.
   \end{aligned}
   \]
4. Sections, from the low-current end toward the high-current end:
   \[
   \begin{aligned}
   R_1&=5.263-0.5263=4.737\,\Omega \\
   R_2&=0.5263-0.1053=0.421\,\Omega \\
   R_3&=0.1053-0.0526=0.0526\,\Omega \\
   R_4&=0.0526\,\Omega.
   \end{aligned}
   \]

**Box:** \(S=5.263\,\Omega\), with sections \(4.737\), \(0.421\), \(0.0526\), \(0.0526\,\Omega\). Draw the string, label the four taps, and show \(R_m\) across the whole string on the 1 mA range.

## Solved — September 2026 mid Q1(a), loading

Voltmeter sensitivity \(1.5\,\mathrm{k}\Omega/\mathrm{V}\), reading \(80\,\mathrm{V}\) on the \(100\,\mathrm{V}\) range, in parallel with an unknown resistor. Series milliammeter reads \(15\,\mathrm{mA}\). Neglect the milliammeter’s resistance.

1. \(R_m=1.5\times 100=150\,\mathrm{k}\Omega\).
2. Apparent resistance \(=80/0.015=5333\,\Omega\).
3. Current through the meter \(=80/150000=0.533\,\mathrm{mA}\).
4. Current through the resistor \(=15-0.533=14.467\,\mathrm{mA}\).
5. Actual resistance \(=80/0.014467=5530\,\Omega\).
6. Error \(=5333-5530=-197\,\Omega\), which is \(-3.56\%\) of the true resistance.
7. Percentage relative accuracy \(=100(1-0.0356)=96.4\%\).

## Practice

1. September 2022 sessional. \(I_m=1\,\mathrm{mA}\), \(R_m=100\,\Omega\). Ranges \(10\,\mathrm{mA}\), \(100\,\mathrm{mA}\), \(1\,\mathrm{A}\). Find the three sections of the Ayrton string.
2. October 2020 mid Q7. Coil length \(5\,\mathrm{cm}\), width \(4\,\mathrm{cm}\), \(80\) turns. \(B=0.1\,\mathrm{T}\). Spring gives \(0.5\times 10^{-7}\,\mathrm{N\,m}\) per degree. Current for a full-scale deflection of \(60^\circ\).
3. A source is \(50\,\mathrm{V}\) with \(R_o=100\,\mathrm{k}\Omega\). What meter resistance keeps the reading at or above \(49.5\,\mathrm{V}\)?

### Answers

1. \(S=100/(10-1)=11.111\,\Omega\). Sections \(R_1=10.00\,\Omega\), \(R_2=1.00\,\Omega\), \(R_3=0.111\,\Omega\). \(R_1\) is the section that leaves the shunt when you go from 10 mA to 100 mA.
2. Area \(=0.05\times 0.04=0.002\,\mathrm{m}^2\). \(G=NBA=80\times 0.1\times 0.002=0.016\,\mathrm{N\,m/A}\). Torque at \(60^\circ=60\times 0.5\times 10^{-7}=3\times 10^{-6}\,\mathrm{N\,m}\). \(I=3\times 10^{-6}/0.016=0.1875\,\mathrm{mA}\).
3. \(49.5=50\, R_m/(R_m+100\,\mathrm{k})\). \(R_m=9.9\,\mathrm{M}\Omega\).
