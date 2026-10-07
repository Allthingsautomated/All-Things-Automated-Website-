import type { Article } from "./site";

export const articles: Record<string, Article> = {
  "smart-bulbs-vs-lighting-system": {
    slug: "smart-bulbs-vs-lighting-system",
    category: "Lighting control",
    title: "Smart bulbs are not a smart-lighting system.",
    dek: "Both can turn a light on from a phone. That is where the similarity ends.",
    date: "July 2026", datePublished: "2026-07",
    image: "journal-smart-bulbs",
    sections: [
      { heading: "The difference is the system", paragraphs: [
        "A smart bulb is an individual connected product. A professional lighting-control system treats the entire property as one coordinated environment: dimmers, keypads, shades, schedules, scenes, and remote access designed to work together.",
        "That distinction matters most when the home grows beyond a few lamps. The more rooms, users, and routines involved, the less practical it becomes to manage lighting device by device. Ten bulbs are a hobby. Eighty bulbs across a house, each with its own app pairing, firmware, and Wi-Fi connection, become a maintenance job.",
      ] },
      { heading: "What happens when the switch is turned off?", paragraphs: [
        "Many smart bulbs lose their connected function when someone uses the traditional wall switch. Turn the switch off and the bulb has no power, so the app, the schedule, and the voice assistant can no longer reach it. Households end up taping switches in the on position or explaining the rules to every guest.",
        "A professionally designed system keeps control where people naturally expect it—at the wall—while also enabling scenes, schedules, and app control. The wall device is the smart part. That makes the experience predictable for family, guests, house sitters, and anyone who simply wants the room to turn on.",
      ] },
      { heading: "Most new homes don't have bulbs to replace", paragraphs: [
        "Walk through a Gulf Coast home built in the last ten years and look up. Much of the lighting is recessed LED downlights, many of them integrated fixtures with no screw-in bulb at all. Add under-cabinet strips, pendants, exterior sconces, and landscape lighting, and smart bulbs simply do not fit most of the loads in the house.",
        "Lighting control works at the circuit instead. A dimmer controls whatever is wired to it, whether that is six downlights, a chandelier, or a run of LED tape. That is why a real system is planned around the electrical layout of the home rather than around a shopping list of bulbs.",
      ] },
      { heading: "Dimming quality is the part you notice every day", paragraphs: [
        "Cheap LED dimming shows itself as flicker, buzzing, lights that pop on at 30 percent, or fixtures that will not dim low enough for a movie or a late-night walk to the kitchen. The cause is usually a mismatch between the dimmer and the LED driver inside the fixture.",
        "Part of designing a lighting system is matching dimmers to the actual fixtures and setting low-end trim so each zone fades smoothly. Lutron publishes compatibility information for this reason. When it is done well, nobody thinks about it. The lights just go from bright to barely-there without a flicker.",
      ] },
      { heading: "Reliability and your Wi-Fi", paragraphs: [
        "Most smart bulbs talk over Wi-Fi or another consumer radio, and many depend on a cloud service for scheduling or remote access. Every bulb is another device on the network, another firmware update, and another thing to re-pair after a router change.",
        "Lutron RadioRA 3 uses Lutron's own Clear Connect wireless for the dimmers, switches, keypads, and shades, separate from your Wi-Fi. The system keeps running the house even when the internet is down; the network is only needed for the app and remote access. For a home in hurricane country, where outages and router replacements happen, that separation matters.",
      ] },
      { heading: "Keypads and scenes replace banks of switches", paragraphs: [
        "A kitchen and great room can easily end up with eight or ten switches spread across three walls. A lighting system replaces them with a few engraved keypads: Cooking, Dining, Entertain, Off. Each button sets several zones at once to the levels you chose.",
        "Scenes are where lighting control earns its keep. A Goodnight button by the bed turns off the house and leaves a dim path to the kitchen. An Away scene shuts everything down when you leave. Schedules can bring the exterior lights on at sunset all year without adjusting a timer.",
      ] },
      { heading: "Shades and the Florida sun", paragraphs: [
        "In Sarasota, the sun is part of the lighting plan. West-facing glass can heat a room and fade floors and furniture by mid-afternoon. Motorized shades on the same system can lower automatically on a schedule, or join a scene so movie night closes the shades and dims the lights in one press.",
        "Adding shades later is much easier when the system already exists, and wiring them is easiest before drywall—another reason to treat lighting as a system from the start.",
      ] },
      { heading: "When smart bulbs make sense", paragraphs: [
        "Smart bulbs are not useless. They are a reasonable choice for a few table lamps, a rental where you cannot change the wiring, or color-changing accent lighting in a game room. For lamps in a home with a lighting system, plug-in lamp dimmers usually do the job better.",
        "For homeowners who want a step up without a whole-home system, Lutron Caséta replaces individual switches with wireless smart dimmers and works without a neutral wire at many switch locations, which helps in older Sarasota and Bradenton homes. RadioRA 3 is the choice when you want keypads, larger scale, shades, and a system designed around the entire house.",
      ] },
      { heading: "How to decide", paragraphs: [
        "Count the lights you actually use every day, walk the house at night, and notice where you reach for a switch and cannot find it. If the answer is a few lamps, bulbs might be enough. If it is every room, a system is cheaper over time than a house full of individual smart products—and much easier to live with.",
        "An on-site assessment is the fastest way to find out what your home's wiring supports and what a lighting plan would look like room by room.",
      ] },
    ],
    faqs: [
      { q: "Can I keep my existing light fixtures with a lighting-control system?", a: "Usually yes. Lighting control replaces the switches and dimmers, not the fixtures. We check that each fixture dims well with the control we choose, and recommend a fixture change only when an LED driver will not dim smoothly." },
      { q: "Will the lights still work if the internet goes down?", a: "Yes. RadioRA 3 and Caséta run on Lutron's own wireless and keep working from the keypads and dimmers without the internet. You lose the app and remote access until the connection returns." },
      { q: "Do I need new wiring for RadioRA 3?", a: "In most existing homes, no. RadioRA 3 dimmers and keypads replace standard switches in existing boxes. New wiring helps in places like adding a keypad where no switch exists or consolidating switch banks." },
      { q: "Can Siri, Alexa, or Google control Lutron lights?", a: "Yes. Lutron systems integrate with the major voice assistants, so you can use voice for convenience while the keypads remain the main way to control the house." },
    ],
    related: [
      { href: "/services/lighting", label: "Lutron RadioRA 3 lighting control" },
      { href: "/services/climate", label: "Shades and climate control" },
      { href: "/lutron-help-line", label: "Lutron Help Line (24/7)" },
    ],
  },
  "unifi-vs-ring-cameras": {
    slug: "unifi-vs-ring-cameras",
    category: "Video security",
    title: "UniFi Protect vs. Ring: which camera system fits your property?",
    dek: "The right answer depends less on the camera and more on what you expect the complete system to do.",
    date: "July 2026", datePublished: "2026-07",
    image: "journal-unifi-vs-ring",
    sections: [
      { heading: "Consumer convenience vs. planned coverage", paragraphs: [
        "Ring is designed to make adding individual consumer cameras approachable. UniFi Protect is better suited to a professionally planned system where camera placement, wired infrastructure, recording capacity, network performance, and long-term expansion are considered together.",
        "For a doorbell and one or two views, convenience may be the priority. For full-property coverage—driveway, entries, side yards, pool, dock—the design of the system becomes more important than any single camera.",
      ] },
      { heading: "Wired power vs. batteries and Wi-Fi", paragraphs: [
        "Many consumer cameras run on batteries or plug-in power and connect over Wi-Fi. That makes them quick to install, but batteries need charging, motion recording is often shortened to save power, and Wi-Fi at the edge of the property is rarely strong enough for steady high-resolution video.",
        "UniFi cameras are typically wired with a single network cable that carries both data and power (Power over Ethernet). Wired cameras record continuously if you want them to, do not drop off the network when the Wi-Fi is busy, and do not need anyone on a ladder with a charger. The tradeoff is that the cable has to be run, which is where planning and installation experience come in.",
      ] },
      { heading: "Recording and ownership", paragraphs: [
        "UniFi Protect records to local UniFi hardware—a console with a hard drive in your equipment closet—and provides secure remote access. This appeals to owners who want dedicated storage, predictable capacity, and a system that is not built around a per-camera cloud subscription.",
        "Ring stores recordings in the cloud, and saving and reviewing past video generally requires a paid Ring subscription plan. Storage duration with UniFi depends on camera count, resolution, recording settings, and drive capacity, so those choices should be calculated during design.",
      ] },
      { heading: "Your internet connection matters", paragraphs: [
        "Cloud cameras upload video over your internet connection. With several cameras recording motion all day, that upload traffic competes with video calls, streaming, and everything else in the house. Local recording keeps that traffic inside the home; only the clips you actually watch remotely travel over the internet.",
        "If the internet goes down, a local system keeps recording. That is worth considering in storm season, when outages are most likely and footage is most useful.",
      ] },
      { heading: "Designing for Gulf Coast conditions", paragraphs: [
        "Salt air, sun, and heat are hard on exterior electronics. Mount cameras under soffits where possible, keep cable entries sealed and drip-looped, and avoid aiming straight into the western sun. Near the water, corrosion-resistant mounting hardware pays for itself.",
        "Night footage depends on light. Infrared works for detection, but identifying a face or a license plate is easier when the camera has some ambient light, which is one reason camera and landscape lighting plans work well together.",
      ] },
      { heading: "The question to ask first", paragraphs: [
        "Do you want to see that something happened, or do you need useful footage that helps identify what happened? The second goal requires careful field of view, lighting, mounting height, and approach angles. A wide camera on the corner of the house shows that someone crossed the yard; a narrower camera at the entry shows who it was.",
        "A professional assessment starts with those outcomes and works backward to the camera models and infrastructure.",
      ] },
      { heading: "Doorbells, gates, and access", paragraphs: [
        "A video doorbell is often where people start. UniFi offers doorbells that live in the same app as the rest of the cameras, and the UniFi ecosystem also includes door access for gates and side entries. Keeping all of it in one place means one app, one set of notifications, and one system to maintain.",
      ] },
      { heading: "The network behind the cameras", paragraphs: [
        "A wired camera system is only as good as the network that carries it. Each camera connects to a PoE switch sized for the number of cameras and their power draw, and the switch and recorder should sit on battery backup so a brief outage does not interrupt recording.",
        "Cameras also belong on their own network segment, separate from the family's phones and laptops. That keeps video traffic from slowing everything else down and limits what any single device can reach. Planning the network and the cameras together avoids the most common problem we see: a good camera on a network that cannot keep up.",
      ] },
      { heading: "Privacy and neighbors", paragraphs: [
        "Good coverage watches your property, not your neighbor's pool. Camera angles can be tuned and privacy zones masked out in the software, which matters in close-set neighborhoods and communities with association rules. Audio recording deserves the same thought, since Florida law generally requires consent to record conversations.",
        "Local recording also keeps your video in your own home rather than on someone else's servers, which many owners prefer. You decide who has access, and access can be removed from the app at any time.",
      ] },
      { heading: "When Ring is the right call", paragraphs: [
        "If you rent, need a camera this week, or want a single doorbell with no wiring, Ring and similar products are reasonable. If you own the home and want coverage that lasts, a wired, locally recorded system usually costs more up front and less over the years—without monthly fees and without batteries to charge.",
        "Many of our camera projects start with replacing a handful of consumer cameras that never quite covered the property. The existing locations are a useful starting point for planning what the new system should see.",
      ] },
    ],
    faqs: [
      { q: "Do UniFi cameras need a monthly subscription?", a: "No. UniFi Protect records to a UniFi console in your home and the app is included, so there is no per-camera monthly fee. You do need the console and storage drive, which are part of the installation." },
      { q: "How long is footage kept?", a: "It depends on the number of cameras, resolution, recording mode, and drive size. We size storage during design; many homes keep several weeks of footage, and more drive capacity extends it." },
      { q: "Can I watch my cameras from my phone?", a: "Yes. The UniFi Protect app shows live and recorded video and sends alerts from anywhere with an internet connection." },
      { q: "Can you reuse my existing Ring camera locations?", a: "Often. Existing camera spots show where you wanted coverage. We review each one and adjust height, angle, or position where a better view of entries and approaches is possible." },
    ],
    related: [
      { href: "/services/security", label: "UniFi Protect camera systems" },
      { href: "/services/networking", label: "Home networking & Wi-Fi" },
      { href: "/services/landscape-lighting", label: "Landscape lighting" },
    ],
  },
  "new-construction-smart-home-prewire": {
    slug: "new-construction-smart-home-prewire",
    category: "Planning & construction",
    title: "What should you prewire for a smart home?",
    dek: "The cheapest time to prepare a home for technology is before the drywall closes.",
    date: "July 2026", datePublished: "2026-07",
    image: "journal-prewire",
    sections: [
      { heading: "Start with systems, not cable counts", paragraphs: [
        "A strong prewire plan begins with what the home needs to do: reliable Wi-Fi, camera coverage, television locations, whole-home audio, lighting control, shades, access, climate integration, and room for future expansion.",
        "Cable is then selected and routed to support those outcomes. Pulling random wire without a system plan often creates cost without creating useful capability. A wall full of unused jacks is common in new homes; a ceiling access point where the Wi-Fi is actually needed is not.",
      ] },
      { heading: "Wi-Fi: wire the ceilings", paragraphs: [
        "Good Wi-Fi in a large or multi-story home comes from several access points mounted on ceilings, each with its own Cat6 cable back to the equipment location. Plan one for roughly every major area of the house, plus coverage for the lanai, pool, and garage.",
        "Wired access points outperform mesh systems that relay wireless signals between units, especially in Florida homes with block walls, tile, and impact glass that weaken Wi-Fi.",
      ] },
      { heading: "Cameras: decide locations before the soffits close", paragraphs: [
        "Exterior cameras mounted under soffits need a Cat6 cable to each location. Think about every entry, the driveway, side yards, the pool, and any dock or detached building. It is easy to add a spare cable to a soffit now and very hard to fish one later.",
        "Mark mounting heights and aim on the plans so the electrician and framers know to leave blocking where needed.",
      ] },
      { heading: "Televisions and audio", paragraphs: [
        "Every likely TV location should get power and network behind the screen and a conduit to a nearby cabinet or the equipment closet, so source equipment can be hidden and cables replaced in the future. Include the lanai if an outdoor TV is likely.",
        "For whole-home audio, run speaker wire from each ceiling or wall speaker location back to the amplifier location, including the lanai and pool area. Speaker locations should avoid joists, HVAC returns, and recessed lights; mark them on the reflected ceiling plan.",
      ] },
      { heading: "Lighting control needs early decisions", paragraphs: [
        "Lighting control affects the electrical rough-in more than any other system. Decide where keypads go, which switch locations are consolidated, and which loads are dimmed. Ask for a neutral wire at every switch box and deep boxes where devices will gang together.",
        "For a Lutron RadioRA 3 system, the design sets keypad locations and engraving, zone assignments, and any shade controls before the electrician wires the house. Changes after drywall are possible but slower and costlier.",
      ] },
      { heading: "Shades: power at the window", paragraphs: [
        "Motorized shades are easiest when each window that might get one has low-voltage wire or power at the head, plus blocking in the framing for the brackets. Even if shades are a future project, wiring them now costs little and keeps the option open.",
      ] },
      { heading: "The equipment location", paragraphs: [
        "Every system eventually comes back to one place: a closet or cabinet with the internet service, network switch, camera recorder, audio amplifiers, and lighting processor. Give it a dedicated electrical circuit, ventilation (equipment adds heat, and Florida closets are already warm), and room for a small rack. A conduit from this location to the attic makes future cable runs far easier.",
        "Keep it off the garage floor in flood-prone areas, and plan surge protection and battery backup for the network and cameras. Make sure the internet provider's line is routed to this location too; it is surprisingly common for the service to land in a different closet from everything it needs to connect to.",
      ] },
      { heading: "Outdoors and outbuildings", paragraphs: [
        "Gates, docks, detached garages, guest houses, and pool equipment all benefit from a conduit run during site work. One empty conduit to each outbuilding means network, cameras, and controls can reach it later without trenching through finished landscaping.",
      ] },
      { heading: "Electrical items people forget", paragraphs: [
        "While the walls are open, a few electrical additions are inexpensive and save trouble later. Run a 240-volt circuit to the garage for an EV charger, even if you do not own an electric vehicle yet. Ask for outlets in the soffits for holiday and accent lighting on a switched circuit, and outlets at TV height rather than at the baseboard.",
        "If solar or a battery like Tesla Powerwall is likely in the future, leave space next to the main panel and talk to your electrician about panel capacity now. Whole-house surge protection at the panel protects every electronic system in the home, and it is one of the least expensive upgrades you can make during construction.",
      ] },
      { heading: "Leave a path for what changes", paragraphs: [
        "Technology changes faster than the structure of a home. Conduit, accessible pathways, spare capacity, a properly sized equipment location, and accurate documentation create flexibility that a specific cable alone cannot.",
        "Before insulation and drywall, photograph every wall and label every cable at both ends. Those photos are invaluable years later when someone needs to find a stud or a wire. The objective is not to predict every future product. It is to make the home adaptable without opening finished walls.",
      ] },
      { heading: "Timing with your builder", paragraphs: [
        "Low-voltage prewire happens after framing and electrical rough-in and before insulation. Builders run tight schedules, so get the plan to the builder early and schedule a walk-through at rough-in to confirm locations. Lakewood Ranch and other new-construction communities move fast; a week of planning up front saves months of compromise later.",
      ] },
    ],
    faqs: [
      { q: "When should prewire happen during construction?", a: "After framing and electrical rough-in, before insulation and drywall. Bring us in during design so the plan is ready when the builder reaches that stage." },
      { q: "Is Cat6 enough, or do I need fiber?", a: "Cat6 handles access points, cameras, and TVs in nearly every home. A conduit to key locations is a better investment than fiber everywhere, because it lets you pull whatever the future needs." },
      { q: "Will my builder let an outside low-voltage company prewire?", a: "Many builders allow it, especially for custom and semi-custom homes. We coordinate with the builder and electrician so our work fits their schedule." },
      { q: "What if the house is already finished?", a: "Most systems can still be added. Wireless lighting control, careful cable fishing, and attic access make retrofits practical; some locations just cost more than they would have before drywall." },
    ],
    related: [
      { href: "/for-builders", label: "For builders & designers" },
      { href: "/services/networking", label: "Structured wiring & networking" },
      { href: "/services/lighting", label: "Lutron RadioRA 3 lighting control" },
    ],
  },
};

export const articleOrder = ["smart-bulbs-vs-lighting-system", "unifi-vs-ring-cameras", "new-construction-smart-home-prewire"];
