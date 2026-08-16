# ACD 16 Aug — prereqs + closed-loop configs

Sunday patch. Gayakwad ch.2–3 style, not full EDC. Skip hybrid-π, diodes/clippers, integrator.

## Circuit laws ACD actually uses

**KCL:** current into a node = 0. Op-amp inputs take **no** current (ideal).

**KVL:** voltages around a loop sum to 0.

**Voltage divider** (series `Rs` then `RL` to ground, source `Vs`):

\[
V_o = \frac{R_L}{R_L + R_s}\, V_s
\]

Same formula as loading: if `RL ≪ Rs`, almost all of `Vs` is dropped on `Rs`.

**Thevenin:** any linear source network, from the load’s two terminals, is `Vth` in series with `Rth`.

- `Vth` = open-circuit voltage at those terminals (load removed)
- `Rth` = resistance seen into those terminals with independent sources killed (voltage sources short, current sources open)
- Then `V_L = R_L / (R_L + R_{th}) · V_{th}`

**Norton dual:** `In = Vth / Rth` in parallel with `Rth`. Same `Rth`.

## Gain, Zin, Zout (why a buffer works)

| Word | Meaning | 741 typical | Ideal |
|------|---------|-------------|--------|
| Open-loop gain `AOL` | `Vo / (Vp − Vn)` with no feedback | `2×10^5` | `∞` |
| `Zin` | resistance the source sees looking into the op-amp | `~2 MΩ` | `∞` |
| `Zout` | resistance the load sees looking back into the output | `~75 Ω` | `0` |
| CMRR | `Ad / Acm` | `90 dB` | `∞` |
| Slew rate | max `dVo/dt` | `0.5 V/µs` | `∞` |
| Bandwidth | useful frequency range | `~1 MHz` (unity-gain) | `∞` |

High `Zin` → source is not loaded. Low `Zout` → load does not collapse `Vo`. That pair **is** a buffer.

## 741 guts in one line (no hybrid-π)

DIBO input stage → intermediate gain → level shift → output stage. Dual supply `±VCC` on pins 7 and 4; signal in on 2 (−) and 3 (+); out on 6. BJT inside = current-controlled current source. Diode later = switch for clippers. Not needed for today’s configs.

## Golden rules (linear region only)

1. `Ip = In = 0`
2. `Vp = Vn`  (virtual short). If `Vp = 0`, pin 2 is **virtual ground**.

If the output hits the rails, the op-amp is **saturated** — rule 2 is off.

## Four configs (derive from the rules, then freeze)

**Follower** — `Vin` on (+), output wired to (−):

\[
V_o = V_{in}
\]

Fixes loading: source sees `~MΩ`, load sees `~75 Ω`.

**Inverting** — (+) grounded, `R1` into (−), `Rf` from out to (−):

\[
\frac{V_o}{V_{in}} = -\frac{R_f}{R_1}
\]

Lab exp 1. Gain in dB: `20 log |Vo/Vin|`.

**Non-inverting** — `Vin` on (+), divider `Rf`/`R1` on (−):

\[
\frac{V_o}{V_{in}} = 1 + \frac{R_f}{R_1}
\]

Lab exp 2. Same `Rf`, `R1` as a −10 inverter gives **+11** here.

**Difference (matched)** — `V1` through `R1` into (−) with `Rf` feedback; `V2` through `R2` into (+) with `R3` to ground. Set `Rf/R1 = R3/R2 = α`:

\[
V_o = \alpha (V_2 - V_1)
\]

## Instrumentation amp (formula only)

Three op-amps. Gain set by one resistor `RG`:

\[
V_o = \frac{R_2}{R_1}\left(1 + \frac{2R_f}{R_G}\right)(V_2 - V_1)
\]

Polish before using it in a design, not today.

## Friday lab 1 (pre-computed)

`R1 = 1 kΩ`, `Rf = 10 kΩ`, `Vin = 0.5 V` peak, `±15 V` supplies.

- `Af = −10`
- `Vo = −5 V` peak (safe headroom)
- `|G|_{dB} = 20 dB` in the midband; expect roll-off as you sweep 1 kHz → 100 kHz
