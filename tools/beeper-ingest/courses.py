"""Course folder map + lightweight keyword classifier for padhai."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Course:
    slug: str
    title: str
    keywords: tuple[str, ...]


COURSES: tuple[Course, ...] = (
    Course("01-linear-algebra", "Linear Algebra for ML", ("linear algebra", "lin alg", "strang", "linalg")),
    Course(
        "02-dchd",
        "DCHD theory",
        ("dchd", "digital design", "kohavi", "morris mano", "finite automata", "switching"),
    ),
    Course("02-dchd-lab", "DCHD Lab", ("dchd lab", "hdl", "verilog", "vhdl", "dc lab", "dc journal")),
    Course("03-sns", "Signals & Systems", ("sns", "signals & systems", "signals and systems", "oppenheim", "s&s")),
    Course("03-sns-lab", "SnS Lab", ("sns lab", "snslab", "matlab lab")),
    Course("04-emft", "EMFT", ("emft", "electromagnetic", "sadiku", "maxwell", "em wave")),
    Course(
        "05-acd",
        "Analog Circuit Design",
        ("acd", "analog circuit", "op amp", "opamp", "gaikwad", "thevenin"),
    ),
    Course("05-acd-lab", "ACD Lab", ("acd lab", "spice", "ltspice")),
    Course(
        "06-mni",
        "Measurements & Instrumentation",
        (
            "mni",
            "measurement",
            "instrumentation",
            "bentley",
            "doebelin",
            "static characteristics",
            "bridge and loading",
            "loading effect",
        ),
    ),
    Course("06-mni-lab", "MNI Lab", ("mni lab", "mni lab journal")),
    Course(
        "07-fundamentals-of-ml",
        "Fundamentals of ML",
        ("foml", "machine learning", "mitchell", "alpaydin", "csl2xx", "regression analysis"),
    ),
    Course("07-fundamentals-of-ml-lab", "FoML Lab", ("foml lab", "ml lab")),
)

UNSORTED = "_unsorted"


def list_courses() -> list[Course]:
    return list(COURSES)


def classify(text: str) -> tuple[str, float]:
    """Return (course_slug_or_unsorted, confidence 0..1) from free text."""
    hay = f" {text.lower()} "
    best_slug = UNSORTED
    best_score = 0
    for course in COURSES:
        matched = [kw for kw in course.keywords if kw in hay]
        if not matched:
            continue
        # Prefer longer / more specific keyword hits over short ones.
        score = sum(len(kw) for kw in matched) + 5 * len(matched)
        if score > best_score:
            best_score = score
            best_slug = course.slug
    if best_score == 0:
        return UNSORTED, 0.0
    return best_slug, min(1.0, 0.35 + best_score / 40.0)


def course_resources_dir(repo_root: str, slug: str) -> str:
    from pathlib import Path

    if slug == UNSORTED:
        return str(Path(repo_root) / "sem3" / "_inbox" / "unsorted")
    return str(Path(repo_root) / "sem3" / slug / "resources")
