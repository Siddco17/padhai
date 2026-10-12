const HOME = "file:///Users/sidd/Desktop/padhai/";
const loc = (p) => HOME + p;
const D = {
  dchd: "https://drive.google.com/drive/folders/1BM1RwNNibRMTeN4AvcC2dktET3yiORZz",
  mano: "https://drive.google.com/file/d/1NOsKTQx5m95K0qLk2-gCAsr-iCCe5xIl/view",
  kohavi: "https://drive.google.com/file/d/1kzdEpeweFJgCyYigOFK_AhWV4_xpYX5X/view",
  sns: "https://drive.google.com/drive/folders/1ynWWrkhsMD2dYo7IUFgM9zfX0hNm8Dzc",
  oppenheim: "https://drive.google.com/file/d/1TdpCsPcQeT1FkncaZWhbc1TwPa89T7zI/view",
  emft: "https://drive.google.com/drive/folders/12RMdBvL-pM5CJsF58VwhGCaT_5OEz9CL",
  sadiku: "https://drive.google.com/file/d/1EYhoayPlTld7snZ0LeQtJMR2rupFPl8_/view",
  acd: "https://drive.google.com/drive/folders/154n9V_zCdaGecmnv_xYrHYrXDTcHCZrz",
  gaikwad: "https://drive.google.com/file/d/1eMB5lXmHcSnIYOoX03QY4okP2Aa6pWdr/view",
  mni: "https://drive.google.com/drive/folders/1_rukx9_DuLOlbxeYBJCQrLAqIDZWQ8_q",
  bentley: "https://drive.google.com/file/d/1NmPbQhFRgBsBd8yIdsnMH9wtQG9yy81P/view",
  doebelin: "https://drive.google.com/file/d/1RgOxrBMCtzjZpGnq8USYfAcJwEZnSYAt/view",
  la: "https://drive.google.com/drive/folders/1P0RjF6NT_j9G_nlYlOWYZSAVeu_nvPWf",
  strang: "https://drive.google.com/file/d/1NwlrkK9xedsgi30BePcNpKgXa-G-fUK_/view",
  boyd: "https://drive.google.com/file/d/11oOLkQlngw456YxJdJ_Ea6IWr7kVo3-9/view",
  foml: "https://drive.google.com/drive/folders/1UQikhwmZtOb4TVHn-LekU_utYs5URGbT",
  mitchell: "https://drive.google.com/file/d/12n-qgRHFbbrFgng001HbzAZNx_7pqUe3/view",
  deisenroth: "https://drive.google.com/file/d/1KqIvsoajLWYnf-ZVOCRHn9C7HdBa0Bpu/view"
};
const Y = {
  span: "https://www.youtube.com/watch?v=k7RM-ot2NWY",
  eigen: "https://www.youtube.com/watch?v=PFDu9oVAE-g",
  divcurl: "https://www.youtube.com/watch?v=rB83DpBJQsE",
  pca: "https://www.youtube.com/watch?v=FgakZw6K1QQ",
  trees: "https://www.youtube.com/watch?v=7VeUPuFGJHk",
  gd: "https://www.youtube.com/watch?v=sDv4f4s2SB8",
  ocw: "https://ocw.mit.edu/courses/6-003-signals-and-systems-fall-2011/video_galleries/lecture-videos/",
  neso: "https://www.youtube.com/@nesoacademy/playlists",
  b1b: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab"
};
const notes = {
  dchd: loc("sem3/02-dchd/notes/midsem-formulas.md"),
  sns: loc("sem3/03-sns/notes/midsem-formulas.md"),
  emft: loc("sem3/04-emft/notes/midsem-formulas.md"),
  acd: loc("sem3/05-acd/notes/midsem-formulas.md"),
  mni: loc("sem3/06-mni/notes/midsem-formulas.md"),
  la: loc("sem3/01-linear-algebra/notes/midsem-formulas.md"),
  foml: loc("sem3/07-fundamentals-of-ml/notes/midsem-formulas.md"),
  club: loc("sem3/_meta/chip-club-interview.md")
};

function L(p) { return p; }
function links() { return Array.from(arguments); }

window.SUBJECTS = [
  {
    id: "club", short: "CC", code: "Chip club", title: "Chip club",
    blurb: "Diode through diff pair",
    links: [
      { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
      { label: "Mano on Drive", href: D.mano },
      { label: "Gaikwad on Drive", href: D.gaikwad },
      { label: "Interview note", href: notes.club }
    ],
    sheet: [
      "Shockley I = IS (exp(V/ηVT) − 1). rd = ηVT/ID. Si 0.7 V. Zener is the sharp reverse reference.",
      "Fixed bias S = 1+β. Divider: VTH = VCC R2/(R1+R2), RTH = R1∥R2. Shortcut IC ≈ (VTH−0.7)/RE when β RE ≥ 10 RTH.",
      "S = (1+β)(1+RB/RE)/(1+β+RB/RE). Sample rank: fixed 101, feedbacks ~50, both ~34, divider 10.",
      "re = VT/IE. CE Av = −RC/re. CC Av ≈ 1. CB Av = +RC/re and Ri = re.",
      "Cin ≈ Cπ + Cμ(1+gm RC). Af = A/(1+Aβf). Voltage amp = series–shunt.",
      "MOSFET saturation is the amplifier region: ID = ½ μCox (W/L) (VGS−Vt)² when VDS ≥ VGS−Vt.",
      "Inverting vo = −(RF/R1)vi, virtual ground. Non-inverting vo = (1+RF/R1)vi, virtual short only.",
      "Schmitt inverting: VUT = +Vsat R1/(R1+R2), VLT = −VUT.",
      "Full adder sum = A⊕B⊕Cin. Carry is 1 when at least two inputs are 1."
    ],
    lessons: [
      L({ id: 1, title: "PN diode", minutes: 25, fig: "diode",
        read: "Depletion region, barrier, Shockley, rd, and why a Zener is run in reverse. Skip bonding and LEDs.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "EDC note", href: loc("sem3/_meta/chip-club-edc.md") }
        ),
        seeTitle: "Barrier, then a knee",
        see: "<p>Forward bias lowers the barrier. Reverse bias widens it until breakdown.</p><p class='eq'>I = IS (e^(V/ηVT) − 1) &nbsp; rd = ηVT / ID</p><p>Zener breakdown is tunneling and sharp. Avalanche is carrier multiplication. The reference diode is still called a Zener.</p>",
        figCap: "Gold is forward. Amber is the Zener knee.",
        source: "sem3/_meta/chip-club-edc.md §1, Boylestad §1.6, §1.8, §1.15",
        quiz: [
          { q: "Forward bias does what to the barrier?", choices: ["Lowers it", "Widens the depletion region", "Sets I = −IS", "Removes the junction"], answer: 0, why: "Forward lowers the barrier. Reverse widens it." },
          { q: "Large reverse voltage, before breakdown, gives about", choices: ["IS exp(V/VT)", "−IS", "V/rd", "Zero for a real diode"], answer: 1, why: "The exponential dies. I ≈ −IS." },
          { q: "The reference diode is", choices: ["Avalanche, because it is soft", "The forward knee", "Zener, tunneling, sharp", "Either mechanism, same knee"], answer: 2, why: "Zener is the sharp tunneling knee." },
          { q: "rd at the Q-point is", choices: ["ηVT/ID", "IS/VT", "0.7/ID", "η ID/VT"], answer: 0, why: "At 10 mA and η = 1, rd = 2.6 Ω." }
        ],
        numerical: { prompt: "ID = 10 mA, η = 1, VT = 26 mV. rd in ohms.", fields: [{ key: "rd", label: "rd (Ω)", target: 2.6, tol: 0.05 }], solution: "rd = 26 mV / 10 mA = 2.6 Ω." }
      }),
      L({ id: 2, title: "Five biases and S", minutes: 35, fig: "diode",
        read: "Draw all five biases. Thevenize the divider. Say why RE pulls IC back.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "Alexander on this Mac", href: loc("sem3/_meta/prereq/Alexander_Sadiku_Fundamentals_of_Electric_Circuits.pdf") },
          { label: "EDC note", href: loc("sem3/_meta/chip-club-edc.md") }
        ),
        seeTitle: "Open the base, then write S",
        see: "<p class='eq'>VTH = VCC R2/(R1+R2), &nbsp; RTH = R1 ∥ R2</p><p class='eq'>IC ≈ (VTH − 0.7)/RE &nbsp; when β RE ≥ 10 RTH</p><p class='eq'>S = (1+β)(1+RB/RE) / (1+β + RB/RE)</p><p>Fixed bias is S = 1+β. IC up, VE up, VBE down, IB down. A huge RB wastes that correction.</p>",
        figCap: "The divider is emitter feedback after Thevenin.",
        source: "chip-club-edc.md §2–3, Boylestad ch. 4, Alexander §2.4 and §4.5",
        quiz: [
          { q: "Fixed-bias S is", choices: ["1", "1+β", "RB/RE", "β/RE"], answer: 1, why: "No emitter resistor. β = 100 means S = 101." },
          { q: "Collector feedback: current in RC is", choices: ["IE", "IC only", "IB only", "IC − IB"], answer: 0, why: "Base current leaves the collector node." },
          { q: "Divider shortcut is legal when", choices: ["β is infinite", "RTH ≥ β RE", "β RE ≥ 10 RTH", "RE = 0"], answer: 2, why: "Otherwise use IE = (VTH−0.7)/(RE + RTH/(β+1))." },
          { q: "Why RE stabilizes", choices: ["It raises β", "IC up, VE up, VBE down, IB down", "It shorts the collector", "S becomes 1+β"], answer: 1, why: "That is the correcting loop." }
        ],
        numerical: { prompt: "VCC = 10 V, R1 = 40 kΩ, R2 = 10 kΩ, RE = 1 kΩ, β = 100. Shortcut IC in mA.", fields: [{ key: "ic", label: "IC (mA)", target: 1.3, tol: 0.02 }], solution: "VTH = 2 V, RTH = 8 kΩ. β RE = 100 kΩ passes the 10× test. IC ≈ 1.30 mA. Exact IC is 1.19 mA." }
      }),
      L({ id: 3, title: "re, CE, CC, CB", minutes: 25, fig: "opamp",
        read: "Midband model. Bypass shorts RE. Say the four columns for each configuration.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "ACD formula sheet", href: notes.acd }
        ),
        seeTitle: "DC sets IE. AC uses re.",
        see: "<p class='eq'>re = VT/IE &nbsp; Av,CE = −RC/re &nbsp; Av,CC ≈ 1 &nbsp; Av,CB = +RC/re</p><ul class='clean'><li>CE inverts, Ri = β re, Ro = RC.</li><li>CC buffers.</li><li>CB has Ri = re and keeps gain at higher frequency.</li></ul>",
        figCap: "Unbypassed RE replaces re by re+RE.",
        source: "chip-club-edc.md §4–5, Boylestad §5.4–5.9",
        quiz: [
          { q: "re is", choices: ["VT/IE", "26 Ω at every current", "RC/Av with the sign", "β VT always"], answer: 0, why: "26 Ω is only the 1 mA case." },
          { q: "Bypassing RE", choices: ["Lowers |Av|", "Does nothing at midband", "Raises |Av| and lowers Ri", "Makes the stage CB"], answer: 2, why: "RE disappears, so |Av| = RC/re." },
          { q: "Common collector is for", choices: ["Gain RC/re and inversion", "A buffer, Av ≈ 1", "Ri = re", "Replacing RC"], answer: 1, why: "High Ri, low Ro, no voltage gain." },
          { q: "Common-base Ri is about", choices: ["re", "β re", "RC", "RE∥RC"], answer: 0, why: "Tens of ohms. Do not drive it from a soft source." }
        ],
        numerical: { prompt: "IE = 1 mA, VT = 26 mV, RC = 2.6 kΩ, RE bypassed. |Av|.", fields: [{ key: "av", label: "|Av|", target: 100, tol: 0.6 }], solution: "re = 26 Ω. |Av| = 2600/26 = 100. With RE = 260 Ω left in, |Av| = 9.1." }
      }),
      L({ id: 4, title: "Miller and feedback", minutes: 25, fig: "wave",
        read: "Why CE loses bandwidth, and what 1+Aβf buys. Name the voltage amplifier topology.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "EDC note", href: loc("sem3/_meta/chip-club-edc.md") }
        ),
        seeTitle: "One capacitor, four jobs",
        see: "<p class='eq'>Cin ≈ Cπ + Cμ(1 + gm RC)</p><p class='eq'>Af = A / (1 + A βf)</p><p>Voltage amplifier: series mixing, voltage sampling. Ri up, Ro down. βf is not the BJT β.</p>",
        figCap: "A gain of 100 turns 2 pF of Cμ into about 200 pF at the input.",
        source: "chip-club-edc.md §6, Boylestad §9.10 and §14.1–14.2",
        quiz: [
          { q: "fT is", choices: ["The bypass corner", "β fβ, where β has fallen to 1", "1/(2π RC)", "Midband gain"], answer: 1, why: "fβ is the beta cutoff. fT is unity-gain frequency." },
          { q: "Miller Cin is about", choices: ["Cπ + Cμ(1+gm RC)", "Cπ + Cμ", "Cμ/(1+gm RC)", "gm RC"], answer: 0, why: "The gain multiplies Cμ." },
          { q: "A voltage amplifier is", choices: ["Shunt–shunt", "Shunt–series", "Series–shunt", "Series–series"], answer: 2, why: "Ri up, Ro down." },
          { q: "A = 1000, βf = 0.1. If A falls 20%, Af", choices: ["Falls 20%", "Stays near 9.9", "Doubles", "Becomes 800"], answer: 1, why: "9.90, then 9.88." }
        ],
        numerical: { prompt: "A = 1000, βf = 0.1. Af to two decimals.", fields: [{ key: "af", label: "Af", target: 9.9, tol: 0.02 }], solution: "Af = 1000/101 = 9.90. After A = 800, Af = 800/81 = 9.88." }
      }),
      L({ id: 5, title: "MOSFET and CMOS", minutes: 20, fig: "diode",
        read: "Enhancement MOSFET regions, and why a settled CMOS inverter draws no static current. Club only: skip JFET chapters.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "EDC note", href: loc("sem3/_meta/chip-club-edc.md") }
        ),
        seeTitle: "Square law, one device off",
        see: "<p class='eq'>ID = ½ μCox (W/L) (VGS − Vt)² &nbsp; when VDS ≥ VGS − Vt</p><p>Triode is the closed switch. MOSFET saturation is the amplifier region. A saturated BJT is the opposite: the closed switch.</p>",
        figCap: "CMOS: input low turns NMOS off. Input high turns PMOS off.",
        source: "chip-club-edc.md §7, Boylestad §6.8 and §6.11",
        quiz: [
          { q: "NMOS saturation means", choices: ["VDS ≥ VGS−Vt and VGS > Vt", "VDS ≈ 0", "The device is the closed switch", "VGS = 0"], answer: 0, why: "Past the overdrive, ID is almost flat." },
          { q: "The MOSFET closed switch is", choices: ["Saturation", "Triode", "Cutoff", "Zener"], answer: 1, why: "Small VDS. Opposite of BJT saturation." },
          { q: "A settled CMOS inverter", choices: ["Burns current through both", "Needs base current", "Has one device off", "Uses only depletion loads"], answer: 2, why: "Current flows while the next gate charges." },
          { q: "Saturation ID depends on", choices: ["(VGS−Vt)²", "VDS² only", "VGS linearly", "The BJT exponential"], answer: 0, why: "Square law. BJT current is exponential." }
        ],
        numerical: { prompt: "μCox = 200 μA/V², W/L = 10, Vt = 0.5 V, VGS = 1.5 V, VDS = 2 V. ID in mA.", fields: [{ key: "id", label: "ID (mA)", target: 1, tol: 0.02 }], solution: "VOV = 1 V, saturation. ID = ½ × 200e−6 × 10 × 1 = 1.00 mA." }
      }),
      L({ id: 6, title: "Inverting and non-inverting", minutes: 20, fig: "opamp",
        read: "Virtual ground is not a virtual short. Draw both amplifiers and write vo.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Gaikwad on this Mac", href: loc("sem3/05-acd/resources/books/Gaikwad_Op_Amp.pdf") },
          { label: "ACD formulas", href: notes.acd }
        ),
        seeTitle: "Short is not ground",
        see: "<p class='eq'>inverting vo = −(RF/R1) vi &nbsp;&nbsp; non-inverting vo = (1+RF/R1) vi</p><p>Inverting: v+ = 0 so v− = 0, and Rin = R1. Non-inverting: v− = vi. Current through the input resistor continues through the feedback element.</p>",
        figCap: "Left has a virtual ground. Right does not.",
        source: "ACD formula sheet Unit III, Boylestad §10.4–10.5, Gaikwad ch. 3",
        quiz: [
          { q: "Virtual ground belongs to", choices: ["The inverting amp", "The non-inverting amp", "Both", "Neither"], answer: 0, why: "It needs the + pin at 0 V." },
          { q: "Non-inverting: the − pin sits at", choices: ["0", "vi", "vo", "−vi"], answer: 1, why: "Virtual short only." },
          { q: "Ideal inverting Rin is", choices: ["Infinite", "RF", "R1", "R1∥RF"], answer: 2, why: "The source sees R1 into a virtual ground." },
          { q: "Input-resistor current", choices: ["Enters the op-amp", "Goes through the feedback part", "Is zero on an inverting amp", "Comes from the + pin"], answer: 1, why: "Device input current is zero." }
        ],
        numerical: { prompt: "Inverting gain with R1 = 10 kΩ and RF = 47 kΩ.", fields: [{ key: "g", label: "Gain", target: -4.7, tol: 0.05 }], solution: "−47/10 = −4.7. A non-inverting amp with RF = 40 kΩ and R1 = 10 kΩ has gain 5." }
      }),
      L({ id: 7, title: "Apps and Schmitt", minutes: 30, fig: "opamp",
        read: "Summer, difference, follower, integrator, differentiator, instrumentation amp, comparator, Schmitt. Square into an integrator is a triangle.",
        links: links(
          { label: "Gaikwad on Drive", href: D.gaikwad },
          { label: "Gaikwad on this Mac", href: loc("sem3/05-acd/resources/books/Gaikwad_Op_Amp.pdf") },
          { label: "Neso playlists", href: Y.neso },
          { label: "ACD and DCHD card", href: loc("sem3/_meta/chip-club-acd-dchd.md") }
        ),
        seeTitle: "Two thresholds, so noise crosses once",
        see: "<p class='eq'>integrator vo = −(1/RC) ∫ vi dt &nbsp;&nbsp; differentiator vo = −RC dvi/dt</p><p class='eq'>VUT = +Vsat R1/(R1+R2) &nbsp; VLT = −VUT</p><p>Rf across the integrator C keeps DC gain finite. A series R with the differentiator C stops the gain rising forever. IA gain is (R2/R1)(1+2Rf/RG).</p>",
        figCap: "Comparator has one threshold and chatters. Schmitt remembers which side it last crossed.",
        source: "ACD formula sheet Unit III, Boylestad §11 and §13.2, Gaikwad ch. 6",
        quiz: [
          { q: "Square into an integrator comes out as", choices: ["A triangle", "Spikes", "The same square", "Zero"], answer: 0, why: "Integral of a constant is a ramp." },
          { q: "Rf across the integrator C", choices: ["Is the differentiator", "Raises ideal HF gain", "Keeps DC gain finite", "Sets Schmitt thresholds"], answer: 2, why: "Offset would otherwise ramp to the rail." },
          { q: "Differentiator gain magnitude", choices: ["Falls with frequency", "Rises with frequency", "Is 1", "Is −RF/R1"], answer: 1, why: "|vo/vi| = ω RC." },
          { q: "Inverting Schmitt VUT is", choices: ["+Vsat R1/(R1+R2)", "+Vsat R2/R1", "0", "−Vsat"], answer: 0, why: "R1 to ground, R2 from the output to +." }
        ],
        numerical: { prompt: "±Vsat = ±10 V, R1 = 10 kΩ to ground, R2 = 40 kΩ. VUT in volts.", fields: [{ key: "ut", label: "VUT (V)", target: 2, tol: 0.05 }], solution: "β = 10/50 = 0.2. VUT = +2 V, VLT = −2 V, hysteresis = 4 V." }
      }),
      L({ id: 8, title: "Boolean and K-map", minutes: 30, fig: "kmap",
        read: "SOP from 1s, POS from 0s, Gray order, don’t-cares only when they enlarge a group. NAND–NAND builds an SOP.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
          { label: "DCHD formulas", href: notes.dchd }
        ),
        seeTitle: "Circle 1s. A don’t-care is optional.",
        see: "<p class='eq'>(A+B)' = A'B' &nbsp;&nbsp; (AB)' = A'+B'</p><p>Groups of 2^k only. A group of 4 removes 2 variables. Edges wrap. F = Σ m(0,1,2,5,8,9,10) = B'D' + B'C' + A'C'D.</p>",
        figCap: "NAND is a bubbled OR. The second NAND does the OR of an SOP.",
        source: "DCHD formula sheet, Mano §2.4–2.6 and §3.2–3.6",
        quiz: [
          { q: "You circle", choices: ["1s for POS", "1s for SOP and 0s for POS", "Only don’t-cares", "Every cell"], answer: 1, why: "SOP is the 1s. POS is the 0s." },
          { q: "A don’t-care is used when", choices: ["It enlarges a legal group", "It is a required 1", "Every d must be covered", "It lets you group a 0"], answer: 0, why: "A d you skip is not a missed 1." },
          { q: "SOP in NAND only is", choices: ["NOR–NOR", "NAND plus a separate OR", "NAND–NAND", "XOR only"], answer: 2, why: "DeMorgan turns the second NAND into the OR." },
          { q: "A group of 4 removes", choices: ["1 variable", "2 variables", "4 variables", "None"], answer: 1, why: "2^k removes k variables." }
        ],
        numerical: { prompt: "How many minterms are 1 in “at least two of A, B, C”? The SOP is AB+BC+AC.", fields: [{ key: "m", label: "Number of minterms", target: 4, tol: 0 }], solution: "m3, m5, m6, m7. Four minterms. From the DCHD formula sheet, tutorial 3 irrigation." }
      }),
      L({ id: 9, title: "Adder, decoder, MUX", minutes: 20, fig: "kmap",
        read: "Full adder, adder–subtractor, decoder plus OR, MUX as a function.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
          { label: "DCHD formulas", href: notes.dchd }
        ),
        seeTitle: "Odd ones, and a data pin",
        see: "<p class='eq'>sum = A ⊕ B ⊕ Cin &nbsp;&nbsp; Cout = AB + BCin + ACin</p><p>M = 1 inverts B and sets C0 = 1. A decoder makes one line per minterm. A MUX data pin is 0, 1, D, or D'.</p>",
        figCap: "Carry is majority. Sum is parity.",
        source: "DCHD formula sheet, Mano §4.5, §4.9, §4.11",
        quiz: [
          { q: "Full-adder sum is", choices: ["A⊕B⊕Cin", "AB+Cin", "A+B+Cin", "ABC"], answer: 0, why: "1 when the number of 1s is odd." },
          { q: "Carry is 1 when", choices: ["All inputs are 0", "Exactly one input is 1", "At least two inputs are 1", "The sum is 0"], answer: 2, why: "Majority." },
          { q: "M = 1 on an adder–subtractor", choices: ["Adds B", "Inverts B and sets C0 = 1", "Disables the adder", "Swaps sum and carry"], answer: 1, why: "That adds the 2’s complement." },
          { q: "MUX data pins are wired to", choices: ["0, 1, D, or D'", "Only minterms", "Clock and reset", "The carry chain"], answer: 0, why: "The leftover variable shows up as D or D'." }
        ],
        numerical: { prompt: "A = 1, B = 1, Cin = 1. Sum (0 or 1).", fields: [{ key: "s", label: "Sum", target: 1, tol: 0 }], solution: "1⊕1⊕1 = 1. Carry is also 1." }
      }),
      L({ id: 10, title: "GBW and CMRR", minutes: 25, fig: "opamp",
        read: "Closed-loop bandwidth is GBW divided by gain. 100 dB is 10^5, not 100. This is the September ACD paper.",
        links: links(
          { label: "September paper note", href: loc("sem3/05-acd/notes/midsem-2026.md") },
          { label: "ACD formulas", href: notes.acd },
          { label: "Gaikwad on Drive", href: D.gaikwad }
        ),
        seeTitle: "One product, two gains",
        see: "<p class='eq'>f3dB = GBW / G &nbsp;&nbsp; CMRR = Ad/Acm &nbsp;&nbsp; vd = v1−v2 &nbsp; vc = (v1+v2)/2</p><p class='eq'>vo = Ad vd + Acm vc</p>",
        figCap: "Halving the gain doubles the bandwidth on the same GBW.",
        source: "ACD formula sheet Unit II, midsem-2026 Q4 and Q5, Boylestad §10.7 and §10.9",
        quiz: [
          { q: "Closed-loop 3 dB frequency is", choices: ["GBW × G", "GBW / G", "G / GBW", "The open-loop bandwidth"], answer: 1, why: "More gain, less bandwidth." },
          { q: "CMRR is", choices: ["Ad/Acm", "Acm/Ad", "Ad+Acm", "20 log vd"], answer: 0, why: "Decibels are 20 log of that ratio." },
          { q: "100 dB is a ratio of", choices: ["100", "1000", "10^5", "2"], answer: 2, why: "20 log10(10^5) = 100. A factor of 100 is 40 dB." },
          { q: "Common-mode input is", choices: ["v1−v2", "(v1+v2)/2", "v1+v2", "Ad/2"], answer: 1, why: "The shared part. The difference is vd." }
        ],
        numerical: { prompt: "Gain 100 has f3dB = 10 kHz. Highest gain that still has 20 kHz bandwidth.", fields: [{ key: "g", label: "Gain", target: 50, tol: 0.5 }], solution: "GBW = 1 MHz. At 20 kHz the gain is 50. The CMRR numerical on the paper is vo = 404 V for Ad = 200000, CMRR = 100 dB, vd = 2 mV, vc = 2 V." }
      }),
      L({ id: 11, title: "Diff pair", minutes: 25, fig: "gauss",
        read: "Matched pair, one tail, current splits in half. re uses that half. A mirror is a stiff tail.",
        links: links(
          { label: "Boylestad on this Mac", href: loc("sem3/_meta/prereq/Boylestad_Electronic_Devices_and_Circuit_Theory_11e.pdf") },
          { label: "ACD crash course", href: loc("sem3/05-acd/notes/crash-course.md") },
          { label: "September paper note", href: loc("sem3/05-acd/notes/midsem-2026.md") }
        ),
        seeTitle: "The tail splits",
        see: "<p class='eq'>IT = (|VEE| − 0.7) / RE &nbsp;&nbsp; IE1 = IE2 = IT/2</p><p>A stiffer tail lowers common-mode gain and raises CMRR. Differential gain barely moves. Do the photo of Q6 on paper after this number is easy.</p>",
        figCap: "One tail, two equal emitters, if the devices match.",
        source: "ACD crash course Block 0, Boylestad §10.2 and §4.13",
        quiz: [
          { q: "Each emitter current is", choices: ["IT/2", "IT", "2 IT", "Set by β only"], answer: 0, why: "The tail splits." },
          { q: "re of each device uses", choices: ["The whole tail", "IT/2", "Only the reference", "VCC/RC"], answer: 1, why: "VT over that half." },
          { q: "A stiffer tail", choices: ["Kills Ad", "Lowers CMRR", "Raises CMRR", "Removes the 0.7 V"], answer: 2, why: "Acm falls. Ad stays." },
          { q: "A mirror tail is about", choices: ["Equal to Iref", "β Iref", "Zero", "VBE/β"], answer: 0, why: "Iref = (VCC−VBE)/R and IT ≈ Iref." }
        ],
        numerical: { prompt: "RE = 10 kΩ to VEE = −8 V. IT in mA.", fields: [{ key: "it", label: "IT (mA)", target: 0.73, tol: 0.015 }], solution: "IT = (8−0.7)/10 kΩ = 0.73 mA. Each IE = 0.365 mA." }
      })
    ]
  }
];
window.D = D;
window.Y = Y;
window.notes = notes;
window.loc = loc;
window.L = L;
window.links = links;
