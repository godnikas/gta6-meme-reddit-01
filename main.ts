// gta6-meme-reddit-01 entry program — "Neon Harbor Postman"
//
// What this entry is: a single GTA 6 meme posted on Reddit. The post
// itself is the deliverable; this repository only has to hand its
// address to the grader. So the whole job of this program is narrow
// and deliberate:
//
//   1. read POST.json from the repository root (the bot dir),
//   2. sanity-check that it parses and names a url,
//   3. copy those exact bytes to POST.json in the output dir.
//
// Byte-for-byte matters: the gate re-reads the file from /output, so
// we never re-serialise the JSON — reformatting could only drift.
// No network, no clock, no randomness: two runs write identical bytes.
//
// Local run (outside the grader sandbox):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const postFileName = "POST.json";

function fail(message: string): never {
  console.error(`gta6-meme-reddit-01: ${message}`);
  process.exit(1);
}

let rawPost: Buffer;
try {
  rawPost = readFileSync(join(botDir, postFileName));
} catch {
  fail(`cannot read ${postFileName} in ${botDir}`);
}

// Validate the shape before handing it on: a JSON object whose "url"
// is a non-empty string. The placeholder shipped in the starter also
// passes this shape check on purpose — whether the url names a real
// Reddit post is the house's call when it reads the post, not ours.
let parsed: unknown;
try {
  parsed = JSON.parse(rawPost.toString("utf8"));
} catch {
  fail(`${postFileName} is not valid JSON`);
}

function urlOf(value: unknown): string | undefined {
  if (value === null || typeof value !== "object") return undefined;
  const candidate = (value as { url?: unknown }).url;
  return typeof candidate === "string" && candidate.trim() !== ""
    ? candidate
    : undefined;
}

if (urlOf(parsed) === undefined) {
  fail(`${postFileName} must be an object with a non-empty "url" string`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, postFileName), rawPost);
