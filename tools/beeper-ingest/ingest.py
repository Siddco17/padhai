#!/usr/bin/env python3
"""WhatsApp → padhai ingest via Beeper Desktop API.

Flow:
  watch/scan  → download PDF/photos into pending queue (awaiting approval)
  review      → approve / refile / skip, then move into course resources/
              → append ingest log + optional git commit of the log
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.parse
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

from courses import UNSORTED, classify, course_resources_dir, list_courses

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parents[1]
INBOX = REPO_ROOT / "sem3" / "_inbox"
PENDING_DIR = INBOX / "pending"
QUEUE_DIR = INBOX / "queue"
STATE_PATH = INBOX / "state.json"
LOG_PATH = REPO_ROOT / "sem3" / "_meta" / "beeper-ingest-log.md"

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
PDF_EXTS = {".pdf"}


def die(msg: str, code: int = 1) -> None:
    print(f"error: {msg}", file=sys.stderr)
    raise SystemExit(code)


def ensure_dirs() -> None:
    for p in (PENDING_DIR, QUEUE_DIR, INBOX / "unsorted"):
        p.mkdir(parents=True, exist_ok=True)
    if not LOG_PATH.exists():
        LOG_PATH.write_text(
            "# Beeper WhatsApp ingest log\n\n"
            "Files stay local (gitignored). This log is what gets committed.\n\n"
            "| When (UTC) | Course | File | Chat | Message |\n"
            "|---|---|---|---|---|\n",
            encoding="utf-8",
        )


def load_state() -> dict[str, Any]:
    if not STATE_PATH.exists():
        return {"seen": {}}
    return json.loads(STATE_PATH.read_text(encoding="utf-8"))


def save_state(state: dict[str, Any]) -> None:
    STATE_PATH.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def client():
    from beeper_desktop_api import BeeperDesktop

    load_dotenv(HERE / ".env")
    token = os.environ.get("BEEPER_ACCESS_TOKEN", "").strip()
    if not token:
        die(
            "BEEPER_ACCESS_TOKEN missing. Create one in Beeper Desktop → Settings → Integrations → "
            "Approved connections (+), then put it in tools/beeper-ingest/.env"
        )
    return BeeperDesktop(
        access_token=token,
        base_url=os.environ.get("BEEPER_BASE_URL", "http://127.0.0.1:23373"),
    )


def account_id(account: Any) -> str | None:
    return (
        getattr(account, "id", None)
        or getattr(account, "account_id", None)
        or getattr(account, "accountID", None)
    )


def is_whatsapp_account(account: Any) -> bool:
    blob = " ".join(
        str(getattr(account, k, "") or "")
        for k in ("id", "account_id", "accountID", "network", "user_id", "name")
    ).lower()
    extra = ""
    if hasattr(account, "model_dump"):
        try:
            extra = json.dumps(account.model_dump(), default=str).lower()
        except Exception:
            pass
    text = blob + " " + extra
    return "whatsapp" in text


def whatsapp_account_ids(c) -> list[str]:
    ids = []
    for acc in c.accounts.list():
        if is_whatsapp_account(acc):
            aid = account_id(acc)
            if aid:
                ids.append(aid)
    return ids


def chat_looks_whatsapp(chat_id: str, chat: Any | None = None) -> bool:
    if "whatsapp" in (chat_id or "").lower():
        return True
    if chat is None:
        return False
    blob = json.dumps(chat.model_dump() if hasattr(chat, "model_dump") else {}, default=str).lower()
    return "whatsapp" in blob


def attachment_is_wanted(att: Any) -> bool:
    if getattr(att, "is_sticker", None) or getattr(att, "isSticker", None):
        return False
    mime = (getattr(att, "mime_type", None) or getattr(att, "mimeType", None) or "").lower()
    name = (getattr(att, "file_name", None) or getattr(att, "fileName", None) or "").lower()
    atype = (getattr(att, "type", None) or "").lower()
    ext = Path(name).suffix.lower() if name else ""

    if mime == "application/pdf" or ext in PDF_EXTS or name.endswith(".pdf"):
        return True
    if atype == "img":
        return True
    if mime.startswith("image/"):
        return True
    if ext in IMAGE_EXTS:
        return True
    return False


def att_id(att: Any) -> str:
    return (
        getattr(att, "id", None)
        or getattr(att, "src_url", None)
        or getattr(att, "srcURL", None)
        or getattr(att, "file_name", None)
        or getattr(att, "fileName", None)
        or "unknown"
    )


def seen_key(chat_id: str, message_id: str, attachment_id: str) -> str:
    raw = f"{chat_id}|{message_id}|{attachment_id}"
    return hashlib.sha1(raw.encode()).hexdigest()


def safe_name(name: str, fallback: str) -> str:
    name = (name or "").strip() or fallback
    name = re.sub(r"[^\w.\-+=()\[\] ]+", "_", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name[:180] or fallback


def file_url_to_path(url: str) -> Path:
    if url.startswith("file://"):
        return Path(urllib.parse.unquote(url[7:]))
    return Path(url)


def download_attachment(c, att: Any, dest: Path) -> Path:
    mxc = getattr(att, "id", None)
    src = getattr(att, "src_url", None) or getattr(att, "srcURL", None)
    local_path: Path | None = None

    if mxc and str(mxc).startswith(("mxc://", "localmxc://")):
        resp = c.assets.download(url=str(mxc))
        err = getattr(resp, "error", None)
        if err:
            die(f"asset download failed: {err}")
        src_url = getattr(resp, "src_url", None) or getattr(resp, "srcURL", None)
        if not src_url:
            die("asset download returned no srcURL")
        local_path = file_url_to_path(src_url)
    elif src:
        if str(src).startswith("file://") or Path(str(src)).exists():
            local_path = file_url_to_path(str(src))
        elif str(src).startswith(("mxc://", "localmxc://")):
            resp = c.assets.download(url=str(src))
            src_url = getattr(resp, "src_url", None) or getattr(resp, "srcURL", None)
            if not src_url:
                die(f"could not download {src}")
            local_path = file_url_to_path(src_url)

    if local_path is None or not local_path.exists():
        die(f"could not resolve attachment to a local file ({att_id(att)})")

    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(local_path, dest)
    return dest


def message_text(msg: Any) -> str:
    for key in ("text", "body", "content", "caption"):
        val = getattr(msg, key, None)
        if isinstance(val, str) and val.strip():
            return val
        if val is not None and hasattr(val, "text"):
            t = getattr(val, "text", None)
            if isinstance(t, str):
                return t
    return ""


def enqueue_attachment(
    c,
    *,
    chat_id: str,
    chat_title: str,
    msg: Any,
    att: Any,
    state: dict[str, Any],
) -> bool:
    message_id = getattr(msg, "id", None) or "unknown"
    key = seen_key(chat_id, str(message_id), att_id(att))
    if key in state.get("seen", {}):
        return False

    mime = (getattr(att, "mime_type", None) or getattr(att, "mimeType", None) or "").lower()
    orig = getattr(att, "file_name", None) or getattr(att, "fileName", None) or ""
    atype = (getattr(att, "type", None) or "").lower()
    if not orig:
        if mime == "application/pdf" or atype == "unknown":
            orig = f"{message_id}.pdf" if "pdf" in mime else f"{message_id}.bin"
        else:
            orig = f"{message_id}.jpg"

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    filename = safe_name(f"{stamp}_{key[:8]}_{orig}", f"{stamp}_{key[:8]}_file.bin")
    pending_path = PENDING_DIR / filename
    download_attachment(c, att, pending_path)

    text = message_text(msg)
    guess_text = " ".join([chat_title, text, orig])
    course, confidence = classify(guess_text)

    item = {
        "id": key,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "chat_id": chat_id,
        "chat_title": chat_title,
        "message_id": str(message_id),
        "message_text": text[:500],
        "attachment_id": att_id(att),
        "mime": mime,
        "suggested_course": course,
        "confidence": confidence,
        "pending_path": str(pending_path.relative_to(REPO_ROOT)),
        "original_name": orig,
        "status": "pending",
    }
    (QUEUE_DIR / f"{key}.json").write_text(json.dumps(item, indent=2) + "\n", encoding="utf-8")
    state.setdefault("seen", {})[key] = {
        "at": item["created_at"],
        "chat_title": chat_title,
        "file": item["pending_path"],
    }
    save_state(state)
    print(f"queued [{course} ~{confidence:.2f}] {filename}  ←  {chat_title or chat_id}")
    return True


def process_message(c, chat_id: str, chat_title: str, msg: Any, state: dict[str, Any]) -> int:
    atts = getattr(msg, "attachments", None) or []
    n = 0
    for att in atts:
        if attachment_is_wanted(att):
            if enqueue_attachment(c, chat_id=chat_id, chat_title=chat_title, msg=msg, att=att, state=state):
                n += 1
    return n


def resolve_chat_title(c, chat_id: str, cache: dict[str, str]) -> str:
    if chat_id in cache:
        return cache[chat_id]
    try:
        chat = c.chats.retrieve(chat_id)
        title = (
            getattr(chat, "title", None)
            or getattr(chat, "name", None)
            or getattr(chat, "display_name", None)
            or chat_id
        )
    except Exception:
        title = chat_id
    cache[chat_id] = str(title)
    return cache[chat_id]


def cmd_accounts(_: argparse.Namespace) -> None:
    c = client()
    print("Connected accounts (WhatsApp marked *):")
    for acc in c.accounts.list():
        mark = "*" if is_whatsapp_account(acc) else " "
        aid = account_id(acc) or "?"
        name = getattr(acc, "name", "") or getattr(acc, "network", "") or ""
        print(f" {mark} {aid}  {name}")


def msg_timestamp(msg: Any) -> datetime | None:
    ts = getattr(msg, "timestamp", None) or getattr(msg, "created_at", None)
    if not ts:
        return None
    try:
        if isinstance(ts, str):
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
        else:
            dt = ts
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except Exception:
        return None


def cmd_scan(args: argparse.Namespace) -> None:
    ensure_dirs()
    c = client()
    wa_ids = whatsapp_account_ids(c)
    if not wa_ids:
        die("No WhatsApp account found in Beeper. Connect WhatsApp first.")

    state = load_state()
    titles: dict[str, str] = {}
    since = datetime.now(timezone.utc) - timedelta(hours=args.hours)
    queued = 0
    seen_msg_ids: set[str] = set()

    print(f"scanning WhatsApp media since {since.isoformat()} ({args.hours}h)…")

    messages: list[Any] = []
    try:
        # SDK auto-paginates; API max page size is 20
        for media in ("image", "file"):
            for msg in c.messages.search(
                account_ids=wa_ids,
                media_types=[media],
                date_after=since,
                limit=20,
                include_muted=True,
            ):
                mid = str(getattr(msg, "id", "") or "")
                if mid and mid in seen_msg_ids:
                    continue
                if mid:
                    seen_msg_ids.add(mid)
                messages.append(msg)
        print(f"search returned {len(messages)} media message(s)")
    except Exception as e:
        print(f"search failed ({e}); walking chats…")
        messages = []

    if not messages:
        chat_count = 0
        for chat in c.chats.list(account_ids=wa_ids):
            cid = getattr(chat, "id", None)
            if not cid:
                continue
            chat_count += 1
            try:
                for msg in c.messages.list(chat_id=str(cid), direction="before"):
                    dt = msg_timestamp(msg)
                    if dt is not None and dt < since:
                        break
                    mid = str(getattr(msg, "id", "") or "")
                    if mid and mid in seen_msg_ids:
                        continue
                    if mid:
                        seen_msg_ids.add(mid)
                    messages.append(msg)
            except Exception:
                continue
        print(f"chat walk: {chat_count} chats, {len(messages)} messages in window")

    for msg in messages:
        dt = msg_timestamp(msg)
        if dt is not None and dt < since:
            continue
        chat_id = str(getattr(msg, "chat_id", None) or getattr(msg, "chatID", None) or "")
        if not chat_id:
            continue
        title = resolve_chat_title(c, chat_id, titles)
        queued += process_message(c, chat_id, title, msg, state)

    print(f"scan done — queued {queued} new file(s) in last {args.hours}h")


def cmd_watch(_: argparse.Namespace) -> None:
    ensure_dirs()
    import asyncio

    import websockets

    load_dotenv(HERE / ".env")
    token = os.environ.get("BEEPER_ACCESS_TOKEN", "").strip()
    if not token:
        die("BEEPER_ACCESS_TOKEN missing (see .env.example)")
    base = os.environ.get("BEEPER_BASE_URL", "http://127.0.0.1:23373").rstrip("/")
    ws_url = base.replace("http://", "ws://").replace("https://", "wss://") + "/v1/ws"

    c = client()
    wa_ids = set(whatsapp_account_ids(c))
    if not wa_ids:
        die("No WhatsApp account found in Beeper.")
    print(f"watching WhatsApp accounts: {', '.join(wa_ids)}")
    print("queue new PDFs/photos, then run: python ingest.py review")

    state = load_state()
    titles: dict[str, str] = {}

    async def run() -> None:
        nonlocal state
        headers = {"Authorization": f"Bearer {token}"}
        async with websockets.connect(ws_url, additional_headers=headers) as ws:
            ready = json.loads(await ws.recv())
            if ready.get("type") != "ready":
                print("unexpected first frame:", ready)
            await ws.send(
                json.dumps(
                    {
                        "type": "subscriptions.set",
                        "requestID": "sub1",
                        "chatIDs": ["*"],
                        "app": {"state": True},
                    }
                )
            )
            while True:
                raw = await ws.recv()
                ev = json.loads(raw)
                if ev.get("type") != "message.upserted":
                    continue
                chat_id = str(ev.get("chatID") or "")
                if not chat_looks_whatsapp(chat_id):
                    continue
                title = resolve_chat_title(c, chat_id, titles)
                ids = list(ev.get("ids") or [])
                entries = ev.get("entries") or []
                if not ids and entries:
                    ids = [e.get("id") for e in entries if isinstance(e, dict) and e.get("id")]
                for mid in ids:
                    if not mid:
                        continue
                    try:
                        msg = c.messages.retrieve(chat_id=chat_id, message_id=mid)
                    except Exception as e:
                        print(f"skip fetch {mid}: {e}")
                        continue
                    process_message(c, chat_id, title, msg, state)
                state = load_state()

    try:
        asyncio.run(run())
    except KeyboardInterrupt:
        print("\nstopped")


def pending_items() -> list[dict[str, Any]]:
    items = []
    for path in sorted(QUEUE_DIR.glob("*.json")):
        item = json.loads(path.read_text(encoding="utf-8"))
        if item.get("status") == "pending":
            item["_queue_path"] = str(path)
            items.append(item)
    return items


def append_log(item: dict[str, Any], dest: Path) -> None:
    when = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M")
    course = item.get("final_course") or item.get("suggested_course") or UNSORTED
    chat = (item.get("chat_title") or "").replace("|", "/")
    msg = (item.get("message_text") or "").replace("|", "/")[:80]
    rel = dest.relative_to(REPO_ROOT)
    line = f"| {when} | `{course}` | `{rel}` | {chat} | {msg} |\n"
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(line)


def git_commit_log(summary: str) -> None:
    try:
        subprocess.run(["git", "add", str(LOG_PATH.relative_to(REPO_ROOT))], cwd=REPO_ROOT, check=True)
        # only commit if there is a staged change
        diff = subprocess.run(
            ["git", "diff", "--cached", "--quiet", "--", str(LOG_PATH.relative_to(REPO_ROOT))],
            cwd=REPO_ROOT,
        )
        if diff.returncode == 0:
            return
        msg = f"ingest: {summary}"
        subprocess.run(["git", "commit", "-m", msg], cwd=REPO_ROOT, check=True)
        print(f"committed log: {msg}")
    except subprocess.CalledProcessError as e:
        print(f"warning: git commit skipped ({e})")


def apply_item(item: dict[str, Any], course: str) -> Path:
    pending = REPO_ROOT / item["pending_path"]
    if not pending.exists():
        item["status"] = "missing"
        Path(item["_queue_path"]).write_text(
            json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n",
            encoding="utf-8",
        )
        raise FileNotFoundError(str(pending))
    dest_dir = Path(course_resources_dir(str(REPO_ROOT), course))
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / pending.name
    if dest.exists():
        stem, suffix = dest.stem, dest.suffix
        dest = dest_dir / f"{stem}_dup{suffix}"
    shutil.move(str(pending), str(dest))
    item["status"] = "filed"
    item["final_course"] = course
    item["filed_path"] = str(dest.relative_to(REPO_ROOT))
    Path(item["_queue_path"]).write_text(json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n")
    append_log(item, dest)
    return dest


def cmd_review(args: argparse.Namespace) -> None:
    ensure_dirs()
    items = pending_items()
    if not items:
        print("nothing to review — queue empty")
        return

    courses = list_courses()
    filed = 0
    for i, item in enumerate(items, 1):
        print("\n" + "=" * 60)
        print(f"[{i}/{len(items)}] {item.get('original_name')}")
        print(f"  chat:    {item.get('chat_title')}")
        print(f"  text:    {item.get('message_text') or '(none)'}")
        print(f"  file:    {item.get('pending_path')}")
        print(f"  suggest: {item.get('suggested_course')} (confidence {item.get('confidence', 0):.2f})")
        print("  courses:")
        for idx, course in enumerate(courses):
            print(f"    {idx:2d}  {course.slug}  — {course.title}")
        print("    u   unsorted")
        print("    s   skip")
        print("    q   quit")

        while True:
            choice = input("approve as [Enter=suggest] / # / u / s / q: ").strip().lower()
            if choice == "q":
                if filed and not args.no_commit:
                    git_commit_log(f"filed {filed} WhatsApp attachment(s)")
                return
            if choice == "s":
                item["status"] = "skipped"
                Path(item["_queue_path"]).write_text(
                    json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n"
                )
                print("skipped")
                break
            if choice in {"", "a", "y"}:
                course = item.get("suggested_course") or UNSORTED
            elif choice == "u":
                course = UNSORTED
            elif choice.isdigit() and 0 <= int(choice) < len(courses):
                course = courses[int(choice)].slug
            else:
                print("invalid choice")
                continue
            dest = apply_item(item, course)
            print(f"filed → {dest.relative_to(REPO_ROOT)}")
            filed += 1
            break

    if filed and not args.no_commit:
        git_commit_log(f"filed {filed} WhatsApp attachment(s)")
    print(f"done — filed {filed}")


def skip_item(item: dict[str, Any]) -> None:
    item["status"] = "skipped"
    Path(item["_queue_path"]).write_text(
        json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n",
        encoding="utf-8",
    )


# Chats that are almost always personal / non-course noise.
PERSONAL_CHATS = {
    "devashree",
    "arnav",
    "mom",
    "dad",
    "actually baiterless valorant",
    "aadvik",
    "pet super-app",
    "optimum nutrition india",
    "arnav p's dad",
    "mutthalo ki baarat",
    "anushka",
    "atharva",
    "himanshu hingwe",
    "ammuma",
    "imagine by ample",
    "jui deshpande",
    "krushna sarvate",
    "vip gamepass mem",
    "10b meet 🥺🥺",
    "saumya sharma",
    "siddharth sharma",
    "pranav deore",
    "aarya mistry",
    "lawn tennis ece",
    "aaryaphobics",
}

# College/admin noise even if PDF.
ADMIN_NAME_MARKERS = (
    "holiday",
    "swimming",
    "council member",
    "code of conduct",
    "add & drop",
    "add _ drop",
    "academic-calendar",
    "academic calendar",
    "eligible and non eligible",
    "coursebook",
    "jc bose",
)

CHAT_COURSE = {
    "mni": "06-mni",
    "acd- section a - w26": "05-acd",
}


def is_pdf(item: dict[str, Any]) -> bool:
    name = (item.get("original_name") or "").lower()
    mime = (item.get("mime") or "").lower()
    return name.endswith(".pdf") or "pdf" in mime


def strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", " ", text or "")


# Strong filename overrides when keyword classifier is thin.
FILENAME_COURSE = (
    ("static characteristics", "06-mni"),
    ("bridge and loading", "06-mni"),
    ("p45-4-5", "06-mni"),
    ("opamp", "05-acd"),
    ("24258", "05-acd"),
    ("acd lab", "05-acd-lab"),
    ("mni lab", "06-mni-lab"),
    ("experiment 1", "06-mni-lab"),
    ("experiment 2", "06-mni-lab"),
    ("dc journal", "02-dchd-lab"),
    ("regression analysis", "07-fundamentals-of-ml"),
)


def auto_decide(item: dict[str, Any]) -> tuple[str, str | None]:
    """Return ('skip', None) or ('file', course_slug)."""
    chat = (item.get("chat_title") or "").strip()
    chat_l = chat.lower()
    name = item.get("original_name") or ""
    name_l = name.lower()
    text = strip_html(item.get("message_text") or "")
    blob = f"{chat} {name} {text}"
    blob_l = blob.lower()

    # Explicit admin/junk docs
    if any(m in name_l for m in ADMIN_NAME_MARKERS):
        return "skip", None

    for marker, slug in FILENAME_COURSE:
        if marker in name_l:
            return "file", slug

    course, conf = classify(blob)
    if chat_l in CHAT_COURSE and (is_pdf(item) or conf >= 0.5 or "attendance" in blob_l):
        return "file", CHAT_COURSE[chat_l]

    # Strong filename/caption course hit
    if course != UNSORTED and conf >= 0.5:
        return "file", course

    # Academic group PDFs with weak classify → unsorted keepers
    academicish = any(
        k in chat_l
        for k in (
            "batch 2",
            "students official",
            "vnit ece",
            "mni",
            "acd",
            "shoumik ece",
            "anvay (ece)",
            "syntax",
        )
    )
    if is_pdf(item) and academicish and course != UNSORTED:
        return "file", course
    if is_pdf(item) and academicish:
        return "file", UNSORTED

    # Personal chats: only keep if already strongly classified above
    if chat_l in PERSONAL_CHATS or chat_l.startswith("10b meet"):
        return "skip", None

    # Remaining images in non-personal chats without course signal
    if not is_pdf(item):
        if "attendance" in blob_l and "acd" in chat_l:
            return "file", "05-acd"
        if course != UNSORTED and conf >= 0.45:
            return "file", course
        return "skip", None

    return "skip", None


def cmd_auto(args: argparse.Namespace) -> None:
    """Classify+file/skip the whole pending queue without interactive prompts."""
    ensure_dirs()
    items = pending_items()
    if not items:
        print("nothing to auto-review — queue empty")
        return

    # Collapse filename collisions: one decision per on-disk pending path.
    by_path: dict[str, list[dict[str, Any]]] = {}
    for item in items:
        by_path.setdefault(item.get("pending_path") or "", []).append(item)

    filed = 0
    skipped = 0
    missing = 0

    for path, group in by_path.items():
        # Prefer a PDF-bearing / academic decision among collision twins.
        group.sort(key=lambda i: (0 if is_pdf(i) else 1, -(i.get("confidence") or 0)))
        primary = group[0]
        label = f"{primary.get('original_name')} ← {primary.get('chat_title')} (+{len(group)-1} dups)"

        if not path or not (REPO_ROOT / path).exists():
            for item in group:
                item["status"] = "missing"
                Path(item["_queue_path"]).write_text(
                    json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n"
                )
            missing += len(group)
            print(f"miss  {label}")
            continue

        # If any twin wants filing, use the best file decision.
        decision = ("skip", None)
        for cand in group:
            action, course = auto_decide(cand)
            if action == "file" and course:
                decision = (action, course)
                primary = cand
                break
            decision = (action, course)

        action, course = decision
        if action == "skip" or not course:
            for item in group:
                skip_item(item)
            pending_file = REPO_ROOT / path
            if pending_file.exists():
                pending_file.unlink()
            skipped += len(group)
            print(f"skip  {label}")
            continue

        try:
            dest = apply_item(primary, course)
        except FileNotFoundError:
            for item in group:
                item["status"] = "missing"
                Path(item["_queue_path"]).write_text(
                    json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n"
                )
            missing += len(group)
            print(f"miss  {label}")
            continue

        for item in group:
            if item is primary:
                continue
            item["status"] = "duplicate"
            item["final_course"] = course
            item["filed_path"] = str(dest.relative_to(REPO_ROOT))
            Path(item["_queue_path"]).write_text(
                json.dumps({k: v for k, v in item.items() if k != "_queue_path"}, indent=2) + "\n"
            )
        filed += 1
        print(f"file  [{course}] {dest.relative_to(REPO_ROOT)}")

    if filed and not args.no_commit:
        git_commit_log(f"auto-filed {filed} WhatsApp attachment(s), skipped {skipped}")
    print(f"done — filed {filed}, skipped {skipped}, missing {missing}")


def cmd_courses(_: argparse.Namespace) -> None:
    for i, course in enumerate(list_courses()):
        print(f"{i:2d}  {course.slug}  — {course.title}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Beeper WhatsApp → padhai ingest")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("accounts", help="List Beeper accounts; mark WhatsApp").set_defaults(func=cmd_accounts)

    p_scan = sub.add_parser("scan", help="Backfill recent WhatsApp PDFs/photos into approval queue")
    p_scan.add_argument("--hours", type=int, default=48, help="Look back window (default 48)")
    p_scan.set_defaults(func=cmd_scan)

    sub.add_parser("watch", help="Live-watch WhatsApp for new PDFs/photos").set_defaults(func=cmd_watch)

    p_review = sub.add_parser("review", help="Approve / refile / skip queued items")
    p_review.add_argument("--no-commit", action="store_true", help="Do not auto-commit ingest log")
    p_review.set_defaults(func=cmd_review)

    p_auto = sub.add_parser("auto", help="LLM-style auto classify: file academic docs, skip personal noise")
    p_auto.add_argument("--no-commit", action="store_true", help="Do not auto-commit ingest log")
    p_auto.set_defaults(func=cmd_auto)

    sub.add_parser("courses", help="List course folders").set_defaults(func=cmd_courses)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
