/* globals D, Y, notes, loc, L, links */
window.SUBJECTS.push(
  {
    id: "emft", short: "E", code: "ECL305", title: "EMFT",
    blurb: "Vectors through reflection",
    links: [
      { label: "Sadiku on Drive", href: D.sadiku },
      { label: "Sadiku on this Mac", href: loc("sem3/04-emft/resources/books/Sadiku_Elements_of_Electromagnetics.pdf") },
      { label: "Formula sheet", href: notes.emft },
      { label: "Divergence and curl", href: Y.divcurl }
    ],
    sheet: [
      "Dot is |A||B| cos θ. Cross is |A||B| sin θ, right-hand n. Volume is |A·(B×C)|.",
      "Cylindrical: x = ρ cos φ, y = ρ sin φ. dv = ρ dρ dφ dz.",
      "Spherical: x = r sinθ cosφ, y = r sinθ sinφ, z = r cosθ. dv = r² sinθ dr dθ dφ.",
      "∇ of a vector, ∇· of a scalar, ∇× of a scalar are not defined.",
      "E = −∇V. Divergence is outward flux per volume. Curl is circulation per area.",
      "Point charge: E = (1/(4πε)) Q/r² ar. Gauss: flux = Qenc/ε.",
      "1/(4πε0) = 9×10^9. ε0 = 10^−9/(36π).",
      "Ampere: ∮ H·dl = Ienc. Biot–Savart for a short wire: dH = I dl × aR / (4π R²).",
      "Maxwell adds ∂D/∂t to Ampere and −∂B/∂t to Faraday.",
      "Free space η = 377 Ω approximately, about 120π. Plane wave: E, H, and the direction of travel are mutually perpendicular.",
      "Normal incidence Γ = (η2−η1)/(η2+η1). Matched media, Γ = 0."
    ],
    lessons: [
      L({ id: 1, title: "Vectors", minutes: 20, fig: "proj",
        read: "Dot, cross, and the magnitude. A field is a value at every point, not one arrow.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "Sadiku on this Mac", href: loc("sem3/04-emft/resources/books/Sadiku_Elements_of_Electromagnetics.pdf") },
          { label: "Formula sheet", href: notes.emft },
          { label: "3Blue1Brown div and curl", href: Y.divcurl }
        ),
        seeTitle: "Work is dot. Area is cross.",
        see: "<p class='eq'>A·B = |A||B| cos θ &nbsp;&nbsp; |A×B| = |A||B| sin θ</p><p>Perpendicular vectors have dot 0. Parallel vectors have cross 0. Component of A along an axis is the scalar. The vector piece is that scalar times the unit vector.</p>",
        figCap: "Projection of A on B is (A·Bhat) Bhat.",
        source: "EMFT formula sheet, Block 0",
        quiz: [
          { q: "Perpendicular vectors have", choices: ["Dot 0", "Cross 0", "Equal magnitude", "Dot 1"], answer: 0, why: "cos 90° = 0. Cross is maximum." },
          { q: "A field assigns a value", choices: ["At one origin only", "At every point", "Only on the axes", "Only to scalars"], answer: 1, why: "E(2,0,0) is one arrow. E(x,y,z) is the field." },
          { q: "∇ of a vector is", choices: ["Divergence", "Not defined", "The curl", "The magnitude"], answer: 1, why: "∇· is for vectors. ∇ is for scalars." },
          { q: "Volume of a parallelepiped is", choices: ["|A·(B×C)|", "A+B+C", "|A×B| only", "A·B"], answer: 0, why: "Scalar triple product." }
        ],
        numerical: { prompt: "A = 3 ax + 4 ay. Magnitude.", fields: [{ key: "m", label: "|A|", target: 5, tol: 0 }], solution: "sqrt(9+16) = 5. Unit vector is (3/5, 4/5, 0)." }
      }),
      L({ id: 2, title: "Coordinates", minutes: 20, fig: "gauss",
        read: "Convert at a point. Do not mix aρ with ax in one expression. Watch the volume elements.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "Formula sheet", href: notes.emft }
        ),
        seeTitle: "The volume element carries the scale",
        see: "<p class='eq'>dv_cyl = ρ dρ dφ dz &nbsp;&nbsp; dv_sph = r² sinθ dr dθ dφ</p><p>θ runs 0 to π. φ runs 0 to 2π. φ from a point needs the quadrant, not a blind arctan.</p>",
        figCap: "Spherical r is distance from the origin. θ is down from z.",
        source: "EMFT formula sheet, coordinate table",
        quiz: [
          { q: "Cylindrical ρ of (3, 4, 0) is", choices: ["7", "5", "1", "12"], answer: 1, why: "sqrt(9+16) = 5. z stays 0." },
          { q: "Spherical θ ranges", choices: ["0 to 2π", "0 to π", "−π to π", "All reals"], answer: 1, why: "φ is the one that goes full circle." },
          { q: "Cylindrical volume element has a factor", choices: ["ρ", "r²", "1", "sinφ only"], answer: 0, why: "The arc is ρ dφ." },
          { q: "ax · aρ equals", choices: ["sin φ", "cos φ", "0", "1"], answer: 1, why: "ay · aρ = sin φ. az · aρ = 0." }
        ],
        numerical: { prompt: "Point (3, 4, 0). Cylindrical ρ.", fields: [{ key: "r", label: "ρ", target: 5, tol: 0 }], solution: "ρ = 5, φ = tan⁻¹(4/3) in quadrant 1, z = 0." }
      }),
      L({ id: 3, title: "Grad, div, curl", minutes: 25, fig: "wave",
        read: "Gradient points uphill. Divergence is source. Curl is circulation. Watch which one eats a scalar.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "3Blue1Brown", href: Y.divcurl },
          { label: "Formula sheet", href: notes.emft }
        ),
        seeTitle: "Three operators, three pictures",
        see: "<p class='eq'>∇V = ∂V/∂x ax + ∂V/∂y ay + ∂V/∂z az</p><p class='eq'>∇·A = ∂Ax/∂x + ∂Ay/∂y + ∂Az/∂z</p><p>E = −∇V. Divergence theorem turns a volume integral of div into a closed surface flux. Stokes turns a surface integral of curl into a closed line integral.</p>",
        figCap: "Gradient is the steepest increase of a scalar.",
        source: "EMFT formula sheet, grad/div/curl section",
        quiz: [
          { q: "Gradient eats a", choices: ["Vector", "Scalar", "Both", "Nothing"], answer: 1, why: "It returns a vector." },
          { q: "Divergence of a source-free field is", choices: ["1", "0", "The curl", "Undefined"], answer: 1, why: "No charge, no magnetic monopole: div D and div B have the Maxwell statements." },
          { q: "E from potential is", choices: ["∇V", "−∇V", "∇·V", "∇×V"], answer: 1, why: "Field points downhill." },
          { q: "Stokes relates curl to", choices: ["A closed line", "A volume only", "A single point", "Charge"], answer: 0, why: "Circulation around the boundary." }
        ],
        numerical: { prompt: "A = x ax. Cartesian divergence.", fields: [{ key: "d", label: "div A", target: 1, tol: 0 }], solution: "∂Ax/∂x = 1. The other components are 0." }
      }),
      L({ id: 4, title: "Coulomb and Gauss", minutes: 25, fig: "gauss",
        read: "Point-charge field, then Gauss when symmetry makes E constant on a surface.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "Sadiku on this Mac", href: loc("sem3/04-emft/resources/books/Sadiku_Elements_of_Electromagnetics.pdf") },
          { label: "Concept note", href: loc("sem3/_concepts/Coulomb and Gauss.md") }
        ),
        seeTitle: "Flux cares about enclosed charge",
        see: "<p class='eq'>E = (1/(4πε)) Q / r² ar &nbsp;&nbsp; ∮ D·dS = Qenc</p><p>1/(4πε0) = 9×10^9. Outside a spherical shell, the field matches a point charge. Inside a uniform shell, E = 0. Gauss is useless without symmetry.</p>",
        figCap: "The sphere is a tool. The charge inside is the answer.",
        source: "EMFT formula sheet constants, Coulomb and Gauss concept",
        quiz: [
          { q: "Gauss gives flux equal to", choices: ["Qenc/ε", "All nearby charge, enclosed or not", "E times area always, even with no symmetry", "Zero inside every object"], answer: 0, why: "Only enclosed free charge, in the D form." },
          { q: "Inside a uniformly charged spherical shell, E is", choices: ["Same as outside", "0", "Infinite", "Radial and rising"], answer: 1, why: "No enclosed charge." },
          { q: "1/(4πε0) is", choices: ["9×10^9", "8.85×10^−12", "377", "4π"], answer: 0, why: "ε0 itself is about 8.85×10^−12." },
          { q: "Use Gauss when", choices: ["There is no symmetry", "E is constant on a chosen surface", "The charge is a dipole only", "You want the potential first"], answer: 1, why: "Otherwise the integral does not collapse." }
        ],
        numerical: { prompt: "Point charge 1 μC, r = 1 m, free space. |E| in V/m. Use 9×10^9.", fields: [{ key: "e", label: "|E|", target: 9000, tol: 1 }], solution: "E = 9e9 × 1e−6 / 1² = 9000 V/m." }
      }),
      L({ id: 5, title: "Biot–Savart and Ampere", minutes: 20, fig: "wave",
        read: "A steady current makes B. Ampere is the closed line. Biot–Savart is the little piece of wire.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "Concept note", href: loc("sem3/_concepts/Biot-Savart and Ampere.md") }
        ),
        seeTitle: "Enclose the current",
        see: "<p class='eq'>∮ H·dl = Ienc &nbsp;&nbsp; dH = I dl × aR / (4π R²)</p><p>Infinite straight wire: H = I/(2πρ) aφ. A solenoid inside is n I along the axis, and about 0 outside if it is tightly wound and long.</p>",
        figCap: "Right-hand fingers follow aφ. Thumb is the current.",
        source: "Biot-Savart and Ampere concept, Sadiku magnetostatics",
        quiz: [
          { q: "Ampere’s law uses", choices: ["A closed line", "Only a point", "Voltage", "A Gaussian volume of charge"], answer: 0, why: "The current through the surface bounded by that line." },
          { q: "H of a long wire falls as", choices: ["1/ρ", "1/ρ²", "ρ", "Constant"], answer: 0, why: "I/(2πρ)." },
          { q: "Inside a long solenoid, H is", choices: ["Zero", "n I along the axis", "The same as a wire", "Radial"], answer: 1, why: "n is turns per length." },
          { q: "Biot–Savart uses", choices: ["dl × aR", "A scalar voltage", "Only enclosed charge", "∇V"], answer: 0, why: "Direction from the cross product." }
        ],
        numerical: { prompt: "Long wire, I = 2π A, ρ = 1 m. |H| in A/m.", fields: [{ key: "h", label: "|H|", target: 1, tol: 0.01 }], solution: "H = I/(2πρ) = 2π/(2π·1) = 1 A/m." }
      }),
      L({ id: 6, title: "Maxwell", minutes: 15, fig: "wave",
        read: "Two of the four equations are the static laws with an extra term. Name the extra terms.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "Concept note", href: loc("sem3/_concepts/Maxwell equations.md") }
        ),
        seeTitle: "Displacement current and a changing B",
        see: "<p>Gauss for D: div D = ρv. Gauss for B: div B = 0. Faraday: curl E = −∂B/∂t. Ampere–Maxwell: curl H = J + ∂D/∂t.</p><p>The displacement term lets a wave exist in empty space, where J = 0.</p>",
        figCap: "A changing electric field is a current in Ampere’s law.",
        source: "Maxwell concept, EMFT unit on time-varying fields",
        quiz: [
          { q: "div B is", choices: ["ρ", "0", "J", "∂D/∂t"], answer: 1, why: "No magnetic monopoles." },
          { q: "Faraday’s extra physics is", choices: ["∂D/∂t", "−∂B/∂t", "ρv", "A steady current"], answer: 1, why: "Changing B makes E." },
          { q: "Displacement current is", choices: ["∂D/∂t", "A conduction current only", "div B", "The Poynting vector"], answer: 0, why: "It sits next to J." },
          { q: "A wave in empty space needs", choices: ["Only Coulomb", "The two curl equations with the time terms", "A wire", "div B = ρ"], answer: 1, why: "They feed each other." }
        ],
        numerical: null
      }),
      L({ id: 7, title: "Waves and reflection", minutes: 25, fig: "wave",
        read: "A uniform plane wave, intrinsic impedance, and normal-incidence reflection.",
        links: links(
          { label: "Sadiku on Drive", href: D.sadiku },
          { label: "Poynting note", href: loc("sem3/_concepts/Poynting theorem.md") },
          { label: "Reflection note", href: loc("sem3/_concepts/Reflection of EM waves.md") }
        ),
        seeTitle: "E, H, and the direction of travel",
        see: "<p class='eq'>η = |E|/|H| &nbsp;&nbsp; η0 ≈ 120π ≈ 377 Ω</p><p class='eq'>Γ = (η2 − η1)/(η2 + η1)</p><p>Power flux is E × H, the Poynting vector. Matched impedances, no reflection. A perfect conductor as the second medium reflects with a sign flip on E.</p>",
        figCap: "Travel is perpendicular to both E and H.",
        source: "Uniform plane waves and reflection concepts, Sadiku wave chapters",
        quiz: [
          { q: "Free-space η is about", choices: ["50 Ω", "377 Ω", "0", "9×10^9"], answer: 1, why: "120π." },
          { q: "η2 = η1 means Γ is", choices: ["1", "−1", "0", "∞"], answer: 2, why: "No reflection." },
          { q: "Poynting vector points", choices: ["Along E", "Along the direction of power travel", "Along H only", "Back to the source always"], answer: 1, why: "E × H." },
          { q: "E, H, and the travel direction are", choices: ["Parallel", "Mutually perpendicular", "All vertical", "Undefined in free space"], answer: 1, why: "That is a uniform plane wave." }
        ],
        numerical: { prompt: "η1 = η2. Reflection coefficient Γ.", fields: [{ key: "g", label: "Γ", target: 0, tol: 0 }], solution: "(η−η)/(η+η) = 0. All the wave is transmitted." }
      })
    ]
  },
  {
    id: "acd", short: "A", code: "ECL308", title: "ACD",
    blurb: "Op-amps through the 555",
    links: [
      { label: "Gaikwad on Drive", href: D.gaikwad },
      { label: "Gaikwad on this Mac", href: loc("sem3/05-acd/resources/books/Gaikwad_Op_Amp.pdf") },
      { label: "Formula sheet", href: notes.acd },
      { label: "Neso playlists", href: Y.neso }
    ],
    sheet: [
      "Inverting: −RF/R1, virtual ground. Non-inverting: 1+RF/R1, virtual short, no virtual ground.",
      "Summer: vo = −RF Σ vk/Rk. Difference, matched ratios: α(v2−v1). Follower: vo = vi.",
      "IA: (R2/R1)(1+2Rf/RG)(v2−v1).",
      "Integrator: −(1/RC)∫vi dt. Square in, triangle out. Rf across C for DC.",
      "Differentiator: −RC dvi/dt. Gain rises with ω. Series R with C limits noise.",
      "GBW = G · f3dB. CMRR = Ad/Acm. 100 dB = 10^5.",
      "Tail: IT = (|VEE|−0.7)/RE, each IE = IT/2. re = VT/IE.",
      "Schmitt: VUT = +Vsat R1/(R1+R2), VLT = −VUT.",
      "First-order cutoff f = 1/(2πRC). 555 astable f ≈ 1.44/((RA+2RB)C)."
    ],
    lessons: [
      L({ id: 1, title: "Inverting and non-inverting", minutes: 20, fig: "opamp",
        read: "Draw both. Say which one has a virtual ground.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Gaikwad on this Mac", href: loc("sem3/05-acd/resources/books/Gaikwad_Op_Amp.pdf") },
          { label: "Formula sheet", href: notes.acd }
        ),
        seeTitle: "Two gains",
        see: "<p class='eq'>vo = −(RF/R1) vi &nbsp;&nbsp; vo = (1+RF/R1) vi</p><p>Ideal rules: input currents 0, v+ = v− while feedback holds the output off the rail.</p>",
        figCap: "Left: v− is 0. Right: v− is vi.",
        source: "ACD formula sheet Unit II and III",
        quiz: [
          { q: "Virtual ground is", choices: ["Inverting only", "Non-inverting only", "Both", "Open loop"], answer: 0, why: "The + pin is grounded." },
          { q: "Non-inverting gain is", choices: ["−RF/R1", "1+RF/R1", "RF", "0"], answer: 1, why: "Always at least 1 with this divider." },
          { q: "Inverting Rin is", choices: ["Infinite", "R1", "RF", "0"], answer: 1, why: "Into the virtual ground." },
          { q: "v+ = v− requires", choices: ["Positive feedback in saturation", "Negative feedback in the linear region", "No feedback", "A comparator"], answer: 1, why: "On the rail the short is gone." }
        ],
        numerical: { prompt: "Non-inverting. R1 = 10 kΩ, RF = 40 kΩ. Gain.", fields: [{ key: "g", label: "Gain", target: 5, tol: 0.01 }], solution: "1 + 40/10 = 5." }
      }),
      L({ id: 2, title: "Summer, difference, IA", minutes: 20, fig: "opamp",
        read: "Matched ratios or common-mode leaks. The IA sets gain with one resistor.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Formula sheet", href: notes.acd },
          { label: "Neso playlists", href: Y.neso }
        ),
        seeTitle: "One virtual ground, several sources",
        see: "<p class='eq'>vo = −RF (v1/R1 + v2/R2)</p><p class='eq'>vo = (R2/R1)(1 + 2 Rf/RG)(v2 − v1)</p><p>A single difference amp does not give equal input resistance on both sides. The three-op-amp IA does.</p>",
        figCap: "Follower is the buffer: gain 1, huge Rin, tiny Rout.",
        source: "ACD formula sheet, instrumentation row",
        quiz: [
          { q: "Unmatched difference-amp ratios", choices: ["Raise CMRR", "Let a common voltage through", "Make it an integrator", "Set RG"], answer: 1, why: "Match RF/R1 to the + side ratio." },
          { q: "IA gain is tuned by", choices: ["Both input resistors differently", "One RG", "The supplies", "A capacitor"], answer: 1, why: "The first stage is 1+2Rf/RG." },
          { q: "A follower has gain", choices: ["0", "1", "−1", "Infinite"], answer: 1, why: "βf = 1, widest bandwidth." },
          { q: "Summer inputs are isolated by", choices: ["A transformer", "The virtual ground", "RG", "Positive feedback"], answer: 1, why: "Each source sees only its own resistor." }
        ],
        numerical: { prompt: "RF = 10 kΩ, R1 = 10 kΩ, R2 = 5 kΩ, v1 = 1 V, v2 = 0.5 V. Summer vo.", fields: [{ key: "v", label: "vo (V)", target: -2, tol: 0.02 }], solution: "−10k (1/10k + 0.5/5k) = −(1+1) = −2 V." }
      }),
      L({ id: 3, title: "Integrator and differentiator", minutes: 20, fig: "pulse",
        read: "Square, triangle, spikes. Why each practical resistor exists.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Integrator note", href: loc("sem3/_concepts/Integrator.md") },
          { label: "Neso playlists", href: Y.neso }
        ),
        seeTitle: "Swap R and C",
        see: "<p class='eq'>vo = −(1/RC) ∫ vi dt &nbsp;&nbsp; vo = −RC dvi/dt</p><p>Square in: triangle out of the integrator, spikes out of the differentiator. Rf across C stops the offset ramp. A small R in series with C stops the differentiator amplifying hiss.</p>",
        figCap: "Ideal differentiator gain is ωRC, so it rises with frequency.",
        source: "ACD formula sheet, integrator concept",
        quiz: [
          { q: "Square into integrator", choices: ["Triangle", "Spikes", "Sine", "Zero"], answer: 0, why: "Ramp while the input is constant." },
          { q: "Square into differentiator", choices: ["Triangle", "Spikes", "The same square", "A ramp"], answer: 1, why: "Derivative of a step is an impulse." },
          { q: "Rf across C", choices: ["Makes DC gain finite", "Is required for the ideal differentiator", "Removes the capacitor", "Sets CMRR"], answer: 0, why: "DC gain becomes −RF/R." },
          { q: "Differentiator noise fix is", choices: ["A huge capacitor", "A small series R with C", "Positive feedback", "Removing R"], answer: 1, why: "That stops the gain rising forever." }
        ],
        numerical: null
      }),
      L({ id: 4, title: "Filters and the 555", minutes: 25, fig: "sample",
        read: "First-order cutoff, what a second-order lowpass does at DC, and the astable 555 frequency.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Filter note", href: loc("sem3/_concepts/Active filters.md") },
          { label: "555 note", href: loc("sem3/_concepts/555 timer.md") }
        ),
        seeTitle: "One RC, then the timer",
        see: "<p class='eq'>f = 1/(2π RC)</p><p class='eq'>f ≈ 1.44 / ((RA + 2 RB) C)</p><p>A lowpass passes DC. A highpass blocks it. Second order falls twice as fast, 40 dB/decade. The 555 astable charges through RA+RB and discharges through RB.</p>",
        figCap: "Duty depends on RA versus RB because discharge sees only RB.",
        source: "Active filters concept, 555 concept, Gaikwad filter and timer chapters",
        quiz: [
          { q: "First-order lowpass at DC has gain set by", choices: ["The capacitor, which is a short", "The resistor ratio, capacitor open", "Zero always", "The 555"], answer: 1, why: "C is open at DC. The op-amp gain remains." },
          { q: "40 dB/decade means", choices: ["First order", "Second order", "An oscillator", "A comparator"], answer: 1, why: "20 dB/decade per order." },
          { q: "555 discharge path is", choices: ["RA+RB", "RB", "Only C", "The output pin directly through RA"], answer: 1, why: "Charge uses both resistors. Discharge uses RB." },
          { q: "A highpass at DC", choices: ["Has the passband gain", "Blocks DC", "Oscillates", "Is a Schmitt trigger"], answer: 1, why: "C is open, so the input does not arrive." }
        ],
        numerical: { prompt: "RA = RB = 10 kΩ, C = 0.01 μF. Astable frequency in Hz. Use 1.44.", fields: [{ key: "f", label: "Hz", target: 4800, tol: 30 }], solution: "RA+2RB = 30 kΩ. 30e3 × 0.01e−6 = 3e−4. 1.44 / 3e−4 = 4800 Hz." }
      }),
      L({ id: 5, title: "GBW, CMRR, slew", minutes: 25, fig: "opamp",
        read: "Bandwidth trades with gain. 100 dB is 10^5. Slew limits how fast a sine may move.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "September paper", href: loc("sem3/05-acd/notes/midsem-2026.md") },
          { label: "Formula sheet", href: notes.acd },
          { label: "Neso playlists", href: Y.neso }
        ),
        seeTitle: "One product, then the slope limit",
        see: "<p class='eq'>f3dB = GBW / G &nbsp;&nbsp; CMRR = Ad / Acm</p><p class='eq'>SR ≥ 2π f Vp</p><p>vo = Ad vd + Acm vc, with vd = v1−v2 and vc = (v1+v2)/2. A 741 slew is about 0.5 V/μs.</p>",
        figCap: "More closed-loop gain, less bandwidth, same GBW.",
        source: "ACD formula sheet Unit II, September 2026 Q4 and Q5",
        quiz: [
          { q: "f3dB of a closed loop is", choices: ["GBW times G", "GBW / G", "Always 1 Hz", "The slew rate"], answer: 1, why: "Gain and bandwidth trade." },
          { q: "100 dB equals", choices: ["100", "10^5", "2", "0.01"], answer: 1, why: "20 log10(1e5) = 100." },
          { q: "Slew rate limits", choices: ["How fast the output may move", "Only the DC gain", "The input offset", "CMRR"], answer: 0, why: "A fast large sine will triangle if SR is too small." },
          { q: "vc is", choices: ["v1−v2", "(v1+v2)/2", "Ad", "0"], answer: 1, why: "The shared part." }
        ],
        numerical: { prompt: "Closed-loop gain 100, f3dB = 10 kHz. Highest gain at 20 kHz bandwidth.", fields: [{ key: "g", label: "Gain", target: 50, tol: 0.5 }], solution: "GBW = 1 MHz. 1e6/20e3 = 50." }
      }),
      L({ id: 6, title: "Diff pair", minutes: 20, fig: "gauss",
        read: "One tail, two matched transistors, half the current each. Then re.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "ACD crash course", href: loc("sem3/05-acd/notes/crash-course.md") },
          { label: "Formula sheet", href: notes.acd }
        ),
        seeTitle: "The tail splits in half",
        see: "<p class='eq'>IT = (|VEE| − 0.7) / RE &nbsp;&nbsp; IE = IT/2 &nbsp;&nbsp; re = VT/IE</p><p>A current-mirror tail is stiff, so common-mode gain falls and CMRR rises.</p>",
        figCap: "re uses each device’s emitter current, not the whole tail.",
        source: "ACD crash course Block 0, Boylestad §10.2",
        quiz: [
          { q: "Each IE is", choices: ["IT/2", "IT", "2 IT", "β only"], answer: 0, why: "Matched pair." },
          { q: "re uses", choices: ["IT", "IT/2", "VCC", "RC"], answer: 1, why: "VT over that half." },
          { q: "A stiffer tail", choices: ["Lowers CMRR", "Raises CMRR", "Removes VBE", "Doubles Ad a lot"], answer: 1, why: "Acm drops." },
          { q: "Mirror current is about", choices: ["Iref", "β Iref", "0", "VBE"], answer: 0, why: "Iref = (VCC−VBE)/R." }
        ],
        numerical: { prompt: "RE = 10 kΩ to −8 V. IT in mA.", fields: [{ key: "it", label: "IT (mA)", target: 0.73, tol: 0.015 }], solution: "(8−0.7)/10 kΩ = 0.73 mA. Each IE = 0.365 mA." }
      }),
      L({ id: 7, title: "Schmitt trigger", minutes: 20, fig: "opamp",
        read: "Positive feedback, two thresholds. A comparator has one and chatters.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Schmitt note", href: loc("sem3/_concepts/Schmitt trigger.md") },
          { label: "Neso playlists", href: Y.neso }
        ),
        seeTitle: "Hysteresis is a memory",
        see: "<p class='eq'>VUT = +Vsat R1/(R1+R2) &nbsp;&nbsp; VLT = −VUT</p><p>Inverting form: signal on −, R1 from + to ground, R2 from the output back to +. Between the thresholds the output stays where it was.</p>",
        figCap: "Noise smaller than the hysteresis does not flip the output.",
        source: "chip-club ACD card, Schmitt concept. Boylestad only mentions Schmitt inside the 555.",
        quiz: [
          { q: "A comparator has", choices: ["Two thresholds", "One threshold", "Gain −RF/R1", "Virtual ground"], answer: 1, why: "Noise chatters there." },
          { q: "Schmitt uses", choices: ["Negative feedback", "Positive feedback", "No op-amp", "A tail current"], answer: 1, why: "That makes two thresholds." },
          { q: "VLT of the symmetric inverting form is", choices: ["VUT", "−VUT", "0", "Vsat"], answer: 1, why: "The divider fraction times −Vsat." },
          { q: "R1 is the resistor", choices: ["From + to ground", "In series with the signal only", "Across the capacitor", "The load"], answer: 0, why: "R2 comes from the output." }
        ],
        numerical: { prompt: "Vsat = 10 V, R1 = 10 kΩ, R2 = 40 kΩ. VUT.", fields: [{ key: "v", label: "VUT (V)", target: 2, tol: 0.05 }], solution: "10 × 10/50 = 2 V. VLT = −2 V." }
      })
    ]
  },
  {
    id: "mni", short: "M", code: "ECL204", title: "MNI",
    blurb: "Errors through converters",
    links: [
      { label: "Bentley on Drive", href: D.bentley },
      { label: "Doebelin on Drive", href: D.doebelin },
      { label: "Bentley on this Mac", href: loc("sem3/06-mni/resources/books/Bentley_Principles_of_Measurement_Systems.pdf") },
      { label: "Formula sheet", href: notes.mni }
    ],
    sheet: [
      "Accuracy is closeness to truth. Precision is repeat scatter. Resolution is the smallest detectable change.",
      "±1% of 150 V full scale is ±1.5 V at every reading. Near the bottom that is a large percent of reading.",
      "Limiting error of a product adds the relative errors. P = I²R gives 2 εI + εR.",
      "Wheatstone balance: P/Q = R/S. Three 0.2% arms give 0.6% on the unknown.",
      "Sensitivity K = Δout/Δin. Loading: the meter resistance sits in parallel or series and moves the reading.",
      "RTD resistance rises with temperature. Thermocouple voltage is from a junction pair. LVDT is displacement to AC.",
      "n-bit ADC has 2^n codes. LSB = Vfs / 2^n."
    ],
    lessons: [
      L({ id: 1, title: "Errors and static words", minutes: 25, fig: "bridge",
        read: "Say accuracy, precision, resolution, and full-scale error without mixing them.",
        links: links(
          { label: "Bentley on Drive", href: D.bentley },
          { label: "Doebelin on Drive", href: D.doebelin },
          { label: "Formula sheet", href: notes.mni },
          { label: "Concept note", href: loc("sem3/_concepts/Accuracy precision resolution.md") }
        ),
        seeTitle: "Percent of full scale is not percent of reading",
        see: "<p class='eq'>% of FS = (reading − true) / FS × 100</p><p>±1% of 150 V FS is ±1.5 V everywhere. At 75 V that is ±2% of the reading. Measure near full scale. Gross error is a human blunder. Systematic error is a bias. Random error is the leftover scatter.</p>",
        figCap: "High precision and poor accuracy is a tight cluster in the wrong place.",
        source: "MNI formula sheet, accuracy concept",
        quiz: [
          { q: "Precision is", choices: ["Closeness to truth", "Agreement of repeats", "The smallest division only", "A human blunder"], answer: 1, why: "Accuracy is closeness to truth." },
          { q: "±1% of FS means the absolute error", choices: ["Shrinks at small readings", "Is about the same across the scale", "Is zero at half scale", "Is random only"], answer: 1, why: "The volt is fixed. The percent of reading gets worse as you go down." },
          { q: "A thermometer always 20° low is", choices: ["Random", "Systematic", "Gross", "Hysteresis"], answer: 1, why: "A constant bias." },
          { q: "Writing 203 while the needle is near 225 is", choices: ["Gross", "Random", "Sensitivity", "Threshold"], answer: 0, why: "A human misread." }
        ],
        numerical: { prompt: "±1% of 150 V full scale. Absolute uncertainty in volts.", fields: [{ key: "v", label: "Volts", target: 1.5, tol: 0.01 }], solution: "0.01 × 150 = 1.5 V at every reading." }
      }),
      L({ id: 2, title: "Limiting error", minutes: 20, fig: "proj",
        read: "Worst-case relative errors add for a product. A power doubles the current’s percent.",
        links: links(
          { label: "Doebelin on Drive", href: D.doebelin },
          { label: "Formula sheet", href: notes.mni }
        ),
        seeTitle: "Add the percents, with the exponent",
        see: "<p class='eq'>P = I² R &nbsp;⇒&nbsp; εP = 2 εI + εR</p><p>Sum of resistors: each relative error is weighted by Rk/Rtotal. Wheatstone R = (P/Q)S picks up εP+εQ+εS.</p>",
        figCap: "RSS is milder than this worst-case sum. The exam usually wants the sum.",
        source: "MNI formula sheet, limiting-error table",
        quiz: [
          { q: "Relative error of a product", choices: ["Adds", "Multiplies the percents", "Is the larger one only", "Is zero"], answer: 0, why: "Worst-case signs." },
          { q: "P = I²R doubles", choices: ["The R error", "The I error", "Neither", "The absolute volt"], answer: 1, why: "The exponent 2." },
          { q: "Three 0.2% Wheatstone arms give about", choices: ["0.2%", "0.6%", "0.04%", "0"], answer: 1, why: "εP+εQ+εS." },
          { q: "Equal percent errors on series resistors give", choices: ["A larger percent on the sum", "The same percent on the sum", "Zero", "A difference only"], answer: 1, why: "The weights Rk/Rs sum to 1." }
        ],
        numerical: { prompt: "I is ±2%, R is ±1%, P = I²R. Percent limiting error on P.", fields: [{ key: "p", label: "Percent", target: 5, tol: 0.01 }], solution: "2×2 + 1 = 5%." }
      }),
      L({ id: 3, title: "Wheatstone and loading", minutes: 20, fig: "bridge",
        read: "Balance condition, and why a meter moves the voltage it is trying to read.",
        links: links(
          { label: "Bentley on Drive", href: D.bentley },
          { label: "Wheatstone note", href: loc("sem3/_concepts/Wheatstone bridge.md") },
          { label: "Loading note", href: loc("sem3/_concepts/Loading effect.md") }
        ),
        seeTitle: "Balance, then the meter’s own resistance",
        see: "<p class='eq'>P/Q = R/S</p><p>A voltmeter in parallel with a resistor lowers the voltage. A series ammeter drops voltage. The cure is a meter resistance far from the resistance it sits on: high for a voltmeter, low for an ammeter.</p>",
        figCap: "At balance the detector current is zero, so the detector resistance does not matter.",
        source: "Wheatstone and loading concepts, MNI formula sheet",
        quiz: [
          { q: "Balance is", choices: ["P/Q = R/S", "P = Q = R = S always", "P+Q = R+S", "The detector at full scale"], answer: 0, why: "The ratios match." },
          { q: "At balance the detector resistance", choices: ["Sets the reading", "Does not matter", "Must be zero", "Must equal P"], answer: 1, why: "No current through it." },
          { q: "A voltmeter should have", choices: ["Low R", "High R", "R equal to the source", "No R"], answer: 1, why: "So it does not load the node." },
          { q: "Loading is which error", choices: ["Random", "Gross only", "Systematic, instrumental", "A resolution limit"], answer: 2, why: "The formula sheet lists loading under instrumental systematic error." }
        ],
        numerical: { prompt: "P = 100 Ω, Q = 100 Ω, S = 250 Ω. Unknown R at balance, in ohms.", fields: [{ key: "r", label: "R (Ω)", target: 250, tol: 0.1 }], solution: "R = (P/Q) S = 1 × 250 = 250 Ω." }
      }),
      L({ id: 4, title: "Sensors and converters", minutes: 20, fig: "sample",
        read: "RTD, thermocouple, LVDT, strain gauge, then how many codes an ADC has.",
        links: links(
          { label: "Bentley on Drive", href: D.bentley },
          { label: "Doebelin on Drive", href: D.doebelin },
          { label: "ADC note", href: loc("sem3/_concepts/ADC and DAC.md") }
        ),
        seeTitle: "A physical change, then a code",
        see: "<p>RTD: metal resistance rises with temperature. Thermocouple: two junctions, a voltage from their temperature difference. LVDT: a core moves and unbalances two secondary voltages. Strain gauge: resistance changes with stretch.</p><p class='eq'>codes = 2^n &nbsp;&nbsp; LSB = Vfs / 2^n</p>",
        figCap: "8 bits is 256 codes, not 8.",
        source: "MNI units 3 and 4, ADC concept",
        quiz: [
          { q: "An RTD’s resistance as temperature rises", choices: ["Falls", "Rises", "Is a voltage source", "Is zero"], answer: 1, why: "Metal PTC. A thermistor is often NTC." },
          { q: "A thermocouple output is", choices: ["A resistance", "A voltage from a junction pair", "A displacement", "A digital code"], answer: 1, why: "Seebeck." },
          { q: "An LVDT measures", choices: ["Temperature", "Displacement", "Current only", "pH"], answer: 1, why: "Core position." },
          { q: "8-bit converter has", choices: ["8 codes", "16 codes", "256 codes", "1024 codes"], answer: 2, why: "2^8 = 256." }
        ],
        numerical: { prompt: "8-bit ADC, full scale 5 V. LSB in volts.", fields: [{ key: "lsb", label: "LSB (V)", target: 0.0195, tol: 0.001 }], solution: "5/256 ≈ 0.0195 V." }
      })
    ]
  },
  {
    id: "la", short: "L", code: "LA", title: "Linear algebra",
    blurb: "Elimination through descent",
    links: [
      { label: "Strang on Drive", href: D.strang },
      { label: "Strang on this Mac", href: loc("sem3/01-linear-algebra/resources/books/Strang_Linear_Algebra.pdf") },
      { label: "Boyd on Drive", href: D.boyd },
      { label: "3Blue1Brown playlist", href: Y.b1b },
      { label: "Formula sheet", href: notes.la }
    ],
    sheet: [
      "Ax is a mix of the columns. Solvable iff b is in the column space. 0, 1, or infinitely many solutions.",
      "Inverse exists iff n pivots iff nullspace is {0}. (AB)⁻¹ = B⁻¹ A⁻¹.",
      "2×2 inverse: swap diagonals, flip the off-diagonals’ signs, divide by ad−bc.",
      "Rank r = number of pivots. dim N(A) = n − r. Column basis: pivot columns of A.",
      "Projection of b onto a is (aᵀb / aᵀa) a. Least squares: AᵀA xhat = Aᵀb.",
      "Eigen: det(A−λI) = 0. Trace = sum of λ. Det = product of λ.",
      "SVD: A = UΣVᵀ. Singular values are nonnegative. They are sqrt of eigenvalues of AᵀA.",
      "Gradient step: w ← w − α ∂J/∂w."
    ],
    lessons: [
      L({ id: 1, title: "Elimination and inverse", minutes: 25, fig: "proj",
        read: "Column picture, pivots, and when an inverse exists. Do not invert to solve one system.",
        links: links(
          { label: "Strang on Drive", href: D.strang },
          { label: "Strang on this Mac", href: loc("sem3/01-linear-algebra/resources/books/Strang_Linear_Algebra.pdf") },
          { label: "3Blue1Brown span", href: Y.span },
          { label: "Formula sheet", href: notes.la }
        ),
        seeTitle: "Columns mix. Pivots count.",
        see: "<p class='eq'>Ax = x1 a1 + … + xn an</p><p class='eq'>[[a,b],[c,d]]⁻¹ = (1/(ad−bc)) [[d,−b],[−c,a]]</p><p>A row [0 … 0 | d] with d ≠ 0 means inconsistent. Two solutions mean the whole line of solutions.</p>",
        figCap: "b has to land in the column space.",
        source: "LA formula sheet, Strang elimination chapters",
        quiz: [
          { q: "Ax = b is solvable when", choices: ["b is in C(A)", "A is always square", "x = 0", "There is one free variable"], answer: 0, why: "b is a mix of the columns." },
          { q: "A real linear system has", choices: ["Always one solution", "0, 1, or infinitely many", "Exactly two", "None of those"], answer: 1, why: "Two distinct solutions drag the whole line in." },
          { q: "Inverse exists when", choices: ["There is a free variable", "There are n pivots", "The matrix is 2×3", "b is 0"], answer: 1, why: "Nullspace is only 0." },
          { q: "(AB)⁻¹ is", choices: ["A⁻¹ B⁻¹", "B⁻¹ A⁻¹", "AB", "Aᵀ"], answer: 1, why: "Reverse the order." }
        ],
        numerical: { prompt: "det of [[1,2],[3,4]].", fields: [{ key: "d", label: "det", target: -2, tol: 0 }], solution: "1·4 − 2·3 = −2. Inverse exists." }
      }),
      L({ id: 2, title: "Rank and nullspace", minutes: 20, fig: "proj",
        read: "Pivots, free variables, and the four spaces in one sentence each.",
        links: links(
          { label: "Strang on Drive", href: D.strang },
          { label: "3Blue1Brown span", href: Y.span },
          { label: "Formula sheet", href: notes.la }
        ),
        seeTitle: "r pivots, n − r free variables",
        see: "<p class='eq'>dim N(A) = n − r</p><p>Column space basis: original columns that have pivots. Row space basis: nonzero rows of U. Left nullspace: yᵀA = 0, dimension m − r.</p>",
        figCap: "A free variable gives one special solution.",
        source: "LA formula sheet, four spaces table",
        quiz: [
          { q: "Rank is", choices: ["The number of rows", "The number of pivots", "n − m", "The determinant always"], answer: 1, why: "After elimination." },
          { q: "Nullity of a 3×5 rank-2 matrix is", choices: ["2", "3", "1", "5"], answer: 1, why: "Five columns, rank 2, so n − r = 3." },
          { q: "Column space lives in", choices: ["R^n", "R^m", "The nullspace", "Only square matrices"], answer: 1, why: "Columns have m entries." },
          { q: "Free variables", choices: ["Equal the rank", "Equal n − r", "Are always zero", "Mean the system is inconsistent"], answer: 1, why: "One special solution each." }
        ],
        numerical: { prompt: "3 columns, 2 pivots. Dimension of the nullspace.", fields: [{ key: "d", label: "dim N(A)", target: 1, tol: 0 }], solution: "n − r = 3 − 2 = 1. The quiz’s 3×5 example is nullity 3, not this number." }
      }),
      L({ id: 3, title: "Projection and least squares", minutes: 25, fig: "proj",
        read: "The error is perpendicular to the column space. That is the normal equation.",
        links: links(
          { label: "Strang on Drive", href: D.strang },
          { label: "Projection note", href: loc("sem3/_concepts/Projection.md") },
          { label: "Least squares note", href: loc("sem3/_concepts/Least squares.md") },
          { label: "3Blue1Brown playlist", href: Y.b1b }
        ),
        seeTitle: "Drop a perpendicular",
        see: "<p class='eq'>p = (aᵀb / aᵀa) a</p><p class='eq'>AᵀA x̂ = Aᵀb</p><p>If the columns are independent, AᵀA is invertible. The residual b − Ax̂ is orthogonal to every column.</p>",
        figCap: "The dashed error hits the column space at a right angle.",
        source: "Projection and least-squares concepts, Strang",
        quiz: [
          { q: "The least-squares error is", choices: ["Parallel to the columns", "Perpendicular to the column space", "Zero only if A is square", "In the nullspace of Aᵀ always as a row"], answer: 1, why: "That is why you multiply by Aᵀ." },
          { q: "Normal equation is", choices: ["Ax = b", "AᵀA x = Aᵀb", "A⁻¹ = Aᵀ", "x = 0"], answer: 1, why: "Even when A is tall." },
          { q: "Projection of b onto a uses", choices: ["aᵀb / aᵀa", "aᵀa / aᵀb", "det A", "The trace"], answer: 0, why: "Then multiply by a." },
          { q: "Independent columns mean AᵀA is", choices: ["Singular", "Invertible", "Zero", "A projection"], answer: 1, why: "Then x̂ is unique." }
        ],
        numerical: { prompt: "Project b = (3, 0) onto a = (1, 0). The x-component of the projection.", fields: [{ key: "p", label: "x component", target: 3, tol: 0.01 }], solution: "aᵀb / aᵀa = 3/1. Projection is (3, 0)." }
      }),
      L({ id: 4, title: "Eigenvalues and SVD", minutes: 25, fig: "proj",
        read: "Characteristic polynomial, trace and det checks, then what a singular value is.",
        links: links(
          { label: "Strang on Drive", href: D.strang },
          { label: "3Blue1Brown eigen", href: Y.eigen },
          { label: "Eigen note", href: loc("sem3/_concepts/Eigenvalues and eigenvectors.md") },
          { label: "SVD note", href: loc("sem3/_concepts/SVD.md") }
        ),
        seeTitle: "Directions that only stretch",
        see: "<p class='eq'>det(A − λI) = 0 &nbsp;&nbsp; trace = λ1+λ2 &nbsp;&nbsp; det = λ1 λ2</p><p class='eq'>A = U Σ Vᵀ</p><p>Singular values are ≥ 0. They are the square roots of the eigenvalues of AᵀA. U and V are orthogonal.</p>",
        figCap: "An eigenvector keeps its line. SVD is the same idea for a rectangular matrix.",
        source: "LA and FoML formula sheets, eigen and SVD concepts",
        quiz: [
          { q: "Trace equals", choices: ["The product of eigenvalues", "The sum of eigenvalues", "The largest singular value", "Zero"], answer: 1, why: "Det is the product." },
          { q: "A singular value is", choices: ["Any eigenvalue, sign kept", "Nonnegative", "Always 1", "The determinant"], answer: 1, why: "Σ has σ ≥ 0 on the diagonal." },
          { q: "σ² are eigenvalues of", choices: ["A", "AᵀA", "U", "The inverse"], answer: 1, why: "Or AAᵀ, same nonzero ones." },
          { q: "U and V in the SVD are", choices: ["Orthogonal", "Singular", "Triangular", "The residual"], answer: 0, why: "UᵀU = I and VᵀV = I." }
        ],
        numerical: { prompt: "Matrix [[1,2],[2,1]]. Sum of the two eigenvalues.", fields: [{ key: "s", label: "Sum", target: 2, tol: 0 }], solution: "Trace = 2. The eigenvalues are 3 and −1. Det = −3 checks the product." }
      }),
      L({ id: 5, title: "Gradient descent", minutes: 20, fig: "proj",
        read: "One step. Subtract alpha times the slope. Boyd is the book only for this block.",
        links: links(
          { label: "Boyd on Drive", href: D.boyd },
          { label: "Boyd on this Mac", href: loc("sem3/01-linear-algebra/resources/books/Boyd_Convex_Optimization.pdf") },
          { label: "StatQuest gradient descent", href: Y.gd },
          { label: "FoML formula sheet", href: notes.foml }
        ),
        seeTitle: "Step downhill",
        see: "<p class='eq'>w ← w − α ∂J/∂w</p><p>Too large an α overshoots. Too small an α crawls. For a convex bowl there is one minimum. The salary example in the FoML sheet: one step from w = 10, b = 10, α = 0.02 lands on w = 10.8, b = 10.4.</p>",
        figCap: "The arrow is minus the gradient.",
        source: "FoML formula sheet, one GD step; Boyd when the course reaches optimization",
        quiz: [
          { q: "The update subtracts", choices: ["The gradient times α", "The loss itself", "α only", "The Hessian always"], answer: 0, why: "Downhill." },
          { q: "A huge step size", choices: ["Always converges faster and safer", "Can overshoot", "Sets the gradient to 0", "Removes the data"], answer: 1, why: "You can climb the other side." },
          { q: "A convex bowl has", choices: ["Many equal minima that are not connected", "One minimum", "No gradient", "A maximum only"], answer: 1, why: "Local is global." },
          { q: "α is", choices: ["The learning rate", "The label", "The residual", "The rank"], answer: 0, why: "How far you step." }
        ],
        numerical: { prompt: "After the salary GD step in the formula sheet, new w. Start w = 10, α = 0.02, result 10.8.", fields: [{ key: "w", label: "w", target: 10.8, tol: 0.05 }], solution: "x = 1,2,3 and y = 30,40,50, b = 10. One step gives w = 10.8 and b = 10.4." }
      })
    ]
  },
  {
    id: "foml", short: "F", code: "CSLA 204", title: "FoML",
    blurb: "Bayes through backprop",
    links: [
      { label: "Mitchell on Drive", href: D.mitchell },
      { label: "Deisenroth on Drive", href: D.deisenroth },
      { label: "Mitchell on this Mac", href: loc("sem3/07-fundamentals-of-ml/resources/books/Mitchell_Machine_Learning.pdf") },
      { label: "Formula sheet", href: notes.foml },
      { label: "StatQuest trees", href: Y.trees }
    ],
    sheet: [
      "P(h|D) = P(D|h)P(h)/P(D). MAP compares numerators.",
      "Cancer numbers: P(c|+) ≈ 0.21. MAP is not cancer.",
      "Train/val/test of 1000 at 70/15/15 is 700/150/150. Overfit: train looks perfect, new data fails.",
      "OLS slope = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)². The 5-point set gives slope 0.9 and intercept 1.3.",
      "Entropy H = −Σ p log2 p. Information gain is parent H minus the weighted child H. Pick the largest.",
      "Gini = 1 − Σ p².",
      "Logistic σ(z) = 1/(1+e^{−z}). Threshold 0.5.",
      "k-means: assign to nearest center, then move the center to the mean. Repeat.",
      "One backprop step uses the same idea as gradient descent on the loss."
    ],
    lessons: [
      L({ id: 1, title: "Bayes", minutes: 25, fig: "tree",
        read: "Posterior is likelihood times prior, divided by the evidence. MAP can disagree with a rare disease.",
        links: links(
          { label: "Mitchell on Drive", href: D.mitchell },
          { label: "Deisenroth on Drive", href: D.deisenroth },
          { label: "Bayes note", href: loc("sem3/_concepts/Bayes rule.md") },
          { label: "Formula sheet", href: notes.foml }
        ),
        seeTitle: "The base rate still matters",
        see: "<p class='eq'>P(h|D) = P(D|h) P(h) / P(D)</p><p>Cancer: P(c) = 0.008, P(+|c) = 0.98, P(+|not c) = 0.03. The joint for cancer and a positive test is 0.00784. The joint for healthy and positive is 0.02976. MAP picks healthy.</p>",
        figCap: "A good test still flags more healthy people when the disease is rare.",
        source: "FoML formula sheet, Bayes concept",
        quiz: [
          { q: "MAP compares", choices: ["Only the likelihoods", "The numerators P(D|h)P(h)", "Only the priors", "The accuracy"], answer: 1, why: "The evidence P(D) is the same for every h." },
          { q: "A rare disease with a good test can still have", choices: ["Posterior near 1", "Most positives coming from healthy people", "Likelihood 0", "No prior"], answer: 1, why: "The base rate is tiny." },
          { q: "P(D) is", choices: ["Always 1", "The sum of the joints", "The accuracy", "The threshold"], answer: 1, why: "Total probability." },
          { q: "Likelihood is", choices: ["P(h|D)", "P(D|h)", "P(h)", "P(D)"], answer: 1, why: "Posterior is the one with h after the bar." }
        ],
        numerical: { prompt: "Using the cancer numbers, P(c | +) to two decimals.", fields: [{ key: "p", label: "Probability", target: 0.21, tol: 0.02 }], solution: "0.00784 / (0.00784+0.02976) = 0.00784/0.0376 ≈ 0.2085, about 0.21." }
      }),
      L({ id: 2, title: "Train, test, overfit", minutes: 15, fig: "pulse",
        read: "Three splits. Overfit memorizes. Underfit never fits.",
        links: links(
          { label: "Mitchell on Drive", href: D.mitchell },
          { label: "Overfitting note", href: loc("sem3/_concepts/Overfitting.md") },
          { label: "Split note", href: loc("sem3/_concepts/Train validation test.md") }
        ),
        seeTitle: "The test set is not for tuning",
        see: "<p>Train fits the model. Validation chooses the knob. Test is touched once. Overfit: tiny train error, large test error. Underfit: both errors high.</p>",
        figCap: "70/15/15 of 1000 is 700, 150, 150.",
        source: "FoML formula sheet, overfitting concept",
        quiz: [
          { q: "Overfit means", choices: ["Both errors high", "Train looks great, new data fails", "The test set was used for training on purpose", "No model"], answer: 1, why: "Memorized the sample." },
          { q: "Underfit means", choices: ["Train error low, test error high", "Both errors high", "Perfect test score", "A data leak"], answer: 1, why: "The model is too weak." },
          { q: "The test set is for", choices: ["Choosing every hyperparameter", "A final check", "Replacing the training set", "Computing the prior only"], answer: 1, why: "Validation is the knob-turning set." },
          { q: "A data leak is", choices: ["Test information sneaking into training", "A small learning rate", "A pure leaf", "Bayes"], answer: 0, why: "The test score becomes a lie." }
        ],
        numerical: { prompt: "1000 examples, 70% train. How many training rows?", fields: [{ key: "n", label: "Rows", target: 700, tol: 0 }], solution: "0.70 × 1000 = 700. Validation and test are 150 each." }
      }),
      L({ id: 3, title: "Linear regression", minutes: 25, fig: "proj",
        read: "Normal equations, then the five-point slope you should add yourself.",
        links: links(
          { label: "Deisenroth on Drive", href: D.deisenroth },
          { label: "Regression note", href: loc("sem3/_concepts/Linear regression.md") },
          { label: "Formula sheet", href: notes.foml }
        ),
        seeTitle: "The line that minimizes squared error",
        see: "<p class='eq'>a1 = Σ(x−x̄)(y−ȳ) / Σ(x−x̄)² &nbsp;&nbsp; a0 = ȳ − a1 x̄</p><p>Five points x = 1..5, y = 2,3,5,4,6. The products of deviations sum to 9, not 10. Slope 0.9. Intercept 1.3. At x = 6, yhat = 6.7.</p>",
        figCap: "Squared error is the least-squares picture from linear algebra.",
        source: "FoML formula sheet, linear regression concept",
        quiz: [
          { q: "The slope formula uses", choices: ["Raw x only", "Deviations from the means", "The test labels", "Entropy"], answer: 1, why: "Centered products." },
          { q: "a0 is", choices: ["ȳ − a1 x̄", "a1 / x̄", "Always 0", "The RSS"], answer: 0, why: "The line passes through the mean point." },
          { q: "The slide that adds the products as 10", choices: ["Matches a careful sum", "Disagrees with 9", "Is the entropy", "Is k-means"], answer: 1, why: "Add (−2)(−2)+(−1)(−1)+0+0+(2)(2) = 9." },
          { q: "Through-origin slope is", choices: ["Σxy / Σx²", "ȳ/x̄ always", "0", "The intercept"], answer: 0, why: "No a0 term." }
        ],
        numerical: { prompt: "Five-point OLS. Predicted y at x = 6, using slope 0.9 and intercept 1.3.", fields: [{ key: "y", label: "yhat", target: 6.7, tol: 0.05 }], solution: "1.3 + 0.9×6 = 6.7. The slide’s 1+x gives 7 because it used the wrong sum." }
      }),
      L({ id: 4, title: "Trees and entropy", minutes: 25, fig: "tree",
        read: "Entropy, information gain, Gini. The split with the largest gain is the root.",
        links: links(
          { label: "Mitchell on Drive", href: D.mitchell },
          { label: "StatQuest trees", href: Y.trees },
          { label: "Entropy note", href: loc("sem3/_concepts/Entropy and information gain.md") },
          { label: "Formula sheet", href: notes.foml }
        ),
        seeTitle: "A pure leaf has entropy 0",
        see: "<p class='eq'>H = −Σ p log2 p &nbsp;&nbsp; IG = H(parent) − Σ (|Sv|/|S|) H(Sv)</p><p class='eq'>Gini = 1 − Σ p²</p><p>A fair coin has H = 1. A certain outcome has H = 0. Take 0 log 0 as 0.</p>",
        figCap: "Pick the question that cleans the children the most.",
        source: "FoML formula sheet, entropy concept",
        quiz: [
          { q: "A pure node has entropy", choices: ["1", "0", "0.5", "Infinite"], answer: 1, why: "No uncertainty." },
          { q: "A fair coin has entropy", choices: ["0", "1 bit", "2 bits", "0.5"], answer: 1, why: "−2×(0.5 log2 0.5) = 1." },
          { q: "You pick the split with", choices: ["Smallest information gain", "Largest information gain", "The most missing values", "Gini always negative"], answer: 1, why: "Same rule for Gini gain." },
          { q: "0 log 0 is taken as", choices: ["1", "0", "Undefined, so stop", "Infinity"], answer: 1, why: "The limit is 0." }
        ],
        numerical: { prompt: "Entropy of a fair coin, in bits.", fields: [{ key: "h", label: "H", target: 1, tol: 0.01 }], solution: "1 bit." }
      }),
      L({ id: 5, title: "k-means and one backprop idea", minutes: 20, fig: "tree",
        read: "Assign, average, repeat. Backprop is gradient descent through the layers. PCA is the other StatQuest picture if eigen is rusty.",
        links: links(
          { label: "Deisenroth on Drive", href: D.deisenroth },
          { label: "StatQuest PCA", href: Y.pca },
          { label: "k-means note", href: loc("sem3/_concepts/k-means.md") },
          { label: "Backprop note", href: loc("sem3/_concepts/Backpropagation.md") }
        ),
        seeTitle: "Nearest center, then the mean",
        see: "<p>k-means: each point joins the nearest center. Each center moves to the mean of its points. Stop when assignments stop changing. It can stick in a bad start, so rerun.</p><p>Backprop sends the loss derivative backward with the chain rule, then takes a gradient step on each weight.</p>",
        figCap: "PCA keeps the directions of largest variance. k-means keeps clusters.",
        source: "k-means and backprop concepts, FoML formula sheet GD step",
        quiz: [
          { q: "k-means updates a center to", choices: ["The median of all data", "The mean of the points assigned to it", "A random label", "The entropy"], answer: 1, why: "Then reassign." },
          { q: "A bad initialization can", choices: ["Be irrelevant", "Stick in a poor clustering", "Remove k", "Compute Bayes"], answer: 1, why: "Rerun with new starts." },
          { q: "Backprop uses", choices: ["The chain rule", "Only the prior", "A K-map", "Gauss’s law"], answer: 0, why: "Derivative of loss through each layer." },
          { q: "PCA keeps", choices: ["The noisiest single point", "Directions of large variance", "Only the labels", "The learning rate"], answer: 1, why: "The top singular directions." }
        ],
        numerical: { prompt: "Two points in one cluster: 0 and 4. The new center.", fields: [{ key: "c", label: "Center", target: 2, tol: 0 }], solution: "Mean is 2." }
      })
    ]
  }
);
