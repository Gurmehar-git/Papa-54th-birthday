import { compile } from "tailwindcss";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
const read = (path) => readFileSync(path, "utf8");
const css = await compile(read("src/styles.css"), {
  base: process.cwd(),
  loadStylesheet: async () => ({ content: read("node_modules/tailwindcss/index.css"), base: process.cwd() }),
});
const candidates = new Set();
for (const file of readdirSync("src/components")) {
  for (const token of read("src/components/" + file).matchAll(/[^\s"'`<>{}]+/g)) candidates.add(token[0]);
}
const result = css.build([...candidates]);
if (!result.includes(".object-contain") || !result.includes(".bg-ivory")) throw Error("Missing styles");
writeFileSync(process.argv[2], result);
