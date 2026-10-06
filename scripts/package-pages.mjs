// Packages the vinext build in `dist/` as a Cloudflare Pages advanced-mode
// deployment in `out/`: static assets at the root, the server bundled into a
// single `_worker.js`, and `_routes.json` so static files skip the worker.
import { build } from "esbuild";
import { cp, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const client = resolve(root, "dist", "client");
const server = resolve(root, "dist", "server");
const out = resolve(root, "out");

// The Cloudflare Vite plugin leaves a redirect that makes Wrangler use the
// Worker config in dist/server instead of wrangler.toml, which breaks Pages.
await rm(resolve(root, ".wrangler", "deploy", "config.json"), { force: true });

await rm(out, { recursive: true, force: true });

// Wrangler-only metadata that Pages does not use and should not serve.
const skip = new Set([".vite", ".assetsignore"]);
await cp(client, out, {
  recursive: true,
  filter: (src) => !skip.has(src.split(/[\\/]/).pop()),
});

// The server output imports its own entry from a chunk (`../index.js`), which
// Pages cannot resolve in a `_worker.js/` directory, so bundle it to one file.
await build({
  entryPoints: [resolve(server, "index.js")],
  outfile: resolve(out, "_worker.js"),
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  external: ["node:*"],
  logLevel: "warning",
});

const exclude = [];
for (const entry of await readdir(out, { withFileTypes: true })) {
  if (entry.name.startsWith("_")) continue;
  exclude.push(entry.isDirectory() ? `/${entry.name}/*` : `/${entry.name}`);
}

await writeFile(
  resolve(out, "_routes.json"),
  JSON.stringify({ version: 1, include: ["/*"], exclude }, null, 2) + "\n",
);

console.log(`Packaged Cloudflare Pages output in out/ (static: ${exclude.join(", ")})`);
