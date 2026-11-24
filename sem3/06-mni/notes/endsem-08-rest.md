---
tags: [course/mni, endsem]
---

# Block 8 — If time remains (about 2 h)

Drop this block first. It is real syllabus, and 2020 and 2021 ask it, but blocks 0–7 carry the repeating marks. One solved question each, then stop.

## Magnetic circuit

A toroid with one cut. Flux \(\phi=NI/\mathcal{R}\), and the reluctances of iron and air gap add.

\[
\mathcal{R}=\frac{l}{\mu A}, \qquad NI=\phi(\mathcal{R}_\mathrm{iron}+\mathcal{R}_\mathrm{gap})
\]

| Symbol | Meaning |
|---|---|
| \(l\) | length of that part of the path. Iron length is the mean circumference \(\pi D\) |
| \(A\) | cross-section of the rod, \(\pi r^2\) |
| \(\mu\) | \(\mu_0\mu_r\) in the iron, \(\mu_0\) in the gap. \(\mu_0=4\pi\times 10^{-7}\) |
| \(N\) | turns |
| \(I\) | the current you are asked for |

The gap is short and its \(\mu_r\) is 1, so it often dominates even when the iron path is long.

**Solved — December 2020.** Radius \(1.5\,\mathrm{cm}\), mean diameter \(50\,\mathrm{cm}\), \(300\) turns, \(\mu_r=1250\), gap \(0.1\,\mathrm{cm}\), flux \(35000\times 10^{-8}\,\mathrm{Wb}\).

1. \(A=\pi(0.015)^2=7.07\times 10^{-4}\,\mathrm{m}^2\). Iron length \(\pi\times 0.50=1.57\,\mathrm{m}\). Gap \(0.001\,\mathrm{m}\).
2. \(\phi=3.5\times 10^{-4}\,\mathrm{Wb}\).
3. \(\mathcal{R}_\mathrm{iron}=1.42\times 10^{6}\,\mathrm{A/Wb}\), \(\mathcal{R}_\mathrm{gap}=1.13\times 10^{6}\,\mathrm{A/Wb}\).
4. \(NI=\phi(\mathcal{R}_\mathrm{iron}+\mathcal{R}_\mathrm{gap})=889\,\mathrm{A}\). \(I=889/300=2.96\,\mathrm{A}\).

**Box:** \(2.96\,\mathrm{A}\).

## Flow

**Pitot.** A differential pressure \(\Delta P\) on a fluid of density \(\rho\):

\[
v=\sqrt{\frac{2\Delta P}{\rho}}, \qquad Q=v\times(\text{pipe area})
\]

**Orifice**, sized so that the same volume flow produces a chosen \(\Delta P\):

\[
Q=C_d A_o\sqrt{\frac{2\Delta P}{\rho}}
\]

\(C_d\) is the discharge coefficient. The paper’s velocity-of-approach factor \(E\) multiplies \(C_d\) when they say it is not 1.

**Electromagnetic.** A conducting liquid at speed \(v\) across a field \(B\), in a pipe of diameter \(\ell\):

\[
E=B\ell v
\]

The field is AC so electrode polarisation does not sit on the reading. If an amplifier and the liquid’s own resistance are in the question, correct for loading before you solve for \(v\).

![Electromagnetic flowmeter](figures/source/em-flowmeter.jpg)

**Solved — December 2020 pitot, then the orifice.** Pipe diameter \(0.15\,\mathrm{m}\), \(\Delta P=150\,\mathrm{Pa}\), \(\rho=5.0\,\mathrm{kg/m}^3\). Orifice \(C_d=0.6\), \(E=1\), and a differential-pressure transmitter whose range is \(0\) to \(4\times 10^{4}\,\mathrm{Pa}\).

1. \(v=\sqrt{2\times 150/5}=\sqrt{60}=7.75\,\mathrm{m/s}\).
2. Area \(=\pi(0.075)^2=0.0177\,\mathrm{m}^2\). \(Q=0.137\,\mathrm{m}^3/\mathrm{s}\).
3. Size the hole so this \(Q\) produces \(4\times 10^{4}\,\mathrm{Pa}\) on the transmitter:
   \[
   A_o=\frac{0.137}{0.6\sqrt{2\times 4\times 10^{4}/5}}=1.80\times 10^{-3}\,\mathrm{m}^2, \qquad d=48\,\mathrm{mm}.
   \]

**Box:** \(v=7.75\,\mathrm{m/s}\), \(Q=0.137\,\mathrm{m}^3/\mathrm{s}\), orifice diameter \(48\,\mathrm{mm}\).

## CRO

One result is worth remembering, because December 2020 asks it. Number of cycles of the signal on the screen \(=f_\mathrm{signal}/f_\mathrm{sweep}\).

A \(12\,\mathrm{kHz}\) sine with a \(24\,\mathrm{kHz}\) sweep shows half a cycle. With a \(6\,\mathrm{kHz}\) sweep it shows two cycles.

The control grid sets the brightness by controlling how many electrons leave the gun. Electrostatic deflection moves the beam in proportion to the voltage on the plates. That is the whole theory sentence.

## Q-meter

Two resonance settings of the tuning capacitor, at two frequencies, give the coil’s distributed capacitance \(C_d\) and then \(L\).

\[
f^2(C+C_d)=\text{constant}=\frac{1}{4\pi^2 L}
\]

\[
C_d=\frac{C_1 f_1^2-C_2 f_2^2}{f_2^2-f_1^2}
\]

![Q-meter: series resonance, \(E=IR\), \(Q=E_C/E\)](figures/source/qmeter-circuit.jpg)

**Solved — November 2022.** \(f_1=1.5\,\mathrm{MHz}\), \(C_1=400\,\mathrm{pF}\), \(f_2=2\,\mathrm{MHz}\), \(C_2=90\,\mathrm{pF}\).

1. \(C_d=(400\times 1.5^2-90\times 2^2)/(2^2-1.5^2)=(900-360)/(4-2.25)=309\,\mathrm{pF}\).
2. \(L=1/\big[(2\pi f_1)^2(C_1+C_d)\big]=15.9\,\mu\mathrm{H}\).

**Box:** \(C_d=309\,\mathrm{pF}\), \(L=15.9\,\mu\mathrm{H}\).

## One line each, if a diagram question appears

Copy the figure from the lecture PDF. Do not derive these.

| Name | The line | Where the figure is |
|---|---|---|
| Piezoelectric | Charge \(q=dF\). Charge amplifier \(v_o=-q/C_f\). Force on the crystal \(F=AE\,\Delta\ell/\ell\). | `resources/` piezo PDF |
| Radiation pyrometer | Optics onto a detector. Temperature from the radiation, no contact. | `resources/40. radiation pyrometer.pdf` |
| Induction energy meter | Disc speed proportional to power. Counted revolutions are energy. | the 3 Nov notes, energy-meter page |
| IEEE-488 | The parallel bus (GPIB) a controller uses to talk to rack instruments. | the 3 Nov notes |
| Instrument transformer | A CT or a PT scales a large current or voltage down into a meter’s range. | the 3 Nov notes |

## Practice

1. November 2022 magnetic circuit. Radius \(1\,\mathrm{cm}\), mean diameter \(40\,\mathrm{cm}\), \(340\) turns, \(\mu_r=850\), gap \(0.2\,\mathrm{cm}\), flux \(29000\times 10^{-8}\,\mathrm{Wb}\). Find \(I\).
2. A \(5\,\mathrm{kHz}\) sine is on a CRO whose sweep is \(1\,\mathrm{kHz}\). How many cycles appear?

### Answers

1. Same steps as the solved toroid. Area \(3.14\times 10^{-4}\,\mathrm{m}^2\), iron reluctance \(3.74\times 10^{6}\), gap reluctance \(5.07\times 10^{6}\), \(NI=2555\). **Box** \(I=7.52\,\mathrm{A}\).
2. Five cycles.
