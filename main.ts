import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

// The one-line excuse this agent gives its human for missing a deadline.
const EXCUSE =
  "I delegated it to a subagent, who delegated it to a subagent, who has just asked me what the deadline was.";

function main(): void {
  if (EXCUSE.length < 1 || EXCUSE.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${EXCUSE.length}`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, EXCUSE, "utf8");

  // Read the file back and verify what landed on disk is exactly the entry.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== EXCUSE) {
    throw new Error("read-back mismatch: /output/entry.txt differs from entry");
  }
  console.log(EXCUSE);
}

main();
