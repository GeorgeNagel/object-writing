Create a new task file by grooming a user story through a structured Q&A process.

## Arguments

```
/story [description]
```

- **description** (optional) — a rough description of the story (e.g. "user can set exercise duration")

## Step 1: Parse input

If a description argument was provided, use it as the starting point. If not, ask the user to describe the story in one or two sentences before continuing.

## Step 2: Determine topic area

List the subdirectories of `tasks/`. Present them to the user and ask which topic area this story belongs to. Allow the user to specify a new area not in the list.

## Step 3: Determine next ID

List the filenames (names only — do not read file contents) in `tasks/{topic-area}/`. Derive the ID prefix from existing filenames (e.g. `EX` from `EX-001.json`). Increment to the next unused number (e.g. if `EX-003` is the highest, use `EX-004`).

If the area is new, ask the user for a short uppercase prefix (e.g. `EX`, `TIMER`).

## Step 4: Discovery Q&A loop

Ask one question at a time and wait for the user's answer. Cover these topics, in whatever order makes sense given the description:

- **Goal**: What does success look like? Why does the user want this?
- **Acceptance criteria**: What specific, testable conditions must be true when this is done?
- **Scope / constraints**: What is explicitly out of scope or technically constrained?

After each answer, critically examine it before asking the next question:

- Call out anything vague or that could be interpreted multiple ways
- Flag acceptance criteria that aren't independently testable (e.g. "works well" is not testable; "completes within 200ms" is)
- Surface hidden assumptions (e.g. "this implies X already exists — is that true?")
- Challenge scope decisions that seem inconsistent with the stated goal
- Ask follow-up questions to resolve any ambiguity before moving on

Repeat the loop — revisiting earlier answers if needed — until the story is unambiguous and all acceptance criteria are concrete and testable. Only exit the loop when you and the user agree the story is well-defined.

## Step 5: Preview

Synthesize the answers into a task file draft:

```json
{
  "id": "{PREFIX}-{NNN}",
  "title": "{short title derived from description}",
  "status": "todo",
  "story": "As a [persona], I want [goal] so that [reason]",
  "acceptance_criteria": [
    "...",
    "..."
  ],
  "dependencies": []
}
```

Display the full JSON and ask the user to confirm before writing. If the user requests changes, update the draft and re-display before writing.

## Step 6: Write

On confirmation, write the file to `tasks/{topic-area}/{id}.json`.
