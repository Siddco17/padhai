# ECL308 ACD — MST formula sheet

Rewrite this from memory in the last 30 minutes. \(V_{BE}=0.7\,\mathrm{V}\), \(V_T=26\,\mathrm{mV}\) unless the paper says 25 mV. \(\beta\) large \(\Rightarrow I_C\approx I_E\), drop \(R_{in}/\beta\).

## Unit I — differential amplifier

**One DC analysis for all four configs** (inputs set to 0):

\[
I_E = I_C = \frac{V_{EE}-V_{BE}}{2R_E},\qquad
V_C = V_{CC}-I_C R_C,\qquad
V_{CE}=V_{CC}-I_C R_C+V_{BE}
\]

Exact if they give \(R_{in}\) and \(\beta\): \(I_E=(V_{EE}-V_{BE})/(R_{in}/\beta+2R_E)\).

Tail form (bases grounded through \(R_B\), single \(R_E\) to \(-V_{EE}\)):

\[
I_T=\frac{|V_{EE}|-V_{BE}}{R_E},\qquad I_{E1}=I_{E2}=I_T/2
\]

**AC emitter resistance:** \(r_e=V_T/I_E\). Also \(r_\pi=\beta r_e=\beta V_T/I_C\). **2023 Q1** asks \(r_\pi\): \(I_T=300\,\mu\mathrm{A}\), \(\beta=150\) \(\Rightarrow r_\pi=26\,\mathrm{k}\Omega\).

| Config | Inputs | \(v_o\) measured | \(A_d=v_o/v_{id}\) | \(R_i\) | \(R_o\) |
|--------|--------|------------------|----------------------|---------|---------|
| DIBO | both | \(v_{C2}-v_{C1}\) | \(R_C/r_e\) | \(2\beta r_e\) each side | \(R_C\) |
| DIUBO | both | one collector to GND | \(R_C/(2r_e)\) — **half DIBO** | same | \(R_C\) |
| SIBO | one | between collectors | \(R_C/r_e\) | \(\approx 2\beta r_e\) | \(R_C\) |
| SIUBO | one | one collector to GND | \(R_C/(2r_e)\) | same as SIBO | \(R_C\) |

\(v_{id}=v_{in1}-v_{in2}\). With emitter degeneration \(r_E\): replace \(r_e\) by \(r_e+r_E\).

Single-ended in/out (Assignment 1): \(A_{v,\mathrm{SE}}=R_C/[2(r_e+r_E)]\). Differential out is **twice** that.

**Cascade:** \(A_{v,\mathrm{tot}}=A_{v1}A_{v2}\cdots\) after loading (\(R_{i,\mathrm{next}}\parallel R_{o,\mathrm{prev}}\)). Darlington: \(\beta_\mathrm{eq}\approx\beta^2\), \(V_{BE,\mathrm{eq}}\approx 1.4\,\mathrm{V}\).

**Current mirror tail:** \(I_\mathrm{ref}=(V_{CC}-V_{BE})/R\), \(I_T\approx I_\mathrm{ref}\). High AC tail resistance \(\Rightarrow A_{cm}\downarrow\Rightarrow\) CMRR \(\uparrow\).

**Level shifter:** DIUBO collector sits at DC \(V_C\neq 0\). Shift that DC to 0 before the next stage (emitter follower / \(V_{BE}\) drop).

**CMRR of the pair:** \(\mathrm{CMRR}=A_d/A_{cm}\). Raising tail \(R_E\) (or using a mirror) raises CMRR; \(A_d\) barely changes.

## Unit II — 741 and feedback

**Golden rules (linear + negative feedback):** \(I_+=I_-=0\), \(V_+=V_-\).

**Equivalent source:** \(v_o=A(v_+-v_-)\). Ideal: \(A\to\infty\), \(R_i\to\infty\), \(R_o\to 0\), BW \(\to\infty\), CMRR \(\to\infty\), SR \(\to\infty\), \(V_{os}=I_B=I_{os}=0\).

**741 typical (memorize):** \(A_{OL}=2\times10^5\), \(Z_{in}=2\,\mathrm{M}\Omega\), \(Z_{out}=75\,\Omega\), \(I_{os}=20\,\mathrm{nA}\), \(V_{os}=1\,\mathrm{mV}\), \(BW=1\,\mathrm{MHz}\), CMRR \(=90\,\mathrm{dB}\), SR \(=0.5\,\mathrm{V/\mu s}\).

**Pins:** 1 null, 2 (−), 3 (+), 4 \(-\mathrm{V_{EE}}\), 5 null, 6 out, 7 \(+\mathrm{V_{CC}}\), 8 NC.

**Voltage-series (non-inverting):** \(\beta=R_1/(R_1+R_F)\), \(A_f=A/(1+A\beta)\to 1+R_F/R_1\).

\[
R_{if}=R_i(1+A\beta),\quad R_{of}=R_o/(1+A\beta),\quad f_{cl}=f_{ol}(1+A\beta)
\]

**Inverting:** \(A_f=-A\beta/(1+A\beta)\to -R_F/R_1\). Finite \(A\):

\[
\frac{v_o}{v_i}=-\frac{R_F/R_1}{1+(1+R_F/R_1)/A}=-\frac{A R_F}{R_1(1+A)+R_F}
\]

**UGB / compensated GBW:** \(\mathrm{UGB}=A_0 f_c\). At \(f\gg f_c\), \(|A(f)|=A_0 f_c/f\). Closed-loop

\[
A_f(f)=\frac{A(f)}{1+A(f)\beta}
\]

Non-inverting \(G=1+R_F/R_1\) \(\Rightarrow\) \(f_{3\mathrm{dB}}=\mathrm{UGB}/G\). **2022 Q6 / GATE Q17:** \(A_0=10^5\), \(f_c=8\,\mathrm{Hz}\), \(G=80\), \(f=15\,\mathrm{kHz}\) \(\Rightarrow A_f=32\). Same circuit at \(30\,\mathrm{kHz}\) \(\Rightarrow 20\).

**CMRR:** \(\mathrm{CMRR}=A_d/A_{cm}\), \(\mathrm{CMRR_{dB}}=20\log_{10}(A_d/A_{cm})=A_{d,\mathrm{dB}}-A_{cm,\mathrm{dB}}\).

\[
v_o=A_d v_d+A_{cm}v_c,\quad v_d=v_1-v_2,\quad v_c=(v_1+v_2)/2
\]

**Offset / bias:** \(I_B=(I_{B1}+I_{B2})/2\), \(I_{os}=|I_{B1}-I_{B2}|\). Output from \(V_{os}\): \(V_o=(1+R_F/R_1)V_{os}\) (non-inv, \(v_i=0\)). Compensating resistor at the unused input: \(R_C=R_1\parallel R_F\). **2023 Q6** also has a signal: \(G=200\), \(V_{os}=\pm 2\,\mathrm{mV}\), \(v_i=0.01\sin\omega t\) \(\Rightarrow v_o=2\sin\omega t\pm 0.4\,\mathrm{V}\).

**Slew:** \(t=\Delta V/\mathrm{SR}\). Sine without distortion: \(\mathrm{SR}\ge 2\pi f V_p\). 741: \(0.5\,\mathrm{V/\mu s}\). \(-10\to+10\,\mathrm{V}\) at \(0.5\,\mathrm{V/\mu s}\) \(\Rightarrow 40\,\mu\mathrm{s}\).

**Thermal drift:** \(\Delta I_B/\Delta T\), \(\Delta V_{os}/\Delta T\). Two frequency-dependent params *besides* the \(A(f)\) curve: **CMRR and PSRR**.

## Unit III — linear apps

| Circuit | \(v_o\) |
|---------|---------|
| Inverting | \(- (R_F/R_1)v_i\) |
| Non-inverting | \((1+R_F/R_1)v_i\) |
| Follower | \(v_o=v_i\) (\(\beta=1\), huge \(R_i\), tiny \(R_o\), max BW) |
| Inverting summer | \(-R_F(v_1/R_1+v_2/R_2+\cdots)\) |
| Difference (balanced \(R_F/R_1=R_3/R_2=\alpha\)) | \(\alpha(v_2-v_1)\) |
| IA | \(\displaystyle\frac{R_2}{R_1}\left(1+\frac{2R_f}{R_G}\right)(v_2-v_1)\) — tune \(R_G\) |
| I–V (transimpedance) | \(-I_{in}R_F\) |
| V–I (grounded load / Howland, matched ratios) | \(i_L=v_s/R\) independent of \(R_L\) |

**T-network** (two series \(R_a,R_b\) in feedback, \(R_c\) from midpoint to GND):

\[
R_{F,\mathrm{eq}}=R_a+R_b+\frac{R_a R_b}{R_c},\qquad A_f=-R_{F,\mathrm{eq}}/R_1
\]

Kanodia Q5: \(R_1=100\,\mathrm{k}\), \(R_a=R\), \(R_b=R_c=100\,\mathrm{k}\), \(A_f=-10\) \(\Rightarrow R=450\,\mathrm{k}\Omega\).

**Waveforms**

| Input | Integrator \(v_o\propto-\int v_i\,dt\) | Differentiator \(v_o\propto -dv_i/dt\) |
|-------|----------------------------------------|----------------------------------------|
| DC | ramp to \(\pm V_{sat}\) | 0 |
| square | triangle | spikes |
| triangle | parabola | square |
| sine | \(- \)cosine | \(- \)cosine-to-sine (90° lead) |

Practical integrator: \(R_F\) across \(C\) so DC gain is finite. Practical differentiator: small \(R\) in series with \(C\).

**Single-op-amp weighted sum** \(v_o=a_1v_1+\cdots-b_1u_1-\cdots\): put positive terms on (+), negative on (−). Inverting weights \(=R_F/R_k\). Non-inverting side is multiplied by \(1+R_F/R_{\parallel,-}\), so pre-scale the (+) divider.

## Numbers that keep appearing

- Virtual short 1-marker: \(V_+=V_-\) even if \(v_o=-2\,\mathrm{V}\) and \(V_-=-3\,\mathrm{V}\) \(\Rightarrow V_+=-3\,\mathrm{V}\).
- Ideal op-amp = **VCVS**.
- Closed-loop 20 dB \(\Rightarrow\) gain 10; UGB \(1\,\mathrm{MHz}\) \(\Rightarrow f_{3\mathrm{dB}}=100\,\mathrm{kHz}\).
- \(\mathrm{CMRR_{dB}}=48-2=46\,\mathrm{dB}\).
