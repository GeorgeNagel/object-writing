# Object Writing App

## Documentation

Avoid duplicate knowledge across markdown files. Each fact should have one authoritative location. Pointer references (e.g. "see X for details") are preferred over restating content.

Documentation should not capture what can be discovered by reading the codebase, since this kind of documentation goes stale.

Documentation should capture what the code alone cannot convey:
- Coding standards
- Design philosophies
- Naming conventions
- Evergreen guidance that shapes how code is written and why

Documentation should live close to the code it describes. Prefer co-locating a doc with its subject over placing it in a centralized docs folder.

## Ticket and sprint utilities

Standalone Python scripts in `scripts/` handle mechanical ticket/sprint operations. Prefer these over LLM file manipulation:

- `next-ticket-id.py` — print next ticket ID and increment `tickets/next-id.txt`
- `sprint-close.py` — validate all tickets terminal (done or closed), archive sprint, reset current sprint
- `complete-ticket.py <id>` — set a ticket to `done` with today's date
- `list-eligible-tickets.py` — print `todo` tickets with all dependencies met

## Key conventions
- All new features and bug fixes should include new tests.
- External API calls should be extracted into a service, never inlined in components
