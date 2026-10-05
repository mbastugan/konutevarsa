import { copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const destDir = join(root, ".vercel/output/functions/__server.func/_libs");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");

if (!existsSync(destDir)) {
  console.log("[pglite] bundled server libs not present, skipping");
  process.exit(0);
}

for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  await copyFile(join(srcDir, name), join(destDir, name));
}
console.log("[pglite] staged wasm assets for the production server bundle");
