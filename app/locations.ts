export type Location = {
  slug: string;
  city: string;
  county: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  links: { href: string; label: string }[];
};

export const locations: Record<string, Location> = {
  sarasota: {
    slug: "sarasota",
    city: "Sarasota",
    county: "Sarasota County",
    metaTitle: "Smart Home & Lutron Lighting in Sarasota, FL | ATA",
    metaDescription: "Lutron RadioRA 3 lighting, UniFi cameras, networking and landscape lighting for Sarasota homes, from downtown condos to Siesta Key and the barrier islands.",
    intro: "Sarasota is home base. We started here in 2019, and most of our week is spent in Sarasota homes—downtown condos, mid-century houses near the bay, new builds east of I-75, and the barrier islands.",
    sections: [
      {
        heading: "Homes with very different starting points",
        paragraphs: [
          "Sarasota's housing stock covers seventy years of building. A 1950s or 1960s house in the Sarasota School of Architecture tradition might have thin walls, flat roofs, and very little room for new wiring, so wireless Lutron controls and careful device placement matter. A downtown or Lido Key condo comes with association rules, concrete construction, and limited access to common areas. A newer home in Palmer Ranch or east of I-75 may already have structured wiring that just needs a plan.",
          "We start every project with an on-site assessment because the right answer depends on what is already in the walls. The same goal—keypads instead of banks of switches, cameras that actually cover the driveway, Wi-Fi that reaches the lanai—can call for a completely different approach from one house to the next.",
        ],
      },
      {
        heading: "Salt air, sun, and storm season",
        paragraphs: [
          "On Siesta Key, Bird Key, Longboat Key, and anywhere near the bay, salt air shortens the life of outdoor equipment. We choose exterior cameras, landscape fixtures, and enclosures with that in mind, mount them where they shed water, and keep connections out of the weather.",
          "Summer storms and hurricane season shape what owners ask for: surge protection, battery backup for the network and cameras, Powerwall for essential circuits, and the ability to check on the house from out of town. Many Sarasota owners spend part of the year elsewhere, so remote access to cameras, lighting, and climate is often the first priority.",
        ],
      },
      {
        heading: "What we do most in Sarasota",
        paragraphs: [
          "Lutron RadioRA 3 lighting control in renovations and new construction, UniFi camera systems and networks that cover the whole property including the pool and dock, landscape lighting that shows off the house and the palms after dark, and EV chargers in the garage.",
        ],
      },
    ],
    links: [
      { href: "/services/lighting", label: "Lutron RadioRA 3 lighting control" },
      { href: "/services/security", label: "UniFi Protect camera systems" },
      { href: "/services/landscape-lighting", label: "Landscape & architectural lighting" },
    ],
  },
  "lakewood-ranch": {
    slug: "lakewood-ranch",
    city: "Lakewood Ranch",
    county: "Manatee & Sarasota Counties",
    metaTitle: "Smart Home Prewire & Lutron in Lakewood Ranch | ATA",
    metaDescription: "Smart home prewire, Lutron RadioRA 3, whole-home Wi-Fi and cameras for new and recently built Lakewood Ranch homes, coordinated with your builder.",
    intro: "Lakewood Ranch is one of the busiest places on the Gulf Coast for new construction, which makes it the best place to get a smart home right: before the drywall goes up.",
    sections: [
      {
        heading: "Built new, planned once",
        paragraphs: [
          "Most Lakewood Ranch homes are built by production or semi-custom builders across the community's villages. Builder technology packages tend to cover the basics—a few network jacks, a doorbell, maybe a smart thermostat—and leave lighting control, real Wi-Fi coverage, and camera wiring for later. Later usually means opening finished walls.",
          "If you are building, we can work alongside your builder and electrician during the design and rough-in stage. A short planning session decides where keypads go, which loads should be dimmed, where access points and cameras belong, and where the equipment will live. Then the right wire is pulled once.",
        ],
      },
      {
        heading: "Already moved in?",
        paragraphs: [
          "Plenty of Lakewood Ranch owners call us a year or two after closing, when the Wi-Fi does not reach the lanai, the consumer cameras keep dropping offline, or they are tired of six apps for six devices. Newer homes are usually straightforward to upgrade: attic access is good, construction is consistent, and wireless Lutron RadioRA 3 devices replace standard switches without new wiring.",
          "Association guidelines often cover exterior cameras and landscape lighting, so we plan fixture locations and camera views that respect them and your neighbors' privacy.",
        ],
      },
      {
        heading: "Common Lakewood Ranch projects",
        paragraphs: [
          "Because so many Lakewood Ranch homes share similar floor plans, we can often tell you early what will and won't work—where Wi-Fi typically falls short, which rooms benefit most from keypads, and where cameras get the best view of the driveway and lanai.",
          "Prewire for new builds, Lutron RadioRA 3 lighting and shade control, managed Wi-Fi with wired access points, UniFi cameras with local recording, EV charger circuits in the garage, and outdoor audio for the pool and lanai. For seasonal owners, we also set up remote access so the house can be checked from anywhere.",
        ],
      },
    ],
    links: [
      { href: "/blog/new-construction-smart-home-prewire", label: "What to prewire for a smart home" },
      { href: "/services/networking", label: "Home networking & Wi-Fi" },
      { href: "/services/ev-chargers", label: "EV charger installation" },
    ],
  },
  bradenton: {
    slug: "bradenton",
    city: "Bradenton",
    county: "Manatee County",
    metaTitle: "Smart Home, Cameras & Lighting in Bradenton, FL | ATA",
    metaDescription: "Lutron lighting control, UniFi cameras, Wi-Fi and EV chargers for Bradenton homes along the Manatee River and out to the islands.",
    intro: "From established neighborhoods along the Manatee River to newer communities east of town and homes near Anna Maria Island, Bradenton homeowners call us for lighting control, cameras, networks, and EV chargers.",
    sections: [
      {
        heading: "Older homes, newer expectations",
        paragraphs: [
          "Much of west Bradenton was built decades ago: block homes with original panels, limited outlets, and attic space that is tight or hot. These houses can absolutely support modern lighting control and a reliable network, but they need a plan that respects the existing wiring. Wireless Lutron devices, carefully placed access points, and an honest look at the electrical panel come first.",
          "When the panel is the limiting factor—common when adding an EV charger—we check its capacity before recommending anything, so the charger, any lighting control, and network changes are planned together instead of piecemeal.",
        ],
      },
      {
        heading: "Near the water",
        paragraphs: [
          "Homes on the river, the bay, and the islands deal with salt air, wind, and flooding risk. Exterior cameras and lighting need corrosion-resistant hardware and smart mounting. Equipment racks and network gear belong off the floor and away from where water could reach. We also plan for outages: battery backup keeps cameras and the internet connection running through short interruptions.",
        ],
      },
      {
        heading: "Common Bradenton projects",
        paragraphs: [
          "Not every project is large. Plenty of Bradenton calls start with one problem—a camera system that stopped recording, a room with no Wi-Fi, a dimmer that buzzes, a keypad that stopped responding—and grow from there once the owner sees what a planned system can do. Small jobs are welcome, and we will tell you honestly whether a bigger change is worth it.",
          "UniFi camera systems that replace aging consumer cameras, whole-home Wi-Fi that reaches docks and detached garages, Lutron RadioRA 3 and Caséta lighting control in remodels, landscape lighting for palms and facades, and EV charger installs. If you already have a Lutron system and something stopped working, our Lutron help line answers around the clock, whoever installed it.",
        ],
      },
    ],
    links: [
      { href: "/services/security", label: "UniFi Protect camera systems" },
      { href: "/services/ev-chargers", label: "EV charger installation" },
      { href: "/lutron-help-line", label: "Lutron Help Line (24/7)" },
    ],
  },
  venice: {
    slug: "venice",
    city: "Venice",
    county: "Sarasota County",
    metaTitle: "Smart Home & Lighting Control in Venice, FL | ATA",
    metaDescription: "Lutron lighting, cameras, Wi-Fi and remote home monitoring for Venice, FL homes, from the historic island to newer golf and gated communities.",
    intro: "Venice homes range from the historic streets of Venice Island to golf and gated communities inland and newer neighborhoods to the east. A lot of owners split their year between Venice and somewhere else, and that changes what a smart home needs to do.",
    sections: [
      {
        heading: "Built for owners who are not always here",
        paragraphs: [
          "For seasonal owners the most valuable systems are the ones that work while you are away. Cameras you can check from your phone, a network that stays up, climate control that keeps humidity in check in an empty house, and lighting schedules that make the home look lived in. We set these up so they are simple to use and easy for us to support remotely.",
          "Before you leave for the season, a quick check of the system and its backups avoids surprises later.",
        ],
      },
      {
        heading: "Gated and golf communities",
        paragraphs: [
          "Many Venice communities have association rules about exterior changes, cameras, and lighting, plus gate access for contractors. We work within those rules and schedule around them. Inside, homes of this era usually have good attic access and standard construction, so Lutron RadioRA 3 lighting control, ceiling speakers, and wired access points can be added cleanly.",
        ],
      },
      {
        heading: "Near the Gulf",
        paragraphs: [
          "Close to the beaches and Venice Island, salt air and storms are part of the design. We choose exterior cameras and landscape fixtures that hold up, and recommend surge protection and battery backup for the equipment that matters most.",
          "If you are buying a home in Venice, the period before you move in is a good time to make changes: rooms are empty, furniture is not in the way, and work can be scheduled without anyone living around it. We can walk the house with you before closing or right after to plan what is worth doing first.",
          "Common Venice projects include remote monitoring for seasonal homes, lanai and pool audio, Lutron lighting and shade control, landscape lighting, and Tesla Powerwall for outages.",
        ],
      },
    ],
    links: [
      { href: "/services/climate", label: "Smart climate & energy control" },
      { href: "/services/solar-tesla", label: "Tesla solar & Powerwall" },
      { href: "/services/audio-video", label: "Whole-home & lanai audio" },
    ],
  },
  tampa: {
    slug: "tampa",
    city: "Tampa",
    county: "Hillsborough County",
    metaTitle: "Lutron RadioRA 3 Lighting Control in Tampa, FL | ATA",
    metaDescription: "Lutron RadioRA 3 lighting control design, installation and 24/7 Lutron support for Tampa homes, from a Sarasota-based Lutron dealer.",
    intro: "We are based in Sarasota and take on Tampa projects, particularly Lutron RadioRA 3 lighting control and support for existing Lutron systems.",
    sections: [
      {
        heading: "Lutron lighting control",
        paragraphs: [
          "Most of our Tampa work is Lutron: RadioRA 3 whole-home lighting control in remodels and new construction, keypads that replace banks of switches, and shades that work with the lighting. Every project starts with a walkthrough so the design fits how the home is actually used.",
          "If you are building, the best time to plan is before the walls close. We can review the plans with your builder or electrician and mark where keypads, dimmers and the main equipment belong.",
        ],
      },
      {
        heading: "Support for existing Lutron systems",
        paragraphs: [
          "If you already have a Lutron system and something stopped working, our Lutron help line answers around the clock, whoever installed it. Many issues can be sorted out on the phone; if the fix needs a visit, we schedule a service call.",
        ],
      },
      {
        heading: "Is your project a fit?",
        paragraphs: [
          "Because Tampa is outside our home base, we focus on lighting control and Lutron projects there. Call to talk through the scope and schedule, and we will tell you plainly whether we are the right team for it.",
        ],
      },
    ],
    links: [
      { href: "/services/lighting", label: "Lutron RadioRA 3 lighting control" },
      { href: "/lutron-help-line", label: "Lutron Help Line (24/7)" },
      { href: "/for-builders", label: "For builders & designers" },
    ],
  },
};

export const locationOrder = ["sarasota", "lakewood-ranch", "bradenton", "venice", "tampa"];
