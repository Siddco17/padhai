# ECL216 DCHD — MST-1 map

**Scope:** Section A `BEFORE MID` notes + tutorials 1–3 only. Official Unit I is combinational minimization (QM ≤ 5 vars, don’t-cares). Lectures so far also built HA/FA, adder–subtractor, comparator, decoder, MUX.

**Local copies:** `resources/` tutorials 1–3; `Morris_Mano_Digital_Design.pdf` / `Mano_Ciletti_Digital_Design_5e.pdf`; `Kohavi_Jha_Switching_and_Finite_Automata_Theory.pdf`; `classmate/NOTES/SECTION A/DCHD (BEFORE MID).pdf` (77-page scan = MST bible); `classmate/PYQS/`.

**Success:** (1) any base conversion including fractions and base-5 without notes, (2) K-map a 4-var SOP with don’t-cares and NAND it, (3) one 5-var QM to prime implicants, (4) draw 4-bit adder–subtractor and an 8:1 MUX leftover-variable implementation.

## Hours

| Block | Hours | Job |
|-------|-------|-----|
| 0 | 1.0 | Number systems, grouping oct/hex, 1’s/2’s complement, BCD / Gray |
| 1 | 1.5 | Gates, Boolean laws, SOP↔POS, NAND/NOR two-level; Tutorial 2 |
| 2 | 2.0 | 2–4 variable K-maps + don’t-cares; Tutorial 3 by hand |
| 3 | 1.5 | Quine–McCluskey ≤ 5 vars (syllabus Unit I; **S24 Q1 = 8 marks**) |
| 4 | 2.0 | HA/FA/FS, adder–subtractor, comparator, decoder, MUX trees + leftover variable |
| 5 | 1.0 | Timed S24 + S25; sequential one-pager only if that finishes early |
| **If 8 h** | | Cut Block 5. Still do S24 Q1 and one MUX leftover in Block 4. |
| **If 10 h** | | Keep Block 5; add overlapping `1101` Moore vs Mealy (DCMP endsem Q2, not mid). |

Tutorials **must be redone by hand** the same sitting — that is the 5-credit insurance.

## Topic × resource × paper

| Topic | Read | Drill |
|-------|------|-------|
| Binary / oct / hex / dec / base-5, fractions | BEFORE MID pp.1–10; Mano ch.1 | **Tutorial 1** Set 1 (a,f) of each family + all 5 word problems |
| 1’s / 2’s complement subtract | BEFORE MID pp.43–46; Mano §1.5–1.6 | **S25 Q1a**; 7−3 as in notes; DCMP Q1a \((-358)_{10}\) |
| BCD add, Gray, Excess-3 | Mano §1.7 (notes barely cover codes) | **S25 Q1b–d**; DCMP Q1b–c |
| Gates + DeMorgan + axioms | BEFORE MID pp.10–16 | Recite NAND/NOR/XOR/XNOR tables |
| Boolean laws, consensus, absorption | BEFORE MID pp.14–15, 19 | **Tutorial 2b** 2-var 1–3; **S24 Q4d** |
| Canonical SOP, truth table | BEFORE MID pp.17–18; Tutorial 2a | Tutorial 2a: 2-var #1, 3-var #2, 4-var #4 |
| K-map 2/3/4, wrap, overlap | BEFORE MID pp.20–28; Mano §3.2–3.5 | **Tutorial 3a** 3-var #5, #9; 4-var #19, #24 |
| Don’t-cares | same; Mano §3.5 | T3 3-var #5; T3 word #1–3; BEFORE MID pp.70–73 MUX \(d\) |
| NAND-NAND / NOR-NOR | BEFORE MID p.58; Mano §3.6 | **S24 Q2a**; **S25 Q2a**; DCMP Q2 NAND locker |
| Tabular QM, PI chart, uniqueness | Mano (gate-level min.; Kohavi tabular) — **not** in BEFORE MID but **Unit I + S24** | **S24 Q1** (5-var + \(d\)) |
| HA / FA / HS / FS | BEFORE MID pp.29–37 | Recite the four equation pairs; FA from two HA |
| Ripple adder, 4-bit add/sub \(M\) | BEFORE MID pp.40–48; Mano §4.5 | **S24 Q4a**; notes HW 8-bit |
| 2-bit comparator | BEFORE MID pp.49–50; Mano §4.8 | \(L,E,G\) equations from the notes |
| Decoder \(n\to2^n\) + enable | BEFORE MID pp.52–56; Mano §4.9 | **S24 Q3** 3-to-8 + squarer; Excess-3→BCD is a decoder |
| MUX \(2^m:1\), trees, leftover var | BEFORE MID pp.60–77; Mano §4.11 | **S25 Q2b** (2nd LSB = data); notes pp.72–73 8:1; tree 16:1 from 4:1 |
| Word → minterms → K-map | BEFORE MID p.38; Tutorial 3b | T3 irrigation / parking / alert; **S24 Q2** soldiers; **S25 Q3** RPSF |
| Odd parity, 7-seg \(e\) | not in BEFORE MID; PYQ only | **S24 Q4b–c** after Block 4 if time |
| SR / JK / T excitation, Moore/Mealy, overlapping, race-free | Mano ch.5–6; DCMP endsem Q2 | **Skip grinding.** Formula sheet only unless Block 5 has 40 min left. DCMP **mid** Q4–Q5 (shift + lock counter) only then. |

## PYQ files

- `classmate/PYQS/MS S25 ECL207.pdf` — 1.5 h, 30 marks (EEE Digital Circuits). Combinational: 2’s complement, BCD, hex, Excess-3→BCD, NAND/NOR, leftover MUX, RPSF word design.
- `classmate/PYQS/MS S24 ECL207.pdf` — 1.5 h, 25 marks. **Q1 QM 5-var (8 marks)**; soldiers Boolean; decoder+squarer; adder–sub / 7-seg / parity / algebra.
- `classmate/PYQS/DCMP.pdf` — ECL203. **Page 1 = mid 2022 (30, 1.5 h):** conversions, NAND locker, decoder+MUX figure, shift register, lock counter. **Page 2 = endsem — skip** except the `1101` non-overlap FSM if Block 5 is extra.

Course-code drift: tutorials say **ECLA201**, current paper will say **ECL216**. PYQs are sibling papers; combinational overlap is the point, 8085 is not.

## SKIP (not in BEFORE MID, not in T1–T3)

- FPGA, HDL, CAD, netlists, STA, placement (Units III–IV).
- PLA / PAL / ROM / SRAM, bus, bit-counting processor (Units III, V–VI).
- Async hazards, fault models (Unit VI).
- Full FSM / ASM / shift-register controller **unless** a lecture after these notes added them — then only Moore vs Mealy + one overlapping detector, not Kohavi chapters.
- Do not spend MST hours on Mano ch.9 FPGA labs.

## Exam-day order

1. Any conversion / 2’s complement / BCD (you will finish these).
2. K-map or QM with don’t-cares (high marks; write the PI chart even if arithmetic is ugly).
3. MSI design: adder–subtractor, decoder, leftover MUX (draw, label \(M\) / enable / select).
4. Word-to-Boolean last if the clock dies — minterm list + one valid grouping still scores.
