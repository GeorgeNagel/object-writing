Run a retrospective for the current sprint.

## Arguments

```
/retro
```

## Step 1: Load sprint tickets

Read `tickets/current-sprint.json`. If it is empty, stop and tell the user there is no active sprint.

Separate tickets into two groups:
- **Done**: `status: "done"`
- **Open/carry-over**: any other status

## Step 2: Ticket recap

For each ticket (done tickets first, then open/carry-over), present:

```
## [{id}] {title}  ({status})

**Agent retro:** {agent_retro or "(none)"}
**User retro:** {user_retro or "(none)"}
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
  "id": "{NNN}",
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

Determine the next available ID by reading `tickets/backlog.json`, `tickets/current-sprint.json`, and all files in `tickets/archive/`. Use the highest existing numeric ID incremented by 1, zero-padded to three digits.

Present each proposed ticket one at a time. For each, ask: "Add this to the backlog, skip it, or edit it?" Apply any edits requested before writing.

## Step 6: Write approved tickets

Append all approved tickets to `tickets/backlog.json` and write the file.

Confirm to the user how many tickets were added and list their IDs and titles.
