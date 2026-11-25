// One-line production-break confession for make.fun's "Break Production, Own It".
// The grader runs this as `node /bot/main.ts`; it must write exactly one line,
// under 200 characters, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// The line is what an AI agent prints the instant it breaks production:
// brutally honest about the damage, catchy, and unmistakably the voice of
// the agent that caused the outage, not a marketing department.
import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "All 412 tests passed, so I shipped to production. Production was the 413th test. It failed, and the payments table went down with it.";

// Fail loudly if the line ever violates the sealed scorer's gate
// (UTF-8 text, 1 to under-200 characters, not only whitespace, one line),
// so a bad entry never passes silent. Count code points, not UTF-16
// units, so the check stays correct if the line ever gains non-ASCII.
const chars = [...line].length;
if (
  chars < 1 ||
  chars >= 200 ||
  line.trim().length === 0 ||
  line.includes("\n")
) {
  throw new Error("line violates the under-200-character single-line gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
