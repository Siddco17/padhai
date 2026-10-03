# ECLA 301 / ECL3xx Linear Algebra for ML — MST-1 map

**Sat 7 Sep 2026.** Questions are in [`midsem-2026.md`](midsem-2026.md). Score not in yet.

**Scope:** classmate lectures through Lecture 11 only (Gaussian / \(E\)-matrices / inverse / solution structure / span–basis / rank–maps). Do **not** grind Boyd, convex, eigen, SVD, Gram–Schmidt, projections, or least squares.

**Local copies:** `resources/classmate/NOTES/SECTION A/LA (BEFORE MID).pdf`; topic PDFs in `resources/classmate/NOTES/`; Strang 4e `resources/Gilbert_Strang_Linear_Algebra_and_Its_Applicatio_230928_225121.pdf`

**Success:** (1) eliminate a \(3\times 3\) with a zero first pivot and back-sub, (2) write the complete solution \(x=x_p+N(A)\) from an echelon matrix, (3) rank + image basis + kernel basis + injective/surjective, (4) \(2\times 2\) inverse, Gauss–Jordan, and \(PA=LU\) multipliers.

## Hours

| Block | Hours | Job |
|-------|-------|-----|
| 0 | 0.5 | Vectors, \(Ax=b\) row/column picture |
| 1 | 1.5 | Gaussian, elimination matrices, inverse, \(LU\) |
| 2 | 1.0 | Solution structure: pivots/free, \(x_p+x_h\), consistency |
| 3 | 1.5 | Subspaces, span, independence, basis, rank, linear maps |
| **If 4 h** | | Fold Block 0 into Block 1; skip PS1 outer-product / flop-count extras |

## Topic × resource × paper

| Topic | Read | Drill |
|-------|------|-------|
| Feature vectors, combinations | `Understanding Vectors.pdf`; Strang 1.2 column picture | PS2 #1–4 |
| \(Ax=b\) row vs column | `Systems of Linear Equations.pdf`; Strang 1.2 | Recite: rows = equations, columns = combination |
| Gaussian elimination | `Gaussian Elimination.pdf`; Strang 1.3 | Lecture \(3\times 3\) (pivots \(2,1,4\)); **PS2 #5** |
| Elimination matrices, \(EA=U\) | `Elimination using Matrices.pdf`; Strang 1.4–1.5 | **PS2 #9**, #10; PS1 #1, #2 |
| Inverse, Gauss–Jordan, \(PA=LU\) | `Concept of Matrix Inverse.pdf`; Strang 1.5–1.6 | PS2 #11; PS1 #4, #5; \(2\times 2\) formula |
| \(x_p+x_h\), 0 / 1 / \(\infty\) | `Solution Structure.pdf`; Strang 2.2 | **PS2 #6, #7**; Strang-style special solutions |
| Subspaces vs affine | `Vector Spaces.pdf` (L9) | PS2 #13, #14 |
| Span, independence, basis | `Span Independence and Basis.pdf` (L10); Strang 2.3 | PS2 #15–18 |
| Rank, kernel, maps | `Rank Linear Mapping.pdf` (L11); Strang 2.4 / 2.6 | **PS2 #19–24** |

## Practice files (no mid PYQ in vault)

- `resources/classmate/NOTES/Practice Problem set 1.pdf` — Unit 1: elim / \(E\) / inverse / \(LU\) / batch maps. Skip #12–13 (Schur / \(LDL^T\)) unless Block 1 is already clean.
- `resources/classmate/NOTES/Practice set 2.pdf` — through Lecture 11; **this is the MST paper**. Core: #5–7, #9–12, #15–24.
- Coursebook units in `docs/index.html` list LS / PCA / eigen / SVD / convex — those are later. Practice sets say least squares is **not** this exam.

## Strang (4e) — stop here

Ch. 1 (elim, multiplication, \(LU\), inverse) and Ch. 2 through 2.3 + rank/maps (2.4 rank / 2.6 transformations). Skip Ch. 3 orthogonality, Ch. 5 eigen, Ch. 6 SVD.

## Exam-day order

1. Any elimination with numbers (you will finish these).
2. Complete solution / nullspace basis (high marks, same arithmetic as (1)).
3. Rank + injective/surjective from shape and \(r\) (2 minutes once \(r\) is known).
4. Inverse / \(LU\) last if the clock dies — write multipliers in \(L\) even if \(U\) is messy.
