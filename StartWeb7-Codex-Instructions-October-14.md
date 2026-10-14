# StartWeb7 — Codex instructions
**Work date and new blog publication date:** October 14, 2026

## What to do
Complete THREE narrowly scoped tasks in the currently open **StartWeb7** website project:

1. Correct the navigation boxes' blue background treatment, without altering the approved layout.
2. Create or recover the three October 14 blog articles from the content and photographs **already inside this project**.
3. FIX the industry video hero overflow: the pool, house and car video heroes must fit entirely on the FIRST desktop screen, without scrolling down to see more of the hero video.

These are implementation instructions. **Do not display this file as a web page or publish it.** Inspect the existing code first, make the necessary edits to the website files, run available checks, and report the results. **Do not commit, push, deploy, or publish without my approval.**

### Files already provided — do not ask me to upload them again

- Article content: `StartWeb7-3-Blogs-for-Codex.md` in the project's root, already present in the VS Code Explorer.
- Three article photographs: already present in `assets/blogs`.

Check actual paths and filenames before editing. Do not create duplicate asset folders, download substitute images, or overwrite unrelated materials. Work only in the open StartWeb7 project, not DommyDom or Janitorial.

---

## Task 1 — Correct the navigation background COLOR ONLY

The approved two-row header, full-width horizontal desktop navigation, logo and phone number, menu item order, box dimensions, bold text, spacing, dropdown designs, and mobile hamburger menu must **remain exactly as they currently are**.

### What went wrong

Previous edits changed the navigation boxes into pale blue backgrounds, gradients that fade to white, border outlines, and blue side stripes. **None of those is the requested final look.**

### Required final look

- Inspect existing CSS to identify the **exact brand blue** used on primary buttons such as “Grow Your Business” and “Get Your Instant Audit.” Do not invent another blue.
- Apply one **uniform, evenly softened version of that recognizable strong brand blue** as the background color of the **entire area** of each navigation box. The color should look rich and recognizably blue, not pale, baby blue, or gray-blue.
- The background color must be **uniform from top to bottom and left to right**. **No gradient, no fade into white**, no stripes at the edges, and no pronounced rectangular outline used as the primary effect.
- Keep discreet, consistent separators between menu items if they belong to the approved layout, with a visibly finished **left edge of Home** and **right edge of Contact**; no doubled divider lines.
- Maintain legible, high-contrast menu text. Adjust its color only if needed for readability; otherwise preserve existing typography.
- Preserve approved whitespace below the menu, the full-width alignment, and the desktop/laptop horizontal layout. Keep the existing mobile hamburger menu.
- Do not modify the header structure, labels, dropdown functionality, or any other part of the site for this color correction.

Verify at full desktop width, a smaller laptop viewport, and phone width that the approved layout is unchanged, the color is evenly applied, and links/dropdowns remain usable.

---

## Task 2 — Build the three October 14, 2026 blog articles

Read **all** of `StartWeb7-3-Blogs-for-Codex.md` from the current project. The three articles are:

1. **When TikTok Became a Search Engine**
2. **The Cookie That Would Not Die, Inside Google's Five Year Reversal**
3. **Wikipedia Is Feeding the AI Era While Losing Its Readers**

Set the **visible publication date to October 14, 2026** on each new article and its blog card, and use that date in relevant article structured data. Do not change the publication dates of existing posts.

### Preserve the article copy

- Use the complete supplied writing: all paragraphs, titles, subheadings, research, facts, statistics, conclusions, and source sections.
- Do not shorten, summarize, duplicate, or unnecessarily rewrite the articles. Do not publish notes or instructions from the content file.
- Do not invent research, authors, sources, credentials, or URLs. Retain supplied references; if source links cannot be verified, flag that rather than inventing destinations.
- Do not introduce new em dashes or en dashes in prose. Do not change URL or code syntax that requires hyphens.

### Reuse the EXISTING blog design

Before editing, examine the site's current blog index and at least one existing article HTML page. Use the **same** header, navigation, fonts, colors, content width, paragraph spacing, section headings, featured image treatment, footer, links, responsive rules, and existing article-card layout. **Do not invent a new design.**

Before creating new files, search the current project for existing copies of these articles. **Avoid duplicates:** update an existing file if appropriate rather than creating another page with the same content.

### Match the images already in `assets/blogs`

Use the actual file names from the folder; these were their original names:

| Article | Correct provided image |
|---|---|
| TikTok | `Searching for coffee on TikTok-2.png` — coffee-shop / TikTok search image |
| Google cookies | `Google’s third-party cookie reversal-1.png` — Google cookie settings image |
| Wikipedia | `Team meeting around a laptop table.png` — Wikipedia / AI imagery |

For each article, show its correct supplied photo on the article and its corresponding blog card. Use meaningful alt text and valid relative paths. **Do not replace the photos.** Do not stretch them or crop off important subjects or any text embedded in the images. Match existing card dimensions without adding ugly blank bands; if both goals cannot be met, explain the conflict and pause on that decision rather than forcing a poor result.

### Create/update pages and discovery links

- Follow the site's existing HTML file organization and URL/slug conventions, including `.html` if it is used.
- Give each complete article one H1 with logical H2/H3 headings, a visible October 14, 2026 date, its correct featured image, complete article text, and existing header/footer.
- Create or verify a unique SEO `<title>`, meta description, canonical URL, Open Graph title/description/image, appropriate social metadata, and valid `Article` or `BlogPosting` JSON-LD using known site/domain data.
- Add all three cards to the existing blog index (`blog.html` if that is the correct file). Each should include the correct image, title, publication date, accurate excerpt, and working **Read More** link. Place newest items first **if** that matches the existing index order. Keep all older posts intact.
- Update `sitemap.xml` (if present) with three correct canonical URLs and appropriate modification dates, without deleting or duplicating existing entries. Update other established blog indexes only when necessary.

---

## Task 3 — FIX the industry video heroes overflowing below the first screen

**THIS IS A STILL-UNRESOLVED BUG. The user has reported it repeatedly. Do not say it is fixed unless you verify the actual rendered page on a full desktop browser.**

### What the problem looks like

On the Pool Construction, General Contractors, and Collision Repair industry pages, the hero video or its hero container is too tall or incorrectly sized. On a large, full desktop browser the visitor must **scroll down to see more of the SAME hero-video scene**. A small/minimized preview can appear correct while full desktop still fails. This is not acceptable. The user does NOT want the whole page shortened or the ordinary sections below the hero removed; they want **only the hero, including its video, heading and buttons, contained on the first screen below the existing two-row header**.

### Nonnegotiable success criteria

1. On opening any of these three pages at a desktop viewport, **the entire hero rectangle starts directly below the header and ends no lower than the bottom of the visible browser viewport**. No vertical scrolling should be required to reach the bottom of the hero or see the rest of the same hero video area.
2. The background video must stay **clipped INSIDE the hero**; it must not extend into the next section or enlarge the hero. Content BELOW the hero may of course scroll normally, but scrolling must not reveal another portion of an oversized hero.
3. Keep the existing **full-bleed, edge-to-edge video** with no black/empty bars and no distortion. Preserve headings, buttons, overlays, the approved header/nav, and other sections unchanged.
4. **Pool Construction:** show the whole pool as far as the ORIGINAL frames permit. **General Contractors:** show the entire house, including roof, as far as the frames permit. **Collision Repair:** show the full car, front to rear, as far as the frames permit. The visible subject should be within the FIRST-SCREEN hero, not below it.
5. Do **not** solve subject visibility by making the hero taller, using a scale/zoom transform, over-enlarging the video, adding letterboxing, or reducing the hero into a smaller boxed player.
6. Be precise about the physical constraint: an original shot may not contain the entire subject, or the source aspect ratio may make a full-subject view incompatible with edge-to-edge `cover`. In that case DO NOT CLAIM SUCCESS; explain exactly what cannot be achieved, show what the original footage allows, and request a wider-framed shot before replacing it. Do not silently change footage.

### Diagnose before making changes

- Locate the existing HTML/CSS/JS for these **three specific industry pages** and their actual video assets. Do not assume file names if the real structure differs.
- Inspect the **rendered hero height and header height** on large desktop widths and determine whether the source of overflow is CSS like fixed `min-height`, `vh`/`dvh` calculations, additional margins/padding, video positioning, `transform: scale`, or duplicate/uncontained video elements.
- Measure in-browser the actual header bottom, hero top/bottom, and viewport bottom before and after editing. Inspect representative video frames to determine when the entire subject is actually visible.
- Use a bounded responsive hero that fits the **available viewport height after the actual header**; put the video absolutely inside a positioned, overflow-clipped hero when appropriate. Make the *minimum* changes necessary, without altering the approved site header or building a completely new hero.
- Keep controls and text accessible, without introducing text overlap. On mobile, preserve a sensible responsive hero; do not apply a desktop-only rule that breaks small screens.

### REQUIRED REAL-WORLD verification

Test **each of the three pages separately**, using full-browser screenshots at **1920×1080, 1440×900, 1366×768, and 1280×720**. Also check **390×844 mobile**. At each desktop size verify using the actual DOM measurements that the header plus hero fit into the viewport height, and **scrolling is not necessary to see the bottom of the hero**. Do not treat a narrow VS Code preview as a substitute for these desktop tests. Inspect the subject's framing at all those sizes. Verify the same hero-video scene does not overflow below the hero and that the next section begins only when the visitor scrolls past the properly contained hero.

If actual browser testing is unavailable, state that clearly and give a precise manual test; do not report it as fixed. Do not edit or remove other videos or content sections.

---

## Strict protection of the rest of StartWeb7

**DO NOT CHANGE** the homepage content or door animations; industry video heroes **other than the three pages explicitly named in Task 3**; service and industry pages outside those three; other live animations; blog posts outside this batch; business contact details; contact forms; existing navigation structure, labels, or dropdowns; or unrelated CSS and JavaScript. Avoid bulk rewrites. Make the smallest changes that achieve these three tasks.

Before making edits, inspect version-control status so the current user work is preserved. Do not reset, discard, or overwrite unrelated changes. If a backup is appropriate, keep it outside the site's published content and do not modify the Git history without approval.

---

## Required checks (do the checks, don't just claim them)

1. Verify the navigation boxes have a uniform, richly tinted brand-blue background with **no fade to white**, while retaining the approved layout, separators, dropdowns, and mobile menu.
2. Confirm all three articles exist exactly once and include the **complete supplied content**.
3. Confirm October 14, 2026 appears on each article, each new blog card, and applicable structured data.
4. Verify the correct `assets/blogs` photo appears on each article and its card, with no important visible content cropped.
5. Verify blog listing links, canonical URLs, SEO metadata, source sections, schema, social tags, and sitemap entries.
6. Test in a browser via a local web server if available; check desktop and mobile widths, navigation, broken images/links, JavaScript errors, flashes of unstyled text, overlapping content, and layout shifts.
7. Verify the **three industry hero video sections** on actual desktop viewport sizes. Confirm the hero bottom is visible on the first screen and the video does not extend beneath it; document any footage-related cropping limitations.
8. Fix any **confirmed regressions caused by your changes**, without redesigning unrelated parts of the website. Report any tests you could not perform and any limitations honestly.

### Final report (before any publishing)

Provide:
- The three article filenames and proposed live URLs.
- Confirmation of complete article copy and the October 14 dates.
- Image filenames used for each article.
- SEO titles and meta descriptions.
- The blog index and sitemap edits.
- The exact CSS brand-blue color and navigation changes.
- The three hero video pages checked, their measured header/hero heights at each tested desktop size, and any subject-visibility limitations.
- A list of files created/modified and checks actually completed.
- Any missing assets or unresolved issues.

**Do not publish, push, commit, or deploy.** Keep the original article handoff Markdown available until I have approved the completed pages, but ensure it is not served as a public blog page. Wait for my review.
