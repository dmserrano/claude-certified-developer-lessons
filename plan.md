> How to use: the spine of this pathway — destination, baseline, cut list, and the module sequence every other ALTER role reads · owned by /advisor · next: `/librarian` to gather sources for module 01, or `/alter` to see the map.

# Plan — Claude Certified Developer

## Destination

Be able to **lead Claude integration at my next company** — confident enough to *talk about and execute* these skills live in senior-IC interviews, backed by a **portfolio project** I can point to.

Concretely, by the end I can:
- Build production-grade apps on the Claude API and Agent SDK (tool use, MCP, agents, vision, RAG).
- Reason out loud about evals, cost, latency, and safety like someone who'd own the integration.
- Demo a real, deployed project (the **Pokémon TCG trade matcher**) and tell its story in 90 seconds.
- Read/write/discuss Claude code in **both TypeScript and Python**.

Capability first; the credential is secondary.

## Baseline

- ~10 years as a developer; **fluent full-stack JS** (React + Node.js), comfortable with APIs and async code.
- **Python**: decent, needs a refresher — targeted, not from scratch.
- **Claude/LLM API**: light exposure — a little tool use and MCP; mostly greenfield.
- **Context**: interviewing *now* through the next few months, targeting **senior IC** at both startups and enterprise. Studying part-time (a few hours/week) alongside interviews.

Implications: skip dev fundamentals and API basics; go straight to Claude-specific depth. Learn/build primarily in TypeScript (fastest to ship, strongest demos); one deliberate Python module for bilingual fluency.

## Cut list (deliberately skipped for now)

- **Model fine-tuning / training** — API mastery matters more for these roles.
- **Deep ML theory** (transformer internals, attention math) — a talking-point paragraph, not a module.
- **Building custom vector-DB / deep RAG infra** — do *practical* RAG, skip embedding-optimization rabbit holes.
- **Non-Claude providers** (OpenAI/Gemini specifics) — stay Claude-focused; keep just enough "how I'd choose a model" to handle the comparison question.

## Pacing (soft — part-time, started 2026-08-15)

- **Phase 1 · Interview core (01–06):** mid-Aug → end of Sep (~6 weeks).
- **Phase 2 · Lead depth (07–08):** early–mid Oct.
- **Python + Capstone + Interview prep (09–11):** mid-Oct → mid-Nov.
- The **capstone (10)** is assembled incrementally as modules 02/04/05/06 land, then finished in the final stretch. **Interview readiness (11)** runs as a background thread from week 1.

Total: ~3 months to a shippable portfolio + interview fluency. Dates are targets, not deadlines — adjust freely.

## Modules

Each module ends in one concrete, checkable milestone. Types: technical / conceptual. Most milestones feed a piece of the capstone.

1. **Claude API foundations** — `type: technical` — covers: Messages API, system prompts, params, streaming, token counting, model selection, prompt caching (TS SDK).
   - *Milestone:* a TS CLI that streams a response, caches a long system prompt, and prints token count + estimated cost per call.
   - *Target:* week 1 (by ~Aug 22).

2. **Prompt engineering for production** — `type: technical` — covers: structured output, XML tags, few-shot, reliability techniques.
   - *Milestone:* a prompt that reliably extracts a structured card list (name / set / qty) from messy text. *Feeds capstone.*
   - *Target:* weeks 1–2 (by ~Aug 29).

3. **Tool use / function calling** — `type: technical` — covers: tool definitions, the tool loop, parallel tools, `tool_runner`.
   - *Milestone:* a multi-tool script where Claude calls a card-lookup tool and a price tool on its own.
   - *Target:* weeks 2–3 (by ~Sep 5).

4. **Vision & multimodal** — `type: technical` — covers: image input, extracting structured data from photos.
   - *Milestone:* given a photo of a binder page, output a clean JSON card list. *The capstone "wow".*
   - *Target:* week 3 (by ~Sep 12).

5. **MCP (Model Context Protocol)** — `type: technical` — covers: using MCP servers, building your own, wiring to Claude.
   - *Milestone:* a working MCP server exposing a card-data tool, consumed by Claude.
   - *Target:* week 4 (by ~Sep 19).

6. **Agents & the Agent SDK** — `type: technical` — covers: agent loop, orchestration, subagents, agentic patterns.
   - *Milestone:* an agent that plans and executes a multi-step trade-matching task end to end.
   - *Target:* weeks 5–6 (by ~Sep 30).

7. **RAG in practice** — `type: technical` — covers: embeddings, retrieval, grounding, when *not* to use it.
   - *Milestone:* retrieval-grounded Q&A over a card/rules corpus.
   - *Target:* early Oct (by ~Oct 7).

8. **The lead layer — evals, cost, latency, safety** — `type: conceptual` — covers: eval harness design, prompt caching for cost, latency, guardrails, observability.
   - *Milestone:* an eval suite + a cost/latency writeup for the capstone (the senior-IC signal).
   - *Target:* mid Oct (by ~Oct 17).

9. **Python fluency for Claude** — `type: technical` — covers: the same patterns in the Python SDK.
   - *Milestone:* reimplement one tool-use flow in Python; write a "TS vs Python" cheat sheet.
   - *Target:* mid–late Oct (by ~Oct 24).

10. **Capstone: Pokémon TCG trade matcher** — `type: technical` — covers: brings it all together (agent + tools + vision + MCP + RAG) as a React/Node app.
    - *Milestone:* a working, deployed app + README + 90-second demo.
    - *Target:* late Oct → mid Nov (by ~Nov 14); built incrementally throughout.

11. **Interview readiness** — `type: conceptual` — covers: talk tracks, system-design-for-LLM-apps, whiteboard patterns.
    - *Milestone:* a mock system-design writeup + a rehearsed, drillable talk track.
    - *Target:* ongoing from week 1; sharpen by mid Nov.
