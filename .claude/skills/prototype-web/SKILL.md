---
name: prototype-web
description: Create a series of interactive web-based prototypes
allowed-tools:
  - Write(prototypes/**)
---

Execute each of these steps strictly in order.

Note: All prototypes should live in the prototypes/ folder, in a subfolder named `yyyy-mm-dd-<prototype-topic>`

1. Ask the user if the agent should read the codebase to perform this task. If no, DO NOT read any other files in the codebase.
2. Ask the user what is the goal of the prototype
  - Exploring a particular UX interaction?
  - Testing out a new full-stack feature?
  - Other?
3. Continue refining and asking follow up questions until a shared understanding is reached about the goal of the prototype and this has been confirmed by the user. Do not proceed until the user has EXPLICITLY stated that the shared understanding has been reached.
3. Plan three approaches to achieving the stated goal. Share this plan with the user, but don't wait for confirmation before moving to the next step.
4. Create a static web page as an entry point to the prototype(s). The page will have three columns, each with a title for the approach, a button to click through to view that approach, and a description of the approach and a list of pros/cons that you generate.
5. Generate static web pages to explore the interaction or prototype for each of the three approaches. Clicking the button from the entry page should take the user to a page where they can explore that particular prototype.

Use mock data and mocked responses wherever possible (e.g. lorem ipsum, dummy data, mocked success/failure api calls). Do not make external API calls.

Where possible, share mocked data between prototypes in a common `data/` subfolder

Use whatever tooling gets the job done fastest, but do not install any dependencies (no npm, no python). Prefer publicly hosted js builds and static js and static css.