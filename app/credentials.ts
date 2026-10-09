// What ATA actually holds (confirmed by Jorge, Oct 2026). Every credential shown on the site comes from here.
// Only Epson is a certification; everything else is a dealer / pro-program account. Never write "certified" for those.
import { partnerFiles } from "./image-manifest.generated";

export const founded = 2019;

// No state license yet. The footer shows the "Licensed & insured — FL Lic. #" form only once a number exists
// (set licenseNumber in site-config.ts). Until then it says "Fully insured".
export const insured = true;

export type Credential = {
  id: string;
  label: string; // exact wording for the site
  rail?: string; // short brand name for the partner rail
  href?: string; // ATA's own page for that system, never the brand's site
  logo?: string; // badge file stem in public/img/partners/, shown only once Jorge drops in the dealer-portal artwork
};

export const certifications: Credential[] = [
  { id: "epson", label: "Epson Certified", rail: "Epson", href: "/services/audio-video", logo: "epson-certified" },
  { id: "nccer", label: "NCCER-trained (Electrical Levels 1–4)" },
];

// Rail order is deliberate: control platforms, audio/video, security/network, electrical.
export const programs: Credential[] = [
  { id: "lutron", label: "Lutron RadioRA 3 Dealer", rail: "Lutron", href: "/services/lighting", logo: "lutron-ra3-dealer" },
  // Savant tier unconfirmed: plain "Savant" only, never "Authorized Dealer" or "Certified" until Jorge confirms.
  { id: "savant", label: "Savant", rail: "Savant", href: "/services/automation", logo: "savant" },
  { id: "sonos", label: "Sonos Pro", rail: "Sonos", href: "/services/audio-video", logo: "sonos-pro" },
  { id: "nest", label: "Google Nest Pro", rail: "Google Nest", href: "/services/climate", logo: "google-nest-pro" },
  { id: "eero", label: "eero Pro Installer", rail: "eero", href: "/services/networking", logo: "eero-pro" },
  { id: "ring", label: "Ring Pro Installer", rail: "Ring", href: "/services/security", logo: "ring-pro" },
  { id: "lorex", label: "Lorex Pro", rail: "Lorex", href: "/services/security", logo: "lorex-pro" },
  { id: "leviton", label: "Leviton Pro", rail: "Leviton", href: "/services/lighting", logo: "leviton-pro" },
];

const all = [...certifications, ...programs];
const byId = Object.fromEntries(all.map(c => [c.id, c]));

// Partner rail: programs in order with Epson after Sonos.
export const partnerRail: Credential[] = ["lutron", "savant", "sonos", "epson", "nest", "eero", "ring", "lorex", "leviton"].map(id => byId[id]);

// Badge artwork path, or null so the rail falls back to text.
export function partnerLogo(credential: Credential) {
  for (const ext of ["svg", "png"]) {
    const file = `${credential.logo}.${ext}`;
    if (credential.logo && partnerFiles.has(file)) return `/img/partners/${file}`;
  }
  return null;
}

// One line under each systems page H1.
const pageCredentials: Record<string, string[]> = {
  "/services/lighting": ["lutron", "leviton"],
  "/services/automation": ["lutron", "savant", "sonos", "nest"],
  "/services/audio-video": ["epson", "sonos"],
  "/services/security": ["ring", "lorex", "nest"],
  "/services/networking": ["eero"],
  "/services/climate": ["nest", "lutron"],
  "/services/landscape-lighting": ["lutron"],
  "/lutron-help-line": ["lutron"],
  "/for-builders": ["lutron", "savant", "sonos"],
};

export function credentialLine(path: string) {
  return pageCredentials[path]?.map(id => byId[id].label).join(" · ");
}

export const footerCredentials = ["lutron", "epson", "sonos", "nest"].map(id => byId[id].label).join(" · ");

