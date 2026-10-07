// Fails the build if a dollar amount appears in the site source. Jorge's rule: no prices on the website.
import { readdir, readFile } from "node:fs/promises";
import { resolve, relative } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pattern = /\$\s?\d|\d+\s?(?:dollars|USD)\b|priceCurrency|"price"\s*:/i;
const hits = [];

async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await scan(path);
    else if (/\.(tsx?|json|md|css)$/.test(entry.name)) {
      (await readFile(path, "utf8")).split("\n").forEach((line, index) => {
        if (pattern.test(line)) hits.push(`${relative(root, path)}:${index + 1}: ${line.trim()}`);
      });
    }
  }
}
await scan(resolve(root, "app"));

if (hits.length) {
  console.error("Prices are not allowed on the website. Remove these before building:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("price check: no prices found");
