# ECL204 MNI — MST formula sheet

Rewrite this from memory in the last 30 minutes. Static calibration: **one** input varies; everything else held constant. A calibration standard should be about **10×** more accurate than the instrument under test.

## Accuracy, precision, resolution, sensitivity

| Word | One-line |
|------|----------|
| **Accuracy** | How closely the reading approaches the **true** value. |
| **Precision** | Agreement of **repeated** readings (scatter about the mean). High P with poor A = consistent bias. |
| **Resolution** | Smallest **change in measurand** that produces a detectable output change. |
| **Threshold** | Smallest input **from zero** that produces the **first** detectable output. |
| **Sensitivity** | Slope \(K=\Delta q_\mathrm{out}/\Delta q_\mathrm{in}\). Linear \(\Rightarrow\) constant \(K\). Deflection factor \(=1/K\). |
| **Bias** | Constant offset over the whole range (zero error). Removable by calibration. |
| **Range** | \(I_\min\) to \(I_\max\) (or output limits). **Span** \(=I_\max-I_\min\). |
| **Hysteresis** | Up-scale and down-scale calibration curves do not coincide. \(\%=\Delta_\max/\mathrm{FSO}\times 100\). |
| **Linearity** | Max deviation from a stated straight line, as % of FS. |
| **Tolerance** | Maximum error the maker will allow (not itself a static characteristic). |
| **Drift** | Output wanders with **no** input change. Zero-drift (parallel shift) vs sensitivity-drift (slope change). |
| **Repeatability** | Same observer, same conditions, short time. **Reproducibility:** different times / conditions / instruments. |

Absolute error \(\delta A=A_m-A_\mathrm{true}\). Correction \(=-\delta A\).

\[
e_r=\frac{A_m-A_\mathrm{true}}{A_\mathrm{true}},\qquad
\%\,\mathrm{error}=100\,e_r,\qquad
\%\,\mathrm{of\,FS}=\frac{A_m-A_\mathrm{true}}{\mathrm{FS}}\times 100
\]

**FS statement is the exam trap.** \(\pm 1\%\) of \(150\,\mathrm{V}\) FS is \(\pm 1.5\,\mathrm{V}\) at every reading. At \(75\,\mathrm{V}\) that is \(\pm 2\%\) of reading; at \(37.5\,\mathrm{V}\) it is \(\pm 4\%\). Measure as close to FS as you can.

Relative accuracy \(=1-|e_r|\). Point accuracy is quoted at one point only (thermometers).

Resolution example: 200 V FS, 100 divisions, can read \(1/5\) div \(\Rightarrow 0.4\,\mathrm{V}\).

## Error types

- **Gross:** human — misread scale, wrong range, arithmetic, connecting a wattmeter the wrong way. Cannot treat statistically. Take more readings, different observers.
- **Systematic:** constant or law-like. **Instrumental** (construction, misuse, **loading**), **environmental** (\(T\), humidity, stray fields), **observational** (parallax). Reduce by calibration, shielding, digital display, planning the circuit.
- **Random:** leftover scatter after the above. Average many readings; use \(\sigma\) / Gaussian.

Unit-2 SAQ 1(e): five voltmeter readings around 100 V = **random**; thermometer always 180 when true is 200 = **systematic**; five students’ pressure readings clustered = **random**; experimenter writes 203 while the needle swings 220–230 = **gross**.

## Limiting (guarantee) error

Maker states \(A_a=A_s\pm\delta A\). Relative limiting error \(\epsilon_r=\delta A/A_s\).

For \(y=f(x_1,\ldots,x_n)\) the **worst-case** (limiting) combination is

\[
\frac{\delta y}{y}=\sum_i\left|n_i\right|\frac{\delta x_i}{x_i}
\quad\text{when}\quad y=k\,x_1^{n_1}x_2^{n_2}\cdots
\]

| Form | Relative limiting error |
|------|-------------------------|
| Sum / difference \(y=u\pm v\) | \(\dfrac{\|u\|}{\|y\|}\epsilon_u+\dfrac{\|v\|}{\|y\|}\epsilon_v\) (absolute errors **add**) |
| Product / quotient | \(\epsilon_u+\epsilon_v\) (worst-case signs) |
| Power \(y=u^n\) | \(\|n\|\epsilon_u\) |
| \(P=EI\) | \(\epsilon_E+\epsilon_I\) |
| \(P=I^2 R\) | \(2\epsilon_I+\epsilon_R\) |
| \(R=P/I^2\) | \(\epsilon_P+2\epsilon_I\) |
| Series \(R_s=\sum R_k\) | \(\sum (R_k/R_s)\epsilon_k\) — equal % on each \(\Rightarrow\) same % on \(R_s\) |
| Wheatstone \(R=(P/Q)S\) | \(\epsilon_P+\epsilon_Q+\epsilon_S\) (0.2% boxes \(\Rightarrow\) 0.6% on \(R\)) |

RSS / Kline–McClintock (same odds on each \(W_i\)) is milder than worst-case:

\[
W_R=\sqrt{\sum_i\left(\frac{\partial R}{\partial x_i}W_i\right)^2}
\]

## Stats (random only — strip systematic first)

\[
\bar x=\frac1n\sum x_i,\quad
d_i=x_i-\bar x,\quad
\sum d_i=0
\]

\[
\sigma=\sqrt{\frac1n\sum d_i^2}\ \ (n\gtrsim 20),\qquad
s=\sqrt{\frac1{n-1}\sum d_i^2}\ \ (n<20)
\]

Variance \(=\sigma^2\). Average deviation \(=\frac1n\sum|d_i|\). Probable error \(\pm 0.6745\,\sigma\) (50% of Gaussian data inside).

Gaussian: \(\approx 68\%\) in \(\bar x\pm\sigma\), \(95\%\) in \(\pm 2\sigma\), \(99\%\) in \(\pm 3\sigma\).

**Straight-line least squares** \(y=ax+b\):

\[
a=\frac{n\sum xy-(\sum x)(\sum y)}{n\sum x^2-(\sum x)^2},\qquad
b=\frac{(\sum y)(\sum x^2)-(\sum xy)(\sum x)}{n\sum x^2-(\sum x)^2}
\]

Exponential \(y=ae^{bx}\): fit \(\ln y=\ln a+bx\). Power \(y=ax^b\): \(\ln y=\ln a+b\ln x\).

## Dynamic characteristics

Zero-order (ideal): \(q_o=K q_i\). Example: potentiometer if you ignore \(L,C\) and loading.

First-order: \(\tau\dot q_o+q_o=K q_i\), \(\displaystyle\frac{Q_o}{Q_i}=\frac{K}{\tau s+1}\). Thermocouple, mercury thermometer, \(RC\) low-pass. \(\tau=RC=MC_p/(hA)\).

| Input | \(q_o(t)\) (\(K=1\) unless they give \(K\)) | Error |
|-------|--------------------------------------------|-------|
| Step \(Q_s\) | \(Q_s(1-e^{-t/\tau})\) | \(Q_s e^{-t/\tau}\) (63.2% of final at \(t=\tau\); 5% remaining at \(t=3\tau\)) |
| Ramp \(mt\) | \(m(t-\tau+\tau e^{-t/\tau})\) | \(\to m\tau\) lag (steady); difference at finite \(t\): \(m\tau(1-e^{-t/\tau})\) |
| Sine \(A\sin\omega t\) | \(M A\sin(\omega t+\phi)\), \(M=1/\sqrt{1+(\omega\tau)^2}\), \(\phi=-\tan^{-1}(\omega\tau)\) | Amplitude error \(1-M\); need \(\omega\tau\ll 1\) |
| Impulse area \(A\) | \((KA/\tau)e^{-t/\tau}\) | — |

Second-order: \(\ddot q+2\zeta\omega_n\dot q+\omega_n^2 q=K\omega_n^2 q_i\).

\[
M=\frac{1}{\sqrt{(1-u^2)^2+(2\zeta u)^2}},\quad
\phi=-\tan^{-1}\frac{2\zeta u}{1-u^2},\quad u=\omega/\omega_n
\]

Underdamped step: \(M_p=e^{-\zeta\pi/\sqrt{1-\zeta^2}}\), \(t_p=\pi/\omega_d\), \(\omega_d=\omega_n\sqrt{1-\zeta^2}\), \(t_s\approx 4/(\zeta\omega_n)\) (2%). \(\zeta=0.7\) is the usual “flat \(M\)” choice. \(\zeta<1\) under, \(=1\) critical, \(>1\) over.

Fidelity = shape match (phase lag **not** counted). Bandwidth (meters): frequencies where dynamic sensitivity stays within **2%** of static \(K\). Speed of response: how fast a step settles.

## Wheatstone and Kelvin

Balance (null): \(P/Q=R/S\) i.e. \(R=(P/Q)S\). Independent of source \(E\). Range roughly \(1\,\Omega\)–\(100\,\mathrm{k}\Omega\). Close battery **before** galvanometer; reverse battery and average to kill thermals.

Unbalance (equal arms \(P=Q=R=S\)), small \(\Delta R\):

\[
E_\mathrm{Th}\approx\frac{E}{4}\frac{\Delta R}{R},\qquad
I_g=\frac{E\Delta R}{4R(R+R_g)}
\]

General open-circuit:

\[
E_o=E\left(\frac{R_1}{R_1+R_2}-\frac{R_4}{R_4+R_3}\right)
=\frac{(R_1 R_3-R_2 R_4)E}{(R_1+R_2)(R_3+R_4)}
\]

Strain-gauge, \(\delta=\Delta R/R\), equal arms:

| Bridge | \(E_o/E\) |
|--------|-----------|
| Quarter (one active) | \(\delta/4\) |
| Half (two adjacent, opposite \(\Delta R\)) | \(\delta/2\) |
| Full (four active) | \(\delta\) |

**Kelvin double bridge** (low \(R\), milliohms): a second ratio pair \(p,q\) and the yoke \(r\) between \(R_x\) and \(S\).

\[
R_x=\frac{P}{Q}S+\frac{qr}{p+q+r}\left(\frac{P}{Q}-\frac{p}{q}\right)
\]

(Label \(P,Q\) the main ratio, \(p,q\) the compensating ratio, \(r\) the yoke.) If \(P/Q=p/q\), the lead/yoke term **vanishes** and \(R_x=(P/Q)S\). That is why Kelvin exists: Wheatstone dies on contact and lead resistance below \(\sim 1\,\Omega\). Recite the matched-ratio sentence; derive the prefactor only if they ask.

3-op-amp IA (after the bridge):

\[
v_o=\frac{R_2}{R_1}\left(1+\frac{2R_f}{R_G}\right)(v_2-v_1)
\]

Golden rules: \(I_p=I_n=0\), \(V_p=V_n\). Follower \(V_o=V_{in}\). Inverting \(-R_F/R_1\). Non-inverting \(1+R_F/R_1\). One-op-amp diff amp (matched \(R_2/R_1\)): \(V_o=(R_2/R_1)(V_2-V_1)\).

## PMMC and meter extension

\(T_d=GI=NBA\cdot I\), \(T_c=k\theta\), \(\theta\propto I\). DC only. Eddy damping in the Al former.

\[
R_{sh}=\frac{R_m}{m-1},\quad m=\frac{I}{I_m};\qquad
R_{se}=(m-1)R_m,\quad m=\frac{V}{V_m}
\]

Ayrton: start from lowest range, \((R_1+\cdots)(I-I_m)=I_m R_m\). 2022 Q4: \(1\,\mathrm{mA}\), \(100\,\Omega\) → 10 mA / 100 mA / 1 A gives \(R_1=10\,\Omega\), \(R_2=1\,\Omega\), \(R_3=0.111\,\Omega\).

## Loading

Ideal instrument takes **no** energy. Voltmeter (shunt on the source):

\[
V_L=E_o\frac{R_m}{R_m+R_o}=E_o\frac{1}{1+R_o/R_m}
\]

Want \(R_m\gg R_o\). Sensitivity in \(\mathrm{k}\Omega/\mathrm{V}\) \(\times\) range \(=R_m\). Ammeter: \(R_m\ll R_\mathrm{loop}\).

Two equal resistors, source \(E\), voltmeter \(R_v\) across one: measured

\[
V=\frac{E\,(R\parallel R_v)}{R+(R\parallel R_v)}
\]

(Ex 2.14: \(E=200\,\mathrm{V}\), \(R=100\,\mathrm{k}\), reads \(90\,\mathrm{V}\) \(\Rightarrow R_v=450\,\mathrm{k}\Omega\).)

**Potentiometer / zero-order divider** (lecture p.5), tap fraction \(k\), load \(R_L\), pot \(R_p\):

\[
\frac{E_o}{E_i}=\frac{k}{1+(R_p/R_L)k(1-k)}
\]

% of \(E_i\): \(100\cdot k^2(1-k)/[k(1-k)+R_L/R_p]\) (peak near \(k=2/3\)).

% of ideal tap \(k E_i\): \(100\cdot k(1-k)/[k(1-k)+R_L/R_p]\) (peak at \(k=1/2\); max \(=100/(1+4 R_L/R_p)\)).

4–20 mA transmitter (Norton \(R_N\)) into indicator \(R_i\) plus cable \(R_c\):

\[
I_\mathrm{out}=I_N\frac{R_N}{R_N+R_i+R_c}
\]

If the indicator is a 1–5 V meter across \(R_i=250\,\Omega\), then \(4\,\mathrm{mA}\to 1\,\mathrm{V}\) and \(20\,\mathrm{mA}\to 5\,\mathrm{V}\) **only if** almost all Norton current reaches \(R_i\). **2022 MST:** \(R_N=10^4\,\Omega\), \(R_c+R_i=750\,\Omega\).

## Numbers that keep appearing

- \(t=\tau\Rightarrow 63.2\%\) of a step; \(t=3\tau\Rightarrow 5\%\) left; \(t=4\tau\Rightarrow 2\%\) left.
- Ramp: indicated trails true by \(m\tau\) after a few \(\tau\).
- 0–150 V, 1% FS, reading 75 V \(\Rightarrow\pm 2\%\); reading 37.5 V \(\Rightarrow\pm 4\%\).
- \(R=P I^{-2}\), \(\pm 1.5\%\) on \(P\) and \(\pm 1\%\) on \(I\) \(\Rightarrow\pm 3.5\%\) on \(R\).
- Equal Wheatstone, small \(\Delta R\): \(E_o=E\Delta R/(4R)\).
- Kelvin: match the two ratios or the yoke term is an error.
- 2022 Q3: \(R_N=10^4\,\Omega\), errors \(-3.49\,\mathrm{kPa}\) and \(-6.98\,\mathrm{kPa}\).
- Ayrton 2022: \(R_1=10\,\Omega\), \(R_2=1\,\Omega\), \(R_3=0.111\,\Omega\).
