---
name: generate-words
description: Generate new object writing prompts
allowed-tools: Write(web/src/data/words.json)
---

Generate new object writing prompts

The goal is a word that drops a specific, concrete object into the writer's hand. Before adding a word, ask: Can I picture exactly one thing? Can I smell it, weigh it, feel its texture right now?

## Step 1: Generate new prompts

Do NOT read any files before completing this step.

Generate $ARGUMENTS new object writing prompts.
Follow this distribution across the prompts: ~80% single-word, ~20% two-word

Each prompt should meet all of these criteria:
- **Use idiomatic language** Use the most natural, idiomatic name for the object
- **Name a complete thing.** The word should point to a complete object with its own form — something a person made or nature produced, whole and recognizable on its own.
- **Choose a word whose primary meaning is this object.** The word should bring the object to mind before anything else. If the word is commonly used for something unrelated, find one that belongs exclusively to this thing.
- **Choose words that are commonly experienced.** Choose objects that most people would have come across in the physical world at some point.
- **Name the object, not a measure of it.** When the core noun stands alone as a complete, graspable thing, use that word as the prompt. A substance or material that can be pictured and held on its own needs no surrounding phrase to be complete.

Real Pattison examples:
earthworm, pebble, high wire, pollen, curtain, asparagus

## Step 2: Load existing words

Read `web/src/data/words.json`. Deduplicate across the words generated in step 1.

## Step 3: Write the updated file

Append the new prompts to the end of the existing list. Write the full updated array to `web/src/data/words.json` as a pretty-printed JSON array (2-space indent, one item per line).
