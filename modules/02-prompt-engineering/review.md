> How to use: the Editor's critique of your Module 02 milestone, judged against its acceptance check · owned by /editor · next: clean up the one wart, then start Module 03 with `/librarian` → `/tutor` (or fold in the polish notes first).

# Review — Module 02: Reliable card-list extractor

**Reviewing:** `exercises/card-extractor/extract.ts` + `cases.ts` (the held-out suite is part of this deliverable — reliability is the milestone).

## Verdict

✅ **Meets the milestone.** All five acceptance boxes pass, verified against a live 5/5 run of the held-out suite. Structured Outputs locks the shape, XML delimits the input, four consistent few-shot examples steer accuracy, and the suite *measures* reliability on inputs the prompt never saw. One cruft line must be cleaned before you commit, but it doesn't block the pass.

### Acceptance check — verified

- ✅ **Guaranteed shape** — `messages.parse` + `zodOutputFormat(CardList)` → typed `parsed_output.cards`, no `JSON.parse`, no repair.
- ✅ **Schema fits reality** — `set` nullable, `qty` positive int; names come back clean (no qty/set bleed).
- ✅ **Production-shaped prompt** — input XML-delimited in `<card_text>`; 4 diverse examples (≥3), now consistent with the instruction.
- ✅ **Reliability measured** — `cases.ts` holds 5 held-out cases spanning `2x`/spelled quantities, missing set → `null`, multi-card lines, and a preserved misspelling (`charzard`). All pass; exits 0.
- ✅ **Runs cleanly** — fresh `npm install`, only `ANTHROPIC_API_KEY`.

The strongest signal here is case 1: `charzard` comes back **preserved, not "corrected."** That proves the faithful-identity decision is actually holding under test — the single most important property for a trading app, where a silently "fixed" name is a mis-valued trade.

## Must-fix before you commit (quality, not an acceptance-check failure)

**1. Stray `1. ` on line 1 of `extract.ts`.** The file literally opens `1. /**` — a list-marker that got pasted into the source. It runs only because esbuild parses `1.` as a no-op numeric expression and skips it; under `tsc` or any linter it's a floating expression statement at the top of your entry file. It's the kind of thing that makes a portfolio reviewer stop reading. Delete the `1. ` so line 1 is `/**`.

## Should-improve (raises quality, not blocking)

**2. Your faithful-identity rule lives only in the examples — state it in the instruction too.** The instruction (`extract.ts:60–61`) says only *"Lower case card names, upper case set codes."* The "don't correct misspellings" behavior is inferred purely from the `peekychu → peekychu` example. That works today, but it's the *load-bearing* design decision of the whole module and it's implicit. Make it explicit and robust:
```
Extract every card from the text between the <card_text> tags.
Preserve each name exactly as written — do NOT fix spelling or expand abbreviations.
Lower-case card names; upper-case set codes. If no set is given, use null; if no quantity, use 1.
```
That also pins the two behaviors your tests rely on but never *stated*: missing-set → `null`, missing-qty → `1` (both currently emergent, not instructed).

**3. Prompt indentation leaks into the payload.** The `content` template literal is indented with the code, so every line the model sees starts with two spaces, and `${cardText}` is indented inside the tags. Harmless to Haiku here, but sloppy and occasionally matters. Left-align the template contents (or `.trim()` per line).

## Nice-to-have

- **`EX`/`ex` normalization is silent.** `"Meowth EX"` → `"meowth ex"` follows your lower-case rule, but you never decided whether the `ex`/`EX` suffix is part of the name or a grade. Fine for now — just know you made that call implicitly.
- **Stretch boxes** from the milestone (a per-run cost line reusing M01's `estimateCost`, or an adversarial injection case) are untouched — worth one when you revisit, since cost + safety are exactly the Module 08 talking points.

## Bottom line

Real production-shaped work: the shape is guaranteed, the prompt is structured and internally consistent, and — most importantly — reliability is *proven on held-out data*, not asserted. Clean the line-1 wart before committing, consider making the faithful-identity rule explicit, and this is a portfolio-worthy piece. **Module 02 passes.** On to tool use.
