# Milestone 01 — Claude foundations CLI

> How to use: your deliverable for module 01 lives here · owned by you (built in `../../exercises/01-first-calls/`) · next: when it passes the acceptance check below, run `/editor`.

## Deliverable

A TypeScript CLI (`cli.ts`, runnable via `tsx`) that takes a prompt argument, calls Claude, and demonstrates the four foundations. Drop your finished version here (or note that it lives in the exercise folder) when done.

## Acceptance check (the Editor judges against this)

- [ ] **Streams** the model's response to stdout incrementally (not one final dump).
- [ ] Uses a **cached system prompt** via `cache_control`, and across two runs within the TTL you can show `cache_creation_input_tokens` on run 1 becoming `cache_read_input_tokens` on run 2.
- [ ] Prints **token counts** for each call, read from the response's `usage` (not estimated).
- [ ] Prints an **estimated dollar cost** per call, computed from `usage` × current per-model rates (rates sourced from the pricing docs, not hardcoded guesses).
- [ ] Runs cleanly from a fresh `npm install` with only `ANTHROPIC_API_KEY` set.

## Stretch (optional, not required to pass)

- [ ] Handle multi-turn (keep a running `messages` array).
- [ ] Add a `--model` flag and show cost differences between models.
