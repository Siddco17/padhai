# Tutorial 3 — K-map solutions (DCHD / ECLA201)

Map index (Gray). The **number in the cell is the minterm**, same as binary \(ABCD\) with A MSB. Gray order only moves the cell; it does not renumber it.

2-var \(A\backslash B\):

| | \(B=0\) | \(B=1\) |
|--|--|--|
| \(A=0\) | 0 | 1 |
| \(A=1\) | 2 | 3 |

3-var \(AB\backslash C\):

| | \(C=0\) | \(C=1\) |
|--|--|--|
| 00 | 0 | 1 |
| 01 | 2 | 3 |
| 11 | 6 | 7 |
| 10 | 4 | 5 |

4-var \(AB\backslash CD\):

| | 00 | 01 | 11 | 10 |
|--|--|--|--|--|
| 00 | 0 | 1 | 3 | 2 |
| 01 | 4 | 5 | 7 | 6 |
| 11 | 12 | 13 | 15 | 14 |
| 10 | 8 | 9 | 11 | 10 |

Rules used: groups of \(1,2,4,8,16\); rectangles; wrap; overlap OK; circle 1s; use a don’t-care only if it makes a bigger power-of-2; a cell that is neither 1 nor \(d\) must stay out of every group.

2-input gates: a 3-literal term is two ANDs in series. A 3-input OR is two ORs.

---

# Part (a)

## 2-variables

### 1. \(\sum m(1,3)\)

Cells 1 and 3 are the whole \(B=1\) column.

**\(F=B\)**. Wire \(B\).

### 2. \(\sum m(0,1,3)\)

Pair \(0,1 = A'\). Pair \(1,3 = B\). Cell 2 stays 0, so not a quad.

**\(F=A'+B\)**. NOT + OR.

### 3. \(\sum m(1,2)\)

1 and 2 are diagonal. No legal pair.

**\(F=A'B+AB'\)**. Two NOTs, two ANDs, one OR. (XOR if you are allowed it.)

### 4. \(\sum m(0,2,3)\)

Pair \(0,2 = B'\). Pair \(2,3 = A\).

**\(F=A+B'\)**. NOT + OR.

### 5. \(\sum m(0,1,2,3)\)

All four cells.

**\(F=1\)**. Output tied to 1.

### 6. \(\sum m(0,2)\)

Column \(B=0\).

**\(F=B'\)**. One NOT.

---

## 3-variables

### 1. \(\sum m(1,3,5,7)\)

Whole \(C=1\) column (cells 1, 3, 7, 5).

**\(F=C\)**. Wire.

### 2. \(\sum m(0,2,4,6)\)

Whole \(C=0\) column.

**\(F=C'\)**. One NOT.

### 3. \(\sum m(1,3,4,5)\)

Pair \(1,3 = A'C\). Pair \(4,5 = AB'\) (wrap of row 10, both columns).  
\(B'C\) is also a prime (cells 1 and 5) but using it still leaves a 1 uncovered, so it is not in the minimum.

**\(F=A'C+AB'\)**. Two ANDs, one OR, two NOTs.

### 4. \(\sum m(0,1,2,3,6,7)\)

Quad \(0,1,2,3 = A'\) (rows 00 and 01). Quad \(2,3,6,7 = B\) (rows 01 and 11). Cell 4 and 5 stay 0.

**\(F=A'+B\)**. NOT + OR.

### 5. \(\sum m(0,2,3,6)+d(1,7)\)

| \(AB\backslash C\) | 0 | 1 |
|--|--|--|
| 00 | **1** | **d** |
| 01 | **1** | **1** |
| 11 | **1** | **d** |
| 10 | 0 | 0 |

Take both don’t-cares.

- Rows 00+01, both columns: \(0,1,2,3\) → **\(A'\)** (uses \(d_1\)).
- Rows 01+11, both columns: \(2,3,6,7\) → **\(B\)** (uses \(d_7\)).

Cells 4 and 5 stay 0, so this is not \(F=1\).

**\(F=A'+B\)**. NOT + OR.

### 6. \(\sum m(0,2,3,4,6,7)\)

Column \(C=0\): \(0,2,6,4\) → **\(C'\)**.  
Rows 01+11: \(2,3,6,7\) → **\(B\)**.  
Left out: cell 1 and cell 5.

**\(F=B+C'\)**. NOT + OR.

### 7. \(\sum m(0,1,3,4,5,7)\)

Rows 00+10: \(0,1,4,5\) → **\(B'\)**.  
Column \(C=1\): \(1,3,7,5\) → **\(C\)**.  
Left out: 2 and 6.

**\(F=B'+C\)**. NOT + OR.

### 8. \(\sum m(1,2,3,4,6,7)\)

Rows 01+11 → **\(B\)** (covers 2, 3, 6, 7).  
Left: cell 1, which only pairs with 3 → **\(A'C\)**.  
Cell 4 only pairs with 6 → **\(AC'\)**.

**\(F=B+A'C+AC'\)**. Two ANDs, two ORs, two NOTs.

### 9. \(\sum m(1,3,5,7)+d(0,2)\)

The four 1s are already the \(C=1\) column. Don’t-cares \(0,2\) sit in \(C=0\) and are not needed. Using them to build \(A'\) still leaves cells 5 and 7, so \(C\) is the minimum.

**\(F=C\)**. Wire. Don’t-cares left unused (treated as 0).

### 10. \(\sum m(1,2,4,6)+d(0,3,7)\)

(PDF writes \(\sum m\, m(\ldots)\); it is \(\sum m(1,2,4,6)\).)

| \(AB\backslash C\) | 0 | 1 |
|--|--|--|
| 00 | **d** | **1** |
| 01 | **1** | **d** |
| 11 | **1** | **d** |
| 10 | **1** | 0 |

Only forced 0 is cell 5.

- Rows 00+01 → **\(A'\)** (uses \(d_0,d_3\)).
- Column \(C=0\) → **\(C'\)** (uses \(d_0\)).

Cell 5 is \(AC\), outside both groups. \(d_7\) is not needed.

**\(F=A'+C'\)**. Two NOTs, one OR.

---

## 4-variables

### 1. \(\sum m(0,1,4,5)\)

Top-left quad, rows 00+01, columns 00+01.

**\(F=A'C'\)**. One AND, two NOTs.

### 2. \(\sum m(2,3,6,7)\)

Rows 00+01, columns 11+10.

**\(F=A'C\)**. One AND, one NOT.

### 3. \(\sum m(0,2,4,6,8,10,12,14,15)\)

All eight \(D=0\) cells → **\(D'\)**.  
Left: cell 15. Its only 1-neighbour is 14, so pair \(14,15\) → **\(ABC\)**.

**\(F=D'+ABC\)**. NOT; AND(\(A,B\)) then AND with \(C\); OR.

### 4. \(\sum m(0,2,8,10)\)

Corners of \(B=0,D=0\): cells 0, 2, 8, 10 (wrap).

**\(F=B'D'\)**. One AND, two NOTs.

### 5. \(\sum m(1,3,5,7,9,11,13,15,14)\)

All eight \(D=1\) cells → **\(D\)**.  
Left: cell 14, which only pairs with 15 → **\(ABC\)**.

**\(F=D+ABC\)**. AND(\(A,B\)) then AND with \(C\); OR with \(D\).

### 6. \(\sum m(1,3,9,11)\)

Rows 00+10, columns 01+11. Wrap in \(B\).

**\(F=B'D\)**. One AND, one NOT.

### 7. \(\sum m(0,1,4,5,6,7,12,13,14,15)\)

Rows 01+11 → **\(B\)** (eight cells).  
Left: 0 and 1, which join 4 and 5 → quad **\(A'C'\)**.

**\(F=B+A'C'\)**. One AND, two NOTs, one OR.

### 8. \(\sum m(0,1,2,3,8,9,10,11)\)

Rows 00+10, all four columns.

**\(F=B'\)**. One NOT.

### 9. \(\sum m(1,3,4,5,7,9,11,12,13,15)\)

Columns 01+11 → **\(D\)** (eight cells).  
Left: 4 and 12. They sit in the quad \(B=1,C=0\) (cells 4, 5, 12, 13), all 1s → **\(BC'\)**.

**\(F=D+BC'\)**. One AND, one NOT, one OR.

### 10. \(\sum m(4,5,6,7,12,13,14,15)\)

Rows 01+11, all columns.

**\(F=B\)**. Wire.

### 11. \(\sum m(0,1,4,5,8,9,10,11,14,15)\)

| | 00 | 01 | 11 | 10 |
|--|--|--|--|--|
| 00 | 1 | 1 | 0 | 0 |
| 01 | 1 | 1 | 0 | 0 |
| 11 | 0 | 0 | 1 | 1 |
| 10 | 1 | 1 | 1 | 1 |

Two equally small covers (3 terms, 6 literals):

- Quad \(0,1,4,5=A'C'\), quad \(8,9,10,11=AB'\), quad \(10,11,14,15=AC\).
- Same, but \(8,9\) taken with \(0,1\) as **\(B'C'\)** instead of the whole row \(AB'\).

**\(F=A'C'+AB'+AC\)** (or \(A'C'+B'C'+AC\)).

Gates: three 2-input ANDs, OR-tree (two ORs), NOTs on the complemented literals.

### 12. \(\sum m(0,1,4,5,8,9,12,13)\)

Columns 00+01, all rows.

**\(F=C'\)**. One NOT.

### 13. \(\sum m(0,2,3,6,7,8,10,11,14,15)\)

Columns 11+10 → **\(C\)**.  
Left: 0 and 8, column 00, rows 00+10 → **\(B'C'D'\)**.

**\(F=C+B'C'D'\)**. NOT on \(B\) and \(D\); AND(\(B',C'\)) then AND with \(D'\); OR with \(C\).

### 14. \(\sum m(2,3,6,7,10,11,14,15)\)

Columns 11+10, all rows.

**\(F=C\)**. Wire.

### 15. \(\sum m(0,2,4,6,9,11,13,15)\)

\(A=0,D=0\): cells 0, 2, 4, 6 → **\(A'D'\)**.  
\(A=1,D=1\): cells 9, 11, 13, 15 → **\(AD\)**.

**\(F=A'D'+AD\)** (XNOR). Two ANDs, one OR, two NOTs.

### 16. \(\sum m(0,2,4,6,8,10,12,14)\)

Every even minterm.

**\(F=D'\)**. One NOT.

### 17. \(\sum m(1,3,5,7,8,10,12,14)\)

\(A=0,D=1\) → **\(A'D\)**.  
\(A=1,D=0\) → **\(AD'\)**.

**\(F=A'D+AD'\)** (XOR). Two ANDs, one OR, two NOTs.

### 18. \(\sum m(1,3,5,7,9,11,13,15)\)

Every odd minterm.

**\(F=D\)**. Wire.

### 19. \(\sum m(0,1,4,5,7,8,9,12,13,15)+d(2,3,6,14)\)

| | 00 | 01 | 11 | 10 |
|--|--|--|--|--|
| 00 | 1 | 1 | d | d |
| 01 | 1 | 1 | 1 | d |
| 11 | 1 | 1 | 1 | d |
| 10 | 1 | 1 | **0** | **0** |

Forced 0s: cells 10 and 11 only.

- Columns 00+01 (this is \(C=0\), not \(D'\)) → octet **\(C'\)**. Covers 0, 1, 4, 5, 8, 9, 12, 13.
- Rows 01+11 → octet **\(B\)**. Legal because both 0s are in row 10. Covers 7 and 15 (and uses \(d_6,d_{14}\)).

\(BC\) also covers 7 and 15, but it is inside the octet \(B\), so \(B+C'\) is smaller.

**\(F=B+C'\)**. One NOT, one OR.

### 20. \(\sum m(1,2,3,4,5,7,9,10,11,13,15)+d(0,6,8,12)\)

Only forced 0 is cell 14. Two equally small covers:

- **\(F=B'+C'+D\)** — set \(d_6=0\). Zero only at \(BCD'=m_6\) and \(m_{14}\).
- **\(F=A'+B'+D\)** — same cost.

Three NOTs, OR-tree.

Check of \(B'+C'+D\): it is 0 only when \(B=C=1,D=0\), i.e. cells 6 (\(d\)) and 14 (the real 0). Every required 1 is outside that pair.

### 21. \(\sum m(0,2,3,5,6,8,9,11,12,14)+d(1,4,7,10,13,15)\)

Ones and don’t-cares together are all 16 cells. Every don’t-care is taken as 1.

**\(F=1\)**. Output tied to 1.

### 22. \(\sum m(1,5,6,11,12,13,14)+d(4)\)

| | 00 | 01 | 11 | 10 |
|--|--|--|--|--|
| 00 | 0 | 1 | 0 | 0 |
| 01 | d | 1 | 0 | 1 |
| 11 | 1 | 1 | 0 | 1 |
| 10 | 0 | 0 | 1 | 0 |

Cell 11 is surrounded by 0s (10, 9, 15, 3). It stays a single minterm.

- Pair \(1,5\) → **\(A'C'D\)** (only legal group that covers cell 1).
- Quad \(4,6,12,14\) → **\(BD'\)** (uses \(d_4\); covers 6, 12, 14).
- Quad \(4,5,12,13\) → **\(BC'\)** (covers 5, 12, 13).
- Cell 11 → **\(AB'CD\)**.

**\(F=A'C'D+BD'+BC'+AB'CD\)**.

Gates: \(BD'\) and \(BC'\) are single ANDs; \(A'C'D\) is two ANDs; \(AB'CD\) is three ANDs; OR-tree of the four terms.

### 23. \(\sum m(2,3,4,6,7,8,10,12,14,15)+d(0,1,5,9)\)

Forced 0s: cells 11 and 13.

- Rows 00+01 → octet **\(A'\)** (uses \(d_0,d_1,d_5\)).
- Columns 00+10 → octet **\(D'\)** (uses \(d_0\)). Covers 2, 4, 6, 8, 10, 12, 14.
- Left: cell 15. Quad \(6,7,14,15\) → **\(BC\)** (does not touch 11 or 13).

**\(F=A'+D'+BC\)**. NOT, NOT, AND(\(B,C\)), OR-tree.

### 24. \(\sum m(1,2,6,7,8,13,14,15)+d(0,3,5,12)\)

Forced 0s: 4, 9, 10, 11.

One minimum grouping (others of the same size exist):

- Row 00, all columns → **\(A'B'\)** (uses \(d_0,d_3\); covers 1, 2).
- Quad \(6,7,14,15\) → **\(BC\)**.
- Quad \(5,7,13,15\) → **\(BD\)** (uses \(d_5\); covers 13).
- Pair \(0,8\) → **\(B'C'D'\)** (uses \(d_0\); covers 8). Does not include cell 4.

**\(F=A'B'+BC+BD+B'C'D'\)**.

Same cost, also valid: \(AB+A'C+A'D+B'C'D'\), and several others. Any of these is a minimum SOP.

### 25. \(\sum m(0,1,2,6,8,9,10,11,14,15)+d(3,4,5,13)\)

Forced 0s: cells 7 and 12. Three equally small covers:

- **\(F=B'+CD'+AD\)**
  - Rows 00+10 → \(B'\) (uses \(d_3\)).
  - Column 10 → \(CD'\) (cells 2, 6, 10, 14, all 1s).
  - Quad \(9,11,13,15\) → \(AD\) (uses \(d_{13}\); covers 15).
- **\(F=B'+CD'+AC\)** — \(AC\) is cells 10, 11, 14, 15 instead of \(AD\).
- **\(F=B'+A'D'+AC\)** — \(A'D'\) is cells 0, 2, 4, 6 (uses \(d_4\)) instead of \(CD'\).

### 26. \(\sum m(0,1,2,3,4,5)+d(10,11,12,13,14,15)\)

(PDF writes \(\sum 0,1,2,3,4,5)\); it is \(\sum m(0,1,2,3,4,5)\).)

Forced 0s: 6, 7, 8, 9. Three equally small covers:

- **\(F=A'B'+A'C'\)** — row 00, plus columns 00+01 of rows 00+01.
- **\(F=A'C'+B'C\)** — same \(A'C'\) quad, and cells 2, 3, 10, 11 → \(B'C\) (uses \(d_{10},d_{11}\)).
- **\(F=A'B'+BC'\)** — row 00, plus cells 4, 5, 12, 13 → \(BC'\) (uses \(d_{12},d_{13}\)).

---

# Part (b) — word problems

## 1. Irrigation

\(A\): soil dry, \(B\): hot, \(C\): no rain. ON when at least two are 1.

| ABC | # of 1s | \(F\) |
|--|--|--|
| 000 | 0 | 0 |
| 001 | 1 | 0 |
| 010 | 1 | 0 |
| 011 | 2 | 1 |
| 100 | 1 | 0 |
| 101 | 2 | 1 |
| 110 | 2 | 1 |
| 111 | 3 | 1 |

**\(\sum m(3,5,6,7)\)**.

Pairs: \(3,7=BC\), \(5,7=AC\), \(6,7=AB\). No quad (cells 0, 1, 2, 4 are 0).

**\(F=AB+BC+AC\)**.

2-input: three ANDs, then OR(AB, BC) and OR that with AC.

## 2. Parking gate

\(A\): valid card, \(B\): within allowed time, \(C\): fee paid.

- \(A=1\): open for every \(BC\) → cells 4, 5, 6, 7.
- \(A=0\): open only for \(BC=11\) → cell 3.
- Else closed.

**\(\sum m(3,4,5,6,7)\)**.

Row pair of \(A=1\) is not quite an octet. Cells 4–7 are the quad **\(A\)**. Cell 3 joins cell 7 as pair **\(BC\)** (cells 3 and 7; the other two of that quad would be 1 and 5 — cell 1 is 0, so do not call it \(C\)). Overlap on cell 7 is fine.

Algebra: \(F=A+A'BC=A+BC\).

**\(F=A+BC\)**. AND(\(B,C\)), OR with \(A\).

## 3. Security alert

\(A\): authorised, \(B\): door closed, \(C\): motion, \(D\): security mode ON.

1. Mode ON, unauthorised: \(A=0,D=1\), \(B\) and \(C\) free → \(m_1,m_3,m_5,m_7\).
2. Mode ON, authorised, door open: \(A=1,B=0,D=1\), \(C\) free → \(m_9,m_{11}\).
3. Mode OFF, unauthorised, motion: \(A=0,C=1,D=0\), \(B\) free → \(m_2,m_6\).

**\(\sum m(1,2,3,5,6,7,9,11)\)**.

| | 00 | 01 | 11 | 10 |
|--|--|--|--|--|
| 00 | 0 | 1 | 1 | 1 |
| 01 | 0 | 1 | 1 | 1 |
| 11 | 0 | 0 | 0 | 0 |
| 10 | 0 | 1 | 1 | 0 |

- Quad \(2,3,6,7\) → **\(A'C\)** (all four are required 1s).
- Quad \(1,3,5,7\) → **\(A'D\)**.
- Quad \(1,3,9,11\) → **\(B'D\)**.

**\(F=A'C+A'D+B'D\)**.

\(A'CD'\) also covers cells 2 and 6, but those two already sit inside the quad \(A'C\), so the 3-literal term is not minimum.

2-input: three ANDs, OR-tree, NOTs on \(A'\) and \(B'\).
