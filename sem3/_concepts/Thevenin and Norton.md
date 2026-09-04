---
tags: [concept, prereq, course/acd, course/mni]
aliases: [Thevenin, Norton, Thevenin's theorem]
---

# Thevenin and Norton

Any linear two-terminal network ≡ **Vth in series with Rth** (Thevenin) or **In in parallel with Rn** (Norton), with `Vth = In Rth` and `Rth = Rn`.

## Why it matters here

Op-amp analysis uses this constantly: source + Rs seen by the [[Ideal op-amp]]. [[Loading effect]] in [[MNI]] *is* Thevenin of source vs load. Highest-urgency EE patch in [[sem3/_meta/remediation|remediation]].

## Exam form

1. Find open-circuit voltage = Vth.
2. Dead sources, find equivalent R = Rth (dependent sources: test v/i).
3. Reattach load. Voltage at load = `Vth · RL / (Rth + RL)`.

## See also

- [[KVL and KCL]] · [[Voltage divider]] · [[Loading effect]] · [[Inverting and non-inverting]]
