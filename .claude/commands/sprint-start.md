Start a new sprint by pulling tickets from the backlog into the current sprint.

## Arguments

```
/sprint-start [criteria or task IDs]
```

- **criteria** — natural language description of what to pull in (e.g. "the next 3 unblocked tickets")
- **task IDs** — explicit list of IDs to include (e.g. "019 020 021")
- **omitted** — ask the user what to pull in before proceeding

## Step 1: Check for active sprint

Read `tickets/current-sprint.json`. If it is non-empty, stop and tell the user there is already an active sprint. Do not proceed.

## Step 2: Determine sprint number

List files in `tickets/archive/`. The sprint number is one higher than the highest `sprint-N.json` found. If no archive files exist, use `1`.

## Step 3: Select tickets

Read `tickets/backlog.json`.

If the user provided task IDs, use those. If the user provided criteria, select tickets from the backlog that match. If nothing was provided, ask the user what to pull in.

All selected tickets must exist in `backlog.json` with `status: "todo"`. If any selected task is not found, report the missing IDs and stop.

## Step 4: Groom each ticket

For each selected ticket, one at a time:

1. Run the groom skill on the ticket (follow the steps in `.claude/commands/groom.md`).
2. After grooming completes, re-read the ticket from its source file to get the current state.
3. Check the ticket's `groomed_at` field:
   - **Non-null**: ticket is queued for the sprint.
   - **Null**: ticket is deferred; it remains in `backlog.json` untouched. Tell the user.
4. Move to the next ticket.

After all tickets are processed, summarize which were queued and which were deferred. If no tickets were queued, stop.

## Step 5: Execute

1. Add a `sprint` field set to the sprint number (integer) to each accepted task
2. Remove only the accepted tickets from `backlog.json` and write it
3. Write the accepted tickets to `current-sprint.json`
