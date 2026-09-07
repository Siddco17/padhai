# ECLA 301 / ECL3xx — MST formula sheet

**Read this as rendered math:** open [`midsem-formulas.html`](midsem-formulas.html) in a browser (Cursor’s markdown preview shows raw `\( \)`).

Rewrite this from memory in the last 20 minutes. Exact numbers, no floating-point rank, no SVD.

## \(Ax=b\) (column picture)

\(A\in\mathbb{R}^{m\times n}\), \(x\in\mathbb{R}^n\), \(b\in\mathbb{R}^m\). Rows = equations; columns = directions you mix.

\[
Ax = x_1 a_1+\cdots+x_n a_n
\]

Solvable \(\iff b\in C(A)\). Homogeneous \(Ax=0\) always has at least \(x=0\).

Real linear systems: **0, 1, or infinitely many**. Two distinct solutions \(\Rightarrow\) the whole line \(x_1+t(x_2-x_1)\) also works.

Do **not** call a missed \(b\) “affine.” Affine = the **solution set** \(\{x:Ax=b\}\) when \(b\neq 0\) (a shifted \(N(A)\)). A vector \(c\notin C(A)\) is simply not reachable.

## Gaussian elimination

Multiplier under pivot \(a_{kk}\): \(m_{ik}=a_{ik}/a_{kk}\), then \(R_i\leftarrow R_i-m_{ik}R_k\).

Zero proposed pivot + nonzero below \(\Rightarrow\) **row exchange**. Zero proposed pivot and zeros below \(\Rightarrow\) missing pivot (rank drop / possible \(0=d\)).

Forward: \(Ax=b\to Ux=c\). Back-sub from the bottom. Pivots need **not** be 1.

Terminal rows: \([0\cdots 0\mid 0]\) = redundant; \([0\cdots 0\mid d]\) with \(d\neq 0\) = **inconsistent**.

## Inverse (square)

\(A^{-1}\) exists \(\iff\) \(n\) pivots \(\iff r=n\) \(\iff N(A)=\{0\}\) \(\iff Ax=b\) unique for every \(b\).

If \(Ax=0\) for some \(x\neq 0\), \(A\) is singular. Do **not** form \(A^{-1}\) to solve one \(Ax=b\); eliminate once.

\[
\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1}
=\frac{1}{ad-bc}
\begin{bmatrix}d&-b\\-c&a\end{bmatrix}
\quad(ad-bc\neq 0)
\]

Gauss–Jordan: \([A\mid I]\to[I\mid A^{-1}]\). Missing left pivot \(\Rightarrow\) no inverse. \((AB)^{-1}=B^{-1}A^{-1}\).

## Elimination matrices and \(LU\)

Build \(E_{ij}\) by doing \(R_i\leftarrow R_i-m_{ij}R_j\) on \(I\). Combined \(E=E_{\mathrm{last}}\cdots E_{\mathrm{first}}\), so \(EA=U\).

Without swaps: \(A=LU\). \(L\) has 1s on the diagonal and the **multipliers** (not the minus signs) below. With swaps: \(PA=LU\), \(P^{-1}=P^T\).

## Four spaces (after every elimination)

\(A\) is \(m\times n\), rank \(r=\#\) pivots.

| Space | Lives in | What | Dimension | How to get a basis |
|--------|----------|------|-----------|-------------------|
| Column \(C(A)\) | \(\mathbb{R}^m\) | mixes of **columns**; image of \(T\) | \(r\) | original columns in **pivot positions** |
| Row \(C(A^T)\) | \(\mathbb{R}^n\) | mixes of **rows** | \(r\) | nonzero rows of \(U\) |
| Null \(N(A)\) | \(\mathbb{R}^n\) | \(Ax=0\); kernel | \(n-r\) | one special per free variable |
| Left null \(N(A^T)\) | \(\mathbb{R}^m\) | \(A^Ty=0\) i.e. \(y^TA=0\) | \(m-r\) | row-dependence weights, or \(N(A^T)\) |

Row rank = column rank. **Rank–nullity:** \(r+\dim N(A)=n\). Also \(r+\dim N(A^T)=m\).

If they only ask \(\dim N(A)\), do not solve \(Ax=0\): answer \(n-r\).

**Pitfall:** row ops change the column vectors. Pivot **positions** from \(U\), basis vectors from **original** \(A\).

Special-solution recipe: that free \(=1\), other frees \(=0\), solve pivots. **Keep the minus signs** (\(x_{\mathrm{pivot}}=-\)(free terms)). \(N(A)=\operatorname{span}\{\text{the specials}\}\), not \(\operatorname{span}\{(s,t)\}\).

## Complete solution

\[
x=x_p+x_h,\qquad Ax_p=b,\quad Ax_h=0
\]

Consistent + frees: set frees to 0 for a convenient \(x_p\), then add the specials. Inconsistent: stop at \(0=d\).

## Subspace vs affine

Subspace: contains \(0\), closed under \(+\) and scalar \(\cdot\). \(N(A)\) always is. \(\{x:Ax=b\}\) with \(b\neq 0\) is affine, not a subspace. Nonnegative orthant fails \(-\).

Span is always a subspace. Independent: \(Ac=0\Rightarrow c=0\). Basis = independent spanning set. \(\dim U=\) size of any basis.

## Linear maps \(T(x)=Ax\)

Necessary: \(T(0)=0\). Affine \(Ax+b\) with \(b\neq 0\) is **not** linear (shift is add, not a mix of columns).

Columns of \(A\) are \(T(e_j)\). One-to-one \(\iff N=\{0\}\). Onto \(\mathbb{R}^m\) \(\iff C(A)=\mathbb{R}^m\).

| Shape + full rank | 1–1 | Onto |
|-------------------|-----|------|
| Tall \(m>n\), \(r=n\) | yes | no |
| Wide \(m<n\), \(r=m\) | no | yes |
| Square \(r=n\) | yes | yes |

Rotation (ccw), reflection, projection in \(\mathbb{R}^2\):

\[
R_\theta=\begin{bmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{bmatrix}
\quad
90^\circ:\ \begin{bmatrix}0&-1\\1&0\end{bmatrix}
\]

\[
\text{\(y\)-axis flip }\begin{bmatrix}-1&0\\0&1\end{bmatrix}
\quad
\text{\(x\)-axis flip }\begin{bmatrix}1&0\\0&-1\end{bmatrix}
\quad
\text{\(y=x\) }\begin{bmatrix}0&1\\1&0\end{bmatrix}
\]

\[
\text{project onto \(x\)-axis }\ P=\begin{bmatrix}1&0\\0&0\end{bmatrix}
\quad
C(P)=\operatorname{span}\{e_1\},\ N(P)=\operatorname{span}\{e_2\}
\]

Reflection/rotation: two pivots, invertible. Projection: singular, \(P^2=P\). Flip \(\neq\) squash.

## Least squares (projection onto \(C(A)\))

If \(b\notin C(A)\), no exact \(\theta\). Best \(p=A\hat\theta\in C(A)\) has error \(e=b-p\perp C(A)\):

\[
A^Te=0 \implies A^TA\hat\theta=A^Tb
\]

Then \(p=A\hat\theta\), \(e=b-p\). Check \(A^Te=0\). One-column all-ones: \(\hat\theta=\bar b\).

## Transpose (1-markers)

\((AB)^T=B^TA^T\). \(A^TA\) and \(AA^T\) are symmetric. Associativity yes; commutativity no.

## Numbers that keep appearing

- Lecture elim: pivots \(2,1,4\), \(x=(-1,2,2)\).
- PS2 #5: zero \(a_{11}\), swap, \(\theta=(2,-1,1)\).
- \(A=\begin{bmatrix}1&2\\3&5\end{bmatrix}\Rightarrow A^{-1}=\begin{bmatrix}-5&2\\3&-1\end{bmatrix}\).
- Wide rank-2 map \(\mathbb{R}^4\to\mathbb{R}^3\): \(r=2\), \(\dim N=2\), neither 1–1 nor onto. Specials \(\begin{bmatrix}-1\\-1\\1\\0\end{bmatrix},\begin{bmatrix}-2\\-1\\0\\1\end{bmatrix}\).
- Square invertible \(\iff N(A)=\{0\}\iff r=n\).
