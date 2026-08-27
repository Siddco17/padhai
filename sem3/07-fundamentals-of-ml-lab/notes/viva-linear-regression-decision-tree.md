# FoML lab viva — Linear Regression and Decision Tree

Two **independent** experiments. Different datasets, different sklearn classes, different metrics. **Do not compare them** and do not call one “better.”

Notebook: `scripts/linear_regression_decision_tree.ipynb`  
Re-run in Colab before the viva so your printed numbers match.

## If they ask “did you use different models?”

**Yes.**

| Experiment | sklearn class | What it outputs |
|------------|---------------|-----------------|
| A | `LinearRegression` | a **number** (`charges` in USD) |
| B | `DecisionTreeClassifier` | a **class** (`Survived` 0/1) |

Not `DecisionTreeRegressor`. The tree is a classifier because Titanic is a yes/no problem. Linear Regression is not a classifier.

If they ask “which is better?”: they are not on the same task, so there is no ranking.

## 20-second pitch A — Linear Regression

> Kaggle medical insurance dataset, 1338 people, predict `charges`.  
> One-hot encoded sex, smoker, region. 80/20 split.  
> `LinearRegression`, test R² about **0.78**, MAE about **$4180**.  
> Smoker adds about **+$23,600** in the linear weights.

## 20-second pitch B — Decision Tree

> Kaggle Titanic dataset, 891 passengers, predict `Survived`.  
> Dropped name/ticket/cabin; imputed age and embarked on train only.  
> `DecisionTreeClassifier` with `max_depth=3`.  
> Test accuracy about **0.79**. First split is **sex**. Confusion matrix and precision/recall are in the notebook.

---

# Experiment A — Linear Regression (insurance)

| | |
|--|--|
| Kaggle | [Medical Cost Personal Dataset](https://www.kaggle.com/datasets/mirichoi0218/insurance) |
| Size | 1338 × 7, **no missing values** |
| Target | `charges` (continuous) |
| Features | `age`, `sex`, `bmi`, `children`, `smoker`, `region` |
| Split | 80/20, `random_state=42` → 1070 / 268 |

### What Linear Regression is

\(\hat{y} = w_0 + w_1 x_1 + \cdots + w_d x_d\)  
Weights minimise **MSE** (ordinary least squares).

Normal equation (Linear Algebra course):  
\(w = (X^\top X)^{-1} X^\top y\)  
(with a column of 1s for the intercept). The notebook matches sklearn with NumPy (`pinv`).

**Assumptions:** linear, additive effects. One-hot encoding because strings cannot go into that formula. `drop="first"` avoids the dummy-variable trap. Scaling is **not** required for unregularized OLS predictions.

### Numbers (`random_state=42`)

| Split | MAE | RMSE | R² |
|-------|-----|------|-----|
| Train | 4208 | 6106 | 0.742 |
| Test | **4181** | **5796** | **0.784** |

Coefficients (approx):

- `smoker_yes` **+23651**
- `bmi` **+337** per point
- `age` **+257** per year
- `children` **+425**
- `sex_male` ≈ **0**
- intercept ≈ **−11931** (baseline when encoded features are 0 — don’t over-explain)

### Metrics — regression only

| Metric | Meaning |
|--------|---------|
| **MAE** | typical dollar miss |
| **MSE** | what OLS minimises |
| **RMSE** | √MSE, same units as `charges` |
| **R²** | fraction of variance explained |

**Do not say accuracy / precision / recall / confusion matrix for Experiment A.** Those belong to classification.

### Likely questions (A)

- *Why this dataset?* Target is a real number, so Linear Regression applies.  
- *Did test R² > train R² mean a bug?* No — this split was slightly easier.  
- *Why is charges skewed?* Histogram is right-skewed; a log target would be a possible next step, not required for this lab.

---

# Experiment B — Decision Tree (Titanic)

| | |
|--|--|
| Kaggle | [Titanic dataset](https://www.kaggle.com/datasets/yasserh/titanic-dataset) |
| Size | 891 × 12 |
| Target | `Survived` (0 died, 1 survived) — **classification** |
| Features used | `Pclass`, `Sex`, `Age`, `SibSp`, `Parch`, `Fare`, `Embarked` |
| Dropped | `PassengerId`, `Name`, `Ticket`, `Cabin` |
| Missing | `Age` 177, `Embarked` 2, `Cabin` 687 (cabin dropped) |
| Split | 80/20 **stratified**, `random_state=42` → 712 / 179 |

### What a classification tree is

Recursive yes/no splits. Leaf predicts the **majority class**. Default split rule: **Gini impurity**. Entropy/information gain is the alternative.  
`max_depth=3` so the tree is drawable. sklearn class: **`DecisionTreeClassifier`**.

Gini / entropy are for **classification** trees. Regression trees would use MSE — we did not use that here.

### Numbers (`max_depth=3`, `random_state=42`)

| Split | Accuracy | Precision (survived) | Recall (survived) | F1 |
|-------|----------|----------------------|-------------------|----|
| Train | 0.833 | 0.897 | 0.637 | 0.745 |
| Test | **0.793** | **0.864** | **0.551** | 0.673 |

Test confusion matrix (rows = actual, columns = predicted):

|  | pred died | pred survived |
|--|-----------|---------------|
| **actual died** | 104 (TN) | 6 (FP) |
| **actual survived** | 31 (FN) | 38 (TP) |

Root feature importance: **`Sex_male` ≈ 0.64**, then 3rd class, then age.

Recall on survivors is only 0.55: the shallow tree is conservative (few false survivors, misses some real ones). That is a feature of depth 3, not a reason to switch to Linear Regression.

### Metrics — classification only

| Metric | Meaning |
|--------|---------|
| **Accuracy** | overall correct. Weak alone (~62% died, so “always died” is already ~62%) |
| **Precision** | of predicted survivors, how many truly survived |
| **Recall** | of actual survivors, how many we found |
| **Confusion matrix** | TN, FP, FN, TP |

**Do not report R² / MAE for Experiment B.**

### Likely questions (B)

- *Why drop Cabin?* Mostly missing; raw cabin strings are not a clean numeric feature.  
- *Why impute Age with median?* Trees need a number; median is robust. Fit imputer on **train** only (pipeline).  
- *Why stratify?* Keep the same survival rate in train and test.  
- *Gini vs entropy?* Both measure impurity. Gini is sklearn’s default; results are usually similar.  
- *Does a tree need feature scaling?* **No.** Splits are thresholds.  
- *Why not Linear Regression on Titanic?* Survived is a class, not a dollar amount. A linear model for 0/1 would be a different method (linear classifier / logistic regression), which is not this experiment.

### Overfitting (tree only — not vs Linear Regression)

An unlimited tree can memorise the training passengers (train accuracy near 1) and then do worse on new ones. `max_depth=3` is regularisation for **this** model.

---

## Trick questions

**“What is the accuracy of Linear Regression?”**  
I did not use accuracy there. Test R² is 0.78.

**“What is the R² of the decision tree?”**  
I did not use R² there. Test accuracy is 0.79, with precision/recall on the notebook.

**“Which model won?”**  
Neither. Different problems.

**“Is Linear Regression a classifier?”**  
No.

**“Did you one-hot encode for the tree?”**  
Yes, so sklearn gets numbers. Trees can also split on integer codes; encoding keeps `Sex` and `Embarked` explicit. Scaling still not needed.
