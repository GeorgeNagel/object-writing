Execute the currently claimed task

## Arguments

```
/task-do
```

## Step 1: Ask clarifying questions

Read `tasks/current-sprint.json` and find the task with `status: "in_progress"`. Read the task's `story` and `acceptance_criteria` carefully. Identify any ambiguities — unclear requirements, missing context, or architectural choices not addressed by the task.

Ask clarifying questions **one at a time** and wait for the user's answer before asking the next. Do not proceed to Step 2 until all ambiguities are resolved.

If there are no ambiguities, skip this step.

## Step 2: Plan the work

Use the task's `story` and `acceptance_criteria` as the sole source of truth, updated with any answers from Step 1.
Follow all repo conventions.
New features should have new tests.
Bugfixes should have tests that initially fail (demonstrating the bug) and pass after the fix.

Generate a plan for executing the work and confirm with the user.

## Step 3: Execute the work

Following the plan above, complete the task.
If you're working on a bugfix, show the new test initially fails, exposing the bug.
Any new features should have tests.
Make sure all linters and tests pass before exiting this step.

## Step 4: Retrospective

Update the retro fields in the task in `tasks/current-sprint.json`.

**Agent retro** (`agent_retro`): Reflect honestly on the task. Only write something if you feel strongly that it would be useful — do not fill this field just because it exists. If you write anything, focus only on problems: things that were confusing, took longer than expected, caused mistakes, or required backtracking. Do not include suggestions or recommendations — only observations of what caused friction.

If nothing stands out, set the field to `null`.

**User retro** (`user_retro`): Ask the user: "Anything to add to the retro for this task?" Wait for their response. If they decline or have nothing to add, set the field to `null`. Add their response verbatim here and don't implement their suggested changes from this question.

## Step 5: Close the task

Set the task's `status` to `"done"` and add a `completed_at` timestamp. Write the updated `tasks/current-sprint.json`.
