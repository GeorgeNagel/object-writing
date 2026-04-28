---
name: ticket-close
description: Close a ticket by setting its status to closed (for tickets which will not be completed)
allowed-tools: Bash(python3 .claude/skills/ticket-close/close-ticket.py *)
---

execute `python3 .claude/skills/ticket-close/close-ticket.py $ARGUMENTS`
