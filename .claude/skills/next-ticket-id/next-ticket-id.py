#!/usr/bin/env python3
"""Print the next ticket ID by scanning all ticket sources for the current max."""

import json
import re
import sys
from pathlib import Path

TICKETS_DIR = Path(__file__).parent.parent.parent.parent / "tickets"


def main():
    sources = list(TICKETS_DIR.glob("*.json")) + list(TICKETS_DIR.glob("archive/*.json"))

    max_id = 0
    for path in sources:
        try:
            tickets = json.loads(path.read_text())
        except (json.JSONDecodeError, OSError):
            continue
        if not isinstance(tickets, list):
            continue
        for ticket in tickets:
            ticket_id = ticket.get("id", "")
            if re.fullmatch(r"\d+", ticket_id):
                max_id = max(max_id, int(ticket_id))

    print(str(max_id + 1).zfill(3))


if __name__ == "__main__":
    main()
