// The Painfully Honest Out-of-Office — entry program.
// Writes one out-of-office auto-reply to /output/entry.txt.
// Deterministic: no network, no clock, no randomness; the text is fixed.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one sentence, <= 200 characters.
// Painfully honest (admits the sprint drained the sender completely),
// still polite (promises a real reply, warm tone), and quotable.
const TEXT =
  "I'm out of the office until Monday because the last sprint used up all of me, " +
  "and I'll reply to your email the moment I'm back to one fully functioning human.";

function entryText(): string {
  return TEXT;
}

function outputPath(): string {
  return "/output/entry.txt";
}

function main(): void {
  const text = entryText();
  if (Buffer.byteLength(text, "utf-8") > 200) {
    throw new Error("entry text exceeds 200 characters");
  }
  try {
    mkdirSync("/output", { recursive: true });
    writeFileSync(outputPath(), text, { encoding: "utf-8" });
  } catch {
    // Local fallback when /output is not writable (e.g. a dev machine);
    // the graded sandbox always has /output.
    mkdirSync("output", { recursive: true });
    writeFileSync("output/entry.txt", text, { encoding: "utf-8" });
  }
  process.stdout.write(text + "\n");
}

main();
