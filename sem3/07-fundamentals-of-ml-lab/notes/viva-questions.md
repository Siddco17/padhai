# FoML viva — basics + questions

Quiz yourself out loud. Short answers only. Notebook: `scripts/linear_regression_decision_tree.ipynb`.

Two independent experiments. **Do not compare** Linear Regression and the Decision Tree.

| | A | B |
|--|--|--|
| Model | `LinearRegression` | `DecisionTreeClassifier` |
| Data | Kaggle insurance, 1338 rows | Kaggle Titanic, 891 rows |
| Target | `charges` (dollars) | `Survived` (0/1) |
| Job | regression | classification |
| Quote | test R² **0.78**, MAE **~$4180**, smoker **+$23.6k** | test acc **0.79**, precision **0.86**, recall **0.55**, first split **sex** |

---

## Basics to have cold

**Supervised learning:** data comes with a target. We learn a mapping from features → target. Both of these labs are supervised. (Unsupervised = no target, e.g. k-means.)

**Regression vs classification:** regression predicts a **number**; classification predicts a **class**. The target column decides.

**Train / test:** fit only on train; score on held-out test. That estimates **generalisation**. `random_state=42` makes the split repeatable. Titanic split is **stratified** so the survival rate stays the same in both parts.

**Overfitting:** train looks great, test looks worse — the model memorised. **Underfitting:** train and test both poor. **`max_depth=3`** on the tree is to limit overfitting.

**Leakage:** do not fit encoders/imputers on the full table. Use a **Pipeline** so those steps see train only.

**Parametric vs non-parametric:** Linear Regression has a **fixed** number of weights (parametric). A tree can grow more splits as data grows (non-parametric).

### Linear Regression (must write)

\[
\hat y = w_0 + w_1 x_1 + \cdots + w_d x_d
\]

Fit by **ordinary least squares**: minimise **MSE** \(=\frac1n\sum(y_i-\hat y_i)^2\).

Normal equation (column of 1s in \(X\)):

\[
w=(X^\top X)^{-1}X^\top y
\]

(We used `pinv` so a singular \(X^\top X\) does not crash.) Same result as sklearn here.

**Assumptions (say 3):** linear additive relationship; errors roughly similar spread; no perfect collinearity of features.

**One-hot encoding:** strings cannot go into that sum. `smoker=yes` becomes 0/1. `drop="first"` avoids the **dummy-variable trap** (all dummies + intercept → linearly dependent columns).

**Scaling:** not required for unregularized OLS *predictions*. Would matter for Ridge/Lasso or if you compare coefficient *sizes* across units.

**Metrics:** MAE = typical |error|; RMSE = \(\sqrt{\text{MSE}}\) (punishes big misses); R² = \(1-\mathrm{SS}_{res}/\mathrm{SS}_{tot}\) (1 = perfect, 0 = “always predict the mean”). **No accuracy here.**

### Decision Tree classifier (must write)

Ask yes/no questions. Each **leaf** predicts the **majority class**. Default split score: **Gini**.

\[
\text{Gini}=1-\sum_k p_k^2
\]

Pure node (all one class) → Gini \(=0\). Entropy \(=-\sum p_k\log_2 p_k\) is the other common score (information gain). sklearn default is Gini.

**Confusion matrix** (positive class = survived):

| | pred 0 | pred 1 |
|--|--------|--------|
| actual 0 | TN | FP |
| actual 1 | FN | TP |

- Accuracy \(=(\mathrm{TP}+\mathrm{TN})/n\)
- Precision \(=\mathrm{TP}/(\mathrm{TP}+\mathrm{FP})\) — of predicted survivors, how many really survived
- Recall \(=\mathrm{TP}/(\mathrm{TP}+\mathrm{FN})\) — of actual survivors, how many we caught

**Accuracy is weak alone:** ~62% of Titanic died, so “always predict died” already scores ~0.62.

**Scaling:** not needed. Splits are thresholds (`Age ≤ 6.5`).

---

## Questions — ML in general

**What is machine learning?**  
A program that improves at a task using data, instead of only hand-written rules.

**Supervised or unsupervised?**  
Supervised. Insurance has `charges`; Titanic has `Survived`.

**Features vs target?**  
Features \(X\) go in; target \(y\) is what we predict.

**Why a train/test split?**  
To measure performance on people the model has not seen. Fitting and scoring on the same rows is cheating.

**Why 80/20?**  
Common default. With ~1000 rows both 70/30 and 80/20 are fine. What matters is a held-out test set.

**What is a validation set?**  
An extra split used to choose hyperparameters (e.g. `max_depth`). We used one train/test split for a simple lab. Better practice: CV to pick depth, then report test once.

**What is `random_state`?**  
Seed for the split (and for the tree’s tie-breaking). Same seed → same lab numbers.

**What is data leakage?**  
Test information sneaks into training (e.g. impute Age using the whole Titanic table). Then test scores look fake-good.

---

## Questions — Linear Regression

**What does Linear Regression do?**  
Predicts a weighted sum of features. Output is a real number.

**What is the loss?**  
Mean squared error.

**How are weights found?**  
Closed form: normal equation. Or gradient descent on MSE. sklearn uses least squares (same idea).

**What is the intercept?**  
\(w_0\). Prediction when all (encoded) features are 0. On insurance it is about **−11931**. Do not over-interpret it.

**Name the main coefficient.**  
`smoker_yes ≈ +23651`. Holding other features fixed, a smoker is billed about $23.6k more.

**Age and BMI?**  
About **+$257 per year**, **+$337 per BMI point**.

**Does sex matter?**  
`sex_male` is almost 0 after the other features. Smoking dominates.

**Assumptions?**  
Linearity, additive effects, roughly constant error variance, independent errors, no perfect collinearity.

**What if the true relationship is a curve?**  
Plain Linear Regression underfits that curve. You can add \(x^2\) terms, interactions (`smoker × bmi`), or use a different model. We stayed with the linear syllabus model.

**Why one-hot encode?**  
`sex`, `smoker`, `region` are strings. The linear formula needs numbers.

**Dummy-variable trap?**  
If you keep *all* region dummies *and* an intercept, those columns sum to 1. \(X^\top X\) is singular. `drop="first"` fixes it.

**Do you scale features?**  
Not for this OLS model.

**MAE vs RMSE?**  
Both in dollars. RMSE grows faster when a few predictions are very wrong. Charges are right-skewed, so RMSE > MAE (5796 vs 4181 on test).

**What is R² = 0.78?**  
The model explains about 78% of the variance of `charges` on the test set. Not “78% accurate.”

**Why is test R² a bit higher than train?**  
This random split happened to be slightly easier. Not a bug.

**Is correlation causation?**  
No. Smoker is a strong *predictor*. The coefficient is “associated with,” not a medical proof.

**Could you implement it without sklearn?**  
Yes — the notebook’s NumPy normal equation matched sklearn (difference 0).

**Why not accuracy?**  
Accuracy is for classes. `charges` is a dollar amount.

---

## Questions — insurance dataset

**Source?**  
Kaggle Medical Cost Personal Dataset (`mirichoi0218/insurance`). 1338 people, 7 columns, no missing values.

**Why this set?**  
Target `charges` is continuous, so Linear Regression applies. Features are explainable. Kaggle, as required.

**Columns?**  
`age`, `sex`, `bmi`, `children`, `smoker`, `region` → `charges`.

**Any missing values?**  
No.

**What did the plots show?**  
Charges are right-skewed. Smokers cost much more. Age vs charges shows two bands because of smoking.

---

## Questions — Decision Tree

**What does a decision tree do?**  
Recursive yes/no splits. Classification leaf = majority class.

**sklearn class?**  
`DecisionTreeClassifier`. Not `DecisionTreeRegressor`, not Linear Regression.

**How is a split chosen?**  
Try feature thresholds; pick the one that most reduces impurity (Gini by default).

**Gini vs entropy?**  
Both measure mixed-ness. Gini \(=1-\sum p^2\). Entropy uses logs (information gain). Results are usually similar. We used Gini (sklearn default).

**What is `max_depth=3`?**  
At most 3 questions from root to leaf. Keeps the tree drawable and reduces overfitting.

**What if depth is unlimited?**  
It can isolate almost every training passenger. Train accuracy near 1, test worse. That is overfitting.

**Does a tree need scaling?**  
No.

**Does a tree need one-hot encoding?**  
sklearn wants numbers, so we encoded `Sex` and `Embarked`. Trees can also split on integer codes; encoding makes `Sex_male` obvious on the diagram.

**Feature importance?**  
How much that feature reduced impurity across splits. Here **`Sex_male ≈ 0.64`**, then 3rd class, then age.

**Parametric?**  
No. Number of splits depends on the data. Linear Regression *is* parametric.

**CART?**  
Classification And Regression Trees — the family sklearn implements. ID3/C4.5 are related older names (often entropy).

**Can trees model interactions?**  
Yes. “Female *and* 1st class” is a path of two splits. Linear Regression needs an extra product column for that.

---

## Questions — Titanic dataset

**Source?**  
Kaggle Titanic. 891 passengers.

**Target?**  
`Survived`: 0 died (549), 1 survived (342). About 38% survived.

**Features used?**  
`Pclass`, `Sex`, `Age`, `SibSp`, `Parch`, `Fare`, `Embarked`.

**Why drop Name, Ticket, PassengerId, Cabin?**  
IDs/text not used as raw features. Cabin is mostly missing (687/891).

**Missing values?**  
Age 177 (median impute), Embarked 2 (most frequent), Cabin 687 (dropped). Imputers fit on **train only**.

**Why stratify?**  
Keep ~38% survivors in both train and test.

**Test numbers?**  
Accuracy **0.79**, precision (survived) **0.86**, recall **0.55**. CM: TN 104, FP 6, FN 31, TP 38.

**What does recall 0.55 mean?**  
We only catch about half of the real survivors. The shallow tree is conservative (only 6 false “survived”).

**Why is accuracy 0.79 not amazing by itself?**  
A dummy “everyone died” model already gets ~0.62. Precision/recall show the tradeoff.

**First split?**  
Sex. Women survive much more often (~74% vs ~19% for men). That matches the tree.

**Why not Linear Regression on Titanic?**  
`Survived` is a class. Linear Regression would output a real number, not died/survived. (Logistic regression is the linear *classifier* — not this experiment.)

---

## Trick questions (they will try these)

**Accuracy of Linear Regression?**  
I did not use accuracy. Test R² is 0.78.

**R² of the decision tree?**  
I did not use R². Test accuracy is 0.79.

**Which model is better?**  
They solve different problems. No ranking.

**Is Linear Regression a classifier?**  
No.

**Is this deep learning / a neural net?**  
No.

**Did you use k-means?**  
No. k-means is unsupervised clustering.

**Precision vs recall in one line?**  
Precision: don’t cry wolf. Recall: don’t miss survivors.

**Bias-variance (short)?**  
Linear Regression: more bias, less variance (rigid line). Deep tree: low bias, high variance. Depth 3 is a cap on variance for the tree.

**What would you do next (if they ask)?**  
Insurance: log `charges` or add `smoker×bmi`. Titanic: tune `max_depth` with cross-validation, or a Random Forest. Not “switch to the other lab model.”
