## Arguments

```
/claim-task [topic-area] [task-id]
```

All arguments are optional:
- **Both omitted** — scan all topic areas and reason about the best task to pick up next
- **Topic area only** — pick the best eligible task within `tasks/{topic-area}/`
- **Task ID provided** — claim and execute that specific task

## Step 1: Locate tasks

- If a task ID is given, find that JSON file across all subdirectories of `tasks/`
- If a topic area is given, read all JSON files in `tasks/{topic-area}/`
- If neither, read all JSON files under `tasks/` recursively

## Step 2: Filter eligible tasks

A task is eligible if:
- The file exists as `{task-id}.json` (not `{task-id}.lock`)
- Every task ID listed in `dependencies` has `status: "done"` in its own `.json` file

## Step 3: Select task (when not specified)

- Prefer tasks that appear as a dependency in the most other task files (blockers first)
- Among equals, prefer tasks with no unmet dependencies of their own
- Briefly state your reasoning before claiming

## Step 4: Claim the task

Atomically claim the task by renaming the file from `{task-id}.json` to `{task-id}.lock` before doing any other work.

If the rename fails because `{task-id}.json` no longer exists, another agent has already claimed it. In that case, return to Step 2 and select the next eligible task.