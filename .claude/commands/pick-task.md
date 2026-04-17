Find, claim, and execute one task from the on-disk task system, then mark it done.

## Arguments

```
/pick-task [topic-area] [task-id]
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
- The file exists as `{task-id}.json` (not `{task-id}.lock` — that means another agent has claimed it)
- `status` is `"todo"`
- Every task ID listed in `dependencies` has `status: "done"` in its own `.json` or `.done.json` file

## Step 3: Select task (when not specified)

- Prefer tasks that appear as a dependency in the most other task files (blockers first)
- Among equals, prefer tasks with no unmet dependencies of their own
- Briefly state your reasoning before claiming

## Step 4: Claim the task

Atomically claim the task by renaming the file from `{task-id}.json` to `{task-id}.lock` before doing any other work.

If the rename fails because `{task-id}.json` no longer exists, another agent has already claimed it. In that case, return to Step 2 and select the next eligible task.

## Step 5: Ask clarifying questions

Read the task's `story` and `acceptance_criteria` carefully. Identify any ambiguities — unclear requirements, missing context, or architectural choices not addressed by the task.

Ask each question **one at a time** and wait for the user's answer before asking the next. Do not proceed to Step 6 until all ambiguities are resolved.

If there are no ambiguities, skip this step.

## Step 6: Execute the work

- Use the task's `story` and `acceptance_criteria` as the sole source of truth, updated with any answers from Step 5
- Follow all repo conventions: TypeScript, tests required, `services/` layer for LLM calls

## Step 7: Retrospective

Before marking done, populate the retro fields in the `.lock` file.

**Agent retro** (`agent_retro`): Reflect honestly on the task. Only write something if you feel strongly that it would be useful — do not fill this field just because it exists. If you write anything, focus only on problems: things that were confusing, took longer than expected, caused mistakes, or required backtracking. Do not include suggestions or recommendations — only observations of what caused friction.

If nothing stands out, set the field to `null`.

**User retro** (`user_retro`): Ask the user: "Anything to add to the retro for this task?" Wait for their response. If they decline or have nothing to add, set the field to `null`.

## Step 8: Mark done

Once both retro fields are populated, update the `.lock` file with:

```json
"agent_retro": "<string or null>",
"user_retro": "<string or null>",
"status": "done",
"completed_at": "<ISO 8601 timestamp>"
```

Then rename the file from `{task-id}.lock` to `{task-id}.done.json`.

## Step 9: No eligible tasks

If no eligible task is found, report each task and why it is ineligible: claimed by another agent (`.lock`), already done (`.done.json`), or blocked by unmet dependencies.
