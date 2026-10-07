// Packages the vinext build in `dist/` as a Cloudflare Pages advanced-mode
// deployment in `out/`: static assets at the root, the server bundled into a
// single `_worker.js`, and `_routes.json` so static files skip the worker.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { appendFile, cp, readdir, rm, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { securityHeaders } from "../worker/security-headers.mjs";

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
  external: ["node:*", "cloudflare:*"],
  logLevel: "warning",
});

// Static files bypass the worker, so give them the same security headers via _headers.
await appendFile(
  resolve(out, "_headers"),
  "\n/*\n" + Object.entries(securityHeaders).map(([name, value]) => `  ${name}: ${value}`).join("\n") + "\n",
);

// sitemap.xml from every app/**/page.tsx, with lastmod from the page's last commit.
const siteUrl = "https://itsallthingsautomated.com";
const pages = [];
async function findPages(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await findPages(path);
    else if (entry.name === "page.tsx") pages.push(path);
  }
}
await findPages(resolve(root, "app"));
const today = new Date().toISOString().slice(0, 10);
function lastModified(file) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { cwd: root, encoding: "utf8" }).trim() || today;
  } catch {
    return today;
  }
}
const urls = pages
  .map((file) => ({ file, path: "/" + relative(resolve(root, "app"), file).replace(/\\/g, "/").replace(/\/?page\.tsx$/, "") }))
  .sort((a, b) => a.path.localeCompare(b.path))
  .map(({ file, path }) => `  <url><loc>${siteUrl}${path}</loc><lastmod>${lastModified(file)}</lastmod></url>`);
await writeFile(
  resolve(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);

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
