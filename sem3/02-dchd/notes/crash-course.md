# ECL216 DCHD crash course — teach + work every MST-style problem

How to use: one block per sitting. Read the concept, cover the “you try” line, then uncover the solution. Files: `midsem-map.md`, `midsem-formulas.md`. Redo Tutorial 1–3 **on paper**; the vault copy is only the prompt.

---

# Block 0 — number systems and codes (1 h)

Digital is not analog. A wire is 0 or 1. Everything else is “how we *name* a pile of bits.”

## 0.1 Place value

In base \(b\), digit \(d_k\) is worth \(d_k b^k\). The point separates \(k\ge 0\) from \(k<0\).

### Worked: BEFORE MID p.2 — \((110001.10)_2\)

\[
32+16+1+0.5=(49.5)_{10}
\]

### Worked: Tutorial 1 Set 1 — \((101)_2\), \((FACE)_{16}\)

\((101)_2=4+1=5\). \((FACE)_{16}=15\cdot4096+10\cdot256+12\cdot16+14=64206_{10}\).

**You try:** Tutorial 1 word problem 5: \((431204)_5\) to decimal.

\[
4\cdot5^5+3\cdot5^4+1\cdot125+2\cdot25+4=12500+1875+125+50+4=14554_{10}
\]

## 0.2 Integer conversion: divide / remainder

\((N)_{10}\to\) base \(b\): keep dividing by \(b\), write remainders **up**. Digits \(\ge10\) become A–F.

### Worked: notes p.5 — \((123.567)_{10}\to\) hex

Integer: \(123=7\cdot16+11\to 7\mathrm{B}\). Fraction: \(\times16\) integers \(9,1,2,6,14=\mathrm{E}\) \(\Rightarrow(7\mathrm{B}.9126\mathrm{E})_{16}\) (truncate when the paper is silent).

## 0.3 The only shortcuts that exist

From the **radix point**:

- octal digit \(\leftrightarrow\) **3** bits (`0`→`000` … `7`→`111`)
- hex digit \(\leftrightarrow\) **4** bits (`A`→`1010` … `F`→`1111`)

Hex \(\leftrightarrow\) octal: **always** hex→binary→regroup by 3. Never translate a hex digit into one octal digit.

### Worked: Tutorial 1 WP1 — \(3\mathrm{A}7\mathrm{F}_{16}\) to the “0 and 1” system

`0011 1010 0111 1111` \(\Rightarrow 0011101001111111_2\) (leading zeros optional).

### Worked: Tutorial 1 WP4 — \(7\mathrm{B}9\mathrm{D}_{16}\to\) octal

`0111 1011 1001 1101` regroup `0 111 101 110 011 101` \(\Rightarrow 075635_8\).

### Worked: Tutorial 1 WP2 — \(73456_8\to\) decimal

The “three bits per digit” sentence is a hint that it is octal. \(7\cdot4096+3\cdot512+4\cdot64+5\cdot8+6=30510_{10}\).

### Worked: Tutorial 1 WP3 — \(3241302_5\to\) hex

To decimal first: \(3\cdot15625+2\cdot3125+4\cdot625+125+3\cdot25+2=55827_{10}\). Then \(\div16\): remainders \(3,1,\mathrm{A},\mathrm{D}\) \(\Rightarrow\mathrm{DA}13_{16}\).

## 0.4 Complements (S25 loves these)

\(n\)-bit 2’s complement of \(B\) is \(2^n-B\). Add it to \(A\) and **drop** the extra carry. 1’s complement = invert every bit; if there is a carry, **add it back**.

### Worked: notes p.43 — \(7-3\) in 3 bits

\(7=111\), \(3=011\). 1’s of 3 is \(100\); \(111+100=1011\); end-around \(011+1=100=4\). 2’s of 3 is \(101\); \(111+101=1100\); drop carry \(\to100=4\).

### Worked: S25 Q1a — \((+29)+(-49)\) and \((-29)+(-49)\)

Use 8 bits (enough for 49). \(29=00011101\), \(49=00110001\), \(49^*=11001111\).

- \(29+(-49)=00011101+11001111=11101100\). MSB 1 \(\Rightarrow\) negative; 2’s of that is \(00010100=20_{10}\), so \(-20\). Check \(29-49=-20\).
- \((-29)+(-49)\): \(29^*=11100011\); \(11100011+11001111=1\,10110010\). Drop carry \(\to10110010=-78_{10}\). Check \(-78\).

If the two sign-bits add to a sign that disagrees with the true sum, write **overflow** (won’t happen on these two).

## 0.5 BCD and Gray (PYQ, thin in BEFORE MID)

BCD: \(609_{10}=0110\,0000\,1001\), \(516=0101\,0001\,0110\). Add nibbles right to left; if a nibble is \(>9\) or has a carry, add \(0110\) to that nibble. (S25 Q1b wants the **steps**, not just the final bits.)

Binary→Gray: XOR each bit with its left neighbour; MSB stays. DCMP Q1c: \(01011011_2\to 01110110_{\mathrm{Gray}}\).

## You-try checklist (Block 0)

1. Tutorial 1 word problems 1–5 closed-book.
2. S25 Q1c: \(1.00011_2\) and \(1000.11_2\) to hex and decimal. Second is the first shifted left 3 \(\Rightarrow\times8\).
3. Recite: 3 bits octal, 4 bits hex, 2’s = invert+1, BCD fix = add 6.

---

# Block 1 — Boolean, SOP/POS, NAND/NOR (1.5 h)

## 1.1 What a gate *is*

AND is series switches; OR is parallel; NOT is invert. NAND/NOR are universal. XOR is “different”; XNOR is “same.”

Positive logic: 1 = higher voltage. You will not be asked negative logic on this mid.

## 1.2 The laws that actually get used

Absorption \(A+AB=A\) and the starred distributive \(A+BC=(A+B)(A+C)\) plus consensus \(AB+A'C+BC=AB+A'C\) kill 80% of Tutorial 2.

### Worked: notes p.19 — nested mess \(\to\) one AND

\[
f=A\bigl[B+C'(AB+AC')'\bigr]
\]

Inner \((AB+AC')'=(A'+B')(A'+C)=A'+B'C\). Then \(C'(A'+B'C)=A'C'\). Then \(f=A(B+A'C')=AB\). Hardware: **one AND**. That is what “minimization” means.

### Worked: Tutorial 2b 2-var #1

\(F=AB+AB'+A'B=A+A'B=A+B\). Two-input OR.

### Worked: Tutorial 2b 3-var #1

\(F=A'BC+ABC+AB'C+AB'C'=BC+AB'\). Two 2-input ANDs, one 2-input OR.

### Worked: Tutorial 2b 4-var #1

\(ABCD+ABCD'+AB'CD+AB'CD'=ABC+AB'C=AC\).

### Worked: S24 Q4d

(i) \(A'B(D'+C'D)+B(A+A'CD)=B(A+C+D')\) after absorption (not a single variable — write the algebra; the mark is the identities).

(ii) \((A'+C)(A'+C')=A'\), then \(A'(A'+B+C'D)=A'\). **Box \(A'\).**

## 1.3 SOP vs POS

Truth-table 1s → minterms → SOP. 0s → maxterms → POS. \(A+BC\) is SOP but not canonical; expand \(A=ABC'+AB'C'+ABC+AB'C\) if they say “standard SOP.”

Tutorial 2a is exactly that expansion + a 4/8/16-row table. Do **2-var #1, 3-var #2, 4-var #4** fully; the rest is the same muscle.

3-var #2: \(F=AB+A'C\). Missing literals: \(AB=ABC+ABC'\), \(A'C=A'BC+A'B'C\). Standard SOP \(\sum m(1,3,6,7)\).

## 1.4 Two-level NAND / NOR

SOP \(F=P+Q+R\) \(\Rightarrow\) NAND the products, NAND those outputs. POS \(F=(P)(Q)\) \(\Rightarrow\) NOR the sums’ literals, NOR those outputs.

### Worked: S25 Q2a / S24 Q2a-style

\[
F=(A'+B'+C)(A'+B'+C')(B'+C'+D)=(A'+B')(B'+C'+D)
\]

SOP: \(F=B'+A'C'+A'D\).

- NAND–NAND from the SOP: NAND\((B)\) is just NOT \(B\); NAND\((A',C')\); NAND\((A',D)\); NAND those three.
- NOR–NOR from the POS: a 2-input NOR whose inputs are already \(A'\) and \(B'\); a 3-input NOR on \(B',C',D\); NOR those two outputs together (that last NOR is the AND of the two sums). Draw inverters on \(A,B,C\) as needed so the NOR inputs match the complemented literals.

DCMP Q2 (majority including C, NAND only): five keys, \(Y=1\) if at least 3 keys **and** \(C=1\). Minterms with \(C=1\) and \(\ge3\) ones among ABCDE. K-map / QM, then NAND–NAND the SOP.

## You-try checklist (Block 1)

1. Tutorial 2a: one 2-var, one 3-var, one 4-var to canonical SOP + table.
2. Tutorial 2b: all six 2-var (they take 4 minutes) and 3-var #1, #2, #6.
3. Recite consensus both SOP and POS.

---

# Block 2 — K-maps and don’t-cares (2 h)

## 2.1 Why Gray order

Two cells are adjacent only if **one** bit flips. Binary `00,01,10,11` puts a 2-bit jump in the middle; Gray `00,01,11,10` does not. That is the entire 3-var map.

Notes dump (memorize the 4-var numbers, p.27):

```
AB\CD   00  01  11  10
00       0   1   3   2
01       4   5   7   6
11      12  13  15  14
10       8   9  11  10
```

Rules: groups \(1,2,4,8,16\); rectangles only; wrap; overlap OK; SOP circles **1**s; a lone 1 is legal; **diagonal is not a group**.

Don’t-care: treat as 1 only when it completes a \(2^k\).

## 2.2 Two and three variables

### Worked: Tutorial 3a 2-var #1 — \(\sum m(1,3)\)

Cells 1 and 3 are the \(B=1\) column. \(F=B\). One wire. (2-var #3 is XOR: no group of 2.)

### Worked: Tutorial 3a 3-var #5 — \(\sum m(0,2,3,6)+d(1,7)\)

Map \(C\) vs \(AB\): 1s at \(0,2,3,6\); \(d\) at \(1,7\). Take \(d\)s: octet-ish pair of quads \(\Rightarrow F=A'+B\). Check: \(m4,m5\) stay 0.

### Worked: Tutorial 3a 3-var #9 — \(\sum m(1,3,5,7)+d(0,2)\)

All \(C=1\) already a quad. Don’t-cares unused. \(F=C\).

## 2.3 Four variables + don’t-cares

### Worked: Tutorial 3a 4-var #19

\(\sum m(0,1,4,5,7,8,9,12,13,15)+d(2,3,6,14)\).

Two quads of 8? Left two columns (CD = 00 and 01) = **\(D'\)** covering \(0,1,4,5,8,9,12,13\). Remaining 7 and 15 with \(d\) at 6,14 = **\(BC\)**. 

\[
F=D'+BC
\]

### Worked: Tutorial 3b #1 — irrigation (BEFORE MID p.38 is the same locker)

\(A\) dry, \(B\) hot, \(C\) no rain. ON if \(\ge2\) conditions. 1s at \(m3,m5,m6,m7\). Three pairs:

\[
F=AB+BC+AC
\]

Three 2-input ANDs, two 2-input ORs. That is a 6-mark answer: minterm list + map + gates.

### Worked: Tutorial 3b #2 — parking gate

\(A\)=valid card, \(B\)=in time, \(C\)=paid. \(F=A+A'BC=A+BC=\sum m(3,4,5,6,7)\).

### Worked: Tutorial 3b #3 — 4-var alert (must-drill)

\(A\) authorised, \(B\) door closed, \(C\) motion, \(D\) security ON.

- mode ON, unauthorised: \(A'D\) (B,C free) \(\to m(1,3,5,7)\)
- mode ON, authorised, door open: \(AB'D\) (C free) \(\to m(9,11)\)
- mode OFF, unauthorised, motion: \(A'CD'\) (B free) \(\to m(2,6)\)

\(\sum m(1,2,3,5,6,7,9,11)\). Map \(\Rightarrow\)

\[
F=A'D+B'D+A'CD'\quad\text{(or }D(A'+B')+A'CD'\text{)}
\]

## You-try checklist (Block 2)

1. Tutorial 3a: every 3-var including the three don’t-care rows; 4-var #1, #16 (all even = \(D'\)), #18 (all odd = \(D\)), #19, #24.
2. Tutorial 3b all three word problems, **gates drawn with 2-input only**.
3. Circle a wrap group of 4 on a blank 4-var map without looking.

---

# Block 3 — Quine–McCluskey (1.5 h)

K-map dies at 5 variables (32 cells). QM is the same adjacency, in a table. **S24 Q1 is 8 marks.** BEFORE MID only *names* the tabular method (p.19) — learn it here.

## 3.1 Combine, tick, primes

Write every 1 **and** every \(d\) in binary. Combine iff Hamming distance 1. A term that is never combined is a **prime implicant**. Don’t-cares help *form* PIs; they do **not** appear as columns in the PI chart.

## 3.2 Worked: S24 Q1 (the paper)

\[
f(v,w,x,y,z)=\sum m(13,15,17,18,19,20,21,23,25,27,29,31)+d(1,2,12,24)
\]

Include \(\{1,2,12,24\}\) while combining. After pairing and quadrupling you get an 8-cube **\(vz\)** covering every required minterm with \(v=z=1\), and a 4-cube **\(wxz\)** covering \(13,15,29,31\). Unticked pairs that still matter:

- \(vw'xy'\) covers \(20,21\) (essential — 20 lives only here)
- leftover **18** is covered by either \(w'x'yz'\) or \(vw'x'y\)

Essential: \(vz\), \(wxz\), \(vw'xy'\). Then two min SOPs (4 products each) — **not unique**:

\[
\begin{align*}
f&=vz+wxz+vw'xy'+w'x'yz'\\
f&=vz+wxz+vw'xy'+vw'x'y
\end{align*}
\]

List PIs on the script even if you stall on Petrick: that is half the 8 marks.

**You try:** drop the don’t-cares from the list and restart the first pairing column. Several PIs split; you will *feel* why \(d\)s exist.

## 3.3 When to K-map vs QM

\(\le4\) vars: K-map is faster. 5 vars: QM (or two 4-var maps for \(v=0\) and \(v=1\), then merge). Don’t mix methods mid-question; the paper asked QM.

---

# Block 4 — arithmetic, decoder, MUX (2 h)

## 4.1 Adders and subtractors

HA is units-place (no carry in). FA is every other place.

Build FA as two HA + OR on the carries, or as XOR–XOR for sum and three AND + OR for \(C_\mathrm{out}\). Same for FS with \(A'\) on the borrow ANDs.

Ripple: \(C_\mathrm{out}\) of bit \(i\) is \(C_\mathrm{in}\) of bit \(i+1\). LSB may be an HA if \(C_\mathrm{in}=0\) is frozen; the exam 4-bit add/sub needs **FA everywhere** because \(C_0=M\).

### Worked: S24 Q4a — 4-bit adder–subtractor

XOR every \(B_i\) with control \(M\), feed FA\(_i\) together with \(A_i\), chain carries, \(C_0=M\).

- \(M=0\): \(B\) passes, \(C_0=0\) \(\to A+B\)
- \(M=1\): \(B\) inverted, \(C_0=1\) \(\to A+\overline{B}+1=A-B\)

Label overflow as \(C_3\oplus C_4\) if they ask; S24 does not.

Notes p.48 is the 8-bit twin (homework). Same picture, eight FAs.

## 4.2 Comparator

Notes pp.49–50. For \(A=A_1A_0\), \(B=B_1B_0\):

\[
L=A_1'B_1+A_1'A_0'B_0+A_0'B_1B_0,\quad E=(A_1\odot B_1)(A_0\odot B_0)
\]

\(G\) is \(L\) with \(A\leftrightarrow B\). Three K-maps, not one.

## 4.3 Decoder

\(n\) selects, \(2^n\) minterm outputs, times EN. 2-to-4 / 3-to-8 / 4-to-16 are the same drawing with more ANDs (notes pp.52–56).

### Worked: S24 Q3 — 3-to-8 plus squarer

3-to-8 **is** binary-to-octal. Outputs \(O_0\ldots O_7\) light for \(n=0\ldots7\). Square on 6 bits (\(7^2=49\)):

| \(n\) | \(n^2\) | bits \(s_5\ldots s_0\) |
|-----|---------|----------------------|
| 0 | 0 | 000000 |
| 1 | 1 | 000001 |
| 2 | 4 | 000100 |
| 3 | 9 | 001001 |
| 4 | 16 | 010000 |
| 5 | 25 | 011001 |
| 6 | 36 | 100100 |
| 7 | 49 | 110001 |

OR the decoder lines that need each \(s_i\). Example \(s_0=O_1+O_3+O_5+O_7\) (odd \(n\)). \(s_5=O_6+O_7\).

### Worked: S25 Q1d — Excess-3 to BCD, unused = \(d\)

XS3 `0011…1100` map to BCD `0000…1001`. Codes `0000,0001,0010,1101,1110,1111` (and you may also \(d\) anything the paper calls unused) are don’t-cares. Four K-maps, one per BCD bit. LSB of BCD is \(D'\) of XS3 on the valid rows; the high bit is 1 only for decimal 8 and 9 (XS3 `1011`,`1100`). Draw the maps — that *is* the decoder.

## 4.4 MUX, trees, leftover variable

\(y=\overline{C}I_0+C I_1\) for 2:1. 4:1 / 8:1 / 16:1 expand the minterms of the selects (notes pp.60–65).

**Tree:** 16:1 from five 4:1s — four front 4:1s share \(C_1C_0\), back 4:1 uses \(C_3C_2\) (notes p.69). 8:1 from seven 2:1s is a 4–2–1 tree on \(C_0\), then \(C_1\), then \(C_2\) (p.68). 32:1 from 4:1s needs 11 blocks with the last select using one line and grounding the extra (p.75). 64:1 = four 16:1 plus one 4:1 (p.77).

**Leftover variable:** \(n\)-var \(f\) on a \(2^{n-1}:1\) MUX. Notes pp.70–73 and the HW line “use half the MUX size.”

### Worked: notes pp.72–73 — 8:1, \(D\) leftover

\[
K(A,B,C,D)=\sum m(1,2,3,4,5,7,9,10,12)+d(0,14,15)
\]

Select \(ABC\). Pair rows that differ only in \(D\):

| \(ABC\) | \(D{=}0\) | \(D{=}1\) | pin |
|---------|-----------|-----------|-----|
| 000 | \(d\to1\) | 1 | \(I_0=1\) |
| 001 | 1 | 1 | \(I_1=1\) |
| 010 | 1 | 1 | \(I_2=1\) |
| 011 | 0 | 1 | \(I_3=D\) |
| 100 | 0 | 1 | \(I_4=D\) |
| 101 | 1 | 0 | \(I_5=D'\) |
| 110 | 1 | 0 | \(I_6=D'\) |
| 111 | \(d\to0\) | \(d\to0\) | \(I_7=0\) |

That is the figure on p.72.

### Worked: S25 Q2b — \(f=AB'+BD+B'CD'\), 2nd LSB = data

LSB \(=D\), 2nd LSB \(=C\) \(\Rightarrow\) **data = \(C\)**, select = \(ABD\). Evaluate \(f\) at \(C=0\) and \(C=1\) for each \(ABD\):

| \(ABD\) | \(I\) |
|---------|-------|
| 000 | \(C\) |
| 001 | 0 |
| 010 | 0 |
| 011 | 1 |
| 100 | 1 |
| 101 | 1 |
| 110 | 0 |
| 111 | 1 |

Draw the 8:1 with those pins; selects \(A,B,D\).

## 4.5 Word problems that are just truth tables

### Worked: S24 Q2 — five soldiers

Constraints: \(A+B\); \(C\oplus E\); \(A\odot C\); \(D\to E\); \(B\to AD\).

\(A\odot C\) forces \(A=C\). If \(A=0\) then \(C=0\), so \(A+B\) needs \(B=1\), but \(B\to AD\) needs \(A=1\). Contradiction. Only \(A=C=1\). XOR then forces \(E=0\); \(D\to E\) with \(E=0\) forces \(D=0\); \(B\to AD\) with \(D=0\) forces \(B=0\). One minterm:

\[
F=AB'CD'E'
\]

### S25 Q3 — Rock / Paper / Scissor / Fire

Each player 2 bits (four buttons). Two LED outputs. Build a 4-input (or 8-row×8 if they encode both players) truth table from the printed win table; **tie \(\Rightarrow\) both LEDs on**. Don’t skip the block-diagram / assumptions line — it is free marks. K-map each LED. Same muscle as Tutorial 3b #3.

S24 Q4b segment \(e\) (common cathode = 1 lights the segment): ON for BCD digits 0,2,6,8 (don’t-care 10–15). One 4-var map. Q4c odd-parity *generator* on 3 bits: \(P=(A\oplus B\oplus C)'\) so the 4-bit word has an odd number of 1s.

## You-try checklist (Block 4)

1. Draw 4-bit add/sub with \(M\) from memory.
2. Redo notes leftover-MUX table without looking, then S25 Q2b.
3. Decoder squarer \(s_0\) and \(s_5\) ORs.
4. Soldiers \(F\) in one line.

---

# Block 5 — exam rehearsal (1 h)

## 5.1 How to sit the paper

Expect **1–1.5 h, ~25–30 marks** (S24 was 25; S25 was 30). Conversions are 2-mark gifts. QM / leftover MUX / word-design are the 5–8 mark piles. Draw first, algebra second.

Skip 8085, FPGA, HDL if they somehow appear — they are not this mid.

## 5.2 S25 — attack sheet (30, 1.5 h)

| Q | Marks | What | Shape |
|---|-------|------|--------|
| 1a | 2 | 2’s complement two sums | 8-bit add, convert back to signed decimal |
| 1b | 2 | BCD of 609+516 | nibble add, +0110 if needed |
| 1c | 2 | \(1.00011_2\) and \(1000.11_2\) hex+dec | second = first \(\times8\) |
| 1d | 4 | XS3→BCD decoder, unused = \(d\) | four K-maps |
| 2a | 5 | simplify + NAND and NOR two-level | Block 1.4 |
| 2b | 5 | leftover MUX, 2nd LSB = data | Block 4.4 |
| 3 | 10 | RPSF combinational | truth table from the win grid; both LEDs on a tie |

## 5.3 S24 — attack sheet (25, 1.5 h)

| Q | Marks | What | Shape |
|---|-------|------|--------|
| 1 | 8 | 5-var QM + uniqueness | Block 3.2; **two** min SOPs |
| 2 | 4 | soldiers Boolean | \(AB'CD'E'\) |
| 3 | 4 | 3-to-8 + squarer | Block 4.3 |
| 4a | 2 | 4-bit add/sub | \(M\) on \(B\) XORs and \(C_0\) |
| 4b | 3 | 7-seg \(e\), common cathode | K-map digits 0,2,6,8 |
| 4c | 3 | odd parity, 3-bit | \(P=(A\oplus B\oplus C)'\) |
| 4d | 1 | two Boolean lines | \(B(A+C+D')\) and \(A'\) |

## 5.4 DCMP mid page 1 (only if S24/S25 are clean)

Q1 conversions; Q2 NAND majority-with-C locker; Q3 decoder+two 4:1 + XOR — write \(Y\) as a Boolean of \(A,B,C\) by enumerating, then NOR–NOR; Q4 3-bit right-shift of `0110` (draw \(Q_2Q_1Q_0\) vs CLK); Q5 lock vs lock-free — tabulate 8 states, see if unused states trap.

**Do not** open DCMP page 2 (8085 endsem) for this mid.

## 5.5 Sequential 15-minute patch (only leftover time)

Excitation table from the formula sheet: to *leave* a 0, SR needs \(S=1,R=0\); JK only needs \(J=1\); T toggles when you want a change.

Moore output on states; Mealy output on arcs. Overlapping `1101`: from the hit state, a new `1` goes to the “got 1” state, not to S0. Non-overlapping (DCMP endsem Q2): hit \(\to\) S0.

Race-free: give adjacent binary codes to states joined by an arc so one FF flips.

## 5.6 Last 30 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet. Missing box = first revision target, not a new chapter.
