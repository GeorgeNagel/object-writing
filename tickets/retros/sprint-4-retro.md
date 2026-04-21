# Sprint 4 Retrospective — 2026-04-21

## Tickets Reviewed

### Done
- [038] Results step: show object word at top, move score below highlighted text
  - Agent retro: (none)
  - User retro: (none)
  - Additional feedback: (none)

- [036] Add documentation philosophy guide for agents
  - Agent retro: The user interrupted two edits mid-execution — once to redirect the src/services/ line wording, and once to also remove the /pick-ticket section. Both corrections were reasonable and came from applying the new philosophy to existing content, but I had already started executing before fully auditing all existing docs against it.
  - User retro: (none)
  - Additional feedback: (none)

- [035] Move custom command logic into standalone scripts
  - Agent retro: A claim-ticket.py ID matching bug (operator precedence on `or`) was caught before running but introduced in the first pass. Mid-execution a new script (set-user-retro) was identified as needed, written, then removed when the user decided to defer it — the scope expansion should have been surfaced before implementing.
  - User retro: I missed that we should also extract a close-ticket script, which expands scope.
  - Additional feedback: (none)

- [029] Make story command implementation-agnostic
  - Agent retro: (none)
  - User retro: (none)
  - Additional feedback: (none)

### Carry-over
(none)

## Problems Identified

- Agent started executing before auditing existing content against the new constraints, leading to mid-execution corrections.
- A bug was introduced in a first-pass implementation (operator precedence error in claim-ticket.py).
- Scope was expanded mid-execution (new script written) before surfacing the expansion to the user for approval.

## Root Cause Analysis

(deferred — user chose not to act on any problems this sprint)

## New Tickets Added

(none)
