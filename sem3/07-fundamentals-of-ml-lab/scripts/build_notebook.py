#!/usr/bin/env python3
"""Generate the FoML Colab notebook. Run from repo root or this folder."""
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
    "colab": {
        "provenance": [],
        "toc_visible": True,
    },
}

cells = []


def md(source: str):
    cells.append(nbf.v4.new_markdown_cell(source.strip() + "\n"))


def code(source: str):
    cells.append(nbf.v4.new_code_cell(source.strip() + "\n"))


md(
    """
# FoML Lab — Linear Regression vs Decision Tree

**Course:** CSL2XX Fundamentals of Machine Learning (Lab)  
**Aim:** Take **one Kaggle dataset**, train **Linear Regression** and a **Decision Tree**, then compare them.  
**Environment:** Google Colab (`Runtime → Run all`)

| Item | Choice |
|------|--------|
| Dataset | [Medical Cost Personal Dataset](https://www.kaggle.com/datasets/mirichoi0218/insurance) (Kaggle) |
| Task | **Regression** — predict yearly medical `charges` (USD) |
| Model A | `LinearRegression` |
| Model B | `DecisionTreeRegressor` |
| Why this dataset? | Target is continuous (so Linear Regression is valid). Features mix numbers + categories. `smoker` is a strong, viva-friendly signal. |

**What you should be able to say in viva:** what the data is, how you split it, what each model assumes, which metrics you used, and why the shallow tree beat Linear Regression here.
"""
)

md(
    """
## 0. Setup

Colab already has `pandas`, `numpy`, `sklearn`, `matplotlib`. This cell just imports them and turns on readable plots.
"""
)

code(
    """
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor, plot_tree
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

np.random.seed(42)
plt.rcParams["figure.figsize"] = (8, 4.5)
plt.rcParams["axes.grid"] = True

print("numpy", np.__version__)
print("pandas", pd.__version__)
"""
)

md(
    """
## 1. Load the Kaggle dataset

**Kaggle page:** https://www.kaggle.com/datasets/mirichoi0218/insurance  

Columns:

| Column | Type | Meaning |
|--------|------|---------|
| `age` | numeric | age of primary beneficiary |
| `sex` | categorical | female / male |
| `bmi` | numeric | body mass index |
| `children` | numeric | number of dependents |
| `smoker` | categorical | yes / no |
| `region` | categorical | US residential area |
| `charges` | numeric **(target)** | individual medical costs billed by insurance |

The cell below tries, in order:

1. A local `data/insurance.csv` (this repo)  
2. Kaggle API, if `kaggle.json` is present (official download)  
3. A public GitHub mirror of the **same** Kaggle/Lantz insurance CSV  

So `Run all` works even without a Kaggle account. For the evaluation, mention the Kaggle link above as the source.
"""
)

code(
    """
from pathlib import Path

KAGGLE_SLUG = "mirichoi0218/insurance"
MIRROR_URL = (
    "https://raw.githubusercontent.com/stedy/"
    "Machine-Learning-with-R-datasets/master/insurance.csv"
)

CANDIDATES = [
    Path("data/insurance.csv"),
    Path("../data/insurance.csv"),
    Path("/content/insurance.csv"),
]


def find_local_csv():
    for p in CANDIDATES:
        if p.exists():
            return p
    return None


def try_kaggle_download():
    \"\"\"Official Kaggle download. Needs kaggle.json in Colab (~/.kaggle/).\"\"\"
    kaggle_json = Path.home() / ".kaggle" / "kaggle.json"
    uploaded = Path("kaggle.json")
    if uploaded.exists() and not kaggle_json.exists():
        kaggle_json.parent.mkdir(parents=True, exist_ok=True)
        kaggle_json.write_bytes(uploaded.read_bytes())
        kaggle_json.chmod(0o600)
    if not kaggle_json.exists():
        return None
    import subprocess, zipfile, io

    out_dir = Path("/content") if Path("/content").exists() else Path(".")
    cmd = [
        "kaggle", "datasets", "download",
        "-d", KAGGLE_SLUG, "-p", str(out_dir), "--unzip",
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, text=True)
    except Exception as exc:
        print("Kaggle API skipped:", exc)
        return None
    hit = find_local_csv()
    if hit is None:
        csvs = list(out_dir.glob("*.csv"))
        return csvs[0] if csvs else None
    return hit


csv_path = find_local_csv()
source = "local file" if csv_path else None

if csv_path is None:
    csv_path = try_kaggle_download()
    if csv_path is not None:
        source = "Kaggle API"

if csv_path is None:
    print("Loading public mirror of the Kaggle insurance dataset…")
    df = pd.read_csv(MIRROR_URL)
    source = "GitHub mirror of Kaggle dataset"
else:
    df = pd.read_csv(csv_path)

print("Loaded from:", source)
print("Path:" , csv_path)
print("Shape:", df.shape)          # (rows, columns)
df.head()
"""
)

md(
    """
### Optional: use the official Kaggle API in Colab

1. Kaggle → Account → **Create New Token** → downloads `kaggle.json`  
2. Uncomment the two lines below, run the cell, and upload that file  
3. Re-run the load cell (it will prefer Kaggle when `kaggle.json` is present)
"""
)

code(
    """
# from google.colab import files
# files.upload()   # choose kaggle.json, then re-run the load cell
print("Uncomment the two lines above only if you want the official Kaggle download.")
"""
)

md(
    """
## 2. Explore the data (EDA)

Before fitting anything: missing values, types, and a few plots. Examiners often ask *“did you look at the data first?”*
"""
)

code(
    """
print("Column types:\\n", df.dtypes.to_string())
print("\\nMissing values:\\n", df.isnull().sum().to_string())
print("\\nNumeric summary:\\n", df.describe().to_string())
print("\\nCategorical counts:")
for col in ["sex", "smoker", "region"]:
    print(f"\\n{col}:")
    print(df[col].value_counts().to_string())
"""
)

code(
    """
fig, axes = plt.subplots(1, 3, figsize=(14, 4))

df["charges"].hist(bins=30, ax=axes[0], color="steelblue", edgecolor="white")
axes[0].set_title("Target: charges")
axes[0].set_xlabel("USD")

df.boxplot(column="charges", by="smoker", ax=axes[1])
axes[1].set_title("Charges by smoker")
axes[1].set_xlabel("smoker")
plt.suptitle("")

axes[2].scatter(df["age"], df["charges"], c=(df["smoker"] == "yes"),
                cmap="coolwarm", alpha=0.6, s=18)
axes[2].set_title("Age vs charges (red-ish = smoker)")
axes[2].set_xlabel("age")
axes[2].set_ylabel("charges")

plt.tight_layout()
plt.show()

print("Numeric correlation with charges:")
print(df.select_dtypes(include="number").corr()["charges"].sort_values(ascending=False))
"""
)

md(
    """
**What the plots should show (say this in viva):**

- `charges` is right-skewed — a few very expensive patients.
- **Smokers cost much more.** That single binary feature will dominate both models.
- Age has a positive trend, but two bands appear because of smoking.
- Numeric correlations of `age` / `bmi` with `charges` are only moderate (~0.3 and ~0.2). Smoking is the real driver; it is just not numeric yet.
"""
)

md(
    """
## 3. Features, encoding, train/test split

- **Target `y`:** `charges`  
- **Features `X`:** everything else  
- **Categorical columns** cannot go into Linear Regression as strings → **one-hot encode** (`smoker=yes` becomes a 0/1 column).  
- `drop="first"` avoids a redundant dummy column (dummy-variable trap).  
- **80% train / 20% test**, `random_state=42` so results are reproducible.  
- We fit the encoder on **train only** (via a sklearn `Pipeline`) so test data does not leak into preprocessing.
"""
)

code(
    """
TARGET = "charges"
numeric_features = ["age", "bmi", "children"]
categorical_features = ["sex", "smoker", "region"]

X = df.drop(columns=[TARGET])
y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42
)

preprocess = ColumnTransformer(
    transformers=[
        ("num", "passthrough", numeric_features),
        ("cat", OneHotEncoder(drop="first", handle_unknown="ignore"), categorical_features),
    ]
)

print("Train size:", X_train.shape, " | Test size:", X_test.shape)
"""
)

code(
    """
def regression_report(y_true, y_pred, split_name):
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_true, y_pred)
    print(f\"{split_name:6s}  MAE={mae:,.2f}   RMSE={rmse:,.2f}   R²={r2:.3f}\")
    return {"split": split_name, "MAE": mae, "RMSE": rmse, "R2": r2}


def fit_and_score(name, model):
    pipe = Pipeline([("prep", preprocess), ("model", model)])
    pipe.fit(X_train, y_train)
    print(f\"\\n=== {name} ===\")
    tr = regression_report(y_train, pipe.predict(X_train), "train")
    te = regression_report(y_test, pipe.predict(X_test), "test")
    return pipe, tr, te
"""
)

md(
    """
## 4. Linear Regression

**Idea:** predict a weighted sum of features

$$
\\hat{y} = w_0 + w_1 x_1 + w_2 x_2 + \\cdots + w_d x_d
$$

sklearn minimises **Mean Squared Error** (ordinary least squares).  
Assumptions to mention: linear relationship, additive effects, errors with roughly constant variance.

**We do not need feature scaling** for unregularized OLS predictions (the fit is the same). Scaling would only make coefficient *magnitudes* comparable across units.
"""
)

code(
    """
lr_pipe, lr_train, lr_test = fit_and_score(
    "Linear Regression", LinearRegression()
)

ohe = lr_pipe.named_steps["prep"].named_transformers_["cat"]
feature_names = numeric_features + list(ohe.get_feature_names_out(categorical_features))
weights = lr_pipe.named_steps["model"].coef_
intercept = lr_pipe.named_steps["model"].intercept_

print(f\"\\nIntercept w0 = {intercept:,.2f}\")
print("\\nCoefficients (sorted by |weight|):")
order = np.argsort(np.abs(weights))[::-1]
for name, w in zip(np.array(feature_names)[order], weights[order]):
    print(f\"  {name:20s}  {w:10.2f}\")
"""
)

md(
    """
**How to read the coefficients (viva):**

- `smoker_yes ≈ +23650` → holding other features fixed, a smoker is billed about **$23.6k more**.  
- `age ≈ +257` → each extra year adds about **$257**.  
- `bmi ≈ +337` → each BMI point adds about **$337**.  
- `sex_male` is almost **0** → sex barely matters after the other features.  
- Intercept is just the baseline when all (encoded) features are 0; do not over-interpret it.
"""
)

md(
    """
### Bonus (Linear Algebra link): the normal equation

Same model, solved with NumPy instead of sklearn.  
With intercept column in $X$:

$$
w = (X^\\top X)^{-1} X^\\top y
$$

We use the pseudoinverse `pinv` so a singular $X^\\top X$ does not crash.
"""
)

code(
    """
X_train_enc = lr_pipe.named_steps["prep"].transform(X_train)
X_b = np.column_stack([np.ones(X_train_enc.shape[0]), X_train_enc])  # add w0 column
theta = np.linalg.pinv(X_b.T @ X_b) @ X_b.T @ y_train.to_numpy()

print("NumPy intercept :", round(theta[0], 2))
print("sklearn intercept:", round(intercept, 2))
print("Max |weight difference| vs sklearn:", round(np.max(np.abs(theta[1:] - weights)), 6))
print("(Should be ~0 — both are ordinary least squares.)")
"""
)

md(
    """
## 5. Decision Tree

**Idea:** ask yes/no questions on features (`smoker == yes`? `bmi > 30`?) and predict the **mean charges** of the training rows that fall in that leaf.

- Does **not** assume a straight line.
- Can model **interactions** (e.g. smoker × high BMI) that Linear Regression misses unless you add them by hand.
- Unlimited depth **memorizes** the training set → **overfitting**. We will show that on purpose.
"""
)

code(
    """
dt_unlimited, dt_u_tr, dt_u_te = fit_and_score(
    "Decision Tree (unlimited depth)",
    DecisionTreeRegressor(random_state=42),
)
dt_d3, dt3_tr, dt3_te = fit_and_score(
    "Decision Tree (max_depth=3)",
    DecisionTreeRegressor(max_depth=3, random_state=42),
)
dt_d5, dt5_tr, dt5_te = fit_and_score(
    "Decision Tree (max_depth=5)",
    DecisionTreeRegressor(max_depth=5, random_state=42),
)
"""
)

md(
    """
**Read the three trees:**

| Model | Train R² | Test R² | Story |
|-------|----------|---------|--------|
| Unlimited depth | ~1.00 | worse than LR | Memorised train data (**overfitting**) |
| `max_depth=3` | high, close to test | **best test** | Right amount of structure |
| `max_depth=5` | higher train, slightly worse test | starting to overfit again | |

This table is the strongest viva point in the lab.
"""
)

code(
    """
plt.figure(figsize=(18, 8))
plot_tree(
    dt_d3.named_steps["model"],
    feature_names=feature_names,
    filled=True,
    rounded=True,
    fontsize=8,
)
plt.title("Decision Tree (max_depth=3) — root split should be smoker")
plt.show()

importances = dt_d5.named_steps["model"].feature_importances_
imp_order = np.argsort(importances)[::-1]
print("Feature importance (depth-5 tree):")
for name, imp in zip(np.array(feature_names)[imp_order], importances[imp_order]):
    print(f\"  {name:20s}  {imp:.3f}\")
"""
)

md(
    """
## 6. Side-by-side comparison
"""
)

code(
    """
rows = [
    ("Linear Regression", lr_train, lr_test),
    ("Decision Tree (unlimited)", dt_u_tr, dt_u_te),
    ("Decision Tree (depth=3)", dt3_tr, dt3_te),
    ("Decision Tree (depth=5)", dt5_tr, dt5_te),
]

summary = pd.DataFrame([
    {
        "Model": name,
        "Train MAE": tr["MAE"],
        "Test MAE": te["MAE"],
        "Train RMSE": tr["RMSE"],
        "Test RMSE": te["RMSE"],
        "Train R²": tr["R2"],
        "Test R²": te["R2"],
    }
    for name, tr, te in rows
])

pd.set_option("display.float_format", lambda v: f"{v:,.2f}" if abs(v) > 1 else f"{v:.3f}")
print(summary.to_string(index=False))

fig, axes = plt.subplots(1, 2, figsize=(12, 4.5))
x = np.arange(len(summary))
w = 0.35
axes[0].bar(x - w / 2, summary["Train R²"], w, label="train")
axes[0].bar(x + w / 2, summary["Test R²"], w, label="test")
axes[0].set_xticks(x)
axes[0].set_xticklabels(summary["Model"], rotation=20, ha="right")
axes[0].set_ylabel("R² (higher is better)")
axes[0].set_title("R² — gap between train and test = overfitting")
axes[0].legend()

axes[1].bar(x - w / 2, summary["Train RMSE"], w, label="train")
axes[1].bar(x + w / 2, summary["Test RMSE"], w, label="test")
axes[1].set_xticks(x)
axes[1].set_xticklabels(summary["Model"], rotation=20, ha="right")
axes[1].set_ylabel("RMSE USD (lower is better)")
axes[1].set_title("RMSE")
axes[1].legend()
plt.tight_layout()
plt.show()
"""
)

code(
    """
fig, axes = plt.subplots(1, 2, figsize=(12, 4.8), sharex=True, sharey=True)
lims = [0, max(y_test.max(), lr_pipe.predict(X_test).max())]

for ax, pipe, title in [
    (axes[0], lr_pipe, "Linear Regression"),
    (axes[1], dt_d3, "Decision Tree depth=3"),
]:
    pred = pipe.predict(X_test)
    ax.scatter(y_test, pred, alpha=0.65, s=22)
    ax.plot(lims, lims, "k--", linewidth=1, label="perfect prediction")
    ax.set_title(title)
    ax.set_xlabel("Actual charges")
    ax.set_ylabel("Predicted charges")
    ax.legend()

plt.suptitle("Test set: actual vs predicted (closer to the dashed line is better)")
plt.tight_layout()
plt.show()
"""
)

md(
    """
## 7. Conclusion (write this in your lab file)

On this Kaggle insurance dataset:

1. **Linear Regression** is a solid, interpretable baseline (test R² around **0.78**). Coefficients tell a story: smoking dominates.
2. An **unlimited Decision Tree** looks perfect on train (R² ≈ **1.0**) and **worse on test** — classic overfitting. Never report only training accuracy.
3. A **shallow tree (`max_depth=3`)** gets the **best test R² (~0.85)** and lowest test RMSE. It captures the smoker split and a BMI interaction that a purely linear model misses.
4. **Winner for prediction:** Decision Tree with `max_depth=3`.  
   **Winner for explanation of *how much* each factor adds in dollars:** Linear Regression.

**Metrics used:** MAE (typical dollar error), RMSE (penalises large misses), R² (fraction of variance explained). Accuracy / precision / recall are for **classification**, not this task.
"""
)

md(
    """
## 8. One-minute viva script

> I used the Kaggle medical insurance dataset — 1338 people, predict `charges`.  
> I one-hot encoded sex, smoker, region, then did an 80/20 train-test split.  
> Linear Regression assumes a linear additive effect; its largest weight is `smoker_yes` at about +$23.6k.  
> A full Decision Tree overfit: train R² ≈ 1, test R² dropped below Linear Regression.  
> With `max_depth=3` the tree generalises better than Linear Regression because charges are not a straight line — smokers form a separate, higher band.  
> I compared MAE, RMSE, and R² on **held-out test data**.

If they ask “what next?”: log-transform `charges` (they are skewed), add `smoker × bmi` as an explicit feature in Linear Regression, or try Random Forest.
"""
)

nb["cells"] = cells

out = Path(__file__).resolve().parent / "linear_regression_decision_tree.ipynb"
nbf.write(nb, out)
print("wrote", out)
