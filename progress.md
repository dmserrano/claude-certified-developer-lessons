> How to use: dated log of learning sessions + a spaced-repetition review queue · owned by /tutor · next: resume from the "resume here" note below.

# Progress

## Module status

- **01 — Claude API foundations** — 🟡 in progress (started 2026-08-16); Steps 1–3 done (basic call, streaming, prompt caching), on Step 4 (cost accounting)
- 02–11 — ⬜ not started

## Review queue

_(items to revisit; format: `revisit <topic> on/after <YYYY-MM-DD>`)_

- _(none yet)_

## Session log

### 2026-08-16 — Module 01 kickoff

- Framed the module: 4 concepts (Messages API → streaming → prompt caching → cost accounting), each a layer on one growing CLI toward the milestone.
- Scaffolded `exercises/01-first-calls/` (package.json on SDK ^0.117.1, `.env.example`, TODO-driven `cli.ts`), wrote `tutorial-01.md`, and defined the milestone acceptance check in `milestones/01-claude-cli/`.
- Verified current SDK version (v0.117.1) rather than shipping a stale pin.
- Concept 1 (Messages API) solid: system-as-separate-param, content-as-block-array, usage as cost ground-truth. Corrected two mental-model gaps — prompt caching targets the big *stable prefix* (system prompt is the prime target; exact-prefix match, any change = full miss), and `max_tokens` caps *output* only (input is supplied/fixed; cap bounds cost+latency+truncation).
- Step 1 code review: caught `'/n'`→`'\n'` typo and missing content-block type-narrowing; learner fixed both. Now narrows on `block.type === 'text'`.
- Env: Node v22.23.2, API key added, spend limit/alerts advised, default model set to `claude-haiku-4-5` for cost.
- Step 2 (streaming) done: `client.messages.stream().on("text")` + `finalMessage()`; understood event model + usage-at-end timing.
- Step 3 (prompt caching) done: learner verified via docs that both top-level (`cache_control` + string `system`) and block-form (`system` array with per-block `cache_control`) are valid — corrected my earlier claim that only the block form works. Used a 5,950-token system prompt; observed the creation→read flip across two runs. Internalized the 4,096-token Haiku 4.5 minimum and that cached tokens move out of `input_tokens` into the cache buckets.
- **Resume here:** Step 4 (cost accounting) — fill `PRICING` with current Haiku 4.5 rates from pricing docs, write `estimateCost(usage)` summing the 3 input buckets + output at their different rates, print per-call cost. Then milestone acceptance check → `/editor`.
