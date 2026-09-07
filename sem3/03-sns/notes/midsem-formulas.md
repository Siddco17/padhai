# ECL211 SnS — MST formula sheet

Rewrite this from memory in the last 30 minutes. CT uses \(t,\Omega\); DT uses \(n,\omega\) (or \(\Omega\) on the W24 key — same thing). Do not mix \(\sum\) with \(\int\).

## Energy and power

\[
E=\int_{-\infty}^{\infty}\lvert x(t)\rvert^2\,\mathrm{d}t
=\sum_{n=-\infty}^{\infty}\lvert x[n]\rvert^2
\]

\[
P=\lim_{T\to\infty}\frac{1}{2T}\int_{-T}^{T}\lvert x(t)\rvert^2\,\mathrm{d}t
=\lim_{N\to\infty}\frac{1}{2N+1}\sum_{n=-N}^{N}\lvert x[n]\rvert^2
\]

| | \(E\) | \(P\) |
|--|-------|-------|
| Energy | finite, \(>0\) | \(0\) |
| Power | \(\infty\) | finite, \(>0\) |
| Neither | \(\infty\) | \(\infty\) (ramp \(x=t\)) |

Finite-support pulse \(\to\) energy. Eternal sinusoid / step / periodic \(\to\) power. \(x[n]=a^n u[n]\) with \(\lvert a\rvert<1\): \(E=1/(1-\lvert a\rvert^2)\), \(P=0\).

## Transformations — \(y(t)=A\,x(at-b)\)

1. Write \(at-b=a(t-b/a)\).
2. **Scale first** (\(x(at)\)), **then** shift by \(b/a\). \(\lvert a\rvert>1\) compresses; \(a<0\) also reverses.
3. Amplitude \(A<0\) flips vertically.

Check three kinks: if \(x\) is nonzero on \([t_L,t_R]\), \(y\) is nonzero where \(t_L\le at-b\le t_R\).

Even / odd: \(x_e=(x(t)+x(-t))/2\), \(x_o=(x(t)-x(-t))/2\).

## Standard signals

\[
u(t)=\begin{cases}1,&t>0\\0,&t<0\end{cases}
\quad
u[n]=\begin{cases}1,&n\ge 0\\0,&n<0\end{cases}
\quad
\delta[n]=\begin{cases}1,&n=0\\0,&n\neq 0\end{cases}
\]

\(\delta(t)\): area \(1\), zero off \(0\). \(\displaystyle\int_{-\infty}^{\infty}x(t)\delta(t-t_0)\,\mathrm{d}t=x(t_0)\) (sifting) if the impulse sits **inside** the interval.

\[
\delta[n]=u[n]-u[n-1],\qquad
\frac{\mathrm{d}}{\mathrm{d}t}u(t)=\delta(t),\qquad
\int_{-\infty}^{t}\delta(\tau)\,\mathrm{d}\tau=u(t)
\]

\(x(t)\delta(t-t_0)=x(t_0)\delta(t-t_0)\).

## Periodicity

**CT** sinusoid / \(e^{j\Omega t}\): always periodic, \(T=2\pi/\lvert\Omega\rvert\) (fundamental if \(\Omega\neq 0\)).

**DT** \(x[n]=A\cos(\omega n+\phi)\) periodic iff \(\omega/(2\pi)\) is **rational**:

\[
N=\frac{2\pi m}{\omega}\quad\text{integers \(N>0\), \(m>0\); smallest such \(N\).}
\]

\(\cos(2n)\): \(N=\pi m\) never integer \(\Rightarrow\) **not** periodic. \(\cos(0.2\pi n)\): \(N=10\). \(\cos((6\pi/35)n)\): \(N=35\) (\(m=3\)).

Sum of two CT periods \(T_1,T_2\): periodic iff \(T_1/T_2\) rational; then \(T=\mathrm{LCM}\) of the reduced periods. \(\sin t+\sin(\pi t/4)\) is **not** periodic.

Sum of two DT periods: \(N=\mathrm{lcm}(N_1,N_2)\) once each piece is periodic.

DT frequency aliases: \(\cos((2\pi f)n)=\cos(2\pi(f-1)n)\). Unique \(f\) lives in \((-1/2,1/2]\) (\(\omega\in(-\pi,\pi]\)). \(\cos(2\pi\cdot 0.6\,n)=\cos(2\pi\cdot 0.4\,n)\). That is **not** the sampling-theorem unit.

## Systems — tests (must write both sides)

Given \(x\to y\):

| Property | Pass if |
|----------|---------|
| Homogeneous | \(ax\to ay\) |
| Additive | \(x_1+x_2\to y_1+y_2\) |
| Linear | both of the above (superposition) |
| Time-invariant | \(x(t-t_0)\to y(t-t_0)\) |
| Causal | \(y(t_0)\) uses only \(x(t)\) for \(t\le t_0\) |
| Memoryless | \(y(t)\) uses only \(x(t)\) |
| BIBO stable | \(\lvert x\rvert\le B_x<\infty\Rightarrow\lvert y\rvert\le B_y<\infty\) |

Traps: \(y=2x+3\) fails H and A (offset). \(y=tx\) fails TI and BIBO. \(y=x(t+1)\) and \(y=x(-t)\) fail causal. \(y=\sin(x)\) fails linear, is BIBO. \(y=\cos(t+1)\,x(t)\) **is** causal (the \(\cos\) is a coefficient, not a peek at \(x(t+1)\)).

A system that fails **all five** (H, A, TI, causal, stable): e.g. \(y(t)=t\,[x(t+1)]^2\).

## LTI convolution

\[
y[n]=\sum_{k=-\infty}^{\infty}x[k]h[n-k]
=x[n]*h[n]
\qquad
y(t)=\int_{-\infty}^{\infty}x(\tau)h(t-\tau)\,\mathrm{d}\tau
\]

Any DT input: \(x[n]=\sum_k x[k]\delta[n-k]\). Then \(y[n]=\sum_k x[k]h[n-k]\).

Identities: \(x*\delta=x\), \(x*\delta(t-t_0)=x(t-t_0)\), \(u*u=t\,u(t)\) (CT), two width-\(T\) rects \(\to\) triangle of width \(2T\).

Commutative, associative, distributive. Parallel LTI: \(h_1+h_2\). Cascade: \(h_1*h_2\).

Causal LTI \(\Leftrightarrow\) \(h(t)=0\) for \(t<0\) (resp. \(h[n]=0\) for \(n<0\)).

BIBO LTI \(\Leftrightarrow\) \(\int\lvert h\rvert<\infty\) (CT) or \(\sum\lvert h[n]\rvert<\infty\) (DT). \(h=u\) is causal and **unstable**. Finite-length \(h[n]\) (finite values) is stable.

Step response \(s\): \(h=\mathrm{d}s/\mathrm{d}t\) (CT), \(h[n]=s[n]-s[n-1]\) (DT). Inverse of an integrator is a differentiator.

**RC (output on \(C\), initially uncharged), unit-step in:**

\[
s(t)=(1-e^{-t/RC})u(t),\qquad
h(t)=\frac{1}{RC}e^{-t/RC}u(t)
\]

Pulse \(x=1\) on \((0,2)\), same \(h\):

\[
y(t)=\begin{cases}
0,& t<0\\
1-e^{-t/RC},& 0\le t<2\\
(e^{2/RC}-1)e^{-t/RC},& t\ge 2
\end{cases}
\]

Accumulator \(y[n]-y[n-1]=x[n]\), at rest: \(h[n]=u[n]\). Geometric: \(\sum_{k=0}^{n}a^k=(1-a^{n+1})/(1-a)\) (\(a\neq 1\)).

## Fourier series (CT)

\(\Omega_0=2\pi/T\). Synthesis / analysis:

\[
x_p(t)=\sum_{k=-\infty}^{\infty}a_k e^{jk\Omega_0 t},\qquad
a_k=\frac{1}{T}\int_{\langle T\rangle}x_p(t)e^{-jk\Omega_0 t}\,\mathrm{d}t
\]

Sine: \(\sin(\Omega_0 t)\Rightarrow a_1=-j/2\), \(a_{-1}=j/2\), else \(0\). \(\lvert a_{\pm 1}\rvert=1/2\), \(\angle a_1=-\pi/2\).

One impulse per period (even, at \(t=0\)): \(a_k=1/T\) (W24: \(T=4\Rightarrow a_k=1/4\)), flat magnitude, zero phase.

Rect pulse height \(A\), width \(2T_1\), period \(T\): \(a_0=2AT_1/T\), \(a_k=A\sin(k\Omega_0 T_1)/(k\pi)\) (sinc envelope).

Dirichlet (on the **signal**): over one period, absolutely integrable; finitely many max/min; finitely many finite jumps.

Properties (if \(x\leftrightarrow a_k\)): linearity; \(x(t-t_0)\leftrightarrow a_k e^{-jk\Omega_0 t_0}\); \(\dot x\leftrightarrow jk\Omega_0 a_k\); real even \(\Rightarrow\) real even \(a_k\); real odd \(\Rightarrow\) imaginary odd \(a_k\); Parseval

\[
\frac{1}{T}\int_{\langle T\rangle}\lvert x\rvert^2\,\mathrm{d}t=\sum_k\lvert a_k\rvert^2.
\]

Time multiply \(\leftrightarrow\) coeff convolution; time convolution over a period \(\leftrightarrow T a_k b_k\).

DTFS (same idea, one period of length \(N\)): \(\omega_0=2\pi/N\),

\[
x[n]=\sum_{k=\langle N\rangle}a_k e^{jk\omega_0 n},\qquad
a_k=\frac{1}{N}\sum_{n=\langle N\rangle}x[n]e^{-jk\omega_0 n}.
\]

\(a_k\) is itself periodic with \(N\).

Eigenfunction (one line, then stop): \(x=e^{st}\Rightarrow y=H(s)e^{st}\) with \(H(s)=\int h(\tau)e^{-s\tau}\,\mathrm{d}\tau\). Do not open ROC / inversion tables.
