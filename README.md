# ai-object-writing


## Running tests

**Script tests** (Python, no dependencies):
```
python3 scripts/test_scripts.py
```

**Web tests**:
```
cd web && npm test
```

## Generating the word list

Run `/generate-words` in `claude` to generate 50 new prompts and append them to `web/src/data/words.json`.

## Creating a new ticket

From within a Claude session, run:

```
# Note, the `!` prefix runs the command in the session.
! python3 scripts/new-story.py "Your ticket title"

# Create a stub ticket (title only)
! python3 scripts/new-story.py --stub "Your ticket title"
```

# Running the backend

```
docker-compose up --bild
```

Visit http://localhost:8000/ for the Django server
