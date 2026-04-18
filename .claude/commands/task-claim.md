## Arguments

```
/task-claim [task-id]
```

All arguments are optional:
- **Omitted** — reason about the best task to pick up next
- **Task ID provided** — claim that specific task

## Step 1: Read tasks

Read `tasks/current-sprint.json`.

## Step 2: Filter eligible tasks

A task is eligible if:
- Its `status` is `"todo"`
- Every task ID listed in `dependencies` has `status: "done"` (check both `tasks/current-sprint.json` and `tasks/backlog.json` for dependency statuses)

## Step 3: Select task (when not specified)

- Prefer tasks that appear as a dependency in the most other eligible tasks (blockers first)
- Among equals, prefer tasks with no unmet dependencies of their own
- Briefly state your reasoning before claiming

## Step 4: Claim the task

Set the task's `status` to `"in_progress"` and write the updated `tasks/current-sprint.json`. Do not do any other work.
