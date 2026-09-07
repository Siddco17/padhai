# ECL305 EMFT crash course — teach + work every MST-style problem

How to use: one block per sitting. Read the concept, cover the “you try” line, then uncover the solution. Files: `midsem-map.md`, `midsem-formulas.md`.

Physics was FF then ~5. Block 0 is not optional. Do the integrals **the same day** you read them (`../_meta/remediation.md`).

---

# Block 0 — Physics patch, then coordinates (1.5 h)

You do not need year-1 Physics again. You need the five moves this paper uses on every page.

## 0.1 \(\mathbf{i},\mathbf{j},\mathbf{k}\)

A **scalar** is a number (mass, \(V\), \(\rho_v\)). A **vector** has magnitude and direction (force, \(\mathbf{E}\), \(d\mathbf{l}\)).

In Cartesian space every vector is three numbers along three perpendicular unit axes:

\[
\mathbf{A}=A_x\,\mathbf{i}+A_y\,\mathbf{j}+A_z\,\mathbf{k}
=A_x\mathbf{a}_x+A_y\mathbf{a}_y+A_z\mathbf{a}_z
\]

Sadiku writes \(\mathbf{a}_x\). Same object as \(\mathbf{i}\). Magnitude and unit vector:

\[
\lvert\mathbf{A}\rvert=\sqrt{A_x^2+A_y^2+A_z^2},\qquad \hat{\mathbf{A}}=\mathbf{A}/\lvert\mathbf{A}\rvert
\]

\(\hat{\mathbf{A}}\) has length 1 and the same direction as \(\mathbf{A}\). Adding/subtracting is componentwise. Scaling \(3\mathbf{A}\) triples each component.

### Worked: BEFORE MID p.1

\(\mathbf{A}=10\mathbf{a}_x-4\mathbf{a}_y+6\mathbf{a}_z\), \(\mathbf{B}=2\mathbf{a}_x+\mathbf{a}_y\). Find \(3\mathbf{A}-\mathbf{B}\).

\(3\mathbf{A}=30\mathbf{a}_x-12\mathbf{a}_y+18\mathbf{a}_z\), then \(28\mathbf{a}_x-13\mathbf{a}_y+18\mathbf{a}_z\).

**You must be able to write \(\lvert\mathbf{B}\rvert\) and \(\hat{\mathbf{B}}\) for \(\mathbf{B}=5\mathbf{a}_x+6\mathbf{a}_y+7\mathbf{a}_z\) with the book closed.** \(\lvert\mathbf{B}\rvert=\sqrt{110}\), \(\hat{\mathbf{B}}=\mathbf{B}/\sqrt{110}\).

## 0.2 Dot product

\[
\mathbf{A}\cdot\mathbf{B}=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\cos\theta=A_xB_x+A_yB_y+A_zB_z
\]

Use:

- **Work / line integral:** \(dW=\mathbf{F}\cdot d\mathbf{l}\). Only the piece of \(\mathbf{F}\) *along* the path counts.
- **Flux / surface integral:** \(d\Psi=\mathbf{A}\cdot d\mathbf{S}\). Only the piece *through* the surface counts.
- **Projection:** scalar proj of \(\mathbf{A}\) onto \(\mathbf{B}\) is \(\mathbf{A}\cdot\hat{\mathbf{B}}\).

Perpendicular vectors \(\Rightarrow\) dot \(=0\). That is why \(\mathbf{a}_\rho\cdot\mathbf{a}_\phi=0\) on a circular arc.

### Worked: 2022 MST Group A Q3

\(\mathbf{A}=5\mathbf{a}_x+\mathbf{a}_y+3\mathbf{a}_z\), \(\mathbf{B}=2\mathbf{a}_x+2\mathbf{a}_y+2\mathbf{a}_z\). Projection of \(\mathbf{A}\) on \(\mathbf{B}\):

\[
\mathbf{A}\cdot\mathbf{B}=10+2+6=18,\quad \lvert\mathbf{B}\rvert=2\sqrt{3},\quad \mathbf{A}\cdot\hat{\mathbf{B}}=\frac{18}{2\sqrt{3}}=3\sqrt{3}
\]

Vector projection \(=(18/12)\mathbf{B}=3\mathbf{a}_x+3\mathbf{a}_y+3\mathbf{a}_z\). Group B asks the other way (B on A): same recipe, swap.

## 0.3 Cross product

\[
\mathbf{A}\times\mathbf{B}=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\sin\theta\,\hat{\mathbf{n}}
\]

\(\hat{\mathbf{n}}\) is perpendicular to **both**, right-hand rule. Cartesian: the 3×3 determinant on the formula sheet.

Use: area of parallelogram \(=\lvert\mathbf{A}\times\mathbf{B}\rvert\); volume of parallelepiped \(=\lvert\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C})\rvert\) (2022 Group C Q3). Direction of \(d\mathbf{S}\) on a flat patch can be the cross of two edge vectors.

## 0.4 What a field is

A **field** is a quantity defined at **every point** in a region.

- Scalar field: \(V(x,y,z)\) — one number per point (temperature, potential).
- Vector field: \(\mathbf{E}(x,y,z)\) — one arrow per point (electric field, \(\mathbf{D}\), \(\mathbf{H}\)).

\(\mathbf{E}=x\mathbf{a}_x\) at \((1,0,0)\) is \(\mathbf{a}_x\); at \((2,0,0)\) it is \(2\mathbf{a}_x\). Same formula, different arrows. Circuit theory gives you *one* \(V\) on a node. Field theory gives you \(V\) and \(\mathbf{E}\) as functions of space. That is the whole subject until magnetostatics.

Charge at rest \(\to\) electrostatic field (MST-1). Uniform current \(\to\) magnetostatic (after the mid). Accelerating charge \(\to\) waves (endsem).

## 0.5 Coordinates — Cartesian first, then the other two

A point is \((x,y,z)\). The **position vector** from the origin is \(\mathbf{r}=x\mathbf{a}_x+y\mathbf{a}_y+z\mathbf{a}_z\). Distance from point 1 to point 2 is \(\lvert\mathbf{r}_2-\mathbf{r}_1\rvert\).

When the object is a cylinder or a sphere, Cartesian integrals become painful. Switch.

**Cylindrical** \((\rho,\phi,z)\): \(\rho\) = distance from the **\(z\)-axis** (not from the origin), \(\phi\) from \(+x\) in the \(xy\)-plane, \(z\) unchanged.

\[
x=\rho\cos\phi,\quad y=\rho\sin\phi,\quad \rho=\sqrt{x^2+y^2}
\]

Unit vectors \(\mathbf{a}_\rho,\mathbf{a}_\phi\) **rotate with \(\phi\)**. Convert a vector at a *point* by plugging that point’s \(\phi\).

**Spherical** \((r,\theta,\phi)\): \(r\) = distance from the **origin**, \(\theta\) from \(+z\) (0 to \(\pi\)), \(\phi\) the same azimuth as cylindrical.

\[
x=r\sin\theta\cos\phi,\quad y=r\sin\theta\sin\phi,\quad z=r\cos\theta
\]

### Worked: convert a vector at a point

\(\mathbf{A}=5\mathbf{a}_x+\mathbf{a}_y+3\mathbf{a}_z\) at the point where we need cylindrical components. You also need the **location**. If the paper only gives the vector, they usually mean “write the general transformation” and leave \(\phi\) in the answer, **or** they imply the field is constant and you still write

\[
A_\rho=5\cos\phi+\sin\phi,\quad A_\phi=-5\sin\phi+\cos\phi,\quad A_z=3
\]

If they give a point \(P(\rho,\phi,z)=(2,60^\circ,0)\): \(\cos\phi=1/2\), \(\sin\phi=\sqrt{3}/2\), so \(A_\rho=5/2+\sqrt{3}/2\), \(A_\phi=-5\sqrt{3}/2+1/2\), \(A_z=3\).

2022 Group B Q4 is the same \(\mathbf{A}\) into **spherical** — use the \(A_r,A_\theta,A_\phi\) row on the formula sheet. Group A Q5: \(\mathbf{F}=10 r^{-1}\mathbf{a}_r\) into Cartesian: \(\mathbf{F}=(10/r)\mathbf{a}_r=10(x\mathbf{a}_x+y\mathbf{a}_y+z\mathbf{a}_z)/r^2\) because \(\mathbf{a}_r=\mathbf{r}/r\) and \(r=\sqrt{x^2+y^2+z^2}\). Group B Q5: \(\mathbf{F}=10\rho^{-1}\mathbf{a}_\rho\) \(\to\) \(10(x\mathbf{a}_x+y\mathbf{a}_y)/(x^2+y^2)\).

### You-try checklist (Block 0)

1. Recite \(\lvert\mathbf{A}\rvert\), \(\hat{\mathbf{A}}\), \(\mathbf{A}\cdot\mathbf{B}\), \(\mathbf{A}\times\mathbf{B}\) with no notes.
2. Say out loud: “a field is a value at every point.”
3. Write \(x,y,z\) from \((\rho,\phi,z)\) and from \((r,\theta,\phi)\).
4. Write \(\mathbf{a}_\rho\) and \(\mathbf{a}_\phi\) in terms of \(\mathbf{a}_x,\mathbf{a}_y\).

---

# Block 1 — Integrals, then grad / div / curl (2.5 h)

## 1.1 \(d\mathbf{l}\), \(d\mathbf{S}\), \(dv\) — pick the two that change

On a path, only one (or two) coordinates run. On a surface, two run and the third is fixed; \(d\mathbf{S}\) points along the **fixed** coordinate’s unit vector (outward on a closed surface).

Quarter cylinder \(\rho=5\), \(0\le\phi\le\pi/2\), \(0\le z\le 10\) (BEFORE MID pp.20–21):

| Object | What changes | Integral | Value |
|--------|--------------|----------|-------|
| edge BC (vertical) | \(z\) | \(\int_0^{10} dz\) | \(10\) |
| arc DC | \(\phi\) | \(\int_0^{\pi/2} 5\,d\phi\) | \(2.5\pi\) |
| curved wall ABCD | \(\phi,z\) | \(\int_0^{10}\int_0^{\pi/2} 5\,d\phi\,dz\) | \(25\pi\) |
| base quarter-disk | \(\rho,\phi\) | \(\int_0^{\pi/2}\int_0^5 \rho\,d\rho\,d\phi\) | \(6.25\pi\) |
| volume | all three | \(\int\rho\,d\rho\,d\phi\,dz\) | \(62.5\pi\) |

2023 Feb Q2 is this in spherical: \(3<r<5\), \(0.1\pi<\theta<0.3\pi\), \(1.2\pi<\phi<1.6\pi\).

- Volume: \(\int_{1.2\pi}^{1.6\pi}\int_{0.1\pi}^{0.3\pi}\int_3^5 r^2\sin\theta\,dr\,d\theta\,d\phi=\frac{98}{3}\bigl[\cos(0.1\pi)-\cos(0.3\pi)\bigr](0.4\pi)\).
- Distance \(A\to B\): convert both points to Cartesian, then \(\lvert\mathbf{r}_B-\mathbf{r}_A\rvert\).
- Closed surface area: **six** faces (two \(r=\mathrm{const}\), two \(\theta=\mathrm{const}\), two \(\phi=\mathrm{const}\)). Write the matching \(dS\) from the table.

## 1.2 Line integral \(\int\mathbf{A}\cdot d\mathbf{l}\)

Parametrize the path. Substitute into \(\mathbf{A}\). Dot with \(d\mathbf{l}\). Integrate the remaining scalar.

### Worked: Tutorial Sheet 2 Q1 (line)

\(\mathbf{H}=xy^2\mathbf{a}_x+x^2 y\mathbf{a}_y\) along the parabola \(x=y^2\) from \(P(1,1,0)\) to \(Q(16,4,0)\).

On the path \(x=y^2\), \(dx=2y\,dy\), \(z=0\). \(y\) runs \(1\to 4\).

\[
\mathbf{H}\cdot d\mathbf{l}=xy^2\,dx+x^2 y\,dy=(y^2)(y^2)(2y\,dy)+(y^4)y\,dy=3y^5\,dy
\]

\[
\int_1^4 3y^5\,dy=\frac12\bigl[y^6\bigr]_1^4=\frac12(4096-1)=2047.5
\]

### Worked: Tutorial Sheet 2 Q3 (two paths — not conservative)

\(\mathbf{F}=2xy\,\mathbf{a}_x+(x^2-z^2)\mathbf{a}_y-3xz^2\mathbf{a}_z\) from \((0,0,0)\) to \((2,1,3)\).

**Curl check first** (30 seconds): \((\nabla\times\mathbf{F})_x=\partial_y F_z-\partial_z F_y=0-(-2z)=2z\neq0\). Path **matters**. Compute both.

Path (a) broken: \((0,0,0)\to(0,1,0)\to(2,1,0)\to(2,1,3)\).

1. \(x=z=0\), \(dy\): \(\mathbf{F}\cdot d\mathbf{l}=(x^2-z^2)\,dy=0\).
2. \(y=1,z=0\), \(dx\): \(\mathbf{F}\cdot d\mathbf{l}=2xy\,dx=2x\,dx\Rightarrow[x^2]_0^2=4\).
3. \(x=2,y=1\), \(dz\): \(\mathbf{F}\cdot d\mathbf{l}=-3xz^2\,dz=-6z^2\,dz\Rightarrow[-2z^3]_0^3=-54\).

\(\int\mathbf{F}\cdot d\mathbf{l}=-50\).

Path (b) straight: \(x=2t\), \(y=t\), \(z=3t\), \(t:0\to1\), \(dx=2dt\), \(dy=dt\), \(dz=3dt\).

\[
\mathbf{F}=4t^2\mathbf{a}_x-5t^2\mathbf{a}_y-54 t^3\mathbf{a}_z
\]

\[
\mathbf{F}\cdot d\mathbf{l}=(8t^2-5t^2-162 t^3)\,dt=(3t^2-162 t^3)\,dt
\]

\[
\int_0^1= \bigl[t^3-40.5 t^4\bigr]_0^1=-39.5
\]

Different numbers. In the answer: “field is not conservative; \(\nabla\times\mathbf{F}\neq\mathbf{0}\).”

### Worked: Tutorial Sheet 2 Q4 (cylindrical path)

\(\mathbf{F}=\rho^2\mathbf{a}_\rho+z\mathbf{a}_\phi+\cos\phi\,\mathbf{a}_z\) from \(P(2,0^\circ,0)\) to \(Q(2,\pi/4,3)\).

Arc \(\rho=2\), \(0<\phi<\pi/4\), \(z=0\): \(d\mathbf{l}=2\,d\phi\,\mathbf{a}_\phi\), \(\mathbf{F}\cdot d\mathbf{l}=z\cdot 2\,d\phi=0\).

Vertical \(\rho=2\), \(\phi=\pi/4\), \(0<z<3\): \(d\mathbf{l}=dz\,\mathbf{a}_z\), \(\mathbf{F}\cdot d\mathbf{l}=\cos(\pi/4)\,dz\), integral \(=(1/\sqrt{2})\cdot 3=3/\sqrt{2}\).

## 1.3 Surface integral (flux)

\(d\mathbf{S}\) = (the two running differentials) × (unit vector of the **fixed** coordinate), sign = outward / specified direction.

### Worked: Tutorial Sheet 2 Q7 (surface)

\(\mathbf{A}=y\mathbf{a}_x+z\mathbf{a}_y+x\mathbf{a}_z\) through \(y=1\), \(0<x<1\), \(0<z<2\).

Fixed \(y\), so \(d\mathbf{S}=dx\,dz\,\mathbf{a}_y\) (paper’s \(+y\)). \(\mathbf{A}\cdot d\mathbf{S}=z\,dx\,dz\).

\[
\int_0^2\int_0^1 z\,dx\,dz=\int_0^2 z\,dz=2
\]

### Worked: BEFORE MID cylinder flux + divergence theorem

\(\mathbf{G}=10 e^{-2z}(\rho\mathbf{a}_\rho+\mathbf{a}_z)\), cylinder \(\rho=1\), \(0\le z\le 1\).

Top \(z=1\), \(d\mathbf{S}=\rho\,d\rho\,d\phi\,\mathbf{a}_z\): \(\Psi_t=10 e^{-2}\int_0^{2\pi}\int_0^1\rho\,d\rho\,d\phi=10\pi e^{-2}\).

Bottom \(z=0\), **outward** \(d\mathbf{S}=-\rho\,d\rho\,d\phi\,\mathbf{a}_z\): \(\Psi_b=-10\pi\).

Side \(\rho=1\), \(d\mathbf{S}=\rho\,d\phi\,dz\,\mathbf{a}_\rho=d\phi\,dz\,\mathbf{a}_\rho\): \(\Psi_s=10\pi(1-e^{-2})\).

Sum \(=0\).

Check: cyl divergence \(\frac{1}{\rho}\partial_\rho(\rho\cdot 10e^{-2z}\rho)+\partial_z(10e^{-2z})=20e^{-2z}-20e^{-2z}=0\). Volume integral of 0 is 0. **Same answer.** On a closed surface, **always** try \(\nabla\cdot\) first.

### Worked: Tutorial Sheet 2 Q8 (closed volume = Gauss)

\(\mathbf{D}=x^2\mathbf{a}_x+y^3\mathbf{a}_y+yz^2\mathbf{a}_z\), box \(x=\pm1\), \(0\le y\le 4\), \(1\le z\le 3\).

\[
\nabla\cdot\mathbf{D}=2x+3y^2+2yz
\]

\(\int_{-1}^1 2x\,dx=0\). The rest:

\[
\int 3y^2\,dv=2\cdot 64\cdot 2=256,\qquad
\int 2yz\,dv=2\cdot 2\cdot 8\cdot 4=128
\]

(\(\int_0^4 3y^2\,dy=64\), \(\int_1^3 dz=2\); \(\int_0^4 y\,dy=8\), \(\int_1^3 z\,dz=4\).) **Flux \(=384\).** Write the \(z\) integrals; dropping \(\int z\,dz=4\) down to \(2\) is the usual miss.

## 1.4 Grad, div, curl in one picture

- \(\nabla V\): arrow pointing **uphill** on the scalar \(V\). Length = steepest slope.
- \(\nabla\cdot\mathbf{A}\): net outflow per volume. Source \(>0\), sink \(<0\), parallel equal arrows \(=0\).
- \(\nabla\times\mathbf{A}\): paddlewheel. Spins \(\Rightarrow\) curl. Parallel equal flow \(\Rightarrow\) curl \(0\).

Four pictures (BEFORE MID p.15): parallel \(\Rightarrow\) both 0; in/out \(\Rightarrow\) div only; circles \(\Rightarrow\) curl only; spiral \(\Rightarrow\) both.

**Stokes (2022 Group A Q8).** \(\mathbf{F}=xy\mathbf{a}_x-2x\mathbf{a}_y\) on the quarter disk \(r=3\), \(xy\)-plane, first quadrant.

\(\nabla\times\mathbf{F}=(\partial_x F_y-\partial_y F_x)\mathbf{a}_z=(-2-x)\mathbf{a}_z\). \(d\mathbf{S}=\rho\,d\rho\,d\phi\,\mathbf{a}_z\), \(\rho:0\to3\), \(\phi:0\to\pi/2\), \(x=\rho\cos\phi\).

\[
\iint(\nabla\times\mathbf{F})\cdot d\mathbf{S}=\int_0^{\pi/2}\int_0^3(-2-\rho\cos\phi)\rho\,d\rho\,d\phi
\]

Do that, then the three-edge line integral (along \(x\), along the arc, down \(y\)). They match.

### You-try checklist (Block 1)

1. Recite \(d\mathbf{l},d\mathbf{S},dv\) in all three systems.
2. Redo Tutorial Q1 and Q7 on paper.
3. For any closed surface, compute \(\nabla\cdot\) **before** six face integrals.

---

# Block 2 — Electrostatics (3 h)

## 2.1 Coulomb and superposition

Force on \(Q_2\) due to \(Q_1\) points along \(\mathbf{a}_{12}\) (from 1 to 2), repulsive if same sign.

\[
\mathbf{F}_{12}=\frac{9\times10^9\,Q_1 Q_2}{R_{12}^2}\mathbf{a}_{12}
\]

Many charges: **vector sum**. Symmetry: cancel the in-plane pieces, keep \(z\).

### Worked: BEFORE MID, four \(20\,\mu\mathrm{C}\) on \(\pm x,\pm y\) at \(4\,\mathrm{m}\), probe \(100\,\mu\mathrm{C}\) at \((0,0,3)\)

Distance each \(\to\) probe: \(5\,\mathrm{m}\). One magnitude \(F=9\times10^9\cdot(20\times10^{-6})\cdot(100\times10^{-6})/25=0.72\,\mathrm{N}\). Four of them; each has \(z\)-cosine \(3/5\), and \(x,y\) cancel.

\[
\mathbf{F}=4\cdot 0.72\cdot\frac{3}{5}\,\mathbf{a}_z=1.728\,\mathbf{a}_z\ \mathrm{N}
\]

Square of four equal \(Q\) with a fifth at the centre (BEFORE MID last page): net force on a corner is zero for a **negative** \(Q_c\). Distance centre–corner is \(a/\sqrt{2}\). Equate the \(x\)-piece of the two sides plus the diagonal to the pull from \(Q_c\); \(Q_c=-Q(2\sqrt{2}+1)/4\).

## 2.2 Line / surface / volume \(\mathbf{E}\)

\(dq=\rho_L d\ell\) or \(\rho_S dS\) or \(\rho_v dv\), then \(\mathbf{E}=\frac{1}{4\pi\varepsilon_0}\int\frac{dq}{R^2}\mathbf{a}_R\). Infinite line: after the \(\theta\) integral you **must** get \(\rho_L/(2\pi\varepsilon_0\rho)\,\mathbf{a}_\rho\). If you are still integrating \(z\) from \(-\infty\) to \(\infty\) in the exam, switch to Gauss.

2022 Group C Q8: \(\rho_{L1}=+15\,\mathrm{nC/m}\) at \(y=-1,z=0\), \(\rho_{L2}=-15\,\mathrm{nC/m}\) at \(y=+1,z=0\). On the \(z\)-axis, \(y=0\), the two \(\mathbf{a}_\rho\) are symmetric: \(E_y\) adds, \(E_z\) from the two lines — draw it. Result is a function of \(z\) only, along \(\mathbf{a}_y\) (opposite-sign lines = a “line dipole” in \(y\)).

## 2.3 \(\mathbf{D}\) versus \(\mathbf{E}\), then Gauss

\(\mathbf{E}\) is what a probe charge feels. \(\mathbf{D}\) is the field whose flux equals **free** charge.

Free space: \(\mathbf{D}=\varepsilon_0\mathbf{E}\), \(\oint\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc}}\), \(\nabla\cdot\mathbf{D}=\rho_v\).

**Recipe:** (1) argue symmetry so \(\mathbf{D}\) is constant and normal on a Gaussian surface, (2) \(\lvert\mathbf{D}\rvert\cdot\text{area}=Q_{\mathrm{inside}}\), (3) \(\mathbf{E}=\mathbf{D}/\varepsilon\).

Uniform ball of \(\rho_v\), radius \(a\):

- \(r<a\): \(D\cdot 4\pi r^2=\rho_v\cdot\frac{4}{3}\pi r^3\Rightarrow \mathbf{D}=(\rho_v r/3)\mathbf{a}_r\)
- \(r>a\): \(Q_{\mathrm{enc}}=\rho_v\frac{4}{3}\pi a^3\Rightarrow \mathbf{D}=(a^3\rho_v/(3r^2))\mathbf{a}_r\)

No symmetry (2023 Feb Q3, Tutorial Q8) \(\Rightarrow\) **do not** force a Gaussian surface. Use \(\rho_v=\nabla\cdot\mathbf{D}\) and/or the divergence theorem.

### Worked: 2023 Feb Q3 (Gauss without symmetry)

\(\mathbf{D}=2x(1+z^2)\mathbf{a}_x+2x^2 z\mathbf{a}_z\ \mathrm{nC/m}^2\).

\[
\rho_v=\nabla\cdot\mathbf{D}=2(1+z^2)+2x^2\ \mathrm{nC/m}^3
\]

Flux through the rectangle \(z=1\), \(0<x<2\), \(0<y<3\): \(d\mathbf{S}=dx\,dy\,\mathbf{a}_z\), \(D_z|_{z=1}=2x^2(1)\).

\[
\Psi=\int_0^3\int_0^2 2x^2\,dx\,dy=3\cdot 2\cdot\frac{8}{3}=16\ \mathrm{nC}
\]

### Worked: 2022 Group C Q6 (spherical Gauss)

\(\mathbf{D}=10 r^2\mathbf{a}_r\ \mathrm{mC/m}^2\), region \(r=40\,\mathrm{cm}\), \(\theta=\pi/4\), \(\phi=2\pi\) (full sphere of radius \(0.4\,\mathrm{m}\) if \(\phi\) covers \(2\pi\) and \(\theta\) to \(\pi\); **read the figure** — if \(\theta\) only to \(\pi/4\) it is an ice-cream cone).

If the closed volume is the ball \(r\le 0.4\):

\[
Q_{\mathrm{enc}}=\oint D_r\,dS=D_r\cdot 4\pi r^2=(10\times10^{-3})(0.4)^2\cdot 4\pi(0.4)^2
\]

Safer: \(\rho_v=\nabla\cdot\mathbf{D}=\frac{1}{r^2}\partial_r(r^2\cdot 10 r^2)=40 r\ \mathrm{mC/m}^3\), then \(\int\rho_v dv\). That works even for the cone.

## 2.4 Potential, work, conservative test

Electrostatic \(\mathbf{E}\) in statics **is** conservative: \(\nabla\times\mathbf{E}=\mathbf{0}\), \(\mathbf{E}=-\nabla V\), path does not matter.

Exam trick: they give a random \(\mathbf{E}\) and a path. **Curl it.** If zero, \(W=Q(V_B-V_A)\) with \(V\) recovered by integrating \(\mathbf{E}=-\nabla V\). If not zero, two paths differ (Block 1 Q3).

### Worked: 2023 Feb Q4 (the money conservative question)

\(\mathbf{E}=-8xy\,\mathbf{a}_x-4x^2\mathbf{a}_y+\mathbf{a}_z\ \mathrm{V/m}\), \(Q=6\,\mathrm{C}\), \(A(1,8,5)\) to \(B(2,18,6)\) along \(y=3x^2+z\), \(z=x+4\).

Curl: \(\partial_x E_y-\partial_y E_x=-8x-(-8x)=0\), other components 0. Conservative.

Integrate: \(E_x=-\partial V/\partial x=-8xy\Rightarrow V=4x^2 y+f(y,z)\). Then \(E_y=-4x^2=-\partial V/\partial y\Rightarrow f\) independent of \(y\). \(E_z=1=-\partial V/\partial z\Rightarrow f=-z+C\).

\[
V=4x^2 y-z,\quad V_A=32-5=27,\quad V_B=4\cdot4\cdot18-6=282
\]

External work \(W=Q(V_B-V_A)=6\times 255=1530\,\mathrm{J}\). Shortest path: **same**, because curl is zero. Write that sentence; it is the last two marks.

## 2.5 Dipole

\(\mathbf{p}=Q\mathbf{d}\). Potential on the axis falls as \(1/R^2\), field as \(1/R^3\).

### Worked: 2023 Feb Q6

\(\mathbf{p}=3\mathbf{a}_x-5\mathbf{a}_y+10\mathbf{a}_z\ \mathrm{nC\cdot m}\) at \(Q(1,2,-4)\). Point \(P(2,3,4)\).

\(\mathbf{R}=\mathbf{r}_P-\mathbf{r}_Q=\mathbf{a}_x+\mathbf{a}_y+8\mathbf{a}_z\), \(R=\sqrt{66}\).

\[
V=\frac{\mathbf{p}\cdot\mathbf{R}}{4\pi\varepsilon_0 R^3}=9\times10^9\cdot\frac{78\times10^{-9}}{66^{3/2}}\approx 1.31\,\mathrm{V}
\]

(\(\mathbf{p}\cdot\mathbf{R}=3-5+80=78\times10^{-9}\).)

## 2.6 Energy

Building charges takes work. That work lives in the field: \(W_E=\frac12\int\mathbf{D}\cdot\mathbf{E}\,dv\).

### Worked: 2023 Feb Q5 (spherical energy shell)

Sphere \(r=4\,\mathrm{cm}\) in free space, \(\rho_S=20\,\mu\mathrm{C/m}^2\). Region \(6\,\mathrm{cm}<r<r_A\) holds \(1\,\mathrm{mJ}\).

\[
Q=4\pi a^2\rho_S=4\pi(0.04)^2(20\times10^{-6})=4.021\times10^{-7}\,\mathrm{C}
\]

Outside, \(E=Q/(4\pi\varepsilon_0 r^2)\), so

\[
W_E=\frac{Q^2}{8\pi\varepsilon_0}\left(\frac{1}{0.06}-\frac{1}{r_A}\right)=10^{-3}
\]

\[
\frac{Q^2}{8\pi\varepsilon_0}\approx 7.27\times10^{-4}\implies \frac{1}{0.06}-\frac{1}{r_A}\approx 1.376\implies r_A\approx 6.54\,\mathrm{cm}
\]

### You-try checklist (Block 2)

1. Recite the Gauss catalogue (point, ball inside/out, line, sheet) with no notes.
2. Recite \(\mathbf{D}=\varepsilon\mathbf{E}\), \(\nabla\cdot\mathbf{D}=\rho_v\), \(W=-Q\int\mathbf{E}\cdot d\mathbf{l}\).
3. Redo 2023 Q3, Q4, Q5, Q6 on paper.

---

# Block 3 — exam rehearsal (2 h)

## 3.1 How to sit the paper

- **2022:** 1 hour, 25 marks, four groups of the same ideas. Unit-vector dots and “is this operator defined?” are 1 min each. Spend the hour on Q6–Q9 (Gauss / Laplace / Stokes / line charges).
- **2023 Feb:** 1.5 hours, 30 marks, six questions. Q1 (three distributions \(\to Q\) and \(V\)) and Q2 (spherical box) are long; start Q3 (mechanical \(\nabla\cdot\mathbf{D}\)) if Q1’s figure stalls.

Attempt order = high-mark things you can finish. A labelled \(d\mathbf{S}\) on a sketch still scores if the integral is unfinished.

## 3.2 2022 MST — attack sheet (Group A, 10 Mar, 25 marks)

| Q | Marks | What they want | Answer shape |
|---|-------|----------------|--------------|
| 1 | 1 | \(\mathbf{a}_x\cdot\mathbf{a}_\rho\) | \(\cos\phi\) |
| 2 | 1 | gradient of a vector | **not defined** |
| 3 | 2 | proj of \(\mathbf{A}\) on \(\mathbf{B}\) | \(3\sqrt{3}\) (scalar) or \(\frac32\mathbf{B}\) |
| 4 | 2 | \(\mathbf{A}\) Cartesian \(\to\) cyl | \(A_\rho,A_\phi,A_z\) with \(\phi\) |
| 5 | 3 | \(10 r^{-1}\mathbf{a}_r\to\) Cartesian | \(10\mathbf{r}/r^3\) |
| 6 | 4 | three infinite lines, \(E\) at \(P(0,a,0)\) | three \(\rho_L/(2\pi\varepsilon_0\rho)\,\mathbf{a}_\rho\); plug \(a=b=1\) |
| 7 | 4 | \(V=x^2 y z+A y^3 z\), Laplace, then \(\mathbf{E}\) | \(\nabla^2 V=0\Rightarrow A=-1/3\); \(\mathbf{E}=-\nabla V\) at \((2,1,-1)\) |
| 8 | 4 | verify Stokes, quarter disk \(r=3\) | both sides; see Block 1.4 |
| 9 | 4 | \(\rho_S=5\rho/(\rho^2+1)\ \mathrm{nC/m}^2\) on \(z=2\), \(\rho<5\) | (a) \(\Psi=Q=\int\rho_S\,dS\); (b) flux through cylinder \(\rho=3\) needs the \(\mathbf{a}_\rho\) face only |

Group B/C/D swap: proj the other way; Cartesian \(\leftrightarrow\) sph; parallelepiped volume; cyl volume \(4<\rho<6\), \(30^\circ<\phi<60^\circ\), \(2<z<5\); irrotational constants + scalar \(V\); cube Gauss by **six faces**; disk force; energy / \(\rho_S\) on two spherical conductors.

**Group A Q7 algebra.** \(V=x^2 y z + A y^3 z\).

\[
\nabla^2 V=2yz + 6A y z=0\ \forall\ (x,y,z)\implies A=-1/3
\]

Then \(\mathbf{E}=-\nabla V\) with that \(A\), evaluate at \((2,1,-1)\).

**Group C volume:** \(\int_2^5 dz\int_{\pi/6}^{\pi/3}d\phi\int_4^6 \rho\,d\rho\). \(\int_4^6\rho\,d\rho=10\), \(\Delta\phi=\pi/6\), \(\Delta z=3\) \(\Rightarrow 5\pi\).

## 3.3 2023 Feb MST — attack sheet (30 marks)

| Q | Marks | What | Method |
|---|-------|------|--------|
| 1 | 6 | three distributions in \(z=0\): line \(y=4\to6\), arc \(\rho=4\), surface sector | \(Q=\int\rho_L d\ell\) or \(\int\rho_S\rho\,d\rho\,d\phi\); \(V_P=k\int dq/R\) with \(R=\sqrt{\rho'^2+25}\) at \(P(0,0,5)\) |
| 2 | 6 | spherical box volume, \(\lvert\mathbf{r}_B-\mathbf{r}_A\rvert\), total \(S\) | Block 1.1 |
| 3 | 6 | \(\rho_v=\nabla\cdot\mathbf{D}\); flux on \(z=1\) rectangle | **16 nC** flux; \(\rho_v=2+2z^2+2x^2\) |
| 4 | 6 | work along path vs shortest | **1530 J**, same on both, curl 0 |
| 5 | 4 | energy in \(6\,\mathrm{cm}<r<r_A\) | \(r_A\approx 6.54\,\mathrm{cm}\) |
| 6 | 2 | dipole potential at \(P\) | \(\approx 1.31\,\mathrm{V}\) |

Q1 figure (from the scan): \(\rho_{LA}=\pi\,\mathrm{nC/m}\) on \(x=0\), \(4\le y\le 6\); \(\rho_{LB}=1.5\,\mathrm{nC/m}\) on arc \(\rho=4\); \(\rho_{SC}=1\,\mathrm{nC/m}^2\) on the annular sector. Total \(V=\) sum of three scalars at \(P\).

## 3.4 Tutorial Sheet 2 — remaining numbers

Do Q2, Q5, Q6, Q9, Q10 the night after Block 1 if Block 3 still has time. Q9 is spherical flux of \(\mathbf{A}=r\mathbf{a}_r-3\mathbf{a}_\theta+5\phi\mathbf{a}_\phi\) out of \(0<r<4\), \(0<\theta<\pi/2\), \(0<\phi<\pi/2\) — use \(\nabla\cdot\mathbf{A}\) (sph formula) over the octant, not six ugly faces.

Q10: \(\int_v xy\,dv\) on the unit-x, unit-y, \(z:0\to2\) box \(=\int_0^1 x\,dx\int_0^1 y\,dy\int_0^2 dz=(1/2)(1/2)(2)=1/2\). Cyl \(\int \rho z\,dv\) for \(1\le\rho\le3\), \(0\le\phi\le\pi\), \(0\le z\le 2\): \(\int_1^3\rho^2 d\rho\int_0^\pi d\phi\int_0^2 z\,dz=(26/3)\cdot\pi\cdot 2=52\pi/3\).

## 3.5 Last 30 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet: \(d\mathbf{l}/d\mathbf{S}/dv\), the three \(\nabla\cdot\) lines, Gauss catalogue, \(W=Q\Delta V\), dipole \(V\), energy \(\frac12\int\mathbf{D}\cdot\mathbf{E}\,dv\). If a box is missing, that box is your first revision target, not a new chapter.
