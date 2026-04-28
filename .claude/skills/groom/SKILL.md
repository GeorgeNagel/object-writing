---
name: groom
description: Groom a user story ticket so that it's ready to be worked on
allowed-tools:
  - Read(tickets/**)
  - Write(tickets/**)
---


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

## Step 3: Duplicate check

Search for potential duplicates across `tickets/current-sprint.json` and `tickets/backlog.json`. Compare the title, story, and acceptance criteria of the ticket being groomed against all other tickets. Look for:
- Tickets with the same or very similar title
- Tickets whose story describes the same user goal
- Tickets whose ACs substantially overlap with the current ticket's ACs

If potential duplicates are found, list them with their IDs, titles, and statuses, and explain the overlap. If none are found, say so.

Use `AskUserQuestion` to present response options:
- `Continue` — no duplicates, or user acknowledges and wants to proceed
- `Stop` — user decides not to continue given the duplicates found

If the user stops, do not proceed to Step 4.

## Step 4: Run checklist

Run the following five checklist items in order. For each item:

1. Analyze the ticket and present your findings. Be specific — quote relevant text and explain the concern. If no concern is found, say so. If the agent has suggestions (e.g. proposed non_goals, ACs, assumptions), present them now.
2. Use `AskUserQuestion` to present response options based on whether suggestions were made:

   **When no suggestions were made:**
   - `Keep original values` — item passes, no changes
   - `Edit (I'll dictate)` — user dictates changes; agent applies and confirms; item recorded as failed
   - `Mark as failed and continue` — item recorded as failed, no changes

   **When the agent has suggestions:**
   - `Keep original values` — no changes applied; item passes
   - `Accept suggestions` — apply agent's proposals verbatim; item recorded as failed; continue
   - `Accept suggestions with edits` — apply agent's proposals, then ask user what to change; confirm; item recorded as failed; continue
   - `Edit (I'll dictate)` — user dictates from scratch; agent applies and confirms; item recorded as failed; continue
   - `Mark as failed and continue` — item recorded as failed, no changes

3. The user has final say. Apply the chosen action and continue.

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

This item has no editable field. Use `AskUserQuestion` to present only:
- `Mark as passed`
- `Mark as failed`

## Step 5: Evaluate pass result

After all five checklist items, evaluate based on the **initial** response for each item — `keep original values` = passed; anything else = failed. Subsequent edits do not convert a failed item to a pass for this evaluation.

- **All five initially passed**: proceed to Step 6 with `groomed_at` set to the current ISO datetime.
- **Any item initially failed**: list those items and use `AskUserQuestion` to ask "Run the checklist again from the start?" with options:
  - `Run again` — return to Step 4 with the updated in-memory ticket
  - `Defer` — proceed to Step 6 without setting `groomed_at`
  - `Mark as groomed` — user overrides the agent's judgment; set `groomed_at` to the current ISO datetime and proceed to Step 6

## Step 6: Write results

If a full clean pass was achieved or the user marked the ticket as groomed, set `groomed_at` to the current ISO datetime (e.g. `2026-04-23T14:30:00Z`).

If any edits were made to the ticket in memory, or if `groomed_at` was set:

1. Ensure `non_goals`, `assumptions`, and `groomed_at` are present in the ticket object with their current in-memory values.
2. Locate the ticket in the source file. Replace the ticket object with the updated object. Write the file.
3. Confirm to the user: file written, ticket ID, and whether `groomed_at` was set.

If no edits were made and `groomed_at` was not set, confirm that no changes were written.
