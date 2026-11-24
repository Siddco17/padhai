---
tags: [course/mni, endsem]
---

# Block 7 — ADC (1 h)

November 2022 Q2 is 10 marks: word size, a bipolar code, and the working of a dual-slope voltmeter. December 2020 asks for the SAR bit pattern of \(5.56\,\mathrm{V}\) and a dual-slope conversion time.

The dual-slope drawing is page 1 of `resources/20261016T055050Z_936c26c6_33. DUAL SLOPE ADC.pdf`, saved below. SAR is easier from the steps than from a block diagram.

![Dual-slope ADC: integrate, then de-integrate](figures/source/dual-slope-adc.jpg)

## Theory

An ADC turns a voltage into a binary code. Three of them are enough.

**Flash.** \(2^n-1\) comparators at once. Fastest, heaviest. One sentence if they ask.

**Successive approximation (SAR).** \(n\) comparisons, a binary search. One clock per bit. This is the one they ask you to tabulate.

**Dual slope.** Integrate the unknown for a fixed time, then de-integrate with a reference until the integrator returns to zero. The second time is proportional to the voltage. Slow, and it rejects noise because it averages over the first interval.

Resolution of an \(n\)-bit converter is full scale divided by \(2^n\).

## Formulas

\[
\text{resolution}=\frac{V_\mathrm{ref}}{2^n}, \qquad \text{code}=\mathrm{round\ or\ floor}\left(\frac{V_\mathrm{in}}{V_\mathrm{ref}}\, 2^n\right)
\]

Write the code the way the question defines the thresholds. For a SAR, the bit weights are \(V_\mathrm{ref}/2\), \(V_\mathrm{ref}/4\), \(V_\mathrm{ref}/8\), … and you keep a bit only if the running total does not exceed \(V_\mathrm{in}\).

| Symbol | Meaning |
|---|---|
| \(n\) | number of bits |
| \(V_\mathrm{ref}\) | reference, the top of the range |
| \(2^n\) | number of codes |

Word size for a temperature span. Sensor gives \(k\) volts per degree. You need a step no coarser than \(\Delta T\).

\[
\text{codes needed}=\frac{T_\mathrm{span}}{\Delta T}, \qquad n=\log_2(\text{codes needed})
\]

rounded up. The reference must cover \(k\times T_\mathrm{span}\). If they also hand you a fixed \(V_\mathrm{ref}\), the resolution in volts is \(V_\mathrm{ref}/2^n\) and you check that it is smaller than \(k\Delta T\).

Dual slope. Fixed integrate time \(T_1\), then de-integrate time \(T_2\):

\[
T_2=T_1\frac{V_\mathrm{in}}{V_\mathrm{ref}}, \qquad T_\mathrm{conversion}=T_1+T_2
\]

\(R\) and \(C\) cancel. They set the slope, and they set how large \(T_1\) must be to stay inside the integrator’s voltage range, but they do not appear in \(T_2\) once \(T_1\) is given.

Bipolar \(n\)-bit, reference \(V_\mathrm{ref}\), input from \(-V_\mathrm{ref}\) to \(+V_\mathrm{ref}\) in offset binary (the usual exam version): the code for zero is \(2^{n-1}\), and

\[
\mathrm{code}=\frac{V_\mathrm{in}+V_\mathrm{ref}}{2 V_\mathrm{ref}}\times 2^n.
\]

## Derivation — dual-slope time

1. For a fixed time \(T_1\) the integrator ramps at \(V_\mathrm{in}/(RC)\). It reaches \(v=V_\mathrm{in} T_1/(RC)\).
2. The reference is then connected with the opposite sign. The ramp back toward zero has slope \(V_\mathrm{ref}/(RC)\).
3. Time to fall from \(v\) to 0: \(T_2=v\cdot RC/V_\mathrm{ref}=T_1 V_\mathrm{in}/V_\mathrm{ref}\).
4. \(RC\) cancelled. A slow drift in \(R\) or \(C\) changes both slopes the same way.

## Solved — December 2020, SAR and dual slope

**SAR.** 4-bit, \(V_\mathrm{ref}=8\,\mathrm{V}\), \(V_\mathrm{in}=5.56\,\mathrm{V}\). Bit weights \(4\), \(2\), \(1\), \(0.5\,\mathrm{V}\).

| Clock | Try | Total | Decision | Code so far |
|---|---|---|---|---|
| 1 | \(4\,\mathrm{V}\) | 4 | \(5.56>4\), keep | 1000 |
| 2 | \(+2\,\mathrm{V}\) | 6 | \(5.56<6\), drop | 1000 |
| 3 | \(+1\,\mathrm{V}\) | 5 | \(5.56>5\), keep | 1010 |
| 4 | \(+0.5\,\mathrm{V}\) | 5.5 | \(5.56>5.5\), keep | 1011 |

**Box:** code \(1011\), which is \(11\), representing \(11/16\times 8=5.5\,\mathrm{V}\).

**Dual slope.** \(R=300\,\mathrm{k}\Omega\), \(C=0.1\,\mu\mathrm{F}\), \(V_\mathrm{ref}=10\,\mathrm{V}\), \(T_1=8\,\mathrm{ms}\), \(V_\mathrm{in}=5.8\,\mathrm{V}\).

\[
T_2=8\times\frac{5.8}{10}=4.64\,\mathrm{ms}, \qquad T_\mathrm{conversion}=12.64\,\mathrm{ms}.
\]

\(RC\) is not used. Say so, in one line, so the examiner sees that you noticed it.

## Solved — November 2022 Q2(a), word size

Sensor \(0.02\,\mathrm{V}/^\circ\mathrm{C}\), range \(0\) to \(100^\circ\mathrm{C}\), resolution \(0.1^\circ\mathrm{C}\).

1. Voltage span \(=0.02\times 100=2\,\mathrm{V}\). So \(V_\mathrm{ref}\) must be at least \(2\,\mathrm{V}\). If they allow you to choose it, pick \(V_\mathrm{ref}=2\,\mathrm{V}\).
2. Number of steps \(=100/0.1=1000\).
3. \(2^{9}=512\), \(2^{10}=1024\). You need 10 bits.
4. Hex word size: 10 bits is three hex digits, from \(000\) to \(3\mathrm{FF}\).

**Box:** \(V_\mathrm{ref}=2\,\mathrm{V}\), \(n=10\), hex word from \(000\) to \(3\mathrm{FF}\).

If the question instead fixes \(V_\mathrm{ref}=5\,\mathrm{V}\), the same 10 bits give a voltage step of \(5/1024=4.9\,\mathrm{mV}\), which is \(0.24^\circ\mathrm{C}\) on this sensor and is **not** fine enough for \(0.1^\circ\mathrm{C}\). Then \(n=12\) (\(5/4096=1.2\,\mathrm{mV}=0.061^\circ\mathrm{C}\)). Read whether \(V_\mathrm{ref}\) is yours to choose.

## Practice

1. November 2021 style. 10-bit ADC, \(V_\mathrm{ref}=5\,\mathrm{V}\), input \(3.45\,\mathrm{V}\). Find the hex code. If the code is \(1\mathrm{B}4_{16}\), what was the input?
2. Bipolar 8-bit, \(V_\mathrm{ref}=8\,\mathrm{V}\), offset binary as in the formula above. Input \(+2.5\,\mathrm{V}\). Find the code. What input produces \(8\mathrm{F}_{16}\)?

### Answers

1. Step \(=5/1024=4.883\,\mathrm{mV}\). Code \(=\lfloor 3.45/0.004883\rfloor=706=2\mathrm{C}2_{16}\). \(1\mathrm{B}4_{16}=436\), so \(V=436/1024\times 5=2.13\,\mathrm{V}\).
2. Code \(=(2.5+8)/16\times 256=168=A8_{16}\). \(8\mathrm{F}_{16}=143\), so \(V=143/256\times 16-8=0.94\,\mathrm{V}\).
