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

// Public business email (Jorge, Oct 2026). Website form leads are also sent here.
export const email = "inquiry@allthingsautomated.org";

export const instagramUrl = "https://www.instagram.com/allthingsautomated8";

export const serviceArea = ["Sarasota", "Bradenton", "Venice", "Lakewood Ranch", "Tampa"];
export const serviceAreaLine = `${serviceArea.join(" · ")} & surrounding areas`;

// Acuity booking for the On-Site Consultation & Estimate appointment. The /book page embeds it.
export const acuityUrl =
  "https://allthingsautomatedcalendar.as.me/schedule/04821538?appointmentType=74225838";
export const bookPath = "/book";

// No prices anywhere on the site (Jorge's rule). Pricing is discussed on the phone or at the visit.

// Leave empty until confirmed; the footer hides anything blank.
export const hours = "";
export const licenseNumber = ""; // e.g. "EC13000000" → "Licensed & insured — FL Lic. #EC13000000"

// Google Business Profile. The reviews section (home and About) appears once `url` or `reviewLink` is set.
//   url         the profile on Google Maps ("Share" → copy link)
//   reviewLink  the "Ask for reviews" link from the Business Profile (e.g. https://g.page/r/.../review)
//   rating, reviewCount  copy from the profile; shown only once reviewCount >= 5
export const googleReviews = { rating: 5.0, reviewCount: 0, url: "https://share.google/m8n6ZNxCkk32aWhhE", reviewLink: "https://g.page/r/CU_FGi9Z-0z7EAI/review" };

// Real Google reviews, copied word for word with the reviewer's name as shown on Google. Never edit or invent one.
export const googleReviewQuotes: { name: string; text: string }[] = [];

// Cloudflare Turnstile site key for the lead forms (public). Empty = widget not shown.
export const turnstileSiteKey = "";

// Google Search Console HTML-tag verification code (the content="..." value). Empty = no tag.
// Not needed if the site is verified as a Domain property through Cloudflare DNS.
export const googleSiteVerification = "";

// Plausible analytics domain. Empty = no analytics script.
export const plausibleDomain = "";
