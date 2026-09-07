# CSL2XX FoML — MST formula sheet

**Rendered math:** open [`midsem-formulas.html`](midsem-formulas.html) in a browser (Cursor Preview does not run LaTeX).

Rewrite from memory Friday morning. Numericals from the six lecture files. Skip Naive Bayes / Mitchell.

## Bayes (Sit 4 — not in `ml_notes`)

$$
P(h \mid D) = \frac{P(D \mid h)\, P(h)}{P(D)}, \qquad P(D) = \sum_h P(D \mid h)\, P(h)
$$

MAP = larger numerator $P(D \mid h) P(h)$. Cancer: $P(c)=0.008$, $P(+|c)=0.98$, $P(+|\neg c)=0.03$.

$$
0.008 \times 0.98 = 0.00784, \qquad 0.992 \times 0.03 = 0.02976
$$

MAP $= \neg c$. $P(c|+) = 0.00784 / 0.0376 \approx 0.21$.

## 2×2 linear algebra (Sit 4)

$$
\det \begin{bmatrix} a & b \\ c & d \end{bmatrix} = ad - bc
$$

Minor $M_{ij}$ = det after deleting row $i$, col $j$. Cofactor $C_{ij} = (-1)^{i+j} M_{ij}$.

Eigen: $\det(A - \lambda I) = 0$, then $(A - \lambda I)v = 0$. Check: $\mathrm{trace} = \lambda_1 + \lambda_2$, $\det = \lambda_1 \lambda_2$.

You-try $B = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}$: $\det = -3$, $\lambda = 3,-1$, $v \propto (1,1)$ and $(1,-1)$.

## Linear regression (Sit 1)

$y = a_0 + a_1 x$ (slides use $\beta_0, \beta_1$). $S_r = \sum (y_i - a_0 - a_1 x_i)^2$. Normal equations:

$$
n a_0 + a_1 \sum x = \sum y, \qquad a_0 \sum x + a_1 \sum x^2 = \sum xy
$$

$$
a_1 = \frac{n\sum xy - (\sum x)(\sum y)}{n\sum x^2 - (\sum x)^2} = \frac{\sum(x-\bar x)(y-\bar y)}{\sum(x-\bar x)^2}, \qquad a_0 = \bar y - a_1 \bar x
$$

Through origin: $a_1 = \sum xy / \sum x^2$ (re-derive). Power $y = ax^b$: $\ln y = \ln a + b \ln x$. Exp $y = ae^{bx}$: $\ln y = \ln a + bx$.

**Professor 5-point** $x=1..5$, $y=2,3,5,4,6$: $\bar x = 3$, $\bar y = 4$, $\sum(x-\bar x)^2 = 10$.

The five products $(-2)(-2)+(-1)(-1)+(0)(1)+(1)(0)+(2)(2) = \mathbf{9}$. OLS: $\hat\beta_1 = 9/10 = 0.9$, $\hat\beta_0 = 4 - 0.9 \cdot 3 = 1.3$. At $x=6$, $\hat y = 6.7$.

The slide adds those products as 10 and boxes $\hat y = 1+x$, $\hat y(6)=7$, residuals $0,0,1,-1,0$, RSS $=2$. **Add the products yourself.** If they print that residual table, then:

$$
\mathrm{RSE} = \sqrt{\frac{\mathrm{RSS}}{n-2}} = \sqrt{\frac{2}{3}}, \quad R^2 = 1 - \frac{2}{10} = 0.8, \quad SE(\hat\beta_1) = \sqrt{\frac{2/3}{10}} \approx 0.258
$$

$H_0: \beta_1 = 0$. $T = 1/0.258 = 3.876$, $df=3$, critical $t_{0.05} \approx 3.18$ $\Rightarrow$ reject $H_0$. CI $1 \pm 2(0.258) = [0.484, 1.516]$ misses 0.

**One GD step** ($\hat y = wx + b$, `ml_notes` p.3). $\mathrm{MSE} = \frac{1}{n} \sum (y - \hat y)^2$.

$$
\frac{\partial \mathrm{MSE}}{\partial w} = -\frac{2}{n} \sum x(y-\hat y), \qquad \frac{\partial \mathrm{MSE}}{\partial b} = -\frac{2}{n} \sum (y-\hat y)
$$

$$
w \leftarrow w - \alpha \frac{\partial \mathrm{MSE}}{\partial w}, \qquad b \leftarrow b - \alpha \frac{\partial \mathrm{MSE}}{\partial b}
$$

Salary: $x=1,2,3$, $y=30,40,50$, $w=10$, $b=10$, $\alpha=0.02$ $\to$ $w=10.8$, $b=10.4$.

Train/val/test: percentages of $N$ (e.g. 70/15/15 of 1000 $=$ 700/150/150). Overfit = memorized train, new data fails. Underfit = too little training, both errors high.

## Decision trees — class (Sit 2)

$$
H = -\sum p_c \log_2 p_c, \qquad IG = H_{\mathrm{parent}} - \sum_v \frac{|S_v|}{|S|} H(S_v)
$$

Largest IG at the root. Pure $\Rightarrow H=0$. $0\log 0 := 0$.

$$
\mathrm{Gini} = 1 - \sum_c p_c^2
$$

Weighted Gini of a split; **Gini gain** = parent Gini − weighted child Gini (same pick-the-max rule).

**10-row play:** $H=1$. Weather IG $=0.4$ (root). Temp $0.2116$, Humidity $0.1349$, Wind $0.1245$. Sunny $\to$ Humidity; Rainy $\to$ Wind.

**Laptop Buy (`ml_notes`):** parent $H=0.954$. IG(Age) $=$ IG(Income) $=0.0485$, IG(Student) $=0.5485$ $\Rightarrow$ root **Student**.

**Gini Study split (6 rows):** high GI $=0$, low GI $=4/9$, weighted $=2/9$.

## Decision trees — reg (Sit 2)

Leaf $=$ mean of $y$ in the region. Smallest RSS wins.

$$
\mathrm{RSS} = \sum_k \sum_{i \in R_k} (y_i - \bar y_{R_k})^2
$$

**9-row:** first split $X_1 < 2.5$ (RSS $\approx 40.17$). Depth-2 means $4.5,\; 7.5,\; 8,\; 13$.

## Logistic + confusion (Sit 3)

$$
z = w^\top x + b, \qquad \sigma(z) = \frac{1}{1+e^{-z}}, \qquad \hat y = \sigma(z)
$$

$\sigma(0)=0.5$, $\sigma(2)\approx 0.88$, $\sigma(-2)\approx 0.12$. Threshold $0.5$: $\hat y \ge 0.5 \to$ class 1.

$$
L = -\bigl[ y \log \hat y + (1-y)\log(1-\hat y) \bigr]
$$

$y=1,\hat y=0.9 \Rightarrow L \approx 0.105$. $y=1,\hat y=0.1 \Rightarrow L \approx 2.30$.

**One GD step (one row):** $\partial L / \partial b_1 = (P-y)x$, $\partial L / \partial b_0 = P-y$.

$$
b \leftarrow b - \alpha \, \partial L / \partial b
$$

`ml_notes` p.18: $x=3,y=0,b_0=b_1=0,\alpha=0.1$ $\to$ $P=0.5$, $L\approx 0.693$, $b_1=-0.15$, $b_0=-0.05$.

**Confusion** (label axes). $\mathrm{Acc}=(\mathrm{TP}+\mathrm{TN})/N$, $\mathrm{Prec}=\mathrm{TP}/(\mathrm{TP}+\mathrm{FP})$, $\mathrm{Rec}=\mathrm{TP}/(\mathrm{TP}+\mathrm{FN})$, $F_1 = 2PR/(P+R)$.

- PPTX 10-row: TP=4, TN=3, FP=1, FN=2 $\to$ Acc $0.70$, Prec $0.80$, Rec $4/6$, $F_1 \approx 0.73$.
- `ml_notes` p.22: TP=4, TN=3, FP=2, FN=1 $\to$ Acc $0.70$, Prec $2/3$, Rec $0.80$, $F_1 \approx 0.727$. **Different matrix — count from the table they print.**

## Sit 5 redo (book closed)

1. Derive two normal equations. 5-point: products $=9$, $\hat\beta_1=0.9$, $\hat\beta_0=1.3$. If they give $\hat y=1+x$, RSS $=2$, $T=3.876$.
2. Salary one GD step $\to$ $10.8,\; 10.4$.
3. Weather IG $=0.4$. Gini high/low Study split.
4. RSS of $X_1 < 2.5$.
5. $z=2 \to \sigma \approx 0.88$, class, BCE if $y=1$. One logistic GD step (p.18 numbers).
6. Count TP/TN/FP/FN from a 10-row table; Acc/Prec/Rec/$F_1$.
7. Cancer two numerators. $B = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}$ $\lambda, v$.
