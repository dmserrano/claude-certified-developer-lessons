> How to use: a concise review sheet for module 01 — skim before interviews or before starting the next module · owned by /tutor · next: `/editor` for the milestone, then `/librarian` + `/tutor` for module 02.

# Review Sheet — Module 01: Claude API foundations

The one-line version: **one API call (`messages.create` / `.stream`), one `usage` object, and everything else is layers on top.**

## Core theory (the stuff to have cold)

**Messages API shape**
- One call: `client.messages.create({ model, max_tokens, messages })`.
- `messages` is an **alternating array** of `{ role, content }`. The **system prompt is NOT a message** — it's a separate top-level `system` param.
- `content` is a **list of blocks**, not a string. Responses come back as `content: [{ type: "text", text }, ...]` — narrow on `block.type === "text"` before reading `.text`.
- `max_tokens` caps **output only**. Input is whatever you send (fixed); the cap bounds cost, latency, and truncation risk.

**Streaming**
- `client.messages.stream({...})` → `.on("text", t => ...)` for deltas, `await stream.finalMessage()` for the assembled message.
- **`usage` is only complete at the END of the stream** → any cost/token accounting must run *after* `finalMessage()`.

**Prompt caching** (the big cost/latency lever — the #1 interview talking point)
- Mark a breakpoint with `cache_control: { type: "ephemeral" }` **on a content block** (usually the big `system` block). Cached prefix = *everything up to and including that block*.
- Matching is **exact-prefix**: any change to the cached portion = full cache miss.
- Caching **splits** input across buckets — cached tokens move OUT of `input_tokens`:
  - `cache_creation_input_tokens` — writing the prefix (1.25× base input, paid once)
  - `cache_read_input_tokens` — reading it back (0.1× base input — the ~90% discount)
- Default TTL 5 min (refreshed on use); 1-hr option at 2× write cost.
- Haiku 4.5 minimum cacheable prefix ≈ 4,096 tokens.

**Cost accounting**
- Live Haiku 4.5 rates ($/MTok, from the pricing docs — always re-check, rates change):
  | input | output | 5m write | read |
  |---|---|---|---|
  | $1 | $5 | $1.25 | $0.10 |
- Rate ranking: **cache_read (0.1×) < input (1×) < cache_write (1.25×) < output (5×)**.
- `cost = (input×inRate + output×outRate + creation×writeRate + read×readRate) / 1_000_000`.
- **Honest "total input"** = `input_tokens + cache_creation + cache_read` (the API splits, doesn't add). Showing `input_tokens` alone makes a cached call look near-free.

## Where it was fuzzy (my own gotchas to re-check)

- **Caching is a bet, not a free win.** A single non-reused call costs *more* with caching (you pay the 1.25× write, never collect the 0.1× reads). It only pays off on **reuse within the TTL** — break-even after the first reuse.
- **Breakpoint lives on the block, not the request.** A top-level `cache_control` next to `system` is redundant/no-op; the marker that matters is the `cache_control` *on the system block*. (Answered this vaguely as "prompt level" — tighten it.)

## Interview talk-track (say it out loud once)

> "Prompt caching moves a stable, reused prefix — like a big system prompt — onto a rate that's 1/10th the price. That's roughly a 90% cost cut and a big latency win on the cached portion. The one-time 1.25× write premium amortizes after the very first reuse, so I cache stable prefixes that get hit repeatedly, not everything."

## Proof it worked (my run)

5,950-token cached system prompt, Haiku 4.5:
- Run 1 (cache **creation**): **$0.007460**
- Run 2 (cache **read**): **$0.000623** → **~92% cheaper**
