---
tags: [meta, interview, course/acd, course/dchd]
aliases: [chip club ACD, chip club DCHD]
---

# Chip club — ACD drawings and DCHD card

Day 3 morning is part A. Redraw each circuit and write \(v_o\) **before** you check [[sem3/05-acd/notes/midsem-formulas|the ACD formula sheet]]. Day 3 afternoon is part B, on paper, with [[sem3/02-dchd/notes/midsem-formulas|the DCHD formula sheet]] closed until you are stuck.

Golden rules, linear region, negative feedback: \(I_+=I_-=0\), and \(v_+\approx v_-\). Ideal op-amp: \(A\to\infty\), \(R_i\to\infty\), \(R_o\to 0\). See [[Ideal op-amp]].

**Virtual short** is \(v_+\approx v_-\). It is true whenever negative feedback holds the output off the rail. **Virtual ground** is the special case \(v_+=0\), so \(v_-=0\). The inverting pin is not tied to ground. No current enters it. Current through the input resistor continues through the feedback element. See [[Virtual ground]].

A non-inverting amp has a virtual short and **no** virtual ground. If you set \(v_-=0\) on a non-inverting circuit, the gain comes out wrong.

---

# A. Op-amp circuits

Supply rails \(\pm V_{sat}\) when the output slams. For a \(\pm 15\,\mathrm{V}\) 741-style part, \(V_{sat}\) is a couple of volts inside the rail. If they do not give it, use \(\pm V_{sat}\) as symbols.

## A.1 Inverting

Input resistor \(R_1\) into the inverting pin. Feedback \(R_F\). Non-inverting pin grounded.

\[
v_o=-\frac{R_F}{R_1}v_i
\]

\(R_{in}=R_1\) (the virtual ground makes the source see only \(R_1\)). Phase flip. This is [[Inverting and non-inverting]].

**Catch:** \(v_-=0\), but the pin is not ground. \(i_{in}=v_i/R_1\) goes through \(R_F\).

### Worked

\(R_1=10\,\mathrm{k}\Omega\), \(R_F=47\,\mathrm{k}\Omega\), \(v_i=0.2\,\mathrm{V}\). \(v_o=-0.94\,\mathrm{V}\).

## A.2 Non-inverting

\(v_i\) on the **+** pin. Divider from the output to the **−** pin: \(R_1\) to ground, \(R_F\) feedback.

\[
v_o=\left(1+\frac{R_F}{R_1}\right)v_i
\]

\(R_{in}\to\infty\). No phase flip. No virtual ground: \(v_-=v_+=v_i\), not 0.

### Worked

\(R_1=10\,\mathrm{k}\Omega\), \(R_F=40\,\mathrm{k}\Omega\). Gain \(5\). \(v_i=0.2\,\mathrm{V}\) gives \(v_o=1.0\,\mathrm{V}\).

## A.3 Summing (inverting)

Several input resistors into the virtual ground, one feedback \(R_F\).

\[
v_o=-R_F\left(\frac{v_1}{R_1}+\frac{v_2}{R_2}+\cdots\right)
\]

Each source is isolated from the others by the virtual ground.

### Worked

\(R_F=10\,\mathrm{k}\Omega\), \(R_1=10\,\mathrm{k}\Omega\), \(R_2=5\,\mathrm{k}\Omega\), \(v_1=1\,\mathrm{V}\), \(v_2=0.5\,\mathrm{V}\).

\[
v_o=-10\,\mathrm{k}\left(\frac{1}{10\,\mathrm{k}}+\frac{0.5}{5\,\mathrm{k}}\right)=-2\,\mathrm{V}
\]

## A.4 Difference

Inverting side: \(v_1\) through \(R_1\), feedback \(R_F\). Non-inverting side: \(v_2\) through \(R_2\), then \(R_3\) to ground. **Match the ratios:** \(R_F/R_1=R_3/R_2=\alpha\).

\[
v_o=\alpha(v_2-v_1)
\]

If the ratios do not match, a common voltage leaks into \(v_o\). That leak is the CMRR question in one sentence.

### Worked

\(R_1=R_2=10\,\mathrm{k}\Omega\), \(R_F=R_3=20\,\mathrm{k}\Omega\), so \(\alpha=2\). \(v_2=3\,\mathrm{V}\), \(v_1=1\,\mathrm{V}\). \(v_o=4\,\mathrm{V}\).

Superposition if you blank: ground \(v_2\), inverting gain \(-R_F/R_1\) on \(v_1\). Ground \(v_1\), the + pin sees \(v_2 R_3/(R_2+R_3)\), then non-inverting gain \(1+R_F/R_1\). Matched ratios collapse that to \(\alpha(v_2-v_1)\).

## A.5 Voltage follower

Output tied straight back to the inverting pin. \(v_i\) on the + pin. \(\beta_f=1\).

\[
v_o=v_i
\]

\(R_{in}\to\infty\), \(R_o\to 0\), closed-loop bandwidth is the full gain-bandwidth product. It is a buffer. Use it when the next block would load a high-resistance node (a sensor, a divider, a DAC).

## A.6 Integrator

Inverting layout, feedback element is \(C\), input element is \(R\). See [[Integrator]].

\[
v_o=-\frac{1}{RC}\int v_i\,dt
\]

| \(v_i\) | \(v_o\) |
|---------|---------|
| DC | ramp, until \(\pm V_{sat}\) |
| square | triangle |
| triangle | parabola pieces |
| sine | minus cosine (lags \(90^\circ\)) |

**Why the practical \(R_F\) across \(C\):** a real op-amp has offset. The ideal integrator treats offset as a DC input and ramps to the rail. \(R_F\) makes DC gain \(-R_F/R\), finite. The circuit integrates only well above \(f=1/(2\pi R_F C)\).

### Worked

\(R=10\,\mathrm{k}\Omega\), \(C=0.1\,\mu\mathrm{F}\), so \(RC=1\,\mathrm{ms}\). Square wave \(\pm 1\,\mathrm{V}\), half-period \(1\,\mathrm{ms}\).

During the positive half, \(\Delta v_o=-(1)(1\,\mathrm{ms})/(1\,\mathrm{ms})=-1\,\mathrm{V}\). That swing is the triangle’s peak-to-peak. Negative half swings \(+1\,\mathrm{V}\). Square in, triangle out.

## A.7 Differentiator

Swap \(R\) and \(C\): \(C\) in series with the input, \(R\) in feedback.

\[
v_o=-RC\frac{dv_i}{dt}
\]

| \(v_i\) | \(v_o\) |
|---------|---------|
| DC | \(0\) |
| square | spikes at the edges |
| triangle | square |
| sine | cosine (leads \(90^\circ\)) |

**Why it is noisy, and the fix:** gain magnitude is \(\omega RC\), so it rises with frequency and amplifies hiss. A small \(R\) in series with \(C\) stops the rise past \(1/(2\pi R_{series} C)\). That is the practical differentiator.

### Worked

\(R=100\,\mathrm{k}\Omega\), \(C=0.1\,\mu\mathrm{F}\), \(RC=10\,\mathrm{ms}\). \(v_i=\sin(1000 t)\) (amplitude \(1\,\mathrm{V}\)).

\[
v_o=-0.01\times 1000\cos(1000 t)=-10\cos(1000 t)
\]

Peak \(10\,\mathrm{V}\). If \(\pm V_{sat}\) is inside that, the output clips and you no longer have a differentiator. Say so.

## A.8 Instrumentation amplifier

Three op-amps. The first two are non-inverting buffers with a shared \(R_G\) between their inverting pins and an \(R_f\) in each feedback. The third is a difference amp, ratio \(R_2/R_1\).

\[
v_o=\frac{R_2}{R_1}\left(1+\frac{2R_f}{R_G}\right)(v_2-v_1)
\]

Same formula as the ACD sheet. You tune **one** resistor, \(R_G\). Both inputs are op-amp + pins, so \(R_{in}\) is huge on both sides and the source is not loaded unequally (a single difference amp’s two inputs do not have equal \(R_{in}\)). The common voltage is rejected in the last stage; the first stage amplifies only the difference. That is why CMRR is the point of the block, not just gain.

### Worked

\(R_2=R_1\), \(R_f=10\,\mathrm{k}\Omega\), \(R_G=2\,\mathrm{k}\Omega\).

\[
G=1+\frac{2\times 10}{2}=11
\]

\(v_2-v_1=50\,\mathrm{mV}\) gives \(v_o=0.55\,\mathrm{V}\). A \(1\,\mathrm{V}\) common signal does not appear in the ideal \(v_o\).

## A.9 Comparator

No feedback, or positive feedback that you are **not** using as a linear amp. Output is not a scaled copy of the input. It is a decision.

\[
v_o=+V_{sat}\ \text{if}\ v_+>v_-,\qquad v_o=-V_{sat}\ \text{otherwise}
\]

Reference on +, signal on −: output flips low when the signal crosses the reference (inverting comparator). One threshold. A noisy signal near that threshold chatters. That is the reason the next circuit exists.

## A.10 Schmitt trigger

Comparator with **hysteresis**. Positive feedback. Two thresholds, so a noisy crossing happens once. See [[Schmitt trigger]].

**Inverting form** (the one to draw). Signal on the **−** pin. On the **+** pin: \(R_1\) to ground, \(R_2\) from the output back to +.

\[
\beta=\frac{R_1}{R_1+R_2}
\]

\[
V_{UT}=+\beta V_{sat},\qquad V_{LT}=-\beta V_{sat},\qquad V_H=V_{UT}-V_{LT}=2\beta V_{sat}
\]

Rising input trips at \(V_{UT}\) and the output falls to \(-V_{sat}\). Falling input trips at \(V_{LT}\) and the output rises. Between the two, the output **stays where it was**. That memory is the hysteresis.

**Non-inverting form,** if they ask. Signal through a series \(R_1\) into the **+** pin, feedback \(R_2\) from the output to that same pin, **−** pin grounded.

\[
V_{UT}=+V_{sat}\frac{R_1}{R_2},\qquad V_{LT}=-V_{sat}\frac{R_1}{R_2}
\]

Here the ratio is \(R_1/R_2\), not the divider fraction. Name the resistors before you write it.

### Worked (inverting)

\(\pm V_{sat}=\pm 10\,\mathrm{V}\), \(R_1=10\,\mathrm{k}\Omega\) to ground, \(R_2=40\,\mathrm{k}\Omega\) to the output.

\[
\beta=\frac{10}{50}=0.2,\quad V_{UT}=+2\,\mathrm{V},\quad V_{LT}=-2\,\mathrm{V},\quad V_H=4\,\mathrm{V}
\]

A signal with \(0.5\,\mathrm{V}\) of noise around \(0\) never reaches either threshold, so the output does not chatter. A clean comparator with threshold \(0\) would.

### You try

Inverting Schmitt, \(\pm V_{sat}=\pm 12\,\mathrm{V}\), \(R_1=R_2\). Thresholds and \(V_H\)?

<details><summary>Solution</summary>

\(\beta=1/2\). \(V_{UT}=+6\,\mathrm{V}\), \(V_{LT}=-6\,\mathrm{V}\), \(V_H=12\,\mathrm{V}\).

</details>

---

# B. DCHD card (one pass, then paper)

Algebra you already drilled lives in [[sem3/02-dchd/notes/midsem-formulas|midsem-formulas]] and Block 1 of [[sem3/02-dchd/notes/crash-course|the crash course]]. This card is what you **say**, then one map you do timed. Full minimization notes: [[Boolean minimization]].

## Say this

- AND is series switches, OR is parallel, NOT inverts. XOR is “different.” NAND and NOR are universal: any function is NAND-only, or NOR-only.
- DeMorgan: \((A+B)'=A'B'\), \((AB)'=A'+B'\). NAND is a bubbled-OR. NOR is a bubbled-AND. Bubble on an input means the variable is complemented before the gate.
- Absorption \(A+AB=A\). The one that actually deletes a term: \(A+A'B=A+B\). Consensus: \(AB+A'C+BC=AB+A'C\).
- **SOP:** list the 1s as products, OR them. **POS:** list the 0s as sums, AND them. **Canonical** means every variable appears in every term.
- Two-level build: SOP becomes **NAND–NAND**. POS becomes **NOR–NOR**.

## K-map rules

Cells \(=2^n\). Label axes in Gray order `00, 01, 11, 10`. Adjacent cells, including edges that wrap, differ by one variable. Groups of \(2^k\) only. Overlap is allowed. Every 1 must sit in a group. A group of \(2^k\) removes \(k\) variables.

Don’t-cares: include a \(d\) only when it makes a group larger (a bigger power of two). A \(d\) you did not use is not a 1 you failed to cover. Never pull a 0 into an SOP group.

POS on the same map: circle the **0s**, write a sum for each group (the variable is primed if the group sits where that variable is 1).

## Worked 4-variable map

\(F(A,B,C,D)=\sum m(0,1,2,5,8,9,10)\). Gray order on \(AB\) and on \(CD\).

Groups:

- \(m(0,2,8,10)\): \(B=0\), \(D=0\) → \(B'D'\)
- \(m(0,1,8,9)\): \(B=0\), \(C=0\) → \(B'C'\)
- \(m(1,5)\): \(A=0\), \(C=0\), \(D=1\) → \(A'C'D\) (this pair exists to cover \(m_5\); nothing else touches it)

\[
F=B'D'+B'C'+A'C'D
\]

All three are essential: \(m_2\) and \(m_{10}\) sit only in the first, \(m_9\) only in the second, \(m_5\) only in the third.

NAND–NAND: each product is a NAND, with primed literals inverted before they enter. A second NAND takes those three outputs. DeMorgan turns that second NAND into the OR. You do not add a separate OR gate.

### You try (8 minutes, closed notes)

\(F=\sum m(0,1,2,3,8,9,10,11)\). One sentence on what the group is.

<details><summary>Solution</summary>

Those eight cells are the entire \(B=0\) half of the map ( \(B'\) with every \(A,C,D\) ). One octet. \(F=B'\). If you wrote four quads, the map is right and the answer is not finished.

</details>

## Combinational blocks they point at

Half adder: \(\mathrm{sum}=A\oplus B\), \(\mathrm{carry}=AB\).

Full adder: \(\mathrm{sum}=A\oplus B\oplus C_{in}\), \(C_{out}=AB+BC_{in}+AC_{in}\). Sum is 1 when an odd number of inputs is 1. Carry is 1 when at least two inputs are 1.

\(n\)-bit adder–subtractor: \(M=0\) adds, \(M=1\) inverts \(B\) and sets \(C_0=1\) (add the 2’s complement).

MUX \(2^m:1\): \(m\) select lines, output equals the data line the select points at. To build a function, put \(m\) variables on the select and wire each data pin to \(0\), \(1\), \(D\), or \(D'\) in the remaining variable.

Decoder \(n\to 2^n\): one output per minterm. OR the outputs whose minterms are 1 and you have the SOP.

## What you will not open

Sequential, HDL, Quine–McCluskey, hazards. If they ask, say you can do a Moore/Mealy from the DCHD course and stop. Do not spend the last hour there.

---

# Blank-page checklist

1. Inverting and non-inverting, including which one has virtual ground.
2. Summer, difference (matched ratios), follower.
3. Integrator and differentiator formulas, the waveform pairs, and why each practical resistor exists.
4. IA formula and why it is not just a difference amp.
5. Comparator chatter, then \(V_{UT}\), \(V_{LT}\), \(V_H\) for the inverting Schmitt.
6. One 4-variable map, NAND–NAND in words, full-adder equations.
