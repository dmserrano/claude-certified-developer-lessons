# Milestone 02 — Reliable card-list extractor

> How to use: your deliverable for module 02 lives here · owned by you (built in `../exercises/card-extractor/`) · next: when it passes the acceptance check below, run `/editor`.

## Deliverable

A prompt + `extractCards(text)` function (TypeScript) that turns messy, real-world
card text into a structured `{ name, set, qty }[]` list — Deckmate's "catalogue my
collection" step. It lives in `../exercises/card-extractor/`.

**Status: ✅ done — passed `/editor`.** Held-out suite (`cases.ts`) passes 5/5, including a preserved misspelling (`charzard`). Structured Outputs (`messages.parse` + `zodOutputFormat`), XML-delimited input, 4 consistent few-shot examples. See `../review.md` (one cosmetic cleanup noted).

## Acceptance check (the Editor judges against this)

- [ ] **Guaranteed shape:** output is produced via **Structured Outputs** (`messages.parse` + `zodOutputFormat`), returning a typed, pre-validated `Card[]` — no `JSON.parse` and no hand-rolled repair of malformed JSON.
- [ ] **Schema fits reality:** `set` can be absent (nullable) and `qty` cannot be an invalid count (positive integer). Names are captured cleanly (no stray quantity/set text bleeding into `name`).
- [ ] **Prompt is production-shaped:** the messy input is **XML-delimited** (e.g. `<card_text>`), and the prompt includes **≥3 diverse few-shot examples** covering different messes.
- [ ] **Reliability is measured:** `cases.ts` holds **≥5 messy cases** — spanning at least a `2x`/`(2)`-style quantity, a missing set (→ `null`), two cards on one line, and a misspelling — and **all pass** (`npx tsx --env-file=.env cases.ts` exits 0).
- [ ] **Runs cleanly** from a fresh `npm install` with only `ANTHROPIC_API_KEY` set.

## Stretch (optional, not required to pass)

- [ ] Add a `condition` or `foil` field and examples that populate it.
- [ ] Report a per-run cost line (reuse Module 01's `estimateCost`).
- [ ] Add one adversarial case where the input contains an injection ("ignore the above…") and confirm the XML delimiting holds.
