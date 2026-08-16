> How to use: ranked, vetted sources per module — start with the ⭐ primary, ignore the noise beyond this shelf · owned by /librarian · next: `/tutor` to start learning.

_Note on links: Anthropic's docs are mid-migration to **platform.claude.com/docs/**. Old `docs.anthropic.com` URLs 301-redirect there, so both work. Examples now use `claude-opus-5` / `claude-sonnet-5`._

## Module 01 — Claude API foundations

`type: technical` · Milestone: a **TS CLI** that streams a response, caches a long system prompt, and prints token count + estimated cost per call. Everything below points at that build.

1. ⭐ **Get started + Working with the Messages API** (official docs) — [get-started](https://platform.claude.com/docs/en/get-started) · [working-with-messages](https://platform.claude.com/docs/en/build-with-claude/working-with-messages)
   *What:* the canonical quickstart + core-patterns guide. *Why start here:* the Get Started page has a **TypeScript tab** with the exact `@anthropic-ai/sdk` install + first `messages.create` call; Working with Messages covers system prompts, multi-turn, stop reasons — the spine of the CLI. Skim in 30 min, then keep open as you build.

2. **Anthropic API Fundamentals course** (first-party) — [github.com/anthropics/courses](https://github.com/anthropics/courses)
   *What:* Anthropic's official interactive course (start with the *Anthropic API fundamentals* track): API keys, model parameters, multimodal prompts, streaming. *Why:* the "understand it properly, not just copy-paste" source. *Heads-up:* notebooks are **Python** — concepts transfer 1:1 to the TS SDK; treat it as the mental model, build in TS.

3. **Streaming messages** (official docs) — [build-with-claude/streaming](https://platform.claude.com/docs/en/build-with-claude/streaming)
   *What:* server-sent-events streaming, event/delta types, and the SDK's `.stream()` helper. *Why:* directly required by the milestone. Pair with the SDK's real example (source #6).

4. **Prompt caching** (official docs) — [build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
   *What:* `cache_control` breakpoints, 5-min vs 1-hr TTL, and how caching splits usage into `cache_creation` / `cache_read` tokens. *Why:* the milestone's "cache a long system prompt" — and the single biggest cost/latency lever you'll talk about in interviews (up to ~90% cost / ~80% latency reduction).

5. **Token counting + Models & pricing** (official docs) — [token-counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) · [models/overview](https://platform.claude.com/docs/en/about-claude/models/overview) · [choosing-a-model](https://platform.claude.com/docs/en/about-claude/models/choosing-a-model) · [pricing](https://platform.claude.com/docs/en/about-claude/pricing)
   *What:* the count-tokens endpoint, the `usage` object on every response, the current model lineup, and per-model $/Mtoken rates. *Why:* the milestone's "print token count + estimated cost per call" — read `usage` off the response and multiply by the pricing table. Also grounds the "how do you pick a model" interview answer.

6. **Anthropic TypeScript SDK — repo + examples** (canonical reference) — [anthropics/anthropic-sdk-typescript](https://github.com/anthropics/anthropic-sdk-typescript) · [examples/streaming.ts](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/examples/streaming.ts)
   *What:* the SDK you're building on — README, `api.md`, and runnable examples. *Why:* real, tested TS code (esp. streaming) beats any blog snippet; check the [CHANGELOG](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/CHANGELOG.md) so you're on current method signatures.

**Deliberately left off this shelf (for now):**
- **[Claude Cookbooks](https://github.com/anthropics/claude-cookbooks)** — excellent and official, but its recipes (tool use, agents, RAG, evals) map to modules 03–08. Bookmark it; don't open it yet for foundations.
- **Third-party "pass the certification" blog roundups** — skipped on purpose; you want capability, and first-party sources are more current and trustworthy than aggregators.
- **Deep transformer/LLM-internals explainers** — on your cut list; not needed to hit this milestone.
