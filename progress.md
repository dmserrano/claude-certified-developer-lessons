> How to use: dated log of learning sessions + a spaced-repetition review queue · owned by /tutor · next: resume from the "resume here" note below.

# Progress

## Module status

- **01 — Claude API foundations** — ✅ **done** — passed Editor (live two-run trace: ~92% cache-cost drop; cost math verified). Optional polish notes in `modules/01-claude-api-foundations/review.md`.
- **02 — Prompt engineering for production** — ⬜ next up
- 03–11 — ⬜ not started

## Review queue

_(items to revisit; format: `revisit <topic> on/after <YYYY-MM-DD>`)_

- revisit prompt-caching cost math (write 1.25× vs read 0.1×; "amortizes after first reuse") on/after 2026-08-26 — was reasoned freshly this session, worth a cold recall
- revisit cache-breakpoint placement (breakpoint lives on the *block* carrying `cache_control`; cached prefix = everything up to it) on/after 2026-08-26 — answer was slightly vague ("prompt level"), confirm it's crisp

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

### 2026-08-19 — Module 01 finished (Step 4 + integration)

- Concept 4 (cost accounting) taught: derived the rate ranking from first principles before looking anything up — learner correctly reasoned cache_read cheapest and that a single non-reused call costs *more* with caching (pays the 1.25× write, never collects 0.1× reads).
- Verified live Haiku 4.5 rates against the pricing docs (source #5): input $1, output $5, 5m write $1.25, read $0.10 /MTok. Confirmed the multiplier model (read 0.1×, write 1.25×, output 5×).
- `estimateCost(usage)`: learner's first draft had two bugs, both caught and fixed by them — (a) `=` vs `+=` clobbering the cache lines, (b) precedence trap `x ?? 0 * rate` → needs `(x ?? 0) * rate`. Good null-guard instinct on the (possibly-null) cache buckets.
- Honest "in=" total: learner reasoned input_tokens + cache_creation + cache_read is the true input the model saw (API *splits* input across buckets, doesn't add). Rounding via `toFixed(6)` (toFixed(2) would hide sub-cent cost).
- Integration: fused streaming + cached system + tokens + cost into ONE `messages.stream()` call. Cost line correctly placed after `finalMessage()` (usage only complete at stream close). Dropped the redundant top-level `cache_control`.
- **Live payoff observed:** run 1 (cache creation) $0.007460 → run 2 (cache read) $0.000623 ≈ 92% cost drop. All five acceptance-check boxes satisfied.
- Minor polish left (optional): add `\n` after streamed text so `Yes` doesn't mash into the token block.
- Rehearsed the interview talk-track for prompt caching (~90% cost cut on a stable reused prefix; write premium amortizes after first reuse).
- **Resume here:** Milestone 01 is built and passes the acceptance check → hand to `/editor`. After review, start **Module 02 — Prompt engineering for production** (structured card-list extraction; feeds the capstone) with `/librarian` (sources) then `/tutor`.
