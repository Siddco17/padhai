# Tutorial 2 — Step-by-step solutions (DCHD / ECLA201)

Notation: \(X'\) = NOT \(X\). Minterm index = binary \(ABCD\) with **A MSB**.

---

# Part (a) — Standard SOP + truth table

**Method**
1. If a product is missing a variable, expand it with \(X+X'=1\).
2. List all minterms where \(F=1\).
3. Fill the truth table (0 elsewhere).

---

## 2-variables

### 1. \(F=A'B+AB'\)

Already standard (each term has \(A\) and \(B\)).

| \(A\) | \(B\) | term | \(F\) | minterm |
|------|------|------|------|---------|
| 0 | 0 | — | 0 | |
| 0 | 1 | \(A'B\) | 1 | \(m_1\) |
| 1 | 0 | \(AB'\) | 1 | \(m_2\) |
| 1 | 1 | — | 0 | |

**Answer:** \(F=\sum m(1,2)\)

---

### 2. \(F=A+A'B\)

Expand \(A\): \(A=A(B+B')=AB+AB'\).

\[
F=AB+AB'+A'B=\sum m(1,2,3)
\]

| \(A\) | \(B\) | \(F\) |
|------|------|------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

---

### 3. \(F=A'+B\)

Expand \(A'\): \(A'=A'(B+B')=A'B+A'B'\).  
Expand \(B\): \(B=B(A+A')=AB+A'B\).

\[
F=A'B'+A'B+AB=\sum m(0,1,3)
\]

| \(A\) | \(B\) | \(F\) |
|------|------|------|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

---

### 4. \(F=A'B+AB\)

Already standard.

\[
F=\sum m(1,3)\quad(=B)
\]

| \(A\) | \(B\) | \(F\) |
|------|------|------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

---

### 5. \(F=A\)

\[
A=AB'+AB=\sum m(2,3)
\]

| \(A\) | \(B\) | \(F\) |
|------|------|------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

---

### 6. \(F=AB+A'B\)

Already standard.

\[
F=\sum m(1,3)\quad(=B)
\]

| \(A\) | \(B\) | \(F\) |
|------|------|------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

---

## 3-variables

Minterms: \(m_0=A'B'C',\ldots,m_7=ABC\).

### 1. \(F=A'BC+AB'C+ABC'\)

Already standard → \(\sum m(3,5,6)\).

| ABC | F | | ABC | F |
|-----|---|---|-----|---|
| 000 | 0 | | 100 | 0 |
| 001 | 0 | | 101 | 1 |
| 010 | 0 | | 110 | 1 |
| 011 | 1 | | 111 | 0 |

---

### 2. \(F=AB+A'C\)

\[
\begin{align*}
AB &= AB(C+C') = ABC + ABC' \\
A'C &= A'C(B+B') = A'BC + A'B'C
\end{align*}
\]

\[
F=ABC+ABC'+A'BC+A'B'C=\sum m(1,3,6,7)
\]

| ABC | F | | ABC | F |
|-----|---|---|-----|---|
| 000 | 0 | | 100 | 0 |
| 001 | 1 | | 101 | 0 |
| 010 | 0 | | 110 | 1 |
| 011 | 1 | | 111 | 1 |

---

### 3. \(F=A+B'C\)

\[
\begin{align*}
A &= A(B+B')(C+C') = AB'C'+AB'C+ABC'+ABC \\
B'C &= B'C(A+A') = AB'C+A'B'C
\end{align*}
\]

\[
F=\sum m(1,4,5,6,7)
\]

| ABC | F | | ABC | F |
|-----|---|---|-----|---|
| 000 | 0 | | 100 | 1 |
| 001 | 1 | | 101 | 1 |
| 010 | 0 | | 110 | 1 |
| 011 | 0 | | 111 | 1 |

---

### 4. \(F=A'B+ABC\)

\[
A'B=A'B(C+C')=A'BC+A'BC'
\]

\[
F=A'BC'+A'BC+ABC=\sum m(2,3,7)
\]

| ABC | F | | ABC | F |
|-----|---|---|-----|---|
| 000 | 0 | | 100 | 0 |
| 001 | 0 | | 101 | 0 |
| 010 | 1 | | 110 | 0 |
| 011 | 1 | | 111 | 1 |

---

### 5. \(F=A'B'C+A'BC+AB'C+ABC\)

Already standard → \(\sum m(1,3,5,7)\) (= \(C\)).

| ABC | F | | ABC | F |
|-----|---|---|-----|---|
| 000 | 0 | | 100 | 0 |
| 001 | 1 | | 101 | 1 |
| 010 | 0 | | 110 | 0 |
| 011 | 1 | | 111 | 1 |

---

### 6. \(F=A'B'C+AB'C+ABC\)

Already standard → \(\sum m(1,5,7)\).

| ABC | F | | ABC | F |
|-----|---|---|-----|---|
| 000 | 0 | | 100 | 0 |
| 001 | 1 | | 101 | 1 |
| 010 | 0 | | 110 | 0 |
| 011 | 0 | | 111 | 1 |

---

## 4-variables

Minterms: \(m_0\)–\(m_{15}\), binary \(ABCD\).

### 1. \(F=A'BC'D+AB'CD+ABC'D+ABCD\)

All terms already have 4 literals → \(\sum m(5,11,13,15)\).

| ABCD | F | ABCD | F | ABCD | F | ABCD | F |
|------|---|------|---|------|---|------|---|
| 0000 | 0 | 0100 | 0 | 1000 | 0 | 1100 | 0 |
| 0001 | 0 | 0101 | 1 | 1001 | 0 | 1101 | 1 |
| 0010 | 0 | 0110 | 0 | 1010 | 0 | 1110 | 0 |
| 0011 | 0 | 0111 | 0 | 1011 | 1 | 1111 | 1 |

---

### 2. \(F=A'BCD+AB'CD+ABC'D\)

Already → \(\sum m(7,11,13)\).

Ones at: \(0111\), \(1011\), \(1101\).

---

### 3. \(F=A'B'C'D+AB'C'D+ABC'D+ABCD\)

Already → \(\sum m(1,9,13,15)\).

Ones at: \(0001\), \(1001\), \(1101\), \(1111\).

---

### 4. \(F=AB+A'CD\)

\[
\begin{align*}
AB &= AB(C+C')(D+D') \\
&= ABC'D' + ABC'D + ABCD' + ABCD \\
&= m_{12}+m_{13}+m_{14}+m_{15}
\end{align*}
\]

\[
\begin{align*}
A'CD &= A'CD(B+B') \\
&= A'BCD + A'B'CD \\
&= m_7+m_3
\end{align*}
\]

\[
F=\sum m(3,7,12,13,14,15)
\]

| ABCD | F | ABCD | F | ABCD | F | ABCD | F |
|------|---|------|---|------|---|------|---|
| 0000 | 0 | 0100 | 0 | 1000 | 0 | 1100 | 1 |
| 0001 | 0 | 0101 | 0 | 1001 | 0 | 1101 | 1 |
| 0010 | 0 | 0110 | 0 | 1010 | 0 | 1110 | 1 |
| 0011 | 1 | 0111 | 1 | 1011 | 0 | 1111 | 1 |

---

### 5. \(F=AB+AC'D+A'BC\)

\[
AB = m_{12}+m_{13}+m_{14}+m_{15}
\]

\[
\begin{align*}
AC'D &= AC'D(B+B') = ABC'D + AB'C'D = m_{13}+m_9
\end{align*}
\]

(\(m_{13}\) already in \(AB\))

\[
\begin{align*}
A'BC &= A'BC(D+D') = A'BCD + A'BCD' = m_7+m_6
\end{align*}
\]

\[
F=\sum m(6,7,9,12,13,14,15)
\]

Ones at: \(0110,0111,1001,1100,1101,1110,1111\).

---

### 6. \(F=A+B'C\)

\[
\begin{align*}
A &= \sum m(8,9,10,11,12,13,14,15) \\
B'C &= B'C(A+A')(D+D') \\
&= A'B'CD' + A'B'CD + AB'CD' + AB'CD \\
&= m_2+m_3+m_{10}+m_{11}
\end{align*}
\]

(\(m_{10},m_{11}\) already in \(A\))

\[
F=\sum m(2,3,8,9,10,11,12,13,14,15)
\]

---

# Part (b) — Reduce with Boolean algebra, 2-input gates only

Laws used a lot:  
- Absorption: \(X+XY=X\)  
- Distributive: \(X+YZ=(X+Y)(X+Z)\) and \(X(Y+Z)=XY+XZ\)  
- Consensus: \(XY+X'Z+YZ=XY+X'Z\)  
- \(X+X'=1\), \(XX'=0\), \(X+X=X\)

---

## 2-variables

### 1. \(F=AB+AB'+A'B\)

\[
\begin{align*}
F &= A(B+B') + A'B \\
&= A\cdot 1 + A'B \\
&= A + A'B \\
&= (A+A')(A+B) \quad\text{(distributive)}\\
&= 1\cdot(A+B)=A+B
\end{align*}
\]

**Reduced:** \(A+B\)  
**Gates:** one 2-input OR.

---

### 2. \(F=AB+A'B\)

\[
F=B(A+A')=B
\]

**Gates:** wire \(B\) (or buffer).

---

### 3. \(F=A+AB'\)

\[
F=A(1+B')=A\cdot 1=A
\]

**Gates:** wire \(A\).

---

### 4. \(F=AB+A'B+AB'\)

\[
\begin{align*}
F &= B(A+A') + AB' \\
&= B + AB' \\
&= (B+A)(B+B') \quad\text{(distributive)}\\
&= (A+B)\cdot 1 = A+B
\end{align*}
\]

**Gates:** one OR.

---

### 5. \(F=A+A'B+AB'\)

\[
\begin{align*}
F &= A + A'B + AB' \\
&= (A+A'B) + AB' \\
&= (A+B) + AB' \quad\text{(as in #1)}\\
&= A+B \quad\text{(absorb \(AB'\))}
\end{align*}
\]

**Gates:** one OR.

---

### 6. \(F=AB+A'B'+AB\)

\[
F=AB+A'B'\quad\text{(\(AB\) once)}
\]

Cannot reduce further with AND/OR (this is XNOR).

**Gates:** AND(\(A,B\)), AND(\(A',B'\)), OR those two. Need NOT on \(A\) and \(B\).

---

## 3-variables

### 1. \(F=A'BC+ABC+AB'C+AB'C'\)

\[
\begin{align*}
A'BC+ABC &= BC(A'+A)=BC \\
AB'C+AB'C' &= AB'(C+C')=AB'
\end{align*}
\]

\[
F=BC+AB'
\]

**Gates:** AND(\(B,C\)), AND(\(A,B'\)), OR. (NOT for \(B'\))

---

### 2. \(F=A'B+AB+AC\)

\[
A'B+AB=B(A'+A)=B
\]

\[
F=B+AC
\]

**Gates:** AND(\(A,C\)), OR with \(B\).

---

### 3. \(F=AB+A'C+BC+ABC\)

\[
ABC\text{ absorbed by }AB\text{ (or by }BC\text{)}
\]

\[
AB+A'C+BC = AB+A'C \quad\text{(consensus: drop \(BC\))}
\]

\[
F=AB+A'C
\]

**Gates:** AND(\(A,B\)), AND(\(A',C\)), OR.

---

### 4. \(F=A'B+AC+BC+A'BC+ABC\)

\[
\begin{align*}
A'BC &\text{ absorbed by }A'B \\
ABC &\text{ absorbed by }AC\text{ (or }BC\text{)} \\
A'B+AC+BC &= A'B+AC \quad\text{(consensus)}
\end{align*}
\]

\[
F=A'B+AC
\]

**Gates:** AND(\(A',B\)), AND(\(A,C\)), OR.

---

### 5. \(F=AB+A'B+AC+A'BC+ABC\)

\[
\begin{align*}
AB+A'B &= B \\
A'BC &\text{ absorbed by }B \\
ABC &\text{ absorbed by }B\text{ or }AC
\end{align*}
\]

\[
F=B+AC
\]

**Gates:** AND(\(A,C\)), OR with \(B\).

---

### 6. \(F=AB'C+A'BC+ABC+A'B'C'\)

\[
\begin{align*}
AB'C+ABC &= AC(B'+B)=AC \\
F &= AC + A'BC + A'B'C' \\
&= C(A + A'B) + A'B'C' \\
&= C(A+B) + A'B'C'
\end{align*}
\]

(Check: \(A+A'B=A+B\).)

**Reduced:** \(A'B'C'+AC+BC\) (same as \(A'B'C'+C(A+B)\)).

**Gates (2-input):**
1. OR(\(A,B\)) → AND with \(C\) → term \(C(A+B)\)
2. AND(\(A',B'\)) → AND with \(C'\) → term \(A'B'C'\)
3. OR the two results.

---

### 7. \(F=AB+A'C+BC+AB'C+A'BC\)

Group the \(C\) terms:

\[
\begin{align*}
A'C + BC + AB'C + A'BC
&= C\bigl(A' + B + AB' + A'B\bigr) \\
&= C\bigl(A' + B + A\bigr) \quad\text{(\(AB'\) covered once \(A\) appears)}\\
&= C(A'+A+B)=C\cdot 1 = C
\end{align*}
\]

More carefully: \(A'+AB'=A'\), then \(A'+A=1\), so everything with \(C\) collapses to \(C\).

\[
F=AB+C
\]

**Gates:** AND(\(A,B\)), OR with \(C\).

---

### 8. \(F=A'B+AC+BC+A'BC+ABC'+ABC\)

\[
\begin{align*}
A'BC &\text{ absorbed by }A'B \\
ABC &\text{ absorbed by }AC \\
ABC' &\text{ with }A'B\text{: } \\
A'B + ABC' &= B(A' + AC') = B(A'+C')\quad\text{or simply keep going:}
\end{align*}
\]

\[
\begin{align*}
A'B + ABC' + ABC &= A'B + AB(C'+C) = A'B + AB = B \\
\end{align*}
\]

Left with \(B + AC + BC\); absorb \(BC\) into \(B\):

\[
F=B+AC
\]

**Gates:** AND(\(A,C\)), OR with \(B\).

---

### 9. \(F=AB+AC+A'BC'\)

\[
\begin{align*}
F &= A(B+C) + A'BC' \\
&= AC + AB + A'BC' \\
&= AC + B(A + A'C') \\
&= AC + B\bigl((A+A')(A+C')\bigr) \quad ? \\
&\quad\text{simpler: }A+A'C'=(A+A')(A+C')=A+C'\\
&= AC + B(A+C') \\
&= AC + AB + BC' \\
&= AC + BC' \quad\text{(absorb \(AB\) into? wait)}
\end{align*}
\]

Clean path:

\[
\begin{align*}
AB + A'BC' &= B(A + A'C') = B(A+C') = AB + BC' \\
F &= AB + BC' + AC = AC + BC' \quad\text{(\(AB\) absorbed?)}
\end{align*}
\]

Check absorption of \(AB\): does \(AC+BC'\) cover \(AB\)?  
When \(AB=1\): if \(C=1\) covered by \(AC\); if \(C=0\) covered by \(BC'\). Yes.

\[
F=AC+BC'
\]

**Gates:** AND(\(A,C\)), AND(\(B,C'\)), OR.

---

### 10. \(F=AB+A'C+BC+A'BC+ABC'+AB'C\)

Same idea as #7: all lone \(C\) products cover every case with \(C=1\):

\[
A'C+BC+A'BC+AB'C = C
\]

and \(ABC'\) with \(AB\):

\[
AB + ABC' = AB
\]

\[
F=AB+C
\]

**Gates:** AND(\(A,B\)), OR with \(C\).

---

## 4-variables

### 1. \(F=ABCD+ABCD'+AB'CD+AB'CD'\)

\[
\begin{align*}
ABCD+ABCD' &= ABC(D+D')=ABC \\
AB'CD+AB'CD' &= AB'C(D+D')=AB'C \\
F &= ABC + AB'C = AC(B+B') = AC
\end{align*}
\]

**Gates:** one AND(\(A,C\)).

---

### 2. \(F=A'BCD+ABCD+AB'CD+A'B'CD\)

\[
F=CD(A'B+AB+AB'+A'B')=CD\cdot 1=CD
\]

**Gates:** one AND(\(C,D\)).

---

### 3. \(F=AB'C'D+AB'CD+ABC'D+ABCD\)

\[
\begin{align*}
AB'C'D+AB'CD &= AB'D(C'+C)=AB'D \\
ABC'D+ABCD &= ABD(C'+C)=ABD \\
F &= AB'D + ABD = AD(B'+B)=AD
\end{align*}
\]

**Gates:** one AND(\(A,D\)).

---

### 4. \(F=A'BCD+A'BC'D+ABCD+ABC'D\)

\[
\begin{align*}
A'BCD+A'BC'D &= A'BD(C+C')=A'BD \\
ABCD+ABC'D &= ABD \\
F &= A'BD+ABD=BD
\end{align*}
\]

**Gates:** one AND(\(B,D\)).

---

### 5. \(F=ABCD+AB'CD+A'BCD+A'B'CD+ABCD'\)

First four terms:

\[
CD(AB+AB'+A'B+A'B')=CD
\]

\[
F=CD+ABCD'
\]

\[
\begin{align*}
CD+ABCD' &= C\bigl(D + ABD'\bigr) \\
D+ABD' &= D+AB \quad\text{(when \(D=0\), need \(AB\); when \(D=1\), 1)}\\
F &= C(D+AB)=CD+ABC
\end{align*}
\]

**Gates:** AND(\(A,B\))→AND with \(C\); AND(\(C,D\)); OR.

---

### 6. \(F=AB+A'CD+BC+ABCD+ACD\)

\[
\begin{align*}
A'CD+ACD &= CD(A'+A)=CD \\
ABCD &\text{ absorbed by }AB\text{ (or }CD\text{)} \\
F &= AB + BC + CD
\end{align*}
\]

**Gates:** AND(\(A,B\)), AND(\(B,C\)), AND(\(C,D\)), OR-tree of three.

---

### 7. \(F=A'B+AC+BD+A'BC+ABCD+A'BD\)

\[
\begin{align*}
A'BC &\text{ absorbed by }A'B \\
A'BD &\text{ absorbed by }A'B\text{ (or }BD\text{)} \\
ABCD &\text{ absorbed by }AC\text{ (or }BD\text{)} \\
F &= A'B + AC + BD
\end{align*}
\]

**Gates:** AND(\(A',B\)), AND(\(A,C\)), AND(\(B,D\)), OR-tree.

---

### 8. \(F=AB+A'C+BC+ABD+ACD+ABCD\)

\[
\begin{align*}
ABCD &\text{ absorbed by }AB \\
ABD &\text{ absorbed by }AB \\
AB+A'C+BC &= AB+A'C \quad\text{(consensus drops \(BC\))} \\
F &= AB + A'C + ACD
\end{align*}
\]

Now merge \(A'C+ACD\):

\[
\begin{align*}
A'C + ACD &= C(A' + AD) = C(A'+D) \\
&= A'C + CD
\end{align*}
\]

\[
F=AB+A'C+CD
\]

**Gates:** AND(\(A,B\)), AND(\(A',C\)), AND(\(C,D\)), OR-tree.

---

# Exam-speed checklist

1. Part (a): expand missing literals with \(X+X'=1\); write \(\sum m(\ldots)\); fill table.
2. Part (b): factor common literals first; use absorption; use consensus to drop the third term; implement with AND/OR/NOT only, cascading if you need a 3-input AND.

Related: [[crash-course]] Block 1.
