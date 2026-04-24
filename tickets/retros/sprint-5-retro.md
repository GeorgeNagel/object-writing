# Sprint 5 Retrospective — 2026-04-22

## Tickets Reviewed

### Done

- [030] Add closed ticket status and close-ticket command
  - Agent retro: The ticket named the new script close-ticket.py but that name was already taken by the done-setting script — required a clarifying question before starting. The ticket story should have made the rename explicit.
  - User retro: (none)
  - Additional feedback: (none)

- [032] Snapshot tests for all Storybook stories
  - Agent retro: The initial approach (direct render via RTL) differed from the Storybook-recommended portable stories pattern. User redirected to the storyshots migration guide mid-implementation, which required switching to composeStories + story.run() + setProjectAnnotations. Could have discovered this upfront by reading the docs before proposing.
  - User retro: Though tests pass, the new storyshot tests surfaced an error message related to typing.
  - Additional feedback: (none)

- [033] Validate API key on exercise start
  - Agent retro: The validateApiKey tests in analysisService.test.ts instantiate Anthropic error classes with full SDK constructor signatures (status, error, message, headers) even though the mock classes are plain `class X extends Error {}` that silently ignore those args. This works at runtime but creates a hidden coupling — if the mock class ever added a real constructor, the extra args would start mattering. The test pattern could instead just use `new Error()` with a name property or a simpler mock approach.
  - User retro: i'd like there to be a step in doing a ticket where the agent asks the user if it's time to be done with the ticket and add retro comments.
  - Additional feedback: (none)

- [039] New story stub script
  - Agent retro: (none)
  - User retro: (none)
  - Additional feedback: (none)

### Carry-over

(none)

## Problems Identified

1. Ticket acceptance criteria didn't capture a naming conflict, causing ambiguity that required a clarifying question before work could start (030).
2. Agent chose an implementation approach without researching the recommended pattern first, requiring a mid-implementation pivot after user redirect (032).
3. Snapshot tests surfaced a pre-existing typing error that wasn't caught or resolved before the ticket was closed (032).
4. The ticket-do workflow has no formal sign-off step, so there's no structured moment for the user to confirm done and add retro comments (033).

## Root Cause Analysis

Problems 1, 2, and 3 were skipped by user request.

### Problem 4: The ticket-do workflow has no formal sign-off step
- Root cause: The ticket-do skill was never designed with an explicit closing protocol — it ends at implementation rather than user confirmation.

## New Tickets Added

| ID  | Title |
|-----|-------|
| 041 | Add user sign-off step to ticket-do workflow |
