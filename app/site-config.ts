// Single source of truth for contact details and business facts shown on the site.
// Change a number or address here and it updates on every page and in the structured data.

export const siteUrl = "https://itsallthingsautomated.com";
export const siteName = "All Things Automated";

export type PhoneLine = { label: string; display: string; tel: string };

// Main business line; Alli answers and routes.
export const mainPhone: PhoneLine = { label: "Main line", display: "(941) 883-3458", tel: "+19418833458" };
// 24/7 Lutron support and new Lutron design/install. Lutron pages only.
export const lutronPhone: PhoneLine = { label: "Lutron line", display: "(201) 584-5214", tel: "+12015845214" };
// Tesla Energy products only. Solar page only.
export const teslaPhone: PhoneLine = { label: "Tesla & solar line", display: "(941) 263-5325", tel: "+19412635325" };

// Requires a Cloudflare Email Routing rule for hello@itsallthingsautomated.com.
export const email = "hello@itsallthingsautomated.com";

export const instagramUrl = "https://www.instagram.com/allthingsautomated8";

export const serviceArea = ["Sarasota", "Bradenton", "Venice", "Lakewood Ranch", "Tampa"];
export const serviceAreaLine = `${serviceArea.join(" · ")} & surrounding areas`;

// Acuity booking for the On-Site Consultation & Estimate appointment. The /book page embeds it.
export const acuityUrl =
  "https://allthingsautomatedcalendar.as.me/schedule/04821538?appointmentType=74225838";
export const bookPath = "/book";
