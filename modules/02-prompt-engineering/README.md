# Module 02 — Prompt engineering for production

> How to use: the home for module 02 — everything below builds toward its milestone · owned by /tutor (+ /editor for review). Status: 🟡 in progress.

`type: technical` — structured output, XML tags, few-shot, reliability techniques. Applied to one task: **reliably extract a structured card list from messy text** (Deckmate's "catalogue my collection" feature). Status: ✅ done — passed `/editor`.

## What's here

- `tutorial.md` — the step-by-step build guide (Structured Outputs → XML delimiting → few-shot → reliability harness).
- `guide.md` — concise review sheet (written when the milestone lands).
- `exercises/card-extractor/` — the extractor you build in (fill the `TODO`s).
- `milestone/` — your deliverable + the acceptance check the /editor judges against.
- `review.md` — appears once /editor has critiqued the milestone.

## Milestone

A prompt/extractor that turns messy card text into a schema-valid `{ name, set, qty }[]` JSON list and passes a set of messy test cases. Acceptance check in [`milestone/README.md`](milestone/README.md).
