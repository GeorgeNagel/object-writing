#!/usr/bin/env python3
"""Archive the current sprint and reset current-sprint.json."""

import json
import sys
from pathlib import Path

TICKETS_DIR = Path(__file__).parent.parent / "tickets"
CURRENT = TICKETS_DIR / "current-sprint.json"
ARCHIVE_DIR = TICKETS_DIR / "archive"


def main():
    tickets = json.loads(CURRENT.read_text())

    if not tickets:
        print("error: current-sprint.json is empty", file=sys.stderr)
        sys.exit(1)

    incomplete = [t for t in tickets if t.get("status") != "done"]
    if incomplete:
        ids = ", ".join(t["id"] for t in incomplete)
        print(f"error: incomplete tickets: {ids}", file=sys.stderr)
        sys.exit(1)

    sprint_numbers = [t["sprint"] for t in tickets if "sprint" in t]
    if not sprint_numbers:
        print("error: no sprint number found on tickets", file=sys.stderr)
        sys.exit(1)
    sprint_num = sprint_numbers[0]

    archive_file = ARCHIVE_DIR / f"sprint-{sprint_num}.json"
    if archive_file.exists():
        print(f"error: {archive_file} already exists", file=sys.stderr)
        sys.exit(1)

    ARCHIVE_DIR.mkdir(exist_ok=True)
    archive_file.write_text(json.dumps(tickets, indent=2) + "\n")
    CURRENT.write_text("[]\n")

    print(f"Sprint {sprint_num} archived to {archive_file.relative_to(TICKETS_DIR.parent)}")


if __name__ == "__main__":
    main()
