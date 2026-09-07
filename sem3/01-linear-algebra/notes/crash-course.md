# ECLA 301 crash course — teach + work every MST-style problem

How to use: one block per sitting. Read the concept, cover the “you try” line, then uncover the solution. Files: `midsem-map.md`, `midsem-formulas.md`. Exact arithmetic; least squares / eigen / SVD are later.

---

# Block 0 — vectors and what \(Ax=b\) means (0.5 h)

You do not need a full “vector space axioms” course. You need four habits this paper uses on every page.

## 0.1 A vector is an ordered list

One observation is one column. Equal vectors: same dimension **and** same entries in the same order. Add / scale componentwise.

A **linear** combination is \(c_1v_1+\cdots+c_kv_k\). An **affine** combination has coefficients summing to 1 (midpoint \(=\tfrac12 x+\tfrac12 y\)). A **convex** combination also has nonnegative weights.

## 0.2 Row picture vs column picture

System \(2x-y=1\), \(x+y=5\).

- **Row picture:** two lines; solution = intersection \((2,3)\).
- **Column picture:** find weights so

\[
x\begin{bmatrix}2\\1\end{bmatrix}+y\begin{bmatrix}-1\\1\end{bmatrix}=\begin{bmatrix}1\\5\end{bmatrix}.
\]

Same algebra, two languages. Matrix form \(Ax=b\) with \(A\in\mathbb{R}^{m\times n}\): \(m\) equations, \(n\) unknowns.

## 0.3 Three outcomes, not four

A real linear system has no solution, one solution, or infinitely many. Parallel / redundant rows are the geometry; elimination is how you see it on paper.

## 0.4 Exact ML models at this stage

When notes write \(A\theta=b\) or \(X\theta=y\), observations are **noiseless**. If two rows of \(A\) are dependent but the targets are not, the exact model is impossible — that is inconsistency, not “fit approximately.” Approximate fitting is least squares, later.

### Worked: PS2 #1 (difference + midpoint)

\(x_{\mathrm{before}}=(6,68,72)\), \(x_{\mathrm{after}}=(8,76,78)\).

\[
\Delta x=(2,8,6),\qquad \tfrac12 x_{\mathrm{before}}+\tfrac12 x_{\mathrm{after}}=(7,72,75).
\]

Difference = change. Midpoint = convex combination.

**You must be able to say “\(Ax=b\) means \(b\) is a combination of the columns” with the book closed.** That is Block 0 done.

---

# Block 1 — elimination, \(E\)-matrices, inverse (1.5 h)

## 1.1 Why elimination is legal

Replace \(E_2\) by \(E_2-mE_1\). If \(x\) solved both originals, it solves the combination. Adding \(mE_1\) back recovers \(E_2\). Same solution set, simpler form.

Multiplier: \(m_{ik}=\) (entry to kill) / (pivot). Forward elimination goes **left-to-right, top-to-bottom**. Back-sub goes **bottom-to-top**. Pivots need not be 1.

Zero in the pivot slot is **not** automatic failure: look below it. Nonzero below \(\Rightarrow\) swap rows. All zeros below \(\Rightarrow\) missing pivot.

## 1.2 Worked: lecture \(3\times 3\) (`Gaussian Elimination.pdf`)

\[
\begin{bmatrix}2&4&-2\\4&9&-3\\-2&-3&7\end{bmatrix}
\begin{bmatrix}x_1\\x_2\\x_3\end{bmatrix}
=
\begin{bmatrix}2\\8\\10\end{bmatrix}.
\]

Augmented:

\[
\left[\begin{array}{ccc|c}2&4&-2&2\\4&9&-3&8\\-2&-3&7&10\end{array}\right]
\]

\(m_{21}=4/2=2\), \(R_2\leftarrow R_2-2R_1\) \(\to[0,1,1\mid 4]\).

\(m_{31}=-2/2=-1\), \(R_3\leftarrow R_3+R_1\) \(\to[0,1,5\mid 12]\).

Second pivot \(1\), \(m_{32}=1\), \(R_3\leftarrow R_3-R_2\) \(\to[0,0,4\mid 8]\).

Pivots **\(2,1,4\)**. Back-sub: \(x_3=2\), \(x_2+2=4\Rightarrow x_2=2\), \(2x_1+8-4=2\Rightarrow x_1=-1\).

\[
x=\begin{bmatrix}-1\\2\\2\end{bmatrix}.
\]

## 1.3 Elimination is a matrix

Do the row operation on \(I\) to get \(E_{ij}\). Then \(E_{ij}A\) does it to every column of \(A\), and \(E_{ij}b\) does it to the right-hand side. Combined \(E=E_{\mathrm{last}}\cdots E_{\mathrm{first}}\) (last operation on the **left**), \(EA=U\), \(Ux=Eb\).

Without swaps, \(L=E^{-1}\) stores the multipliers below the diagonal and \(A=LU\). The product of the \(E\)'s themselves is **not** \(L\): successive operations interact (Strang’s \(20\) off-diagonal), and undoing in reverse order cleans that up.

With a swap, permute first: \(PA=LU\).

### Worked: PS2 #9 (all \(E_{ij}\), then solve)

\[
A=\begin{bmatrix}1&2&0\\3&7&1\\2&5&4\end{bmatrix},\quad
b=\begin{bmatrix}5\\18\\16\end{bmatrix}.
\]

Operations: \(R_2\leftarrow R_2-3R_1\), \(R_3\leftarrow R_3-2R_1\), \(R_3\leftarrow R_3-R_2\).

\[
E_{21}=\begin{bmatrix}1&0&0\\-3&1&0\\0&0&1\end{bmatrix},\
E_{31}=\begin{bmatrix}1&0&0\\0&1&0\\-2&0&1\end{bmatrix},\
E_{32}=\begin{bmatrix}1&0&0\\0&1&0\\0&-1&1\end{bmatrix}.
\]

\[
E=E_{32}E_{31}E_{21}=\begin{bmatrix}1&0&0\\-3&1&0\\1&-1&1\end{bmatrix},\quad
EA=U=\begin{bmatrix}1&2&0\\0&1&1\\0&0&3\end{bmatrix},\quad
Eb=\begin{bmatrix}5\\3\\3\end{bmatrix}.
\]

Back-sub: \(x_3=1\), \(x_2=2\), \(x_1=1\).

**Check:** \(A(1,2,1)^T=(5,18,16)^T\). The unknown \(x\) never changes; \(E\) changes the equations.

### Worked: PS2 #5 (zero first pivot) — cover, then uncover

\[
A=\begin{bmatrix}0&1&2\\1&1&1\\2&1&3\end{bmatrix},\quad
b=\begin{bmatrix}1\\2\\6\end{bmatrix}.
\]

Swap \(R_1\leftrightarrow R_2\). Then \(R_3\leftarrow R_3-2R_1\) and \(R_3\leftarrow R_3+R_2\):

\[
\left[\begin{array}{ccc|c}1&1&1&2\\0&1&2&1\\0&0&3&3\end{array}\right]
\Rightarrow
\theta=\begin{bmatrix}2\\-1\\1\end{bmatrix}.
\]

Insight: a zero proposed pivot is a **swap**, not a funeral.

### Worked: PS2 #10 (permutation matrix)

\(A\) with first row \((0,2,1)\). \(P\) swaps rows 1 and 2. Then eliminate \(R_3\leftarrow R_3-2R_1\), \(R_3\leftarrow R_3-\tfrac12 R_2\). Last row \([0\ 0\ {-5/2}\mid -5]\) \(\Rightarrow\theta_3=2\), \(\theta_2=-1\), \(\theta_1=1\).

## 1.4 Inverse

Square \(A\) is invertible \(\iff\) elimination produces **\(n\) pivots**. Then \(Ax=b\) has exactly one \(x=A^{-1}b\) for every \(b\). If \(Ax=0\) for some \(x\neq 0\), \(A\) is singular (three views of the same failure: missing pivot, nontrivial nullspace, \(ad-bc=0\) in \(2\times 2\)).

\[
\begin{bmatrix}a&b\\c&d\end{bmatrix}^{-1}=\frac{1}{ad-bc}\begin{bmatrix}d&-b\\-c&a\end{bmatrix}
\quad(ad-bc\neq 0).
\]

Gauss–Jordan: \([A\mid I]\to[I\mid A^{-1}]\). Same operations as solving \(Ax=e_1,\ldots,e_n\) at once.

\((AB)^{-1}=B^{-1}A^{-1}\): undo in reverse order.

### Worked: \(2\times 2\) from the inverse lecture / PS2 #11

\(A=\begin{bmatrix}2&3\\4&7\end{bmatrix}\), \(ad-bc=2\), \(A^{-1}=\begin{bmatrix}7/2&-3/2\\-2&1\end{bmatrix}\).

PS2 #11: \(A=\begin{bmatrix}1&2\\3&5\end{bmatrix}\), \(ad-bc=-1\), \(A^{-1}=\begin{bmatrix}-5&2\\3&-1\end{bmatrix}\). Then \(Y=AX\) and \(A^{-1}Y=X\): one inverse recovers **every** sample column.

### Worked: singular encoder (PS2 #12)

\[
S=\begin{bmatrix}1&1&0\\0&1&1\\1&2&1\end{bmatrix},\quad R_3=R_1+R_2.
\]

Missing pivot \(\Rightarrow\) singular. \(Sz=0\) for \(z=(-1,1,-1)\). For \(x=(2,0,1)\), \(\tilde x=x+z=(1,1,0)\) has \(S\tilde x=Sx\). **Nullspace = invisible input change.** Gauss–Jordan on \([S\mid I]\) cannot produce \(I\).

### Worked: PS1 #2 (factor once, two right-hand sides)

\[
A=\begin{bmatrix}2&1&0\\4&3&1\\2&4&5\end{bmatrix}
=LU,\quad
L=\begin{bmatrix}1&0&0\\2&1&0\\1&3&1\end{bmatrix},\
U=\begin{bmatrix}2&1&0\\0&1&1\\0&0&2\end{bmatrix}.
\]

Multipliers \(\ell_{21}=2,\ell_{31}=1,\ell_{32}=3\). Solve \(LC=B\) then \(UX=C\) for two columns of \(B\). Same \(L,U\) twice.

## You-try checklist (Block 1)

1. Redo the lecture \(3\times 3\) on blank paper (pivots \(2,1,4\), \(x=(-1,2,2)\)).
2. Redo PS2 #5 and #9 with the solution covered.
3. Recite: \(n\) pivots \(\iff\) invertible \(\iff Ax=0\) only \(x=0\).
4. Write \(L\) from multipliers without forming \(E^{-1}\) by hand.

---

# Block 2 — solution structure (1 h)

## 2.1 Pivot vs free

After elimination, a column with a pivot is a **pivot variable**. A column without is **free**. Free variables parameterize \(N(A)\).

Special-solution recipe: for each free variable, set it to 1, the other frees to 0, solve the pivot equations of \(Ax=0\).

If every variable is a pivot (square, full rank), \(Ax=0\) has only \(x=0\).

## 2.2 The complete solution

Find one particular \(x_p\) with \(Ax_p=b\) (set frees to 0 if that is consistent). Add the general homogeneous piece:

\[
x=x_p+c_1 s_1+\cdots+c_k s_k.
\]

Proof in one line: \(A(x_p+x_h)=b+0\). Conversely, if \(Ax=b\) and \(Ax_p=b\) then \(A(x-x_p)=0\).

A particular solution is **not unique** — adding any \(s_i\) gives another particular. Two distinct solutions \(\Rightarrow\) infinitely many (\(x_1+t(x_2-x_1)\)).

Inconsistency: a row \([0\ \cdots\ 0\mid d]\) with \(d\neq 0\). Dependent rows of \(A\) force the same dependence on \(b\).

### Worked: solution-structure lecture example

\[
A=\begin{bmatrix}1&2&-1&3\\2&5&0&5\end{bmatrix},\quad
b=\begin{bmatrix}5\\11\end{bmatrix}.
\]

\(R_2\leftarrow R_2-2R_1\) \(\to\) pivots in columns 1,2; free \(x_3,x_4\).

\(x_p\) with \(x_3=x_4=0\): \(x_2=1\), \(x_1=3\). Homogeneous specials from the same \(U\):

\[
x=\begin{bmatrix}3\\1\\0\\0\end{bmatrix}
+s\begin{bmatrix}5\\-2\\1\\0\end{bmatrix}
+t\begin{bmatrix}-5\\1\\0\\1\end{bmatrix}.
\]

(The \(s,t\) vectors are the same specials as in the homogeneous warm-up in that lecture.)

### Worked: PS2 #6 (infinitely many parameters)

\[
\begin{bmatrix}1&0&1\\0&1&1\end{bmatrix}\theta=\begin{bmatrix}3\\2\end{bmatrix}.
\]

\(\theta_3=t\) free: \(\theta=(3,2,0)^T+t(-1,-1,1)^T\). Both \(t=0\) and \(t=1\) fit the **observed** equations. New feature \(\phi^T=[1\ 1\ 0]\) predicts \(5-2t\) — **5 vs 3**. Exact training fit \(\neq\) unique future prediction.

### Worked: PS2 #7 (contradiction)

Second row of \(A\) is twice the first, but \(7\neq 2\cdot 3\). Elimination: \(R_2\leftarrow R_2-2R_1\) produces \([0\ 0\ 0\mid 1]\). No \(\theta\).

## You-try checklist (Block 2)

1. From any \(U\), circle pivot columns, name free variables, write two special solutions.
2. Redo PS2 #6 and #7 covered.
3. One sentence: “If \(Xz=0\) and \(z\neq 0\), then \(\beta\) and \(\beta+z\) make the same training predictions.”

---

# Block 3 — span, basis, rank, maps (1.5 h)

## 3.1 Subspace test (Lecture 9, needed language)

Closed under addition and scalar multiplication (hence contains \(0\)). \(N(A)\) is always a subspace. A shifted plane \(x_1-2x_2+x_3=3\) is **affine**: origin fails.

Nonnegative features \(\{x_i\ge 0\}\) contain \(0\) but fail \(-\): not a subspace (PS2 #14).

Homogeneous score \(w^Tx\) cannot separate \(p\) from \(q=3p\) (same sign). Bias \(w^Tx+b\) can (PS2 #4). That is affine vs linear, not a new chapter.

## 3.2 Span and column space

\(\operatorname{span}\{v_i\}\) = everything reachable along those directions. Always a subspace.

\(C(A)=\operatorname{span}\{\text{columns}\}\). **\(Ax=b\) solvable \(\iff b\in C(A)\).** Elimination language (no \(0=d\) row) and subspace language (reachability) are the same question.

Independent: the only combination giving \(0\) is all coefficients \(0\). Test: solve \(Ac=0\). Dependent: a nontrivial relation, or one vector already in the span of the others.

Basis = independent spanning set. Dimension = how many directions you actually need. Coordinates in a basis are unique (solve \(Bc=\text{vector}\)).

**Pitfall:** after row reduction, take original columns in **pivot positions** as a basis of \(C(A)\). The reduced columns live in a different space.

### Worked: lecture opening / rank opening

\(v_1=(1,0,1)\), \(v_2=(0,1,1)\), \(v_3=(1,1,2)=v_1+v_2\). Three stored vectors, two directions. \(C(A)\) has basis \(\{v_1,v_2\}\), \(\dim=2\).

### Worked: PS2 #15 (is \(b\) reachable?)

\[
A=\begin{bmatrix}1&0\\2&1\\1&1\end{bmatrix},\quad
b=\begin{bmatrix}3\\7\\4\end{bmatrix},\quad
c=\begin{bmatrix}1\\0\\0\end{bmatrix}.
\]

\(b=3a_1+a_2\in C(A)\). For \(c\): first two equations force \(x_1=1\), \(x_2=-2\), third wants \(-1\neq 0\). \(c\notin C(A)\).

### Worked: PS2 #17 (nullspace basis)

\[
A=\begin{bmatrix}1&1&0&2\\0&1&1&-1\end{bmatrix}.
\]

Frees \(x_3=s\), \(x_4=t\). \(x_2=-s+t\), \(x_1=s-3t\).

\[
N(A)=\operatorname{span}\left\{
\begin{bmatrix}1\\-1\\1\\0\end{bmatrix},
\begin{bmatrix}-3\\1\\0\\1\end{bmatrix}
\right\},\quad \dim N(A)=2.
\]

Each free variable \(\to\) one special-solution basis vector.

### Worked: PS2 #18 (coordinates)

Basis \(b_1=(1,1)\), \(b_2=(2,-1)\) of \(\mathbb{R}^2\). \(x=(7,1)=3b_1+2b_2\), so \([x]_B=(3,2)\). The vector is unchanged; the language changed.

## 3.3 Rank

\(\operatorname{rank}(A)=\dim C(A)=\#\) pivots \(\le\min(m,n)\). Full rank means you hit that bound. **Invertible only if square and full rank.** A \(7\times 4\) of rank 4 is full **column** rank, not invertible.

Rank–nullity: \(\operatorname{rank}(A)+\dim N(A)=n\). Nullity \(=\) columns minus rank. If they ask only for \(\dim N(A)\) and give “four pivots, \(5\times 8\)”, answer **4** and stop.

Row rank = column rank (same number \(r\)). Spot obvious column relations **before** grinding (e.g. \(b_3=b_1+b_2\) \(\Rightarrow r\le 2\)).

\(T(x)=Ax\) is a linear map \(\mathbb{R}^n\to\mathbb{R}^m\). Image \(=C(A)\), kernel \(=N(A)\). Columns of \(A\) are \(T(e_j)\). Injective \(\iff N=\{0\}\) \(\iff\) full column rank. Surjective \(\iff C(A)=\mathbb{R}^m\) \(\iff\) full row rank. \(T(0)\) must be \(0\); \(Ax+b\) with \(b\neq 0\) is affine, not linear.

### Worked: PS2 #19 (complete rank-2 map) — cover, then uncover

\[
A=\begin{bmatrix}1&0&1&2\\0&1&1&1\\1&1&2&3\end{bmatrix},\quad T:\mathbb{R}^4\to\mathbb{R}^3,\ T(x)=Ax.
\]

Row 3 = row 1 + row 2, so \(r\le 2\). First two columns independent \(\Rightarrow r=2\). Image basis = those original columns. Frees \(x_3,x_4\):

\[
N(A)=\operatorname{span}\left\{
\begin{bmatrix}-1\\-1\\1\\0\end{bmatrix},
\begin{bmatrix}-2\\-1\\0\\1\end{bmatrix}
\right\},\quad \dim N=2.
\]

Check: \(4=2+2\). Kernel nontrivial \(\Rightarrow\) not injective. Image plane in \(\mathbb{R}^3\) \(\Rightarrow\) not surjective.

### Worked: PS2 #20 (map from images of \(e_i\))

\(T(e_1)=(1,2,0)\), \(T(e_2)=(2,-1,1)\) \(\Rightarrow\) those are the columns of \(A\). \(T(3,-2)=3T(e_1)-2T(e_2)=(-1,8,-2)\). Rank 2, domain \(\mathbb{R}^2\) \(\Rightarrow\) injective, not surjective (image \(\subset\mathbb{R}^3\)).

### Worked: PS2 #21 (rank test vs column space)

\(A=\begin{bmatrix}1&2\\2&4\\0&1\end{bmatrix}\), \(r=2\). \(b_1=(3,6,2)\) works (\(x=(-1,2)\)). \(b_2=(3,7,2)\) same candidate \(x\) fails the middle equation: \(\operatorname{rank}([A\mid b_2])=3>2\).

### Worked: PS2 #23 (shape tells you, once full rank is known)

- Tall \(A\in\mathbb{R}^{3\times 2}\) full column rank: injective, not surjective.
- Wide \(B\in\mathbb{R}^{2\times 3}\) full row rank: surjective, not injective; \(N(B)=\operatorname{span}\{(-1,-1,1)\}\).
- Square \(C=\begin{bmatrix}1&1\\1&-1\end{bmatrix}\) full rank: bijective.

### Worked: PS2 #24 capstone (redundant features)

\[
X=\begin{bmatrix}1&0&1\\0&1&1\\1&1&2\\2&1&3\end{bmatrix},\quad
y=\begin{bmatrix}2\\-1\\1\\3\end{bmatrix}.
\]

\(a_3=a_1+a_2\), \(\{a_1,a_2\}\) independent \(\Rightarrow r=2\), \(N(X)=\operatorname{span}\{(-1,-1,1)\}\). Particular \(\beta_p=(2,-1,0)\) because \(y=2a_1-a_2\). Complete \(\beta=\beta_p+t(-1,-1,1)\). Two exact vectors: \((2,-1,0)\) and \((1,-2,1)\). Map \(\mathbb{R}^3\to\mathbb{R}^4\) neither injective nor surjective. New \(\phi^T=[0\ 0\ 1]\) reads \(\beta_3\): predictions **0 vs 1**.

Same story as PS2 #6, now in rank language: redundancy \(\to\) dependence \(\to\) rank \(\to\) nullspace \(\to\) non-unique parameters \(\to\) maybe different futures.

## You-try checklist (Block 3)

1. Recite rank–nullity and the tall / wide / square table without looking.
2. Redo PS2 #15, #17, #19, #24 covered.
3. One sentence: “Pivot positions from \(U\), basis vectors from original columns.”

---

# Block 4 — exam rehearsal (if you still have 30–45 min)

## 4.1 How to sit the paper

Do elimination first. Every later question (nullspace, rank, inverse, “is it injective”) is the **same** \(U\). Write pivots, free variables, then answer in words.

If a \(3\times 3\) inverse is asked: Gauss–Jordan on \([A\mid I]\), or \(2\times 2\) formula. Do not hunt \(\det\) theory.

Skip PS1 #12–13 (Schur, \(LDL^T\)) and any Boyd / eigen / SVD instinct.

## 4.2 Attack sheet — Practice set 2 (the MST stand-in)

| # | What they want | Answer shape |
|---|----------------|--------------|
| 5 | Zero first pivot | Swap, then \(\theta=(2,-1,1)\) |
| 6 | Free parameter family | \(\theta=(3,2,0)+t(-1,-1,1)\); new \(\phi\) disagrees |
| 7 | Inconsistent | \(0=1\) after \(R_2-2R_1\) |
| 9 | \(E_{ij}\), \(EA=U\) | \(x=(1,2,1)\) |
| 10 | \(P\) then eliminate | \(\theta=(1,-1,2)\) |
| 11 | Inverse recovers batch | \(A^{-1}=\begin{bmatrix}-5&2\\3&-1\end{bmatrix}\) |
| 12 | Singular + collision | \(z=(-1,1,-1)\), \(\tilde x=x+z\) |
| 15 | \(b\in C(A)\)? | yes for \(b\), no for \(c\) |
| 17 | \(N(A)\) basis | two specials, \(\dim=2\) |
| 19 | Rank-2 map | \(r=2\), nullity 2, neither 1–1 nor onto |
| 21 | Rank test | \(b_1\) yes, \(b_2\) no |
| 23 | Shape + full rank | tall 1–1; wide onto; square both |
| 24 | Capstone | \(r=2\), \(N=\operatorname{span}\{(-1,-1,1)\}\), two \(\beta\)'s, two futures |

PS1 #1 (if they want \(PA=LU\)): \(a_{11}=0\), swap, \(\theta=(1,2,-1)\), \(L\) holds multipliers \(2\) and \(1\).

## 4.3 Last 20 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet. If a box is missing, that box is your first revision target, not a new chapter.
