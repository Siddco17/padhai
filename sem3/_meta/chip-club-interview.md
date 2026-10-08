---
tags: [meta, interview]
aliases: [chip club, chip design club]
---

# Chip design club — 3-day viva

Whiteboard interview on the list you were given: DCHD combinational, EDC devices and bias, ACD op-amp blocks. Not a second midterm. Not HDL.

Sheets:

- [[sem3/_meta/chip-club-edc|EDC]] — Day 1 and Day 2. This is the hole (Sem 2 barely passed).
- [[sem3/_meta/chip-club-acd-dchd|ACD and DCHD]] — Day 3. Op-amp drawings, then one K-map.
- Do not rewrite. DCHD algebra you already have: [[sem3/02-dchd/notes/midsem-formulas|DCHD formulas]]. Op-amp gains you already have: [[sem3/05-acd/notes/midsem-formulas|ACD formulas]].

Today is Thursday 8 Oct 2026. Three sittings land on Thu, Fri, Sat, with the interview on Sunday 11 Oct if “in 3 days” is literal. If the slot is Saturday, do the mock on Friday night and keep Saturday morning for whatever you missed.

## How an answer should sound

About thirty seconds, in this order:

1. What it is.
2. The picture (draw while you talk).
3. The formula.
4. The one thing they use to catch you.

Example, say it once out loud before Day 1:

> Voltage-divider bias. Two base resistors, emitter resistor. \(V_{TH}=V_{CC}R_2/(R_1+R_2)\), \(R_{TH}=R_1\parallel R_2\). If \(\beta R_E\gg R_{TH}\), \(I_C\approx(V_{TH}-0.7)/R_E\). Best stability of the five, because \(S\) depends on \(R_{TH}/R_E\), which you can make small.

Constants unless they say otherwise: Si \(V_{BE}=V_D=0.7\,\mathrm{V}\), \(V_T=26\,\mathrm{mV}\), large \(\beta\) means \(I_C\approx I_E\). Call the feedback factor \(\beta_f\) when BJT \(\beta\) is also on the page.

## What this pack will not cover

Sequential logic, HDL, Quine–McCluskey, 741 slew and GBW trivia, active filters, 555. Those are midterm sheets. If they ask a sequential question, say you can do it from DCHD and stop.

---

# Day 1 — Thursday — diodes and every bias

About half the interview risk. Read EDC sections 1–3. Then blank page.

- [ ] Shockley, \(r_d\), Zener vs avalanche, from memory.
- [ ] Five bias circuits drawn. For each: \(I_B\), \(I_C\), \(V_{CE}\).
- [ ] \(S\) formula. Ranking with the \(\beta=100\) numbers (101, 50.8, 50.8, 34.1, 10).
- [ ] Voltage-divider Q-point both ways: shortcut \(1.30\,\mathrm{mA}\), exact \(1.19\,\mathrm{mA}\).
- [ ] You-try in the EDC sheet (\(\beta=50\) on the same divider). The shortcut test fails. That is the point.

Stop when you can redraw the divider and write \(S\) without looking. Do not start CE/CC/CB today.

# Day 2 — Friday — \(r_e\), three BJTs, feedback, MOSFET

EDC sections 4–7. Say the CE/CC/CB table before you check it.

- [ ] \(r_e=26\,\Omega\) at \(1\,\mathrm{mA}\). Bypassed vs unbypassed \(R_E\) (gain 100 vs 9).
- [ ] CE, CC, CB: gain, phase, \(R_i\), \(R_o\), job.
- [ ] Miller: \(2\,\mathrm{pF}\) becomes about \(200\,\mathrm{pF}\). \(f_T=\beta f_\beta\).
- [ ] \(A_f=9.90\), then \(9.88\) after \(A\) falls 20%.
- [ ] Four topologies. Voltage amplifier = series–shunt, \(R_i\) up, \(R_o\) down.
- [ ] MOSFET regions and \(I_D=1\,\mathrm{mA}\) saturation example. CMOS inverter: no static path.

# Day 3 — Saturday — drawings, one map, mock

Morning, ACD section, formulas covered:

- [ ] Inverting and non-inverting. Say which one has virtual ground.
- [ ] Summer, difference, follower.
- [ ] Integrator and differentiator, including the waveform pair and the practical resistor.
- [ ] IA gain of 11 on the worked values.
- [ ] Schmitt: \(+2\,\mathrm{V}\), \(-2\,\mathrm{V}\), hysteresis \(4\,\mathrm{V}\).

Afternoon, DCHD card only:

- [ ] DeMorgan, SOP vs POS, NAND–NAND, full adder, timed.
- [ ] The 4-variable map \(F=B'D'+B'C'+A'C'D\). Then the octet you-try, \(F=B'\).

Last hour: the 40 questions below, out loud, answers covered. Mark any question you cannot **start** in 10 seconds. Redo only those. Then sleep.

---

# Mock — 40 questions

Cover the answer. Start talking within 10 seconds. If you only remember the formula and not the catch, count it as a miss.

## EDC

**1.** What is a depletion region, and what does forward bias do to it?

<details><summary>Answer</summary>

Ions left behind after recombination at the PN join. They set up the barrier. Forward bias lowers the barrier and current rises. Reverse bias widens the region.

</details>

**2.** Write the diode equation and the forward and reverse approximations.

<details><summary>Answer</summary>

\(I=I_S(e^{V/(\eta V_T)}-1)\). Forward, \(V\gg V_T\): \(I\approx I_S e^{V/(\eta V_T)}\). Reverse: \(I\approx -I_S\).

</details>

**3.** Zener or avalanche?

<details><summary>Answer</summary>

Zener is tunneling, narrow depletion, sharp, used as a reference, typical below about \(5\,\mathrm{V}\). Avalanche is carrier multiplication, typical above about \(7\,\mathrm{V}\). The part is still called a Zener and is run reverse biased.

</details>

**4.** \(I_D=10\,\mathrm{mA}\), \(\eta=1\). Dynamic resistance?

<details><summary>Answer</summary>

\(r_d=\eta V_T/I_D=26\,\mathrm{mV}/10\,\mathrm{mA}=2.6\,\Omega\).

</details>

**5.** Draw fixed bias. \(I_B\), \(I_C\), \(V_{CE}\). Why is it the worst bias?

<details><summary>Answer</summary>

\(R_B\) from \(V_{CC}\) to the base, emitter grounded. \(I_B=(V_{CC}-V_{BE})/R_B\), \(I_C=\beta I_B\), \(V_{CE}=V_{CC}-I_C R_C\). \(\beta\) is naked in \(I_C\), so \(S=1+\beta\).

</details>

**6.** Collector-feedback: where does \(R_B\) connect, and why is the current in \(R_C\) equal to \(I_E\)?

<details><summary>Answer</summary>

\(R_B\) from collector to base. Base current is taken from the collector node, so \(R_C\) carries \(I_C+I_B=I_E\). \(I_B=(V_{CC}-V_{BE})/(R_B+(\beta+1)R_C)\). \(\beta\) instead of \(\beta+1\) means they ignored \(I_B\) in \(R_C\).

</details>

**7.** Why does \(R_E\) stabilize \(I_C\)?

<details><summary>Answer</summary>

\(I_C\) up, \(V_E=I_E R_E\) up, \(V_{BE}\) down, \(I_B\) down, \(I_C\) comes back. It fails to help much when \(R_B\gg R_E\): the worked emitter-feedback circuit has \(S=83\), against \(101\) for fixed bias.

</details>

**8.** Define \(S\), \(S'\), \(S''\). What are they tracking?

<details><summary>Answer</summary>

\(S=\partial I_C/\partial I_{CO}\), \(S'=\partial I_C/\partial V_{BE}\), \(S''=\partial I_C/\partial\beta\). Temperature: \(I_{CO}\) doubles about every \(10^\circ\mathrm{C}\), \(V_{BE}\) falls about \(2.5\,\mathrm{mV}/^\circ\mathrm{C}\), \(\beta\) rises. Ideal \(S=1\). Fixed bias \(S=1+\beta\).

</details>

**9.** Write \(S\) when an emitter resistor is present.

<details><summary>Answer</summary>

\(S=(1+\beta)(1+R_B/R_E)/(1+\beta+R_B/R_E)\). For the divider, \(R_B\) means \(R_{TH}\). Smaller \(R_B/R_E\) pulls \(S\) toward 1.

</details>

**10.** Voltage divider. \(V_{TH}\), \(R_{TH}\), the shortcut, and when you may use it.

<details><summary>Answer</summary>

\(V_{TH}=V_{CC}R_2/(R_1+R_2)\), \(R_{TH}=R_1\parallel R_2\). Exact \(I_E=(V_{TH}-V_{BE})/(R_E+R_{TH}/(\beta+1))\). Shortcut \(I_C\approx(V_{TH}-V_{BE})/R_E\) when \(\beta R_E\ge 10 R_{TH}\).

</details>

**11.** Divider numbers: \(V_{CC}=10\,\mathrm{V}\), \(R_1=40\,\mathrm{k}\Omega\), \(R_2=10\,\mathrm{k}\Omega\), \(R_E=1\,\mathrm{k}\Omega\), \(\beta=100\). Shortcut current, and is it legal?

<details><summary>Answer</summary>

\(V_{TH}=2\,\mathrm{V}\), \(R_{TH}=8\,\mathrm{k}\Omega\). \(\beta R_E=100\,\mathrm{k}\Omega > 10\times 8\,\mathrm{k}\Omega\), so yes. \(I_C\approx 1.30\,\mathrm{mA}\). Exact is \(1.19\,\mathrm{mA}\).

</details>

**12.** Rank the five biases, worst stability to best, and give the sample \(S\) values.

<details><summary>Answer</summary>

For \(\beta=100\), \(R_B=100\,\mathrm{k}\Omega\), \(R_C=R_E=1\,\mathrm{k}\Omega\), divider \(R_{TH}=10\,\mathrm{k}\Omega\): fixed \(101\), collector feedback \(50.8\), emitter feedback \(50.8\), emitter–collector \(34.1\), voltage divider \(10\). The tie of the middle two is because \(R_B/R_C=R_B/R_E\) in this set. The divider wins because you can choose a small \(R_{TH}\).

</details>

**13.** \(r_e\), \(g_m\), \(r_\pi\).

<details><summary>Answer</summary>

\(r_e=V_T/I_E\), \(g_m=I_C/V_T\approx 1/r_e\), \(r_\pi=\beta r_e\). The approximations need \(I_C\approx I_E\). At \(1\,\mathrm{mA}\), \(r_e=26\,\Omega\).

</details>

**14.** What does a bypass capacitor across \(R_E\) change?

<details><summary>Answer</summary>

At midband it shorts \(R_E\), so CE gain is \(-R_C/r_e\) and \(R_i=\beta r_e\). Unbypassed, replace \(r_e\) by \(r_e+R_E\): gain falls, \(R_i\) rises. Worked pair: \(|A_v|=100\) bypassed, \(9.1\) with \(R_E=260\,\Omega\).

</details>

**15.** CE: gain, phase, \(R_i\), \(R_o\), job.

<details><summary>Answer</summary>

\(A_v=-R_C/r_e\), \(180^\circ\), \(R_i=\beta r_e\), \(R_o=R_C\). The voltage amplifier. Divider resistors sit in parallel with \(\beta r_e\).

</details>

**16.** Why use a common collector if the gain is about 1?

<details><summary>Answer</summary>

Buffer. \(A_v=R_E/(R_E+r_e)\approx 1\), no inversion, \(R_i=\beta(r_e+R_E)\) high, \(R_o\approx r_e\) low. It isolates a weak source from a heavy load.

</details>

**17.** Common base: \(R_i\), phase, and why it is the high-frequency one.

<details><summary>Answer</summary>

\(A_v=+R_C/r_e\), \(R_i=r_e\), \(R_o=R_C\), no inversion. \(R_i\) is small. \(C_\mu\) is not Miller-multiplied, unlike CE. A cascode is CE into CB for that reason.

</details>

**18.** \(f_T\), and Miller \(C_{in}\).

<details><summary>Answer</summary>

\(f_T=\beta f_\beta\), the frequency where \(\beta\) has fallen to 1. \(C_{in}\approx C_\pi+C_\mu(1+g_m R_C)\). Worked: \(|A_v|=100\), \(C_\mu=2\,\mathrm{pF}\) contributes \(202\,\mathrm{pF}\) at the input.

</details>

**19.** \(A=1000\), feedback factor \(0.1\). Closed-loop gain, and what if \(A\) falls to \(800\)?

<details><summary>Answer</summary>

\(A_f=A/(1+A\beta_f)=1000/101=9.90\). At \(A=800\), \(A_f=800/81=9.88\). Desensitivity, more bandwidth, less distortion, all by \(1+A\beta_f\). This \(\beta_f\) is not the BJT \(\beta\).

</details>

**20.** Voltage amplifier and current amplifier: sampling, mixing, \(R_i\), \(R_o\).

<details><summary>Answer</summary>

Voltage amplifier: voltage sampling, series mixing (series–shunt). \(R_i\) up, \(R_o\) down. Current amplifier: current sampling, shunt mixing (shunt–series). \(R_i\) down, \(R_o\) up. Series mixing raises \(R_i\). Shunt mixing lowers it.

</details>

**21.** MOSFET saturation: condition and \(I_D\). How is the word “saturation” a trap?

<details><summary>Answer</summary>

Enhancement NMOS, \(V_{OV}=V_{GS}-V_t\). Saturation when \(V_{GS}>V_t\) and \(V_{DS}\ge V_{OV}\): \(I_D=\frac12\mu C_{ox}(W/L)(V_{GS}-V_t)^2\). That is the amplifier region. The closed switch is triode (\(V_{DS}<V_{OV}\)). A saturated BJT is the closed switch. Opposite names.

</details>

**22.** Why is a CMOS inverter the chip answer?

<details><summary>Answer</summary>

Input low: PMOS on, NMOS off, output high. Input high: the reverse. Either way there is no DC path from \(V_{DD}\) to ground. Current flows only while the next gate is charging. Enhancement devices are off at \(V_{GS}=0\).

</details>

## ACD

**23.** Ideal op-amp rules in the linear region.

<details><summary>Answer</summary>

\(I_+=I_-=0\), \(v_+\approx v_-\), \(A\to\infty\), \(R_i\to\infty\), \(R_o\to 0\). The short \(v_+\approx v_-\) needs negative feedback holding the output off the rail.

</details>

**24.** Virtual ground or virtual short? Which circuit has which?

<details><summary>Answer</summary>

Virtual short is \(v_+\approx v_-\). Virtual ground is that, plus \(v_+=0\), so \(v_-=0\). Inverting amp: virtual ground. Non-inverting amp: virtual short only, \(v_-=v_i\neq 0\). The inverting pin is not wired to ground, and no current enters it.

</details>

**25.** Inverting and non-inverting gains.

<details><summary>Answer</summary>

Inverting: \(v_o=-(R_F/R_1)v_i\), \(R_{in}=R_1\), phase flip. Non-inverting: \(v_o=(1+R_F/R_1)v_i\), \(R_{in}\to\infty\), no flip.

</details>

**26.** Summing amplifier. \(R_F=10\,\mathrm{k}\Omega\), \(R_1=10\,\mathrm{k}\Omega\), \(R_2=5\,\mathrm{k}\Omega\), \(v_1=1\,\mathrm{V}\), \(v_2=0.5\,\mathrm{V}\).

<details><summary>Answer</summary>

\(v_o=-R_F(v_1/R_1+v_2/R_2)=-2\,\mathrm{V}\). Virtual ground keeps the sources off each other.

</details>

**27.** Difference amplifier. What has to match, and what leaks if it does not?

<details><summary>Answer</summary>

\(R_F/R_1=R_3/R_2=\alpha\), then \(v_o=\alpha(v_2-v_1)\). Unmatched ratios let a common voltage through. That is the CMRR failure.

</details>

**28.** What is a follower for?

<details><summary>Answer</summary>

\(v_o=v_i\), \(\beta_f=1\), \(R_{in}\to\infty\), \(R_o\to 0\), widest closed-loop bandwidth. Buffer so the next stage does not load a divider, a sensor, or a DAC.

</details>

**29.** Integrator formula, and square in gives what out?

<details><summary>Answer</summary>

\(v_o=-(1/RC)\int v_i\,dt\). Square in, triangle out. DC in, a ramp to the rail. Sine in, minus cosine.

</details>

**30.** Why is there a resistor across the integrator capacitor?

<details><summary>Answer</summary>

Offset is a DC input. The ideal integrator ramps it to \(\pm V_{sat}\). \(R_F\) across \(C\) sets DC gain to \(-R_F/R\). It integrates properly only above \(1/(2\pi R_F C)\).

</details>

**31.** Differentiator formula, waveform, and why it is noisy.

<details><summary>Answer</summary>

\(v_o=-RC\,dv_i/dt\). Square in, spikes. Triangle in, square. Gain is \(\omega RC\), so it rises with frequency and amplifies hiss. A small series \(R\) with \(C\) flattens that.

</details>

**32.** Instrumentation amplifier: formula, and why not a single difference amp?

<details><summary>Answer</summary>

\(v_o=(R_2/R_1)(1+2R_f/R_G)(v_2-v_1)\). Both inputs are op-amp + pins, so both \(R_{in}\) are huge and balanced. Gain is set by one resistor \(R_G\). The first stage amplifies the difference; the last stage rejects the common voltage.

</details>

**33.** Comparator vs Schmitt. Inverting Schmitt with \(R_1\) to ground, \(R_2\) to the output, \(\pm V_{sat}=\pm 10\,\mathrm{V}\), \(R_1=10\,\mathrm{k}\Omega\), \(R_2=40\,\mathrm{k}\Omega\).

<details><summary>Answer</summary>

Comparator: no negative feedback, one threshold, output \(\pm V_{sat}\), noise chatters. Schmitt: positive feedback, two thresholds. \(\beta=R_1/(R_1+R_2)=0.2\). \(V_{UT}=+2\,\mathrm{V}\), \(V_{LT}=-2\,\mathrm{V}\), \(V_H=4\,\mathrm{V}\). Between them the output stays where it was.

</details>

**34.** Same inverting Schmitt, \(R_1=R_2\), \(\pm V_{sat}=\pm 12\,\mathrm{V}\).

<details><summary>Answer</summary>

\(\beta=1/2\). \(V_{UT}=+6\,\mathrm{V}\), \(V_{LT}=-6\,\mathrm{V}\), \(V_H=12\,\mathrm{V}\).

</details>

## DCHD

**35.** DeMorgan, and what a bubble on a gate input means.

<details><summary>Answer</summary>

\((A+B)'=A'B'\), \((AB)'=A'+B'\). NAND is a bubbled-OR. NOR is a bubbled-AND. A bubble on an input complements that variable before the gate.

</details>

**36.** SOP, POS, canonical. Which map cells do you circle for each?

<details><summary>Answer</summary>

SOP: products of the 1s, OR them, circle 1s. POS: sums of the 0s, AND them, circle 0s. Canonical: every variable appears in every term.

</details>

**37.** K-map rules that lose marks if you skip them.

<details><summary>Answer</summary>

Gray order. Groups of \(2^k\) only. Wrap the edges. Overlap allowed. Every 1 is covered. A group of \(2^k\) removes \(k\) variables. A don’t-care is used only when it enlarges a group. A 0 never enters an SOP group.

</details>

**38.** \(F=\sum m(0,1,2,5,8,9,10)\). Minimum SOP?

<details><summary>Answer</summary>

\(F=B'D'+B'C'+A'C'D\). The pair \(A'C'D\) exists because \(m_5\) has no other group. All three terms are essential.

</details>

**39.** How do you build that SOP in NAND only?

<details><summary>Answer</summary>

NAND–NAND. Each product is a NAND, primed literals inverted on the way in. A second NAND combines those outputs and, by DeMorgan, does the OR. POS would be NOR–NOR. NAND and NOR are each universal.

</details>

**40.** Full adder: sum and carry, in words and in symbols. What does \(M=1\) do on an adder–subtractor?

<details><summary>Answer</summary>

Sum is 1 for an odd number of 1s: \(A\oplus B\oplus C_{in}\). Carry is 1 when at least two inputs are 1: \(AB+BC_{in}+AC_{in}\). \(M=1\) inverts \(B\) and sets \(C_0=1\), which adds the 2’s complement, so the block subtracts.

</details>

---

# If you blank

Draw the circuit before you hunt for a formula. For bias, write KVL from \(V_{CC}\) down to ground through the base-emitter loop. For an op-amp, mark \(v_+\) and \(v_-\) and the current that cannot enter the pin. For a K-map, write the Gray labels before you circle anything. Then say the catch sentence even if the number is still coming.
