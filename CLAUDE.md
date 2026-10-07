# All Things Automated website — rules

These come from the owner, Jorge. Follow them even when a task document or audit says otherwise.

- **No prices on the website.** No dollar amounts, fees, rates, or "credited to your project" wording anywhere: not on assessment cards, Book, Contact, Terms, FAQs, or structured data. Pricing is handled on the phone and at the visit. `scripts/check-no-prices.mjs` fails the build if one slips in.
- Never publish hourly rates, Jorge's personal contact details, or a street address.
- No fabricated reviews, stats, or projects. The images in `public/img/` are illustrative and must never appear on `/work` or be presented as ATA's completed work.
- Phone lines are set in `app/site-config.ts`: main line everywhere; Lutron line only on Lutron pages (lighting, help line, builders, contact); Tesla line only on the solar page and Contact.
- `main` auto-deploys to the live site. Work on a branch and open a PR for Jorge to approve.
