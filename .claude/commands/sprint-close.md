Close the current sprint by archiving it.

## Arguments

```
/sprint-close
```

## Step 1: Read current sprint

Read `tickets/current-sprint.json`. If it is empty, stop and tell the user there is no active sprint.

## Step 2: Check all tickets are done

If any task has a status other than `"done"`, list the incomplete tickets and stop. All tickets must be done before the sprint can be closed.

## Step 3: Determine archive filename

List files in `tickets/archive/`. Use the `sprint` field on the tickets to determine the sprint number. The archive file is `tickets/archive/sprint-N.json`.

## Step 4: Archive

Write `tickets/current-sprint.json` contents to `tickets/archive/sprint-N.json`, then reset `tickets/current-sprint.json` to `[]`.

Confirm to the user that the sprint is closed and archived.
