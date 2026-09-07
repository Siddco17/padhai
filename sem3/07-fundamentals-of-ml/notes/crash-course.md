# CSL2XX FoML crash course — teach + work every MST-style problem

How to use: one sitting at a time from `midsem-map.md`. Formula sheet: `midsem-formulas.md`. Chat is the course for the 14h emergency.

**Open only the six files in `resources/`** (`ml_notes....pdf`, `LinearRegression.pdf`, `6. Regression Analysis.pdf`, the two tree PDFs, logistic PPTX). Do not open Mitchell / Deisenroth.

**Clock:** Sit 1 linreg (professor 5-point + one GD step + t-test) → Sit 2 trees → Sit 3 logistic → Sit 4 Bayes+2×2 → Sit 5 closed-book redo → sleep. Exam Friday afternoon.

---

# Block 0 — probability habits (0.75 h)

You do not need a statistics course again. You need four moves this paper uses on every Bayes / NB page.

## 0.1 Joint, conditional, product, sum

\(P(A,B)\) is “both.” The **product rule** splits it:

\[
P(A,B)=P(A\mid B)P(B)=P(B\mid A)P(A)
\]

The **sum rule** throws away a variable: \(P(A)=\sum_B P(A,B)\). Continuous: replace the sum by an integral of the density.

Independence: \(P(A,B)=P(A)P(B)\). That is *not* the Naive Bayes assumption. Naive Bayes needs **conditional** independence given the class: \(P(A,B\mid C)=P(A\mid C)P(B\mid C)\). \(A\) and \(B\) can still be dependent in the raw data.

## 0.2 Discrete vs continuous

- Coin, class label, “Outlook = sunny”: **PMF**. Point masses. Count and divide.
- Height, temperature as a real number: **PDF**. \(P(X=3.2)=0\). Likelihoods are densities; you still multiply them, then compare.

Gaussian density (write it once):

\[
p(x)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\Bigl(-\frac{(x-\mu)^2}{2\sigma^2}\Bigr)
\]

## 0.3 Bayes in one line

\[
P(h\mid D)=\frac{P(D\mid h)P(h)}{P(D)}
\]

Names, in order: **posterior** = likelihood \(\times\) prior / evidence.

\(P(D)=\sum_h P(D\mid h)P(h)\). If there are two hypotheses, compute the two numerators and **normalize** if they ask for a probability; if they only ask MAP, the larger numerator wins and you can skip dividing.

## 0.4 MAP vs MLE

- **MAP:** \(\arg\max_h P(D\mid h)P(h)\). Prior still matters.
- **MLE:** \(\arg\max_h P(D\mid h)\). Same as MAP when every hypothesis is equally likely a priori.

i.i.d. observations: likelihood is a **product**. Log does not change the argmax and turns the product into a sum. Exam algebra uses \(\log\).

## Worked: Mitchell §6.2.1 cancer test

\(P(c)=0.008\), so \(P(\neg c)=0.992\). Test: \(P(+|c)=0.98\), \(P(-|\neg c)=0.97\) \(\Rightarrow P(+|\neg c)=0.03\). Patient tests **positive**. MAP diagnosis?

\[
P(c)P(+|c)=0.008\times 0.98=0.00784
\]

\[
P(\neg c)P(+|\neg c)=0.992\times 0.03=0.02976
\]

MAP \(=\neg c\) (0.02976 is larger). Posterior of cancer:

\[
P(c|+)=\frac{0.00784}{0.00784+0.02976}\approx 0.21
\]

The test moved you from 0.8% to 21%. Still not MAP-cancer, because the disease is rare. **You must be able to write those two numerators with the book closed.** That is Block 0 done.

---

# Block 1 — MLE, moments, Naive Bayes (1.5 h)

## 1.1 MLE you will actually compute

**Coin / Bernoulli.** \(k\) heads in \(n\) flips. Likelihood \(p^k(1-p)^{n-k}\). Log, derivative, set to 0: \(\hat p=k/n\).

**Gaussian, unknown mean and variance.** Same dance on \(\prod_i \mathcal N(x_i\mid\mu,\sigma^2)\):

\[
\hat\mu=\bar x,\qquad \hat\sigma^2_{\mathrm{ML}}=\frac1N\sum_i(x_i-\bar x)^2
\]

If they want the unbiased sample variance they will say so (\(N-1\)). Default on an ML paper is MLE, \(1/N\).

**Method of moments.** Equate \(\mathbb{E}[X]\) to \(\bar x\), \(\mathbb{E}[X^2]\) to the second sample moment, solve. Bernoulli: \(\hat p=\bar x\) (same as MLE). Gaussian: same \(\hat\mu\); second moment gives the \(1/N\) variance.

### Worked: four numbers, Gaussian MLE

Data \(2,2,4,8\). \(\bar x=4\). Deviations \(-2,-2,0,4\). Squares \(4+4+0+16=24\). \(\hat\sigma^2=24/4=6\). Unbiased would be \(24/3=8\). Box **6** and write “MLE.”

## 1.2 Why Naive Bayes exists

Full Bayes wants \(P(\text{all features}\mid\text{class})\). With 4 binary features that is 16 cells per class; you never have enough counts. Assume **features independent given the class**, and the table collapses to one column per feature.

\[
v_{\mathrm{NB}}=\arg\max_v P(v)\prod_i P(a_i\mid v)
\]

Learning = counting. Classification = one product per class, pick the max. If they ask \(P(v\mid x)\), normalize the products.

A zero count kills the whole product. Then use Laplace: for a feature with \(k\) values, \(\hat P=(n_c+1)/(n+k)\).

## 1.3 Worked: Mitchell PlayTennis (the textbook example)

14 days, Play = yes on 9, no on 5. New day: Outlook=sunny, Temp=cool, Humidity=high, Wind=strong.

Counts you need (from Mitchell Table 3.2 — reconstruct from the table if they print it):

| term | yes (9) | no (5) |
|------|---------|--------|
| Outlook=sunny | 2/9 | 3/5 |
| Temp=cool | 3/9 | 1/5 |
| Humidity=high | 3/9 | 4/5 |
| Wind=strong | 3/9 | 3/5 |

\[
P(\mathrm{yes})\prod=\frac{9}{14}\cdot\frac{2}{9}\cdot\frac{3}{9}\cdot\frac{3}{9}\cdot\frac{3}{9}=\frac{1}{189}\approx 0.0053
\]

\[
P(\mathrm{no})\prod=\frac{5}{14}\cdot\frac{3}{5}\cdot\frac{1}{5}\cdot\frac{4}{5}\cdot\frac{3}{5}=\frac{18}{875}\approx 0.0206
\]

**Answer: no.** Posterior of no \(\approx 0.0206/(0.0053+0.0206)=0.795\).

Same method for **one** feature (just drop the extra factors) or **Gaussian NB**: replace each \(P(a_i\mid v)\) by a Normal density using that class’s \(\hat\mu_i,\hat\sigma_i^2\).

## 1.4 Worked: 6-row email table (you will redo this)

| # | free | money | spam |
|---|------|-------|------|
| 1 | 1 | 1 | yes |
| 2 | 1 | 0 | yes |
| 3 | 0 | 1 | yes |
| 4 | 1 | 0 | no |
| 5 | 0 | 1 | no |
| 6 | 0 | 0 | no |

Classify \(x=(\mathrm{free}=1,\mathrm{money}=1)\).

\(P(\mathrm{yes})=P(\mathrm{no})=1/2\).

\(P(\mathrm{free}=1\mid\mathrm{yes})=2/3\), \(P(\mathrm{money}=1\mid\mathrm{yes})=2/3\).

\(P(\mathrm{free}=1\mid\mathrm{no})=1/3\), \(P(\mathrm{money}=1\mid\mathrm{no})=1/3\).

\[
s_{\mathrm{yes}}=\frac12\cdot\frac23\cdot\frac23=\frac29,\qquad
s_{\mathrm{no}}=\frac12\cdot\frac13\cdot\frac13=\frac1{18}
\]

yes wins. \(P(\mathrm{yes}\mid x)=(4/18)/(5/18)=4/5\).

If row 4 had been `free=0`, then \(P(\mathrm{free}=1\mid\mathrm{no})=0\) and the product for no dies. Laplace: binary feature \(k=2\), \((n_c+1)/(n+2)\).

## 1.5 Gaussian NB, one feature

Class 0: three points \(x=1,2,3\). Class 1: \(x=8,9,10\). Equal priors. Test \(x=4\).

\(\mu_0=2\), \(\sigma_0^2=((1-2)^2+(0)^2+(1)^2)/3=2/3\).

\(\mu_1=9\), \(\sigma_1^2=2/3\) similarly.

Likelihood of class 0 at \(x=4\) is \(\mathcal N(4\mid 2,2/3)\); class 1 is \(\mathcal N(4\mid 9,2/3)\). 4 is much closer to 2, so class 0. (If \(\sigma\) differed you would have to write both densities; do not eyeball.)

The **decision boundary** is where \(P(v)p(x\mid v)\) ties. With equal \(\sigma\) and equal prior, it is the midpoint of the two means.

## You-try checklist (Block 1)

1. Recite Bayes, MAP, MLE, and the NB product with no paper.
2. Redo the cancer numerators.
3. Redo the 6-row email table, including the \(4/5\) posterior.
4. One sentence: “Naive Bayes is wrong about independence and still works because we only need the argmax, not a perfect joint.”

---

# Block 2 — metrics and error (0.75 h)

A classifier outputs a label. The **confusion matrix** is the 2×2 (or \(K\times K\)) of (predicted, actual). Label the axes on the answer sheet.

\[
\mathrm{Acc}=\frac{\mathrm{TP}+\mathrm{TN}}{N},\qquad
\mathrm{Prec}=\frac{\mathrm{TP}}{\mathrm{TP}+\mathrm{FP}},\qquad
\mathrm{Rec}=\frac{\mathrm{TP}}{\mathrm{TP}+\mathrm{FN}}
\]

Recall is also TPR / sensitivity. FPR \(=\mathrm{FP}/(\mathrm{FP}+\mathrm{TN})\). \(F_1\) is the harmonic mean of precision and recall.

Accuracy is a trap when 95% of emails are ham: always-say-ham is 95% accurate and useless. Precision answers “of the spam folder, how much is really spam?” Recall answers “of the real spam, how much did I catch?”

**Error estimation:** training error is optimistic. Estimate generalization on a **held-out** set (validation while you are still choosing, test once at the end). Mitchell ch.5 is the long version; MST wants the split, not PAC bounds.

## Worked: 100 predictions

TP=40, FP=10, FN=5, TN=45.

- \(N=100\), Acc \(=85/100=0.85\), Err \(=0.15\).
- Prec \(=40/50=0.80\).
- Rec \(=40/45=8/9\approx 0.889\).
- \(F_1=2\cdot 0.80\cdot 0.889/(0.80+0.889)\approx 0.842\).
- FPR \(=10/55=2/11\approx 0.182\).

## You-try (Block 2)

Swap the meaning of “positive” to the **negative** class on the same matrix. New TP=45, FP=5, FN=10, TN=40. Prec \(=45/50=0.90\), Rec \(=45/55\approx 0.818\). If you cannot do this in 60 seconds you are still confusing axes.

---

# Block 3 — what ML *is* (0.75 h)

## 3.1 Mitchell’s sentence

A program **learns** from experience \(E\) with respect to task \(T\) and performance \(P\) if \(P\) at \(T\) improves with \(E\).

Spam: \(T=\) label mail, \(P=\) precision/recall (or accuracy if they force it), \(E=\) a labelled inbox. House prices: \(T=\) predict price, \(P=\) RMSE, \(E=\) past sales. Checkers in Mitchell ch.1 is the long example; you need T/P/E, not the LMS checkers weights (those are ANN-adjacent).

## 3.2 Paradigms

- **Supervised:** examples come with a target. Classification = discrete target. Regression = continuous target.
- **Unsupervised:** no target. Clustering is the word on the syllabus; **do not** derive k-means.
- Others you may name in one line: reinforcement (delayed reward), semi-supervised (few labels). Do not write essays.

## 3.3 Splits and overfitting

- **Train:** fit \(\theta\).
- **Validation:** pick degree / features / which model. You are allowed to look, many times.
- **Test:** one number for the report. If you peek and change \(\theta\), it is no longer a test set.

**Overfitting:** the model memorizes train; val/test error goes up while train error still falls (Deisenroth fig. 8.8: high-degree polynomial). **Underfitting:** both errors high (degree 0, a horizontal line). Fixing overfit on this paper: simpler model, more data, or a validation-based stop. (Ridge / early stopping / dropout wait until Unit 4.)

i.i.d. assumption: train and test are drawn from the **same** distribution. Mitchell ch.1 flags that this is often false in the real world; still the exam default.

Parametric = a fixed-size \(\theta\) (the line \(a_0+a_1x\)). Non-parametric = grows with \(N\) (k-NN). CSC311 Q1c is this in three ticks.

## You-try (Block 3)

Write T/P/E for (a) digit classification, (b) predicting tomorrow’s temperature. Then one sentence distinguishing validation from test.

---

# Block 4 — linear regression + linear classifiers (1.25 h)

The lecture PDF `6. Regression Analysis.pdf` is five handwritten pages. That is the exam derivation. Deisenroth ch.9 is the same least-squares with matrices.

## 4.1 Derive \(a_0,a_1\) once

\(y=a_0+a_1x\), residual \(E_i=y_i-a_0-a_1x_i\), \(S_r=\sum E_i^2\).

\(\partial S_r/\partial a_0=0\) and \(\partial S_r/\partial a_1=0\) give the normal equations (kill the common 2):

\[
n a_0+a_1\sum x=\sum y,\qquad
a_0\sum x+a_1\sum x^2=\sum xy
\]

Solve:

\[
a_1=\frac{n\sum xy-(\sum x)(\sum y)}{n\sum x^2-(\sum x)^2},\qquad a_0=\bar y-a_1\bar x
\]

In matrix form that is \(\theta=(X^\top X)^{-1}X^\top y\) with a column of ones for the intercept. Under Gaussian noise this is **MLE** (Deisenroth 9.12): NLL \(\propto S_r\).

## 4.2 Worked: four points

\(x=1,2,3,4\), \(y=2,3,5,4\).

\(\sum x=10\), \(\sum y=14\), \(\sum xy=2+6+15+16=39\), \(\sum x^2=30\), \(n=4\).

\[
a_1=\frac{4\cdot 39-10\cdot 14}{4\cdot 30-10^2}=\frac{156-140}{120-100}=\frac{16}{20}=0.8
\]

\[
a_0=3.5-0.8\cdot 2.5=1.5
\]

Line: \(y=1.5+0.8x\). Predictions \(2.3, 3.1, 3.9, 4.7\). Residuals \(-0.3,-0.1,1.1,-0.7\). \(S_r=0.09+0.01+1.21+0.49=1.80\). MSE \(=1.80/4=0.45\).

Mean \(\bar y=3.5\), \(S_{\mathrm{tot}}=(1.5)^2+(0.5)^2+(1.5)^2+(0.5)^2=5\). \(R^2=1-1.80/5=0.64\).

## 4.3 Through the origin

If the model is \(y=a_1 x\) you **re-take** \(\partial S_r/\partial a_1=0\). You do **not** use \(a_1=\bar y/\bar x\).

\[
a_1=\frac{\sum xy}{\sum x^2}=\frac{39}{30}=1.3
\]

on the same four points.

## 4.4 Power and exponential (lecture pp. 4–5)

Non-linear in the original \(x,y\), linear after \(\ln\):

| Model | Transform | Fit | Undo |
|-------|-----------|-----|------|
| \(y=ax^b\) | \(Z=\ln y\), \(W=\ln x\) | \(Z=a_0+a_1 W\) | \(a=e^{a_0}\), \(b=a_1\) |
| \(y=ae^{bx}\) | \(Z=\ln y\), keep \(x\) | \(Z=a_0+a_1 x\) | \(a=e^{a_0}\), \(b=a_1\) |

Then reuse the \(a_0,a_1\) formulas on the transformed columns. Residuals of the **log** fit are not the same as \(S_r\) on the original \(y\); if they ask original-scale error, transform back and then compute \(S_r\).

Tiny check: \((x,y)=(1,2),(e,2e^2)\approx(1,2),(2.718,14.78)\) is exactly \(y=2x^2\), so after \(\ln\) you must recover \(a_0=\ln 2\), \(a_1=2\).

## 4.5 Linear classifiers

Classification with a hyperplane: predict \(+\) iff \(w^\top x+b\ge 0\). The boundary is the line/plane \(w^\top x+b=0\). \(w\) is orthogonal to the boundary; the sign of \(b\) shifts it off the origin.

If \(b=0\) the boundary goes through the origin. Each training point gives an inequality on \(w\).

### Worked: CSC311 Q4 (\(b=0\))

Points \((1,1)+,\ (2,1)+,\ (3,2)+,\ (2,0)-\). Need

\[
w_1+w_2\ge 0,\quad 2w_1+w_2\ge 0,\quad 3w_1+2w_2\ge 0,\quad 2w_1<0
\]

Last inequality \(\Rightarrow w_1<0\). One legal pair: \(w_1=-1\), \(w_2=2\) (check: \(1,1,1\) all \(\ge 0\) on the plus points, and \(2w_1=-2<0\)).

Logistic regression is **classification**, not regression (CSC311 Q1b). Sigmoid / BCE / threshold are Block 6 (professor PPTX).

## You-try checklist (Block 4)

1. Derive the two normal equations from \(S_r\) with no notes.
2. Recompute \(a_0,a_1,S_r\) on the four points.
3. Write the \(\ln\) table for power vs exponential.
4. CSC311 Q4: produce any valid \((w_1,w_2)\).

---

# Block LA — det, minor, 2×2 eigen (0.5 h)

Professor listed this as FoML MST, not “borrow the LA course.” Keep it 2×2.

\[
\det\begin{bmatrix}a&b\\c&d\end{bmatrix}=ad-bc
\]

Minor \(M_{ij}\) = det after deleting row \(i\), column \(j\). Cofactor \(C_{ij}=(-1)^{i+j}M_{ij}\). Expand along a row: \(\det=\sum_j a_{1j}C_{1j}\).

Eigen: \(Av=\lambda v\) \(\iff\) \(\det(A-\lambda I)=0\). Then \((A-\lambda I)v=0\).

### Worked

\(A=\begin{bmatrix}2&1\\1&2\end{bmatrix}\). \(M_{11}=2\), \(M_{12}=1\), \(C_{12}=-1\). \(\det=4-1=3\).

\(A-\lambda I=\begin{bmatrix}2-\lambda&1\\1&2-\lambda\end{bmatrix}\), characteristic \((2-\lambda)^2-1=(\lambda-1)(\lambda-3)\).

\(\lambda=3\): \(\begin{bmatrix}-1&1\\1&-1\end{bmatrix}v=0\Rightarrow v\propto(1,1)\). \(\lambda=1\): \(v\propto(1,-1)\). Check: trace \(4=3+1\), det \(3=3\cdot 1\).

**You try:** \(B=\begin{bmatrix}1&2\\2&1\end{bmatrix}\). Write \(\det B\), both \(\lambda\), one eigenvector each.

---

# Block 5 — decision trees (1.5 h)

## 5.1 Classification: entropy then information gain

\[
H(S)=-\sum_c p_c\log_2 p_c,\qquad
IG(S,A)=H(S)-\sum_v\frac{|S_v|}{|S|}H(S_v)
\]

Largest IG at the root. Recurse. Pure child (\(H=0\)) is a leaf. Greedy \(\neq\) globally smallest tree.

### Worked: 10-row play table (`DecisionTreesClassificationExample.pdf`)

5 Yes / 5 No \(\Rightarrow H=1\). Counts:

| attr | split | \(H\) weighted | IG |
|------|-------|----------------|-----|
| Weather | Sunny 1Y2N, Cloudy 3Y, Rainy 1Y3N | \(0.6\) | **\(0.4\)** |
| Temp | Hot 2Y2N, Mild 3Y2N, Cool 0Y1N | \(0.788\) | \(0.212\) |
| Humidity | High 3Y4N, Normal 2Y1N | \(0.865\) | \(0.135\) |
| Wind | Strong 2Y4N, Weak 3Y1N | \(0.876\) | \(0.124\) |

Root = **Weather**. Cloudy is already Yes. On Sunny, Humidity IG \(=0.918\) beats Wind \(0.252\). On Rainy, Wind IG \(=0.811\) beats Humidity \(0.123\).

Final: Sunny+High \(\to\) No; Sunny+Normal \(\to\) Yes; Cloudy \(\to\) Yes; Rainy+Strong \(\to\) No; Rainy+Weak \(\to\) Yes.

## 5.2 Regression: mean in the leaf, RSS of a split

\[
RSS=\sum_k\sum_{i\in R_k}(y_i-\bar y_{R_k})^2
\]

Midpoints of unique values are the candidate cuts. Smallest RSS wins.

### Worked: 9-row table (`DecisionTreeRegression.pdf`)

| \(X_1\) | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 |
| \(X_2\) | 1 | 1 | 1 | 2 | 2 | 2 | 3 | 3 | 3 |
| \(Y\) | 3 | 5 | 7 | 4 | 6 | 9 | 6 | 9 | 13 |

\(\sum Y=62\), \(\bar y=62/9\), no-split RSS \(=674/9\approx 74.89\) (ignore the slide’s \(71.1\)).

Cuts: \(X_1,X_2\in\{1.5,2.5\}\). Exact RSS:

| split | RSS |
|-------|-----|
| \(X_1<1.5\) | \(45.5\) |
| \(X_1<2.5\) | \(\mathbf{40.17}\) |
| \(X_2<1.5\) | \(58.83\) |
| \(X_2<2.5\) | \(48\) |

First split \(X_1<2.5\). Then split each child on \(X_2<2.5\):

- \(X_1<2.5,X_2<2.5\): mean \(4.5\)
- \(X_1<2.5,X_2\ge 2.5\): mean \(7.5\)
- \(X_1\ge 2.5,X_2<2.5\): mean \(8\)
- else: \(13\)

Slide first-split boxes (\(43.48\), \(36.17\), …) are rounded; **ranking is the same**. On the paper, write \(\sum(y-\bar y_R)^2\) with the exact means.

**You try (cover the PDF):** (i) IG of Weather only, from the 10-row table. (ii) RSS of \(X_1<2.5\) only, from the 9-row table.

---

# Block 6 — logistic regression (1.0 h)

Professor PPTX, 25 slides. Every exam move is a number.

**Why not linreg:** \(\hat y\) can be \(1.4\), which is not a probability.

\[
z=w^\top x+b,\qquad \sigma(z)=\frac{1}{1+e^{-z}},\qquad \hat y=\sigma(z)
\]

Worked: \(w=2,x=3,b=-1\Rightarrow z=5\). \(\sigma(0)=0.5\), \(\sigma(2)\approx 0.88\), \(\sigma(-2)\approx 0.12\). Threshold \(0.5\): \(0.72\to 1\), \(0.31\to 0\).

Loss is **not** MSE. One row \(P(y\mid x)=\hat y^y(1-\hat y)^{1-y}\). NLL:

\[
L=-\bigl[y\log\hat y+(1-y)\log(1-\hat y)\bigr]
\]

\(y=1,\hat y=0.9\Rightarrow L=-\log 0.9\approx 0.105\). \(y=1,\hat y=0.1\Rightarrow L=-\log 0.1\approx 2.30\). Dataset: average those. Learn: \(\theta\leftarrow\theta-\alpha\nabla J\).

Confusion on the same sheet as Block 2. PPTX 10-row: TP=4, TN=3, FP=1, FN=2 \(\Rightarrow\) Acc \(=0.70\), Prec \(=0.80\), Rec \(=4/6\), \(F_1\approx 0.73\).

**You try:** \(z=-1\). Write \(\sigma(z)\) as a fraction in \(e\), the class at threshold \(0.5\), and \(L\) if the true label is \(1\).

---

# If you still have an hour

From `CSC311f22_midtermA_soln.pdf`, in this order:

| Q | Marks | Why it is on MST | Skip cue |
|---|-------|------------------|----------|
| 1a | 1 | greedy tree \(\neq\) optimal | — |
| 1b | 6 | logistic is classification; both use a linear score | — |
| 1c | 3 | parametric vs not; linreg = weights + bias | — |
| 2 | 4 | bias vs variance picture | — |
| 3 | 15 | fill a tiny colour/length tree | — |
| 4 | 4 | linear classifier inequalities | — |
| 5 | | ridge + gradient step | skip |

## Last 30 minutes

Close every PDF. Recreate `midsem-formulas.md` on one side of one sheet. If a box is missing, that box is your first revision target, not a new chapter.
