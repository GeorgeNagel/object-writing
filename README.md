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

