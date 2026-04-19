# Object Writing App

## Project docs

- **MVP plan** — `docs/mvp-plan.md`: tech stack, architecture principles, scope constraints, future backend

## Documentation

Avoid duplicate knowledge across markdown files. Each fact should have one authoritative location. Pointer references (e.g. "see X for details") are preferred over restating content.

## Key conventions

- TypeScript throughout
- All features must include tests (Vitest + React Testing Library)
- LLM calls live in `src/services/` — never inline in components
- API key is entered at runtime, never stored or committed

## Ticket management

Use `/pick-ticket` to claim and execute a ticket.
