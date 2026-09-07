# ECL211 SnS crash course — teach + work every MST-style problem

How to use: one block per sitting. Read the concept, cover the “you try” line, then uncover the solution. Files: `midsem-map.md`, `midsem-formulas.md`. You are weaker on EE than on math: Block 3 RC is the only circuit; treat it as “one DE + \(h=\dot s\).”

---

# Block 0 — three math habits (45 min)

The paper never asks you to “know circuits.” It asks you to not freeze on \(e^{j\theta}\) and geometric sums.

## 0.1 Euler

\[
e^{j\theta}=\cos\theta+j\sin\theta,\qquad
\cos\theta=\frac{e^{j\theta}+e^{-j\theta}}{2},\qquad
\sin\theta=\frac{e^{j\theta}-e^{-j\theta}}{2j}
\]

A CT complex exponential \(e^{j\Omega t}\) is a helix of radius 1; the real part is cosine, the imaginary part is sine. Period \(T=2\pi/\lvert\Omega\rvert\).

## 0.2 Finite geometric sum

\[
\sum_{k=0}^{n}a^k=\frac{1-a^{n+1}}{1-a}\quad(a\neq 1),\qquad
\sum_{k=0}^{\infty}a^k=\frac{1}{1-a}\quad(\lvert a\rvert<1)
\]

You will use this the instant a DT convolution hits \(a^k u[k]*u[k]\).

## 0.3 Energy is the square, then integrate

Normalized \(R=1\): instantaneous power is \(x^2\). Total energy is the area under \(x^2\). Average power is that energy divided by a window that \(\to\infty\).

### Worked: pulse vs step vs ramp (SEC A-1)

- \(x(t)=1\) on \((0,2)\), else \(0\): \(E=2\), \(P=0\) → **energy**.
- \(x(t)=u(t)\): \(E=\infty\), \(P=1/2\) (or \(1\) if they take a one-sided average — write the limit you used) → **power**.
- \(x(t)=t\): both limits \(\infty\) → **neither**.

**You must be able to classify those three with the book closed.** That is Block 0 done.

---

# Block 1 — signals (2 h)

## 1.1 Name the four pictures

Time continuous/discrete × amplitude continuous/discrete. Sampled-but-not-quantized is **DTCA** (still analog). Digital = discrete amplitude.

## 1.2 Transformations — never skip the algebra

For \(x(at-b)\): factor \(a(t-b/a)\). Scale by \(a\) first, then shift by \(b/a\). Negative \(a\) reverses.

### Worked: W24 Q1 (ECL211)

The paper draws a triangle \(x(t)\) of height 1, support \([-1,1]\), peak at the origin. Sketch

1. \(x(3t)\) — compress by 3. Support \([-1/3,1/3]\), peak still \(1\) at \(0\).
2. \(x(3t+2)=x\bigl(3(t+2/3)\bigr)\) — same compressed triangle, then **left** by \(2/3\). Peak at \(t=-2/3\). Support \([-1,-1/3]\).
3. \(x(-2t-1)\): solve \(\lvert -2t-1\rvert\le 1\Rightarrow t\in[-1,0]\). Peak where argument is \(0\): \(t=-1/2\).

Label every kink. Marks are for the picture, not a paragraph.

### Worked: 2020-style \(x(3-2t)\)

\(x(3-2t)=x\bigl(-2(t-3/2)\bigr)\): reverse, compress by 2, then **right** by \(3/2\). Map each breakpoint \(t_i\) of \(x\) by \(t=(3-t_i)/2\).

## 1.3 \(\delta\) and \(u\)

CT step is undefined at \(0\) (notes). DT step includes \(n=0\). Impulse has area 1. Sifting: the impulse must lie **strictly inside** the integral limits.

### Worked: 2023-style sifting

\(\displaystyle\int_a^b \delta(t-10)\,\mathrm{d}t\) equals \(1\) iff \(a<10<b\), else \(0\). Endpoints: say “impulse on the boundary, convention-dependent” and pick the notes’ “inside” rule.

\(\displaystyle\int_{-\infty}^{\infty}e^{-t}\delta(t-2)\,\mathrm{d}t=e^{-2}\).

## 1.4 Periodicity — the W24 money question

**CT:** \(\cos(\Omega t)\) always periodic, \(T=2\pi/\lvert\Omega\rvert\).

**DT:** \(N=2\pi m/\omega\) must be an integer for some integer \(m\ge 1\). Smallest such \(N\) is the fundamental period.

Two CT tones: \(T_1/T_2\) must be rational. Two DT tones: lcm of the two integer periods.

### Worked: W24 Q2

(a) \(\omega=2\): \(N=\pi m\) never integer → **nonperiodic**. Same trap as \(\cos n\).

(b) \(\omega=0.2\pi\): \(N=10m\) → fundamental **\(N=10\)**.

(c) \(\omega=6\pi/35\): \(N=(35/3)m\) → take \(m=3\), **\(N=35\)**.

### Worked: 2023 Q1 slice

- \(\cos^2(2\pi t)=(1+\cos 4\pi t)/2\) → period \(1/2\).
- \(\cos(0.2 n)\): \(2\pi/0.2=10\pi\) irrational → **not** periodic.
- \(x(t)=t\): not periodic.
- \(10\cos(5t)\cos(10t)\): product-to-sum, two eternal tones → **power**.
- \(t e^{-t}\) (or \(t e^{-t}u(t)\)): square integrable → **energy**.
- \(e^{t}u(t)\): **neither** even nor odd. Even part \(\frac12\bigl(e^{t}u(t)+e^{-t}u(-t)\bigr)\) (do not confuse with the two-sided decay \(e^{-\lvert t\rvert}\)).

### You-try checklist (Block 1)

1. Sketch \(x(2t-1)\) for the notes’ pulse-then-ramp (SEC A-1 pp.6–7).
2. Redo W24 Q2 with the book closed.
3. Is \(\sin(\pi t/4)+\sin(\pi t/6)\) periodic? If yes, \(T=\)?

---

# Block 2 — system properties (1 h)

Write **two expressions** every time: (1) new input through the system, (2) old output transformed. Equal for all \(t\) (or \(n\)) \(\Rightarrow\) pass.

## 2.1 Linearity = homogeneous + additive

### Worked: \(y=tx\) (notes)

Homogeneous: \(a x\mapsto t(ax)=a(tx)\) → yes. Additive: yes. So **linear**. TI: \(x(t-t_0)\mapsto t\,x(t-t_0)\) vs \(y(t-t_0)=(t-t_0)x(t-t_0)\) → **time-varying**. BIBO: \(x=u\) already unbounded out → **unstable**. Causal and memoryless: yes (now, only \(x(t)\)).

### Worked: \(y=2x+3\)

\(x_1+x_2\mapsto 2(x_1+x_2)+3\), but \(y_1+y_2=2x_1+2x_2+6\). **Not additive, not homogeneous, not linear.** (Affine / nonzero idle output.)

### Worked: \(y=\sin(x(t))\)

Not homogeneous, not additive. BIBO: \(\lvert y\rvert\le 1\) → stable. Memoryless, causal, TI.

## 2.2 Causality traps

\(y(t)=x(t+1)\) peeks at the future → noncausal. \(y(t)=x(-t)\): at \(t=-2\), output needs \(x(2)\) → noncausal. \(y(t)=\cos(t+1)x(t)\) **is** causal: \(\cos(t+1)\) is a known function of time, not \(x(t+1)\).

## 2.3 “Fails every box” (2022 / 2023 1-marker)

Need one system that is not homogeneous, not additive, not TI, not causal, not BIBO. Example:

\[
y(t)=t\bigl[x(t+1)\bigr]^2
\]

Square kills linearity; \(t\) kills TI and BIBO; \(t+1\) kills causality.

## 2.4 2023 Q2 (DT product + cosine)

\(y[n]=x[n]x[n-1]+\cos(3n)\).

- Linear? Product of two samples → **no**.
- TI? The \(\cos(3n)\) is **not** shifted when you shift \(x\) — wait: it does not depend on \(x\) at all, so a shifted \(x\) leaves that cosine sitting at the same \(n\). Meanwhile \(x[n]x[n-1]\) *does* shift. The extra cosine is a time-varying additive term → **not TI** (and not linear). If the paper’s cosine is \(\cos(3x[n])\), still not linear; check TI separately.
- Memoryless? Uses \(x[n-1]\) → **no**.
- Causal? Only present/past \(x\) → **yes**.
- BIBO? If \(x\) is bounded by \(B\), the product is bounded and cosine is bounded → **yes**.

Read the exact formula on the paper; the method is the mark.

### You-try (Block 2)

Fill H / A / TI / C / S for \(y[n]=x[n]^2\) (this is EEL202 W24 Q5, same skill as ECL211). Then for \(y(t)=\int_{-\infty}^{3t}x(\tau)\,\mathrm{d}\tau\) (EEL202 W23).

---

# Block 3 — LTI and convolution (2.5 h)

An LTI system is completely named by one signal: the impulse response \(h\). Any input is a pile of weighted, shifted impulses; the output is the same pile of weighted, shifted \(h\)’s. That pile is convolution.

## 3.1 Discrete: write \(x\) as deltas, then superpose

### Worked: W24 Q3

The system, fed \(\delta[n]\), produces

\[
h[n]=\begin{cases}
1,& n=0\\
1/2,& n=1\\
0,& \text{else}
\end{cases}
\]

(i.e. \(y[n]=x[n]+\frac12 x[n-1]\)). Input \(x[n]=2\delta[n]+4\delta[n-1]-2\delta[n-2]\). Then

\[
y=2h+4h[\cdot-1]-2h[\cdot-2].
\]

| \(n\) | \(2h[n]\) | \(4h[n-1]\) | \(-2h[n-2]\) | \(y[n]\) |
|-------|-----------|-------------|--------------|----------|
| \(<0\) | 0 | 0 | 0 | 0 |
| 0 | 2 | 0 | 0 | **2** |
| 1 | 1 | 4 | 0 | **5** |
| 2 | 0 | 2 | −2 | **0** |
| 3 | 0 | 0 | −1 | **−1** |
| \(\ge 4\) | 0 | 0 | 0 | 0 |

Do **not** open a 5×5 matrix. Three short sequences, slide, add.

### Worked: notes \(\{1,1,1\}*\{1,2,3\}\) (both starting at 0)

Flip \(h\), slide. Overlap sums: \(y[0]=1\), \(y[1]=1+2=3\), \(y[2]=1+2+3=6\), \(y[3]=2+3=5\), \(y[4]=3\), else \(0\). Length rule: length \(L_x+L_h-1=5\).

### Worked: \(x[n]=(1/2)^n u[n]\), \(h[n]=u[n]\) (SEC A-1)

For \(n<0\), no overlap, \(y=0\). For \(n\ge 0\):

\[
y[n]=\sum_{k=0}^{n}(1/2)^k=2\bigl(1-(1/2)^{n+1}\bigr)u[n].
\]

## 3.2 Continuous graphical — cases from kinks

Recipe (zot-hub Graphical Convolution + notes pp.31–34):

1. Draw \(x(\tau)\). Flip \(h(\tau)\) to \(h(-\tau)\), slide to \(h(t-\tau)\).
2. List the \(t\) values where a kink of the moving piece hits a kink of the fixed piece. Those cut the real line into **cases**.
3. In each case, integrate **only the overlap**.

### Worked: notes ramp \(*\) pulse

\(x(t)=t\) on \([0,2]\), \(h(t)=1\) on \([0,1]\). Moving pulse occupies \([t-1,t]\).

| Case | Overlap | \(y(t)\) |
|------|---------|----------|
| \(t<0\) | none | \(0\) |
| \(0\le t<1\) | \([0,t]\) | \(t^2/2\) |
| \(1\le t<2\) | \([t-1,t]\) | \((2t-1)/2\) |
| \(2\le t<3\) | \([t-1,2]\) | \((3+2t-t^2)/2\) |
| \(t>3\) | none | \(0\) |

Sketch \(y\): starts at 0, parabola, then a line, then a downward parabola, back to 0. Continuity at the joints is a 10-second check.

### Worked: 2022 Q4 style (pulse * pulse)

Two rects → triangle (or trapezoid if widths differ). Width adds. Peak = overlap area at full ride-over = (shorter height)×(shorter width) if heights are 1. The 2022 paper scales the rect by last-digit \(r\); the method does not change.

## 3.3 RC circuit — the only EE on this paper

Series \(R\) then \(C\) to ground; output is capacitor voltage; switch closes at \(t=0\); \(C\) initially uncharged. Unit-step drive:

\[
s(t)=(1-e^{-t/RC})u(t).
\]

Oppenheim / zot-hub P5.4: **impulse response is the derivative of the step response** (cascade with a differentiator, commute). Differentiate:

\[
h(t)=\frac{1}{RC}e^{-t/RC}u(t).
\]

(W24 also shows L’Hôpital on a nascent delta, and a Laplace one-liner \(H(s)=1/(1+RCs)\). Use the derivative. Do not start a Laplace chapter.)

### Worked: W24 Q4b — pulse of width 2 into that RC

\(x(\tau)=1\) on \((0,2)\), \(h(t-\tau)=(1/RC)e^{-(t-\tau)/RC}\) for \(\tau<t\).

- \(t<0\): overlap empty, \(y=0\).
- \(0\le t<2\): integrate \(\tau=0\to t\):

\[
y(t)=\int_0^t \frac{1}{RC}e^{-(t-\tau)/RC}\,\mathrm{d}\tau=1-e^{-t/RC}.
\]

Same as the step response, because on this interval the pulse still looks like a step.

- \(t\ge 2\): integrate \(\tau=0\to 2\):

\[
y(t)=(e^{2/RC}-1)e^{-t/RC}.
\]

Draw: rise toward 1 while the pulse is on; exponential dump after \(t=2\).

Same pattern: \(e^{-at}u(t)*u(t-t_0)\) is a delayed incomplete exponential (zot-hub graphical notes).

## 3.4 Properties you actually need from \(h\)

- Causal \(\Leftrightarrow\) \(h(t)=0\) for \(t<0\).
- BIBO \(\Leftrightarrow\) \(\int\lvert h\rvert<\infty\). \(e^{-2t}u(t)\) stable; \(u(t)\) not; \(e^{2t}u(t)\) not.
- Inverse of integrator = differentiator (zot-hub P5.1).
- \(h[n]=a^n u[n]\): causal; stable iff \(\lvert a\rvert<1\) (P5.2). \(\lvert a\rvert=1\) (accumulator) is the 2023 impulse-response question: \(h[n]=u[n]\).

### You-try (Block 3)

1. Recompute W24 Q3 by actually writing the three shifted \(h\) sequences on paper.
2. Convolve \(e^{-t}u(t)\) with \(u(t-3)\) (EEL202 W24 Q6 / W23 Q4a — same picture as W24 Q4b with \(RC=1\), pulse replaced by a late step).
3. Recite \(s(t)\) and \(h(t)\) of the RC with no notes.

---

# Block 4 — Fourier series + sit the paper (1.75 h)

## 4.1 Why FS shows up on a mid

SEC A-1: an LTI fed \(e^{j\Omega t}\) returns \(H(\Omega)e^{j\Omega t}\). A periodic input is a sum of those. So you need the coefficients \(a_k\).

Synthesis / analysis (period \(T\), \(\Omega_0=2\pi/T\)):

\[
x(t)=\sum_k a_k e^{jk\Omega_0 t},\qquad
a_k=\frac{1}{T}\int_{\langle T\rangle}x(t)e^{-jk\Omega_0 t}\,\mathrm{d}t.
\]

Orthogonality: \(\int_{\langle T\rangle}e^{j(k-l)\Omega_0 t}\,\mathrm{d}t\) is \(T\) if \(k=l\), else \(0\). That is the whole derivation (notes pp.41–42).

## 4.2 Line spectra you must sketch in 90 seconds

### Worked: \(\sin(\Omega_0 t)\) (notes)

\[
\sin(\Omega_0 t)=\frac{e^{j\Omega_0 t}-e^{-j\Omega_0 t}}{2j}
\Rightarrow a_1=-\frac{j}{2},\; a_{-1}=\frac{j}{2}.
\]

Magnitude: two sticks of height \(1/2\) at \(k=\pm 1\). Phase: \(-\pi/2\) at \(+1\), \(+\pi/2\) at \(-1\).

### Worked: W24 Q5 — periodic impulse, \(T=4\), even

One \(\delta(t)\) inside a period symmetric about 0. \(\Omega_0=\pi/2\).

\[
a_k=\frac{1}{4}\int_{-2}^{2}\delta(t)\,e^{-jk(\pi/2)t}\,\mathrm{d}t=\frac{1}{4}.
\]

Magnitude **constant** in \(k\); phase **0**. (Periodic \(\delta\)-train \(\leftrightarrow\) flat discrete spectrum.)

### Worked: W24 Q6 — synthesis from sticks

\(T=2\Rightarrow\Omega_0=\pi\). Given (in \(k\))

\[
a_k=-j\,\delta[k-2]+j\,\delta[k+2]+2\,\delta[k-3]+2\,\delta[k+3].
\]

Plug into synthesis:

\[
x(t)=-j e^{j2\pi t}+j e^{-j2\pi t}+2e^{j3\pi t}+2e^{-j3\pi t}
=2\sin(2\pi t)+4\cos(3\pi t).
\]

No integral. Euler, then box.

### Worked: rect pulse train (notes)

Height \(A\), width \(2T_1\), period \(T\): \(a_0=2AT_1/T\) (area over period). Other \(a_k\) are a sinc of \(k\). Sketch the envelope; zeros when \(k\Omega_0 T_1=m\pi\).

## 4.3 Dirichlet + properties (2-minute recitation)

Over one period: absolutely integrable; finitely many maxima/minima; finitely many finite discontinuities. Counterexamples \(1/t\) and \(\sin(1/t)\) on \((0,1]\).

Shift \(\leftrightarrow\) multiply \(a_k\) by \(e^{-jk\Omega_0 t_0}\). Differentiate \(\leftrightarrow\) multiply \(a_k\) by \(jk\Omega_0\). Real even \(\leftrightarrow\) real even \(a_k\). Parseval: average of \(\lvert x\rvert^2\) equals \(\sum\lvert a_k\rvert^2\).

DTFS is the same story with sums and \(\omega_0=2\pi/N\); \(a_k\) repeats every \(N\). \(\lvert f\rvert>1/2\) aliases (notes pp.52–53). Do **not** start an impulse-train sampling derivation.

## 4.4 How to sit W24 (ECL211, Oct 2024)

Likely ~25 marks / 90 min (same family as the EE mid). Attack order:

| Q | What | Shape of the answer |
|---|------|---------------------|
| 1 | Three sketches \(x(3t)\), \(x(3t+2)\), \(x(-2t-1)\) | Kinks labelled; height unchanged unless a gain is written |
| 2 | Three DT cosines | (a) nonperiodic; (b) \(N=10\); (c) \(N=35\) |
| 3 | DT LTI via \(h\) | Table of \(y[n]\) for \(n=0,1,2,3\) |
| 4a | RC step and impulse | \(s=(1-e^{-t/RC})u\), \(h=(1/RC)e^{-t/RC}u\) |
| 4b | Pulse \(*h\) | Three-piece \(y(t)\) + a sketch |
| 5 | \(a_k\) of periodic \(\delta\) | \(1/T=1/4\), flat \(\lvert a_k\rvert\), zero phase |
| 6 | Inverse FS | \(2\sin(2\pi t)+4\cos(3\pi t)\) |

Sept 2022 is 15 marks / 60 min: graphical convolution is 6 marks — start it before FS if that paper comes back. Sept 2023 is a property/sifting/DE paper: do Q1 and Q4 first (fast marks).

## 4.5 Last 30 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet. Missing box = first revision target, not a new chapter.
