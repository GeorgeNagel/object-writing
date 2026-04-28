---
name: ticket-claim
description: Claim a ticket by setting its status to in_progress
allowed-tools: Bash(python3 .claude/skills/ticket-claim/claim-ticket.py *)
---

execute `python3 .claude/skills/ticket-claim/claim-ticket.py $ARGUMENTS`
