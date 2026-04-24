Groom a single ticket by running a structured checklist interactively with the user.

## Arguments

```
/groom <ticket-id>
```

- **ticket-id** — the ID of the ticket to groom (e.g. `046`)

## Step 1: Load ticket

Search `tickets/current-sprint.json` first, then `tickets/backlog.json`. Find the ticket whose `id` matches the argument.

If the ticket is not found in either file, stop and tell the user.

If the ticket has a terminal status (`done` or `closed`), warn the user and ask whether to continue. If they decline, stop.

Note which file the ticket came from — you will write back to the same file in Step 5.

## Step 2: Prepare for grooming

If the ticket already has a non-null `groomed_at`, tell the user the ticket was previously groomed at that timestamp and that grooming will reset it. Set `groomed_at` to `null` in memory (do not write yet).

Ensure the ticket object has all three schema fields in memory. If any are absent, use their defaults:
- `non_goals`: `[]`
- `assumptions`: `[]`
- `groomed_at`: `null`

## Step 3: Run checklist

Run the following five checklist items in order. For each item:

1. Analyze the ticket and present your findings. Be specific — quote relevant text and explain the concern. If no concern is found, say so.
2. Ask the user: **pass / fail**. The user has final say.
3. If **fail**:
   - Ask: "Edit now, or skip and continue?"
   - If **edit**: user dictates the change in chat. Apply it to the ticket in memory. Confirm the updated field with the user before continuing.
   - If **skip**: record the item as failed and continue.
4. If **pass**: record it and continue.

### Checklist items

**1. Story**
Is the user-facing goal clear and implementation-agnostic?

Look for:
- Missing persona, goal, or reason ("As a..., I want..., so that...")
- Implementation details (file names, component names, technical architecture)
- Vague verbs ("works", "handles", "supports") that don't define a concrete outcome
- A goal that could be interpreted more than one way

**2. Acceptance criteria**
Are all ACs verifiable? Do the ACs fully cover the story?

Look for:
- ACs that are not independently testable ("works well", "feels right")
- ACs that describe implementation rather than observable outcomes
- Gaps: scenarios implied by the story with no corresponding AC
- Overlapping, redundant, or contradictory ACs

**3. Non-goals**
Is scope explicitly bounded?

Look for:
- Related features a reasonable person might assume are included but are not
- Edge cases the ACs are silent on that could cause scope creep
- If something is explicitly undesirable/unreasonable, that means it should be covered in the AC rather than non-goals.
- If `non_goals` is empty: propose candidates based on the story and ask whether any apply

**4. Assumptions**
Are all assumptions explicit and accepted?

Look for:
- Implicit dependencies on things that may not exist
- Conditions the ticket takes for granted about the user, system, or data
- If `assumptions` is empty: surface any implicit assumptions and ask whether any should be recorded

**5. Consistency**
Are there inconsistencies across all fields?

Look for:
- Mismatches between story and ACs (story says X, ACs don't verify X)
- Non-goals that contradict the story or ACs
- Assumptions that conflict with the ACs
- Title that misrepresents the story

## Step 4: Evaluate pass result

After all five items, evaluate based on the **initial** pass/fail verdict for each item — inline edits do not convert a failed item to a pass for this evaluation.

- **All five initially passed**: proceed to Step 5 with `groomed_at` set to the current ISO datetime.
- **Any item initially failed or skipped** (even if subsequently edited): list those items and ask: "Run the checklist again from the start?" If yes, return to Step 3 with the updated in-memory ticket. If no, ask the user:
  - **Defer** — proceed to Step 5 without setting `groomed_at`
  - **Mark as groomed** — user overrides the agent's judgment; set `groomed_at` to the current ISO datetime and proceed to Step 5

## Step 5: Write results

If a full clean pass was achieved or the user marked the ticket as groomed, set `groomed_at` to the current ISO datetime (e.g. `2026-04-23T14:30:00Z`).

If any edits were made to the ticket in memory, or if `groomed_at` was set:

1. Ensure `non_goals`, `assumptions`, and `groomed_at` are present in the ticket object with their current in-memory values.
2. Locate the ticket in the source file. Replace the ticket object with the updated object. Write the file.
3. Confirm to the user: file written, ticket ID, and whether `groomed_at` was set.

If no edits were made and `groomed_at` was not set, confirm that no changes were written.
