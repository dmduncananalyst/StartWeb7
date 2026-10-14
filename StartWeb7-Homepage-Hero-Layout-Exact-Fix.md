# StartWeb7 — Homepage Hero Responsive Layout: Exact Repair

**Priority:** Fix the existing layout problem visible in the recent StartWeb7 screenshots. This is a targeted correction, **not** a redesign. Do not commit, push, or publish.

## What is still wrong

Previous changes were reported as fixed, but the actual VS Code browser previews still show the **SEARCH / CLICK / LEAD / CUSTOMER** content taking up the left side of the hero, a **large unused blank area on the right**, and the **Search Opportunity Analysis** graphic pushed below the text and buttons. Other preview widths show the graphic expanding across the section or becoming awkwardly stacked, sometimes forcing visitors to scroll to see it.

The original intended appearance on a comfortably sized desktop is a **balanced, side-by-side hero**: the heading, supporting sentence and buttons on the **left**, with the complete, readable Search Opportunity Analysis live action on the **right**. This arrangement should look intentional, not cramped or miniature.

**A CSS change that technically 'passes responsive tests' is not sufficient if the visible result still has that obvious blank space.** Correct what a visitor actually sees.

## Diagnose before editing

1. Inspect the actual homepage HTML, shared CSS, `homepage-analysis.css` if present, and the scripts that resize or scale the Search Opportunity Analysis.
2. Look for competing `@media` rules, CSS `grid`/`flex` tracks, explicit column spans, fixed/min/max widths, absolute positioning, transform/zoom scaling, forced min-height or viewport-height rules, and responsive `order` settings.
3. In a real browser, measure `window.innerWidth` and the rendered bounding boxes of the hero, heading/CTA group, graphic container, and any supposedly empty second column. Test after the page is fully loaded, and look for layout shifts.
4. Identify and report which specific CSS rule or combination makes the right-hand region empty when the graphic is below. **Fix that cause, not just the symptoms.**

## Required behavior

### Full and normal desktop widths

- The heading/CTAs and the Analysis graphic must remain **side by side** when both can be displayed at legible sizes.
- Use a true two-column layout whose children occupy their proper columns, with an intentional gap and balanced vertical alignment.
- The complete graphic must remain visible, uncropped, and readable. Do **not** solve it by shrinking the entire graphic to tiny lettering or using `transform: scale()` / `zoom`.
- The heading must remain prominent, with the existing text, colors, line breaks where appropriate, and buttons preserved.
- Remove any old CSS rule that makes the Analysis block span a new grid row while leaving its original right column empty.

### Medium-sized desktop windows / small laptops

- This is the **critical failure range** shown in the screenshots. Test viewport widths **1280, 1100, 1024, 960, 900, and 880 pixels**, and also resize the actual integrated browser continuously through those widths.
- Keep the two-column arrangement where the usable content width can fit a readable heading **and** a readable analysis panel; adjust column proportions, font size within sensible limits, and spacing together.
- **Do not switch to stacked mode too early.** In particular, do not leave the headline on the left with the right half empty while the chart drops beneath it.
- If the available width really cannot fit both at usable sizes, switch to an **intentional, single-column layout**: heading, supporting text, and buttons form a well-aligned group using the available width; Analysis graphic follows **directly beneath** that group with modest spacing (roughly 20–32px), not after a huge blank region. The full layout must use **one column**, with no invisible reserved second grid track.
- Use a logical responsive breakpoint based on the minimum readable dimensions of the two components, **not** an arbitrary breakpoint that causes the undesirable layout.
- Maintain natural section height in stacked mode. No forced enormous `min-height`, invisible spacer, giant margin, or full-viewport fixed-height rule that creates dead space.

### Narrow tablet and mobile

- Keep the existing website design but arrange the hero in one column when necessary.
- Make the text and CTAs easy to read and use; keep the Analysis live action legible, with appropriate responsive arrangement inside its own panel.
- Never crop its rightmost metrics, force the entire page to scroll sideways, or make its small text unreadable. Reflow the internal analysis where needed rather than shrinking the full graphic as one image.
- Avoid excessive vertical gaps and unexpectedly tiny chart circles.

## Strict preservation

Do not change the already approved blue navigation, logo, phone number, dropdowns, hero copy, CTA wording or destinations, existing live-action data/animation behavior, homepage industries carousel timing, blog pages, SEO, videos, photographs, or unrelated website sections. Make only the smallest number of **scoped homepage hero** CSS/markup changes required.

Do not create yet another layer of duplicate/conflicting media queries. Prefer consolidating the existing rules for this particular hero and removing only the conflicts causing the failure.

## Mandatory verification — visual, not theoretical

1. Open the **actual rendered** homepage after the changes, not merely the stylesheet.
2. Check at **1920, 1440, 1280, 1100, 1024, 960, 900, 880, 768, and 390px** widths, and at desktop browser zoom **125%**.
3. Capture screenshots at **1440, 1024, 960, 880, and 390px**. Show these screenshots or their preview links in the final report.
4. At 1440px the heading and chart should be side by side with similar visual balance to the previously approved desktop reference.
5. At medium widths, **there must be no giant empty right-hand region**. If content stacks, it must use a genuine full-width stacked layout with the chart closely following the text/CTAs.
6. Confirm the entire metric panel is visible with legible titles and numbers, no clipping, horizontal scrolling, or awkward shrinking; all buttons remain accessible.
7. Test both full browser windows and the narrower VS Code integrated browser preview. Report actual measured viewport widths rather than treating the outer VS Code window size as the browser viewport.
8. Check no new flash of unstyled text, navigation errors, or unrelated regressions.
9. If anything cannot be visually verified, say so. Do not report 'fixed' just because an automated check passed.

## Final report

State: (a) root cause and precise CSS rule(s); (b) files changed; (c) which widths you actually visually checked; (d) where the layout changes from two columns to one and why; (e) links or descriptions of real before/after screenshots. **Do not commit, push, or publish without explicit approval.**
