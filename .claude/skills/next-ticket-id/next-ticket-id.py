#!/usr/bin/env python3
"""Print the next ticket ID and increment the counter in tickets/next-id.txt."""

import sys
from pathlib import Path

COUNTER_FILE = Path(__file__).parent.parent.parent.parent / "tickets" / "next-id.txt"


def main():
    if not COUNTER_FILE.exists():
        print(f"error: {COUNTER_FILE} does not exist", file=sys.stderr)
        sys.exit(1)

    value = COUNTER_FILE.read_text().strip()
    if not value.isdigit():
        print(f"error: {COUNTER_FILE} contains invalid value: {value!r}", file=sys.stderr)
        sys.exit(1)

    print(value)
    COUNTER_FILE.write_text(str(int(value) + 1).zfill(3) + "\n")


if __name__ == "__main__":
    main()
