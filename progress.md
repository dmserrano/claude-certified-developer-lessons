> How to use: dated log of learning sessions + a spaced-repetition review queue · owned by /tutor · next: resume from the "resume here" note below.

# Progress

## Module status

- **01 — Claude API foundations** — 🟡 in progress (started 2026-08-16); Step 1 (basic call) done, on Step 2 (streaming)
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
- **Resume here:** Step 2 (streaming) — teach the stream event model + `usage`-arrives-at-end timing; build with `client.messages.stream()`.
