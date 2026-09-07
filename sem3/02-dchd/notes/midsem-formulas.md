# ECL216 DCHD — MST formula sheet

Rewrite this from memory in the last 30 minutes. \(A\) is MSB unless the paper labels bits. \(X'=\overline{X}\). Don’t-cares may be 0 or 1; they never *must* be covered.

## Number systems

\[
(N)_b=\sum_k d_k\,b^k
\]

Integer \((N)_{10}\to\) base \(b\): divide, remainders **bottom → top**. Fraction: multiply, integers **top → bottom**. Stop at 5–6 places unless it terminates.

**Grouping (from the radix point):** octal ↔ binary **3 bits**; hex ↔ binary **4 bits**. Hex↔octal always via binary. Pad 0s **outside**, never across the point.

**2’s complement, \(n\) bits:** \(N^* = 2^n-N\). Shortcut: copy bits from LSB through the first 1, invert the rest. Subtraction \(A-B=A+B^*\) (discard end carry). **1’s complement:** invert all bits; if add produces a carry, **add that carry back** (end-around).

S25 reason: shifting a binary point left by 3 multiplies by \(8=2^3\).

**BCD:** each decimal digit → 4 bits. Sum of two BCD digits: add in binary; if nibble \(>9\) or carry out, add \(0110\).

**Gray:** \(g_{n-1}=b_{n-1}\), \(g_i=b_{i+1}\oplus b_i\). Inverse: \(b_{n-1}=g_{n-1}\), \(b_i=b_{i+1}\oplus g_i\).

**Excess-3:** BCD digit \(+3\). Unused 4-bit codes are don’t-cares in XS3↔BCD decoders.

## Boolean (cold)

\[
\begin{align*}
A+A'&=1,& A A'&=0,& A+1&=1,& A\cdot 0&=0,\\
A+AB&=A,& A(A+B)&=A,\\
A+A'B&=A+B,\\
A(B+C)&=AB+AC,\\
A+BC&=(A+B)(A+C)\quad\text{(the starred distributive)}\\
AB+A'C+BC&=AB+A'C\quad\text{(consensus SOP)}\\
(A+B)(A'+C)(B+C)&=(A+B)(A'+C)\quad\text{(consensus POS)}
\end{align*}
\]

DeMorgan: \((A+B)'=A'B'\), \((AB)'=A'+B'\). NAND = bubbled-OR. NOR = bubbled-AND.

XOR: \(A\oplus B=A'B+AB'\). XNOR: \(AB+A'B'\). \(A\oplus B\oplus C\) is 1 iff an **odd** number of 1s.

**SOP** = 1-minterms, OR last. **POS** = 0-maxterms, AND last. Canonical: every term has every variable.

Two-level: **SOP → NAND–NAND**. **POS → NOR–NOR**.

## K-map

Cells \(=2^n\). Adjacent = Hamming-1 (Gray order `00,01,11,10`). Groups of \(2^k\) only; wrap edges; overlap allowed; each 1 in at least one group; **never group a 0 into an SOP 1-group**.

Don’t-care \(d\): use it if it **enlarges** a power-of-two group; otherwise leave it out. \(d\) is not a required 1.

| \(n\) | Grid | Decimal dump (AB… as labeled in notes) |
|-----|------|----------------------------------------|
| 2 | \(2\times2\) | \(0,2/1,3\) |
| 3 | \(2\times4\), \(C\) vs \(AB\) | top \(0,2,6,4\); bottom \(1,3,7,5\) |
| 4 | \(4\times4\), \(CD\) vs \(AB\) | rows \(0,4,12,8\); \(1,5,13,9\); \(3,7,15,11\); \(2,6,14,10\) |

A group of \(2^k\) kills \(k\) variables. POS: circle **0**s, write sums of the variables that stay.

## Quine–McCluskey (≤ 5 vars)

1. List **1-minterms and don’t-cares** in binary, grouped by number of 1s.
2. Combine pairs that differ in **exactly one** bit; write `-` there; tick both parents.
3. Repeat on the dashed terms (dashes must **line up**). Unticked terms = **prime implicants**.
4. PI chart: columns = **required 1-minterms only** (no \(d\) columns).
5. A PI that is the **only** cover of some 1 is **essential**. Cover the rest with the fewest remaining PIs (Petrick if two choices).
6. If two different min covers exist, say **not unique** and write both SOPs.

Implicant = product that covers only 1s/\(d\). Prime = implicant not contained in a larger one. Min SOP = fewest products, then fewest literals.

## Combinational MSI

**HA:** \(\mathrm{sum}=A\oplus B\), \(\mathrm{carry}=AB\).

**FA:** \(\mathrm{sum}=A\oplus B\oplus C_\mathrm{in}\), \(C_\mathrm{out}=AB+BC_\mathrm{in}+AC_\mathrm{in}\).

**HS:** \(\mathrm{diff}=A\oplus B\), \(B_\mathrm{out}=A'B\).

**FS:** \(\mathrm{diff}=A\oplus B\oplus B_\mathrm{in}\), \(B_\mathrm{out}=A'B+A'B_\mathrm{in}+BB_\mathrm{in}\).

**\(n\)-bit adder–subtractor:** \(S_i=A_i\oplus(B_i\oplus M)\oplus C_i\), \(C_0=M\). \(M=0\) add; \(M=1\) subtract (\(B\) inverted, \(+1\)).

**2-bit comparator** (\(A=A_1A_0\), \(B=B_1B_0\)):

\[
\begin{align*}
L&=A_1'B_1+A_1'A_0'B_0+A_0'B_1B_0,\\
E&=(A_1\oplus B_1)'(A_0\oplus B_0)',\\
G&=A_1B_1'+A_1A_0B_0'+A_0B_1'B_0'
\end{align*}
\]

**Decoder \(n\to 2^n\):** \(O_k=m_k\cdot\mathrm{EN}\). Function = OR the outputs whose minterms are 1.

**MUX \(2^m:1\):** \(K=2^m\) data lines, \(m\) selects. \(y=\sum_i m_i(C)\,I_i\).

Leftover-variable (n-var function on a \(2^{n-1}:1\) MUX): put \(n-1\) vars on select; the remaining var (paper may force **2nd LSB**) is data. For each select combination the data pin is \(0\), \(1\), \(D\), or \(D'\). Don’t-cares pick whichever of those four is cheapest.

Bigger MUX: first stage uses LSBs of select; last stage uses MSBs. Unused data pins → 0.

**Odd-parity bit** on data \(A,B,C\) (4-bit word has odd # of 1s): \(P=(A\oplus B\oplus C)'\).

## Sequential (one-pager — don’t grind unless Block 5)

Characteristic: SR \(Q^+=S+R'Q\) (\(SR=0\)); JK \(Q^+=JQ'+K'Q\); D \(Q^+=D\); T \(Q^+=T\oplus Q\).

**Excitation** (present \(Q\) → next \(Q^+\)):

| \(Q\to Q^+\) | SR | JK | T | D |
|--------------|----|----|---|---|
| \(0\to0\) | \(0\,X\) | \(0\,X\) | 0 | 0 |
| \(0\to1\) | \(1\,0\) | \(1\,X\) | 1 | 1 |
| \(1\to0\) | \(0\,1\) | \(X\,1\) | 1 | 0 |
| \(1\to1\) | \(X\,0\) | \(X\,0\) | 0 | 1 |

**Moore:** output \(=f(\text{state})\) only — output changes **after** the clock. **Mealy:** output \(=f(\text{state},\text{input})\) — can change in the same cycle as the input.

**Sequence detector, overlapping vs not:** after a hit, overlapping **reuses the suffix** (e.g. `1101` and the next bit can start `1…`); non-overlapping **resets to S0**. Same 1s, different next-state arcs. DCMP endsem wants **non-overlap `1101`**.

**Race-free (async / state assignment):** a race is two+ state bits changing in one transition. Race-free: Gray-code adjacent states on every used arc, or add an unused intermediate state; never allow two unstable paths to different stables (critical race). Sync designs still use adjacent assignment to kill hazards on the excitation maps.

**Lock-free counter:** unused states must have a path back to the main cycle (no dead trap).

## Numbers that keep appearing

- Tutorial 1 WP1: \(3\mathrm{A}7\mathrm{F}_{16}=0011\,1010\,0111\,1111_2\).
- T3 irrigation (at least two of \(A,B,C\)): \(\sum m(3,5,6,7)=AB+BC+AC\).
- T3 parking (\(A\) card, else \(BC\)): \(F=A+BC=\sum m(3,4,5,6,7)\).
- T3 4-var #19: \(\sum m(0,1,4,5,7,8,9,12,13,15)+d(2,3,6,14)=D'+BC\).
- S24 Q4d(ii): \((A'+C)(A'+C')(A'+B+C'D)=A'\).
- S24 Q2 soldiers (all five constraints): only \(AB'CD'E'\) with \(A=C=1,B=D=E=0\).
