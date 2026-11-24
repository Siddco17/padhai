---
tags: [course/mni, endsem]
---

# Block 3 — Regression (1 h)

December 2022 Q3 is 6 marks. November 2022 Q6 is 6.5 marks. The September 2022 sessional and the 2026 mid both ask for a fit. The marks are for setting up the normal equations and finishing the arithmetic.

The class sheet is `resources/notes/6-Regression-Analysis.pdf`. Page 1 is the linear case.

![Class linear regression: residual and the two normal equations](figures/source/class-linear-regression.jpg)

## Theory

You have noisy pairs \((x_i, y_i)\) and you want the curve that makes the sum of squared vertical errors as small as it can be. For a straight line that produces two equations. For a quadratic, three. An exponential becomes a straight line after you take \(\ln y\).

Do not sketch a line by eye and then invent \(a\) and \(b\). Write the sums, write the equations, solve.

## Formulas

Straight line \(y=a_0+a_1 x\). With \(n\) points:

\[
a_1=\frac{n\sum xy-(\sum x)(\sum y)}{n\sum x^2-(\sum x)^2}, \qquad
a_0=\frac{(\sum y)(\sum x^2)-(\sum xy)(\sum x)}{n\sum x^2-(\sum x)^2}
\]

| Symbol | Meaning |
|---|---|
| \(n\) | number of points |
| \(\sum x, \sum y\) | add the column |
| \(\sum xy\) | multiply each pair, then add |
| \(\sum x^2\) | square each \(x\), then add. This is not \((\sum x)^2\) |

Quadratic \(y=a+bx+cx^2\). The three normal equations:

\[
\begin{aligned}
n a + b\sum x + c\sum x^2 &= \sum y \\
a\sum x + b\sum x^2 + c\sum x^3 &= \sum xy \\
a\sum x^2 + b\sum x^3 + c\sum x^4 &= \sum x^2 y
\end{aligned}
\]

Exponential \(y=ae^{bx}\). Set \(Y=\ln y\). Fit the straight line \(Y=\ln a + bx\). Then \(a=e^{\ln a}\).

## Derivation — where the two line equations come from

1. Error of one point: \(e_i=y_i-(a_0+a_1 x_i)\).
2. Total squared error \(S=\sum e_i^2\).
3. At the minimum, \(\partial S/\partial a_0=0\) and \(\partial S/\partial a_1=0\).
4. \(\partial S/\partial a_0=0\) says the errors add to zero: \(n a_0+a_1\sum x=\sum y\).
5. \(\partial S/\partial a_1=0\) says \(\sum x\, e_i=0\): \(a_0\sum x+a_1\sum x^2=\sum xy\).
6. Solve the pair. The slope formula above is that solution.

The quadratic is the same idea with a third derivative, \(\partial S/\partial c=0\), which brings in \(\sum x^2 y\) and \(\sum x^4\).

## Solved — December 2022 re-exam Q3

Fit \(Y=a+bX+cX^2\).

| \(X\) | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| \(Y\) | 11 | 15 | 26 | 38 | 42 | 55 | 64 | 80 | 93 | 108 |

1. \(n=10\).
2. \(\sum X=55\), \(\sum X^2=385\), \(\sum X^3=3025\), \(\sum X^4=25333\).
3. \(\sum Y=532\), \(\sum XY=3816\), \(\sum X^2 Y=30532\).
4. The system is
   \[
   \begin{aligned}
   10a+55b+385c&=532 \\
   55a+385b+3025c&=3816 \\
   385a+3025b+25333c&=30532.
   \end{aligned}
   \]
5. Solution: \(a=4.70\), \(b=5.371\), \(c=0.492\).

Check at \(X=1\): \(4.70+5.371+0.492=10.56\), against the measured \(11\). Check at \(X=10\): \(4.70+53.71+49.24=107.7\), against \(108\). The residuals are the noise. The fit is not supposed to pass through every point.

**Box:** \(Y=4.70+5.371X+0.492X^2\).

On the paper, most of the marks are the three sums and the three equations. If the arithmetic dies, leave the equations written and the sums boxed.

## Practice

1. September 2022 sessional, 4 marks. Fit \(y=ae^{bx}\) to \(x=1,2,3,4,5,6\) and \(y=1.7,\ 3.6,\ 7.6,\ 16.6,\ 34,\ 72\).
2. November 2022 endsem. Fit \(Y=a+bX+cX^2\) to

| \(X\) | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| \(Y\) | 15 | 23 | 38 | 51 | 62 | 82 |

### Answers

1. \(Y=\ln y\). Slope \(b=0.750\), intercept \(\ln a=-0.216\), so \(a=0.806\). **Box** \(y=0.806\,e^{0.750 x}\). The \(y\) column roughly doubles each step, and \(e^{0.75}\approx 2.12\), which is the same story.
2. \(Y=6+7.786X+0.786X^2\).
