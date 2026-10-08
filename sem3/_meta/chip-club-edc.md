---
tags: [meta, interview, course/edc]
aliases: [chip club EDC, EDC viva]
---

# Chip club — EDC viva sheet

Speak these. Day 1 is sections 1–3. Day 2 is sections 4–7. Redraw every circuit on paper before you look again.

Constants unless they say otherwise: Si \(V_{BE}=V_D=0.7\,\mathrm{V}\), Ge \(0.3\,\mathrm{V}\), \(V_T=26\,\mathrm{mV}\), \(\eta=1\) for a quick \(r_d\). Large \(\beta\) means \(I_C\approx I_E\). State that approximation when you use it.

Linked habits: [[KVL and KCL]] · [[Thevenin and Norton]] · [[Voltage divider]]. Schedule: [[sem3/_meta/chip-club-interview|interview pack]].

---

# 1. PN junction diode

## Say this

A PN junction is p-type against n-type. Free electrons and holes recombine at the join, leaving a **depletion region** of uncovered ions. Those ions set up a **barrier voltage** that stops further diffusion. Forward bias lowers the barrier and a large current flows. Reverse bias widens the depletion region; only a tiny reverse saturation current flows, until breakdown.

## Formula to freeze

\[
I = I_S\left(e^{V/(\eta V_T)}-1\right)
\]

\(I_S\) is reverse saturation current. \(V_T=kT/q\approx 26\,\mathrm{mV}\) at room temperature. \(\eta\approx 1\) for Ge, \(\approx 2\) for Si at small currents (say 1 if they do not specify).

Forward, \(V\gg V_T\): \(I\approx I_S e^{V/(\eta V_T)}\). Reverse, \(V\) largely negative: \(I\approx -I_S\).

**Cut-in:** about \(0.7\,\mathrm{V}\) silicon, \(0.3\,\mathrm{V}\) germanium. Above that, treat the diode as a \(0.7\,\mathrm{V}\) drop plus a small resistance.

**AC (dynamic) resistance** at the Q-point:

\[
r_d = \frac{\eta V_T}{I_D}
\]

## Breakdown — the catch

- **Zener:** heavy doping, narrow depletion, tunneling. Sharp knee. This is the reference diode. Usual when \(V_Z\lesssim 5\,\mathrm{V}\).
- **Avalanche:** carriers knock more carriers loose. Softer, higher voltage. Usual when \(V_Z\gtrsim 7\,\mathrm{V}\).
- Around \(5\)–\(7\,\mathrm{V}\) both happen. In a regulator the name on the part is still “Zener,” and \(V_Z\) is what you use.

A Zener is run **reverse biased**, with a series resistor that sets \(I_Z\).

## Worked

\(I_D=10\,\mathrm{mA}\), \(\eta=1\), \(V_T=26\,\mathrm{mV}\).

\[
r_d=\frac{26\,\mathrm{mV}}{10\,\mathrm{mA}}=2.6\,\Omega
\]

That is why a conducting diode is drawn as a battery plus a few ohms, not as an open circuit.

### You try

A \(5.6\,\mathrm{V}\) Zener has \(r_z=10\,\Omega\). \(I_Z\) moves from \(5\,\mathrm{mA}\) to \(20\,\mathrm{mA}\). How much does the voltage move?

<details><summary>Solution</summary>

\(\Delta V = r_z\Delta I = 10\times 15\,\mathrm{mA}=0.15\,\mathrm{V}\). The knee is \(5.6\,\mathrm{V}\); at \(20\,\mathrm{mA}\) it sits near \(5.75\,\mathrm{V}\).

</details>

---

# 2. Five BJT biases

Same three questions every time: \(I_B\), \(I_C\), \(V_{CE}\). Active region means \(V_{CE}\) is well above \(V_{CE,\mathrm{sat}}\approx 0.2\,\mathrm{V}\). If your \(V_{CE}\) comes out near zero or negative, the transistor is saturated and \(I_C=\beta I_B\) is a lie — say so.

\(I_C=\beta I_B\), \(I_E=(\beta+1)I_B\).

## 2.1 Fixed bias

\(R_B\) from \(V_{CC}\) to the base. Emitter at ground. \(R_C\) in the collector.

```
VCC ---- RC ---- collector
 |
 +---- RB ---- base
                 emitter ---- GND
```

\[
I_B=\frac{V_{CC}-V_{BE}}{R_B},\qquad
I_C=\beta I_B,\qquad
V_{CE}=V_{CC}-I_C R_C
\]

**Catch:** \(\beta\) sits naked in \(I_C\). A new transistor with a different \(\beta\), or a hot one, moves the Q-point. Worst stability. \(S=1+\beta\).

### Worked

\(V_{CC}=12\,\mathrm{V}\), \(R_B=470\,\mathrm{k}\Omega\), \(R_C=2.2\,\mathrm{k}\Omega\), \(\beta=100\).

\[
I_B=\frac{11.3}{470\,\mathrm{k}}=24.0\,\mu\mathrm{A},\quad
I_C=2.40\,\mathrm{mA},\quad
V_{CE}=12-2.40\times 2.2=6.71\,\mathrm{V}
\]

Active. \(S=101\).

## 2.2 Collector feedback

\(R_B\) goes from **collector** to base, not from \(V_{CC}\). Emitter still grounded. The collector node feeds the base, so the current in \(R_C\) is \(I_C+I_B=I_E\).

```
VCC ---- RC ---- collector ---- RB ---- base
                                   emitter ---- GND
```

\[
I_B=\frac{V_{CC}-V_{BE}}{R_B+(\beta+1)R_C}
\]

\[
V_{CE}=V_{CC}-I_E R_C
\]

If the paper writes \(\beta\) instead of \(\beta+1\), they are dropping \(I_B\) inside \(R_C\). For \(\beta=100\) the two \(I_B\) values differ by about \(1\%\). Say which one you used.

**Why it is stabler than fixed:** \(I_C\) up \(\Rightarrow\) drop on \(R_C\) up \(\Rightarrow V_C\) down \(\Rightarrow I_B\) down. The collector is doing the correcting. You cannot make \(R_C\) huge just for stability, because \(R_C\) also sets the voltage swing.

### Worked

\(V_{CC}=12\,\mathrm{V}\), \(R_C=2.2\,\mathrm{k}\Omega\), \(R_B=220\,\mathrm{k}\Omega\), \(\beta=100\).

\[
I_B=\frac{11.3}{220\,\mathrm{k}+101\times 2.2\,\mathrm{k}}=\frac{11.3}{442.2\,\mathrm{k}}=25.6\,\mu\mathrm{A}
\]

\[
I_C=2.56\,\mathrm{mA},\quad I_E=2.58\,\mathrm{mA},\quad
V_{CE}=12-2.58\times 2.2=6.32\,\mathrm{V}
\]

With \(\beta\) in place of \(\beta+1\): \(I_B=25.7\,\mu\mathrm{A}\). Same story.

## 2.3 Emitter feedback

Fixed base feed ( \(R_B\) from \(V_{CC}\) ) **plus** \(R_E\) from emitter to ground.

```
VCC ---- RC ---- collector
 |
 +---- RB ---- base
                 emitter ---- RE ---- GND
```

\[
I_B=\frac{V_{CC}-V_{BE}}{R_B+(\beta+1)R_E}
\]

\[
V_{CE}=V_{CC}-I_C R_C-I_E R_E
\]

**Why \(R_E\) helps:** \(I_C\) up \(\Rightarrow V_E=I_E R_E\) up \(\Rightarrow V_{BE}\) down \(\Rightarrow I_B\) down. That is the sentence.

**Catch:** if \(R_B\gg R_E\), \(S\) stays near \(1+\beta\). The resistor only stabilizes when \(R_B/R_E\) is not huge. See the number below: \(S=83\) against a fixed-bias \(101\).

### Worked

\(V_{CC}=12\,\mathrm{V}\), \(R_C=2\,\mathrm{k}\Omega\), \(R_E=1\,\mathrm{k}\Omega\), \(R_B=470\,\mathrm{k}\Omega\), \(\beta=100\).

\[
I_B=\frac{11.3}{470\,\mathrm{k}+101\times 1\,\mathrm{k}}=19.8\,\mu\mathrm{A}
\]

\[
I_C=1.98\,\mathrm{mA},\quad I_E=2.00\,\mathrm{mA}
\]

\[
V_{CE}=12-1.98\times 2-2.00\times 1=6.04\,\mathrm{V}
\]

## 2.4 Emitter–collector feedback

Both: \(R_B\) from collector to base, **and** \(R_E\) to ground. Current in \(R_C\) is \(I_E\).

```
VCC ---- RC ---- collector ---- RB ---- base
                                   emitter ---- RE ---- GND
```

\[
I_B=\frac{V_{CC}-V_{BE}}{R_B+(\beta+1)(R_C+R_E)}
\]

\[
V_{CE}=V_{CC}-I_E(R_C+R_E)
\]

Two correcting paths. Usually stabler than either feedback alone. Still beaten by a stiff voltage divider, because the divider can make the base resistance small without giving up \(R_C\).

### Worked

\(V_{CC}=12\,\mathrm{V}\), \(R_C=2\,\mathrm{k}\Omega\), \(R_E=1\,\mathrm{k}\Omega\), \(R_B=200\,\mathrm{k}\Omega\), \(\beta=100\).

\[
I_B=\frac{11.3}{200\,\mathrm{k}+101\times 3\,\mathrm{k}}=\frac{11.3}{503\,\mathrm{k}}=22.5\,\mu\mathrm{A}
\]

\[
I_C=2.25\,\mathrm{mA},\quad V_{CE}=12-2.27\times 3=5.19\,\mathrm{V}
\]

## 2.5 Voltage divider — the one to draw fastest

\(R_1\) from \(V_{CC}\) to base, \(R_2\) from base to ground, \(R_E\) in the emitter, \(R_C\) in the collector.

```
VCC ---- RC ---- collector
 |
 +---- R1 ---- base ---- R2 ---- GND
                  emitter ---- RE ---- GND
```

Thevenize the base (open the base lead):

\[
V_{TH}=V_{CC}\frac{R_2}{R_1+R_2},\qquad R_{TH}=R_1\parallel R_2
\]

Then it is emitter feedback with supply \(V_{TH}\) and base resistor \(R_{TH}\):

\[
I_E=\frac{V_{TH}-V_{BE}}{R_E+R_{TH}/(\beta+1)},\qquad
I_C=\frac{\beta}{\beta+1}I_E,\qquad
I_B=\frac{I_E}{\beta+1}
\]

\[
V_{CE}=V_{CC}-I_C R_C-I_E R_E
\]

**Shortcut,** when \((\beta+1)R_E\gg R_{TH}\). Practical test: \(\beta R_E \ge 10\,R_{TH}\).

\[
I_C\approx I_E\approx\frac{V_{TH}-V_{BE}}{R_E}
\]

\(\beta\) drops out. That is the point of the circuit.

### Worked — shortcut, then exact

\(V_{CC}=10\,\mathrm{V}\), \(R_1=40\,\mathrm{k}\Omega\), \(R_2=10\,\mathrm{k}\Omega\), \(R_C=2\,\mathrm{k}\Omega\), \(R_E=1\,\mathrm{k}\Omega\), \(\beta=100\).

\[
V_{TH}=10\times\frac{10}{50}=2\,\mathrm{V},\qquad R_{TH}=40\parallel 10=8\,\mathrm{k}\Omega
\]

\(\beta R_E=100\,\mathrm{k}\Omega\), \(10 R_{TH}=80\,\mathrm{k}\Omega\), so \(100>80\). Shortcut is allowed.

\[
I_C\approx\frac{2-0.7}{1\,\mathrm{k}}=1.30\,\mathrm{mA}
\]

\[
V_{CE}\approx 10-1.30\times 2-1.30\times 1=6.1\,\mathrm{V}
\]

Exact:

\[
I_E=\frac{1.3}{1\,\mathrm{k}+8\,\mathrm{k}/101}=\frac{1.3}{1.079\,\mathrm{k}}=1.20\,\mathrm{mA}
\]

\[
I_C=1.19\,\mathrm{mA},\quad V_{CE}=6.41\,\mathrm{V}
\]

Shortcut is about \(8\%\) high on current. Fine for a viva if you say “approximate, \(\beta R_E>10 R_{TH}\).” If they forbid it, write the exact line.

### You try

Same circuit, \(\beta=50\) instead of \(100\). Shortcut current? Exact \(I_E\)? Does the shortcut still pass the \(10\times\) test?

<details><summary>Solution</summary>

Shortcut is still \(1.30\,\mathrm{mA}\) — \(\beta\) is not in it. \(\beta R_E=50\,\mathrm{k}\Omega\), \(10 R_{TH}=80\,\mathrm{k}\Omega\), so the test **fails**. Exact: \(R_{TH}/(\beta+1)=8\,\mathrm{k}/51=157\,\Omega\), \(I_E=1.3/1.157\,\mathrm{k}=1.12\,\mathrm{mA}\). The shortcut is now \(16\%\) high. Say that, and use the exact formula.

</details>

---

# 3. Stability factor

## Say this

Three things drift with temperature: \(I_{CO}\) (roughly doubles every \(10^\circ\mathrm{C}\)), \(V_{BE}\) (about \(-2.5\,\mathrm{mV}/^\circ\mathrm{C}\)), and \(\beta\) (rises). Stability factors say how hard each one kicks \(I_C\).

\[
S=\frac{\partial I_C}{\partial I_{CO}},\qquad
S'=\frac{\partial I_C}{\partial V_{BE}},\qquad
S''=\frac{\partial I_C}{\partial \beta}
\]

Ideal \(S=1\): \(I_C\) moves only as much as \(I_{CO}\) itself. Fixed bias is \(S=1+\beta\), which for \(\beta=100\) is \(101\). That is the failure mode.

## Formula to freeze

Whenever an emitter resistor \(R_E\) is in the circuit and the base sees a resistance \(R_B\) (use \(R_{TH}\) for the divider):

\[
S=\frac{(1+\beta)\left(1+R_B/R_E\right)}{1+\beta+R_B/R_E}
\]

Smaller \(R_B/R_E\) \(\Rightarrow\) \(S\) closer to \(1\).

| Circuit | What to plug in | \(S\) |
|---------|-----------------|-------|
| Fixed | no \(R_E\) | \(1+\beta\) |
| Emitter feedback | \(R_B\) as drawn | formula above |
| Voltage divider | \(R_B=R_{TH}\) | formula above |
| Collector feedback | no \(R_E\); \(R_C\) does the job | \(\dfrac{(1+\beta)(R_B+R_C)}{R_B+(1+\beta)R_C}\) |
| Emitter–collector | both resistors in the \(I_E\) path | \(\dfrac{(1+\beta)(R_B+R_C+R_E)}{R_B+(1+\beta)(R_C+R_E)}\) |

\(S'\) and \(S''\) for the emitter-resistor case (fixed bias is the \(R_E=0\) limit, \(S'=-\beta/R_B\), \(S''=I_C/\beta\)):

\[
S'=\frac{-\beta}{R_B+(\beta+1)R_E}
\]

\[
S''=\frac{I_C}{\beta}\cdot\frac{1+R_B/R_E}{1+\beta+R_B/R_E}=\frac{I_C\,S}{\beta(1+\beta)}
\]

\(S'\) is negative: a rise in \(V_{BE}\) is not what temperature does. Temperature **drops** \(V_{BE}\), which tries to **raise** \(I_C\). \(|S'|\) is the size of that kick. Large \(R_E\) shrinks it.

## Ranking, with one set of numbers

Not a theorem — a typical part choice. \(\beta=100\), \(R_B=100\,\mathrm{k}\Omega\), \(R_C=R_E=1\,\mathrm{k}\Omega\), and for the divider \(R_{TH}=10\,\mathrm{k}\Omega\), \(R_E=1\,\mathrm{k}\Omega\).

| Worst → best | \(S\) |
|--------------|-------|
| Fixed | \(101\) |
| Collector feedback | \(50.8\) |
| Emitter feedback | \(50.8\) |
| Emitter–collector | \(34.1\) |
| Voltage divider | \(10.0\) |

Collector and emitter match here only because \(R_B/R_C=R_B/R_E\). In a real amp you often cannot raise \(R_C\) (it eats swing), and a divider lets you **choose** a small \(R_{TH}\). That is why the divider is the one you call most stable.

The worked divider in §2.5 has \(S=8.34\). The worked emitter-feedback circuit has \(S=83.3\), because \(R_B/R_E=470\). Quote both if they ask “does \(R_E\) always fix it?”

---

# 4. \(r_e\) model

DC set \(I_E\). AC gain is built from that current. This is the same \(r_e\) as [[sem3/05-acd/notes/midsem-formulas|the ACD sheet]].

\[
r_e=\frac{V_T}{I_E},\qquad g_m=\frac{I_C}{V_T}\approx\frac{1}{r_e},\qquad r_\pi=\beta r_e\approx\frac{\beta V_T}{I_C}
\]

The last two equalities need \(I_C\approx I_E\). If they say “hybrid-\(\pi\)”, answer \(g_m=I_C/V_T\) and \(r_\pi=\beta/g_m\), and say you are using the large-\(\beta\) link \(r_\pi\approx\beta r_e\).

**Capacitors at midband.** Coupling capacitors are shorts. A bypass capacitor across \(R_E\) is a short, so \(R_E\) vanishes from the AC circuit. Unbypassed \(R_E\) stays, and every \(r_e\) below becomes \(r_e+R_E\).

**Bias resistors.** The transistor’s own input resistance is \(\beta r_e\). The divider \(R_1\parallel R_2\) sits in parallel with that. Forgetting the parallel is the usual lost mark.

### Worked

\(I_E=1\,\mathrm{mA}\), \(V_T=26\,\mathrm{mV}\), \(R_C=2.6\,\mathrm{k}\Omega\), \(\beta=100\), \(R_E\) bypassed.

\[
r_e=26\,\Omega,\quad |A_v|=\frac{2.6\,\mathrm{k}}{26}=100,\quad R_i(\text{base})=\beta r_e=2.6\,\mathrm{k}\Omega
\]

Unbypassed \(R_E=260\,\Omega\): \(A_v=-2600/(26+260)=-9.1\), and \(R_i=\beta(r_e+R_E)=28.6\,\mathrm{k}\Omega\). Gain down, input resistance up. That trade is the whole point of leaving \(R_E\) unbypassed.

---

# 5. CE, CC, CB

Say the four columns without looking. Midband, \(R_E\) bypassed on CE, load is \(R_C\) only (no extra \(R_L\)).

| | CE | CC (emitter follower) | CB |
|--|----|-----------------------|----|
| \(A_v\) | \(-R_C/r_e\) | \(\approx 1\) (exactly \(R_E/(R_E+r_e)\)) | \(+R_C/r_e\) |
| Phase | \(180^\circ\) | \(0^\circ\) | \(0^\circ\) |
| \(R_i\) | \(\beta r_e\) | \(\beta(r_e+R_E)\) | \(r_e\) |
| \(R_o\) | \(R_C\) | \(\approx r_e\) | \(R_C\) |
| Job | voltage gain | buffer | high frequency, low \(R_i\) |

**CE** is the voltage amplifier. High gain, inverted, medium \(R_i\).

**CC** is not there for gain. \(A_v\) just under \(1\), \(R_i\) large, \(R_o\) near \(r_e\) so the next stage does not load it. If the source has a resistance \(R_s\), \(R_o\approx r_e+R_s/\beta\).

**CB** has the same \(|A_v|\) as CE and no inversion, but \(R_i=r_e\) is tens of ohms. It does not suffer the Miller multiplication in §6, so it holds gain further up in frequency. A cascode is a CE into a CB for that reason.

Unbypassed emitter on a CE: replace \(r_e\) by \(r_e+R_E\) in \(A_v\) and in \(R_i=\beta(r_e+R_E)\).

---

# 6. Frequency response and feedback

## 6.1 Three bands

- **Low:** coupling and bypass capacitors are still open-ish. Gain rises with frequency. The **emitter bypass** usually sets \(f_L\), because that capacitor works into \(r_e\), which is small, so its corner is high unless \(C_E\) is large.
- **Mid:** capacitors are ideal (coupling/bypass short, device capacitances open). The \(r_e\) gains above. Flat.
- **High:** \(C_\pi\) and \(C_\mu\) matter. Gain falls.

\[
f_T=\beta\, f_\beta
\]

\(f_\beta\) is where \(\beta\) has fallen \(3\,\mathrm{dB}\). \(f_T\) is where \(\beta\) has fallen to \(1\). Also \(f_T\approx g_m/(2\pi(C_\pi+C_\mu))\).

**Miller (why CE loses first):** the collector-base capacitance is multiplied by the gain.

\[
C_{in}\approx C_\pi+C_\mu(1+g_m R_C)
\]

CB and cascode keep the collector-base gain near zero, so \(C_\mu\) is not multiplied.

### Worked

\(I_C\approx I_E=1\,\mathrm{mA}\), \(r_e=26\,\Omega\), \(R_C=2.6\,\mathrm{k}\Omega\) so \(|A_v|=100\). \(C_\pi=10\,\mathrm{pF}\), \(C_\mu=2\,\mathrm{pF}\).

\[
C_{in}=10+2(1+100)=212\,\mathrm{pF}
\]

A \(2\,\mathrm{pF}\) device capacitor shows up as about \(200\,\mathrm{pF}\) at the input. That is Miller. Quote \(f_T=\beta f_\beta\) as well: \(\beta=100\), \(f_\beta=2\,\mathrm{MHz}\) \(\Rightarrow f_T=200\,\mathrm{MHz}\).

## 6.2 Feedback amplifier

\[
A_f=\frac{A}{1+A\beta}
\]

\(\beta\) here is the **feedback factor**, not the BJT current gain. If both are in the same answer, call this one \(\beta_f\).

\(1+A\beta\) is the loop gain plus one. It does four things, all by that factor:

- Gain falls (\(A\to A_f\)).
- Gain stops caring as much about \(A\) (desensitivity).
- Bandwidth rises.
- Distortion falls.

Negative feedback opposes the change that caused it. That is the linear amplifier. Positive feedback is the Schmitt trigger and the oscillator.

### Worked

\(A=1000\), \(\beta_f=0.1\), so \(A\beta_f=100\), \(A_f=1000/101=9.90\).

\(A\) then drops \(20\%\) to \(800\). \(A_f=800/81=9.88\). Open-loop gain moved by \(200\); closed-loop gain moved by \(0.03\).

## 6.3 Four topologies

Sampling is what you sense at the output. Mixing is how that sample enters the input.

- **Voltage sampling:** feedback network in parallel with the load (across the output).
- **Current sampling:** feedback taken from a resistor in series with the load.
- **Series mixing:** feedback in series with the source. \(R_i\) goes **up**.
- **Shunt mixing:** feedback on the same node as the source. \(R_i\) goes **down**.

| Name you should say | Also called | Sampling | Mixing | \(R_i\) | \(R_o\) |
|---------------------|-------------|----------|--------|---------|---------|
| Voltage amplifier | series–shunt | voltage | series | up | down |
| Current amplifier | shunt–series | current | shunt | down | up |
| Transconductance | series–series | current | series | up | up |
| Transresistance | shunt–shunt | voltage | shunt | down | down |

The voltage amplifier wants a high \(R_i\) (it does not load the previous stage) and a low \(R_o\) (the next stage does not load it). Series–shunt is that pair. The current amplifier is the opposite pair.

A non-inverting op-amp is voltage-series. An inverting op-amp is shunt–shunt: \(v_o/i_{in}=-R_F\). It still has a voltage gain \(-R_F/R_1\). If they ask “voltage or transresistance?”, give the topology name first, then the voltage gain.

---

# 7. MOSFET

## Say this

A MOSFET is voltage-controlled. Gate current is \(\approx 0\) (oxide). A BJT is current-controlled and exponential; a MOSFET in saturation is square-law. Chips use **enhancement** MOSFETs: off when \(V_{GS}=0\), on only after \(V_{GS}\) passes a threshold \(V_t\).

NMOS: n-channel, needs \(V_{GS}>V_t>0\). PMOS: p-channel, the complement, needs \(V_{SG}>|V_t|\), source usually at the higher supply.

## Regions (NMOS enhancement)

Let overdrive \(V_{OV}=V_{GS}-V_t\).

- **Cutoff:** \(V_{GS}<V_t\). \(I_D=0\).
- **Triode (ohmic):** \(V_{GS}>V_t\) and \(V_{DS}<V_{OV}\). Acts like a resistor.

\[
I_D=\mu C_{ox}\frac{W}{L}\left[(V_{GS}-V_t)V_{DS}-\frac{V_{DS}^2}{2}\right]
\]

- **Saturation:** \(V_{GS}>V_t\) and \(V_{DS}\ge V_{OV}\). This is the amplifier region. The drain end of the channel has pinched off. \(I_D\) is almost flat vs \(V_{DS}\).

\[
I_D=\frac12\mu C_{ox}\frac{W}{L}(V_{GS}-V_t)^2
\]

Channel-length modulation tilts that flat line: multiply by \((1+\lambda V_{DS})\). Then \(r_o=1/(\lambda I_D)\). Skip \(\lambda\) unless they say it.

Do not call MOSFET saturation “the fully on switch.” Fully on, as a switch, is **triode** (small \(V_{DS}\)). Saturation is where an analog MOSFET amp sits. BJT saturation is the opposite naming: a saturated BJT is the closed switch.

## Worked

\(\mu C_{ox}=200\,\mu\mathrm{A/V^2}\), \(W/L=10\), \(V_t=0.5\,\mathrm{V}\), \(V_{GS}=1.5\,\mathrm{V}\).

\(V_{OV}=1.0\,\mathrm{V}\). At \(V_{DS}=2\,\mathrm{V}>V_{OV}\), saturation:

\[
I_D=\frac12\times 200\,\mu\mathrm{A/V^2}\times 10\times 1^2=1.00\,\mathrm{mA}
\]

At \(V_{DS}=0.2\,\mathrm{V}<V_{OV}\), triode:

\[
I_D=200\,\mu\times 10\left[1\times 0.2-0.02\right]=0.36\,\mathrm{mA}
\]

## CMOS inverter — why this is a chip question

PMOS from \(V_{DD}\) to the output, NMOS from the output to ground. Gates tied, that node is the input.

- Input low: NMOS off, PMOS on (its source is high, so \(V_{SG}\) is large). Output pulled high. No DC path to ground.
- Input high: NMOS on, PMOS off. Output pulled low. Still no DC path.

Current flows only while the input is switching, to charge the next gate. A BJT logic gate burns current while it sits still. That is why a chip is CMOS.

One contrast line if they ask “BJT or MOS?”: BJT gives more \(g_m\) per milliamp of bias (exponential), so it is fast and low-noise for a given current. MOS scales, draws no gate current, and CMOS logic does not burn static power. Digital chips are MOS. A precision analog front-end still often uses BJTs.

---

# Blank-page checklist

1. Depletion, barrier, Shockley, \(r_d\), Zener vs avalanche.
2. Five circuits. For each: \(I_B\) formula and where \(V_{CE}\) is measured.
3. \(S\) formula and the ranking table. Why \(R_E\) corrects \(I_C\).
4. Divider: \(V_{TH}\), \(R_{TH}\), shortcut test, one exact current.
5. \(r_e\), then CE / CC / CB from memory.
6. Miller \(C_{in}\), \(A_f=A/(1+A\beta)\), four topology rows.
7. MOSFET cutoff / triode / saturation and the CMOS inverter.
