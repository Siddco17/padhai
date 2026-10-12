/* global HOME, loc, D, Y, notes, L, links, SUBJECTS */
window.SUBJECTS.push(
  {
    id: "dchd", short: "D", code: "ECL216", title: "DCHD",
    blurb: "Numbers through hazards",
    links: [
      { label: "Mano on Drive", href: D.mano },
      { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
      { label: "Kohavi on Drive", href: D.kohavi },
      { label: "Formula sheet", href: notes.dchd }
    ],
    sheet: [
      "Hex ↔ 4 bits, octal ↔ 3 bits, always through binary. 2’s complement: copy through the first 1, invert the rest.",
      "A+AB = A. A+A'B = A+B. Consensus drops BC from AB+A'C+BC. NAND is bubbled-OR.",
      "SOP circles 1s. POS circles 0s. Group size 2^k removes k variables. Don’t-cares only if they enlarge a group.",
      "SOP → NAND–NAND. POS → NOR–NOR.",
      "Full adder: sum = A⊕B⊕Cin, Cout = AB+BCin+ACin. M = 1 subtracts.",
      "D: Q+ = D. T: Q+ = T⊕Q. JK: Q+ = JQ' + K'Q. SR must not be 11.",
      "Moore output depends on state only. Mealy output depends on state and input.",
      "A race is two state bits changing at once. Gray-code the used arcs."
    ],
    lessons: [
      L({ id: 1, title: "Number systems", minutes: 25, fig: "kmap",
        read: "Place value, hex and octal grouping, 2’s complement subtraction. Skip codes you will not be asked to invent.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
          { label: "Formula sheet", href: notes.dchd }
        ),
        seeTitle: "Group from the radix point",
        see: "<p class='eq'>(N)b = Σ dk b^k</p><p>Octal is 3 bits. Hex is 4 bits. Hex to octal goes through binary. 2’s complement of an n-bit number is 2^n − N. Subtract by adding that and dropping the end carry.</p>",
        figCap: "Pad zeros outside the point, never across it.",
        source: "sem3/02-dchd/notes/midsem-formulas.md, Mano ch. 1",
        quiz: [
          { q: "One hex digit is", choices: ["3 bits", "4 bits", "8 bits", "One octal digit"], answer: 1, why: "Octal is 3. Hex is 4." },
          { q: "Hex to octal", choices: ["Digit by digit", "Through binary", "Through decimal only", "Is impossible"], answer: 1, why: "3 and 4 do not divide each other." },
          { q: "2’s complement shortcut", choices: ["Invert every bit", "Copy through the first 1, invert the rest", "Add 1 to every bit", "Swap nibbles"], answer: 1, why: "Same as invert-and-add-1." },
          { q: "End-around carry belongs to", choices: ["2’s complement", "1’s complement", "BCD", "Gray code"], answer: 1, why: "1’s complement adds the carry back. 2’s drops it." }
        ],
        numerical: { prompt: "Convert 110001.10 binary to decimal.", fields: [{ key: "n", label: "Decimal", target: 49.5, tol: 0.01 }], solution: "32+16+1+0.5 = 49.5. From the DCHD crash course, Block 0." }
      }),
      L({ id: 2, title: "Boolean and K-maps", minutes: 30, fig: "kmap",
        read: "The laws that delete terms, then one map. Circle 1s for SOP.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
          { label: "Neso playlists", href: Y.neso },
          { label: "Formula sheet", href: notes.dchd }
        ),
        seeTitle: "Absorption, then groups",
        see: "<p class='eq'>A+AB = A &nbsp; A+A'B = A+B &nbsp; AB+A'C+BC = AB+A'C</p><p>Gray order 00, 01, 11, 10. A quad kills two variables. NAND–NAND is the two-level SOP.</p>",
        figCap: "Don’t-cares join a group only when the group gets bigger.",
        source: "DCHD formula sheet, Mano §2 and §3",
        quiz: [
          { q: "A+A'B equals", choices: ["A", "A+B", "B", "A'B"], answer: 1, why: "The term that actually deletes a literal." },
          { q: "Consensus drops", choices: ["AB", "A'C", "BC", "Nothing"], answer: 2, why: "AB+A'C already covers BC." },
          { q: "SOP two-level gates are", choices: ["NOR–NOR", "NAND–NAND", "AND–OR only, no NAND", "XOR"], answer: 1, why: "POS is NOR–NOR." },
          { q: "A quad removes", choices: ["1 variable", "2 variables", "4 variables", "0"], answer: 1, why: "2^2." }
        ],
        numerical: { prompt: "At least two of A, B, C is AB+BC+AC. How many minterms?", fields: [{ key: "m", label: "Minterms", target: 4, tol: 0 }], solution: "m3, m5, m6, m7. Four. Tutorial 3 irrigation." }
      }),
      L({ id: 3, title: "Adders and MUX", minutes: 20, fig: "kmap",
        read: "Half adder, full adder, M = 1 for subtract, decoder-plus-OR, MUX data pins.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
          { label: "Formula sheet", href: notes.dchd }
        ),
        seeTitle: "Odd sum, majority carry",
        see: "<p class='eq'>sum = A⊕B⊕Cin &nbsp; Cout = AB+BCin+ACin</p><p>M = 1 inverts B and injects +1. Leftover-variable MUX pins are 0, 1, D, or D'.</p>",
        figCap: "Decoder outputs are minterms. OR the 1s.",
        source: "DCHD formula sheet, Mano §4",
        quiz: [
          { q: "Carry is 1 when", choices: ["The sum is 1", "Exactly one input is 1", "At least two inputs are 1", "Cin is 0"], answer: 2, why: "Majority." },
          { q: "M = 1 means", choices: ["Add", "Subtract by 2’s complement", "Shift", "Compare"], answer: 1, why: "Invert B and set C0 = 1." },
          { q: "A decoder plus OR builds", choices: ["A latch", "An SOP", "A clock", "A RAM cell"], answer: 1, why: "Each output is a minterm." },
          { q: "MUX data for the leftover variable is", choices: ["0, 1, D, or D'", "Only 0 and 1", "The clock", "Always D"], answer: 0, why: "D' is how you invert that variable." }
        ],
        numerical: { prompt: "A = 1, B = 0, Cin = 1. Carry (0 or 1).", fields: [{ key: "c", label: "Carry", target: 1, tol: 0 }], solution: "Two 1s. Carry = 1. Sum = 0." }
      }),
      L({ id: 4, title: "Quine–McCluskey", minutes: 25, fig: "kmap",
        read: "Combine minterms that differ by one bit. Don’t-cares may be combined. They are not columns you must cover.",
        links: links(
          { label: "Kohavi on Drive", href: D.kohavi },
          { label: "Kohavi on this Mac", href: loc("sem3/02-dchd/resources/books/Kohavi_Jha_Switching_and_Finite_Automata.pdf") },
          { label: "Formula sheet", href: notes.dchd }
        ),
        seeTitle: "Dash means that bit died",
        see: "<p>List 1s and don’t-cares by number of 1s. Combine pairs that differ in one bit and write a dash. Unticked terms are prime implicants. Essential primes are the only cover of some required 1. Don’t-care columns are absent from the chart.</p>",
        figCap: "Two different minimum covers means the SOP is not unique.",
        source: "DCHD formula sheet, Quine–McCluskey steps",
        quiz: [
          { q: "You may combine two terms when they differ in", choices: ["One bit", "Two bits", "Every bit", "The MSB only"], answer: 0, why: "One bit becomes a dash." },
          { q: "A prime implicant is", choices: ["Any product", "An unticked term that grew as far as it can", "Only an essential one", "A don’t-care"], answer: 1, why: "Essential means it is the only cover of some 1." },
          { q: "Don’t-cares on the PI chart", choices: ["Must be columns", "Are not columns", "Must be covered", "Are always essential"], answer: 1, why: "Columns are required 1s only." },
          { q: "Dashes must", choices: ["Line up to combine again", "Be removed", "Sit in the MSB", "Cover a 0"], answer: 0, why: "You only merge terms whose dashes match." }
        ],
        numerical: null
      }),
      L({ id: 5, title: "Flip-flops and counters", minutes: 25, fig: "tree",
        read: "Characteristic equations and the excitation table. Unused counter states must return to the cycle.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "Mano on this Mac", href: loc("sem3/02-dchd/resources/books/Mano_Ciletti_Digital_Design_5e.pdf") },
          { label: "Neso playlists", href: Y.neso },
          { label: "Formula sheet", href: notes.dchd }
        ),
        seeTitle: "Next state from the present bit",
        see: "<p class='eq'>D: Q+ = D &nbsp; T: Q+ = T⊕Q &nbsp; JK: Q+ = JQ' + K'Q</p><p>SR = 11 is illegal. A lock-free counter gives every unused state a path home. Excitation: 0→1 needs T = 1 and D = 1.</p>",
        figCap: "Moore waits for the clock. The excitation table is what you fill before drawing gates.",
        source: "DCHD formula sheet, sequential one-pager",
        quiz: [
          { q: "D flip-flop next state is", choices: ["D'", "D", "T⊕Q", "J+K"], answer: 1, why: "Q+ = D." },
          { q: "T = 1 does", choices: ["Holds Q", "Toggles Q", "Sets Q", "Clears Q"], answer: 1, why: "Q+ = T⊕Q." },
          { q: "SR = 11 is", choices: ["Hold", "Toggle", "Illegal", "The same as JK = 11"], answer: 2, why: "JK = 11 toggles. SR = 11 is forbidden." },
          { q: "A lock-free counter", choices: ["Traps unused states", "Returns unused states to the cycle", "Has no clock", "Uses only SR"], answer: 1, why: "No dead state." }
        ],
        numerical: { prompt: "Present Q = 0, next Q = 1. What T input is required? 0 or 1.", fields: [{ key: "t", label: "T", target: 1, tol: 0 }], solution: "0→1 needs T = 1. D would also be 1. JK is 1X." }
      }),
      L({ id: 6, title: "Moore and Mealy", minutes: 20, fig: "tree",
        read: "Output of a Moore machine is a function of state. Mealy also looks at the input. Overlap reuses the suffix.",
        links: links(
          { label: "Kohavi on Drive", href: D.kohavi },
          { label: "Concept note", href: loc("sem3/_concepts/Moore and Mealy.md") },
          { label: "Neso playlists", href: Y.neso }
        ),
        seeTitle: "When the output is allowed to move",
        see: "<p>Moore output changes after the clock, because the state changes then. Mealy output can change in the same cycle as the input. Overlapping detection of 1101 keeps the suffix. Non-overlapping resets to the start state.</p>",
        figCap: "Same 1s, different next-state arcs, if overlap changes.",
        source: "DCHD formula sheet, concept Moore and Mealy",
        quiz: [
          { q: "Moore output depends on", choices: ["Input only", "State only", "State and input", "The clock pin voltage"], answer: 1, why: "Mealy adds the input." },
          { q: "Mealy output can change", choices: ["Only after the next clock", "When the input changes, in that cycle", "Never", "Only at reset"], answer: 1, why: "It is a function of the input now." },
          { q: "Overlapping 1101", choices: ["Always resets to S0", "Reuses the suffix", "Ignores the last 1", "Is a Moore-only idea"], answer: 1, why: "The last 1 can start the next pattern." },
          { q: "Non-overlapping detection", choices: ["Reuses the suffix", "Resets toward the start after a hit", "Has no states", "Cannot be Mealy"], answer: 1, why: "The formula sheet’s endsem detector is the non-overlap one." }
        ],
        numerical: null
      }),
      L({ id: 7, title: "Hazards and memory", minutes: 20, fig: "kmap",
        read: "A static-1 hazard is a 1 that dips to 0 because two gates disagree for a moment. A race changes two state bits at once.",
        links: links(
          { label: "Kohavi on Drive", href: D.kohavi },
          { label: "Kohavi on this Mac", href: loc("sem3/02-dchd/resources/books/Kohavi_Jha_Switching_and_Finite_Automata.pdf") },
          { label: "DCHD hub", href: loc("sem3/02-dchd/DCHD.md") }
        ),
        seeTitle: "Cover the adjacent 1s",
        see: "<p>A static-1 hazard sits where two product terms of 1s touch but are not inside one group. Add the consensus term. A critical race has two unstable paths to different stable states. Gray-code the assignment so one bit moves.</p><p>ROM stores a fixed table. SRAM is read-write and needs a write enable. A PLA is an AND plane plus an OR plane.</p>",
        figCap: "Adjacent 1s that are not in the same circle can glitch.",
        source: "DCHD hub units 2 and 6, formula sheet race paragraph",
        quiz: [
          { q: "A static-1 hazard is cured by", choices: ["Deleting a prime", "Adding the consensus product", "Using a slower clock only", "Removing all don’t-cares"], answer: 1, why: "Cover the pair of adjacent 1s with one term." },
          { q: "A race is", choices: ["One bit changing", "Two or more state bits changing together", "A Mealy output", "A don’t-care"], answer: 1, why: "Gray adjacency kills it." },
          { q: "A critical race", choices: ["Ends in one stable state either way", "Can end in different stables", "Is only combinational", "Needs SR = 11"], answer: 1, why: "The destination depends on which bit wins." },
          { q: "A PLA is", choices: ["AND plane plus OR plane", "Only a ROM", "A flip-flop", "A MUX tree"], answer: 0, why: "Program both planes. A PAL programs the AND plane." }
        ],
        numerical: null
      }),
      L({ id: 8, title: "Timing in words", minutes: 15, fig: "sample",
        read: "What setup, hold, and contamination mean. This is not a Verilog lab.",
        links: links(
          { label: "Mano on Drive", href: D.mano },
          { label: "HDL concept", href: loc("sem3/_concepts/HDL.md") },
          { label: "DCHD hub", href: loc("sem3/02-dchd/DCHD.md") }
        ),
        seeTitle: "The data has to be quiet around the clock",
        see: "<p>Setup time: data must be stable before the clock edge. Hold time: data must stay stable after the edge. Slack is how much the path beats the clock period. A hold violation is not fixed by slowing the clock. A setup violation often is.</p>",
        figCap: "Slowing the clock gives setup more time. Hold does not care about the period.",
        source: "DCHD hub unit 4, concept HDL",
        quiz: [
          { q: "Setup time is measured", choices: ["After the edge", "Before the edge", "Between two data pins", "Only for async resets"], answer: 1, why: "Data must already be valid when the edge arrives." },
          { q: "Hold time is measured", choices: ["Before the edge", "After the edge", "At the power pin", "Once per reset"], answer: 1, why: "Data must not change immediately after the capture." },
          { q: "Slowing the clock fixes", choices: ["Hold, usually", "Setup, often", "Both equally", "Neither"], answer: 1, why: "Hold is a minimum-delay problem. More period does not help." },
          { q: "Slack positive means", choices: ["The path missed", "The path met the requirement with time left", "The clock stopped", "Hold failed"], answer: 1, why: "Required time minus arrival time, when positive, is margin." }
        ],
        numerical: null
      })
    ]
  },
  {
    id: "sns", short: "S", code: "ECL211", title: "Signals and Systems",
    blurb: "Energy through Z",
    links: [
      { label: "Oppenheim on Drive", href: D.oppenheim },
      { label: "Oppenheim on this Mac", href: loc("sem3/03-sns/resources/books/Oppenheim_Signals_and_Systems.pdf") },
      { label: "MIT 6.003 videos", href: Y.ocw },
      { label: "Formula sheet", href: notes.sns }
    ],
    sheet: [
      "Energy integrates |x|². Power divides by the length. A finite pulse is energy. A forever sine is power.",
      "Scale first, then shift. |a| > 1 compresses. a < 0 also flips.",
      "DT cosine is periodic only if ω/2π is rational. cos(0.2π n) has N = 10. cos(2n) is not periodic.",
      "Linear = homogeneous and additive. y = 2x+3 fails both. y = t x fails time-invariance.",
      "y[n] = Σ x[k] h[n−k]. Causal LTI means h = 0 for negative time. BIBO means Σ|h| is finite.",
      "Two width-T rects convolve to a triangle of width 2T.",
      "Sampling: fs > 2 fmax or the sine aliases. Unique digital frequency lives in (−π, π].",
      "Laplace of a causal exponential e^{−at}u(t) is 1/(s+a), ROC Re(s) > −a.",
      "Z of a^n u[n] is 1/(1−a z^{−1}), ROC |z| > |a|."
    ],
    lessons: [
      L({ id: 1, title: "Energy and power", minutes: 20, fig: "pulse",
        read: "Finite support is energy. Eternal sine, step, and periodic signals are power. Do not mix the sum with the integral.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Oppenheim on this Mac", href: loc("sem3/03-sns/resources/books/Oppenheim_Signals_and_Systems.pdf") },
          { label: "Formula sheet", href: notes.sns }
        ),
        seeTitle: "Square it, then average or don’t",
        see: "<p class='eq'>E = ∫ |x|² dt &nbsp;&nbsp; P = lim (1/2T) ∫ |x|² dt</p><p>x[n] = a^n u[n] with |a| &lt; 1 has E = 1/(1−|a|²) and P = 0. A ramp t is neither: both E and P blow up.</p>",
        figCap: "Left dies, so energy is finite. Right never dies, so you talk about power.",
        source: "SnS formula sheet, Oppenheim ch. 1",
        quiz: [
          { q: "A finite pulse is", choices: ["Power", "Energy", "Neither", "Periodic"], answer: 1, why: "E is finite, so P is 0." },
          { q: "A forever sine is", choices: ["Energy", "Power", "Neither", "Zero"], answer: 1, why: "E is infinite. P is finite." },
          { q: "Scale |a| > 1", choices: ["Stretches time", "Compresses time", "Only flips amplitude", "Removes the signal"], answer: 1, why: "Then shift by b/a, not by b." },
          { q: "Even part is", choices: ["(x(t)−x(−t))/2", "(x(t)+x(−t))/2", "x(t)u(t)", "x(−t)"], answer: 1, why: "Odd is the minus." }
        ],
        numerical: { prompt: "x[n] = (1/2)^n u[n]. Energy E.", fields: [{ key: "e", label: "E", target: 1.333, tol: 0.02 }], solution: "E = 1/(1−0.25) = 4/3 ≈ 1.333. Power is 0." }
      }),
      L({ id: 2, title: "System properties", minutes: 25, fig: "conv",
        read: "Write both sides of each test. The traps are the offset, the t multiplier, and the look-ahead.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Formula sheet", href: notes.sns },
          { label: "MIT 6.003", href: Y.ocw }
        ),
        seeTitle: "Five tests, both sides",
        see: "<ul class='clean'><li>Linear: scale and add.</li><li>Time-invariant: a shift in gives the same shift out.</li><li>Causal: y(t0) uses only t ≤ t0.</li><li>Memoryless: y(t) uses only x(t).</li><li>BIBO: bounded in, bounded out.</li></ul><p>y = 2x+3 fails linear. y = t x fails time-invariant. y = x(t+1) fails causal. y = cos(t+1) x(t) is causal: the cosine is a coefficient.</p>",
        figCap: "Superposition is two tests, not one word.",
        source: "SnS formula sheet, systems table",
        quiz: [
          { q: "y = 2x+3 fails", choices: ["Only causality", "Homogeneous and additive", "Only stability", "Nothing"], answer: 1, why: "The +3 is an offset." },
          { q: "y = t x(t) fails", choices: ["Time-invariance", "Memory", "Nothing", "Additivity only"], answer: 0, why: "The t is glued to absolute time." },
          { q: "y = x(t+1) is", choices: ["Causal", "Non-causal", "Memoryless and causal", "BIBO only"], answer: 1, why: "It peeks one step ahead." },
          { q: "y = cos(t+1) x(t) is", choices: ["Non-causal", "Causal", "Using x(t+1)", "Unstable for every x"], answer: 1, why: "The cosine is not a shifted x." }
        ],
        numerical: null
      }),
      L({ id: 3, title: "Convolution", minutes: 25, fig: "conv",
        read: "Flip h, slide, multiply, add. Cascade is convolution of the h’s. Parallel is addition.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Oppenheim on this Mac", href: loc("sem3/03-sns/resources/books/Oppenheim_Signals_and_Systems.pdf") },
          { label: "MIT 6.003", href: Y.ocw },
          { label: "Formula sheet", href: notes.sns }
        ),
        seeTitle: "Flip, slide, overlap",
        see: "<p class='eq'>y[n] = Σ x[k] h[n−k]</p><p>x∗δ = x. Two width-T rectangles make a triangle of width 2T. Causal LTI means h is zero before 0. BIBO means the absolute impulse response sums (or integrates) to a finite number. h = u is causal and unstable.</p>",
        figCap: "The value of y at one time is the overlap at that shift.",
        source: "SnS formula sheet, Oppenheim convolution chapter",
        quiz: [
          { q: "Cascade of two LTI systems", choices: ["Adds the h’s", "Convolves the h’s", "Multiplies the inputs", "Takes the max h"], answer: 1, why: "Parallel adds h." },
          { q: "h = u(t) is", choices: ["Unstable", "Non-causal", "Zero", "An impulse"], answer: 0, why: "∫|h| is infinite. It is still causal." },
          { q: "x∗δ(t−t0) is", choices: ["0", "x(t−t0)", "δ(t)", "x(t)+t0"], answer: 1, why: "An impulse copies the signal to its location." },
          { q: "Two width-T rects convolve to a triangle of width", choices: ["T", "2T", "T/2", "T²"], answer: 1, why: "The overlap starts at 0 and ends at 2T." }
        ],
        numerical: { prompt: "Period N of cos(0.2 π n). Smallest positive integer.", fields: [{ key: "n", label: "N", target: 10, tol: 0 }], solution: "ω/2π = 0.1 = 1/10. N = 10. cos(2n) is not periodic." }
      }),
      L({ id: 4, title: "Fourier series", minutes: 20, fig: "wave",
        read: "A periodic signal is a sum of harmonically related sinusoids. The fundamental is 2π/T.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Formula sheet", href: notes.sns },
          { label: "MIT 6.003", href: Y.ocw }
        ),
        seeTitle: "One period sets the spacing",
        see: "<p class='eq'>Ω0 = 2π/T</p><p>Coefficients see one period only. Parseval puts the power in the coefficients. A real even signal has real coefficients. A real odd signal has imaginary ones.</p>",
        figCap: "Harmonics sit at k times the fundamental, not at arbitrary frequencies.",
        source: "SnS formula sheet and crash course, Oppenheim FS chapter",
        quiz: [
          { q: "Fundamental frequency for period T is", choices: ["T", "2π/T", "T/2π", "π T"], answer: 1, why: "Ω0 = 2π/T." },
          { q: "FS coefficients are computed from", choices: ["All time", "One period", "Only t = 0", "The ROC"], answer: 1, why: "The rest repeats." },
          { q: "A real even periodic signal has FS coefficients that are", choices: ["Real", "Pure imaginary", "Always zero", "Only at k = 0"], answer: 0, why: "Odd real signals give imaginary coefficients." },
          { q: "Line spacing in the spectrum is", choices: ["1", "Ω0", "Random", "π"], answer: 1, why: "k Ω0." }
        ],
        numerical: { prompt: "Period T = 4. Fundamental Ω0.", fields: [{ key: "w", label: "Ω0", target: 1.571, tol: 0.02 }], solution: "Ω0 = 2π/4 = π/2 ≈ 1.571." }
      }),
      L({ id: 5, title: "Fourier transform", minutes: 20, fig: "wave",
        read: "The transform integrates against e^{−jΩt}. A rect in time is a sinc in frequency. Convolution in time is multiplication in frequency.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Oppenheim on this Mac", href: loc("sem3/03-sns/resources/books/Oppenheim_Signals_and_Systems.pdf") },
          { label: "MIT 6.003", href: Y.ocw }
        ),
        seeTitle: "Time multiply, frequency convolve",
        see: "<p class='eq'>X(jΩ) = ∫ x(t) e^{−jΩt} dt</p><p>Delay multiplies by e^{−jΩt0}. Differentiation multiplies by jΩ. A DC value is an impulse at Ω = 0. Duality swaps the pictures with a 2π.</p>",
        figCap: "A narrow pulse has a wide spectrum.",
        source: "SnS concept Fourier series and transform, Oppenheim FT chapter",
        quiz: [
          { q: "Convolution in time is", choices: ["Convolution in frequency", "Multiplication in frequency", "Addition in frequency", "A delay"], answer: 1, why: "The other way: multiply in time, convolve in frequency." },
          { q: "A delay t0 multiplies X by", choices: ["jΩ", "e^{−jΩ t0}", "2π", "0"], answer: 1, why: "Linear phase." },
          { q: "d/dt in time multiplies by", choices: ["jΩ", "e^{−jΩt}", "1/jΩ", "T"], answer: 0, why: "Integration divides by jΩ, with a possible impulse at 0." },
          { q: "A very narrow time pulse has a spectrum that is", choices: ["Also narrow", "Wide", "Zero", "Only at one line"], answer: 1, why: "Time and frequency trade width." }
        ],
        numerical: null
      }),
      L({ id: 6, title: "Sampling", minutes: 20, fig: "sample",
        read: "fs must exceed twice the highest frequency. Otherwise a high sine looks like a low one.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "MIT 6.003", href: Y.ocw },
          { label: "Concept note", href: loc("sem3/_concepts/Sampling and aliasing.md") }
        ),
        seeTitle: "Two samples per cycle is the edge",
        see: "<p class='eq'>fs &gt; 2 fmax</p><p>The copies of the spectrum sit every fs. If they overlap, you cannot get the original back with a lowpass. Unique digital frequency lives in (−π, π]. cos(2π·0.6 n) = cos(2π·0.4 n).</p>",
        figCap: "The dots can belong to a slower sine if you sampled too slowly.",
        source: "SnS formula sheet, sampling concept, Oppenheim sampling chapter",
        quiz: [
          { q: "Nyquist rate is", choices: ["fmax", "2 fmax", "fmax/2", "π fmax"], answer: 1, why: "You must sample strictly faster than that to reconstruct." },
          { q: "Aliasing is", choices: ["A gain error", "A high frequency landing on a low one", "A DC offset", "Noise only"], answer: 1, why: "The spectrum copies overlap." },
          { q: "cos(2π·0.6 n) equals", choices: ["cos(2π·0.4 n)", "cos(2π·0.6 n) only, no alias", "0", "a non-periodic signal"], answer: 0, why: "0.6 and −0.4 differ by 1." },
          { q: "Reconstruction uses", choices: ["A highpass", "A lowpass cutoff at fs/2", "A differentiator", "Nothing, samples are the signal"], answer: 1, why: "Keep the baseband copy." }
        ],
        numerical: { prompt: "Highest frequency 5 kHz. Nyquist rate in Hz.", fields: [{ key: "fs", label: "Hz", target: 10000, tol: 1 }], solution: "2 × 5000 = 10000 Hz. Sample faster than this to reconstruct." }
      }),
      L({ id: 7, title: "Laplace", minutes: 20, fig: "wave",
        read: "The transform is not enough. The ROC says which signals share that algebra.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Concept note", href: loc("sem3/_concepts/Laplace transform.md") },
          { label: "Formula sheet", href: notes.sns }
        ),
        seeTitle: "Poles, and which side of them you keep",
        see: "<p class='eq'>e^{−at} u(t) ↔ 1/(s+a), &nbsp; ROC Re(s) &gt; −a</p><p>A right-sided signal has an ROC to the right of the rightmost pole. A left-sided signal has it to the left. The Fourier transform exists when the jΩ axis is inside the ROC. Causal and stable means all poles are in the left half-plane.</p>",
        figCap: "Same fraction, different ROC, different time signal.",
        source: "Laplace concept, SnS unit 6",
        quiz: [
          { q: "e^{−2t} u(t) has a pole at", choices: ["2", "−2", "0", "j2"], answer: 1, why: "1/(s+2)." },
          { q: "ROC of that causal exponential is", choices: ["Re(s) > −2", "Re(s) < −2", "The whole plane", "Only s = 0"], answer: 0, why: "Right of the pole." },
          { q: "Fourier exists when", choices: ["There is any pole", "The jΩ axis is in the ROC", "The signal is left-sided", "ROC is empty"], answer: 1, why: "s = jΩ must be allowed." },
          { q: "Causal and stable means poles are", choices: ["In the right half", "On the jΩ axis", "In the left half", "At infinity only"], answer: 2, why: "Right-sided ROC includes the axis only if every pole is to the left of it." }
        ],
        numerical: { prompt: "Pole of 1/(s+3). The number s.", fields: [{ key: "p", label: "Pole", target: -3, tol: 0 }], solution: "s+3 = 0, so s = −3. Causal ROC is Re(s) > −3." }
      }),
      L({ id: 8, title: "Z transform", minutes: 20, fig: "sample",
        read: "Same idea as Laplace, on a circle. ROC is an annulus. The unit circle is the DT Fourier axis.",
        links: links(
          { label: "Oppenheim on Drive", href: D.oppenheim },
          { label: "Concept note", href: loc("sem3/_concepts/Z-transform.md") },
          { label: "Formula sheet", href: notes.sns }
        ),
        seeTitle: "Poles inside the circle if you want stability",
        see: "<p class='eq'>a^n u[n] ↔ 1/(1 − a z^{−1}), &nbsp; |z| &gt; |a|</p><p>Causal and stable means every pole is inside the unit circle, so the ROC includes |z| = 1. Multiplication by n is −z d/dz.</p>",
        figCap: "Unit circle in, Fourier exists. Poles inside it, a causal system is stable.",
        source: "Z-transform concept, SnS unit 6",
        quiz: [
          { q: "Z of a^n u[n] converges for", choices: ["|z| < |a|", "|z| > |a|", "All z", "z = 0 only"], answer: 1, why: "Right-sided: outside the pole." },
          { q: "DT Fourier exists when the ROC includes", choices: ["z = 0", "The unit circle", "The negative real axis only", "Infinity only"], answer: 1, why: "z = e^{jω}." },
          { q: "A causal stable system has poles", choices: ["Outside the unit circle", "Inside the unit circle", "Only at z = 1", "In the right half of s, always"], answer: 1, why: "Then |z| > |pole| includes |z| = 1." },
          { q: "Pole of 1/(1 − 0.5 z^{−1}) has magnitude", choices: ["2", "0.5", "0", "1"], answer: 1, why: "z = 0.5." }
        ],
        numerical: { prompt: "Magnitude of the pole of 1/(1 − 0.5 z^{−1}).", fields: [{ key: "a", label: "|pole|", target: 0.5, tol: 0.01 }], solution: "Pole at z = 0.5. Causal ROC is |z| > 0.5, which includes the unit circle, so it is stable." }
      })
    ]
  }
);
