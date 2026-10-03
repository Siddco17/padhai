---
tags: [concept, course/la, course/foml, course/mni]
aliases: [OLS, normal equation, lstsq]
---

# Least squares

Find `x` minimising `‖Ax − b‖²`. Normal equation `AᵀA x = Aᵀb`. Geometry: `Ax` is the [[Projection]] of `b` onto Col(A).

## Why it matters here

[[Linear Algebra]] unit 1. [[Linear regression]] in [[FoML]] / [[FoML Lab]] (NumPy `lstsq` vs sklearn). [[MNI]] “least-squares fit of experimental data”.

## Exam form

Set up the design matrix (column of ones + features). Residual is orthogonal to the column space. Overfit when you throw more columns than you have independent data — [[Overfitting]].

## See also

- [[Projection]] · [[Linear regression]] · [[SVD]] · [[Linear Algebra]] · [[FoML]]
