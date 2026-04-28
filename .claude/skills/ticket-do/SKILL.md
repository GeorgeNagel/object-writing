---
name: ticket-do
description: Execute the currently claimed ticket
allowed-tools:
  - Read
  - Plan
---

## Step 1: Ask clarifying questions

Read `tickets/current-sprint.json` and find the ticket with `status: "in_progress"`. Read the ticket's `story` and `acceptance_criteria` carefully. Identify any ambiguities — unclear requirements, missing context, or architectural choices not addressed by the ticket.

Ask clarifying questions **one at a time** and wait for the user's answer before asking the next. Do not proceed to Step 2 until all ambiguities are resolved.

If there are no ambiguities, skip this step.

## Step 2: Plan the work

Use the ticket's `story` and `acceptance_criteria` as the sole source of truth, updated with any answers from Step 1.
Follow all repo conventions.
New features should have new tests.
Bugfixes should have tests that initially fail (demonstrating the bug) and pass after the fix.

Generate a plan for executing the work and confirm with the user.

## Step 3: Execute the work

Following the plan above, complete the ticket.
If you're working on a bugfix, show the new test initially fails, exposing the bug.
Any new features should have tests.
Make sure all linters and tests pass before exiting this step.

Whenever a retro-relevant event occurs during execution — including scope increase, missing or invalidated assumption, changed AC, plan deviation, surprise, code architecture or style pain point, or blocker — immediately run:

```
python3 .claude/skills/retro/append-retro-note.py <ticket_id> "<note>"
```

Limit notes to these event types. Do not log execution steps, tool calls, or routine progress.

## Step 4: Retrospective

**User retro** (`retro_notes.user`): Ask the user: "Anything to add to the retro for this ticket?" Wait for their response. If they decline or have nothing to add, leave `retro_notes.user` unset. Otherwise append their response verbatim as a string to the `retro_notes.user` array in `tickets/current-sprint.json`. Do not implement their suggested changes from this question.

## Step 5: Human sign-off

Ask the user: "Ready to close this ticket?" Wait for their explicit confirmation before proceeding.

If the user is not ready, do not close the ticket. Let them know the ticket remains open and they can continue when ready.

## Step 6: Close the ticket

Close the ticket via the `ticket-close` skill