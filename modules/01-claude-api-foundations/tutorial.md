# Tutorial 01 — Claude API foundations (TypeScript)

> How to use: the step-by-step build guide for module 01, worked in the chat with your tutor · owned by /tutor · next: build in `exercises/first-calls/`, then finish the deliverable in `milestone/` and run `/editor`.

You're building one CLI that grows across four steps. Each step adds a Claude-specific capability and a concept you'll be asked about in interviews. Sources referenced by number are in [`reading-list.md`](../../reading-list.md).

Default model for this exercise: **`claude-haiku-4-5`** (cheapest, fast, plenty for foundations — bump to `claude-sonnet-5` when quality matters). Confirm current model IDs + pricing from source #5.

---

## Concept 1 — The Messages API

The whole API is one core call: `client.messages.create({ model, max_tokens, messages })`. Two things that trip up people coming from other LLM APIs:

- **`messages` is an alternating array** of `{ role: "user" | "assistant", content }`. The **system prompt is NOT a message** — it's a separate top-level `system` parameter. (This matters for caching later.)
- **`content` is a list of blocks**, not just a string. A response's `content` is an array of blocks (`{ type: "text", text }`, `{ type: "tool_use", ... }`, …) — which is why the quickstart loops over `message.content` instead of printing it directly.
- Every response carries a **`usage`** object: `{ input_tokens, output_tokens, ... }`. This is the ground truth you'll use for cost. (Source #1, #5)

**Build step 1:** make a single non-streaming call, print the text, and print `usage`. See the `TODO`s in `cli.ts`.

## Concept 2 — Streaming

For anything interactive, you stream. Two ways:

- Raw: `stream: true` on `create()` gives you an async iterator of server-sent events (deltas). (Source #3)
- Ergonomic: the SDK's **`client.messages.stream({...})`** helper — iterate `for await (const event of stream)`, or use `.on("text", …)`, and `await stream.finalMessage()` to get the assembled message *with its `usage`*. (Source #3, #6 — see `examples/streaming.ts`)

The key insight: **`usage` arrives at the end of the stream**, in the final message / `message_delta` event — not up front. Your cost accounting has to wait for the stream to finish.

**Build step 2:** switch the call to stream text to stdout as it arrives, then still print `usage` at the end.

## Concept 3 — Prompt caching

Caching lets Claude reuse a previously-processed prefix of your prompt instead of re-reading it every call — up to ~90% cheaper and ~80% lower latency on the cached portion. (Source #4)

- You mark a cache breakpoint with **`cache_control: { type: "ephemeral" }`** on a content block (commonly a large `system` block or a big document). Everything *before* the breakpoint is cached.
- Caching changes what `usage` reports: input tokens split into **`cache_creation_input_tokens`** (written to cache — costs a bit more, once) and **`cache_read_input_tokens`** (served from cache — much cheaper). On the first call you'll see creation; on the next identical-prefix call you'll see reads.
- Default TTL is 5 minutes (refreshed on use); a 1-hour option exists at higher write cost.

**Build step 3:** give the CLI a long system prompt (paste something substantial), add `cache_control` to it, and run the CLI **twice** — watch `cache_creation_input_tokens` on run 1 become `cache_read_input_tokens` on run 2.

## Concept 4 — Token & cost accounting

Now turn `usage` into money. (Source #5)

- Per-model prices are `$X / million input tokens` and `$Y / million output tokens`. Cached reads and cache writes are priced differently again (reads cheap, 5-min writes ~1.25× base input, per source #4/#5).
- Cost of a call ≈ `(input_tokens * inRate + output_tokens * outRate + cache_creation * writeRate + cache_read * readRate) / 1_000_000`.
- **You look up the current rates** from source #5 and put them in a `PRICING` constant — don't trust hardcoded numbers in a tutorial (including this one); rates change.

**Build step 4:** print a per-call cost line, e.g. `tokens: in=1203 out=88 cache_read=1180 | cost: $0.0042`.

---

## Done when

Your CLI hits every box on the milestone acceptance check in [`milestone/README.md`](milestone/README.md). Then run `/editor`.
