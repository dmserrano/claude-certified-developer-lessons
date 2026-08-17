# Exercise 01 — first calls (the foundations CLI)

> How to use: build the module-01 CLI here by filling in the `TODO`s, working through `tutorial-01.md` with your tutor · owned by /tutor.

## Setup

```bash
cd exercises/01-first-calls
npm install
cp .env.example .env   # then paste your key into .env
```

You need an Anthropic API key (Claude Console → Settings → API keys). The SDK reads `ANTHROPIC_API_KEY` from the environment automatically.

Run the CLI at any step with:

```bash
npx tsx cli.ts "your prompt here"
```

## What you're building

One CLI that grows across four steps (see `tutorial-01.md`):

1. **Basic call** — non-streaming Messages API call; print text + `usage`.
2. **Streaming** — stream text to stdout; print `usage` at the end.
3. **Prompt caching** — long cached system prompt; observe `cache_creation` → `cache_read` across two runs.
4. **Cost accounting** — turn `usage` into an estimated dollar cost per call.

## How to verify each step

- Step 1: you see the model's answer, then a line with input/output token counts.
- Step 2: text appears incrementally (not all at once), token counts still print.
- Step 3: run twice within 5 min — run 1 shows `cache_creation_input_tokens > 0`, run 2 shows `cache_read_input_tokens > 0`.
- Step 4: each call ends with an estimated cost in dollars, using rates you looked up from the pricing docs.

Fill in `cli.ts`. Don't copy a finished answer — the TODOs are the exercise.
