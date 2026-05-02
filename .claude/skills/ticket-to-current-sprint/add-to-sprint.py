#!/usr/bin/env python3
"""Move a groomed ticket from backlog.json into current-sprint.json."""

import json
import sys
from pathlib import Path

BACKLOG = Path(__file__).parent.parent.parent.parent / "tickets" / "backlog.json"
CURRENT = Path(__file__).parent.parent.parent.parent / "tickets" / "current-sprint.json"


def normalize_id(ticket_id):
    return ticket_id.lstrip("0") or "0"


def main():
    if len(sys.argv) != 2:
        print("usage: add-to-sprint.py <id>", file=sys.stderr)
        sys.exit(1)

    raw_id = sys.argv[1]
    ticket_id = normalize_id(raw_id)

    backlog = json.loads(BACKLOG.read_text())
    idx = next((i for i, t in enumerate(backlog) if normalize_id(t["id"]) == ticket_id), None)

    if idx is None:
        print(f"error: ticket {raw_id} not found in backlog", file=sys.stderr)
        sys.exit(1)

    ticket = backlog[idx]

    if not ticket.get("groomed_at"):
        print(f"error: ticket {raw_id} has not been groomed", file=sys.stderr)
        sys.exit(1)

    sprint = json.loads(CURRENT.read_text())
    backlog.pop(idx)

    BACKLOG.write_text(json.dumps(backlog, indent=2) + "\n")
    sprint.append(ticket)
    CURRENT.write_text(json.dumps(sprint, indent=2) + "\n")

    print(f"Ticket {raw_id} moved to current sprint.")


if __name__ == "__main__":
    main()
