# 10-pointer semester OS

**Mind:** [[Home]]

Starting CGPA ~5.9. The original goal was **AA in every subject**, floor **SGPA ≥ 9.5**.

## After these midsems (23 Sep 2026)

Live scores: **MNI 4/30**, **ACD 9/30**, **FoML 18/30**. Papers and the arithmetic are in [`semester-plan.md`](semester-plan.md).

The old rule was: one soft subject is survivable, two is not, and DCHD cannot be the soft one. **MNI and ACD are already both soft on the mid.** All-AA is not the plan anymore. The plan is:

- Take every remaining MNI and ACD mark that is still open (lab, TA, endsem).
- Keep FoML’s lab at full marks so 18/30 does not slide into a third soft course.
- Get the EMFT, LA, DCHD, and SnS numbers before moving more hours.

Do not spend the week re-deriving an SGPA from guesses. The next number that changes the calendar is EMFT (mid is 30) or DCHD (5 credits).

---

Original contract, kept below so the math is still here.

## What ≥9.5 actually requires (**28 credits** with FoML)

Core DC load 24 + **CSL2XX Fundamentals of Machine Learning (4, OC, 3-0-2)** ≈ **28**.

| Outcome | Approx SGPA |
|---------|-------------|
| All AA (10) | **10.0** |
| One AB (9) on a 4-cr subject (e.g. FoML), rest AA | ~9.86 |
| One BB (8) on a 4-cr subject, rest AA | ~9.71 |
| One BB (8) on **DCHD 5-cr**, rest AA | ~9.64 |
| Two BBs on 4-cr subjects, rest AA | ~9.43 — **misses 9.5** |

**Rule:** Treat **AB as the emergency floor**. One soft subject is survivable; two is not. **DCHD cannot be the soft subject** (5 credits). FoML lab is **25%** of that course — protect it like DCHD lab.

Relative grading: AA ≈ top band of the class. You are not competing with “pass”; you are competing with serious toppers. That means **perfect internals + top MST + top endsem**, not “understood the vibe.”

## Non-negotiables (every subject)

1. **Never miss class** unless sick — relative grading rewards being in the room when hints drop.
2. **Same-day close:** after each lecture, 45–75 min → rewrite notes + **≥3 problems**.
3. **Tutorials = free marks:** sit in DCHD/EMFT tutorials; redo the sheet that night until clean.
4. **Labs = AA insurance:** full marks / near-full on every lab file, viva, mini-project. DCHD lab is **2 of 5 credits**.
5. **MST-1 and MST-2:** treat like endsem. Past sheets + tutorial bank + timed mock.
6. **Office hours:** if a topic is cloudy for >48h, ask TA/prof with a specific stuck point.
7. **IEM project:** freeze to ≤2–3 hrs/week from 2 weeks before each MST until results; full freeze in endsem week.

## Weekly time budget (10-pointer mode)

Assume ~6–7 hrs classes/labs on heavy days. Outside class:

| Block | Hours/week | Focus |
|-------|------------|--------|
| Same-day closes | 8–12 | All subjects incl. FoML |
| Deep problem blocks | 8–10 | SnS, EMFT, DCHD, ACD rotate |
| Lab polish + HDL/sim | 4–5 | Especially DCHD + ACD |
| Remediation (EE/EDC/Physics) | 2 | Only as needed for ACD/EMFT |
| FoML (CSL2XX) | 3–5 | Theory + lab notebooks + project (lab = 25%) |
| IEM (optional) | 0–3 | Cut first under load |
| **Total outside class** | **~24–32** | This is a full-time semester |

Thu afternoon free block = **SnS deep + weakest theory**, not Netflix.

## Subject AA playbooks

### DCHD (5) — must be AA
- HDL fluent early; every experiment simulated + documented same day.
- Kohavi for FSM/minimization; Mano for HDL/design flow.
- Maintain a **mistake log** (race, Mealy/Moore, timing).
- Be the person who helps others debug in lab (teaches you + visibility).

### SnS (4) — AA + career
- Oppenheim end-of-chapter drills weekly; don’t only watch lectures.
- Own: convolution, FS/FT properties, sampling, Laplace/Z ROC.
- Lab scripts clean + comments; viva-ready explanations.

### EMFT (4) — hardest AA (Physics hole)
- Eval: Mid 30 / End 50 / TA 20. Internals = `(Mid + TA) × A*` — **> 75% attendance or you donate marks**.
- Sadiku problems **daily** (even 2–3 solid ones).
- Tutorial sheet same day, every time.
- Build formula + symmetry cheat sheet by week 4; revise weekly.
- If MST-1 is weak → emergency mode: drop IEM, double EMFT until MST-2.

### ACD (4) — repair after 9/30
- The 2026 paper is the drill: [`notes/midsem-2026.md`](../05-acd/notes/midsem-2026.md). Ideal op-amp (Q1–Q3, Q7, Q8) before BJT operating points (Q6).
- Pre-lab: calculated values + LTspice/Multisim screenshots in notebook. Lab is the credit still fully open.
- GBW and CMRR (Q4, Q5) and the practical integrator (Q9) as closed-book numbers.
- Sunday: 60 min EE/Thevenin patch. The mid confirmed this is required.

### MNI (4) — repair after 4/30
- “Easy AA” is retired. The 2026 paper is the drill: [`notes/midsem-2026.md`](../06-mni/notes/midsem-2026.md).
- First rebuild: voltmeter loading, first-order ramp, limiting error on \(Z\), Wheatstone half/full, Ayrton.
- Quote definitions only after those numericals are clean.
- Mini-project and lab file stay early and complete. That is the mark the mid did not touch.

### Linear Algebra (3) — AA
- Strang + 18.06; prove you can compute **and** interpret.
- Code tiny demos (projection, SVD) for memory.
- Boyd only when syllabus hits optimization — don’t drown early.

### FoML CSLA 204 (OC, 4) — hold after 18/30
- Annexure: Mid **25%** / End **50%** / Lab **25%**. At 18/30 the mid is about 15 of those 25. Lab is the lever that is still entirely open.
- Texts: Mitchell or Alpaydin; Deisenroth MML (free) for math unit; Géron for labs.
- Units: probability/Naive Bayes → supervised basics → ANN/backprop → trees/KNN/k-means → PCA/apps.
- Tiny NumPy impl before sklearn; confusion matrix / precision / recall cold.
- Lab project is the open 25%. Keep it moving; audio/IEM is fine if the course allows it.
- Synergy: use Linear Algebra for ML the same week PCA/least squares appear.

## MST / endsem protocol

**T−14 days:** syllabus map per subject; list weak units.  
**T−7:** only problems + previous papers / tutorial banks.  
**T−2:** formula sheets; sleep.  
**Exam day:** attempt order = high-mark confident questions first.

After each MST: recompute from the real script, not from a remembered total. MNI and ACD are already the calendar priority. FoML stays on maintenance unless the script turns out worse than 18/30.

## Honesty check

All-AA was unlikely with the year-1 holes, and the midsems settled it. MNI 4/30 and ACD 9/30 are two soft 4-credit courses. A perfect endsem does not turn either into an AA if the mid is 30 of the course.

**Operating target:** full labs, then endsem repair on MNI and ACD, hold FoML.  
**Still unacceptable:** DCHD joining them. That is 5 credits.  
**Still get:** EMFT, LA, DCHD, SnS scores onto the table in [`semester-plan.md`](semester-plan.md).
