---
tags: [course/mni, endsem]
---

# Block 0 — Errors (45 min)

Do this before the bridges. The combination rule is how the September 2026 mid Q3(b) is marked, and it is the language of every later percent.

Read, if you want the professor’s page instead of this note: `resources/notes/Limiting_Errors_2-16.pdf` and the first two pages of `Limiting_Error_A.pdf`.

## Theory, the lines that score

| Word | One line |
|---|---|
| Accuracy | closeness to the **true** value |
| Precision | agreement among **repeats** |
| Resolution | smallest change in the input that moves the reading |
| Sensitivity | slope, \(\Delta\) output / \(\Delta\) input |
| Absolute error | measured minus true. Correction is the negative of that. |
| Relative error | absolute error divided by the true value |

Three kinds, one line each. **Gross:** you misread or used the wrong range. **Systematic:** the same bias every time (calibration, temperature, loading, parallax). **Random:** the scatter that remains after the bias is removed. Average the random part.

A percent-of-**full-scale** guarantee is a fixed number of volts, not a fixed percent of the reading. A \(0\)–\(150\,\mathrm{V}\) meter at \(\pm 1\%\) of full scale is \(\pm 1.5\,\mathrm{V}\) at every reading. At \(75\,\mathrm{V}\) that is \(2\%\) of the reading. At \(37.5\,\mathrm{V}\) it is \(4\%\).

## Formulas

\[
\delta A = A_m - A_\mathrm{true}, \qquad
\varepsilon = \frac{\delta A}{A_\mathrm{true}}
\]

| Symbol | Meaning |
|---|---|
| \(A_m\) | the reading |
| \(A_\mathrm{true}\) | the value you would get with a much better instrument |
| \(\delta A\) | absolute error, in the same unit as \(A\) |
| \(\varepsilon\) | relative error, a fraction. Multiply by 100 for a percent. |

For a result built from several measured quantities, the **limiting** (worst-case) relative error adds the pieces. You do not cancel signs. You take the combination that makes the answer as wrong as the maker’s guarantee allows.

| How \(y\) is built | Relative limiting error |
|---|---|
| \(y = u \pm v\) | \((\|u\|/\|y\|)\varepsilon_u + (\|v\|/\|y\|)\varepsilon_v\) |
| \(y = uv\) or \(y = u/v\) | \(\varepsilon_u + \varepsilon_v\) |
| \(y = u^n\) | \(\|n\|\,\varepsilon_u\) |
| \(y = k\, u^{n} v^{m}\) | \(\|n\|\varepsilon_u + \|m\|\varepsilon_v\) |
| \(P = I^2 R\) | \(2\varepsilon_I + \varepsilon_R\) |
| \(R = P/I^2\) | \(\varepsilon_P + 2\varepsilon_I\) |
| series \(R_s = \sum R_k\) | \(\sum (R_k/R_s)\varepsilon_k\) |
| Wheatstone \(R = (P/Q)S\) | \(\varepsilon_P + \varepsilon_Q + \varepsilon_S\) |

Equal percent on every resistor in series gives that same percent on the total.

## Derivation — why a power multiplies the percent

1. Write \(y = k\, u^{n} v^{m}\).
2. Take \(\ln y = \ln k + n\ln u + m\ln v\).
3. Differentiate: \(dy/y = n\, du/u + m\, dv/v\).
4. The limiting error replaces each \(du/u\) by \(\pm\varepsilon\), and you choose the sign that adds. So
   \[
   \frac{\delta y}{y} = |n|\varepsilon_u + |m|\varepsilon_v.
   \]
5. A sum is different because you cannot divide by \(y\) inside the differential until the end. Add the **absolute** errors first, \(\delta y = \delta u + \delta v\), then divide by \(|y|\).

## Solved — September 2026 mid Q3(b)

\[
Z = \sqrt{R^2 + (\omega L)^2}, \quad R = 120\,\Omega \text{ at } 6\%, \quad L = 2\,\mathrm{H} \text{ at } 10\%, \quad \omega = 2\pi\times 50.
\]

\(\omega\) is exact.

1. \(\omega = 314.16\,\mathrm{rad/s}\), so \(\omega L = 628.32\,\Omega\).
2. \(Z = \sqrt{120^2 + 628.32^2} = 639.7\,\Omega\).
3. Let \(X = \omega L\). Then \(Z = (R^2 + X^2)^{1/2}\). The power rule on each piece, weighted by how much of \(Z^2\) it is:
   \[
   \frac{\delta Z}{Z} = \frac{R^2}{Z^2}\varepsilon_R + \frac{X^2}{Z^2}\varepsilon_X.
   \]
   \(\varepsilon_X = \varepsilon_L = 10\%\), because \(\omega\) has no error.
4. \(R^2/Z^2 = 14400/409184 = 0.0352\), and \(X^2/Z^2 = 0.9648\).
5. \(\delta Z/Z = 0.0352\times 6\% + 0.9648\times 10\% = 9.86\%\).

**Box:** \(Z = 640\,\Omega\) within \(\pm 9.9\%\). Almost all of the error comes from \(L\), because \(\omega L\) is much larger than \(R\).

## Practice

1. \(P\) is known to \(\pm 1.5\%\) and \(I\) to \(\pm 1.0\%\). Find the limiting error in \(R = P/I^2\).
2. November 2022 endsem, 3 marks. \(R_1 = 350\,\Omega\pm 5\%\), \(R_2 = 500\,\Omega\pm 6\%\), \(R_3 = 150\,\Omega\pm 7\%\), all in series. Find the total resistance and its limiting error in ohms and in percent.
3. A \(0\)–\(150\,\mathrm{V}\) voltmeter is guaranteed to \(\pm 1\%\) of full scale and reads \(75\,\mathrm{V}\). What is the limiting error in volts, and as a percent of the reading?

### Answers

1. \(\varepsilon_R = 1.5\% + 2\times 1.0\% = \pm 3.5\%\).
2. \(R_s = 1000\,\Omega\). Absolute errors \(17.5\), \(30\), and \(10.5\,\Omega\), so \(\delta R_s = 58\,\Omega\), which is \(5.8\%\).
3. \(\delta V = 0.01\times 150 = 1.5\,\mathrm{V}\). At \(75\,\mathrm{V}\) that is \(2\%\) of the reading.
