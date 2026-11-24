---
tags: [course/mni, endsem]
---

# Block 2 — Dynamics (2 h)

Every paper has this, including the three mid questions that were lost. December 2022 Q1 is 8 marks: a second-order force sensor and a thermometer ramp.

Read the graphs on Sawhney’s page, saved as the figure below, from `resources/notes/Zero_First_Second_Order_Systems.pdf` page 2. The class derivation of the step is `Step_and_Ramp_Response_First_Order.pdf` page 1.

## Theory

The order is the number of energy stores.

**Zero order.** Output is \(K\) times input, immediately. No differential equation. A potentiometer, ignoring inductance and loading.

**First order.** One store. Thermometer, thermocouple, \(RC\) lag. One time constant \(\tau\).

**Second order.** Mass and spring, or two stores. A natural frequency \(\omega_n\) and a damping ratio \(\zeta\). \(\zeta<1\) rings, \(\zeta=1\) is critical, \(\zeta>1\) is sluggish. \(\zeta\approx 0.7\) is the usual choice when you do not want a peak. The December 2022 sensor has \(\zeta=0.1\), so it peaks near \(\omega_n\).

Dynamic error is the true time-varying value minus the indicated value, after static error has been taken as zero. On a rising ramp the thermometer reads low.

## Formulas

First order, steady-state sensitivity \(K\):

\[
\tau \dot q_o + q_o = K q_i, \qquad \frac{Q_o}{Q_i}=\frac{K}{\tau s+1}
\]

| Symbol | Meaning |
|---|---|
| \(q_i, q_o\) | input and output, in whatever unit the sensor uses |
| \(K\) | steady-state gain. Output / input after everything has settled |
| \(\tau\) | time constant, seconds or minutes. Same unit as \(t\) |
| \(s\) | Laplace variable |

A temperature sensor in a fluid: \(\tau = Mc/(hA)\).

| Symbol | Meaning |
|---|---|
| \(M\) | mass of the sensor, kg |
| \(c\) | specific heat, J kg\(^{-1}\) °C\(^{-1}\) |
| \(h\) | heat-transfer coefficient, W m\(^{-2}\) °C\(^{-1}\) |
| \(A\) | surface area, m\(^2\) |

| Input | Output | Error you quote |
|---|---|---|
| Step of size \(Q_s\), from 0 | \(K Q_s(1-e^{-t/\tau})\) | still \(K Q_s e^{-t/\tau}\) short. 63% of the way at \(t=\tau\). 5% left at \(3\tau\). |
| Ramp \(q_i=mt\), already settled before the ramp starts | \(Km(t-\tau+\tau e^{-t/\tau})\) | true minus indicated \(= Km\tau(1-e^{-t/\tau})\). After a few \(\tau\), the lag is \(m\tau\). |
| Sine of frequency \(\omega\) | amplitude \(\times M\), phase \(-\tan^{-1}(\omega\tau)\) | \(M=1/\sqrt{1+(\omega\tau)^2}\) |

Second order, unity steady-state gain:

\[
\frac{Q_o}{Q_i}=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}
\]

For a sine at \(u=\omega/\omega_n\),

\[
M=\frac{1}{\sqrt{(1-u^2)^2+(2\zeta u)^2}}, \qquad \phi=-\tan^{-1}\!\left(\frac{2\zeta u}{1-u^2}\right)
\]

with the understanding that \(\phi\) goes past \(-90^\circ\) once \(u>1\). Each tone of a sum is multiplied by its own \(M\) and shifted by its own \(\phi\). You add the outputs. You do not add the \(M\) values first.

![Sawhney: step and ramp of a first-order instrument](figures/source/sawhney-first-order-step-ramp.jpg)

## Derivations

### Step, from the differential equation

1. Input is \(0\) for \(t<0\) and \(Q_s\) for \(t>0\). Output starts at 0. \(K\) is kept general; the papers often set \(K=1\).
2. For \(t>0\), \(\tau\dot q_o+q_o=K Q_s\).
3. The steady piece is \(K Q_s\). The transient is \(A e^{-t/\tau}\).
4. \(q_o(0)=0\) forces \(A=-K Q_s\).
5. \(q_o=K Q_s(1-e^{-t/\tau})\). The amount still missing is \(K Q_s e^{-t/\tau}\).

The class page writes the same Laplace step, \(Q_o(s)=K Q_s/(s(\tau s+1))\):

![Class step response of a first-order system](figures/source/class-first-order-step.jpg)

### Ramp lag

1. Input \(q_i=mt\) for \(t>0\), and the instrument was already settled at 0 before the ramp began.
2. A particular solution is a ramp of slope \(Km\) sitting \(K m\tau\) below the true ramp: \(q_o=Km(t-\tau)\).
3. Add the transient \(A e^{-t/\tau}\). The condition \(q_o(0)=0\) gives \(A=Km\tau\).
4. \(q_o=Km(t-\tau+\tau e^{-t/\tau})\).
5. True minus indicated, with \(K=1\), is \(m\tau(1-e^{-t/\tau})\). As \(t\to\infty\) the exponential dies and the steady lag is \(m\tau\).

### Sine, first order

1. Replace \(d/dt\) by \(j\omega\) in \(\tau\dot q_o+q_o=K q_i\).
2. \(Q_o/Q_i=K/(1+j\omega\tau)\).
3. Magnitude \(K/\sqrt{1+(\omega\tau)^2}\). Phase \(-\tan^{-1}(\omega\tau)\).
4. “Amplitude accuracy no worse than 95%” means the magnitude ratio is at least \(0.95\). Solve \(1+(\omega\tau)^2=1/0.95^2\).

## Solved — December 2022 re-exam Q1

**(a)** Unity steady-state sensitivity. \(\omega_n=40\,\mathrm{rad/s}\), \(\zeta=0.1\).

\[
F(t)=50\left\{\sin 10t+\frac13\sin 30t+\frac15\sin 50t\right\}
\]

The three input amplitudes are \(50\), \(50/3\), and \(10\).

| \(\omega\) | \(u=\omega/40\) | \(M\) | \(\phi\) | Output amplitude |
|---|---|---|---|---|
| 10 | 0.250 | 1.065 | \(-3.1^\circ\) | 53.3 |
| 30 | 0.750 | 2.162 | \(-18.9^\circ\) | 36.0 |
| 50 | 1.250 | 1.625 | \(-156^\circ\) | 16.2 |

Work one \(M\) in full. For \(\omega=30\), \(u=0.75\):

\[
M=\frac{1}{\sqrt{(1-0.75^2)^2+(2\times 0.1\times 0.75)^2}}=\frac{1}{\sqrt{0.4375^2+0.15^2}}=2.162.
\]

Output amplitude \(=(50/3)\times 2.162=36.0\).

**Box:**

\[
F_o(t)=53.3\sin(10t-3.1^\circ)+36.0\sin(30t-18.9^\circ)+16.2\sin(50t-156^\circ)
\]

The middle tone is amplified because \(0.75\) is close to resonance and \(\zeta\) is small. The tone at \(50\,\mathrm{rad/s}\) has already gone past \(-90^\circ\).

**(b)** Thermometer, \(\tau=0.75\,\mathrm{min}\). It is already in equilibrium. The bath then rises at \(1^\circ\mathrm{C}\) per minute. Difference at \(t=0.75\,\mathrm{min}\):

\[
\Delta = m\tau\left(1-e^{-t/\tau}\right)=0.75\left(1-e^{-1}\right)=0.474^\circ\mathrm{C}.
\]

The thermometer reads low by \(0.474^\circ\mathrm{C}\). If the question had not named a time, the steady lag would be \(m\tau=0.75^\circ\mathrm{C}\).

## Practice

1. September 2022 sessional. Same thermometer, \(\tau=0.75\,\mathrm{min}\). Bath rises at \(2^\circ\mathrm{C}\) per minute. Difference at \(t=3\,\mathrm{min}\).
2. September 2022 sessional Q5. Sensor mass \(6\times 10^{-2}\,\mathrm{kg}\), area \(10^{-3}\,\mathrm{m}^2\), specific heat \(0.4\,\mathrm{J\,kg^{-1}\,^\circ C^{-1}}\). Heat-transfer coefficient \(0.4\) in air and \(2.0\) in water, both in W m\(^{-2}\) °C\(^{-1}\). It starts in air at \(30^\circ\mathrm{C}\), is plunged into boiling water at \(t=0\), and is put back into \(30^\circ\mathrm{C}\) air at \(t=60\,\mathrm{s}\). Dynamic error at \(t=20\,\mathrm{s}\) and at \(t=140\,\mathrm{s}\).
3. October 2020 mid. First-order pressure sensor, \(K=1\). Steady ramp error no more than \(14\,\mathrm{kPa}\) on a ramp of \(0.7\,\mathrm{MPa/s}\). Amplitude at least 95% of true on a \(50\,\mathrm{Hz}\) sine. Largest allowable \(\tau\).

### Answers

1. \(\Delta=2\times 0.75(1-e^{-3/0.75})=1.5(1-e^{-4})=1.47^\circ\mathrm{C}\).
2. \(\tau_\mathrm{water}=Mc/(hA)=0.024/0.002=12\,\mathrm{s}\). \(\tau_\mathrm{air}=0.024/0.0004=60\,\mathrm{s}\). At 20 s, still in water: temperature \(100-70e^{-20/12}=86.8^\circ\mathrm{C}\), so the error is \(13.2^\circ\mathrm{C}\). At 60 s the sensor is at \(99.5^\circ\mathrm{C}\), then cools in air for 80 s: \(30+(99.5-30)e^{-80/60}=48.3^\circ\mathrm{C}\). Dynamic error against the \(30^\circ\mathrm{C}\) air is \(18.3^\circ\mathrm{C}\).
3. Ramp: \(\tau\times 0.7\times 10^6\le 14\times 10^3\), so \(\tau\le 0.020\,\mathrm{s}\). Sine: \(1/\sqrt{1+(\omega\tau)^2}\ge 0.95\) gives \(\omega\tau\le 0.329\), and \(\omega=314\), so \(\tau\le 1.05\times 10^{-3}\,\mathrm{s}\). The sine is the tighter limit. **Box** \(\tau\le 1.05\,\mathrm{ms}\).
