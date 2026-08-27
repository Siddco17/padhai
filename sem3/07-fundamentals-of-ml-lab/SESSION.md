# FoML Lab (CSL2XX)

- **Parent:** CSL2XX Fundamentals of Machine Learning
- **Credits:** 1 of 4 (from `3-0-2`)
- **Weight:** **25%** of course grade (AA-critical)
- **Theory session:** `../07-fundamentals-of-ml/`

## Indicative work
- Bayesian learning
- Linear regression + neural nets
- Decision trees
- K-means
- Model comparison + metrics on datasets
- Real-life **course project**

## AA lab habits
- Notebook + short markdown writeup same day
- Report metrics properly (accuracy alone is weak — precision/recall/confusion matrix)
- Start project by mid-sem; audio/IEM-flavored OK if instructor allows

## This evaluation (two independent experiments)

- **Notebook:** [`scripts/linear_regression_decision_tree.ipynb`](scripts/linear_regression_decision_tree.ipynb) — Colab: upload, then **Runtime → Run all**
- **A. Linear Regression** — Kaggle [insurance](https://www.kaggle.com/datasets/mirichoi0218/insurance) → `LinearRegression` → MAE / RMSE / R²
- **B. Decision Tree** — Kaggle [Titanic](https://www.kaggle.com/datasets/yasserh/titanic-dataset) → `DecisionTreeClassifier` → accuracy / precision / recall / confusion matrix
- **Why:** target type picks the model — `charges` is a number → Linear Regression; `Survived` is a class → Decision Tree classifier. Details in the viva notes.
- **Viva:** [`notes/viva-linear-regression-decision-tree.md`](notes/viva-linear-regression-decision-tree.md)

## Log
| Date | Experiment / project | Next |
|------|----------------------|------|
| 2026-08-27 | A: LinearRegression on insurance. B: DecisionTreeClassifier on Titanic. Separate experiments, not a comparison. | Re-run in Colab; two 20-second viva pitches |
