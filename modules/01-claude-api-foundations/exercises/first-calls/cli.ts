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
import { existsSync, readFileSync } from "node:fs";


const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment

// Cheap default for drills. Bump to "claude-sonnet-5" when you want higher
// quality; confirm current model IDs + prices on the models/pricing docs.
const MODEL = "claude-haiku-4-5";
const prompt = process.argv.slice(2).join(" ") || "Say hello in one sentence.";
const max_tokens = 1024;

// STEP 4 — fill these in from the pricing docs (reading-list.md, source #5).
// Dollars per 1,000,000 tokens. Look up CURRENT rates; don't guess.
const PRICING = {
  input: 1.0,
  output: 5.0,
  cacheWrite5m: 1.25,
  cacheRead: 0.10,
};

// The cached system prompt must be a LONG, STABLE prefix: >= 4,096 tokens
// (Haiku 4.5's cache minimum) AND byte-identical across runs, so run 2's
// cache_read hits the prefix run 1 wrote. A per-run random string would NOT
// work — it changes the prefix, so every run is a fresh cache miss.
//
// Supply it one of two ways:
//   1. Drop your own text in system-prompt.local.txt (gitignored) — e.g. the
//      capstone PRD you don't want committed. Used automatically if present.
//   2. Otherwise fall back to deterministic filler that's guaranteed long
//      enough, so the CLI demonstrates caching on a fresh clone with no setup.
const LOCAL_PROMPT_FILE = "system-prompt.local.txt";
const longPrompt = existsSync(LOCAL_PROMPT_FILE)
  ? readFileSync(LOCAL_PROMPT_FILE, "utf8")
  : // ~5k tokens: same bytes every run, so it's cacheable and reproducible.
    "You are a meticulous, concise assistant. Follow the user's instructions exactly and never invent facts.\n".repeat(
      300,
    );

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
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: max_tokens,
    system: [
      { type: "text", text: longPrompt, cache_control: { type: "ephemeral" } },
    ],
    messages: [
      {content: prompt, role: 'user'}
    ]
  })
  .on('text', (text) => process.stdout.write(text));

  const message = await stream.finalMessage();

  // ── STEP 4: cost accounting ───────────────────────────────────────
  // TODO: write estimateCost(usage) using PRICING, and print a line like:
  //       tokens: in=… out=… cache_read=… | cost: $0.0042
  const estimateCost = ({
    input_tokens,
    output_tokens,
    cache_creation_input_tokens,
    cache_read_input_tokens
  }: Anthropic.Messages.Usage) => {
    let sum;
    const cacheCreation = cache_creation_input_tokens ?? 0;
    const cacheRead = cache_read_input_tokens ?? 0;

    sum = (input_tokens * PRICING.input) / 1000000;
    sum += (output_tokens * PRICING.output) / 1000000;
    sum += (cacheCreation * PRICING.cacheWrite5m) / 1000000;
    sum += (cacheRead * PRICING.cacheRead) / 1000000;

    return `\nTokens 
      in: ${input_tokens + cacheCreation + cacheRead}
      out: ${output_tokens}
      cache_read: ${cacheRead}
      cost: ${sum.toFixed(6)}
    `;
  };

  process.stdout.write(estimateCost(message.usage));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
