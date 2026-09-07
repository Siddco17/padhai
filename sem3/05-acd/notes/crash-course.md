# ECL308 ACD crash course — teach + work every MST-style problem

How to use: one block per sitting. Read the concept, cover the “you try” line, then uncover the solution. Files: `midsem-map.md`, `midsem-formulas.md`.

---

# Block 0 — circuit habits (1.5 h)

You do not need year-1 EDC again. You need five moves this paper uses on every page.

## 0.1 KVL and the BE loop

Walk around a loop: the signed voltage drops sum to zero.

On a BJT with the emitter at a resistor \(R_E\) down to \(-V_{EE}\) and the base at (about) ground:

\[
0 - V_{BE} - I_E R_E + V_{EE} = 0 \implies I_E=\frac{V_{EE}-V_{BE}}{R_E}
\]

If two matched emitters share one tail resistor, each sees the *same* \(V_{BE}\) and the tail current **splits in half**, so the \(2\) appears:

\[
I_E=\frac{V_{EE}-V_{BE}}{2R_E}
\]

That single formula is Unit I DC.

## 0.2 Voltage divider

\[
V_\mathrm{out}=\frac{R_\mathrm{bottom}}{R_\mathrm{top}+R_\mathrm{bottom}}V_\mathrm{in}
\]

This is \(V_+\) of every difference amplifier and every instrumentation second stage.

## 0.3 What \(A\), \(R_i\), \(R_o\) mean

- **Gain** \(A=v_o/v_i\) (or \(v_o/v_{id}\)). Dimensionless, can be negative (phase flip).
- **Input resistance** \(R_i=v_x/i_x\) looking into the input, other sources killed. High \(R_i\) ⇒ the previous stage is not loaded.
- **Output resistance** \(R_o\) looking back into the output, independent sources killed. Low \(R_o\) ⇒ the next stage is not loaded.

A voltage follower exists only to be \(A=1\), \(R_i\to\infty\), \(R_o\to 0\).

## 0.4 BJT as a current tool

- \(V_{BE}\approx 0.7\,\mathrm{V}\) (Si), on.
- \(I_C=\beta I_B\approx I_E\) when \(\beta\) is large. **Do not** grind hybrid-π unless a figure forces \(r_\pi\).
- Small-signal “resistance of the emitter”:

\[
r_e=\frac{V_T}{I_E}\qquad V_T=26\,\mathrm{mV}\ (25\,\mathrm{mV}\ \mathrm{if}\ \mathrm{they}\ \mathrm{say}\ \mathrm{so})
\]

Gain of a CE-like collector is always of the form \(R_C/r_e\) or \(R_C/(2r_e)\). That is the whole of Unit I AC.

## 0.5 Thevenin (30 seconds)

Any linear network at a port = \(V_{th}\) in series with \(R_{th}\). Op-amp internals: \(v_o=A(v_+-v_-)+\) small \(R_o\). You will use this once, for “finite \(A\)” problems.

## Worked: Assignment 1 page 1 (tail current)

**Given.** Matched pair, \(V_{CC}=+20\,\mathrm{V}\), \(V_{EE}=-10\,\mathrm{V}\), \(R_C=3\,\mathrm{k}\Omega\) each, \(R_B=5\,\mathrm{k}\Omega\) each to ground, \(R_E=2\,\mathrm{k}\Omega\) to \(-10\,\mathrm{V}\). \(\beta=100\).

1. Tail: \(I_T=(10-0.7)/2\,\mathrm{k}=4.65\,\mathrm{mA}\).
2. Split: \(I_{E1}=I_{E2}=2.325\,\mathrm{mA}\approx I_C\).
3. \(V_C=20-(2.325\,\mathrm{mA})(3\,\mathrm{k})=13.025\,\mathrm{V}\).
4. \(I_B=2.325\,\mathrm{mA}/100=23.25\,\mu\mathrm{A}\), \(V_B=-(23.25\,\mu\mathrm{A})(5\,\mathrm{k})=-116\,\mathrm{mV}\).

The base is *slightly* below ground, so the true \(V_E\) is about \(-0.82\,\mathrm{V}\) and \(I_T\) is a hair low. Exam answers use the \(0.7\,\mathrm{V}\) first shot.

**You must be able to write \(I_T=(|V_{EE}|-0.7)/R_E\) with the book closed.** That is Block 0 done.

---

# Block 1 — Unit I differential amplifier (3.5 h)

A differential amplifier amplifies **the difference** \(v_{id}=v_{in1}-v_{in2}\) and (ideally) rejects what is common to both. It is the input stage of every 741.

## 1.1 Name the four configs in two seconds

| Name | How many bases driven | Where is \(v_o\) |
|------|------------------------|------------------|
| **DIBO** | both | **between** the two collectors |
| **DIUBO** | both | **one** collector to ground |
| **SIBO** | one (other base AC-grounded) | between collectors |
| **SIUBO** | one | one collector to ground |

Balanced = both collectors at the same DC, so \(v_{C2}-v_{C1}\) has **zero DC**. Unbalanced = you look at one collector, so a large DC sits on the signal. That DC is why a **level shifter** follows DIUBO inside the 741.

## 1.2 DC — write it once, reuse it four times

Short both inputs to AC-ground. KVL down one base–emitter–tail:

\[
I_B R_{in}+V_{BE}+2I_E R_E=V_{EE}
\]

\(I_B=I_E/\beta\). If \(\beta\) is large, drop \(R_{in}/\beta\):

\[
I_E=I_C=\frac{V_{EE}-V_{BE}}{2R_E},\qquad V_{CE}=V_{CC}-I_C R_C+V_{BE}
\]

Same \(I_{CQ},V_{CEQ}\) for DIBO, DIUBO, SIBO, SIUBO.

### Worked: Analog Unit-II tutorial 1 (operating point)

\(R_C=2.2\,\mathrm{k}\), \(R_E=4.7\,\mathrm{k}\), \(R_{in}=50\,\Omega\), \(V_{CC}=10\,\mathrm{V}\), \(V_{EE}=10\,\mathrm{V}\), \(\beta=100\), \(V_{BE}=0.715\,\mathrm{V}\).

\[
I_{CQ}=\frac{10-0.715}{50/100+2\times4.7\,\mathrm{k}}=\frac{9.285}{0.5+9400}=0.988\,\mathrm{mA}
\]

\[
V_{CEQ}=10-(0.988\,\mathrm{mA})(2.2\,\mathrm{k})+0.715=8.54\,\mathrm{V}
\]

Matches the key \((0.988\,\mathrm{mA},\ 8.54\,\mathrm{V})\).

## 1.3 AC — why balanced is twice unbalanced

Each transistor looks like a CE stage with gain \(R_C/r_e\), but the two emitters are tied.

- Drive **both** bases with a pure difference (\(v_{in1}=-v_{in2}=v_{id}/2\)). The tail node is a **virtual AC ground** (the two \(i_e\) cancel in \(R_E\)). Each device sees \(v_{id}/2\) across its \(r_e\), so \(i_c=v_{id}/(2r_e)\).
- Take \(v_o=v_{C2}-v_{C1}=2\times(R_C i_c)= (R_C/r_e)\,v_{id}\). **DIBO / SIBO: \(A_d=R_C/r_e\).**
- Take only one collector: you lose one of those two \(R_C i_c\) swings. **DIUBO / SIUBO: \(A_d=R_C/(2r_e)\).**

\(r_e=V_T/I_E\). \(R_i\) seen into one base (other grounded) \(\approx 2\beta r_e\). \(R_o=R_C\).

### Worked: Analog Unit-II tutorial 2 (same numbers)

\(I_E=0.988\,\mathrm{mA}\). This key uses \(V_T=25\,\mathrm{mV}\): \(r_e=25/0.988=25.3\,\Omega\).

\[
A_d=\frac{2.2\,\mathrm{k}}{25.3}=86.96,\qquad R_i=2\beta r_e=5.06\,\mathrm{k}\Omega,\qquad R_o=R_C=2.2\,\mathrm{k}
\]

If the paper is silent, \(26\,\mathrm{mV}\) is also accepted; state which \(V_T\) you used.

## 1.4 Current mirror

A diode-connected transistor (\(C\) shorted to \(B\)) sets \(I_\mathrm{ref}=(V_{CC}-V_{BE})/R\). An identical transistor with the same \(V_{BE}\) copies that current. Use it as the **tail** instead of \(R_E\):

- DC: \(I_T=I_\mathrm{ref}\) (set by one resistor).
- AC: the mirror looks like a huge resistor, so common-mode gain collapses and **CMRR jumps**.

2022 MST Q1 is this: find \(I_\mathrm{diode}\) (that is \(I_\mathrm{ref}\)) and \(A_d\) of the pair sitting on that tail.

## 1.5 Level shifter

After a DIUBO stage, \(V_C=V_{CC}-I_C R_C\) is several volts above ground. The next CE/diff stage would sit in the wrong Q-point. A level shifter (typically an emitter follower, sometimes with a zener / \(V_{BE}\) stack) **subtracts DC** so the signal is centered at 0 V. Inside the 741: DIBO → DIUBO → **level shift** → push-pull.

## 1.6 Cascade (starred on the syllabus)

Two stages in series: \(A_{v,\mathrm{tot}}=A_{v1}\times A_{v2}\) **after** you replace \(R_{C1}\) by \(R_{C1}\parallel R_{i2}\). Input resistance is the first stage’s \(R_i\). Output resistance is the last stage’s \(R_o\).

Darlington (2023 Q3): two NPNs, emitter of the first into base of the second. \(\beta_\mathrm{eq}\approx\beta_1\beta_2\), \(V_{BE,\mathrm{stack}}\approx 1.4\,\mathrm{V}\). Treat the pair as one super-transistor and do the same DC + \(r_e\) dance.

## Worked: Assignment 1 page 3 (SE vs differential)

\(V_{EE}=8\,\mathrm{V}\), \(R_T=10\,\mathrm{k}\), \(R_C=8\,\mathrm{k}\), extra \(r_E=30\,\Omega\).

\[
I_T=(8-0.7)/10\,\mathrm{k}=730\,\mu\mathrm{A},\quad I_E=365\,\mu\mathrm{A},\quad r_e'=26\,\mathrm{mV}/365\,\mu\mathrm{A}=71.2\,\Omega
\]

\[
A_{v,\mathrm{SE}}=\frac{8\,\mathrm{k}}{2(71.2+30)}=39.5,\qquad A_{v,\mathrm{diff}}=2\times 39.5=79
\]

## Worked: Assignment 1 page 4 (mirror-ish gain)

Diode-connected device locks \(V_{BE}\). \(I_C=2.5\,\mathrm{mA}\), \(r_e=25\,\mathrm{mV}/2.5\,\mathrm{mA}=10\,\Omega\), \(R_C=1.2\,\mathrm{k}\).

\[
A_v=-R_C/(R_E\parallel r_e)=-1200/10=-120
\]

## Worked: 2023 MST Q1

“BJT differential amplifier uses a \(300\,\mu\mathrm{A}\) bias current. \(r_e\) of each device? \(\beta=150\).”

Bias current = tail \(I_T=300\,\mu\mathrm{A}\) \(\Rightarrow\) each \(I_E=150\,\mu\mathrm{A}\).

\[
r_e=26\,\mathrm{mV}/150\,\mu\mathrm{A}=173\,\Omega
\]

(\(r_\pi=\beta r_e=26\,\mathrm{k}\Omega\) only if they ask for \(r_\pi\).)

## Worked: 2022 MST Q2 (dual-input balanced output)

\(R_E=4.7\,\mathrm{k}\), \(R_C=2.2\,\mathrm{k}\), \(R_{in}=50\,\Omega\), \(\beta=100\), \(V_{BE}=0.7\,\mathrm{V}\). \(v_1=30\,\mathrm{mV_{pp}}\), \(v_2=50\,\mathrm{mV_{pp}}\), same frequency.

First get \(I_E\) from DC (need \(V_{CC},V_{EE}\) off the figure — typically \(\pm 10\) or \(\pm 15\)). Then \(A_d=R_C/r_e\), \(v_o=A_d(v_1-v_2)\). Peak-to-peak without clipping: each collector can swing about \(2I_C R_C\) before hitting rail or cutoff, so \(v_{o,\mathrm{pp,max}}\approx 2I_C R_C\) (balanced).

Set B: \(\beta=50\), \(v_1=20\,\mathrm{mV_{pp}}\). Same method.

## Worked: 2022 MST Q3 (single-ended gains)

They give \(R_T,R_C,V_{CC},V_{EE}\) and ask

- single-ended in, **differential** out \(\approx R_C/r_e\)
- single-ended in, **single-ended** out \(\approx R_C/(2r_e)\)

Compute \(I_E\) from the tail, then \(r_e\), then those two numbers. That is SIBO vs SIUBO.

## You-try checklist (Block 1)

1. Recite the four names and the two gain formulas without looking.
2. Redo Unit-II tutorials 1–2 on paper.
3. Redo Assignment 1 pp.1, 3, 4.
4. Write one sentence: “DIUBO needs a level shifter because the chosen collector sits at a DC voltage \(V_{CC}-I_C R_C\).”

---

# Block 2 — Unit II: 741, feedback, numbers (3 h)

## 2.1 Golden rules

If and only if the op-amp is in **negative feedback** and not slammed into the rail:

1. \(I_+=I_-=0\) (no current into the input pins).
2. \(V_+=V_-\) (virtual short). If \(V_+\) is ground, \(V_-\) is **virtual ground**.

If there is **no** negative feedback (comparator), rule 2 is false: \(v_o=\pm V_{sat}\) according to the sign of \(v_+-v_-\). Mid-sem linear apps use rule 2. Do not import Schmitt habits.

## 2.2 Ideal vs 741

Ideal op-amp is a **VCVS**: \(R_i=\infty\), \(A=\infty\), \(R_o=0\) (GATE Q8, Q10).

Memorize the 741 row on the OPAMP sheet. Exam 1-markers: “typical SR?”, “typical UGB?”, “pin 2 is?”.

**Two frequency-dependent parameters besides the \(A(f)\) plot (2023 Q2): CMRR and PSRR.**

## 2.3 Closed-loop algebra

Non-inverting (voltage-series): feedback fraction \(\beta=R_1/(R_1+R_F)\).

\[
A_f=\frac{A}{1+A\beta}\ \xrightarrow{A\to\infty}\ 1+\frac{R_F}{R_1}
\]

Inverting: same loop gain, extra input divider. Ideal \(A_f=-R_F/R_1\). Finite \(A\):

\[
A_f=-\frac{R_F/R_1}{1+(1+R_F/R_1)/A}
\]

Feedback **raises** \(R_i\), **lowers** \(R_o\), **widens** bandwidth: multiply / divide by \(1+A\beta\). Gain–bandwidth trade: \(G\times f_{3\mathrm{dB}}=\mathrm{UGB}\).

### Worked: GATE Q2 (poor \(A=45\), \(R_1=2\,\mathrm{k}\), \(R_F=8\,\mathrm{k}\))

Ideal would be \(-4\). Finite \(A\): \(A_f=-4/(1+5/45)=-3.6\), nearest option **4**.

### Worked: 2022 Q8 / Set B

“Open-loop 100, want closed-loop \(-25\), larger resistor \(100\,\mathrm{k}\). Smaller resistor?”

Ideal shot (they often want this): \(R_F/R_1=25\Rightarrow R_1=4\,\mathrm{k}\Omega\).

Exact finite-\(A\) shot:

\[
25=\frac{G}{1+(1+G)/100}\implies G=33.67\implies R_1=100\,\mathrm{k}/33.67=2.97\,\mathrm{k}\Omega
\]

Write the finite-\(A\) formula, then box whichever the marks scheme used last year (ideal \(4\,\mathrm{k}\) is what most scripts have). Set B: \(A=200\), \(A_f=-20\) \(\Rightarrow\) ideal \(R_1=5\,\mathrm{k}\).

## 2.4 Compensated GBW — the recycled GATE question

A dominant-pole (“compensated”) op-amp:

\[
A(f)=\frac{A_0}{1+jf/f_c},\qquad |A(f)|\approx\frac{A_0 f_c}{f}=\frac{\mathrm{UGB}}{f}\quad(f\gg f_c)
\]

Then \(A_f=A/(1+A\beta)\).

### Worked: 2022 Q6 = GATE Q17

\(A_0=10^5\), \(f_c=8\,\mathrm{Hz}\), non-inverting \(R_1=1\,\mathrm{k}\), \(R_2=79\,\mathrm{k}\) \(\Rightarrow\beta=1/80\), \(G_\mathrm{ideal}=80\). Find \(A_f\) at \(15\,\mathrm{kHz}\).

\[
\mathrm{UGB}=10^5\times 8=800\,\mathrm{kHz},\qquad |A(15\,\mathrm{k})|=800\,\mathrm{k}/15\,\mathrm{k}=53.333
\]

\[
A_f=\frac{53.333}{1+53.333/80}=32
\]

Set B at \(30\,\mathrm{kHz}\): \(|A|=800/30=26.67\), \(A_f=26.67/(1+26.67/80)=20\).

### Worked: GATE Q41

741 UGB \(=1\,\mathrm{MHz}\), non-inv gain \(20\,\mathrm{dB}=10\) \(\Rightarrow f_{3\mathrm{dB}}=100\,\mathrm{kHz}\).

### Worked: 2023 Q2b-style (endsem twin)

Non-inv \(G=100\), \(f_{3\mathrm{dB}}=10\,\mathrm{kHz}\). Want \(20\,\mathrm{kHz}\) BW. Highest gain \(= \mathrm{UGB}/f = (100\times10\,\mathrm{k})/20\,\mathrm{k}=50\).

## 2.5 CMRR

\[
\mathrm{CMRR}=\frac{A_d}{A_{cm}},\qquad \mathrm{CMRR_{dB}}=A_{d,\mathrm{dB}}-A_{cm,\mathrm{dB}}
\]

GATE Q43: \(48\,\mathrm{dB}-2\,\mathrm{dB}=46\,\mathrm{dB}\).

For a resistor-mismatch difference amp, \(A_{cm}\neq 0\) even with an ideal op-amp. Equal ratios \(\Rightarrow\) CMRR \(\to\infty\).

## 2.6 Offset, bias, compensating \(R_C\)

Model \(V_{os}\) as a battery in series with one input. With the signal grounded, a non-inverting gain \(G\) gives \(V_o=G\,V_{os}\).

2023 Q6: \(G=200\), \(V_{os}=+2\,\mathrm{mV}\), input 0 \(\Rightarrow V_o=+400\,\mathrm{mV}\).

Open-loop (both inputs grounded, \(A=10^4\), \(V_{os}=5\,\mathrm{mV}\)): \(A V_{os}=50\,\mathrm{V}\) which **rails** to \(\pm 15\,\mathrm{V}\). GATE Q7 answer: \(+15\) or \(-15\,\mathrm{V}\).

Bias currents drop on the input resistors and look like extra offset. Cancel the *average* \(I_B\) by putting \(R_C=R_1\parallel R_F\) on the unused input. What remains is \(I_{os}\). GATE Q49: a lone \(v_o\) measurement with that topology cannot separate \(I_B\) from \(I_{os}\) — you get \(I_{os}\) only.

## 2.7 Slew rate

\[
\mathrm{SR}=\left.\frac{dv_o}{dt}\right|_{\max},\qquad t=\frac{\Delta V}{\mathrm{SR}},\qquad \mathrm{SR}\ge 2\pi f V_p
\]

### Worked: 2023 Q7

\(-10\to+10\,\mathrm{V}\), \(\mathrm{SR}=0.5\,\mathrm{V/\mu s}\) \(\Rightarrow t=20/0.5=40\,\mu\mathrm{s}\).

### Worked: GATE Q9

\(\mathrm{SR}=1\,\mathrm{V/\mu s}=10^6\,\mathrm{V/s}\), gain \(40\,\mathrm{dB}=100\), \(f=20\,\mathrm{kHz}\).

Max output peak \(= \mathrm{SR}/(2\pi f)=10^6/(2\pi\cdot 20\,\mathrm{k})=7.96\,\mathrm{V}\). Max **input** \(=7.96/100=79.6\,\mathrm{mV}\).

## Worked: 2022 Q7 (virtual short, 1 mark)

\(v_o=-2\,\mathrm{V}\), \(V_-=-3\,\mathrm{V}\), ideal \(\Rightarrow V_+=-3\,\mathrm{V}\). Set B: \(v_o=-4\), \(V_-=-6\Rightarrow V_+=-6\,\mathrm{V}\).

They are checking you do **not** write “virtual ground = 0.” Virtual short is \(V_+=V_-\), whatever that common value is.

---

# Block 3 — Unit III linear applications (3.5 h)

Derive each once from KCL + virtual short. Then freeze the boxed formula.

## 3.1 Inverting / non-inverting / follower

Inverting: \(V_-=0\), \(i=v_i/R_1=(0-v_o)/R_F\Rightarrow v_o/v_i=-R_F/R_1\). \(R_i=R_1\) (the virtual ground eats the rest).

Non-inverting: \(V_-=v_i\), divider \(v_i=v_o\cdot R_1/(R_1+R_F)\Rightarrow v_o/v_i=1+R_F/R_1\). \(R_i\to\infty\).

Follower: \(R_F=0,R_1=\infty\) (wire from out to −). \(v_o=v_i\). Use it as a buffer so a \(100\,\mathrm{k}\) source can drive a \(1\,\mathrm{k}\) load (`ACD_notes_24258.pdf` p.5).

GATE Q48: \(R_i\) of an inverting amp **looking in from \(v_i\)** is \(R_1=10\,\mathrm{k}\), not infinite.

GATE Q75: non-inv, \(v_+=1\,\mathrm{V}\), \(1\,\mathrm{k}\) and \(2\,\mathrm{k}\) \(\Rightarrow G=3\), \(v_o=3\,\mathrm{V}\) (rails \(\pm 12\), not saturated). The printed key range “11–12” is a different printing; **do the circuit in front of you.**

## 3.2 Summing (design — 2023 Q8)

Inverting summer: \(v_o=-R_F\sum v_k/R_k\).

**Design** \(v_o=V_1+3V_2-2V_3-6V_4\) with **one** op-amp.

- Put \(V_3,V_4\) on the inverting side. Choose \(R_F=R\). Then \(R_3=R/2\) (weight 2), \(R_4=R/6\) (weight 6).
- Parallel of the (−) resistors: \(R_{\parallel,-}=(R/2)\parallel(R/6)=R/8\).
- Non-inverting closed-loop multiplier: \(1+R_F/R_{\parallel,-}=9\).
- Need \(9\cdot V_+=V_1+3V_2\Rightarrow V_+=(1/9)V_1+(1/3)V_2\).

A 3-resistor network on (+): \(R_a\) to \(V_1\), \(R_b\) to \(V_2\), \(R_g\) to ground, with conductances in the ratio \(1:3:5\) (because \(1/9+3/9+5/9=1\)). Example: \(R_a=9R_0\), \(R_b=3R_0\), \(R_g=(9/5)R_0\). Draw it; label the ratios. That is a 10-mark answer.

## 3.3 Difference amplifier

From `ACD_notes_24258.pdf`: \(V_+\) is a divider on \(v_2\), \(V_-=V_+\) by virtual short, KCL at \(V_-\) gives the general formula. **Balance condition** \(R_F/R_1=R_3/R_2=\alpha\) collapses it to

\[
v_o=\alpha(v_2-v_1)
\]

If the ratios do **not** match, expand and collect \(v_1\) and \(v_2\) separately (GATE Q6, Q44, Q52, Q69).

### Worked: GATE Q44

Inv: \(2\,\mathrm{V}\) through \(1\,\mathrm{k}\), \(R_F=5\,\mathrm{k}\) \(\Rightarrow\) inv contribution \(-10\,\mathrm{V}\).
Non-inv: \(2\,\mathrm{V}\) through \(1\,\mathrm{k}\), \(8\,\mathrm{k}\) to ground \(\Rightarrow V_+=2\cdot 8/9=1.778\,\mathrm{V}\), then \(\times(1+5)=10.67\,\mathrm{V}\).
Sum \(v_o=-10+10.67=+0.67\,\mathrm{V}\) — **re-read the figure** before boxing; if the \(8\,\mathrm{k}\) is \(1\,\mathrm{k}\) the options jump to an integer. Method > memorized option.

### Worked: GATE Q52

Same \(1\,\mathrm{V}\) to both sides, \(1\,\mathrm{k}+1\,\mathrm{k}\) divider on (+), \(R_F=2\,\mathrm{k}\), inv \(R=1\,\mathrm{k}\).

\(V_+=0.5\,\mathrm{V}\), \(v_o=0.5(1+2)-2\cdot 1=-0.5\,\mathrm{V}\).

## 3.4 Instrumentation amplifier

Three op-amps. Front pair: \(V_{o2}-V_{o1}=(1+2R_f/R_G)(V_2-V_1)\). Back difference stage: \(\times R_2/R_1\).

\[
v_o=\frac{R_2}{R_1}\left(1+\frac{2R_f}{R_G}\right)(v_2-v_1)
\]

One resistor \(R_G\) sets the gain. Common-mode (the \(60\,\mathrm{Hz}\) on both lines in 2023 Q9) cancels; the small opposite \(1\,\mathrm{kHz}\) pieces add.

2023 Q9 recipe: draw the 3-op-amp IA, set \(R_1=R_1'=10\,\mathrm{k}\), pick \(R_2,R_f,R_G\) so the total gain on the \(1\,\mathrm{kHz}\) difference is 10. Clean choice: \(R_2=R_1=10\,\mathrm{k}\) and \(1+2R_f/R_G=10\Rightarrow R_G=2R_f/9\) (e.g. \(R_f=9\,\mathrm{k}\), \(R_G=2\,\mathrm{k}\)).

## 3.5 T-network

Need large \(|A_f|\) without a \(10\,\mathrm{M}\) resistor. Replace \(R_F\) by a T: \(R_a\) from (−) to mid, \(R_b\) mid to out, \(R_c\) mid to GND.

\[
R_{F,\mathrm{eq}}=R_a+R_b+\frac{R_a R_b}{R_c}
\]

### Worked: Kanodia Q5

\(R_1=100\,\mathrm{k}\), \(A_f=-10\), T is \(R\), \(100\,\mathrm{k}\), \(100\,\mathrm{k}\).

\[
2R+100\,\mathrm{k}=1\,\mathrm{M}\implies R=450\,\mathrm{k}\Omega
\]

GATE Q77 is the same idea: \(|A_f|=12\), \(R_1=10\,\mathrm{k}\), two \(10\,\mathrm{k}\) in the T, solve for the shunt \(R\).

## 3.6 Integrator / differentiator — waveforms, not Laplace essays

Ideal integrator: \(C\) in feedback, \(R\) in. \(v_o=-(1/RC)\int v_i\,dt\).

Ideal differentiator: \(C\) in, \(R\) in feedback. \(v_o=-RC\,dv_i/dt\).

| Drive | Integrator out | Differentiator out |
|-------|----------------|--------------------|
| DC | ramp \(\to\pm V_{sat}\) | 0 |
| square | triangle | spikes |
| triangle | parabola | square |
| sine \(\sin\omega t\) | \((1/\omega RC)\cos\omega t\) (sign −) | \(-\omega RC\cos\omega t\) |

GATE Q36: two capacitors in, one capacitor feedback, same \(C\) \(\Rightarrow\) still a summer of sines, \(v_o=-(v_1+v_2)\). GATE Q37: triangle into a differentiator \(\Rightarrow\) square.

Frequency response (syllabus): integrator gain falls at \(20\,\mathrm{dB/dec}\); differentiator rises at \(20\,\mathrm{dB/dec}\) until the op-amp UGB.

## 3.7 V–I, I–V, VCCS, CCCS

- **I–V:** current into virtual ground, \(v_o=-I_{in}R_F\). Photodiode problems are this (GATE Q12: \(I=0.8\,\mathrm{A/W}\times 10\,\mu\mathrm{W}=8\,\mu\mathrm{A}\); load current is *not* that \(8\,\mu\mathrm{A}\) unless they ask the feedback current).
- **V–I / VCCS:** Howland pump, matched ratios \(\Rightarrow i_L=v_s/R\) independent of \(R_L\) (GATE Q47).
- **CCCS:** current in, current out (current mirror is the discrete version; op-amp + BJT with emitter sense is the IC version, GATE Q78: \(I_o=\frac{\beta}{\beta+1}V_\mathrm{ref}/R\)).

---

# Block 4 — exam rehearsal

## 4.1 How to sit the paper

- 2022: **1 hour, 25 marks.** Unit I is ~10 marks. Do Q1–3 first, then Q6 (GBW, 4 marks, 4 minutes), then 1-mark virtual short, then design/algebra.
- 2023: **1.5 hours, 25 marks.** Same Unit I start, then slew / offset / summing design / IA.

Attempt order = high-mark things you can finish. Leave sketches if the clock dies; a labelled \(\pm V_{sat}\) square wave still scores.

## 4.2 2022 MST — attack sheet (Set A)

| Q | Marks | What they want | Answer shape |
|---|-------|----------------|--------------|
| 1 | 4 | Mirror tail + \(A_d\) | \(I_\mathrm{diode}=I_\mathrm{ref}\); \(A_d=R_C/r_e\) with \(I_E=I_T/2\) |
| 2 | 2 | DIBO \(v_o\) and clip limit | \(v_o=A_d(v_1-v_2)\); \(v_{o,\mathrm{pp,max}}\sim 2I_C R_C\) |
| 3 | 4 | SE-in / diff-out and SE-in / SE-out | \(R_C/r_e\) and \(R_C/(2r_e)\) |
| 4 | 3 | Sketch \(v_o\) for given \(v_{in}\) | Use golden rules or saturation; label times |
| 5 | 2 | Identify / compute \(v_o\) of a small op-amp | Golden rules |
| 6 | 4 | Compensated GBW at 15 kHz | **32** (see Block 2) |
| 7 | 1 | Virtual short | \(V_+=-3\,\mathrm{V}\) |
| 8 | 3 | Finite-\(A\) inverting resistors | \(4\,\mathrm{k}\) ideal / \(2.97\,\mathrm{k}\) exact |
| 9 | 2 | \(R_F/R_{IN}\) from two \((v_{IN},v_{OUT})\) points | \(v_o=-(R_F/R_{IN})v_{IN}+(1+R_F/R_{IN})V_\mathrm{ref}\); subtract the two rows |

Set B is the same paper with \(V_{EE}=-15\), \(\beta=50\), \(30\,\mathrm{kHz}\) (**\(A_f=20\)**), \(V_+=-6\,\mathrm{V}\), \(A=200\), \(A_f=-20\).

**Q9 algebra (Set A):** \(1=-(R_F/R_{IN})(0.1)+(1+R_F/R_{IN})V_\mathrm{ref}\) and \(6=-(R_F/R_{IN})(1)+(1+R_F/R_{IN})V_\mathrm{ref}\). Subtract: \(5=-(R_F/R_{IN})(0.9)\). That sign means the figure is *non-inverting in \(v_{IN}\)* or \(V_\mathrm{ref}\) is on the inv side — write both equations from **the figure**, then subtract. The method is the mark.

## 4.3 2023 MST — attack sheet

| Q | What | Number |
|---|------|--------|
| 1 | \(r_e\) of each device, \(I_T=300\,\mu\mathrm{A}\) | \(173\,\Omega\) |
| 2 | Two freq-dependent params ≠ freq-response curve | CMRR, PSRR |
| 3 | Cascade / Darlington DC + \(R_i\) + \(A_v\) | same Block 1 cascade |
| 4 | Gain of a drawn op-amp | golden rules |
| 5 | Virtual short | \(V_+=-3\,\mathrm{V}\) |
| 6 | \(G=200\), \(V_{os}=2\,\mathrm{mV}\) | \(400\,\mathrm{mV}\) (input 0) |
| 7 | Slew \(-10\to+10\), \(0.5\,\mathrm{V/\mu s}\) | \(40\,\mu\mathrm{s}\) |
| 8 | Design one op-amp for \(V_o=V_1+3V_2-2(V_3+3V_4)\) | Block 3.2 |
| 9 | IA, kill 60 Hz, gain 10 on 1 kHz, \(R_1=10\,\mathrm{k}\) | Block 3.4 |

## 4.4 GATE scan — do these, skip the rest

From `resources/ACD_GATE_opamp_practice_01Sep2026.pdf`. Answers you need:

| Q | Topic | Answer |
|---|--------|--------|
| 2 | Finite \(A\) inverting | (c) 4 |
| 7 | Open-loop + \(V_{os}\) | (c) rails \(\pm 15\,\mathrm{V}\) |
| 8 | Ideal params | (a) \(R_i=\infty,A=\infty,R_o=0\) |
| 9 | Slew + 20 kHz | (c) 79.5 mV |
| 10 | Ideal op-amp is | (b) VCVS |
| 17 | **= 2022 Q6** | **32** |
| 37 | Triangle → differentiator | (a) square |
| 39 | Finite \(A=100\), \(R_F/R_1=10\) | \(A_f=-1000/111\approx -9\) → (b) −9 |
| 41 | UGB 1 MHz, 20 dB | (b) 100 kHz |
| 43 | CMRR dB | (c) 46 dB |
| 48 | \(R_i\) of inverter | (b) 10 kΩ |
| 52 | Mixed summer | (c) −0.5 V |
| 75 | Non-inv \(G=3\), \(1\,\mathrm{V}\) | \(3\,\mathrm{V}\) (compute; ignore a stale key) |
| Kanodia 1 | Inv \(400/40\) | (A) −10 |
| Kanodia 5 | T-network | (B) 450 kΩ |

**Skip for MST:** Q13, 16, 18, 21–23, 25–27, 31–33, 42, 46, 50, 53–58, 60–62, 65–66, 70, 73–74, 76, 79 (Schmitt / filter / regulator / log / LED-count). Do them only if Block 4 still has time after both PYQs.

Kanodia ch.3.5 image: **Q1–30 only** (WhatsApp). Q1–5 are inv / non-inv / cascade / T-network — all on-syllabus.

## 4.5 Last 30 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet. If a box is missing, that box is your first revision target, not a new chapter.
