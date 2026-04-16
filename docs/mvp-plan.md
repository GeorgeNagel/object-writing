# Object Writing App — MVP Plan

## Overview

A web application for timed object writing exercises to improve songwriting skills.
Built with React + Vite, LLM-powered sense analysis, portfolio-ready architecture.

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Testing:** Vitest + React Testing Library
- **LLM Provider:** Anthropic (Claude)
- **Persistence:** None for MVP
- **Backend:** None for MVP

---

## Architecture Principles

- `services/` layer for all LLM calls — clean separation, easy to move server-side later
- Component structure anticipates eventual Django backend migration
- LLM integration prominent and well-structured (portfolio signal)
- All features must include tests

---

## Out of Scope for MVP

- User accounts / authentication
- Server-side storage
- Persistence / exercise history
- Sharing or exporting results
- Custom timer duration
- Manual word selection

---

## Future Backend (Post-MVP)

- Django + PostgreSQL + Docker
- Server-side LLM API calls (no client-side key exposure)
- Multi-user support
- Exercise history synced across devices
