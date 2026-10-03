# CSLA 204 FoML — mid-sem, September 2026

**Score: 18/30** (as reported). Printed paper is **25 marks**, 1.5 h, solve **any 5**. If the script is actually 18/25, the mid is stronger than 18/30 — confirm before treating 60% as final.

Photos: [`../resources/pyqs/MST_2026_Sep_p1.jpg`](../resources/pyqs/MST_2026_Sep_p1.jpg), [`../resources/pyqs/MST_2026_Sep_p2.jpg`](../resources/pyqs/MST_2026_Sep_p2.jpg).

3rd semester B.Tech (ECE/Mining/Chem/Civil). Calculators allowed. All questions equal marks.

![FoML mid page 1](../resources/pyqs/MST_2026_Sep_p1.jpg)

![FoML mid page 2](../resources/pyqs/MST_2026_Sep_p2.jpg)

## Q1 — decision tree regression

Build a regression tree with **MSE** and **weighted MSE**. Best split. Predict salary for Experience = 2 years, Education = Diploma (1).

| Employee | Experience \(X_1\) | Education \(X_2\) | Salary \(Y\) (₹1000s) |
|----------|-------------------:|-------------------|----------------------:|
| 1 | 1 | Diploma (1) | 25 |
| 2 | 2 | Diploma (1) | 30 |
| 3 | 3 | Degree (2) | 35 |
| 4 | 5 | Degree (2) | 50 |
| 5 | 6 | Masters (3) | 65 |
| 6 | 8 | Masters (3) | 80 |

## Q2 — decision tree classification

Buy a laptop (Yes/No). Entropy and information gain for **Age, Income, Student**. Best root.

| Person | Age | Income | Student | Buy |
|--------|-----|--------|---------|-----|
| 1 | Young | High | No | No |
| 2 | Young | High | Yes | Yes |
| 3 | Young | Low | No | Yes |
| 4 | Young | Low | Yes | Yes |
| 5 | Old | High | No | No |
| 6 | Old | High | Yes | Yes |
| 7 | Old | Low | No | No |
| 8 | Old | Low | Yes | Yes |

## Q3 — least squares

Scuba max dive time vs depth. Fit the least-squares line. Predict time at **110 ft**.

Visible pairs: (50, 80), (60, 55). Page 2 continues the table; the left edge is cropped. Visible continuation cells: 45; then 70 with 35; 80 with 25; 90 with 22; 100 at the bottom edge. Check the photo before computing. The usual six pairs for this wording are (50, 80), (60, 55), (70, 45), (80, 35), (90, 25), (100, 22).

## Q4 — simple linear regression

Hours studied \(x\) vs exam score \(y\). Model \(y = \beta_0 + \beta_1 x\).

| Student | \(x\) | \(y\) |
|---------|------:|------:|
| 1 | 2 | 65 |
| 2 | 4 | 72 |
| 3 | 5 | 78 |
| 4 | 7 | 85 |
| 5 | 8 | 88 |

(a) Least-squares \(\hat\beta_1\), \(\hat\beta_0\). (b) Predict for 6 hours.

## Q5 — logistic regression

\(Y=1\) purchase, \(Y=0\) no purchase.

\[
P(Y=1\mid X)=\frac{1}{1+e^{1.5-0.4X}}
\]

Customer visits **2** times. Compute the probability. If the company calls them a buyer only when the probability is **≥ 0.4**, give the predicted class. Then binary cross-entropy for \(Y=0\):

\[
L=-[y\log p+(1-y)\log(1-p)]
\]

## Q6 — Bayes, then eigenvalues

**A.** Defective unit. Unit A makes 70% of products, Unit B 30%. Inspection says “made by Unit B” and is correct 85% of the time, wrong 15%. Find \(P(\text{actually B}\mid\text{inspection says B})\).

**B.** \(A=\begin{bmatrix}4&2\\1&3\end{bmatrix}\). Eigenvalues and eigenvectors.
