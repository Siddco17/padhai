---
tags: [concept, course/foml]
aliases: [tree, CART]
---

# Decision trees

Split on the feature that maximises [[Entropy and information gain]] (Kurhekar: entropy, not Gini unless asked). Recurse. Stop: pure leaf, max depth, min samples.

## Why it matters here

Lab + class examples already posted. MST-1: one split on a tiny table. Play/go-out: root **Weather** (Cloudy → Yes; Sunny → Humidity; Rainy → Wind).

## Trap

Train accuracy 100% on n=10 means nothing — [[Overfitting]].

## See also

- [[Entropy and information gain]] · [[Confusion matrix]] · [[FoML Lab]]
