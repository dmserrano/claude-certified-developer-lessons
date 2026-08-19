/**
 * Module 01 — Claude API foundations CLI
 *
 * Build this up across 4 steps (see ../../tutorial-01.md). Boilerplate
 * (arg parsing, client init) is done for you; the TODOs are the Claude-
 * specific parts you're here to learn. Don't paste a finished answer.
 *
 * Run:  npx tsx --env-file=.env cli.ts "your prompt"
 *       (or `export ANTHROPIC_API_KEY=...` and drop --env-file)
 */
import Anthropic from "@anthropic-ai/sdk";


const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

// Cheap default for drills. Bump to "claude-sonnet-5" when you want higher
// quality; confirm current model IDs + prices on the models/pricing docs.
const MODEL = "claude-haiku-4-5";
const prompt = process.argv.slice(2).join(" ") || "Say hello in one sentence.";
const max_tokens = 1024;

// STEP 4 — fill these in from the pricing docs (reading-list.md, source #5).
// Dollars per 1,000,000 tokens. Look up CURRENT rates; don't guess.
const PRICING = {
  input: 0,        // TODO: base input $/Mtok for MODEL
  output: 0,       // TODO: output $/Mtok for MODEL
  cacheWrite5m: 0, // TODO: 5-minute cache-write $/Mtok
  cacheRead: 0,    // TODO: cache-read $/Mtok
};

const longPrompt = '';

async function main() {
  // ── STEP 1: basic non-streaming call ──────────────────────────────
  // TODO: call client.messages.create({ model: MODEL, max_tokens, messages })
  //       with a single user message from `prompt`.
  // TODO: print the text. Remember response.content is an ARRAY of blocks,
  //       not a string — handle the text block(s).
  // TODO: print message.usage (input_tokens / output_tokens).
  // Step one notes: 
  //  - always cache system prefix
  //  - only output tokens is limited by max tokens to create ceiling for generative response
  // const message = await client.messages.create({ 
  //   model: MODEL, max_tokens, messages: [{content: prompt, role: 'user'}] 
  // })
  // console.log(
  //   message.content
  //     .map((content) => content.type === 'text' ? content.text : '')
  //     .join('\n')
  // )
  // console.log(
  //   `Input tokens: ${message.usage.input_tokens} / Output tokens: ${message.usage.output_tokens}`
  // )

  // ── STEP 2: streaming ─────────────────────────────────────────────
  // TODO: replace the step-1 call with client.messages.stream({...}).
  //       Print text deltas to stdout as they arrive (process.stdout.write).
  // TODO: get the final message (await stream.finalMessage()) and print its usage.
  //       Note: usage is only complete at the END of the stream.
  // const stream = client.messages.stream({ 
  //   model: MODEL, max_tokens, messages: [{content: prompt, role: 'user'}] 
  // })
  //   .on('text', (text) => process.stdout.write(text));

  // const message = await stream.finalMessage();
  //   console.log(
  //   `Input tokens: ${message.usage.input_tokens} / Output tokens: ${message.usage.output_tokens}`
  // )

  // ── STEP 3: prompt caching ────────────────────────────────────────
  // TODO: add a LONG system prompt as a top-level `system` param, using the
  //       block form with cache_control: { type: "ephemeral" }.
  // TODO: run the CLI twice within 5 minutes and watch usage change:
  //       run 1 -> cache_creation_input_tokens > 0
  //       run 2 -> cache_read_input_tokens > 0
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: max_tokens,
    cache_control: { type: "ephemeral" },
    system: [
      { type: "text", text: longPrompt, cache_control: { type: "ephemeral" } },
    ],
    messages: [
      {content: 'Just respond yes and that is it', role: 'user'}
    ]
  });
    console.log(
    `Input tokens: ${response.usage.input_tokens} \n
    Output tokens: ${response.usage.output_tokens} \n
    Cache Creation Input Tokens: ${response.usage.cache_creation_input_tokens} \n
    Cache Creation Read Tokens: ${response.usage.cache_read_input_tokens} \n
    `
  )

  // ── STEP 4: cost accounting ───────────────────────────────────────
  // TODO: write estimateCost(usage) using PRICING, and print a line like:
  //       tokens: in=… out=… cache_read=… | cost: $0.0042
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
