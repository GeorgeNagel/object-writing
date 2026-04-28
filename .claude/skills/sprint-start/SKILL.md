---
name: sprint-start
description: Kick off a new sprint, making sure that each ticket is groomed
allowed-tools:
  - Groom
  - Read(tickets/**)
  - Write(tickets/**)
---

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

## Step 4: Groom and move each ticket

For each selected ticket, one at a time:

1. Check the ticket's `groomed_at` field in `backlog.json`.
   - **Already set (non-null)**: skip grooming, proceed directly to step 3.
   - **Null**: run the groom skill on the ticket (follow `.claude/commands/groom.md`), then re-read the ticket to get current state.
2. Check `groomed_at` after grooming:
   - **Non-null**: proceed to step 3.
   - **Null**: ticket is deferred; leave it in `backlog.json` untouched. Tell the user and move to the next ticket.
3. Move the ticket into the sprint immediately:
   - Add a `sprint` field set to the sprint number (integer).
   - Remove the ticket from `backlog.json` and write it.
   - Append the ticket to `current-sprint.json` and write it.
   - Tell the user the ticket has been added to the sprint.
4. Move to the next ticket.

After all tickets are processed, summarize which were added and which were deferred.
