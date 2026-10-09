// One page per brand in the partner rail (/partners/<id>). Credential wording comes from credentials.ts;
// only Epson may say "certified".
//
// Showcase: add real, completed ATA projects to a brand's `projects` list and the page shows them.
// Never put the illustrative images from public/img/ here, and never invent a project.

export type BrandProject = { title: string; city: string; summary: string; image?: string };

export type BrandPage = {
  id: string; // matches the credential id in credentials.ts
  name: string;
  title: string;
  italic: string;
  intro: string;
  metaDescription: string;
  offer: { title: string; copy: string }[];
  related: { label: string; href: string }[];
  projects: BrandProject[];
};

export const brandPages: Record<string, BrandPage> = {
  lutron: {
    id: "lutron",
    name: "Lutron",
    title: "Lutron lighting control,",
    italic: "designed and installed locally.",
    intro: "As a Lutron RadioRA 3 dealer we design whole-home lighting control, keypads and shades, and we support Lutron systems around the clock.",
    metaDescription: "Lutron RadioRA 3 dealer in Sarasota: whole-home lighting control, keypads, shades and Caséta, designed and installed by All Things Automated.",
    offer: [
      { title: "RadioRA 3", copy: "Whole-home dimming, scenes and schedules with architectural keypads, built as one dependable system." },
      { title: "Caséta", copy: "Smart dimmers and switches for a few rooms or a smaller home, with the same Lutron reliability." },
      { title: "Shades", copy: "Lutron shades that work with the lighting, so light, privacy and heat are handled together." },
      { title: "24/7 support", copy: "Phone support for any Lutron system, no matter who installed it." },
    ],
    related: [
      { label: "Lighting control", href: "/services/lighting" },
      { label: "Landscape lighting", href: "/services/landscape-lighting" },
      { label: "Lutron help line", href: "/lutron-help-line" },
    ],
    projects: [],
  },
  savant: {
    id: "savant",
    name: "Savant",
    title: "Savant whole-home",
    italic: "control in one app.",
    intro: "Savant brings lighting, climate, audio, video and scenes together in one app, so the home responds to how you live in it.",
    metaDescription: "Savant whole-home automation in Sarasota: lighting, climate, audio, video and scenes in one app, designed and installed by All Things Automated.",
    offer: [
      { title: "One app", copy: "Lighting, climate, entertainment and security from a single, consistent interface." },
      { title: "Scenes", copy: "One touch sets lights, shades, music and temperature for the moment." },
      { title: "Remote access", copy: "Check on and control the home from anywhere." },
      { title: "Planned as a system", copy: "Designed around the property, not added one device at a time." },
    ],
    related: [{ label: "Home automation", href: "/services/automation" }],
    projects: [],
  },
  sonos: {
    id: "sonos",
    name: "Sonos",
    title: "Sonos audio,",
    italic: "room by room.",
    intro: "As a Sonos Pro we plan multi-room music and home theater sound, from a single room to the whole house and the patio.",
    metaDescription: "Sonos Pro in Sarasota: multi-room music, architectural speakers and home theater sound, designed and installed by All Things Automated.",
    offer: [
      { title: "Multi-room music", copy: "Play the same song everywhere or something different in every room." },
      { title: "Architectural speakers", copy: "In-ceiling and in-wall speakers that disappear into the room." },
      { title: "Home theater sound", copy: "Soundbars, subwoofers and surrounds set up and tuned for the space." },
      { title: "Outdoor audio", copy: "Music for the lanai, pool and yard." },
    ],
    related: [
      { label: "Audio & video", href: "/services/audio-video" },
      { label: "Home automation", href: "/services/automation" },
    ],
    projects: [],
  },
  epson: {
    id: "epson",
    name: "Epson",
    title: "Epson home theater,",
    italic: "properly installed.",
    intro: "We are Epson Certified for home theater. We plan the projector, screen, seating and sound around the room so the picture looks right from every seat.",
    metaDescription: "Epson Certified home theater in Sarasota: projector and screen design, installation and calibration by All Things Automated.",
    offer: [
      { title: "Projector selection", copy: "The right Epson projector for the room size, light and screen." },
      { title: "Screen & placement", copy: "Screen size, viewing distance and mounting planned before anything is hung." },
      { title: "Sound to match", copy: "Surround sound designed alongside the picture." },
      { title: "Simple control", copy: "One remote or one button to start the movie." },
    ],
    related: [{ label: "Audio & video", href: "/services/audio-video" }],
    projects: [],
  },
  nest: {
    id: "nest",
    name: "Google Nest",
    title: "Google Nest,",
    italic: "set up the right way.",
    intro: "As a Google Nest Pro we install and set up Nest thermostats, cameras and doorbells, connected to the rest of the home.",
    metaDescription: "Google Nest Pro in Sarasota: Nest thermostats, cameras and doorbells installed and set up by All Things Automated.",
    offer: [
      { title: "Thermostats", copy: "Nest thermostats wired and configured for Florida heat and humidity." },
      { title: "Cameras & doorbells", copy: "Nest cameras and doorbells placed for useful views and alerts." },
      { title: "Connected", copy: "Working with your lighting, scenes and voice assistant." },
      { title: "Handoff", copy: "A walkthrough so everyone in the house knows how it works." },
    ],
    related: [
      { label: "Climate control", href: "/services/climate" },
      { label: "Security & cameras", href: "/services/security" },
    ],
    projects: [],
  },
  eero: {
    id: "eero",
    name: "eero",
    title: "eero Wi-Fi",
    italic: "that reaches every room.",
    intro: "As an eero Pro Installer we design mesh Wi-Fi with wired backhaul, so the whole property gets fast, steady coverage.",
    metaDescription: "eero Pro Installer in Sarasota: whole-home mesh Wi-Fi with wired backhaul, designed and installed by All Things Automated.",
    offer: [
      { title: "Coverage planning", copy: "Access points placed for the layout, walls and outdoor areas." },
      { title: "Wired backhaul", copy: "Network cable between access points for speed and reliability." },
      { title: "Outdoor Wi-Fi", copy: "Coverage for the lanai, pool and detached buildings." },
      { title: "Managed setup", copy: "Configured, tested and documented before we leave." },
    ],
    related: [{ label: "Networking & Wi-Fi", href: "/services/networking" }],
    projects: [],
  },
  ring: {
    id: "ring",
    name: "Ring",
    title: "Ring doorbells",
    italic: "and cameras, installed.",
    intro: "As a Ring Pro Installer we mount and set up Ring doorbells, cameras and alarm devices, with clean wiring and useful alerts.",
    metaDescription: "Ring Pro Installer in Sarasota: Ring video doorbells, cameras and alarm devices installed by All Things Automated.",
    offer: [
      { title: "Video doorbells", copy: "Wired doorbells mounted and connected to the chime and Wi-Fi." },
      { title: "Cameras", copy: "Placed for the views that matter, with motion zones set up." },
      { title: "Alarm", copy: "Sensors and keypads installed and tested." },
      { title: "Alerts that help", copy: "Notifications tuned so they are useful, not noisy." },
    ],
    related: [{ label: "Security & cameras", href: "/services/security" }],
    projects: [],
  },
  lorex: {
    id: "lorex",
    name: "Lorex",
    title: "Lorex camera systems",
    italic: "with local recording.",
    intro: "As a Lorex Pro we install wired camera systems that record locally, with clear views of the property and easy playback on your phone.",
    metaDescription: "Lorex Pro in Sarasota: wired camera systems with local recording, installed by All Things Automated.",
    offer: [
      { title: "Wired cameras", copy: "Powered over network cable for steady video without batteries." },
      { title: "Local recording", copy: "Footage stored on a recorder at the property." },
      { title: "Coverage plan", copy: "Camera positions chosen for entries, driveways and yards." },
      { title: "Phone access", copy: "Live view and playback from the app." },
    ],
    related: [{ label: "Security & cameras", href: "/services/security" }],
    projects: [],
  },
  leviton: {
    id: "leviton",
    name: "Leviton",
    title: "Leviton smart",
    italic: "switches and dimmers.",
    intro: "As a Leviton Pro we install Leviton smart switches, dimmers and outlets, with clean wall plates and dependable control.",
    metaDescription: "Leviton Pro in Sarasota: Leviton smart switches, dimmers and outlets installed by All Things Automated.",
    offer: [
      { title: "Smart dimmers", copy: "Dimmers matched to the fixtures so lights dim smoothly." },
      { title: "Switches & outlets", copy: "Smart switches and outlets for lights, fans and plug-in devices." },
      { title: "Clean finishes", copy: "Matching wall plates and colors throughout the home." },
      { title: "App & voice", copy: "Control from the app and voice assistants." },
    ],
    related: [{ label: "Lighting control", href: "/services/lighting" }],
    projects: [],
  },
};

export const brandOrder = ["lutron", "savant", "sonos", "epson", "nest", "eero", "ring", "lorex", "leviton"];
