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

## Module 02 — Prompt engineering for production

`type: technical` · Milestone: a prompt that **reliably extracts a structured card list (name / set / qty) from messy text** — *feeds the capstone* (Deckmate's "catalogue my collection" feature). The whole shelf points at making extraction *reliable*, not just working once.

**The one thing to internalize first:** for guaranteed schema-valid JSON, the modern answer is **Structured Outputs** (constrained decoding), not prompt-craft alone. Prompt engineering (XML, examples) still does the heavy lifting for *accuracy* — did it pull the right cards? — while Structured Outputs guarantees the *shape*. Note: classic **prefill** for JSON is **not supported on Claude 4.6+**; use Structured Outputs there instead.

1. ⭐ **Structured outputs** (official docs) — [build-with-claude/structured-outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs)
   *What:* the `output_config` JSON-schema feature — grammar-constrained sampling that *guarantees* valid, schema-conforming JSON (no `JSON.parse()` errors, no retries). *Why start here:* it's the milestone's backbone. The **TS SDK** gives you `zodOutputFormat()` + `client.messages.parse()` → define your card schema as a Zod object, get back a typed, pre-validated `parsed_output`. Supports `claude-haiku-4-5`. Build your extractor around this, then use prompting to sharpen accuracy.

2. **Increase output consistency** (official docs) — [strengthen-guardrails/increase-consistency](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency)
   *What:* the reliability playbook — specify exact output format, constrain with examples, ground with retrieval, chain prompts, keep-in-character. *Why:* this is "prompt engineering for production" in one page. It opens by telling you *when* to reach for Structured Outputs vs. prompt techniques — exactly the judgment call this module is about. Read it right after #1.

3. **Extracting structured JSON using Claude and tool use** (official cookbook) — [cookbook/tool-use-extracting-structured-json](https://platform.claude.com/cookbook/tool-use-extracting-structured-json) · [notebook on GitHub](https://github.com/anthropics/anthropic-cookbook/blob/main/tool_use/extracting_structured_json.ipynb)
   *What:* a worked recipe that extracts structured JSON (entity extraction, summarization) by defining a tool schema Claude fills in. *Why:* the closest analog to your card-list task, and it previews the tool-use pattern you'll formalize in Module 03. *Heads-up:* notebook is **Python** — the schema-design thinking transfers 1:1; you'll implement in TS with Zod (#1).

4. **Multishot (few-shot) prompting** (official docs) — [prompt-engineering/multishot-prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/multishot-prompting)
   *What:* how to steer output with **3–5 diverse examples** wrapped in `<example>`/`<examples>` tags. *Why:* messy card text (abbreviations, misspellings, "x2", set codes) is exactly where a few well-chosen examples covering the edge cases beat any abstract instruction. This is your main lever for *accuracy* once the shape is locked by #1.

5. **Use XML tags to structure your prompts** (official docs) — [prompt-engineering/use-xml-tags](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags)
   *What:* wrapping instructions / examples / the input blob in distinct tags so Claude never confuses them. *Why:* separating `<instructions>` from the `<card_text>` you're parsing is the single cheapest reliability win, and it composes with #4 (`<examples>`) and CoT (`<thinking>`).

6. **Prompt engineering overview + Prompting best practices** (official docs) — [overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) · [best-practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
   *What:* the index of every technique (be clear & direct, give a role, chain-of-thought, prefill…) ranked roughly by impact. *Why:* the map — skim once to know what exists, then dip back when #1–#5 aren't enough. Keep open as reference, don't read cover-to-cover.

**Deliberately left off this shelf (for now):**
- **Model-specific prompting pages** (Prompting Opus 5, etc.) — you're building on Haiku 4.5; the general guidance above applies. Revisit if you switch models.
- **Console "Prompt Improver" / prompt-generator tool** — genuinely useful, but a UI convenience, not a concept to learn; try it *after* you can hand-write a reliable prompt.
- **Deep tool-use mechanics** (the tool loop, parallel tools) — that's Module 03. Here, tool use appears only as an *extraction* trick (#3); don't rabbit-hole on the loop yet.
