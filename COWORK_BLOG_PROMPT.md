# 🤖 Cowork Blog Posting Prompt

Copy and paste this into Claude Cowork to automatically create and publish blog posts:

---

## TASK: Research & Create an Automated Smart Home Blog Post

You are helping manage the blog for All Things Automated (https://www.itsallthingsautomated.com), a smart home automation company in Sarasota, FL.

**Your mission:** Find the best smart home/automation story from today or yesterday, write an engaging blog post about it, create or source a featured image, and submit it to the admin dashboard.

---

## STEP 1: Find Today's Best Smart Home Story

Search for recent news/developments in:
- Smart home automation industry
- AI and home security trends
- New smart home products/technologies
- Energy efficiency/smart climate control
- Smart lighting innovations
- Home automation standards (Matter, Thread, Zigbee, Z-Wave)
- Voice assistants (Alexa, Google Home)
- Security trends (cameras, smart locks)
- Sarasota/Florida local smart home news (if available)

**Requirements:**
- Must be from the last 24-48 hours
- Should be relevant to homeowners or smart home enthusiasts
- Pick the most interesting/impactful story
- It should tie to one of these categories: Security, Smart Lighting, Climate Control, AI & Automation, Voice Control, Energy Efficiency, or Home Value

**Report back:**
- Story headline
- Summary (2-3 sentences)
- Source/URL
- Why it matters to homeowners
- Which category it fits best

---

## STEP 2: Write the Blog Post

Using the story you found, write an original blog post that:

**Structure:**
- Opening hook (1 paragraph) - Why should readers care?
- 2-3 main sections with subheadings
- Use practical examples
- Include action items or takeaways
- Closing paragraph with call-to-action

**Style:**
- Write for homeowners (not technical experts)
- Friendly, conversational tone
- 400-800 words
- Clear paragraphs (2-3 sentences each)
- Use markdown formatting with headers

**Content guidelines:**
- Explain new concepts clearly
- Connect to real-world smart home applications
- Mention relevant brands if applicable (Lutron, Control4, Ring, Honeywell, etc.)
- End with a call-to-action like: "Ready to upgrade your smart home? [Contact us](/contact) for a consultation."

**Example structure:**
```markdown
# [Engaging Headline Based on Story]

[Opening: Hook paragraph explaining what this means for homeowners]

## Section 1: [Key Point 1]
[Explanation with examples]

## Section 2: [Key Point 2]
[Explanation with examples]

## Section 3: [How This Affects You]
[Practical takeaways]

## The Bottom Line
[Summary + Call-to-action]
```

---

## STEP 3: Create or Find Featured Image

**OPTION A: Create Custom Image (Recommended)**

Use the Render skill to create a professional featured image:
- Topic: Blog post subject
- Dimensions: 1200x630px (landscape, optimized for web)
- Style: Modern, professional, relates to smart home/automation
- Include relevant visuals (technology, home, security, etc.)

Then:
1. Save the rendered image
2. Go to https://imgur.com
3. Upload the image (click "New Post" → "Image Upload")
4. Copy the image URL (format: `https://i.imgur.com/xxxxx.jpg`)
5. Use this URL in the admin form

**OPTION B: Use Stock Photo (Faster)**

If you choose not to render a custom image, use Unsplash:
1. Go to https://unsplash.com
2. Search for keywords related to your blog post
3. Find a relevant high-quality image
4. Right-click → "Copy image link"
5. Use this URL in the admin form

**Recommended Unsplash searches:**
- "smart home" 
- "home automation"
- "smart security camera"
- "intelligent lighting"
- "home technology"
- "voice assistant"
- "smart thermostat"
- "connected home"

---

## STEP 4: Gather All Blog Post Information

Compile the following information:

```
Title: [Blog Post Title]
Slug: [url-format-slug] (lowercase, hyphens, no spaces)
Category: [One of: Security, Smart Lighting, Climate Control, AI & Automation, Voice Control, Energy Efficiency, Home Value]
Featured Image URL: [Imgur or Unsplash URL]
Excerpt: [1-2 sentence summary for blog listing]
Content: [Full blog post in Markdown]
Status: published
Date: [Today's date in YYYY-MM-DD format]
```

---

## STEP 5: Submit to Admin Dashboard

Navigate to: **https://www.itsallthingsautomated.com/admin**

1. **Login:**
   - Password: `ATA2024!`

2. **Go to Blog Tab:**
   - Click the **📝 Blog** tab at the top

3. **Fill Out the Form:**
   - **Title:** [Your blog post title]
   - **Slug:** [Auto-generated, but verify it's clean]
   - **Category:** [Select the appropriate category]
   - **Featured Image URL:** [Paste Imgur or Unsplash URL]
   - **Excerpt:** [1-2 sentences]
   - **Content:** [Paste full Markdown content]
   - **Status:** Click **✓ Published** (to go live immediately)
   - **Date:** [Today's date]

4. **Submit:**
   - Click **Save Blog Post**
   - Wait for confirmation message ✓

---

## STEP 6: Verify Publication

1. Wait 1-2 minutes for deployment
2. Go to https://www.itsallthingsautomated.com/blog
3. Your post should appear at the top of the blog listing
4. Click on it to verify all content and image loaded correctly

---

## Content Guidelines & Tips

✅ **DO:**
- Write for Sarasota homeowners interested in smart automation
- Be informative and helpful
- Use clear, simple language
- Include practical examples
- Connect to real-world applications
- Add a relevant call-to-action
- Proofread before submitting

❌ **DON'T:**
- Write purely promotional content
- Use overly technical jargon without explanation
- Create clickbait titles
- Plagiarize from sources (write original analysis)
- Forget the call-to-action
- Submit without reviewing

---

## Blog Post Categories

Choose the most relevant category:
- **Security** - Cameras, smart locks, alarm systems
- **Smart Lighting** - Lighting control, color tuning, automation
- **Climate Control** - Thermostats, HVAC automation, energy efficiency
- **AI & Automation** - AI features, automation workflows, smart scenes
- **Voice Control** - Voice assistants, hands-free control
- **Energy Efficiency** - Saving energy, reducing costs
- **Home Value** - Real estate, property value, ROI

---

## Helpful Resources

- **Blog Publishing Guide:** Read `BLOG_GUIDE.md` in the repo for detailed instructions
- **Markdown Help:** Use `**bold**` for emphasis, `*italic*` for subtlety, `# Heading` for headers
- **Company Info:** 
  - Location: Sarasota, FL
  - Brands: Lutron, Control4, Ring, Honeywell, Ecobee, Luma
  - Services: Smart Lighting, Security Cameras, Climate Control, Full Automation
  - Focus: Sarasota, Manatee, Charlotte Counties

---

## Troubleshooting

**Can't find a relevant story?**
- Try broader searches: "smart home news", "home automation trends"
- Look at tech news sites: TechCrunch, The Verge, CNET, ArsTechnica
- Check product pages for new releases
- Industry sites: Smarthome.com, IoTforAll

**Image not loading in admin form?**
- Verify the URL is correct
- Make sure it's a direct image link (not a page/gallery link)
- Try a different image source

**Post not showing up after submission?**
- Check status is "Published" (not Draft)
- Clear browser cache
- Verify date is today or earlier
- Wait 2-3 minutes for deployment

**Need to edit a post?**
- Fill out the form again with the same slug
- It will overwrite the previous version

---

## Quick Checklist Before Submitting

- [ ] Story found and researched
- [ ] Blog post written (400-800 words)
- [ ] Contains 2-3 main sections with headers
- [ ] Includes call-to-action at end
- [ ] Featured image ready (Render + Imgur OR Unsplash URL)
- [ ] Title is engaging and descriptive
- [ ] Slug is lowercase with hyphens
- [ ] Category selected correctly
- [ ] Excerpt is 1-2 sentences
- [ ] Markdown formatting is clean
- [ ] No spelling/grammar errors
- [ ] Ready to publish

---

## Need Help?

For detailed markdown formatting, image upload instructions, or content examples, see:
- `BLOG_GUIDE.md` - Complete guide with examples
- Admin dashboard blog form - Tips section at bottom

**You're ready! Go find a great story and write! 🚀**
