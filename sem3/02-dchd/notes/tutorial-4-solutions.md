# Tutorial 4 — MUX, decoder, priority encoder (DCHD / ECLA201)

4×1 MUX with \(S_1\) MSB and \(S_0\) LSB:

\[
Y = S_1'S_0'I_0 + S_1'S_0 I_1 + S_1 S_0' I_2 + S_1 S_0 I_3
\]

2×1 MUX: \(Y = S'I_0 + S I_1\).

Decoder outputs are active-HIGH, one-hot, no enable pin on the sheet.

---

## 1. Two 4×1 MUXes

Left MUX, selects \(S_1=U\), \(S_0=V\):

| Input | Tied to |
|--|--|
| \(I_0\) | 0 |
| \(I_1\) | 1 |
| \(I_2\) | 1 |
| \(I_3\) | 0 |

\[
M = U'V + UV' = U \oplus V
\]

Right MUX, selects \(S_1=W\), \(S_0=X\): \(I_0=I_1=M\), \(I_2=I_3=0\).

\[
F = W'M = W'(U \oplus V)
\]

**Minimized SOP:** \(F = U'VW' + UV'W'\)

---

## 2. 4×1 MUX, canonical SOP

Selects \(S_1=A\), \(S_0=B\).

| Input | Expression |
|--|--|
| \(I_0\) | \(C\) |
| \(I_1\) | \(D\) |
| \(I_2\) | \(C'\) (NOT of the \(C\) line) |
| \(I_3\) | \(C'D'\) (AND with bubbles on both inputs) |

\[
F = A'B'C + A'BD + AB'C' + ABC'D'
\]

Expand:

- \(A'B'C = m_2 + m_3\)
- \(A'BD = m_5 + m_7\)
- \(AB'C' = m_8 + m_9\)
- \(ABC'D' = m_{12}\)

**\(F(A,B,C,D) = \sum m(2,3,5,7,8,9,12)\)**

---

## 3. 8×1 MUX

Selects \(S_2=A\), \(S_1=B\), \(S_0=C\).

\(I_0=0,\; I_1=D,\; I_2=0,\; I_3=D,\; I_4=0,\; I_5=0,\; I_6=1,\; I_7=0\)

\[
Y = A'B'CD + A'BCD + ABC'
\]

\[
Y = A'CD + ABC'
\]

---

## 4. Two decoders, AND, OR

Left decoder: \(A_1=X\), \(A_0=Y\). Only \(D_2\) and \(D_3\) enter the AND.

\[
D_2 D_3 = (XY')(XY) = 0
\]

That constant 0 is \(A_1\) of the right decoder. \(A_0=Z\). The OR takes \(D_0\) and \(D_1\) of the right decoder:

\[
F = A_1'Z' + A_1'Z = A_1' = 1
\]

**\(F = 1\)**

\(D_2\) and \(D_3\) of a decoder cannot be 1 together, so the AND is a dead path and the second decoder’s \(A_1\) stays 0. OR of its \(D_0\) and \(D_1\) is then always 1.

---

## 5. MUX inputs that match Figure B

Figure B is \(y = AB + C\). Figure A is a 4×1 MUX with selects \(A\) (MSB) and \(B\).

| \(AB\) | required \(y\) | MUX input |
|--|--|--|
| 00 | \(C\) | \(I_0=C\) |
| 01 | \(C\) | \(I_1=C\) |
| 10 | \(C\) | \(I_2=C\) |
| 11 | 1 | \(I_3=1\) |

**\(I_0 = I_1 = I_2 = C,\; I_3 = 1\)**

The sheet does not print choices. This is the connection that makes the two outputs identical.

---

## 6. Decoder, two 2×1 MUXes, OR

Decoder: \(X_1=A\) (MSB), \(X_0=B\) (LSB).

\[
D_0=A'B',\quad D_1=A'B,\quad D_2=AB',\quad D_3=AB
\]

Top MUX, select \(C\): \(I_0=D_0\), \(I_1=D_3\)

\[
Y_1 = C'D_0 + CD_3 = A'B'C' + ABC
\]

Bottom MUX, select \(C\): upper pin is \(I_1=D_1\), lower pin is \(I_0=D_2\)

\[
Y_2 = C'D_2 + CD_1 = AB'C' + A'BC
\]

\[
f = Y_1+Y_2 = A'B'C' + A'BC + AB'C' + ABC = B'C' + BC
\]

**\(f = BC + B'C' = B \odot C\)**

---

## 7. \(F(A,B,C,D)=\sum m(1,3,5,10,11,13,14)+\sum d(0,2)\) on an 8×1 MUX

Selects \(S_2=A\), \(S_1=B\), \(S_0=C\). Each data input is the function of \(D\) inside that \(ABC\) pair. Don’t-cares \(m_0\) and \(m_2\) are taken as 1 so those inputs are a constant.

| Select \(ABC\) | cells | data input |
|--|--|--|
| 000 | \(d,1\) | \(I_0=1\) |
| 001 | \(d,1\) | \(I_1=1\) |
| 010 | \(0,1\) | \(I_2=D\) |
| 011 | \(0,0\) | \(I_3=0\) |
| 100 | \(0,0\) | \(I_4=0\) |
| 101 | \(1,1\) | \(I_5=1\) |
| 110 | \(0,1\) | \(I_6=D\) |
| 111 | \(1,0\) | \(I_7=D'\) |

---

## 8. 4×1 MUX as \(C \oplus D\)

Selects \(S_1=C\), \(S_0=D\). Input index is \(2C+D\).

| \(CD\) | \(C\oplus D\) | input |
|--|--|--|
| 00 | 0 | \(A_0=0\) |
| 01 | 1 | \(A_1=1\) |
| 10 | 1 | \(A_2=1\) |
| 11 | 0 | \(A_3=0\) |

**\(A_0 A_1 A_2 A_3 = 0,1,1,0\)**

---

## 9. Propagation delay

Delays: XOR \(4\,\text{ns}\), AND \(2\,\text{ns}\), MUX \(1\,\text{ns}\). Inputs \(P,Q,R,S,T\) change together.

Wiring:

- Top AND: \(P\) and \(Q\). Its output is input 0 of the output MUX, and one input of a second AND.
- XOR: \(Q\) and \(R\), into input 0 of the first MUX.
- Bottom AND: \(R\) and \(S\), into input 1 of the first MUX.
- First MUX select is \(T\). Its output is the other input of the second AND.
- Second AND drives input 1 of the output MUX. Output MUX select is \(T\).

Longest path:

\[
Q \text{ or } R \xrightarrow{\text{XOR } 4} \text{first MUX } 1 \xrightarrow{\text{AND } 2} \text{output MUX } 1
\]

**Maximum delay = \(8\,\text{ns}\)**

Shorter paths, for checking: \(RS\) through the same chain is \(2+1+2+1=6\,\text{ns}\). \(PQ\) straight into the output MUX is \(2+1=3\,\text{ns}\).

---

## 10. \(Y = (f_1 f_2) \oplus (f_3+f_4)\)

\[
\begin{align*}
f_1 &= \sum(0,2,3,5,7,8,11,13)\\
f_2 &= \sum(1,3,5,7,11,13,15)\\
f_3 &= \sum(0,1,4,11)\\
f_4 &= \sum(0,2,6,13)
\end{align*}
\]

\[
f_1 f_2 = \{3,5,7,11,13\}
\]

\[
f_3+f_4 = \{0,1,2,4,6,11,13\}
\]

XOR drops the overlap \(\{11,13\}\):

\[
Y = \sum m(0,1,2,3,4,5,6,7)
\]

With the usual MSB as the first variable, those are exactly the minterms where that variable is 0.

**\(Y = A'\)** if the variables are \(A,B,C,D\) with \(A\) MSB. As a minterm list, \(Y=\sum m(0..7)\) does not need the names.

---

## 11. 16×4 priority encoder into a 16×1 MUX

\(I_{15}\) has highest priority, \(I_0\) lowest. \(Y_3 Y_2 Y_1 Y_0\) is the binary index of the highest input that is 1, and those bits are \(S_3 S_2 S_1 S_0\) of the MUX.

The MUX realizes \(F=\sum m(1,3,5,7,9,11,13,15)\), so its data input \(k\) is 1 exactly when \(k\) is odd. Therefore \(F=1\) exactly when the encoder’s code is odd.

### 1. Minimal SOP

\(F=1\) when some odd input is 1 and every higher input is 0:

\[
\begin{align*}
F = I_{15}
&+ I_{15}' I_{14}' I_{13}\\
&+ I_{15}' I_{14}' I_{13}' I_{12}' I_{11}\\
&+ I_{15}' I_{14}' I_{13}' I_{12}' I_{11}' I_{10}' I_9\\
&+ I_{15}' I_{14}' I_{13}' I_{12}' I_{11}' I_{10}' I_9' I_8' I_7\\
&+ I_{15}' I_{14}' I_{13}' I_{12}' I_{11}' I_{10}' I_9' I_8' I_7' I_6' I_5\\
&+ I_{15}' I_{14}' I_{13}' I_{12}' I_{11}' I_{10}' I_9' I_8' I_7' I_6' I_5' I_4' I_3\\
&+ I_{15}' I_{14}' I_{13}' I_{12}' I_{11}' I_{10}' I_9' I_8' I_7' I_6' I_5' I_4' I_3' I_2' I_1
\end{align*}
\]

Even inputs appear only complemented. They never turn \(F\) on by themselves. The eight products are disjoint and do not combine, so this is minimal SOP.

### 2. When \(F=1\)

\(F=1\) iff the highest-priority input that is HIGH has an odd index: one of \(I_{15}, I_{13}, I_{11}, I_9, I_7, I_5, I_3, I_1\).

If every input is 0, the encoder code is 0, the MUX selects a data input that is 0, and \(F=0\). \(V\) is not a select bit.

---

## 12. 3-bit odd-parity generator, 3×8 decoder

Data \(A,B,C\), \(A\) MSB. Odd parity means \(A,B,C,P\) together contain an odd number of 1s, so \(P=1\) when \(ABC\) already has an even number of 1s.

\[
P = \sum m(0,3,5,6) = D_0 + D_3 + D_5 + D_6
\]

One 3×8 decoder, inputs \(A,B,C\), and a 4-input OR (or three 2-input ORs) on those four outputs.

---

## 13. 2-bit equality comparator, one decoder

Inputs \(A_1 A_0 B_1 B_0\) to a 4×16 decoder, \(A_1\) MSB. Equality is the four codes where the two pairs match:

\[
E = D_0 + D_5 + D_{10} + D_{15}
\]

| equal value | code \(A_1 A_0 B_1 B_0\) | output |
|--|--|--|
| 00 | 0000 | \(D_0\) |
| 01 | 0101 | \(D_5\) |
| 10 | 1010 | \(D_{10}\) |
| 11 | 1111 | \(D_{15}\) |

---

## 14. 1:32 demultiplexer from 1:4 demultiplexers only

A 1:4 demux routes its data input to one of four outputs. Data = 0 forces every output to 0, so a data input can be used as an enable. Five select bits \(S_4 S_3 S_2 S_1 S_0\), \(S_4\) MSB. Eleven 1:4 demuxes.

1. **One** 1:4, selects \((S_4,\, 0)\). Use the two outputs that correspond to \(S_4=0\) and \(S_4=1\). Call them \(E_0, E_1\). The other two outputs are unused.
2. **Two** 1:4s, both with selects \(S_3 S_2\). Data inputs are \(E_0\) and \(E_1\). This produces eight enables \(H_0 \ldots H_7\), one for each value of \(S_4 S_3 S_2\).
3. **Eight** 1:4s, all with selects \(S_1 S_0\). Data input of demux \(k\) is \(H_k\). Outputs are \(Y_0 \ldots Y_{31}\).

Output index is the 5-bit select: group \(S_4 S_3 S_2\) picks the last-stage demux, and \(S_1 S_0\) picks the pin inside it.

Count: \(1+2+8=11\).

---

## 15. 4-bit Gray to binary, 4×16 decoder

Gray inputs \(G_3 G_2 G_1 G_0\), \(G_3\) MSB, on the decoder. Decoder output \(D_n\) is 1 when the Gray word, read as a binary integer, equals \(n\).

Conversion used to build the lists: \(B_3=G_3\), \(B_2=G_3\oplus G_2\), \(B_1=B_2\oplus G_1\), \(B_0=B_1\oplus G_0\).

OR the decoder outputs where that binary bit is 1:

\[
\begin{align*}
B_3 &= D_8+D_9+D_{10}+D_{11}+D_{12}+D_{13}+D_{14}+D_{15}\\
B_2 &= D_4+D_5+D_6+D_7+D_8+D_9+D_{10}+D_{11}\\
B_1 &= D_2+D_3+D_4+D_5+D_8+D_9+D_{14}+D_{15}\\
B_0 &= D_1+D_2+D_4+D_7+D_8+D_{11}+D_{13}+D_{14}
\end{align*}
\]

Check row: Gray \(1101\) is minterm 13 and converts to binary \(1001\), which is in \(B_3\) and \(B_0\) only. Both lists contain \(D_{13}\), and \(B_2, B_1\) do not.
