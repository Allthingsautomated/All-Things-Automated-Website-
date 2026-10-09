import type { Service } from "./site";
import { lutronPhone, teslaPhone } from "./site-config";

const helpLineCallout = {
  eyebrow: "Lutron Help Line · 24/7",
  heading: "Already have a Lutron system? We answer the phone around the clock.",
  copy: `Anyone with a Lutron system can call ${lutronPhone.display}—no matter who installed it. If the fix needs a visit, we schedule a service call.`,
  href: "/lutron-help-line",
  link: "About the help line",
};

export const services: Record<string, Service> = {
  lighting: {
    path: "/services/lighting",
    metaTitle: "Lutron RadioRA 3 Lighting Control | Sarasota Dealer",
    metaDescription: "Whole-home scenes, keypads, dimming and shades with Lutron RadioRA 3 and Caséta, designed and installed by a Sarasota RadioRA 3 dealer.",
    eyebrow: "Lutron RadioRA 3 · Caséta",
    title: "Lighting that changes",
    italic: "how the home feels.",
    intro: "Refined dimming, architectural keypads, scenes, schedules, and shades—designed as one dependable whole-home system by a Lutron RadioRA 3 dealer.",
    image: "svc-lighting-hero",
    secondImage: "home-card-lutron-keypad",
    statement: "The best lighting control is felt in every room and barely noticed on the wall.",
    details: [
      { title: "Whole-home scenes", copy: "One touch can prepare the home for morning, entertaining, movie night, or bedtime without adjusting individual lights." },
      { title: "Architectural controls", copy: "Elegant keypads replace banks of switches and give every button a clear, intentional purpose." },
      { title: "Reliable performance", copy: "RadioRA 3 is built for dependable control throughout the home—not dependent on a collection of Wi-Fi bulbs." },
      { title: "Shades and schedules", copy: "Natural light, privacy, and energy use can work together through automated shades and time-based routines." },
    ],
    ideal: ["New construction and major remodels", "Homes with too many switches", "Clients who value design and simplicity", "Projects needing shades, scenes, or remote access"],
    phone: lutronPhone,
    callout: helpLineCallout,
    reading: [
      { href: "/blog/smart-bulbs-vs-lighting-system", label: "Smart bulbs vs. a lighting system" },
      { href: "/for-builders", label: "Free RadioRA 3 quotes for the trade" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Do I need to rewire for RadioRA 3?", a: "In most existing homes, no. RadioRA 3 dimmers, switches and keypads replace the standard devices in your existing boxes and talk to each other over Lutron's own wireless. New wiring comes up only for things like a keypad where no switch exists today, or consolidating a bank of switches into one location." },
      { q: "Can it control my existing fans and shades?", a: "Usually. Standard ceiling fans can be run from a Lutron fan-speed control that joins the system; fans with their own built-in wireless remote are a case-by-case check. Lutron shades join directly, and we review motorized shades from other brands for compatibility during the assessment." },
      { q: "What's the difference from Caséta?", a: "Caséta is Lutron's smaller system: wireless dimmers and switches, a few scenes and an app, well suited to a handful of rooms or a smaller home, and it works without a neutral wire at many switch locations. RadioRA 3 is designed for the whole house: engraved keypads, far more devices and scenes, shades, and professional programming. Both are reliable Lutron products; the house and the goals decide." },
      { q: "Can I add rooms later?", a: "Yes. RadioRA 3 is built to grow. We add devices and reprogram scenes without replacing what is already installed, and if a larger expansion is likely we plan the processor and keypad layout for it from the start." },
    ],
  },
  automation: {
    path: "/services/automation",
    metaTitle: "Whole-Home Control & Automation | Sarasota",
    metaDescription: "One simple way to run lighting, shades, climate, audio and security—built on Lutron RadioRA 3 with Savant, Sonos and Google Nest, for Gulf Coast homes.",
    eyebrow: "Whole-home control",
    title: "One home.",
    italic: "One experience.",
    intro: "Lighting, shades, climate, entertainment, and security brought together—built on Lutron RadioRA 3, with Savant, Sonos, UniFi and Google Nest integrated, and an interface the whole household can understand.",
    image: "svc-automation-hero",
    secondImage: "home-card-whole-home",
    statement: "Automation should remove friction from daily life—not introduce another complicated app.",
    details: [
      { title: "Unified control", copy: "Manage the systems that matter from keypads, an app, or voice—with the wall controls still working the way people expect." },
      { title: "Personalized scenes", copy: "Create routines around how the home is actually used, from arrival and entertaining to sleep and travel." },
      { title: "Entertainment", copy: "Simplify televisions, streaming sources, music, and rooms so enjoying them does not require a lesson." },
      { title: "Professional support", copy: "The system is designed, programmed, documented, and supported by one accountable team." },
    ],
    ideal: ["Whole-home renovations", "New construction", "Multiple entertainment spaces", "Owners tired of disconnected apps"],
    reading: [
      { href: "/blog/smart-bulbs-vs-lighting-system", label: "Smart bulbs vs. a lighting system" },
      { href: "/partners/savant", label: "Savant whole-home control" },
    ],
  },
  security: {
    path: "/services/security",
    metaTitle: "UniFi Protect Camera Systems | Sarasota & Bradenton",
    metaDescription: "Planned camera coverage, local recording and no monthly camera fees. Professional UniFi Protect design and installation in Sarasota and Bradenton.",
    eyebrow: "UniFi Protect",
    title: "Security that knows",
    italic: "what it sees.",
    intro: "Intentional camera coverage, intelligent detection, local recording, and secure remote access without monthly camera licensing fees.",
    image: "svc-security-hero",
    secondImage: "journal-unifi-vs-ring",
    statement: "A camera system should help you find the moment that matters—not leave you searching through hours of footage.",
    details: [
      { title: "Planned coverage", copy: "Camera locations and lens choices are selected around entrances, approaches, blind spots, and identification goals." },
      { title: "Smart detection", copy: "Compatible cameras can distinguish people, vehicles, and other events for more useful alerts and faster review." },
      { title: "Local recording", copy: "Footage remains under your control on dedicated local hardware with secure remote access." },
      { title: "One ecosystem", copy: "Cameras, door access, networking, and related infrastructure can share one professionally managed platform." },
    ],
    ideal: ["Homes needing real perimeter coverage", "Small businesses and offices", "Multi-site properties", "Clients replacing consumer cameras"],
    reading: [
      { href: "/blog/unifi-vs-ring-cameras", label: "UniFi Protect vs. Ring cameras" },
      { href: "/services/networking", label: "The network behind the cameras" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Do UniFi cameras have monthly fees?", a: "No per-camera subscription. UniFi Protect records to a console in your home and the app is included. The console and its storage drive are part of the installation." },
      { q: "How long is footage kept?", a: "It depends on the number of cameras, resolution, recording mode and drive size. We size storage during design; many homes keep several weeks of footage, and more drive capacity extends it." },
      { q: "Can I see cameras from my phone?", a: "Yes. The UniFi Protect app shows live and recorded video and sends alerts from anywhere with an internet connection." },
      { q: "Can you replace my Ring cameras?", a: "Yes, and the existing camera spots are a useful starting point because they show where you wanted coverage. We review each one and adjust height, angle or position where a better view of entries and approaches is possible, then replace them with wired cameras that record locally." },
    ],
  },
  audio: {
    path: "/services/audio-video",
    metaTitle: "Home Theater & Audio | Epson Certified | Sarasota",
    metaDescription: "Discreet speakers, outdoor audio and clean TV installs for indoor-outdoor Florida living, planned and installed by one Sarasota team.",
    eyebrow: "Whole-home audio & video",
    title: "Every room.",
    italic: "The right atmosphere.",
    intro: "Discreet speakers, simple television control, and music that moves naturally through the home—inside and out.",
    image: "svc-audio-video-hero",
    statement: "Great audio belongs in the architecture, not scattered across countertops and power outlets.",
    details: [
      { title: "Whole-home music", copy: "Play one source everywhere or give each space independent control without visible clutter." },
      { title: "Outdoor entertainment", copy: "Weather-ready audio and television solutions extend the experience to pools, patios, and lanais." },
      { title: "Clean television design", copy: "Plan mounting, wiring, equipment location, and control before the wall is finished." },
      { title: "Simple operation", copy: "A polished system should be easy for family and guests to use without a stack of remotes." },
    ],
    ideal: ["Indoor-outdoor Florida living", "Media rooms and gathering spaces", "Clean wall-mounted television installations", "Clients who value music throughout the home"],
    reading: [
      { href: "/partners/epson", label: "Epson home theater" },
      { href: "/partners/sonos", label: "Sonos audio, room by room" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Can speakers be weatherproof on the lanai?", a: "Yes. Outdoor-rated speakers and outdoor televisions are built for Florida humidity, heat and rain. We place them under cover where possible and keep the amplifiers and sources inside with the rest of the equipment." },
      { q: "Can each room play something different?", a: "Yes. Each room or zone can play its own source, or rooms can be grouped so the same music follows you from the kitchen to the pool." },
      { q: "Do you hide the equipment?", a: "Yes. Amplifiers, streamers and video sources live in an equipment closet or cabinet, with in-ceiling or in-wall speakers and a clean wall-mounted television in the room itself." },
      { q: "Will my guests be able to use it?", a: "That is the goal. We set up simple control—a keypad, one remote, or an app with the basics up front—and walk the household through it at handoff so anyone can start the music or the movie." },
    ],
  },
  networking: {
    path: "/services/networking",
    metaTitle: "Home Network & Wi-Fi Design | Sarasota",
    metaDescription: "Structured wiring, managed Wi-Fi and network segmentation for Sarasota homes with cameras, streaming, remote work and automation.",
    eyebrow: "Professional networking & Wi-Fi",
    title: "The system behind",
    italic: "every other system.",
    intro: "Purpose-built wired and wireless infrastructure for reliable coverage, high device counts, remote work, streaming, cameras, and automation.",
    image: "svc-networking-hero",
    secondImage: "process-03-install",
    statement: "Smart-home performance begins with a network designed for the property—not a router hidden in one corner.",
    details: [
      { title: "Coverage planning", copy: "Access points are positioned around construction materials, floor plans, outdoor areas, and actual device demand." },
      { title: "Structured wiring", copy: "CAT6 and fiber pathways create a reliable foundation for televisions, cameras, access points, and future systems." },
      { title: "Managed equipment", copy: "Professional gateways, switches, power, and monitoring make the network easier to support and expand." },
      { title: "Secure segmentation", copy: "Separate trusted, guest, camera, and automation traffic when the project requires stronger control." },
    ],
    ideal: ["Large or multi-story homes", "New construction prewire", "Properties with outdoor coverage needs", "Homes with cameras and many connected devices"],
    reading: [
      { href: "/blog/new-construction-smart-home-prewire", label: "What to prewire for a smart home" },
      { href: "/services/security", label: "UniFi Protect camera systems" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Why is my Wi-Fi bad in the lanai?", a: "Block walls, tile, metal roofs and impact glass all weaken Wi-Fi, and most routers sit in one corner of the house. A ceiling-mounted access point near the lanai, wired back to the network, usually fixes it." },
      { q: "Do I need wired access points?", a: "For the best result, yes. Access points with their own network cable outperform mesh units that relay wireless signals between each other, especially in Florida construction. Where a cable cannot reach, a mesh unit with a strong link to the rest of the network is the fallback." },
      { q: "Can you separate guest and camera networks?", a: "Yes. We set up separate networks for family devices, guests, cameras and automation equipment, so camera traffic does not slow the house and guests cannot reach your equipment." },
      { q: "Do you work with my ISP's modem?", a: "Yes. The provider's modem or fiber terminal stays; our gateway sits behind it and handles routing, Wi-Fi and security. If the provider's unit also acts as a router, we set it to pass through so there is one network in the house instead of two fighting each other." },
    ],
  },
  climate: {
    path: "/services/climate",
    metaTitle: "Smart Climate & Energy Control | Sarasota",
    metaDescription: "Scheduling, occupancy and scene-based climate control integrated with lighting and shades for seasonal and year-round Florida homes.",
    eyebrow: "Climate & energy control",
    title: "Comfort that follows",
    italic: "the way you live.",
    intro: "Thoughtful climate control, schedules, occupancy routines, and automation that improve comfort without constant adjustment.",
    image: "svc-climate-hero",
    statement: "Comfort becomes effortless when climate, shades, lighting, and occupancy work from the same plan.",
    details: [
      { title: "Smarter scheduling", copy: "Setbacks and comfort periods can reflect real household routines instead of a rigid weekly timer." },
      { title: "Room awareness", copy: "Use supported sensors and system logic to understand temperature, occupancy, and changing conditions." },
      { title: "Integrated scenes", copy: "Away, sleep, arrival, and vacation modes can coordinate climate with lights, shades, and security." },
      { title: "Remote visibility", copy: "Check and adjust supported systems from anywhere while retaining professional serviceability." },
    ],
    ideal: ["Seasonal Florida residences", "Homes with multiple HVAC zones", "Clients focused on comfort and convenience", "Projects already integrating lighting and shades"],
    reading: [
      { href: "/blog/smart-bulbs-vs-lighting-system", label: "Shades and the Florida sun" },
      { href: "/partners/nest", label: "Google Nest, set up the right way" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Which thermostats do you integrate?", a: "Google Nest thermostats (we are a Google Nest Pro) and other models that integrate with your lighting and control system. We confirm compatibility with your HVAC equipment during the assessment, since multi-stage and zoned systems narrow the choices." },
      { q: "Can shades and AC work together?", a: "Yes. Motorized shades can lower on a schedule or when the afternoon sun hits west-facing glass, which cuts the heat the air conditioner has to remove, and scenes like Away can set the shades and the thermostat together." },
      { q: "Does it help with humidity when we're away?", a: "Yes. A connected thermostat holds an away setpoint, shows you the temperature and humidity from your phone, and with compatible equipment can run the system to keep humidity in check in an empty house. For seasonal homes we also recommend a remote sensor and an alert so you know before a problem starts." },
      { q: "Can I control it remotely?", a: "Yes. Thermostats, shades and scenes are available from the app anywhere with an internet connection." },
    ],
  },
  landscape: {
    path: "/services/landscape-lighting",
    metaTitle: "Landscape & Architectural Lighting | Sarasota",
    metaDescription: "Landscape, facade and outdoor living lighting for Sarasota, Bradenton and Venice homes—designed, installed and tied into whole-home lighting control.",
    eyebrow: "Landscape & architectural lighting",
    image: "svc-landscape-hero",
    secondImage: "svc-landscape-pool",
    title: "The home after dark,",
    italic: "designed on purpose.",
    intro: "Facade, landscape, pathway, pool, and lanai lighting planned as one composition—and connected to the same scenes and schedules as the inside of the home.",
    statement: "Outdoor lighting should reveal the architecture and make the property safer to move through—without glare or a runway of path lights.",
    details: [
      { title: "Lighting design", copy: "Fixture locations, beam angles, and color temperature are chosen to highlight the architecture, trees, and plantings that matter." },
      { title: "Outdoor living", copy: "Lanais, pools, docks, and entertaining areas get layered light that is comfortable to sit in, not just bright." },
      { title: "Safe arrival", copy: "Driveways, steps, entries, and pathways are lit so the property is easy to navigate at night." },
      { title: "Integrated control", copy: "Outdoor lighting can follow sunset schedules and join whole-home scenes instead of running on separate timers." },
    ],
    ideal: ["New landscapes and renovations", "Homes with pools, lanais, or docks", "Properties with architectural facades", "Owners replacing failing low-voltage systems"],
    reading: [
      { href: "/services/lighting", label: "Lutron RadioRA 3 lighting control" },
      { href: "/blog/unifi-vs-ring-cameras", label: "Why cameras and landscape lighting go together" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Will it work with my existing transformer?", a: "Often. We test the existing transformer and wiring first. If it is sized correctly and in good condition we reuse it; if it is undersized, corroded or running on a mechanical timer, we replace it with a modern transformer the lighting system can control." },
      { q: "How long do LED fixtures last in salt air?", a: "Solid brass or copper fixtures with sealed LED lamps are made for coastal use and hold up for many years; thin aluminum or plastic fixtures are what fail first near the water. On the islands and near the bay we specify marine-grade fixtures, connectors and hardware." },
      { q: "Can it follow sunset automatically?", a: "Yes. The system uses your location's sunrise and sunset times, so the lights come on at dusk all year without a timer to adjust, and they can join whole-home scenes like Entertain or Goodnight." },
      { q: "Do you light pools and docks?", a: "Yes. Pool and spa lighting, lanai lighting and dock lighting are part of the plan, with fixtures and wiring methods chosen for wet locations and salt water." },
    ],
  },
  solar: {
    path: "/services/solar-tesla",
    metaTitle: "Tesla Solar, Powerwall & Solar Roof | Sarasota",
    metaDescription: "Tesla solar panels, Solar Roof, Powerwall and Wall Connector installation from All Things Automated Solar, serving Sarasota and the Gulf Coast.",
    eyebrow: "All Things Automated Solar · Tesla Energy",
    image: "svc-solar-hero",
    title: "Your own power,",
    italic: "stored for when you need it.",
    intro: "Tesla solar panels, Solar Roof, Powerwall, and Wall Connector—planned around your roof, your electrical service, and how your home uses energy.",
    statement: "On the Gulf Coast, solar and battery storage are about resilience as much as the electric bill.",
    details: [
      { title: "Solar panels", copy: "Panel layout is planned around roof orientation, shading, and the home's actual energy use." },
      { title: "Solar Roof", copy: "For roof replacements, Tesla Solar Roof combines the roof and the solar array in one system." },
      { title: "Powerwall", copy: "Battery storage keeps essential circuits running during outages and stores solar energy for evening use." },
      { title: "Wall Connector", copy: "Add home EV charging on the same plan, sized to your electrical service." },
    ],
    ideal: ["Homes planning a roof replacement", "Owners who want backup power for storm season", "Households with an EV or planning one", "Properties with good sun exposure"],
    idealHeading: "Planned around the roof, the panel, and the way you use power.",
    phone: teslaPhone,
    reading: [
      { href: "/services/ev-chargers", label: "EV charger installation" },
      { href: "/venice", label: "Powerwall for seasonal homes in Venice" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Does Powerwall run the whole house in an outage?", a: "It depends on how many Powerwalls are installed and what is running. One Powerwall typically keeps essential circuits going—refrigerator, lights, internet, cameras, some outlets—through an outage; running air conditioning through a long outage takes more storage. We size the system around what you want to keep running." },
      { q: "Solar Roof or panels?", a: "Solar Roof makes sense when the roof is due for replacement anyway, because it is the roof and the array in one. If the roof is in good condition, panels are the more practical choice. We look at the roof's age, orientation and shading before recommending either." },
      { q: "What about hurricane season?", a: "The system is engineered and permitted to Florida's wind-load requirements. During an outage, Powerwall keeps your essential circuits running and the solar recharges it in daylight, which is the main reason Gulf Coast owners add storage." },
      { q: "Do you handle permits and FPL interconnection?", a: "Yes. Permits, inspections and the utility interconnection application are handled as part of the project, and the system is switched on once the utility grants permission to operate." },
    ],
  },
  ev: {
    path: "/services/ev-chargers",
    metaTitle: "EV Charger Installation | Sarasota & Bradenton",
    metaDescription: "Home EV charger installation in Sarasota and Bradenton: hardwired wall chargers or a 240V plug-in outlet, sized to your electrical panel.",
    eyebrow: "EV charger installation",
    image: "svc-ev-hero",
    secondImage: "electrical-hero",
    title: "Charge at home,",
    italic: "the right way.",
    intro: "A hardwired wall charger or a 240V plug-in outlet—installed to fit your vehicle, your garage, and your electrical panel.",
    statement: "A good EV install starts at the electrical panel, not at the charger.",
    details: [
      { title: "Panel check", copy: "We confirm your service and panel capacity before recommending a charger size or circuit." },
      { title: "Hardwired chargers", copy: "Wall-mounted chargers, including the Tesla Wall Connector, for the fastest and cleanest home charging." },
      { title: "240V outlets", copy: "A dedicated plug-in outlet for the mobile charger that came with your vehicle." },
      { title: "Clean placement", copy: "The charger goes where the cable reaches the car comfortably, with tidy conduit and wiring." },
    ],
    ideal: ["New EV owners", "Two-EV households", "Garages that need a dedicated circuit", "Homes adding solar or Powerwall"],
    idealHeading: "Sized to your car, your garage, and your panel.",
    reading: [
      { href: "/services/solar-tesla", label: "Tesla solar, Powerwall & Solar Roof" },
      { href: "/blog/new-construction-smart-home-prewire", label: "Prewire a 240V circuit while the walls are open" },
    ],
    // FAQ answers drafted 2026-10-09 for Jorge's review; an answer set to "" is unpublished.
    faqs: [
      { q: "Hardwired charger or 240V outlet?", a: "A hardwired wall charger gives the fastest charging, the cleanest installation and no plug to wear out, and it is required for the highest-power chargers. A 240V outlet is the simpler option if you want to use the mobile charger that came with the car or may move. Either way, the circuit is sized to your panel." },
      { q: "Will my panel handle it?", a: "We check before recommending anything. Many panels have room for a dedicated charging circuit; if yours is full or the service is small, the options include a load-management charger that shares capacity, a sub-panel, or a service upgrade." },
      { q: "How long does an install take?", a: "Most installations are finished in a day once the charger location and panel plan are set. A panel or service upgrade adds time, and we tell you that up front." },
      { q: "Do you install Tesla Wall Connectors?", a: "Yes. The Tesla Wall Connector is the charger we install most, and the Universal version works with other EVs as well. We also install other brands if you already own one." },
    ],
  },
};

// Order of the systems on the /services index.
export const serviceOrder = ["lighting", "landscape", "automation", "security", "networking", "audio", "climate", "ev", "solar"];

export { articleOrder, articles } from "./articles";
