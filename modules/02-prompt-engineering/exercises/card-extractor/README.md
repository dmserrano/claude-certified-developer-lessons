# Exercise 02 — card extractor

> How to use: build the module-02 extractor here by filling in the `TODO`s, working through `../../tutorial.md` with your tutor · owned by /tutor.

## Setup

```bash
cd modules/02-prompt-engineering/exercises/card-extractor
npm install
cp .env.example .env   # then paste your key into .env
```

## Run

```bash
# one input
npx tsx --env-file=.env extract.ts "2x Charizard ex (SV151), pikachu"
# the reliability suite (Step 4)
npx tsx --env-file=.env cases.ts
```

## What you're building

An `extractCards(text) -> Card[]` function that turns messy card text into a
schema-valid list, across four steps (see `../../tutorial.md`):

1. **Shape** — a Zod `Card` schema + `messages.parse` / `zodOutputFormat` so the
   output is *guaranteed* valid (`extract.ts`).
2. **Delimit** — instructions outside, messy input inside `<card_text>` tags.
3. **Examples** — 3–5 diverse `<example>` pairs covering the real messes.
4. **Prove it** — fill `cases.ts` with ≥5 messy cases and make them all pass.

Files: `extract.ts` (the extractor, has the `TODO`s) · `cases.ts` (the Step-4
suite) · `package.json` (SDK ^0.120.0 + zod).
