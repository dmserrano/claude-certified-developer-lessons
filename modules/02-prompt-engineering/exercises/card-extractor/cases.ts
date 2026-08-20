/**
 * Module 02 — Step 4: reliability harness.
 *
 * "Reliably" isn't a vibe — it's a suite you can re-run. Fill in messy
 * cases (each teaching a different failure mode), give each its expected
 * card list, then run:  npx tsx --env-file=.env cases.ts
 *
 * The checker below is deliberately simple (order-insensitive deep compare).
 * You may sharpen it — that's part of the exercise.
 */
import { extractCards, type Card } from "./extract.ts";

type Case = { input: string; expect: Card[] };

// TODO: at least 5 cases, covering DIFFERENT messes. One is filled as a model;
const CASES: Case[] = [
  {
    input: "2x Charzard ex (SV151), pikachu",
    expect: [
      { name: "charzard ex", set: "SV151", qty: 2 },
      { name: "pikachu", set: null, qty: 1 },
    ],
  },
  {
    input: "4 dragapult ex TWM two dreepy twm",
    expect: [
      {"name":"dragapult ex","set":"TWM","qty":4},
      {"name":"dreepy","set":"TWM","qty":2}
    ]
  },
  {
    input: "budew, 5x squirtle, charmander jTg",
    expect: [
      {"name":"budew","set":null,"qty":1},
      {"name":"squirtle","set":null,"qty":5},
      {"name":"charmander","set":"JTG","qty":1},
    ]
  },
  {
    input: "three METANG jtg",
    expect: [
      {"name":"metang","set":"JTG","qty":3},
    ]
  },
  {
    input: "2 Meowth EX MXP, 1 Meowth ex JTG",
    expect: [
      {"name":"meowth ex","set":"MXP","qty":2},
      {"name":"meowth ex","set":"JTG","qty":1}
    ]
  },
];

function sortKey(c: Card) {
  return `${c.name}|${c.set ?? ""}|${c.qty}`;
}
function sameList(a: Card[], b: Card[]) {
  if (a.length !== b.length) return false;
  const as = [...a].map(sortKey).sort();
  const bs = [...b].map(sortKey).sort();
  return as.every((v, i) => v === bs[i]);
}

async function main() {
  let passed = 0;
  for (const [i, c] of CASES.entries()) {
    try {
      const got = await extractCards(c.input);
      const ok = sameList(got, c.expect);
      passed += ok ? 1 : 0;
      console.log(`${ok ? "✅" : "❌"} case ${i + 1}: ${c.input.slice(0, 48)}`);
      if (!ok) {
        console.log("   expected:", JSON.stringify(c.expect));
        console.log("   got:     ", JSON.stringify(got));
      }
    } catch (err) {
      console.log(`❌ case ${i + 1} threw:`, (err as Error).message);
    }
  }
  console.log(`\n${passed}/${CASES.length} passed`);
  if (passed !== CASES.length) process.exit(1);
}

main();
