# Sprint 3 Retrospective — 2026-04-20

## Tickets Reviewed

### Done
- [023] Single source of truth for sense names in analysisService
  - Agent retro: The ANALYSIS_PROMPT contains the sense names as natural language with extra descriptions — initially tried to unify it with the code list, but that removed useful LLM context. The ticket's acceptance criteria don't distinguish prompt strings from programmatic lists, which caused a misstep.
  - User retro: (none)
  - Additional feedback: (none)

- [024] Replace hardcoded colors with named constants
  - Agent retro: The ticket did not specify where to put the naming standard doc or the naming convention itself — both required clarifying questions before work could begin. The inline-style vs CSS distinction also needed resolution upfront.
  - User retro: Documentation should avoid pointing to exactly where things are defined or exact variable names, as this has a tendency to go stale. Agent has a tendency to act on retro feedback without asking for confirmation.
  - Additional feedback: (none)

- [025] Storybook stories for Button, RadioGroup, and TextArea components
  - Agent retro: (none)
  - User retro: (none)
  - Additional feedback: (none)

- [028] Groom tickets interactively during sprint-start
  - Agent retro: (none)
  - User retro: (none)
  - Additional feedback: (none)

## Problems Identified

- We need documentation for agents that tells them documentation philosophies (e.g. avoid exact file paths and variable names; documentation best lives close to the code it documents)
- Agent acted on retro feedback without first asking for confirmation

## Root Cause Analysis

### Documentation philosophies for agents
- Why? The agent defaults to a centralized docs/ folder and documents exact paths/names.
  - Why? The agent may be repeating patterns from the codebase, or has no instruction correcting its defaults.
    - Why? No agent-facing documentation philosophy exists in the project.
      - Root cause: No documentation philosophy guide exists, so the agent falls back on LLM defaults — centralized docs/ folder, exact paths and variable names — producing stale, low-visibility documentation.

### Agent acted on retro feedback without confirmation
- Why? The agent may interpret verbatim user text as instructions rather than data to record.
  - Why? There is no tooling that bypasses the LLM for verbatim field entry; the LLM handles all retro input.
    - Why? No such tooling has been built yet — this is a new project.
      - Root cause: No tooling exists to record user retro feedback verbatim, so the LLM interprets and paraphrases it — sometimes treating feedback as an instruction to act on.

## New Tickets Added

| ID | Title |
|----|-------|
| 036 | Add documentation philosophy guide for agents |
| 037 | Script to record user retro feedback verbatim |
