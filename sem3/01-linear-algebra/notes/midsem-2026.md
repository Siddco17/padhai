# ECLA 301A — mid-sem, 7 September 2026

**Score: not in yet.**

Linear Algebra for Machine Learning Applications, Slot C. Monday 7 Sep 2026. 1 h 30 min, 30 marks. Answer all. Assume missing data.

Photos: [`../resources/pyqs/MST_2026_Sep07_p1.jpg`](../resources/pyqs/MST_2026_Sep07_p1.jpg), [`../resources/pyqs/MST_2026_Sep07_p2.jpg`](../resources/pyqs/MST_2026_Sep07_p2.jpg).

![LA mid page 1](../resources/pyqs/MST_2026_Sep07_p1.jpg)

![LA mid page 2](../resources/pyqs/MST_2026_Sep07_p2.jpg)

## 1 — inverse (3+2 = 5, CO2)

\[
A=\begin{bmatrix}2&1&0\\1&2&1\\0&1&2\end{bmatrix}
\]

(a) \(A^{-1}\) by Gauss–Jordan. (b) Show how Gauss–Jordan gives \(A^{-1}\). Hint: \(A=LU\).

## 2 — permutation, then elimination (1+2+2+1)

Elimination cannot start with \(a_{11}\) as the first pivot. Build the permutation \(P\).

(a) After \(P\), build the elimination matrices that take \(PA\) to upper-triangular \(U\).

(b) \(T=E_{32}E_{31}P\). Compute \(T\), verify \(TA=U\), compute \(TA\).

(c) Solve for \(\theta\).

The coefficient matrix for this question is on the photo; the print is the source if a digit is faint.

## 3 — \(\Phi\theta=y\) (CO1, CO2)

Noiseless model, four parameters.

\[
\Phi=\begin{bmatrix}1&0&1&2\\0&1&1&1\\1&1&2&3\end{bmatrix},\quad
y=\begin{bmatrix}4\\1\\5\end{bmatrix}
\]

(a) Without extra elimination, name a dependency. Pivot and free variables. [1]

(b) One particular solution \(\theta_p\). [1]

(c) Basis for \(N(\Phi)\), and the full family of exact parameter vectors. [3]

(d) For \(\theta_{\text{new}}^\mathsf{T}=\begin{bmatrix}0&0&1&1\end{bmatrix}\), give two parameter vectors that fit the data exactly but predict different values on this new input. Why that matters. [1]

## 4 — do not multiply (2+1+1 = 4)

\[
A=\begin{bmatrix}2&4\\8&10\\4&14\end{bmatrix}
\begin{bmatrix}6&0&6\\2&2&4\end{bmatrix}
\]

(a) A basis for the column space of \(A\) and a basis for the row space, without doing the product. Justify.

(b) \(\dim C(A)\) and \(\dim C(A^\mathsf{T})\).

(c) Is \(A\) invertible? Justify.

## 5 — bases and nullities (1+1+1.5+1.5 = 5, CO2)

(a) \(A\) is \(6\times 6\) and its columns are a basis for \(\mathbb{R}^6\). Solve \(AX=0\). Justify.

(b) Same \(A\). Condition on \(b\) so that \(Ax=b\) has a solution. Justify.

(c) A different \(C\) has 6 rows and 8 columns. Can you say the columns of \(C\) are not all linearly independent? Why?

(d) \(D\) is \(67\times 19\) with rank 13. How many independent vectors satisfy \(DX=0\)? Justify.

## 6 — design matrix (1+1+2 = 4, CO2)

Feature columns. Read the photo if a entry looks off; this is the print as read:

\[
a_1=\begin{bmatrix}1\\0\\1\\2\\1\end{bmatrix},\;
a_2=\begin{bmatrix}0\\1\\1\\1\\2\end{bmatrix},\;
a_3=\begin{bmatrix}1\\1\\2\\3\\3\end{bmatrix},\;
a_4=\begin{bmatrix}2\\-1\\1\\3\\0\end{bmatrix},\;
X=\begin{bmatrix}a_1&a_2&a_3&a_4\end{bmatrix}
\]

(a) Relation between \(a_3\) and \(a_4\) without a full row reduction.

(b) Basis for \(C(X)\), and \(\operatorname{Rank}(X)\).

(c) Basis for \(N(X)\), and the rank–nullity check.
