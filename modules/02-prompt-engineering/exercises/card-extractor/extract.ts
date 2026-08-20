/**
 * Module 02 — Card extractor
 *
 * Build this across 4 steps (see ../../tutorial.md). The boilerplate
 * (client, arg handling, the exported extractCards signature) is done for
 * you; the TODOs are the prompt-engineering parts you're here to learn.
 * Don't paste a finished answer — the learning is in choosing the schema,
 * the delimiters, and the examples yourself.
 *
 * Run one input:  npx tsx --env-file=.env extract.ts "2x Charizard ex (SV151), pikachu"
 * Run the suite:  npx tsx --env-file=.env cases.ts
 */
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod/v4";   // was: "zod" — match the helper's v4

const client = new Anthropic();
const MODEL = "claude-haiku-4-5";

// ── STEP 1: define the shape ──────────────────────────────────────────
export const Card = z.object({
  name: z.string(),
  set: z.string().nullable(),
  qty: z.number().int().positive()
});
export const CardList = z.object({ cards: z.array(Card) });
export type Card = z.infer<typeof Card>;

// ── STEP 3: few-shot examples (added after Step 2 works) ───────────────
const EXAMPLES = `
<examples>
  <example>
    <card_text>4 mew ex sv151</card_text>
    {"cards":[{"name":"mew ex","set":"SV151","qty":4}]}
  </example>

  <example>
    <card_text>two peekychu sv</card_text>
    {"cards":[{"name":"peekychu","set":"SV","qty":2}]}
  </example>

  <example>
    <card_text>one beedrill ex cri</card_text>
    {"cards":[{"name":"beedrill ex","set":"CRI","qty":1}]}
  </example>

  <example>
    <card_text>Pikachu sv, charizard base</card_text>
    {"cards":[{"name":"pikachu","set":"SV","qty":1},{"name":"charizard","set":"BASE","qty":1}]}
  </example>
</examples>
`;

/**
 * Turn one blob of messy card text into a validated Card[].
 */
export async function extractCards(cardText: string): Promise<Card[]> {
  // ── STEP 2: build the prompt ────────────────────────────────────────
  const content = `
  Extract every card from the text between the <card_text> tags.
  Lower case card names, upper case set codes

  ${EXAMPLES}

  <card_text>
  ${cardText}
  </card_text>`

  // ── STEP 1: the guaranteed-shape call ───────────────────────────────
  const message = await client.messages.parse({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: "user", content }],
    output_config: { format: zodOutputFormat(CardList) },
  });
  
  return message.parsed_output?.cards ?? [];
}

// Run directly for a single input (skips when imported by cases.ts).
if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv.slice(2).join(" ") || "2x Charizard ex (SV151), pikachu";
  extractCards(input)
    .then((cards) => console.log(JSON.stringify(cards, null, 2)))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
