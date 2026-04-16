# Task System

On-disk task management for agent workflows.

## Structure

```
tasks/
  {topic-area}/
    {TASK-ID}.json
```

## Task Schema

```json
{
  "id": "string",
  "title": "string",
  "status": "todo | in_progress | done | blocked",
  "story": "As a [role], I want [feature] so that [benefit].",
  "acceptance_criteria": ["string"],
  "dependencies": ["TASK-ID"],
  "claimed_at": "ISO8601 | null",
  "completed_at": "ISO8601 | null"
}
```

## Status Flow

```
todo → in_progress → done
todo → blocked (unmet dependencies)
```

## Agent Workflow

1. User invokes a Claude session and directs it to a topic area (e.g. `tasks/sense-analysis/`)
2. Agent reads task files in that directory and finds one with `status: "todo"` and no unmet dependencies
3. Agent immediately writes `status: "in_progress"` and `claimed_at: <ISO timestamp>` to the file
4. Agent completes the work
5. Agent writes `status: "done"` and `completed_at: <ISO timestamp>` to the file

If a task file already has `status: "in_progress"` or `"done"`, skip it.
