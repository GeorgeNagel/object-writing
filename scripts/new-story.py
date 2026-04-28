#!/usr/bin/env python3
"""Create a ticket and append it to backlog.json."""

import json
import subprocess
import sys
import tempfile
from pathlib import Path

REPO = Path(__file__).parent.parent
TICKETS = REPO / "tickets"
BACKLOG = TICKETS / "backlog.json"

TEMPLATE = {
    "_instructions": "Fill in the fields below, save, and close this tab. Remove placeholder empty strings from lists.",
    "story": "As a [persona], I want [goal] so that [reason]",
    "acceptance_criteria": [],
    "dependencies": [],
    "non_goals": [],
    "assumptions": [],
}


def next_id():
    files = [BACKLOG, TICKETS / "current-sprint.json"] + list(
        (TICKETS / "archive").glob("*.json")
    )
    max_id = 0
    for path in files:
        if not path.exists():
            continue
        for ticket in json.loads(path.read_text()):
            try:
                max_id = max(max_id, int(ticket["id"]))
            except (KeyError, ValueError):
                pass
    return str(max_id + 1).zfill(3)


def open_editor(template: dict) -> dict:
    with tempfile.NamedTemporaryFile(suffix=".json", mode="w", delete=False) as f:
        json.dump(template, f, indent=2)
        f.write("\n")
        path = f.name

    try:
        result = subprocess.run(["code", "--wait", path])
        if result.returncode != 0:
            print("error: VS Code exited with an error", file=sys.stderr)
            sys.exit(1)
        return json.loads(Path(path).read_text())
    except FileNotFoundError:
        print(
            "error: 'code' not found on PATH — use --stub to create a shell ticket instead",
            file=sys.stderr,
        )
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"error: could not parse edited file: {e}", file=sys.stderr)
        sys.exit(1)
    finally:
        Path(path).unlink(missing_ok=True)


def clean_list(items):
    return [str(s) for s in items if s is not None and str(s).strip()]


def main():
    stub = "--stub" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("-")]

    if not args:
        print("usage: new-story.py [--stub] <title>", file=sys.stderr)
        sys.exit(1)

    title = args[0]

    if stub:
        ticket = {
            "id": next_id(),
            "title": title,
            "status": "todo",
            "story": "",
            "acceptance_criteria": [],
            "dependencies": [],
            "non_goals": [],
            "assumptions": [],
            "groomed_at": None,
        }
    else:
        template = dict(TEMPLATE)
        template["title"] = title
        data = open_editor(template)
        data.pop("_instructions", None)

        story = data.get("story", "").strip()
        if not story or story == TEMPLATE["story"]:
            print("warning: story field not filled in", file=sys.stderr)
            story = ""

        ticket = {
            "id": next_id(),
            "title": data.get("title", title).strip() or title,
            "status": "todo",
            "story": story,
            "acceptance_criteria": clean_list(data.get("acceptance_criteria", [])),
            "dependencies": clean_list(data.get("dependencies", [])),
            "non_goals": clean_list(data.get("non_goals", [])),
            "assumptions": clean_list(data.get("assumptions", [])),
            "groomed_at": None,
        }

    tickets = json.loads(BACKLOG.read_text())
    tickets.append(ticket)
    BACKLOG.write_text(json.dumps(tickets, indent=2) + "\n")
    print(f"Created ticket [{ticket['id']}]: {ticket['title']}")


if __name__ == "__main__":
    main()
