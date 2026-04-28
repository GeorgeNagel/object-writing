import sys
import json
from datetime import datetime, timezone
from pathlib import Path

SPRINT_FILE = Path(__file__).parents[3] / "tickets" / "current-sprint.json"

ticket_id, note = sys.argv[1], sys.argv[2]

tickets = json.loads(SPRINT_FILE.read_text())
ticket = next((t for t in tickets if t["id"] == ticket_id), None)
if ticket is None:
    print(f"Ticket {ticket_id} not found", file=sys.stderr)
    sys.exit(1)

ticket.setdefault("retro_notes", {}).setdefault("agent", []).append(
    [datetime.now(timezone.utc).isoformat(), note]
)

SPRINT_FILE.write_text(json.dumps(tickets, indent=2))
