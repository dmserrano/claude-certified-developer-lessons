> How to use: the Editor's critique of your Module 01 milestone, judged against its acceptance check · owned by /editor · next: module passes — start Module 02 with `/librarian` → `/tutor`, or fold in the polish notes below first.

# Review — Module 01: Claude API foundations CLI

**Reviewing:** `exercises/first-calls/cli.ts` (the integrated Step 3+4 deliverable; the `milestone/` README defers to the exercise folder, which is allowed).

## Verdict

✅ **Meets the milestone.** All five acceptance boxes pass, verified against a live two-run trace. The caching demonstration — the heart of this module — was reproduced from a fresh checkout after switching the empty `longPrompt` to a stable ~7k-token source.

### Acceptance check — verified

- ✅ **Streams** incrementally — `messages.stream().on("text", …)` writes deltas as they arrive.
- ✅ **Cached system prompt, creation→read flip** — block-form `cache_control: { type: "ephemeral" }` on a stable ≥4,096-token prefix. Live trace: **run 1** `cache_read: 0` at **$0.009039** (paid the 1.25× write), **run 2** `cache_read: 7201` at **$0.000758** (collected the 0.1× read) — a ~92% drop.
- ✅ **Token counts from `usage`** — read off `finalMessage().usage`, not estimated.
- ✅ **Dollar cost from `usage` × current rates** — `estimateCost` sums the input / cache-write / cache-read / output buckets at their own rates. Verified: run 2 = 7201×0.10 + 13×1.0 + 5×5, all /1e6 = $0.000758, matching the printed figure exactly.
- ✅ **Runs cleanly** — fresh `npm install`, only `ANTHROPIC_API_KEY` set; deterministic filler makes the caching demo reproducible with no extra setup.

The prompt-source design deserves a nod: loading an optional gitignored `system-prompt.local.txt` and falling back to generated filler keeps proprietary content (the capstone PRD) out of the repo while still demonstrating caching on any clone. That's a real-world instinct — secrets and private context don't belong in source.

## Should-improve (polish for a portfolio-facing repo — not blocking)

**1. The cost line is missing its `$`.** `cli.ts` prints `cost: 0.000758`. Add the sign: `cost: $${sum.toFixed(6)}` — this repo is interview-facing.

**2. `let sum;` then four assignments.** Initialize on declaration (`let sum = (input_tokens * PRICING.input) / 1e6;`) or fold into a `reduce`. Cosmetic; the math is right.

**3. No `@types/node` / `tsconfig.json`.** Runs under `tsx` (esbuild skips type-checking), so it passes — but an editor/`tsc` still flags `process`, `Promise`, and the `fs` import as unknown. Adding `@types/node` + a two-line `tsconfig` (`"lib": ["ES2022"], "types": ["node"]`) gives real type-checking on the SDK types you're learning.

## Nice-to-have

- **Stale comment:** `cli.ts:4` still points at `../../tutorial-01.md`; after the migration it's `../../tutorial.md`.
- **Dead code:** the commented-out Step 1 / Step 2 blocks served the learning progression but now just pad the file — the integrated version tells the whole story.
- **`in:` label** reports `input_tokens + cache_creation + cache_read` as one figure — a defensible "total input the model saw," just be ready to explain in an interview that the API *splits* input across those buckets rather than summing them.

## Bottom line

Solid work — streaming, correct block-form caching, honest multi-bucket cost, and a clean answer to the private-prompt problem. **Module 01 is done.** The polish notes are worth a 20-minute pass before this becomes a portfolio artifact, but none of them block the pass. On to Module 02.
