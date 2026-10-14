# STARTWEB7 — CODEX INSTRUCTIONS
## Homepage Search Opportunity Analysis: responsive layout, approved colors, and Industries slideshow
**Visual reference:** User screenshot **4973** is the preferred desktop-style appearance. Screenshots **4969, 4970, 4971, and 4972** illustrate the sizing and clipping problems at other browser widths. If these screenshots are available to you, inspect them. If not, follow the precise acceptance criteria below; do not claim to have seen images that are unavailable to you.

### Scope and priority
Work ONLY in the current, existing **StartWeb7** project. Focus on the homepage (`index.html`) and directly related styles/scripts for the **Search Opportunity Analysis** live-action graphic and the **Industries carousel on the homepage**. Do NOT touch the industry-page hero videos, the navigation design, the new blog articles, or unrelated website content. Do not publish, commit, or push.

**Main outcome:** The Search Opportunity Analysis visualization must retain the same confident, polished, readable presentation seen in screenshot 4973 across a variety of desktop, laptop, tablet, and narrow preview sizes. It MUST NOT become microscopic, get cut off on the right, leave its headings behind the header, or expand beyond its container. Responsive does not mean shrinking the entire desktop graphic into a tiny unreadable miniature.

### 1. Treat screenshot 4973 as the desktop visual target
The preferred appearance has:
- A navy hero background with a balanced **two-column composition** when enough space exists.
- LEFT: large, bold “SEARCH / CLICK / LEAD / CUSTOMER” headline, supporting sentence, and both blue CTAs, all readable.
- RIGHT: a substantial Search Opportunity Analysis panel with title, four industry rows, labels, circular metric indicators, connecting lines, and values all visible and legible.
- The chart is large enough to understand at a glance; it is not a thumbnail or squashed panoramic strip.
- Proportional padding and visual balance, with **no clipping or sideways scrolling**.
- The approved StartWeb7 blue, navy, white, and readable neutral tones. No random green.

Use that screenshot to judge the **style, proportions, clarity, and emphasis** of the presentation. On a genuinely narrow screen, use an appropriate mobile layout rather than trying to physically preserve two desktop-sized columns.

### 2. Diagnose the actual responsiveness problem before editing
Inspect the current HTML and all relevant CSS and JavaScript for the homepage hero and chart. Find and explain the real cause(s), particularly any:
- Fixed widths, `min-width` values, large `width`/`height` values, overflowing children, or absolute positioning;
- CSS `transform: scale(...)`, `zoom`, or viewport-dependent transform rules shrinking the whole visualization;
- Internal chart rows that maintain desktop coordinates as their container shrinks;
- Clipping from `overflow: hidden` that cuts off the rightmost CUSTOMER circles or labels;
- Layout rules that unexpectedly move the chart below the buttons but keep its desktop spacing in a tiny, unreadable format;
- Fixed/sticky header positioning, anchoring, or scroll behavior that causes the headline to seem cut off beneath the header.

**Fix the underlying component sizing, not the screenshots.** Avoid accumulating new override rules on top of broken responsive rules. Prefer a small, coherent solution in the existing relevant stylesheet or component.

### 3. Responsive behavior — clear rules
**Wide desktop / sufficiently wide viewport:**
- Keep the two-column layout from screenshot 4973, with the analysis graphic on the right and the headline/CTAs on the left.
- Size the chart using its available width, with appropriate minimum *readable* internal text and circles.
- Leave the existing navy hero background, text content, and approved buttons unchanged.

**Medium and small desktop / narrow laptop window:**
- Keep two columns only for as long as BOTH columns remain clearly legible.
- Before the chart gets compressed or clipped, **switch the hero content to one column:** headline and CTAs first; the Search Opportunity Analysis chart immediately beneath them.
- In this stacked state, give the chart the **full available content width**, not a small inset/thumbnail. Preserve comfortable padding and readable type.
- Do not hide the rightmost metrics or cut off the final circle; ensure all four industry rows remain visible.
- Do not compress the chart horizontally to mimic a wide screenshot.

**Mobile / narrow portrait viewport:**
- Show readable heading and CTAs followed by a chart that is purposefully adapted for mobile.
- Do not merely scale down the desktop visualization. **Reflow its internal rows, labels, metrics, and connectors** as needed so a visitor can still read the labels and values.
- If a four-metric row cannot remain readable, use a thoughtful stacked or compact mobile-specific arrangement, preserving each industry, metric and value. Do not delete figures or labels to make it fit.
- The chart should use the available width, with legible tap-free labels and no horizontal scrollbar or sideways cropping.
- Do not make the mobile graphic absurdly tall through large empty gaps, or absurdly short by shrinking all text to microscopic sizes.
- Ensure the chart and its animation continue functioning in this mobile layout.

**At all widths:**
- Preserve the content and meaning of the visualization, including all four named industry examples and the SEARCH, CLICK, LEAD, CUSTOMER stages.
- Keep its lines, circular metrics, activity animation, data updates and ordering; change layout and colors only where required.
- Do not let circles, labels, or decorative numbers overlap each other.
- Never allow the chart to extend beyond its visible background panel.
- Ensure header/navigation do not cover the hero content; regular page scrolling on small screens is fine, but content must not be hidden behind fixed UI.

### 4. Brand-color corrections — NO green
Inspect the current **Search Opportunity Analysis** component for green or any other off-brand accents, including the Roofing row, numerical highlights, animated indicators, connecting lines, and the word **“EXAMPLE.”**

- Replace green styling with the **exact existing StartWeb7 blue** drawn from the site's actual CTA/button CSS, plus approved navy, white and neutral tones. The existing site button blue was previously reported as `#0784FF`, but verify the actual value in the current source; do not blindly hard-code an outdated color.
- Preserve the chart's existing color hierarchy with blue variants where needed, but **do not introduce green, orange, purple, or unrelated accent colors**.
- As separately requested, make the **large solid-filled CUSTOMER/result circles uniformly WHITE** (not blue, green, or pale blue), with **dark navy high-contrast numbers** inside. Keep their size, shape, positions and values.
- Smaller outlined stage circles may remain navy with clear approved-blue/white strokes and legible digits. Preserve the connectors and movement.
- Keep the chart background navy. Maintain sufficient contrast for all small labels and numbers; don't make background decorative numbers look like the primary metrics.
- Apply a consistent treatment across all four industry rows.
- **Do not change the website's navigation color, header colors, blue CTA buttons, or other unrelated animations.**

### 5. Homepage Industries slideshow — slower autoplay only
The separate **Industries slideshow/carousel on the HOME page** rotates too quickly on phones. This is NOT the four-row Search Opportunity Analysis panel.

- Inspect its existing autoplay configuration first. In a previous iteration the full 12-card mobile cycle was changed from roughly **38 seconds to 56 seconds** (about 4.7 seconds per card). **If that change is already present and behaving correctly, keep it; do not slow it a second time.**
- If not yet applied, slow mobile autoplay by approximately **1–2 additional seconds per slide**, while preserving natural, smooth transition speed.
- Preserve slide/card order, photos, copy, links, swipe controls, arrows and manual navigation behavior.
- Preserve desktop/tablet behavior unless it has the same confirmed too-fast issue. Do not pause the whole website or add loading delays.

### 6. Do NOT change unrelated approved features
Strictly preserve:
- Existing two-row header, full-width menu, its blue background, logo, phone number, dropdowns, and hamburger behavior;
- Exact main “SEARCH CLICK LEAD CUSTOMER” wording, headings, buttons, destination links, spacing style and hero background;
- The three new October 14 StartWeb7 blog articles, photos, blog listing and SEO;
- Pool Construction, General Contractors, Collision Repair, and other industry hero videos;
- Other industry/service pages, contact forms, analytics, sitemap, social metadata, and unrelated content.

This is a **targeted homepage visualization responsiveness + palette + slideshow timing** task, NOT a website redesign.

### 7. Test the actual rendered layouts (required)
Test from the root of the existing project, preferably in a **local HTTP server/browser**, not exclusively `file://` and not merely with screenshot comparisons. Check actual viewport dimensions of at least:

| Viewport | Expected behavior |
|---|---|
| 1920 × 1080 | Balanced two-column composition like screenshot 4973; no clipping |
| 1440 × 900 | Same visual quality and full graph visibility |
| 1366 × 768 | Still readable; two columns only if genuinely enough room |
| 1280 × 720 | No squashed chart, no hidden customer circles |
| 1024 × 768 | Stack before content becomes squeezed; full-width legible chart |
| 900 × 700 | Chart responsive and readable, no horizontal overflow |
| 768 × 1024 | Proper single-column/tablet content and readable full graphic |
| 390 × 844 | Purpose-built compact mobile visualization, not tiny desktop chart |
| 320 × 700 | No horizontal scroll or missing labels; reflow as needed |

Also test browser zoom at **125%** and manually resize the preview across the breakpoint. Check at the **top of the page** and while scrolling, and test animation while running.

For each size verify:
1. All headline lines are visible and no content is obscured by the header.
2. The two CTA buttons are visible and usable.
3. All four industry rows and the COMPLETE rightmost CUSTOMER metric are visible; none is cut off.
4. The chart's texts, data and circles are legible; it is not shrunk into an unreadable image.
5. The chart remains inside its panel; no horizontal overflow or weird white/black strips appear.
6. The brand palette is correct; zero green accents remain in this component.
7. The large filled result circles are white with legible dark numbers.
8. Animation continues to work smoothly without layout jumps, overlapping values, or disruptive reflows.
9. The mobile Industries carousel has a readable autoplay interval and still supports manual controls.
10. Other website sections, navigation and blogs remain unchanged.

**Do not claim screenshots/tests were verified unless you actually executed them.** If browser testing is unavailable, state exactly what couldn't be checked; do not hide this limitation.

### 8. Final report and publishing restriction
When finished, report:
- Root cause of the inconsistent chart sizes and clipped/narrow views;
- Every file changed and why;
- The exact desktop-to-stacked/mobile breakpoints and what changes in each;
- Source-verified brand-blue CSS value and how green was replaced;
- Whether large filled circles are uniformly white with contrasting numbers;
- Mobile Industries slideshow interval and whether an existing slow-down was preserved;
- Which viewport sizes were actually rendered and tested;
- Remaining issues, if any.

**Do NOT commit, push, deploy, or publish.** Show me the corrected desktop, narrow laptop, and mobile results first so I can approve them.
