Close the current sprint by archiving it.

## Arguments

```
/sprint-close
```

## Step 1: Read current sprint

Read `tasks/current-sprint.json`. If it is empty, stop and tell the user there is no active sprint.

## Step 2: Check all tasks are done

If any task has a status other than `"done"`, list the incomplete tasks and stop. All tasks must be done before the sprint can be closed.

## Step 3: Determine archive filename

List files in `tasks/archive/`. Use the `sprint` field on the tasks to determine the sprint number. The archive file is `tasks/archive/sprint-N.json`.

## Step 4: Archive

Write `tasks/current-sprint.json` contents to `tasks/archive/sprint-N.json`, then reset `tasks/current-sprint.json` to `[]`.

Confirm to the user that the sprint is closed and archived.
