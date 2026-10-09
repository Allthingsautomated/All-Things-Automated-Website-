// Builds a 1200×630 share image for every photo slot in public/img, saved to public/og/<stem>.jpg,
// in the same style as public/brand/og-image.jpg (hero crop with the white logo lockup bottom-left).
// Pages pick their share image by slot in app/images.tsx (ogImageUrl). Re-run after swapping a photo:
//
//   npx --yes --package=sharp@0.34.3 node scripts/og-images.mjs
//
// sharp is not a project dependency on purpose — it ships a native binary and this runs only when photos change.
import { mkdir, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = resolve(import.meta.dirname, "..");
const imgDir = resolve(root, "public", "img");
const outDir = resolve(root, "public", "og");
const W = 1200, H = 630;
const LOGO_W = 380, PAD = 48;

await mkdir(outDir, { recursive: true });
const stems = (await readdir(imgDir)).filter(f => f.endsWith(".jpg") && !f.startsWith("ata-")).map(f => f.slice(0, -4)).sort();

const logo = await sharp(resolve(imgDir, "ata-logo-on-dark.png")).resize({ width: LOGO_W }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();

// Soft darkening behind the logo so it reads on bright photos.
const shade = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#080b0a" stop-opacity="0.62"/>
        <stop offset="0.42" stop-color="#080b0a" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
  </svg>`,
);

for (const stem of stems) {
  const out = await sharp(resolve(imgDir, `${stem}.jpg`))
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([
      { input: shade, left: 0, top: 0 },
      { input: logo, left: PAD, top: H - PAD - (logoMeta.height ?? 0) },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(resolve(outDir, `${stem}.jpg`), out);
}
console.log(`share images: ${stems.length} written to public/og/`);
