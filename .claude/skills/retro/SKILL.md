---
name: retro
description: Perform a retrospective on the current sprint to elicit improvements
allowed-tools:
  - Read(tickets/**)
---


## Step 1: Load sprint tickets

Read `tickets/current-sprint.json`. If it is empty, stop and tell the user there is no active sprint.

Separate tickets into two groups:
- **Done**: `status: "done"`
- **Open/carry-over**: any other status

## Step 2: Ticket recap

For each ticket (done tickets first, then open/carry-over), present:

```
## [{id}] {title}  ({status})

**Agent retro:** {retro_notes.agent entries or "(none)"}
**User retro:** {retro_notes.user entries or "(none)"}
```

After presenting each ticket, ask: "Anything to add about this ticket?"

Wait for the user's response before moving to the next ticket. Collect their answer as additional feedback for that ticket. If they have nothing to add, move on.

## Step 3: Cluster and confirm

Synthesize all retro notes and additional feedback into a flat list of distinct problems. Do not group into themes yet — list each problem individually.

Present the list and ask: "Does this capture all the main problems? Anything missing or to remove?"

Iterate — adding, removing, or rewording items — until the user confirms the list is complete.

## Step 4: Five why's

For each problem in the confirmed list, run a five why's discussion:

1. State the problem clearly.
2. Ask "Why did this happen?"
3. After each answer, ask "Why?" again, digging deeper.
4. Continue until a root cause is reached — typically 3–5 levels deep, but stop earlier if the user signals the root cause is found or later if more depth is needed.
5. Summarize the root cause before moving to the next problem.

## Step 5: Propose tickets

For each root cause identified in Step 4, propose a backlog ticket:

```json
{
  "title": "{short title}",
  "status": "todo",
  "story": "As a [persona], I want [goal] so that [reason]",
  "acceptance_criteria": [
    "...",
    "..."
  ],
  "dependencies": []
}
```

Present each proposed ticket one at a time. For each, ask: "Add this to the backlog, skip it, or edit it?" Apply any edits requested before using `scripts/new-story.py` with the `--json=<Json blob>` to create the new ticket.

Confirm to the user how many tickets were added and list their IDs and titles.

## Step 6: Write retro summary

Determine the sprint number from the `sprint` field on tickets in `tickets/current-sprint.json`. If unavailable, use `unknown`.

Write a markdown summary to `tickets/retros/sprint-{N}-retro.md` (create the directory if needed) containing:

1. Header: sprint number and today's date
2. **Tickets Reviewed** — done tickets then carry-over, each showing agent_retro, user_retro, and any additional feedback collected in Step 2
3. **Problems Identified** — the confirmed flat list from Step 3
4. **Root Cause Analysis** — for each problem, the layered Why chain and root cause summary from Step 4
5. **New Tickets Added** — table of approved tickets (ID + title)

Use this structure:

```markdown
# Sprint {N} Retrospective — {YYYY-MM-DD}

## Tickets Reviewed

### Done
- [{id}] {title}
  - Agent retro: {retro_notes.agent entries or "(none)"}
  - User retro: {retro_notes.user entries or "(none)"}
  - Additional feedback: {collected in Step 2 or "(none)"}

### Carry-over
- (same format)

## Problems Identified

- {problem 1}
- {problem 2}

## Root Cause Analysis

### {Problem 1}
- Why? {answer}
  - Why? {answer}
    - Root cause: {summary}

## New Tickets Added

| ID | Title |
|----|-------|
| {id} | {title} |
```

Confirm to the user the path of the file written.
