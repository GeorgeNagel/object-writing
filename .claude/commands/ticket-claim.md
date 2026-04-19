## Arguments

```
/ticket-claim [ticket-id]
```

All arguments are optional:
- **Omitted** — reason about the best ticket to pick up next
- **Ticket ID provided** — claim that specific ticket

## Step 1: Read tickets

Read `tickets/current-sprint.json`.

## Step 2: Filter eligible tickets

A ticket is eligible if:
- Its `status` is `"todo"`
- Every ticket ID listed in `dependencies` has `status: "done"` (check both `tickets/current-sprint.json` and `tickets/backlog.json` for dependency statuses)

## Step 3: Select ticket (when not specified)

- Prefer tickets that appear as a dependency in the most other eligible tickets (blockers first)
- Among equals, prefer tickets with no unmet dependencies of their own
- Briefly state your reasoning before claiming

## Step 4: Claim the ticket

Set the ticket's `status` to `"in_progress"` and write the updated `tickets/current-sprint.json`. Do not do any other work.
