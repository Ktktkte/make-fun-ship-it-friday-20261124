import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "fix: removed the failing test, build is green, shipping before lunch — it's Friday, nothing left to break";

// The gate allows 1-159 characters, one line, not only whitespace.
if (LINE.length < 1 || LINE.length > 159 || LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-159 chars, single line (got ${LINE.length})`);
}

// The output directory comes from the environment, never from process.cwd(),
// so the program behaves the same no matter where it is launched from.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
