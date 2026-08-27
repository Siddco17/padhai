#!/usr/bin/env python3
"""Solve DCHD Tutorial 1 number-system conversions with exact arithmetic."""

from fractions import Fraction

DIGITS = "0123456789ABCDEF"


def parse(s: str, base: int) -> Fraction:
    s = s.strip().upper()
    if "." in s:
        ip, fp = s.split(".", 1)
    else:
        ip, fp = s, ""
    value = Fraction(int(ip, base) if ip else 0)
    for i, d in enumerate(fp, 1):
        value += Fraction(int(d, base), base**i)
    return value


def to_base(frac: Fraction, base: int, max_frac: int = 24) -> str:
    if frac < 0:
        return "-" + to_base(-frac, base, max_frac)
    integer = int(frac)
    rem = frac - integer
    if integer == 0:
        int_str = "0"
    else:
        digits = []
        n = integer
        while n:
            n, r = divmod(n, base)
            digits.append(DIGITS[r])
        int_str = "".join(reversed(digits))
    if rem == 0:
        return int_str
    frac_digits = []
    seen: dict[Fraction, int] = {}
    while rem != 0 and len(frac_digits) < max_frac:
        if rem in seen:
            start = seen[rem]
            non_rep = "".join(frac_digits[:start])
            rep = "".join(frac_digits[start:])
            return f"{int_str}.{non_rep}({rep})"
        seen[rem] = len(frac_digits)
        rem *= base
        digit = int(rem)
        frac_digits.append(DIGITS[digit])
        rem -= digit
    return int_str + "." + "".join(frac_digits)


def bin_group(s: str, group: int) -> str:
    """Binary → octal (3) or hex (4) by grouping bits. Handles fractions."""
    s = s.strip()
    if "." in s:
        ip, fp = s.split(".", 1)
    else:
        ip, fp = s, ""
    ip = ip.lstrip("0") or "0"
    pad_l = (group - len(ip) % group) % group
    ip = "0" * pad_l + ip
    if fp:
        pad_r = (group - len(fp) % group) % group
        fp = fp + "0" * pad_r
    digits_map = DIGITS
    int_digits = "".join(digits_map[int(ip[i : i + group], 2)] for i in range(0, len(ip), group))
    int_digits = int_digits.lstrip("0") or "0"
    if not fp:
        return int_digits
    frac_digits = "".join(digits_map[int(fp[i : i + group], 2)] for i in range(0, len(fp), group))
    return f"{int_digits}.{frac_digits}"


def fmt(val: Fraction, dest: int, src_base: int | None = None, src_str: str | None = None) -> str:
    if dest == 8 and src_base == 2 and src_str is not None:
        return bin_group(src_str, 3)
    if dest == 16 and src_base == 2 and src_str is not None:
        return bin_group(src_str, 4)
    if dest == 2 and src_base == 8 and src_str is not None:
        return oct_to_bin(src_str)
    if dest == 2 and src_base == 16 and src_str is not None:
        return hex_to_bin(src_str)
    return to_base(val, dest)


def oct_to_bin(s: str) -> str:
    s = s.strip()
    table = {str(i): f"{i:03b}" for i in range(8)}
    if "." in s:
        ip, fp = s.split(".", 1)
    else:
        ip, fp = s, ""
    ib = "".join(table[d] for d in ip).lstrip("0") or "0"
    if not fp:
        return ib
    fb = "".join(table[d] for d in fp)
    return f"{ib}.{fb}"


def hex_to_bin(s: str) -> str:
    s = s.strip().upper()
    table = {DIGITS[i]: f"{i:04b}" for i in range(16)}
    if "." in s:
        ip, fp = s.split(".", 1)
    else:
        ip, fp = s, ""
    ib = "".join(table[d] for d in ip).lstrip("0") or "0"
    if not fp:
        return ib
    fb = "".join(table[d] for d in fp)
    return f"{ib}.{fb}"


def sub(title: str, src: int, dest: int, items: list[str]) -> str:
    lines = [f"### {title}", ""]
    for i, raw in enumerate(items):
        letter = chr(ord("a") + i)
        val = parse(raw, src)
        out = fmt(val, dest, src, raw)
        sub_src = {2: "₂", 5: "₅", 8: "₈", 10: "₁₀", 16: "₁₆"}[src]
        sub_dst = {2: "₂", 5: "₅", 8: "₈", 10: "₁₀", 16: "₁₆"}[dest]
        lines.append(f"({letter}) ({raw}){sub_src} = ({out}){sub_dst}")
    lines.append("")
    return "\n".join(lines)


SET1 = [
    (
        "Convert Binary Number to Decimal",
        2,
        10,
        [
            "101",
            "1101",
            "10011",
            "11110",
            "101101",
            "1100110",
            "10111001",
            "11100111",
            "100110101",
            "1101011100",
            "11101011011",
            "101101011101",
            "1101110010110",
            "11110010110111",
            "101101110101101",
        ],
    ),
    (
        "Convert Binary Number to Octal",
        2,
        8,
        [
            "111",
            "10101",
            "110011",
            "1110101",
            "10110111",
            "110101011",
            "1110011101",
            "10111010110",
            "111010110011",
            "1011011101011",
            "11011101011101",
            "101101011100111",
            "1110010110101111",
            "10111010110101101",
            "111011010111001011",
        ],
    ),
    (
        "Convert Binary Number to Hexadecimal",
        2,
        16,
        [
            "1111",
            "10101",
            "110011",
            "1110101",
            "10110111",
            "110101011",
            "1110011101",
            "10111010110",
            "111010110011",
            "1011011101011",
            "11011101011101",
            "101101011100111",
            "1110010110101111",
            "10111010110101101",
            "111011010111001011",
        ],
    ),
    (
        "Convert Binary Number to Base-5",
        2,
        5,
        [
            "110",
            "1011",
            "11010",
            "101101",
            "111011",
            "1001011",
            "11010110",
            "111001011",
            "1011011101",
            "11011100101",
            "111101011011",
            "1010111011011",
            "11010110111001",
            "111010111101011",
            "1011011101011011",
        ],
    ),
    (
        "Convert Decimal Number to Binary",
        10,
        2,
        [
            "9",
            "14",
            "27",
            "45",
            "63",
            "74",
            "125",
            "158",
            "247",
            "386",
            "511",
            "768",
            "1023",
            "2046",
            "4093",
        ],
    ),
    (
        "Convert Decimal Number to Octal",
        10,
        8,
        [
            "8",
            "17",
            "29",
            "43",
            "64",
            "91",
            "126",
            "175",
            "248",
            "375",
            "512",
            "729",
            "1024",
            "2048",
            "4095",
        ],
    ),
    (
        "Convert Decimal Number to Hexadecimal",
        10,
        16,
        [
            "11",
            "25",
            "42",
            "60",
            "95",
            "127",
            "186",
            "255",
            "382",
            "511",
            "768",
            "1023",
            "2047",
            "4095",
            "8190",
        ],
    ),
    (
        "Convert Decimal Number to Base-5",
        10,
        5,
        [
            "7",
            "16",
            "28",
            "44",
            "62",
            "83",
            "124",
            "187",
            "256",
            "374",
            "625",
            "937",
            "1248",
            "1875",
            "3124",
        ],
    ),
    (
        "Convert Octal Number to Binary",
        8,
        2,
        [
            "7",
            "15",
            "36",
            "127",
            "245",
            "376",
            "527",
            "641",
            "735",
            "1256",
            "3471",
            "5624",
            "71435",
            "123567",
            "7654321",
        ],
    ),
    (
        "Convert Octal Number to Decimal",
        8,
        10,
        [
            "6",
            "14",
            "27",
            "73",
            "156",
            "247",
            "365",
            "472",
            "731",
            "1456",
            "2734",
            "5162",
            "73415",
            "125637",
            "7654321",
        ],
    ),
    (
        "Convert Octal Number to Hexadecimal",
        8,
        16,
        [
            "17",
            "25",
            "74",
            "136",
            "257",
            "463",
            "715",
            "1247",
            "3562",
            "4715",
            "62534",
            "73146",
            "123456",
            "456732",
            "7654321",
        ],
    ),
    (
        "Convert Octal Number to Base-5",
        8,
        5,
        [
            "12",
            "31",
            "47",
            "126",
            "235",
            "417",
            "562",
            "731",
            "1245",
            "3672",
            "5417",
            "72351",
            "123456",
            "654321",
            "7654321",
        ],
    ),
    (
        "Convert Hexadecimal Number to Binary",
        16,
        2,
        [
            "A",
            "1F",
            "2B",
            "3D",
            "4E",
            "5A",
            "7C",
            "9F",
            "AE",
            "1B7",
            "2DF",
            "4AC",
            "8B3F",
            "C7AD",
            "F2A9C",
        ],
    ),
    (
        "Convert Hexadecimal Number to Decimal",
        16,
        10,
        [
            "B",
            "1A",
            "2F",
            "3C",
            "4D",
            "6E",
            "7A",
            "9C",
            "BF",
            "1E4",
            "2AB",
            "4F7",
            "8C5E",
            "B7AF",
            "FACE",
        ],
    ),
    (
        "Convert Hexadecimal Number to Octal",
        16,
        8,
        [
            "D",
            "1E",
            "2A",
            "3F",
            "4B",
            "5D",
            "7E",
            "8F",
            "AC",
            "1C7",
            "2F9",
            "4BE",
            "7D3C",
            "B5AF",
            "E9C7D",
        ],
    ),
    (
        "Convert Hexadecimal Number to Base-5",
        16,
        5,
        [
            "C",
            "1D",
            "2E",
            "3A",
            "4F",
            "6B",
            "7D",
            "9A",
            "AF",
            "1D8",
            "2BC",
            "5FA",
            "9ABC",
            "CDEF",
            "F4A9C",
        ],
    ),
    (
        "Convert Base-5 Number to Binary",
        5,
        2,
        [
            "4",
            "13",
            "24",
            "102",
            "134",
            "243",
            "321",
            "404",
            "1234",
            "2341",
            "3402",
            "4123",
            "12340",
            "23412",
            "432104",
        ],
    ),
    (
        "Convert Base-5 Number to Decimal",
        5,
        10,
        [
            "3",
            "14",
            "22",
            "104",
            "143",
            "231",
            "324",
            "412",
            "1034",
            "2143",
            "3412",
            "4203",
            "12341",
            "23410",
            "432104",
        ],
    ),
    (
        "Convert Base-5 Number to Octal",
        5,
        8,
        [
            "2",
            "11",
            "23",
            "101",
            "142",
            "234",
            "312",
            "403",
            "1243",
            "2301",
            "3421",
            "4102",
            "12304",
            "23412",
            "432104",
        ],
    ),
    (
        "Convert Base-5 Number to Hexadecimal",
        5,
        16,
        [
            "4",
            "12",
            "21",
            "114",
            "143",
            "241",
            "323",
            "401",
            "1234",
            "2314",
            "3401",
            "4120",
            "12340",
            "23413",
            "432104",
        ],
    ),
]

SET2 = [
    (
        "Convert Binary to Decimal",
        2,
        10,
        [
            ".101",
            ".1101",
            ".01101",
            ".111001",
            ".1001111",
            "101.101",
            "1101.011",
            "10010.1101",
            "11101.101",
            "101111.0111",
            "1000001.10101",
            "11011010.11011",
            "101101011.01101",
            "111001101.111001",
            "1001011110.101101",
        ],
    ),
    (
        "Convert Binary to Octal",
        2,
        8,
        [
            ".11",
            ".1011",
            ".110011",
            ".11101",
            ".1011011",
            "111.1011",
            "10110.01101",
            "110101.111001",
            "1000111.10111",
            "1110010.011011",
            "10101101.1101011",
            "11011010.1011101",
            "111100111.0111011",
            "1011010110.10101101",
            "1101110101.111001011",
        ],
    ),
    (
        "Convert Binary to Hexadecimal",
        2,
        16,
        [
            ".1",
            ".101",
            ".11011",
            ".111010",
            ".10110111",
            "1111.101",
            "101010.11101",
            "110011.110101",
            "1001111.1011011",
            "11110000.111011",
            "10101101.10110101",
            "11011110.11010111",
            "111100001.11101011",
            "1010101111.101101011",
            "1100111101.111001011",
        ],
    ),
    (
        "Convert Binary to Base-5",
        2,
        5,
        [
            ".101",
            ".111",
            ".11001",
            ".100101",
            ".111111",
            "101.101",
            "1110.011",
            "11001.101",
            "100101.1101",
            "111111.10101",
            "1010101.011011",
            "1101100.111001",
            "11100101.101011",
            "101101011.011101",
            "1101011010.111011",
        ],
    ),
    (
        "Convert Decimal to Binary",
        10,
        2,
        [
            ".125",
            ".375",
            ".625",
            ".875",
            ".6875",
            "7.125",
            "13.375",
            "25.625",
            "46.875",
            "63.6875",
            "75.8125",
            "109.9375",
            "156.5625",
            "245.34375",
            "378.78125",
        ],
    ),
    (
        "Convert Decimal to Octal",
        10,
        8,
        [
            ".125",
            ".25",
            ".375",
            ".5",
            ".625",
            "8.125",
            "15.25",
            "27.375",
            "41.5",
            "64.625",
            "89.75",
            "125.875",
            "243.125",
            "365.375",
            "512.625",
        ],
    ),
    (
        "Convert Decimal to Hexadecimal",
        10,
        16,
        [
            ".0625",
            ".125",
            ".25",
            ".5",
            ".9375",
            "10.125",
            "26.25",
            "45.5",
            "63.75",
            "95.9375",
            "127.625",
            "189.3125",
            "255.875",
            "512.5",
            "1023.9375",
        ],
    ),
    (
        "Convert Decimal to Base-5",
        10,
        5,
        [
            ".2",
            ".4",
            ".6",
            ".8",
            ".04",
            "9.2",
            "17.4",
            "28.6",
            "43.8",
            "61.04",
            "82.24",
            "124.44",
            "187.64",
            "256.84",
            "389.204",
        ],
    ),
    (
        "Convert Octal to Binary",
        8,
        2,
        [
            ".7",
            ".15",
            ".346",
            ".1274",
            ".56321",
            "7.15",
            "15.346",
            "127.563",
            "245.731",
            "376.1256",
            "527.34715",
            "641.56243",
            "1234.56712",
            "3456.71234",
            "7654.123567",
        ],
    ),
    (
        "Convert Octal to Decimal",
        8,
        10,
        [
            ".4",
            ".25",
            ".731",
            ".1467",
            ".57234",
            "6.14",
            "24.731",
            "73.562",
            "156.247",
            "247.3651",
            "365.4726",
            "472.73145",
            "731.14562",
            "1456.27341",
            "2734.51627",
        ],
    ),
    (
        "Convert Octal to Hexadecimal",
        8,
        16,
        [
            ".3",
            ".17",
            ".254",
            ".7316",
            ".45673",
            "17.25",
            "25.463",
            "74.715",
            "136.1247",
            "257.3562",
            "463.4715",
            "715.62534",
            "1247.73146",
            "3562.123456",
            "4715.456732",
        ],
    ),
    (
        "Convert Octal to Base-5",
        8,
        5,
        [
            ".2",
            ".31",
            ".476",
            ".1263",
            ".54321",
            "12.31",
            "31.476",
            "126.235",
            "235.417",
            "417.5623",
            "562.7314",
            "731.12456",
            "1245.36721",
            "3672.54173",
            "7235.123467",
        ],
    ),
    (
        "Convert Hexadecimal to Binary",
        16,
        2,
        [
            ".A",
            ".1F",
            ".2B",
            ".3D7",
            ".4E9A",
            "A.5C",
            "1F.B2",
            "2B7.DA",
            "3D9.E4F",
            "4AC.B7E",
            "5F2.C9AD",
            "7BE.D4AF",
            "8C5E.F2A9",
            "B7AF.C3DE",
            "F2A9C.7E4D",
        ],
    ),
    (
        "Convert Hexadecimal to Decimal",
        16,
        10,
        [
            ".B",
            ".1A",
            ".2F",
            ".3C8",
            ".4D7F",
            "B.1A",
            "1A.2F",
            "2F.3C",
            "3C.4D7",
            "4D7.8A",
            "6E5.BC9",
            "7AF.D3E",
            "8C5E.A7F2",
            "B7AF.3CDE",
            "FACE.9B7D",
        ],
    ),
    (
        "Convert Hexadecimal to Octal",
        16,
        8,
        [
            ".D",
            ".1E",
            ".2A",
            ".3F4",
            ".4BC7",
            "D.1E",
            "1E.2A",
            "2A.3F",
            "3F.4BC",
            "4BC.7D",
            "5D3.AE7",
            "7EF.C4B",
            "8A5C.D7E3",
            "B5AF.2C7D",
            "E9C7D.A5BF",
        ],
    ),
    (
        "Convert Hexadecimal to Base-5",
        16,
        5,
        [
            ".C",
            ".1D",
            ".2E",
            ".3A5",
            ".4F7B",
            "C.1D",
            "1D.2E",
            "2E.3A",
            "3A.4F7",
            "4F7.8C",
            "6B2.DA5",
            "7D4.EAF",
            "9ABC.D3E7",
            "CDEF.4A9B",
            "F4A9C.7BDE",
        ],
    ),
    (
        "Convert Base-5 to Binary",
        5,
        2,
        [
            ".4",
            ".13",
            ".241",
            ".1023",
            ".31424",
            "4.13",
            "13.241",
            "24.1023",
            "102.3142",
            "134.2431",
            "243.32104",
            "321.40412",
            "1234.12340",
            "2341.23412",
            "432104.314203",
        ],
    ),
    (
        "Convert Base-5 to Decimal",
        5,
        10,
        [
            ".3",
            ".14",
            ".221",
            ".1042",
            ".43123",
            "3.14",
            "14.221",
            "22.1042",
            "104.4312",
            "143.2314",
            "231.32410",
            "324.41203",
            "1034.12341",
            "2143.23410",
            "432104.431204",
        ],
    ),
    (
        "Convert Base-5 to Octal",
        5,
        8,
        [
            ".2",
            ".11",
            ".234",
            ".1012",
            ".34214",
            "2.11",
            "11.234",
            "23.1012",
            "101.3421",
            "142.2301",
            "234.34210",
            "312.41023",
            "1243.12304",
            "2301.23412",
            "432104.342103",
        ],
    ),
    (
        "Convert Base-5 to Hexadecimal",
        5,
        16,
        [
            ".4",
            ".12",
            ".213",
            ".1142",
            ".40321",
            "4.12",
            "12.213",
            "21.1142",
            "114.4032",
            "143.2413",
            "241.32301",
            "323.40124",
            "1234.12340",
            "2341.23413",
            "432104.403214",
        ],
    ),
]


WORD = [
    ("3A7F", 16, 2, "legacy hex address → binary for 0/1 controller"),
    ("73456", 8, 10, "octal logger code → decimal for upgraded software"),
    ("3241302", 5, 16, "base-5 register → hex debug software"),
    ("7B9D", 16, 8, "hex frame ID → octal hardware"),
    ("431204", 5, 10, "base-5 measurement → decimal QC software"),
]


def main() -> None:
    out = []
    out.append("# DCHD Tutorial 1 — Solutions")
    out.append("")
    out.append("**Course:** ECLA201 / ECL216 Digital Circuits and Hardware Design")
    out.append("")
    out.append("Parentheses in a fractional part mark a repeating block, e.g. `0.1(4)` = 0.1444…")
    out.append("")
    out.append("## Methods (use these in the tutorial)")
    out.append("")
    out.append("**Integer, source → decimal:** positional weights. `(dₙ…d₀)_b = Σ dᵢ bⁱ`.")
    out.append("")
    out.append("**Integer, decimal → dest:** repeated division by dest; remainders are digits LSB→MSB.")
    out.append("")
    out.append("**Fraction, decimal → dest:** repeated multiply by dest; integer parts are digits after the point.")
    out.append("")
    out.append("**Binary ↔ octal:** group bits in 3s (pad integer left, fraction right).")
    out.append("")
    out.append("**Binary ↔ hex:** group bits in 4s.")
    out.append("")
    out.append("**Any other pair:** convert source → decimal (exact), then decimal → dest.")
    out.append("")
    out.append("---")
    out.append("")
    out.append("## SET 1 — Integers")
    out.append("")
    for title, src, dest, items in SET1:
        out.append(sub(title, src, dest, items))
    out.append("---")
    out.append("")
    out.append("## SET 2 — Fractions / mixed")
    out.append("")
    for title, src, dest, items in SET2:
        out.append(sub(title, src, dest, items))
    out.append("---")
    out.append("")
    out.append("## Word problems")
    out.append("")
    names = {
        2: "binary",
        5: "base-5",
        8: "octal",
        10: "decimal",
        16: "hexadecimal",
    }
    subscripts = {2: "₂", 5: "₅", 8: "₈", 10: "₁₀", 16: "₁₆"}
    for i, (raw, src, dest, why) in enumerate(WORD, 1):
        val = parse(raw, src)
        ans = fmt(val, dest, src, raw)
        out.append(f"### {i}. {why}")
        out.append("")
        out.append(f"Given `({raw}){subscripts[src]}`.")
        out.append("")
        if src == 16 and dest == 2:
            out.append("Each hex digit → 4 bits: `3=0011`, `A=1010`, `7=0111`, `F=1111`.")
        elif src == 8 and dest == 10:
            out.append(
                "Positional: `7·8⁴ + 3·8³ + 4·8² + 5·8¹ + 6·8⁰`."
            )
        elif src == 5 and dest == 16:
            out.append("Base-5 → decimal, then decimal → hex (or base-5 → binary → group by 4).")
        elif src == 16 and dest == 8:
            out.append("Hex → binary (4 bits/digit), then group bits in 3s for octal.")
        elif src == 5 and dest == 10:
            out.append("Positional: `4·5⁵ + 3·5⁴ + 1·5³ + 2·5² + 0·5¹ + 4·5⁰`.")
        out.append("")
        out.append(
            f"**Answer:** `({raw}){subscripts[src]} = ({ans}){subscripts[dest]}`  ({names[dest]})"
        )
        out.append("")
    path = "/Users/sidd/Documents/padhai/sem3/02-dchd/problems/tutorial-1-solutions.md"
    with open(path, "w") as f:
        f.write("\n".join(out))
    print(f"wrote {path}")


if __name__ == "__main__":
    main()
