# FoML lab viva — Linear Regression vs Decision Tree

Use with the Colab notebook `scripts/linear_regression_decision_tree.ipynb`.  
Numbers below are from `random_state=42`, 80/20 split, on the Kaggle insurance CSV (1338 rows). Re-run the notebook before the viva so yours match.

## 30-second opening (memorise this)

> I took the Kaggle medical cost dataset — 1338 people, predict insurance `charges`.  
> I encoded the categorical columns and used an 80/20 train-test split.  
> Linear Regression is an interpretable baseline: test R² about **0.78**, and the smoker flag adds roughly **+$23,600**.  
> An unlimited Decision Tree overfits (train R² ≈ 1, test worse than Linear Regression).  
> A tree with `max_depth=3` is the best predictor here (test R² about **0.85**) because charges are not a straight line — smokers sit on a higher band.

## Dataset (they will ask)

| Question | Answer |
|----------|--------|
| Source? | Kaggle: *Medical Cost Personal Dataset* (`mirichoi0218/insurance`) |
| Task? | **Regression** (continuous target). Not classification. |
| Why this set? | Linear Regression needs a numeric target. Features are easy to explain. Smoking is a strong signal. |
| Size? | 1338 rows × 7 columns. **No missing values.** |
| Features? | `age`, `sex`, `bmi`, `children`, `smoker`, `region` → predict `charges` |
| Any leak? | Encoder and models are fit on **train only** (sklearn `Pipeline`). |

If they say “why not a classification dataset?”: Linear Regression predicts a real number. Decision trees can do both; we used `DecisionTreeRegressor` so the comparison is fair.

## What you actually did (pipeline)

1. Load CSV → inspect types, nulls, plots.
2. One-hot encode `sex`, `smoker`, `region` (`drop="first"`).
3. 80% train, 20% test (`random_state=42` → 1070 / 268).
4. Fit Linear Regression.
5. Fit Decision Tree: unlimited, `max_depth=3`, `max_depth=5`.
6. Compare **MAE, RMSE, R²** on train **and** test.

## Results to quote

| Model | Train R² | Test R² | Test RMSE (USD) | Test MAE (USD) |
|-------|----------|---------|-----------------|----------------|
| Linear Regression | 0.742 | **0.784** | 5796 | 4181 |
| Tree, unlimited | 0.998 | 0.697 | 6861 | 3384 |
| Tree, depth=3 | 0.854 | **0.853** | **4776** | **2866** |
| Tree, depth=5 | 0.880 | 0.834 | 5083 | 2931 |

**Winner for prediction:** depth-3 tree.  
**Winner for “how many dollars does smoking add?”:** Linear Regression.

## Metrics (do not say “accuracy”)

This is regression. **Accuracy / precision / recall / confusion matrix are for classification.**

| Metric | Formula idea | Use |
|--------|----------------|-----|
| **MAE** | mean of \|error\| | typical dollar miss; easy to say in viva |
| **MSE** | mean of error² | what Linear Regression minimises |
| **RMSE** | √MSE | same units as `charges`; large mistakes hurt more |
| **R²** | 1 − SS_res/SS_tot | fraction of variance explained; 1 = perfect, 0 = “predict the mean” |

Always report **test** metrics. Train-only numbers hide overfitting.

## Linear Regression — expected questions

**What is it?**  
A model that predicts a **linear combination** of features:  
\(\hat{y} = w_0 + w_1 x_1 + \cdots + w_d x_d\).  
Weights are chosen to minimise MSE (ordinary least squares).

**Normal equation (Linear Algebra course):**  
\(w = (X^\top X)^{-1} X^\top y\)  
(with a column of 1s in \(X\) for the intercept). The notebook checks this with `numpy` and matches sklearn.

**Assumptions:** linear + additive effects; errors roughly homoscedastic. Smoking × BMI is an **interaction** — a plain linear model will miss it unless you add that column.

**Do you scale features?**  
Not required for unregularized OLS **predictions**. Scaling helps if you compare coefficient *sizes* across different units, or if you use Ridge/Lasso.

**One-hot encoding?**  
Strings cannot go into the linear formula. `smoker=yes` becomes a 0/1 column. `drop="first"` drops one dummy so columns are not perfectly collinear (dummy-variable trap).

**Coefficients on this data (approx):**

- `smoker_yes` **+23651** — dominant
- `bmi` **+337** per point
- `age` **+257** per year
- `children` **+425**
- `sex_male` ≈ **0** — almost unused
- intercept ≈ **−11931** — baseline when encoded features are 0; don’t over-explain it

**Why is test R² a bit higher than train R² for Linear Regression?**  
Chance of the random split (test set happened to be slightly easier). Not a bug. Trees show the opposite pattern when they overfit.

## Decision Tree — expected questions

**What is it?**  
Recursive yes/no splits. Each leaf predicts the **mean** `charges` of training rows in that leaf (CART regression, MSE split criterion).

**How does it choose a split?**  
Try thresholds; pick the one that most reduces MSE in the two child nodes.

**Gini / entropy?**  
Those are for **classification** trees. Regression trees use **MSE / variance**.

**Why did unlimited depth fail?**  
It can isolate almost every training row (train R² ≈ 1) and then fails on new people. That gap is **overfitting**.

**Why did depth 3 win?**  
The true pattern is simple: smoker vs not, then BMI/age. Extra depth fits noise.

**Feature importance vs linear weights?**  
Importance = how much that feature reduced error across splits. Here `smoker_yes` ≈ 0.69, then `bmi`, then `age`. Same story as the linear coefficients, different math.

**Does a tree need scaling or one-hot encoding?**  
Scaling: **no** (splits are on thresholds). One-hot: sklearn trees want numbers, so we still encode categoricals. (Trees can also split on integer category codes; one-hot is the consistent choice with Linear Regression.)

**`random_state`?**  
Ties / feature order; keeps the tree reproducible for the lab file.

## Overfitting / underfitting (they love this)

| | Underfit | Overfit |
|--|----------|---------|
| Symptom | Train **and** test both poor | Train great, **test** poor |
| Example here | Linear Regression misses smoker×BMI (mild) | Unlimited tree |
| Fix | Richer features / more flexible model | `max_depth`, min samples per leaf, more data |

**Generalisation** = performance on **unseen** test data.

## Comparison they want to hear

- Linear Regression: few parameters, stable, interpretable dollars. Blind to interactions unless you add them.
- Decision Tree: piecewise constant, captures interactions, easy to draw, overfits if grown fully.
- On **this** dataset the shallow tree wins on RMSE/R² because of the smoker gap, which is not a single straight line through age.

## Trick questions

**“What is the accuracy of your model?”**  
I did not use accuracy. Test R² is 0.85 for the depth-3 tree; MAE is about $2900.

**“Is Linear Regression a classifier?”**  
No. Linear *classifier* / logistic regression is a different model. This lab is regression.

**“Did you use neural nets?”**  
Not in this experiment. Syllabus has ANN later; this lab is Linear Regression + trees.

**“Why 80/20 not 70/30?”**  
Common default. With 1338 rows both are fine. What matters is a held-out test set and a fixed seed.

**“Did you use validation?”**  
Simple lab: one train/test split. Better practice: a validation set or k-fold to choose `max_depth`, *then* report test once.

**“What if charges are skewed?”**  
They are (histogram). A log target can help Linear Regression. The tree cares less because it only cares about order/thresholds.

**“Bias-variance?”**  
Linear Regression: higher bias, lower variance. Deep tree: low bias, high variance. Depth 3 is the bias-variance compromise here.

**“Could you implement Linear Regression without sklearn?”**  
Yes — normal equation in the notebook. Gradient descent also works; OLS has a closed form.

## If they open the notebook

Walk them in this order:

1. Shape 1338×7, zero nulls.  
2. Boxplot: smokers much more expensive.  
3. Coefficient table: `smoker_yes`.  
4. Metrics table: unlimited tree overfit.  
5. Drawn depth-3 tree: root split is smoker.  
6. Actual vs predicted scatter: tree hugs the diagonal better.

## What I would do next (if they ask)

- Add interaction term `smoker * bmi` to Linear Regression (often closes most of the gap).
- Tune `max_depth` with cross-validation.
- Random Forest / Gradient Boosting as a stronger tree ensemble.
- Check residuals vs predicted (fan shape → heteroscedasticity).
