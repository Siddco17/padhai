#!/usr/bin/env python3
"""Generate the FoML Colab notebook. Run from this folder."""
from pathlib import Path
import nbformat as nbf

nb = nbf.v4.new_notebook()
nb["metadata"] = {
    "kernelspec": {
        "display_name": "Python 3",
        "language": "python",
        "name": "python3",
    },
    "language_info": {"name": "python", "pygments_lexer": "ipython3"},
    "colab": {"provenance": [], "toc_visible": True},
}

cells = []


def md(source: str):
    cells.append(nbf.v4.new_markdown_cell(source.strip() + "\n"))


def code(source: str):
    cells.append(nbf.v4.new_code_cell(source.strip() + "\n"))


md(
    """
# FoML Lab — Linear Regression **and** Decision Tree

**Course:** CSL2XX Fundamentals of Machine Learning (Lab)  
**Environment:** Google Colab (`Runtime → Run all`)

Two **separate** experiments. Different Kaggle datasets, different sklearn models, different metrics. **Not a comparison.**

| | Experiment A | Experiment B |
|--|----------------|---------------|
| Algorithm | Linear Regression | Decision Tree |
| sklearn class | `LinearRegression` | `DecisionTreeClassifier` |
| Kaggle data | [Medical Cost Personal](https://www.kaggle.com/datasets/mirichoi0218/insurance) | [Titanic](https://www.kaggle.com/datasets/yasserh/titanic-dataset) |
| Task | **Regression** — predict `charges` (USD) | **Classification** — predict `Survived` (0/1) |
| Metrics | MAE, RMSE, R² | Accuracy, precision, recall, confusion matrix |

Linear Regression predicts a **number**. A classification tree predicts a **class**. Mixing those metrics (or ranking the two models) would be the wrong lab.
"""
)

md(
    """
## 0. Setup
"""
)

code(
    """
from pathlib import Path
import subprocess

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    ConfusionMatrixDisplay,
    classification_report,
)

np.random.seed(42)
plt.rcParams["figure.figsize"] = (8, 4.5)
plt.rcParams["axes.grid"] = True

print("numpy", np.__version__)
print("pandas", pd.__version__)
"""
)

code(
    """
def load_kaggle_csv(filename, kaggle_slug, mirror_url):
    \"\"\"Local copy → Kaggle API (if kaggle.json exists) → public mirror of the same table.\"\"\"
    candidates = [
        Path("data") / filename,
        Path("../data") / filename,
        Path("/content") / filename,
    ]
    for path in candidates:
        if path.exists():
            df = pd.read_csv(path)
            print(f\"{filename}: local file ({path}), shape={df.shape}\")
            return df

    kaggle_json = Path.home() / ".kaggle" / "kaggle.json"
    uploaded = Path("kaggle.json")
    if uploaded.exists() and not kaggle_json.exists():
        kaggle_json.parent.mkdir(parents=True, exist_ok=True)
        kaggle_json.write_bytes(uploaded.read_bytes())
        kaggle_json.chmod(0o600)

    if kaggle_json.exists():
        out_dir = Path("/content") if Path("/content").exists() else Path(".")
        try:
            subprocess.run(
                ["kaggle", "datasets", "download", "-d", kaggle_slug,
                 "-p", str(out_dir), "--unzip"],
                check=True, capture_output=True, text=True,
            )
            hits = list(out_dir.glob("*.csv"))
            if hits:
                df = pd.read_csv(hits[0])
                print(f\"{filename}: Kaggle API, shape={df.shape}\")
                return df
        except Exception as exc:
            print("Kaggle API skipped:", exc)

    df = pd.read_csv(mirror_url)
    print(f\"{filename}: GitHub mirror of Kaggle dataset, shape={df.shape}\")
    return df


# Optional official Kaggle download in Colab:
# from google.colab import files
# files.upload()   # choose kaggle.json, then re-run this cell
print("Ready. Uncomment files.upload() only if you want the official Kaggle download.")
"""
)

md(
    """
---

# Experiment A — Linear Regression

**Model:** `sklearn.linear_model.LinearRegression`  
**Data:** Kaggle *Medical Cost Personal Dataset* (1338 people)  
https://www.kaggle.com/datasets/mirichoi0218/insurance

Predict yearly medical **`charges`** from age, BMI, children, sex, smoker, region.
"""
)

code(
    """
insurance = load_kaggle_csv(
    filename="insurance.csv",
    kaggle_slug="mirichoi0218/insurance",
    mirror_url=(
        "https://raw.githubusercontent.com/stedy/"
        "Machine-Learning-with-R-datasets/master/insurance.csv"
    ),
)
insurance.head()
"""
)

md(
    """
### A1. Explore
"""
)

code(
    """
print(insurance.dtypes.to_string())
print("\\nMissing values:\\n", insurance.isnull().sum().to_string())
print("\\nNumeric summary:\\n", insurance.describe().to_string())
print("\\nCategorical counts:")
for col in ["sex", "smoker", "region"]:
    print(f\"\\n{col}:\\n\", insurance[col].value_counts().to_string())

fig, axes = plt.subplots(1, 3, figsize=(14, 4))
insurance["charges"].hist(bins=30, ax=axes[0], color="steelblue", edgecolor="white")
axes[0].set_title("Target: charges (USD)")

insurance.boxplot(column="charges", by="smoker", ax=axes[1])
axes[1].set_title("Charges by smoker")
plt.suptitle("")

axes[2].scatter(
    insurance["age"], insurance["charges"],
    c=(insurance["smoker"] == "yes"), cmap="coolwarm", alpha=0.6, s=18,
)
axes[2].set_title("Age vs charges (smoker highlighted)")
axes[2].set_xlabel("age")
plt.tight_layout()
plt.show()

print("Correlation with charges:")
print(insurance.select_dtypes(include="number").corr()["charges"].sort_values(ascending=False))
"""
)

md(
    """
### A2. Encode + train/test split

Categorical strings cannot go into the linear formula → **one-hot encode**.  
`drop="first"` avoids a redundant dummy column. 80/20 split, encoder fit on **train only**.
"""
)

code(
    """
y_reg = insurance["charges"]
X_reg = insurance.drop(columns=["charges"])
num_reg = ["age", "bmi", "children"]
cat_reg = ["sex", "smoker", "region"]

X_reg_train, X_reg_test, y_reg_train, y_reg_test = train_test_split(
    X_reg, y_reg, test_size=0.20, random_state=42
)

prep_reg = ColumnTransformer([
    ("num", "passthrough", num_reg),
    ("cat", OneHotEncoder(drop="first", handle_unknown="ignore"), cat_reg),
])

print("Train", X_reg_train.shape, "| Test", X_reg_test.shape)
"""
)

md(
    r"""
### A3. Fit Linear Regression

$$
\hat{y} = w_0 + w_1 x_1 + \cdots + w_d x_d
$$

sklearn minimises **mean squared error** (ordinary least squares).
"""
)

code(
    """
linreg = Pipeline([("prep", prep_reg), ("model", LinearRegression())])
linreg.fit(X_reg_train, y_reg_train)

def regression_metrics(y_true, y_pred, split):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)
    print(f\"{split:6s}  MAE={mae:,.2f}   RMSE={rmse:,.2f}   R²={r2:.3f}\")

print("LinearRegression")
regression_metrics(y_reg_train, linreg.predict(X_reg_train), "train")
regression_metrics(y_reg_test, linreg.predict(X_reg_test), "test")

ohe_reg = linreg.named_steps["prep"].named_transformers_["cat"]
feat_reg = num_reg + list(ohe_reg.get_feature_names_out(cat_reg))
weights = linreg.named_steps["model"].coef_
intercept = linreg.named_steps["model"].intercept_

print(f\"\\nIntercept w0 = {intercept:,.2f}\")
print("Coefficients (sorted by |weight|):")
order = np.argsort(np.abs(weights))[::-1]
for name, w in zip(np.array(feat_reg)[order], weights[order]):
    print(f\"  {name:20s}  {w:10.2f}\")
"""
)

md(
    """
**Read the weights:** `smoker_yes ≈ +23650` dollars (holding other features fixed). Age ≈ +$257/year, BMI ≈ +$337/point. `sex_male` is almost 0.

**Metrics (regression only):** MAE = typical dollar miss, RMSE = √MSE (large misses hurt more), R² = fraction of variance explained. Do **not** report accuracy here.
"""
)

md(
    r"""
### A4. Same fit with the normal equation (Linear Algebra)

$$
w = (X^\top X)^{-1} X^\top y
$$

(`pinv` so a singular $X^\top X$ does not crash.)
"""
)

code(
    """
X_enc = linreg.named_steps["prep"].transform(X_reg_train)
X_b = np.column_stack([np.ones(X_enc.shape[0]), X_enc])
theta = np.linalg.pinv(X_b.T @ X_b) @ X_b.T @ y_reg_train.to_numpy()

print("NumPy intercept :", round(theta[0], 2))
print("sklearn intercept:", round(intercept, 2))
print("Max |weight difference|:", round(np.max(np.abs(theta[1:] - weights)), 6))
"""
)

code(
    """
pred_reg = linreg.predict(X_reg_test)
fig, ax = plt.subplots(figsize=(6, 6))
ax.scatter(y_reg_test, pred_reg, alpha=0.65, s=22)
lims = [0, max(y_reg_test.max(), pred_reg.max())]
ax.plot(lims, lims, "k--", linewidth=1)
ax.set_xlabel("Actual charges")
ax.set_ylabel("Predicted charges")
ax.set_title("Linear Regression — test set")
plt.tight_layout()
plt.show()
"""
)

md(
    """
**Experiment A takeaway:** Linear Regression on insurance costs gets test R² ≈ **0.78**. Smoking dominates the linear weights. Residuals still show structure (smoker bands) because the model assumes additive linear effects.

---

# Experiment B — Decision Tree

**Model:** `sklearn.tree.DecisionTreeClassifier`  ← a **different** class from `LinearRegression`, and a **classifier**, not a regressor.  
**Data:** Kaggle *Titanic* (891 passengers)  
https://www.kaggle.com/datasets/yasserh/titanic-dataset

Predict **`Survived`** (0 = died, 1 = survived) from class, sex, age, family counts, fare, port.
"""
)

code(
    """
titanic = load_kaggle_csv(
    filename="titanic.csv",
    kaggle_slug="yasserh/titanic-dataset",
    mirror_url=(
        "https://raw.githubusercontent.com/datasciencedojo/"
        "datasets/master/titanic.csv"
    ),
)
titanic.head()
"""
)

md(
    """
### B1. Explore

Drop `PassengerId`, `Name`, `Ticket`, `Cabin` (IDs / high missingness / not useful as raw text).  
`Age` and `Embarked` have missing values → impute inside the pipeline (median / most frequent), **train-only**.
"""
)

code(
    """
print(titanic.dtypes.to_string())
print("\\nMissing values:\\n", titanic.isnull().sum().to_string())
print("\\nSurvived counts:\\n", titanic["Survived"].value_counts().to_string())
print("survival rate by sex:\\n", titanic.groupby("Sex")["Survived"].mean().to_string())
print("survival rate by Pclass:\\n", titanic.groupby("Pclass")["Survived"].mean().to_string())

fig, axes = plt.subplots(1, 3, figsize=(14, 4))
titanic["Survived"].value_counts().sort_index().plot.bar(ax=axes[0], color=["salmon", "seagreen"])
axes[0].set_title("Survived (0 = died)")
axes[0].set_xticklabels(["died", "survived"], rotation=0)

surv_sex = titanic.pivot_table(index="Sex", columns="Survived", values="PassengerId", aggfunc="count")
surv_sex.plot.bar(ax=axes[1], stacked=True, color=["salmon", "seagreen"])
axes[1].set_title("Sex vs survival")
axes[1].tick_params(axis="x", rotation=0)

titanic.boxplot(column="Age", by="Survived", ax=axes[2])
axes[2].set_title("Age by survival")
plt.suptitle("")
plt.tight_layout()
plt.show()
"""
)

md(
    """
### B2. Encode + split

`stratify=y` keeps the same died/survived ratio in train and test.
"""
)

code(
    """
drop_cols = ["PassengerId", "Name", "Ticket", "Cabin", "Survived"]
X_clf = titanic.drop(columns=drop_cols)
y_clf = titanic["Survived"]

num_clf = ["Age", "SibSp", "Parch", "Fare"]
cat_clf = ["Pclass", "Sex", "Embarked"]

X_clf_train, X_clf_test, y_clf_train, y_clf_test = train_test_split(
    X_clf, y_clf, test_size=0.20, random_state=42, stratify=y_clf
)

prep_clf = ColumnTransformer([
    ("num", SimpleImputer(strategy="median"), num_clf),
    ("cat", Pipeline([
        ("imp", SimpleImputer(strategy="most_frequent")),
        ("oh", OneHotEncoder(drop="first", handle_unknown="ignore")),
    ]), cat_clf),
])

print("Train", X_clf_train.shape, "| Test", X_clf_test.shape)
print("train survival rate", round(y_clf_train.mean(), 3),
      "| test survival rate", round(y_clf_test.mean(), 3))
"""
)

md(
    """
### B3. Fit Decision Tree classifier

Each split asks a yes/no question. Each leaf predicts the **majority class** of training rows in that leaf.  
Split criterion: **Gini impurity** (default). (Entropy/information gain is the other common option.)  
`max_depth=3` keeps the tree small enough to draw and explain in viva.
"""
)

code(
    """
tree = Pipeline([
    ("prep", prep_clf),
    ("model", DecisionTreeClassifier(max_depth=3, random_state=42)),
])
tree.fit(X_clf_train, y_clf_train)

def classification_metrics(y_true, y_pred, split):
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred)
    rec = recall_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred)
    print(f\"{split:6s}  accuracy={acc:.3f}  precision={prec:.3f}  recall={rec:.3f}  F1={f1:.3f}\")

pred_tr = tree.predict(X_clf_train)
pred_te = tree.predict(X_clf_test)

print("DecisionTreeClassifier (max_depth=3)")
classification_metrics(y_clf_train, pred_tr, "train")
classification_metrics(y_clf_test, pred_te, "test")

print("\\nTest classification report:")
print(classification_report(y_clf_test, pred_te, target_names=["died", "survived"]))
"""
)

code(
    """
fig, ax = plt.subplots(figsize=(5, 4))
ConfusionMatrixDisplay(
    confusion_matrix(y_clf_test, pred_te),
    display_labels=["died", "survived"],
).plot(ax=ax, cmap="Blues", colorbar=False)
ax.set_title("Decision Tree — test confusion matrix")
plt.tight_layout()
plt.show()

ohe_clf = tree.named_steps["prep"].named_transformers_["cat"].named_steps["oh"]
feat_clf = num_clf + list(ohe_clf.get_feature_names_out(cat_clf))
imps = tree.named_steps["model"].feature_importances_
print("Feature importance:")
for name, imp in sorted(zip(feat_clf, imps), key=lambda t: -t[1]):
    print(f\"  {name:20s}  {imp:.3f}\")
"""
)

code(
    """
plt.figure(figsize=(16, 8))
plot_tree(
    tree.named_steps["model"],
    feature_names=feat_clf,
    class_names=["died", "survived"],
    filled=True,
    rounded=True,
    fontsize=8,
)
plt.title("DecisionTreeClassifier, max_depth=3")
plt.show()
"""
)

md(
    """
**Read the metrics (classification only):**

- **Accuracy** — overall fraction correct. Weak alone if classes are imbalanced (here ~62% died).
- **Precision** (survived) — of passengers we predicted survived, how many actually did.
- **Recall** (survived) — of actual survivors, how many we caught.
- **Confusion matrix** — TN / FP / FN / TP on the test set.

Root split should be **sex**. Women in 1st/2nd class survive much more often; that is the usual Titanic tree story.

**Experiment B takeaway:** `DecisionTreeClassifier` on Titanic, depth 3, test accuracy ≈ **0.79**, with sex as the dominant split. This experiment does not use Linear Regression and does not share metrics with Experiment A.
"""
)

md(
    """
## Viva — two independent 20-second pitches

**A.** *I used LinearRegression on the Kaggle insurance table to predict charges. After one-hot encoding, test R² is about 0.78. The smoker coefficient is about +$23.6k. Metrics are MAE, RMSE, and R².*

**B.** *I used DecisionTreeClassifier on the Kaggle Titanic table to predict survived vs died. Depth 3, test accuracy about 0.79. Precision/recall and a confusion matrix are on the notebook. The first split is sex.*

If they ask “which model is better?”: **they solve different problems**, so they are not ranked against each other.
"""
)

nb["cells"] = cells
out = Path(__file__).resolve().parent / "linear_regression_decision_tree.ipynb"
nbf.write(nb, out)
print("wrote", out, "cells", len(cells))
