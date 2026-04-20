# Sprint 2 Retrospective — 2026-04-19

## Tickets Reviewed

### Done

- [019] Merge API key input into start screen
  - Agent retro: (none)
  - User retro: (none)
  - Additional feedback: (none)

- [020] Auto-growing editor with no resize handle
  - Agent retro: (none)
  - User retro: I want the ability to close tickets and give them a 'closed' status to keep track of the fact that programming work was not done.
  - Additional feedback: (none)

- [021] Consistent premium styling across all screens
  - Agent retro: The getByText/strong split was a non-obvious breakage — testing-library's getNodeText only includes direct text nodes, not child element text, so wrapping values in <strong> silently broke existing tests. This required understanding an underdocumented testing-library behavior.
  - User retro: the agent left testing instructions in the story file. test instructions should be given directly to me, not left in comment blocks. ew. also, the agent didn't give me an opportunity to test before closing the ticket.
  - Additional feedback: There were a number of times this sprint where the user tried to give text to enter in a text field verbatim, and the agent took action without asking for confirmation.

- [022] Highlights snap to word boundaries
  - Agent retro: After the plan changed mid-execution (user corrected the root cause analysis), I proceeded directly into implementation without re-confirming the updated plan with the user.
  - User retro: Agent went directly into executing before getting confirmation that the plan was acceptable. Also, marking tasks as in-progress has no value when only one agent is running at a time. Agent should not read the codebase while writing stories.
  - Additional feedback: Some tickets this sprint weren't very well groomed — the problem should be clearer for both human and agent. A number of tickets included implementation details; story writing should be agnostic to implementation and focused on identifying the problem and acceptance criteria from a user perspective.

### Carry-over

(none)

## Problems Identified

1. Agent acted on verbatim text input without asking for confirmation first.
2. Agent closed tickets without giving the user an opportunity to test.
3. Agent left testing instructions in story/code files instead of communicating them directly to the user.
4. Agent proceeded into implementation after a plan change without re-confirming the updated plan.
5. Tickets were not well-groomed — the problem was unclear for both human and agent.
6. Tickets included implementation details; story writing should be agnostic to implementation and focused on user-facing problem and acceptance criteria.
7. No way to close a ticket with a "closed" status to track that programming work was intentionally not done.

## Root Cause Analysis

### Problem 1: Agent acted on verbatim text input without asking for confirmation
- Why? ticket-do uses an LLM to handle data-entry tasks that require deterministic execution.
  - Why? An LLM interprets instructions contextually and may act on text it should just transcribe.
    - Root cause: ticket-do has no instruction to treat user-provided verbatim text as inert data. A script would be more appropriate for this kind of deterministic field placement.

### Problems 2 & 3: Agent closed tickets without user verification; left instructions in files
- Why? The agent recognized human verification was required but did not know it should wait.
  - Why? ticket-do only instructs the agent to close when tests pass — there is no instruction to pause for human verification or to communicate testing steps in chat.
    - Root cause: ticket-do has no human verification gate for cases where automated tests are insufficient, and no instruction about where to communicate testing steps.

### Problem 4: Agent proceeded after plan change without re-confirming
- Why? There is no instruction in ticket-do to repeat the plan confirmation step when the plan changes.
  - Root cause: ticket-do has a plan confirmation step at the start but no instruction to re-run it when the plan changes mid-execution.

### Problem 5: Tickets were not well-groomed
- Why? Tickets are often created quickly as placeholders, and there was no grooming step before sprint pull-in.
  - Why? The workflow assumed tickets would be fully groomed at creation time, so no grooming step was built.
    - Root cause: The sprint-start process has no interactive grooming step; tickets are pulled in as-is regardless of quality.

### Problem 6: Tickets included implementation details
- Why? The story command does not instruct the agent to avoid reading the codebase or including implementation details.
  - Root cause: story command has no explicit constraint against technical detail or codebase access, so agents naturally encode implementation context into acceptance criteria.

### Problem 7: No closed ticket status
- Why? "Closed" was not a defined part of the workflow and no command existed for it.
  - Root cause: The ticket workflow only defined "done" as a terminal status; no mechanism existed to intentionally abandon a ticket without completing it.

## New Tickets Added

| ID  | Title |
|-----|-------|
| 026 | Add human verification gate to ticket-do command |
| 027 | Add plan re-confirmation step on plan changes in ticket-do |
| 028 | Groom tickets interactively during sprint-start |
| 029 | Make story command implementation-agnostic |
| 030 | Add closed ticket status and close-ticket command |
| 031 | Replace LLM-driven verbatim field entry in ticket-do with explicit instruction |
