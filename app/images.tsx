import { preload } from "react-dom";
import { localImages } from "./image-manifest.generated";

// Every photo slot on the site. Files live in public/img as <stem>-640/960/1440/2200.avif|webp
// plus <stem>.jpg. Replacing a file with a real job photo under the same stem needs no code change.
// A slot whose files are missing renders nothing (pages fall back to their text-only layout).
type Slot = { width: number; height: number; alt: string };

const wide = { width: 1440, height: 804 };
const card = { width: 1440, height: 966 };
const step = { width: 1440, height: 1075 };

export const slots = {
  "home-hero-blue-hour": { ...card, alt: "Coastal-contemporary Gulf Coast home at blue hour with layered interior lighting, lit lanai and landscape uplighting" },
  "home-hero-daylight": { ...card, alt: "Coastal-contemporary home in soft morning light with sabal palms and a live oak" },
  "home-card-lutron-keypad": { ...card, alt: "Satin-nickel Lutron keypad with engraved buttons beside a doorway in a softly lit living room" },
  "home-card-unifi-camera": { ...card, alt: "White dome security camera mounted under a stucco soffit with barrel-tile roof and palms behind" },
  "home-card-whole-home": { ...card, alt: "Living room at dusk with cove lighting, dimmed downlights and a half-lowered motorized shade" },
  "svc-lighting-hero": { ...wide, alt: "Kitchen and dining space with layered dimmed lighting and a wall keypad" },
  "svc-automation-hero": { ...wide, alt: "Hand holding a phone with a lighting-control app inside the living room it controls" },
  "svc-security-hero": { ...wide, alt: "Paver driveway and lit entry of a Florida home at dusk seen from a soffit camera's vantage" },
  "svc-audio-video-hero": { ...wide, alt: "Screened lanai at night with a wall-mounted outdoor television, in-ceiling speakers and a lit pool" },
  "svc-networking-hero": { ...wide, alt: "Neatly dressed residential network rack with patch panel, switch and UPS" },
  "svc-climate-hero": { ...wide, alt: "Bright bedroom with a motorized shade partly lowered and a slim smart thermostat on the wall" },
  "svc-landscape-hero": { ...wide, alt: "Landscape lighting at blue hour: uplit sabal palms, facade grazing and low path lights" },
  "svc-landscape-pool": { ...card, alt: "Pool and screened lanai at night with underwater lights and warm downlights" },
  "svc-ev-hero": { ...wide, alt: "Wall-mounted home EV charger with a tidy conduit run and an electric SUV plugged in" },
  "svc-solar-hero": { ...wide, alt: "Barrel-tile roof with an all-black solar array and a wall-mounted battery at golden hour" },
  "help-line-hero": { ...wide, alt: "White Lutron keypad beside a side table with a phone showing a lighting app" },
  "builders-hero": { ...wide, alt: "Lighting plans, tape measure and keypad samples on a worktable with labeled low-voltage prewire behind" },
  "process-01-assess": { ...step, alt: "Technician with a tablet assessing a living room and lanai" },
  "process-02-design": { ...step, alt: "Laptop showing a lighting-zone floor plan beside printed plans and a keypad sample" },
  "process-03-install": { ...step, alt: "Hands dressing network cables into a patch panel" },
  "process-04-support": { ...step, alt: "Homeowner pressing a keypad button during a system walkthrough" },
  "journal-smart-bulbs": { ...card, alt: "Professional wall dimmer beside a loose smart bulb on a counter" },
  "journal-unifi-vs-ring": { ...card, alt: "Hand holding a small white bullet security camera with a soffit and palms behind" },
  "journal-prewire": { ...card, alt: "New-construction framing with neatly bundled low-voltage cables and conduit stubs" },
} satisfies Record<string, Slot>;

export type SlotName = keyof typeof slots;

const widths = [640, 960, 1440, 2200];
const srcSet = (stem: string, ext: string) => widths.map(w => `/img/${stem}-${w}.${ext} ${w}w`).join(", ");

/** True when the slot's files are installed in public/img. */
export function hasImage(slot: SlotName) {
  return localImages.has(slot);
}

/** Site-relative path of a slot's JPG, for structured data. */
export function imageUrl(slot: SlotName) {
  return localImages.has(slot) ? `/img/${slot}.jpg` : undefined;
}

// loading: "lcp" = the one high-priority preloaded image (home hero); "eager" = above the fold; "lazy" = everything else.
export function Picture({ slot, sizes = "100vw", loading = "lazy", className }: {
  slot: SlotName;
  sizes?: string;
  loading?: "lcp" | "eager" | "lazy";
  className?: string;
}) {
  const image: Slot = slots[slot];
  const common = {
    className,
    width: image.width,
    height: image.height,
    alt: image.alt,
    decoding: "async" as const,
    loading: loading === "lazy" ? ("lazy" as const) : undefined,
    fetchPriority: loading === "lcp" ? ("high" as const) : undefined,
  };

  if (!localImages.has(slot)) return null;
  if (loading === "lcp") {
    preload(`/img/${slot}-1440.avif`, { as: "image", type: "image/avif", imageSrcSet: srcSet(slot, "avif"), imageSizes: sizes, fetchPriority: "high" });
  }
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(slot, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(slot, "webp")} sizes={sizes} />
      <img src={`/img/${slot}.jpg`} {...common} />
    </picture>
  );
}
