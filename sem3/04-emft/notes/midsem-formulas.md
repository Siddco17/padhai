# ECL305 EMFT — MST formula sheet

Rewrite this from memory in the last 30 minutes. Free space: \(\varepsilon_0=10^{-9}/(36\pi)\,\mathrm{F/m}\), \(1/(4\pi\varepsilon_0)=9\times10^9\). Units on every boxed answer.

## Vector algebra (Block 0)

\[
\mathbf{A}=A_x\mathbf{a}_x+A_y\mathbf{a}_y+A_z\mathbf{a}_z,\qquad
\lvert\mathbf{A}\rvert=\sqrt{A_x^2+A_y^2+A_z^2},\qquad
\hat{\mathbf{A}}=\mathbf{A}/\lvert\mathbf{A}\rvert
\]

**Dot** (work, flux, projection): \(\mathbf{A}\cdot\mathbf{B}=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\cos\theta=A_xB_x+A_yB_y+A_zB_z\).

Scalar projection of \(\mathbf{A}\) on \(\mathbf{B}\): \(\mathbf{A}\cdot\hat{\mathbf{B}}\). Vector projection: \((\mathbf{A}\cdot\hat{\mathbf{B}})\hat{\mathbf{B}}\).

**Cross** (area, “perpendicular”): \(\mathbf{A}\times\mathbf{B}=\lvert\mathbf{A}\rvert\lvert\mathbf{B}\rvert\sin\theta\,\hat{\mathbf{n}}\), right-hand \(\hat{\mathbf{n}}\). Cartesian:

\[
\mathbf{A}\times\mathbf{B}=\begin{vmatrix}\mathbf{a}_x&\mathbf{a}_y&\mathbf{a}_z\\ A_x&A_y&A_z\\ B_x&B_y&B_z\end{vmatrix}
\]

Parallelepiped volume: \(\lvert\mathbf{A}\cdot(\mathbf{B}\times\mathbf{C})\rvert\).

Position / distance: \(\mathbf{R}_{12}=\mathbf{r}_2-\mathbf{r}_1\), \(\mathbf{a}_{12}=\mathbf{R}_{12}/R_{12}\).

**Field:** a rule that assigns a scalar or a vector to **every point**. \(\mathbf{E}(2,0,0)\) is one arrow; \(\mathbf{E}(x,y,z)\) is the whole picture.

1-markers: \(\nabla\) of a **vector**, \(\nabla\cdot\) of a **scalar**, \(\nabla\times\) of a **scalar** — **not defined**.

## Coordinates

| | Cartesian \((x,y,z)\) | Cylindrical \((\rho,\phi,z)\) | Spherical \((r,\theta,\phi)\) |
|--|----------------------|-------------------------------|------------------------------|
| ranges | \(-\infty\) | \(\rho\ge0\), \(\phi\in[0,2\pi)\), \(z\in\mathbb{R}\) | \(r\ge0\), \(\theta\in[0,\pi]\), \(\phi\in[0,2\pi)\) |
| to Cart. | — | \(x=\rho\cos\phi\), \(y=\rho\sin\phi\), \(z=z\) | \(x=r\sin\theta\cos\phi\), \(y=r\sin\theta\sin\phi\), \(z=r\cos\theta\) |
| from Cart. | — | \(\rho=\sqrt{x^2+y^2}\), \(\phi=\tan^{-1}(y/x)\) | \(r=\sqrt{x^2+y^2+z^2}\), \(\theta=\cos^{-1}(z/r)\) |
| \(d\mathbf{l}\) | \(dx\,\mathbf{a}_x+dy\,\mathbf{a}_y+dz\,\mathbf{a}_z\) | \(d\rho\,\mathbf{a}_\rho+\rho\,d\phi\,\mathbf{a}_\phi+dz\,\mathbf{a}_z\) | \(dr\,\mathbf{a}_r+r\,d\theta\,\mathbf{a}_\theta+r\sin\theta\,d\phi\,\mathbf{a}_\phi\) |
| \(d\mathbf{S}\) | \(dy\,dz\,\mathbf{a}_x\) etc. | \(\rho\,d\phi\,dz\,\mathbf{a}_\rho\); \(d\rho\,dz\,\mathbf{a}_\phi\); \(\rho\,d\rho\,d\phi\,\mathbf{a}_z\) | \(r^2\sin\theta\,d\theta\,d\phi\,\mathbf{a}_r\); \(r\sin\theta\,dr\,d\phi\,\mathbf{a}_\theta\); \(r\,dr\,d\theta\,\mathbf{a}_\phi\) |
| \(dv\) | \(dx\,dy\,dz\) | \(\rho\,d\rho\,d\phi\,dz\) | \(r^2\sin\theta\,dr\,d\theta\,d\phi\) |

**Cyl unit vectors** (function of \(\phi\)):

\[
\mathbf{a}_\rho=\cos\phi\,\mathbf{a}_x+\sin\phi\,\mathbf{a}_y,\qquad
\mathbf{a}_\phi=-\sin\phi\,\mathbf{a}_x+\cos\phi\,\mathbf{a}_y
\]

\[
A_\rho=A_x\cos\phi+A_y\sin\phi,\qquad A_\phi=-A_x\sin\phi+A_y\cos\phi
\]

**Sph unit vectors:**

\[
\begin{aligned}
\mathbf{a}_r&=\sin\theta\cos\phi\,\mathbf{a}_x+\sin\theta\sin\phi\,\mathbf{a}_y+\cos\theta\,\mathbf{a}_z\\
\mathbf{a}_\theta&=\cos\theta\cos\phi\,\mathbf{a}_x+\cos\theta\sin\phi\,\mathbf{a}_y-\sin\theta\,\mathbf{a}_z\\
\mathbf{a}_\phi&=-\sin\phi\,\mathbf{a}_x+\cos\phi\,\mathbf{a}_y
\end{aligned}
\]

\[
\begin{aligned}
A_r&=A_x\sin\theta\cos\phi+A_y\sin\theta\sin\phi+A_z\cos\theta\\
A_\theta&=A_x\cos\theta\cos\phi+A_y\cos\theta\sin\phi-A_z\sin\theta\\
A_\phi&=-A_x\sin\phi+A_y\cos\phi
\end{aligned}
\]

**Always convert at a point** (plug that point’s \(\phi,\theta\)). Do not leave \(\mathbf{a}_\rho\) mixed with \(\mathbf{a}_x\) in one expression.

Cross-system dots (2022 1-markers): \(\mathbf{a}_x\cdot\mathbf{a}_\rho=\cos\phi\), \(\mathbf{a}_y\cdot\mathbf{a}_\rho=\sin\phi\), \(\mathbf{a}_z\cdot\mathbf{a}_\rho=0\).

## Grad, div, curl, Laplacian

Cartesian \(\nabla=\mathbf{a}_x\partial_x+\mathbf{a}_y\partial_y+\mathbf{a}_z\partial_z\).

**Gradient** (max space-rate of a scalar; \(\mathbf{E}=-\nabla V\)):

\[
\nabla V=\frac{\partial V}{\partial x}\mathbf{a}_x+\frac{\partial V}{\partial y}\mathbf{a}_y+\frac{\partial V}{\partial z}\mathbf{a}_z
\]

Cyl: \(\nabla V=\partial_\rho V\,\mathbf{a}_\rho+(1/\rho)\partial_\phi V\,\mathbf{a}_\phi+\partial_z V\,\mathbf{a}_z\).

Sph: \(\nabla V=\partial_r V\,\mathbf{a}_r+(1/r)\partial_\theta V\,\mathbf{a}_\theta+(1/(r\sin\theta))\partial_\phi V\,\mathbf{a}_\phi\).

\(dV=\nabla V\cdot d\mathbf{l}\). Max when \(d\mathbf{l}\parallel\nabla V\).

**Divergence** (outward flux per volume; source / sink):

\[
\nabla\cdot\mathbf{A}=\lim_{\Delta v\to0}\frac{\oint\mathbf{A}\cdot d\mathbf{S}}{\Delta v}
\]

Cart: \(\partial_x A_x+\partial_y A_y+\partial_z A_z\).

Cyl: \((1/\rho)\partial_\rho(\rho A_\rho)+(1/\rho)\partial_\phi A_\phi+\partial_z A_z\).

Sph: \((1/r^2)\partial_r(r^2 A_r)+(1/(r\sin\theta))\partial_\theta(\sin\theta\,A_\theta)+(1/(r\sin\theta))\partial_\phi A_\phi\).

**Divergence theorem:** \(\oint_S\mathbf{A}\cdot d\mathbf{S}=\int_v(\nabla\cdot\mathbf{A})\,dv\).

**Curl** (circulation per area; rotation):

\[
(\nabla\times\mathbf{A})\cdot\mathbf{a}_n=\lim_{\Delta S\to0}\frac{\oint\mathbf{A}\cdot d\mathbf{l}}{\Delta S}
\]

Cart: \(\nabla\times\mathbf{A}=\begin{vmatrix}\mathbf{a}_x&\mathbf{a}_y&\mathbf{a}_z\\ \partial_x&\partial_y&\partial_z\\ A_x&A_y&A_z\end{vmatrix}\).

Cyl: \(\displaystyle\frac{1}{\rho}\begin{vmatrix}\mathbf{a}_\rho&\rho\mathbf{a}_\phi&\mathbf{a}_z\\ \partial_\rho&\partial_\phi&\partial_z\\ A_\rho&\rho A_\phi&A_z\end{vmatrix}\).

Sph: \(\displaystyle\frac{1}{r^2\sin\theta}\begin{vmatrix}\mathbf{a}_r&r\mathbf{a}_\theta&r\sin\theta\,\mathbf{a}_\phi\\ \partial_r&\partial_\theta&\partial_\phi\\ A_r&r A_\theta&r\sin\theta\,A_\phi\end{vmatrix}\).

**Stokes:** \(\oint_L\mathbf{A}\cdot d\mathbf{l}=\iint_S(\nabla\times\mathbf{A})\cdot d\mathbf{S}\).

**Laplacian** \(\nabla^2 V=\nabla\cdot(\nabla V)\). Cart: \(\partial_{xx}V+\partial_{yy}V+\partial_{zz}V\).

Cyl: \(\dfrac{1}{\rho}\partial_\rho(\rho\partial_\rho V)+\dfrac{1}{\rho^2}\partial_{\phi\phi}V+\partial_{zz}V\).

Sph: \(\dfrac{1}{r^2}\partial_r(r^2\partial_r V)+\dfrac{1}{r^2\sin\theta}\partial_\theta(\sin\theta\,\partial_\theta V)+\dfrac{1}{r^2\sin^2\theta}\partial_{\phi\phi}V\).

Poisson / Laplace: \(\nabla^2 V=-\rho_v/\varepsilon\), charge-free \(\nabla^2 V=0\).

Identities that kill algebra: \(\nabla\times(\nabla V)=\mathbf{0}\) (conservative \(\Leftrightarrow\) irrotational). \(\nabla\cdot(\nabla\times\mathbf{A})=0\).

## Electrostatics

**Coulomb** (free space):

\[
\mathbf{F}_{12}=\frac{1}{4\pi\varepsilon_0}\frac{Q_1 Q_2}{R_{12}^2}\mathbf{a}_{12},\qquad
\mathbf{E}=\frac{\mathbf{F}}{Q}=\frac{1}{4\pi\varepsilon_0}\frac{Q}{R^2}\mathbf{a}_R
\]

Continuous:

\[
Q=\int\rho_L\,d\ell=\int\rho_S\,dS=\int\rho_v\,dv,\qquad
\mathbf{E}=\frac{1}{4\pi\varepsilon_0}\int\frac{dq}{R^2}\mathbf{a}_R
\]

\(\rho_L\) in C/m, \(\rho_S\) in C/m\(^2\), \(\rho_v\) in C/m\(^3\). Superpose vectors, not magnitudes, unless symmetry kills the other components.

**\(\mathbf{D}\) vs \(\mathbf{E}\):**

\[
\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P}=\varepsilon\mathbf{E}=\varepsilon_0\varepsilon_r\mathbf{E}
\quad\text{(linear media)}
\]

In **free space** \(\mathbf{D}=\varepsilon_0\mathbf{E}\). Gauss (Maxwell): \(\oint\mathbf{D}\cdot d\mathbf{S}=Q_{\mathrm{enc,free}}\), point form \(\nabla\cdot\mathbf{D}=\rho_v\). Then \(\mathbf{E}=\mathbf{D}/\varepsilon\).

**Gauss catalogue** (use only if symmetry makes \(\mathbf{D}\) constant on the Gaussian surface):

| Source | Gaussian surface | \(\mathbf{D}\) |
|--------|------------------|---------------|
| point \(Q\) / sphere, \(r>a\) | sphere | \(Q/(4\pi r^2)\,\mathbf{a}_r\) |
| uniform ball \(\rho_v\), \(r<a\) | sphere | \(\rho_v r/3\,\mathbf{a}_r\) |
| infinite line \(\rho_L\) | cylinder | \(\rho_L/(2\pi\rho)\,\mathbf{a}_\rho\) |
| infinite cylinder, inside | cylinder | \(\rho_v\rho/2\,\mathbf{a}_\rho\) |
| infinite sheet \(\rho_S\) | pillbox | \((\rho_S/2)\,\mathbf{a}_n\) (each side) |

Infinite line \(\mathbf{E}=\rho_L/(2\pi\varepsilon_0\rho)\,\mathbf{a}_\rho\). Infinite sheet \(\mathbf{E}=\rho_S/(2\varepsilon_0)\,\mathbf{a}_n\).

**Potential** (conservative electrostatic \(\mathbf{E}\)):

\[
V_{AB}=V_A-V_B=-\int_B^A\mathbf{E}\cdot d\mathbf{l},\qquad
\mathbf{E}=-\nabla V
\]

Point charge: \(V=Q/(4\pi\varepsilon_0 r)\) with \(V(\infty)=0\). Superpose scalars.

Work to carry \(Q\) from \(A\) to \(B\) (**Sadiku / VNIT:** external agent):

\[
W=-Q\int_A^B\mathbf{E}\cdot d\mathbf{l}=Q(V_B-V_A)
\]

If \(\nabla\times\mathbf{E}=\mathbf{0}\), path does not matter; shortest path = any path. If curl \(\neq\mathbf{0}\), the two paths differ — **say so**.

**Dipole** \(\mathbf{p}=Q\mathbf{d}\) (\(\mathbf{d}\) from \(-Q\) to \(+Q\)):

\[
V=\frac{\mathbf{p}\cdot\mathbf{a}_R}{4\pi\varepsilon_0 R^2},\qquad
\mathbf{E}=\frac{1}{4\pi\varepsilon_0 R^3}\bigl(2p\cos\theta\,\mathbf{a}_r+p\sin\theta\,\mathbf{a}_\theta\bigr)
\]

**Energy** in the field:

\[
W_E=\frac12\sum Q_i V_i=\frac12\int\rho_v V\,dv=\frac12\int\mathbf{D}\cdot\mathbf{E}\,dv=\frac{\varepsilon}{2}\int E^2\,dv
\]

Spherical shell of field \(a<r<b\) around a total charge \(Q\): \(W_E=\dfrac{Q^2}{8\pi\varepsilon_0}\left(\dfrac{1}{a}-\dfrac{1}{b}\right)\) (region outside a conducting / uniformly charged sphere of radius \(\le a\)).

## Numbers that keep appearing

- \(k=9\times10^9\). \(1\,\mathrm{nC}=10^{-9}\,\mathrm{C}\), \(1\,\mu\mathrm{C}=10^{-6}\,\mathrm{C}\).
- Closed-surface flux of \(\mathbf{D}\) **is** \(Q_{\mathrm{enc}}\) even when \(\mathbf{D}\) is not symmetric — then use \(\int(\nabla\cdot\mathbf{D})\,dv\).
- Outward \(d\mathbf{S}\) on the **bottom** cap of a cylinder is \(-\mathbf{a}_z\).
- 2022 Group A Q6-style: three infinite lines \(\to\) three \(\mathbf{a}_\rho\) superpositions, not one \(1/R^2\).
