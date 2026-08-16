# Analog Circuit Design

- **Code:** ECL308
- **Credits:** 3 of 4
- **Type:** Theory
- **Books / primary refs:** Gaikwad; Sedra/Smith selective; Roy Choudhary
- **Prerequisite risk:** EDC + EE barely passed → patch KVL/Thevenin/op-amp loading before each new ACD topic (`../_meta/remediation.md`)

## This session is for
- Lecture notes → `notes/`
- Problem sets / tutorials → `problems/` (or `tutorial/`)
- PDFs / links → `resources/`
- Labs → `experiments/`, `reports/`, code as relevant

## Current focus
- [x] Closed-loop configs: follower, inverting, non-inverting, matched difference (16 Aug)
- [ ] Instrumentation amp polish (formula in notes; re-derive only if a problem needs it)
- [ ] Friday lab 1: inverting — measure vs `Af = −Rf/R1`, then `20 log |G|` vs frequency
- [ ] Open: lab 2 non-inverting with the same `1 k / 10 k` pair (gain +11)

## Log
| Date | What I did | Next |
|------|------------|------|
| 2026-08-16 | Sunday prereq patch (KVL/divider, Thevenin, Zin/Zout) + golden rules through four configs. Notes: `notes/2026-08-16-prereqs-and-configs.md`. Drills: `problems/2026-08-16.md`. Lab 1 pick: `R1=1k`, `Rf=10k`, `Vin=0.5 V` peak → `Af=−10`, `Vo=−5 V`. | Before Friday 14:00: redraw lab 1, confirm pin 2/3/4/6/7, optional Multisim/LTspice of the −10 inverter. In-amp only if a lecture problem shows up. |
