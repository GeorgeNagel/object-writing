#!/usr/bin/env python3
"""Set a ticket's status to in_progress in current-sprint.json."""

import json
import sys
from pathlib import Path

CURRENT = Path(__file__).parent.parent / "tickets" / "current-sprint.json"


def main():
    if len(sys.argv) != 2:
        print("usage: claim-ticket.py <id>", file=sys.stderr)
        sys.exit(1)

    ticket_id = sys.argv[1].lstrip("0") or "0"
    tickets = json.loads(CURRENT.read_text())

    match = next((t for t in tickets if (t["id"].lstrip("0") or "0") == ticket_id), None)
    if match is None:
        print(f"error: ticket {sys.argv[1]} not found in current sprint", file=sys.stderr)
        sys.exit(1)

    if match["status"] != "todo":
        print(f"error: ticket {sys.argv[1]} has status '{match['status']}', expected 'todo'", file=sys.stderr)
        sys.exit(1)

    match["status"] = "in_progress"
    CURRENT.write_text(json.dumps(tickets, indent=2) + "\n")
    print(f"Ticket {sys.argv[1]} claimed.")


if __name__ == "__main__":
    main()
