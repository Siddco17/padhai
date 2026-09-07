# ECL204 MNI crash course — teach + work every MST-style problem

How to use: one block per sitting (10 h total: 0–6). **Read the named PDF 20–35 min first**, then this recap, then the drill with the solution covered. Files: `midsem-map.md`, `midsem-formulas.md`. PMMC / Ayrton and the three op-amp configs are **in scope**. Skip second-order unless you finish Block 2 early (Tutorial-1 Q4).

---

# Block 0 — static characteristics (1.0 h)

**Read first:** `resources/notes/Static_Characteristics_1.pdf`, `Static_Characteristics_2.pdf`; `Classification_of_Errors.pdf` or Unit-2 §2.2; `p45-4-5_Wheatstone.pdf` (error pages).

You do not need the whole sensor catalogue. You need four words the paper will mix on purpose, plus the calibration picture.

## 0.1 What a measurement is

A measurement is a comparison of an unknown against a defined, accepted standard, with a procedure that can be repeated. Static characteristics apply when the measurand is constant or changing slowly: **no** differential equation, just the input–output curve.

Calibration: vary **one** input; hold desired, interfering, and modifying inputs constant. The curve is valid only under those constants. The reference should be ~10× better than the unit under test. Take ascending **and** descending points (that is how hysteresis shows up).

## 0.2 Accuracy vs precision vs resolution vs sensitivity

- **Accuracy** — closeness of a reading to the **true** value. Can be quoted as % of true, % of FS (dangerous), or a table.
- **Precision** — how tightly repeats cluster. A biased voltmeter can be precise and inaccurate.
- **Resolution** — smallest **change** you can see. A speedo marked every 10 km/h has resolution 5 km/h if you interpolate halfway.
- **Threshold** — smallest input **starting from zero** that moves the output at all (needle stuck until 15 km/h).
- **Sensitivity** \(K=\Delta\mathrm{out}/\Delta\mathrm{in}\). For a linear device this is one number. Non-linear: quote the local slope.

The handwritten sheet (`Static Characteristics_1`) draws four dartboards: good A + good P, poor A + good P (tight but off-centre), medium, and scatter.

Also freeze:

| Word | Trap |
|------|------|
| Range vs span | Range is 5–25 V; span is 20 V |
| Bias | Constant offset; zero it |
| Hysteresis | Up ≠ down; % of FSO |
| Drift | Output walks with input **fixed**. Zero-drift vs sensitivity-drift |
| Live zero | 4–20 mA is not broken; 0 mA means the loop died |
| Tolerance | Maker’s allowed band, not a separate physics |

% of FS on a 500 °C thermometer, \(\pm 1\%\) FS, at a true 50 °C: the needle may sit anywhere in 45–55 °C. That is a 10% error of **reading**. Always convert FS guarantees to the actual reading.

### Worked: error vs correction (summary Ex 2.10)

Measured 6.7 A, true 6.5 A. Absolute error \(=+0.2\,\mathrm{A}\). Correction \(=-0.2\,\mathrm{A}\).

### Worked: sensitivity (summary Ex 2.5)

200 °C → 305.2 Ω, 225 °C → 310.2 Ω.

\[
K=\frac{310.2-305.2}{225-200}=0.2\,\Omega/^\circ\mathrm{C}
\]

### Worked: resolution (abs-rel Ex 3.13)

200 V FS, 100 divisions, can read \(1/5\) of a division \(\Rightarrow\) one div \(=2\,\mathrm{V}\), resolution \(=0.4\,\mathrm{V}\).

**You must be able to write the four definitions with the book closed.** That is Block 0 done.

---

# Block 1 — errors, stats, limiting error (1.5 h)

**Read first:** `Limiting_Errors_2-16.pdf`; `Limiting_Error_A.pdf`; Unit-2 §2.5.4 (least squares) and §2.5.6 (limiting combination).

## 1.1 Three buckets

**Gross** — you. Wrong scale, 1.01 written as 1.10, wattmeter coils swapped, voltmeter across a huge resistor (this last one is also loading; they still call the *misuse* gross). No formula. Take more readings.

**Systematic** — the apparatus or the method, same sign every time.

- Instrumental: weak spring, hysteresis, **loading**, zero not set.
- Environmental: temperature, humidity, stray \(B\) or \(E\). Shield, control the room.
- Observational: parallax. Mirror scale or a digital meter kills it.

**Random** — what is left. Average it; \(\sigma\) describes it. Do **not** apply Gaussian recipes until you have removed the obvious systematic piece.

Unit-2 SAQ 1(e) you-try (cover, then check):

1. Known 100 V source, readings 101, 100, 102, 100, 99 → **random**.
2. Fluid 200 °C, glass thermometer always 180 °C → **systematic**.
3. Five students’ pressure readings 1.48–1.51 → **random**.
4. Needle 220–230 V, experimenter writes 203 → **gross**.

## 1.2 Absolute, relative, accuracy

\(\delta A=A_m-A_\mathrm{true}\). Relative \(e_r=\delta A/A_\mathrm{true}\). Accuracy as a percent is \(100-|e_r|\) if they ask “% accuracy”.

### Worked: abs-rel Ex 3.5

Expected 80 V, measured 79 V. Absolute \(-1\,\mathrm{V}\). % error \(-1.25\%\). Relative accuracy \(0.9875\). % accuracy \(98.75\%\).

### Worked: Ex 3.1 / 3.2

\(R_m=10.25\,\Omega\), true \(10.22\,\Omega\) \(\Rightarrow\delta A=+0.03\,\Omega\). Wattmeter 25.34 W with absolute error \(-0.11\,\mathrm{W}\) \(\Rightarrow\) true \(=25.34-(-0.11)=25.45\,\mathrm{W}\).

## 1.3 Limiting error — the MST workhorse

The maker guarantees \(A_s\pm\delta A\), almost always **% of FS** for a meter and **% of marked value** for a resistor.

\[
\delta A=\epsilon_{r,\mathrm{FS}}\times(\mathrm{FS})
\]

That \(\delta A\) in volts (or amps) is **fixed**. Relative error at a small reading is \(\delta A/A_\mathrm{reading}\) and **grows**.

### Worked: class limiting-error sheet + `limiting errors-2-16.pdf`

0–150 V voltmeter, guarantee 1% of FS. Reads 75 V.

\[
\delta V=0.01\times 150=1.5\,\mathrm{V},\qquad
\epsilon_r=\frac{1.5}{75}=0.02=2\%
\]

At 37.5 V: \(1.5/37.5=4\%\). Comment: pick a range whose FS is close to the value.

### Worked: abs-rel Ex 3.9

0–10 A, 1.5% of FS, measures 2.5 A. \(\delta I=0.15\,\mathrm{A}\). Limits \(2.35\) to \(2.65\,\mathrm{A}\). % limiting error at this current \(=6\%\).

### Worked: Ex 3.10 (true-value vs FS)

1000 W wattmeter, \(\pm 1\%\) FS, true power 100 W. Reading band \(90\)–\(110\,\mathrm{W}\). If the same 1% were of **true** value, band would be \(99\)–\(101\,\mathrm{W}\).

## 1.4 Combining limiting errors

Log-differentiate and take the worst signs. Product/quotient: **add** relative errors. Sum: add **absolute** errors, then convert.

### Worked: \(R=P/I^2\) (`limiting errors-2-16.pdf`)

\(\delta P/P=\pm 1.5\%\), \(\delta I/I=\pm 1.0\%\).

\[
\frac{\delta R}{R}=\pm\left(\frac{\delta P}{P}+2\frac{\delta I}{I}\right)=\pm(1.5+2.0)=\pm 3.5\%
\]

### Worked: series resistors (Unit-2 SAQ 4(e) / class notes)

\(R_1=40\pm 5\%\), \(R_2=80\pm 5\%\), \(R_3=50\pm 5\%\). \(R_s=170\,\Omega\).

\[
\frac{\delta R_s}{R_s}=\frac{40}{170}5\%+\frac{80}{170}5\%+\frac{50}{170}5\%=5\%
\]

\(\delta R_s=8.5\,\Omega\). Equal percentage on every series part \(\Rightarrow\) same percentage on the sum.

Unequal % (class notes): \(R_1=60\,\Omega\pm 1\%\), \(R_2=40\,\Omega\pm 2\%\).

\[
\delta R_1=0.60\,\Omega,\ \delta R_2=0.80\,\Omega,\quad R=100\pm 1.40\,\Omega\ (=1.4\%)
\]

### Worked: \(P=I^2 R\) (abs-rel Ex 3.12)

\(R=100\pm 0.2\,\Omega\) (0.2%), \(I=2.00\pm 0.01\,\mathrm{A}\) (0.5%).

\[
\frac{\delta P}{P}=\pm(2\times 0.5\%+0.2\%)=\pm 1.2\%
\]

\(P=400\pm 4.8\,\mathrm{W}\).

### Worked: voltmeter + ammeter for power (class notes p.4)

Voltmeter reads 40 V on a 50 V range; ammeter 50 mA on a 125 mA range; both \(\pm 2\%\) of FS.

\[
\delta V=0.02\times 50=1\,\mathrm{V}\ (2.5\%\ \mathrm{of}\ 40),\qquad
\delta I=0.02\times 125=2.5\,\mathrm{mA}\ (5\%\ \mathrm{of}\ 50)
\]

\(P=VI=2\,\mathrm{W}\), \(\delta P/P=\pm(2.5+5)=\pm 7.5\%\).

### Worked: Wheatstone decade boxes (Ex 3.11)

Three arms guaranteed \(\pm 0.2\%\). \(R=(P/Q)S\) is a product/quotient of three \(\Rightarrow\pm 0.6\%\) worst case.

### Worked: composite power (Unit-2 SAQ 4(g))

\(P\propto a^3 b^2 c^{-1/2} d^{-1}\) with % errors 1, 3, 4, 2.

\[
\frac{\delta P}{P}=\pm(3\cdot 1+2\cdot 3+\tfrac12\cdot 4+1\cdot 2)=\pm 13\%
\]

RSS (Unit-2 Ex 2.1) is the **probable** combination, not the guarantee. Use RSS only if they say uncertainty / Kline–McClintock / same odds. Limiting error on the paper is the **sum of absolute contributions**.

## 1.5 Stats and least squares

Mean \(\bar x\). Deviations sum to zero. For \(n<20\) use \(s=\sqrt{\sum d_i^2/(n-1)}\). Gaussian: 68 / 95 / 99 % inside \(1/2/3\,\sigma\). Probable error \(0.6745\sigma\).

### Worked: Unit-2 Ex 2.2 (biased formulae as printed)

Lengths 5.30, 5.73, 6.77, 5.26, 4.33, 5.45, 6.09, 5.64, 5.81, 5.75 cm. \(n=10\), \(\sum=56.13\), \(\bar x=5.613\,\mathrm{cm}\).

With the book’s \(1/n\) (biased) \(\sigma\): \(\sigma=0.594\,\mathrm{cm}\), variance \(0.353\), mean \(|d|=0.422\,\mathrm{cm}\). If the paper says “sample,” divide by \(n-1\) instead.

### Worked: straight line (Unit-2 Ex 2.4)

\((x,y)=(1.0,1.2),\ (1.6,2.0),\ (3.4,2.4),\ (4.0,3.5),\ (5.2,3.5)\).

\(\sum x=15.2\), \(\sum y=12.6\), \(\sum x^2=58.16\), \(\sum xy=44.76\), \(n=5\).

\[
a=0.54,\quad b=0.879\qquad\Rightarrow\qquad y=0.54x+0.879
\]

### Worked: 2022 MST Q1 (exponential)

Fit \(y=ae^{bx}\) to \(x=1,2,3,4,5,6\) and \(y=1.7,\ 3.6,\ 7.6,\ 16.6,\ 34,\ 72\).

If the row is \(x=1,\ldots,6\) (six \(y\) values; the printed “2 / 4” on that scan is marks, not data): \(Y=\ln y = 0.531,\ 1.281,\ 2.028,\ 2.809,\ 3.526,\ 4.277\). \(\sum X=21\), \(\sum Y=14.452\), \(\sum X^2=91\), \(\sum XY=63.706\).

\[
b=\frac{6\cdot 63.706-21\cdot 14.452}{6\cdot 91-21^2}=\frac{78.74}{105}=0.750,\quad
\ln a=\bar Y-b\bar X=2.409-0.750\cdot 3.5=-0.216
\]

\(a=e^{-0.216}=0.806\). Box \(y=0.81\,e^{0.75x}\). Check: \(e^{0.75}\approx 2.12\), and the \(y\) column roughly doubles each step. If they indexed \(x=0\)–\(5\), then \(a=1.70\), \(b=0.75\). Recompute \(\ln y\) from **the table on the paper**.

## You-try checklist (Block 1)

1. Recite gross / systematic / random with one example each.
2. Convert a 1% FS voltmeter into % of reading at half scale.
3. Write \(\delta(P/I^2)\) and \(\delta(I^2 R)\) without looking.
4. Redo Ex 2.4’s \(a,b\) on paper.

---

# Block 2 — first-order dynamics (1.5 h)

**Read first:** `Step_and_Ramp_Response_First_Order.pdf`; `Tutorial_Appendix_1.pdf`; `Tutorial_1.pdf` Q1–Q3. Skip §2.4 (second-order) unless time is left.

## 2.1 Words, then the ODE

Dynamic error = true time-varying value minus indicated, **after** static error is taken as zero. Fidelity = same **shape** (phase lag is not counted). Bandwidth for a meter: \(M\) within 2% of static \(K\). Time constant of a first-order device: time to 63.2% of a step. Measuring lag: delay of the output.

General: \(a_n q_o^{(n)}+\cdots+a_0 q_o=b_0 q_i\). Drop all but \(a_0,b_0\) → **zero order**. Keep \(a_1,a_0,b_0\) → **first**. Keep \(a_2\) as well → **second**.

## 2.2 Zero order

\(q_o=K q_i\). Follows any input with no lag. Ideal pot: \(e=(R_1/R_p)E\). Real pot has \(L,C\) and **loading**; we still call it zero-order when those are negligible. Loading of a zero-order pot is Block 3.

## 2.3 First order — derive once

Heat balance: \(hA(T_f-T)=MC_p\dot T\Rightarrow \tau=MC_p/(hA)\). Electrical: \(\tau=RC\).

\[
\frac{Q_o}{Q_i}=\frac{K}{\tau s+1}
\]

**Step** \(Q_s\): \(q_o=KQ_s(1-e^{-t/\tau})\). Error \(KQ_s e^{-t/\tau}\). At \(t=\tau\), 63.2% of the way. 5% remaining \(\Rightarrow e^{-t/\tau}=0.05\Rightarrow t=3.00\tau\).

**Ramp** \(mt\): \(q_o=Km(t-\tau+\tau e^{-t/\tau})\). After a few \(\tau\), a steady lag \(m\tau\). Difference (true − indicated) at finite \(t\): \(Km\tau(1-e^{-t/\tau})\) if true \(=Kmt\).

**Sine:** \(M=1/\sqrt{1+(\omega\tau)^2}\), \(\phi=-\tan^{-1}(\omega\tau)\). Dynamic amplitude error \(=1-M\). Need \(\omega\tau\ll 1\).

**Impulse** area \(A\): \((KA/\tau)e^{-t/\tau}\).

### Worked: Tutorial-1 Q2 (handwritten; \(T(0)=0\) unless the sheet gives room temperature)

Sensor plunged into liquid at \(110^\circ\mathrm{C}\). After 5 s it shows \(56^\circ\mathrm{C}\). Find \(\tau\), then the error at 4 s.

\[
56=110(1-e^{-5/\tau})\implies e^{-5/\tau}=0.491\implies\tau=\frac{5}{-\ln 0.491}=7.03\,\mathrm{s}
\]

Reading at 4 s: \(110(1-e^{-4/7.03})=47.7^\circ\mathrm{C}\). Dynamic error \(=110e^{-4/7.03}=62.3^\circ\mathrm{C}\).

If they give \(T(0)=20^\circ\mathrm{C}\), replace 110 by 90 and 56 by 36: \(\tau=5/(-\ln 0.6)=9.79\,\mathrm{s}\).

### Worked: Tutorial-1 Q3

\(\tau=0.8\,\mathrm{s}\), sine at 6 Hz. \(\omega=2\pi\cdot 6=37.70\,\mathrm{rad/s}\), \(\omega\tau=30.16\).

\[
M=\frac{1}{\sqrt{1+30.16^2}}=0.0331,\qquad
\phi=-\tan^{-1}(30.16)=-88.1^\circ
\]

Amplitude is crushed to 3.3% of true (96.7% dynamic error). This instrument cannot measure 6 Hz.

### Worked: 2022 MST Q2 (thermometer ramp)

\(\tau=0.75\,\mathrm{min}\), already in equilibrium, then bath ramps.

(i) \(m=1^\circ\mathrm{C/min}\), difference at \(t=0.75\,\mathrm{min}\):

\[
\Delta=m\tau(1-e^{-t/\tau})=0.75(1-e^{-1})=0.474^\circ\mathrm{C}
\]

(ii) \(m=2^\circ\mathrm{C/min}\), \(t=3\,\mathrm{min}\):

\[
\Delta=2\cdot 0.75(1-e^{-3/0.75})=1.5(1-e^{-4})=1.473^\circ\mathrm{C}
\]

Steady lag would be \(m\tau=1.5^\circ\mathrm{C}\); at \(t=4\tau\) you are almost there.

### Worked: 2022 MST Q5 (air → water → air)

\(M=6\times 10^{-2}\,\mathrm{kg}\), \(A=10^{-3}\,\mathrm{m}^2\), \(c=0.4\,\mathrm{J\,kg^{-1}\,^\circ C^{-1}}\), \(h_\mathrm{air}=0.4\), \(h_\mathrm{water}=2.0\) (use the paper’s numbers).

\[
\tau=\frac{Mc}{hA},\qquad
\tau_w=\frac{0.024}{0.002}=12\,\mathrm{s},\qquad
\tau_a=\frac{0.024}{0.0004}=60\,\mathrm{s}
\]

\(t=0\): \(30^\circ\mathrm{C}\) air → boiling water (\(100^\circ\mathrm{C}\)).

At \(t=20\,\mathrm{s}\) still in water:

\[
T=100-70e^{-20/12}=86.8^\circ\mathrm{C},\qquad e_\mathrm{dyn}=100-86.8=13.2^\circ\mathrm{C}
\]

At \(t=60\,\mathrm{s}\): \(T=100-70e^{-5}=99.53^\circ\mathrm{C}\), then back to 30 °C air. At \(t=140\,\mathrm{s}\) (80 s in air):

\[
T=30+(99.53-30)e^{-80/60}=48.3^\circ\mathrm{C},\qquad e_\mathrm{dyn}=48.3-30=18.3^\circ\mathrm{C}
\]

### Worked: Doebelin Ex 3.17 (Tutorial appendix)

\(q_i=\sin 2t+0.3\sin 20t\), first-order \(\tau=0.2\,\mathrm{s}\). Superposition:

\[
M(2)=\frac{1}{\sqrt{1+(0.4)^2}}=0.928,\ \phi=-21.8^\circ;\qquad
M(20)=\frac{1}{\sqrt{1+16}}=0.243,\ \phi=-76^\circ
\]

\[
q_o/K=0.93\sin(2t-21.8^\circ)+0.073\sin(20t-76^\circ)
\]

The 20 rad/s piece is almost gone — you cannot “correct” it. With \(\tau=0.002\,\mathrm{s}\), both \(M\approx 1\) and both \(\phi\approx 0\). Rule: \(\omega\tau\ll 1\).

### Worked: Tutorial-1 Q1 (sheet is messy; this is the 5%-in-10 s form they always want)

Want the reading within 5% of final within 10 s after a step (oil bath / “stop the supply” story).

\[
e^{-10/\tau}=0.05\implies\tau_\max=\frac{10}{3.00}=3.33\,\mathrm{s}
\]

If they allow 2%: \(\tau_\max=10/3.91=2.56\,\mathrm{s}\). Write the exponential they gave, not a memorized 3.33.

## 2.4 Second order — skip this mid unless time is left

Not on this year’s focus list. Tutorial-1 Q4 (accelerometer, \(\zeta=0.7\), 8%, 150 Hz) only after Q1–Q3 are clean.

\[
\frac{Q_o}{Q_i}=\frac{K\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}
\]

Under / critical / over as \(\zeta<1\), \(=1\), \(>1\). Peak overshoot \(e^{-\zeta\pi/\sqrt{1-\zeta^2}}\). For sine, \(u=\omega/\omega_n\),

\[
M=\frac{1}{\sqrt{(1-u^2)^2+(2\zeta u)^2}}
\]

\(\zeta=0.7\) keeps \(M\) near 1 over the widest \(u\).

### Worked: Tutorial-1 Q4 (accelerometer)

Second-order, sine below 150 Hz, 8% dynamic error allowed, \(\zeta=0.7\). Demand \(M\ge 0.92\) at \(f=150\,\mathrm{Hz}\).

\[
(1-u^2)^2+(1.4u)^2=\frac{1}{0.92^2}=1.1815
\]

Let \(x=u^2\): \(1-2x+x^2+1.96x=1.1815\Rightarrow x^2-0.04x-0.1815=0\Rightarrow x=0.447\), \(u=0.668\).

\[
\omega_n\ge\frac{2\pi\cdot 150}{0.668}=1410\,\mathrm{rad/s}\qquad(f_n\ge 224\,\mathrm{Hz})
\]

If they use the small-\(u\) rule of thumb \(\omega/\omega_n\le 0.4\) at \(\zeta=0.7\), you get \(f_n\ge 375\,\mathrm{Hz}\). Write the \(M\) equation; then box whichever bound the marks scheme used.

## You-try checklist (Block 2)

1. Write \(K/(\tau s+1)\) and the four closed forms (step, ramp, impulse, sine).
2. Redo MST Q2 on a closed book.
3. Redo Tutorial Q2–Q3.
4. One sentence: “ramp lag \(\to m\tau(1-e^{-t/\tau})\); step leftover \(=e^{-t/\tau}\).”

---

# Block 3 — bridges and loading (1.5 h)

**Read first:** `Bridge_and_Loading_Effect.pdf` (all 5 pages); `Wheatstone_Bridge.pdf`.

## 3.1 Wheatstone at null

Two dividers, galvanometer between midpoints. Null \(\Rightarrow I_1 P=I_2 R\) and \(I_1 Q=I_2 S\Rightarrow R=(P/Q)S\). Independent of \(E\). That is the whole point of a null method.

Medium \(R\) only (\(\sim 1\,\Omega\) to \(100\,\mathrm{k}\Omega\)). High \(R\): leakage + loss of sensitivity (\(R_\mathrm{Th}\) huge). Low \(R\): leads and contacts — **Kelvin**.

Precautions from Sawhney (the `whetstone-Bridge.pdf` extract): shunt the galvo while hunting; battery key before galvo key (inductive kick); reverse the battery and average (thermals); do not cook the arms.

## 3.2 Small unbalance (Thevenin)

Equal arms \(P=Q=R=S\), one arm becomes \(R+\Delta R\):

\[
E_\mathrm{Th}\approx\frac{E\Delta R}{4R},\qquad I_g=\frac{E\Delta R}{4R(R+R_g)}
\]

Sensitivity is best at **unity ratio**. Ratio 100:1 kills sensitivity by about 25×.

General (lecture):

\[
E_o=E\left(\frac{R_1}{R_1+R_2}-\frac{R_4}{R_3+R_4}\right)
\]

## 3.3 Quarter / half / full (lecture pp.1–2)

One strain gauge in a bridge, \(\delta=\Delta R/R\), equal arms: **quarter** \(E_o=(E/4)\delta\). Two gauges in adjacent arms with opposite \(\Delta R\): **half**, \(E_o=(E/2)\delta\). Four active: **full**, \(E_o=E\delta\). Temperature cancellation is why we bother with half/full.

IA after the bridge is **Block 4**. Recite Q/H/F here; do not stop to derive the IA until that sitting.

## 3.4 Kelvin double bridge

Wheatstone’s floor is lead + contact resistance. Kelvin adds a second ratio pair \(p,q\) across the yoke \(r\) that joins \(R_x\) to the standard \(S\):

\[
R_x=\frac{P}{Q}S+\frac{q}{q+Q}\left(\frac{P}{Q}-\frac{p}{q}\right)r
\]

Match \(P/Q=p/q\) and the yoke term is identically zero (\(R_x=(P/Q)S\)). Recite that sentence; the full second-term prefactor is on the formula sheet if they ask to derive.

## 3.5 Loading

A meter **is** a load. Voltmeter across a source \(E_o,R_o\):

\[
V_L=E_o\frac{R_m}{R_m+R_o}
\]

Need \(R_m\gg R_o\). \(R_m=(\mathrm{k}\Omega/\mathrm{V})\times(\mathrm{range})\). Ammeter: opposite — tiny \(R_m\).

### Worked: summary Ex 2.12

\(R_m=25\,\mathrm{k}\Omega\), \(R_o=1\,\mathrm{k}\Omega\), \(E_o=12\,\mathrm{V}\).

\[
V_L=12\cdot\frac{25}{26}=11.538\,\mathrm{V},\qquad \mathrm{error}=-0.462\,\mathrm{V}= -3.85\%
\]

### Worked: Ex 2.13 (99% accuracy)

\(E_o=50\,\mathrm{V}\), \(R_o=100\,\mathrm{k}\Omega\), want \(V_L\ge 49.5\,\mathrm{V}\).

\[
49.5=\frac{50}{1+100\,\mathrm{k}/R_m}\implies R_m=9.9\,\mathrm{M}\Omega
\]

### Worked: Ex 2.14 (the 90 V mystery)

Two 100 kΩ in series on 200 V. True mid-point 100 V; meter reads 90 V. Let \(R_v\) be the meter.

\[
R_\mathrm{eq}=100\,\mathrm{k}\parallel R_v,\qquad
90=200\cdot\frac{R_\mathrm{eq}}{100\,\mathrm{k}+R_\mathrm{eq}}\implies R_v=450\,\mathrm{k}\Omega
\]

### Worked: Ex 2.16 (sensitivity saves you)

150 V across two 50 kΩ. True mid = 75 V.

- \(1\,\mathrm{k}\Omega/\mathrm{V}\) on 50 V range \(\Rightarrow R_v=50\,\mathrm{k}\). \(50\parallel 50=25\,\mathrm{k}\). Reading \(150\cdot 25/75=50\,\mathrm{V}\) (**−33%** of 75; they quoted −40% of the 150 V half — do the divider in front of you).
- \(20\,\mathrm{k}\Omega/\mathrm{V}\) \(\Rightarrow R_v=1\,\mathrm{M}\Omega\). \(50\parallel 1000=47.62\,\mathrm{k}\). Reading \(150\cdot 47.62/97.62=73.2\,\mathrm{V}\) (−2.4%).

Higher \(\mathrm{k}\Omega/\mathrm{V}\) \(\Rightarrow\) less loading.

### Worked: ammeter (Ex 2.18)

Thevenin 5 V, 1000 Ω into a 500 Ω load: true \(I=5/1000=5\,\mathrm{mA}\) wait — they take \(R_\mathrm{out}=1000\,\Omega\) already including the 500 Ω branch: true 5 mA. Ammeter 100 Ω in series: \(I=5/1100=4.545\,\mathrm{mA}\), error −9.09%.

### Worked: potentiometer loading (lecture p.5)

Tap fraction \(k\) (0 to 1), pot \(R_p\), load \(R_L\) across the lower segment. Unloaded: \(E_o/E_i=k\). Loaded:

\[
\frac{E_o}{E_i}=\frac{k}{1+(R_p/R_L)\,k(1-k)}
\]

Two different “% error” expressions — do not mix them.

- **As a fraction of \(E_i\)** (lecture numerator \(k^2(1-k)\)):

\[
\%_{E_i}=100\cdot\frac{k^2(1-k)}{k(1-k)+R_L/R_p}
\]

Zero at \(k=0\) and \(k=1\). Peak **near \(k=2/3\)**.

- **As a fraction of the ideal tap \(k E_i\)** (relative to the unloaded reading):

\[
\%_{kE_i}=100\cdot\frac{k(1-k)}{k(1-k)+R_L/R_p}
\]

Peak at \(k=1/2\): \(\%_\max=100/(1+4 R_L/R_p)\). If \(R_L=R_p\), that max is 20%. If \(R_L=10 R_p\), 2.4%. Buffer the wiper (voltage follower) if you cannot afford \(R_L\gg R_p\).

Write \(E_o/E_i\) first. Then state which denominator you are using for %.

### Worked: 2022 MST Q3 (4–20 mA transmitter)

Printed paper: 4–20 mA linear in **0–\(10^5\,\mathrm{Pa}\)**. Norton \(R_N=\mathbf{10^4}\,\Omega\) (not \(10^6\)). Cable 500 Ω + indicator 250 Ω. Indicator is 1–5 V for the same span, i.e. a voltmeter **across the 250 Ω**. Unloaded: \(4\,\mathrm{mA}\times 250=1\,\mathrm{V}\) and \(20\,\mathrm{mA}\times 250=5\,\mathrm{V}\).

\[
k=\frac{I}{I_N}=\frac{R_N}{R_N+750}=\frac{10^4}{10750}=0.93023
\]

True Norton current at pressure \(P\): \(I_N=4\,\mathrm{mA}+16\,\mathrm{mA}\cdot(P/10^5)\). Slope \(10^5\,\mathrm{Pa}/16\,\mathrm{mA}=6.25\times 10^6\,\mathrm{Pa/A}\). Loading current error \((1-k)I_N\).

| \(P\) | \(I_N\) | \(\Delta I=(1-k)I_N\) | error in Pa |
|-------|---------|------------------------|-------------|
| \(25\times 10^3\,\mathrm{Pa}\) | 8 mA | 0.558 mA | \(\mathbf{-3.49\times 10^3\,\mathrm{Pa}}\) |
| \(75\times 10^3\,\mathrm{Pa}\) | 16 mA | 1.116 mA | \(\mathbf{-6.98\times 10^3\,\mathrm{Pa}}\) |

(The indicator reads low. Box the two pascal figures and the current-divider line.)

## You-try checklist (Block 3)

1. Balance condition and the three \(E_o/E\) for \(\delta\).
2. Kelvin one-liner: matched ratios kill the yoke term.
3. Redo Ex 2.12 and Ex 2.14.
4. Write \(E_o/E_i\) for the loaded pot, then % of \(k E_i\) at \(k=0.5\).

---

# Block 4 — op-amp, differential amp, IA (1.5 h)

**Read first:** ACD `resources/20260810T192659Z_OPAMP (2).pdf`; `Bridge_and_Loading_Effect.pdf` pp. 3–4.

## 4.1 Golden rules (linear region)

1. \(I_p=I_n=0\) (infinite \(Z_\mathrm{in}\)).
2. \(V_p=V_n\) (virtual short). If the \(+\) pin is grounded, the \(-\) pin is **virtual ground**.

741 numbers they like as 1-markers: \(A_{OL}\sim 2\times 10^5\), \(Z_\mathrm{in}\sim 2\,\mathrm{M}\Omega\), \(Z_\mathrm{out}\sim 75\,\Omega\), CMRR \(\sim 90\,\mathrm{dB}\), slew \(0.5\,\mathrm{V/\mu s}\), BW \(\sim 1\,\mathrm{MHz}\). Pins: 2 inverting, 3 non-inverting, 6 output, 4 \(-V_{EE}\), 7 \(+V_{CC}\).

## 4.2 Three configs — derive from the rules, then box

**Voltage follower.** Output tied to \(-\). Then \(V_o=V_n=V_p=V_{in}\). Gain \(=1\). Huge \(Z_\mathrm{in}\), tiny \(Z_\mathrm{out}\). This is the buffer you put on a potentiometer wiper so Block 3 loading dies.

**Inverting.** \(+\) grounded \(\Rightarrow V_n=0\). Current \(V_{in}/R_1\) through \(R_F\):

\[
\frac{V_o}{V_{in}}=-\frac{R_F}{R_1}
\]

**Non-inverting.** \(V_n=V_{in}\). Divider on the \(-\) pin: \(V_{in}=V_o\cdot R_1/(R_1+R_F)\).

\[
\frac{V_o}{V_{in}}=1+\frac{R_F}{R_1}
\]

## 4.3 Differential amplifier (one op-amp)

Matched pair \(R_2/R_1\) on both inputs. With \(R_3=R_1\), \(R_4=R_2\):

\[
V_o=\frac{R_2}{R_1}(V_2-V_1)
\]

CMRR is only as good as the resistor match. This stage **loads** whatever produced \(V_1,V_2\) — that is why the IA exists.

## 4.4 Three-op-amp instrumentation amplifier

Notes: high CMRR, avoids loading, low power. Transducer output is mV / μV.

- Input op-amps are non-inverting buffers. Virtual short: the inner nodes sit at \(V_1\) and \(V_2\).
- Current through \(R_G\) is \((V_1-V_2)/R_G\). Same current through \(R_f{-}R_G{-}R_f\):

\[
V_{o1}-V_{o2}=\left(1+\frac{2R_f}{R_G}\right)(V_1-V_2)
\]

- Third op-amp is the differential stage above. Final:

\[
V_o=\frac{R_2}{R_1}\left(1+\frac{2R_f}{R_G}\right)(V_2-V_1)
\]

Gain is set by **one** resistor \(R_G\).

## You-try checklist (Block 4)

1. Derive all three single-op-amp gains with the book closed.
2. Write the IA formula and one sentence on why the first stage kills loading.
3. Follower after a pot: what happens to \(R_L\) in the Block 3 formula?

---

# Block 5 — PMMC and meter extension (1.5 h)

**Read first:** `resources/notes/PMMC.pdf`; `PMMC_Ohmmeter_Meter_Extension.pdf`.

## 5.1 PMMC — numbered

1. Current \(I\) in a coil sitting in a radial field of a permanent magnet (Alcomax / Alnico, soft-iron poles, cylindrical core).
2. Deflecting torque \(T_d=GI=NBA\cdot I\).
3. Hair springs: \(T_c=k\theta\) **and** the current path into the coil.
4. Equilibrium \(T_d=T_c\Rightarrow \theta\propto I\). Linear scale.
5. Aluminium former: eddy-current damping. No hunting.
6. **DC only.** On AC the inertia cannot follow reversals; mean torque is zero and the pointer stays at zero. Reverse DC and the needle tries to go below zero.

Mirror on the scale kills parallax (observational systematic error from Block 1).

## 5.2 Range extension

Ammeter: shunt \(R_{sh}\) across \(R_m\). \(m=I/I_m\).

\[
R_{sh}=\frac{R_m}{m-1}
\]

Voltmeter: series multiplier \(R_{se}\). \(m=V/V_m\).

\[
R_{se}=(m-1)R_m=\frac{V-V_m}{I_m}
\]

## 5.3 Ayrton (universal) shunt

One string \(R_1{-}R_2{-}R_3\). The switch moves how much of the string is shunt vs series with the meter, so the movement is **never open**. Always start from the **lowest** current range (entire string is the shunt):

\[
(R_1+R_2+R_3)(I-I_m)=I_m R_m
\]

Higher range: part of the string moves into the meter branch; equate voltages again.

### Worked: 2022 MST Q4(a)

Movement \(I_m=1\,\mathrm{mA}\), \(R_m=100\,\Omega\). Ranges 10 mA / 100 mA / 1 A.

Lowest range (10 mA), all of \(R\) as shunt, \(m=10\):

\[
R_1+R_2+R_3=\frac{R_m}{m-1}=\frac{100}{9}=11.111\,\Omega
\]

(Exact: \((I-I_m)R_\mathrm{tot}=I_m R_m\Rightarrow 0.009 R_\mathrm{tot}=0.1\), same.)

100 mA tap: \(R_1\) with the meter, \(R_2+R_3\) as shunt.

\[
(R_2+R_3)(0.1-0.001)=0.001(R_1+100),\quad R_2+R_3=11.111-R_1
\]

gives \(R_1=10.00\,\Omega\), \(R_2+R_3=1.111\,\Omega\).

1 A tap: \(R_3\) as shunt.

\[
R_3(1-0.001)=0.001(R_1+R_2+100)\implies R_3=0.111\,\Omega,\quad R_2=1.00\,\Omega
\]

Box: \(R_1=10\,\Omega\), \(R_2=1\,\Omega\), \(R_3=0.111\,\Omega\).

### Worked: Q4(b) series ohmmeter (words)

Battery, current-limiting \(R_1\), meter with a small shunt \(R_2\), unknown \(R_x\) in **series**. Short at the terminals (\(R_x=0\)) is **full-scale** (zero ohms on the right of a typical scale). Open is **zero** deflection. Half-scale resistance \(R_h=R_1+(R_2\parallel R_m)\). The scale is non-linear.

## You-try checklist (Block 5)

1. Recite the six PMMC bullets including “DC only”.
2. Write \(R_{sh}\) and \(R_{se}\) from \(m\) without looking.
3. Rebuild the 10 mA / 100 mA / 1 A string from \(I_m,R_m\) on a blank sheet.

---

# Block 6 — exam rehearsal (1.5 h)

## 6.1 How to sit the paper

2022 first sessional (`MI_PYQs.pdf` p.3): **1 hour, 16 marks.** Sit it under 60 min, notes closed. Then mark against this sheet.

Attempt order: **Q2 (ramp) → Q3 (loading) → Q5 (two \(\tau\)s) → Q1 (regression) → Q4 (Ayrton)**.

## 6.2 2022 first sessional — attack sheet

| Q | Marks | What they want | Answer shape |
|---|-------|----------------|--------------|
| 1 | 4 | \(y=ae^{bx}\) | \(\ln y=\ln a+bx\); \(a\approx 0.81\), \(b\approx 0.75\) for \(x=1\ldots 6\) |
| 2 | 3 | Ramp lag, \(\tau=0.75\,\mathrm{min}\) | (i) \(0.474^\circ\mathrm{C}\) (ii) \(1.473^\circ\mathrm{C}\) |
| 3 | 3 | Norton loading of 4–20 mA loop | \(k=10^4/10750\); \(-3.49\times 10^3\,\mathrm{Pa}\) and \(-6.98\times 10^3\,\mathrm{Pa}\) |
| 4 | 3 | Ayrton + series ohmmeter | \(R_1=10\,\Omega\), \(R_2=1\,\Omega\), \(R_3=0.111\,\Omega\); series ohmmeter in words |
| 5 | 3 | \(\tau=Mc/(hA)\), 20 s and 140 s | \(13.2^\circ\mathrm{C}\) and \(18.3^\circ\mathrm{C}\) |

If time remains: Tutorial-1 Q5–Q6 (linear / exponential tables). Endsem Q2(a)(b) as a derivation-only pass (Q/H/F + zeroth-order loading). Do **not** open Wien / Maxwell / thermistor design.

## 6.3 Last 30 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet. If a box is missing, that box is your first revision target, not a new chapter.

