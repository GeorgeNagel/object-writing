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

## Features

### API Key
- User enters their Anthropic API key at the start of each session
- Key is never stored or persisted — entered fresh each session

### Word List
- Static JSON file of object words bundled with the app
- Generated once via a one-off LLM batch script

### Exercise Flow
1. User lands on the app and enters their API key
2. User clicks **Start** to begin an exercise
3. A random object word is displayed
4. A 10-minute countdown timer begins
5. A free-text editor is shown for writing
6. When the timer expires, writing is locked and sent to Claude for analysis

### Sense Analysis
- Full text sent to Claude with a structured prompt
- Claude identifies and categorizes sensory language by sense
- Senses: **sight**, **sound**, **smell**, **taste**, **touch/kinaesthetic**
- Response drives text highlighting (one color per sense)

### Results View
- Highlighted text with color-coded sensory phrases
- Score displayed:
  - Number of distinct senses used
  - Frequency per sense
  - Total word count
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
