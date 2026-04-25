Generate 50 new object writing prompts and append them to `web/src/data/words.json`.

## Step 1: Load existing words

Read `web/src/data/words.json`. Store the current list — you will use it for deduplication and as the base for the updated file.

## Step 2: Generate new prompts

Generate exactly 50 new object writing prompts. Each prompt must:

- Be a concrete, sensory-rich noun (one, two, or three words)
- Follow this distribution across the 50 prompts: ~40 single-word, ~5 two-word, ~5 three-word
- Be something you can physically encounter and engage with through the senses
- Not be a person, proper noun, or named location
- Not be an abstract concept
- Not already appear in the existing word list (case-insensitive match)

Style reference — Pat Pattison object writing favors objects that are:
- Tactile and textured (saddle, cracked mirror, bark)
- Carrying history or use (spent match, rusted hinge, old photograph)
- Drawn from nature, tools, household, food, clothing, instruments, or the body
- Vivid enough to trigger a strong sensory image on their own

Real Pattison examples:
earthworm

## Step 3: Write the updated file

Append the 50 new prompts to the end of the existing list. Write the full updated array to `web/src/data/words.json` as a pretty-printed JSON array (2-space indent, one item per line).
