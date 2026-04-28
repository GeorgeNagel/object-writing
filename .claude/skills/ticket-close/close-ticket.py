#!/usr/bin/env python3
"""Set a ticket's status to closed with an optional reason in current-sprint.json."""

import json
import sys
from datetime import date
from pathlib import Path

CURRENT = Path(__file__).parent.parent.parent.parent / "tickets" / "current-sprint.json"

TERMINAL = {"done", "closed"}


def main():
    tickets = json.loads(CURRENT.read_text())

    if len(sys.argv) == 2:
        ticket_id = sys.argv[1].lstrip("0") or "0"
        match = next((t for t in tickets if (t["id"].lstrip("0") or "0") == ticket_id), None)
        if match is None:
            print(f"error: ticket {sys.argv[1]} not found in current sprint", file=sys.stderr)
            sys.exit(1)
    else:
        match = next((t for t in tickets if t.get("status") == "in_progress"), None)
        if match is None:
            print("error: no in_progress ticket found in current sprint", file=sys.stderr)
            sys.exit(1)

    if match["status"] in TERMINAL:
        print(f"error: ticket {sys.argv[1]} is already {match['status']}", file=sys.stderr)
        sys.exit(1)

    print("Reason (optional, press Enter to skip): ", end="", flush=True)
    reason = sys.stdin.readline().strip()

    match["status"] = "closed"
    match["closed_at"] = date.today().isoformat()
    if reason:
        match["closed_reason"] = reason

    CURRENT.write_text(json.dumps(tickets, indent=2) + "\n")
    print(f"Ticket {match['id']} closed.")


if __name__ == "__main__":
    main()
