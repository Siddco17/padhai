# Fundamentals of Machine Learning

**Hub:** [[FoML]] · [[FoML Lab]]

- **Code:** CSLA 204 (paper header). Vault had been using CSL2XX until the mid confirmed the code.
- **Credits:** **4** `(3-0-2)` → theory **3** + lab **1**
- **Type:** **OC** (Open Course) on annexure — counts in your elective/OC slot
- **Pre-req:** CSL101 Computer Programming (you already have programming strength)
- **Pairs with:** ECL3xx Linear Algebra for ML
- **Evaluation:** Mid-sem **25%** · End-sem **50%** · Lab **25%**
- **Syllabus:** `notes/syllabus.md` (from Annexure III); original docx in `resources/` (local)

## Books (from annexure)

**Text**
1. Tom M. Mitchell — *Machine Learning*
2. Ethem Alpaydin — *Introduction to Machine Learning*
3. K.S. Trivedi — *Probability and Statistics…* (for the probability unit)
4. Christopher Bishop — *PRML* (heavy — use selectively)

**Reference / practical**
- Deisenroth, Faisal, Ong — *Mathematics for Machine Learning* ([free official PDF](https://mml-book.github.io/))
- Aurélien Géron — *Hands-On ML* (labs / sklearn)
- NPTEL: Sudeshna Sarkar — Introduction to Machine Learning (IIT KGP)
- Goodfellow et al. — *Deep Learning* (only if ANN unit goes deep)

**Fetch first:** Mitchell **or** Alpaydin + Deisenroth (free) + Géron for lab.

## Syllabus map (≈14 weeks)

| Block | Weeks | Focus |
|-------|-------|--------|
| Math for ML | 3 | Probability, Bayes, MLE/MoM, Naive Bayes, metrics |
| Intro to ML | 2 | Paradigms, train/val/test, class/reg/cluster |
| Basics | 2 | Linear classifiers/regression, loss, overfitting |
| Neural nets | 3 | Perceptron, backprop, MLP, regularization |
| Selected algos | 2 | Decision trees, KNN, k-means, hierarchical |
| Eng. applications | 2 | Features, PCA, domain case studies |

## Lab (25% — AA insurance)
Indicative experiments:
1. Bayesian learning; linear regression + NNs; decision trees; k-means
2. Compare models/metrics on datasets
3. **Real-life course project**

Same-day lab notes + GitHub notebook hygiene. Project topic: can lean audio/IEM later if allowed.

## AA tips
- Lab + mid (50% combined before endsem) — never coast on “I’ll crush endsem”
- Re-derive Naive Bayes / linear regression / backprop once by hand
- Tiny NumPy implementations before high-level sklearn/keras
- Confusion matrix / precision / recall cold for exams
- Use LA course for PCA / least squares intuition the same week they appear

## Current focus
- **Mid: 18/30** (printed paper is 25; confirm if the script is 18/25). Paper: [`notes/midsem-2026.md`](notes/midsem-2026.md).
- Hold, don’t restart the crash course. Lab is 25% and still fully open. One weekly pass on the 2026 paper: trees, least squares, logistic, Bayes.

## Log
| Date | What I did | Next |
|------|------------|------|
| 2026-09-02 | Wrote MST-1 map from annexure (NB + linreg) | superseded by professor list |
| 2026-09-03 | Filed logistic PPTX + tree PDFs; rewrote map/formulas; added Blocks LA/5/6 | Sit trees (IG + RSS) then logistic sigmoid/BCE; 2×2 eigen |
| 2026-09-03 | Professor list confirmed in chat; classmate Python = lab, p-values = extra | Next sitting: Block LA + Block 5 (trees). Map now matches professor. |
| 2026-09-03 | 14 h to paper, zero prior. Map now has emergency clock. | Sitting 1: linreg four-point + derive \(a_0,a_1\). Then trees. |
| 2026-09-03 | Folder simplified; map/formulas = 6 files; GD/Gini/t-stat in | Sit 1 you-try (5-point + salary GD). Then Sit 2 trees. |
| 2026-09-23 | Filed September 2026 mid. Score **18/30**. Code on the paper is CSLA 204 | Keep the lab full; one endsem pass on `notes/midsem-2026.md` |
