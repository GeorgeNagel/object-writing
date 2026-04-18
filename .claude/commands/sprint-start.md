Start a new sprint by pulling tasks from the backlog into the current sprint.

## Arguments

```
/sprint-start [criteria or task IDs]
```

- **criteria** — natural language description of what to pull in (e.g. "the next 3 unblocked tasks")
- **task IDs** — explicit list of IDs to include (e.g. "019 020 021")
- **omitted** — ask the user what to pull in before proceeding

## Step 1: Check for active sprint

Read `tasks/current-sprint.json`. If it is non-empty, stop and tell the user there is already an active sprint. Do not proceed.

## Step 2: Determine sprint number

List files in `tasks/archive/`. The sprint number is one higher than the highest `sprint-N.json` found. If no archive files exist, use `1`.

## Step 3: Select tasks

Read `tasks/backlog.json`.

If the user provided task IDs, use those. If the user provided criteria, select tasks from the backlog that match. If nothing was provided, ask the user what to pull in.

All selected tasks must exist in `backlog.json` with `status: "todo"`. If any selected task is not found, report the missing IDs and stop.

## Step 4: Confirm

List the selected tasks (id + title) and the sprint number. Ask the user to confirm before making any changes.

## Step 5: Execute

1. Add a `sprint` field set to the sprint number (integer) to each selected task
2. Remove the selected tasks from `backlog.json` and write it
3. Write the selected tasks to `current-sprint.json`
