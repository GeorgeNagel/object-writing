#!/usr/bin/env python3
"""Print tickets that are todo with all dependencies done."""

import json
import sys
from pathlib import Path

TICKETS_DIR = Path(__file__).parent.parent.parent.parent / "tickets"
CURRENT = TICKETS_DIR / "current-sprint.json"
BACKLOG = TICKETS_DIR / "backlog.json"


def load_all_tickets():
    tickets = []
    for path in [CURRENT, BACKLOG]:
        if path.exists():
            tickets.extend(json.loads(path.read_text()))
    return tickets


def normalize_id(ticket_id):
    return ticket_id.lstrip("0") or "0"


def main():
    all_tickets = load_all_tickets()
    done_ids = {normalize_id(t["id"]) for t in all_tickets if t.get("status") in {"done", "closed"}}

    current = json.loads(CURRENT.read_text())
    eligible = []
    for t in current:
        if t.get("status") != "todo":
            continue
        deps = t.get("dependencies", [])
        if all(normalize_id(d) in done_ids for d in deps):
            eligible.append(t)

    if not eligible:
        print("No eligible tickets.")
        return

    for t in eligible:
        deps = t.get("dependencies", [])
        dep_str = f" (deps: {', '.join(deps)})" if deps else ""
        print(f"[{t['id']}] {t['title']}{dep_str}")


if __name__ == "__main__":
    main()
