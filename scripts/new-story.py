#!/usr/bin/env python3
"""Append a stub story ticket to backlog.json."""

import json
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent
BACKLOG = SCRIPTS_DIR.parent / "tickets" / "backlog.json"
COUNTER_FILE = SCRIPTS_DIR.parent / "tickets" / "next-id.txt"


def get_next_id():
    if not COUNTER_FILE.exists():
        print(f"error: {COUNTER_FILE} does not exist", file=sys.stderr)
        sys.exit(1)
    value = COUNTER_FILE.read_text().strip()
    if not value.isdigit():
        print(f"error: {COUNTER_FILE} contains invalid value: {value!r}", file=sys.stderr)
        sys.exit(1)
    COUNTER_FILE.write_text(str(int(value) + 1).zfill(3) + "\n")
    return value


def prompt_list(prompt):
    items = []
    while True:
        value = input(prompt).strip()
        if not value:
            break
        items.append(value)
    return items


def main():
    if len(sys.argv) != 2:
        print("usage: new-story.py <title>", file=sys.stderr)
        sys.exit(1)

    title = sys.argv[1]

    print("Enter acceptance criteria (press Enter on empty line to finish):")
    acceptance_criteria = prompt_list("  Criterion: ")

    print("Enter dependencies (press Enter on empty line to finish):")
    dependencies = prompt_list("  Dependency ticket ID: ")

    ticket_id = get_next_id()

    tickets = json.loads(BACKLOG.read_text())
    tickets.append({
        "id": ticket_id,
        "title": title,
        "status": "todo",
        "story": "",
        "acceptance_criteria": acceptance_criteria,
        "dependencies": dependencies,
    })
    BACKLOG.write_text(json.dumps(tickets, indent=2) + "\n")
    print(f"Created ticket [{ticket_id}]: {title}")


if __name__ == "__main__":
    main()
