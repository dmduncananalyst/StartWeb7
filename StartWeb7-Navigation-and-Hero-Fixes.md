# StartWeb7 — Responsive Navigation and Industry Hero Video Fixes

## Read this first

You are working in the user's **existing GitHub-connected StartWeb7 website project** in VS Code. These are **targeted corrections**, not authorization to redesign or rebuild the website.

**The user has already approved the current visual design**, including the two-row desktop header, logo and business phone number above the navigation, full-width bold blue navigation boxes, dropdown styles, and homepage design. Preserve all of it except the specific responsive issues below. The three recently created blogs and their images must remain untouched.

**Do not commit, push, deploy, or publish.** Do not remove or recreate any page. Work only in the StartWeb7 repository. Before editing, identify the smallest set of relevant files and preserve a recoverable diff; do not blindly reset other uncommitted changes. Inspect the actual code and computed styles before selecting a fix.

## Task 1 — Fix the crowded navigation at narrower widths

**Current problem:** Full-width desktop navigation looks good at larger widths. In a narrower browser window or on a small laptop it becomes crowded and squeezed; labels can appear cramped. The user does **not** want a hamburger menu on desktop/laptop.

1. Retain the approved **two-row desktop header**: first header row = logo and existing clickable phone number; navigation immediately underneath, including its current white spacing before the hero.
2. Keep all original menu labels, order, destinations, full-width styling, blue background treatment, bold lettering, and visually consistent item edges. **Do not** change colors or revisit the gradient/border debate. Use exactly the currently approved appearance.
3. Use responsive sizing that avoids tiny fonts, horizontal overflow, cut-off labels, overlapping text, cramped boxes, or extra blank space beyond the row. The menu should line up with the intended full width of the page.
4. On wide desktop/laptop screens show the original single horizontal row. If a smaller **laptop** genuinely cannot accommodate all labels at readable size, use an orderly, well-aligned **two-row arrangement for navigation links only**, preserving their order and appearance. Do not force a desktop hamburger menu. Use a phone-size breakpoint for the pre-existing mobile hamburger menu and preserve its working behavior.
5. Account for browser zoom and the real rendered widths, not just a fixed device-name breakpoint.
6. When navigation occupies two rows, measure its resulting actual height and ensure it does not overlap the hero. Fix the interaction with viewport-based hero sizing in Task 2.
7. Avoid per-page copies of conflicting navigation CSS where a correct shared rule can be applied. Do not change how existing dropdowns look or operate.

## Task 2 — Fix dropdown placement, size, and stability

**Current problem:** Business Growth's dropdown in the narrow VS Code preview is offset and looks much wider or longer than its parent; check other dropdowns for the same issue.

1. Anchor each dropdown directly **below its own parent navigation item**, including if the navigation wraps into two rows.
2. The dropdown does not have to match the parent's width if contents need more room, but it must read as visibly connected to its trigger, and must stay **within the visible viewport**. Prevent off-screen overflow.
3. Preserve dropdown pictures, icons, links, headings, styling, and interactions. No redesign, no removed options, no changing labels.
4. Ensure keyboard focus, hover/click interaction, layering, and open/close behavior still work; prevent flicker and unexpected closing.
5. Avoid accidental hover opening caused by changing layout while the cursor remains in place.

## Task 3 — Fix three industry page hero videos

**Current problem:** The hero background videos on `pool-construction.html`, `general-contractors.html`, and `collision-repair.html` are showing an overly tall hero. Visitors have to **scroll down to reach the bottom of the first hero**; previous attempts made the footage larger, which was the opposite of the request.

**Required outcome:** At regular desktop sizes, the **entire hero container, including its heading and buttons**, fits **between the bottom of the actual responsive header and the bottom of the first browser viewport**. The video is fully contained inside that hero, and covers it edge to edge, without black bands. Visitors should not need to scroll to see the rest of the hero section.

### Implementation requirements

1. Inspect each page's actual HTML structure, CSS selectors, video element, video dimensions/aspect ratio, and any transforms, scaling, `min-height`, `height`, `aspect-ratio`, absolute positioning, or duplicated rules that may create overflow. Inspect the *rendered* viewport and actual header height; do not guess heights from source alone.
2. Correct the **hero container height**, not by blindly increasing video scale. Account for a one- or two-row navigation header at narrower laptop widths. A viewport-based layout such as `100dvh` with the *measured* header height may be appropriate if it does not break the site's existing behavior.
3. Keep video within hero boundaries, and preserve headings, CTA buttons, contrast overlays, current font styling, background, and cinematic edge-to-edge visual treatment. **No** letterboxing, empty bands, stretched/distorted footage, or new scroll-triggered effects.
4. **Pool Construction:** Frame as much of the pool's complete shape and edges as the original footage actually contains, entirely within the hero. Do not enlarge it or make the hero taller to reveal the pool.
5. **General Contractors:** Frame as much of the whole house as possible, ideally roof and main structure visible together. Do not zoom into the building or extend the hero to fit it.
6. **Collision Repair:** Frame as much of the full car as possible, ideally front and rear visible together. Do not zoom in or extend the hero.
7. Adjust `object-position`/other framing **individually** if that helps. Inspect multiple actual video frames, not just the poster or initial still. Keep video files unchanged unless the user explicitly approves a replacement or edit.
8. **Important geometrical constraint:** Cropping is inevitable in some aspect-ratio combinations. A video cannot always simultaneously cover a hero edge-to-edge and show an entire pool, house, or car if the subject is outside the original shot or the video aspect ratio is incompatible. If that is the case, **tell the user specifically what is impossible** and preserve the best full-cover framing; do not try to solve it by making the hero taller, zooming further, stretching, or adding black bars. Ask for approval before replacing video footage.
9. On mobile, preserve the existing mobile design and functional CTA buttons. Prevent video overflow and horizontally clipped content. Do not force a desktop-first hero height that causes mobile overlap.

## Test and verify in real rendered browser

- Test **1920×1080**, **1440×900**, **1366×768**, **1280×720**, **1024×768**, **900px width**, **768px width**, and **390×844**; also test an ordinary laptop at **125% browser zoom**, if practical.
- **Navigation:** labels remain readable and correctly distributed; Home and Contact edges present; full-width alignment; no horizontal scrolling; all dropdowns open directly from the correct parent, stay on screen, and retain their existing contents.
- **Heroes:** at each desktop viewport, the **entire hero is visible in the first viewport, directly under the current header**, with no scrolling required; video is clipped to the hero, covers its full background, text and buttons remain visible. Check all three videos while **playing**, at multiple representative frames. Verify sensible mobile behavior separately.
- Navigate between pages, refresh from a new tab, look for flash of unstyled text, layout jumps, JavaScript errors, broken images, menu flickering, or regressions introduced by these changes. Do not claim an unperformed test passed.
- Before finishing, compare modified pages against the approved original visual structure. Only make edits related to Tasks 1–3. Keep changes small, reversible, and targeted. **Do not modify the blogs, blog index, sitemap, metadata, homepage door or search animations, unrelated industry pages, colors, images, or other content.**

## Final report (before any publishing)

Provide a succinct report showing:

1. The actual root cause of navigation crowding and dropdown offset.
2. The exact files and CSS/JS selectors changed to fix navigation and dropdowns.
3. The actual root cause of the hero height overflow, and changed files for each of the three industry pages.
4. Which tested widths passed, and which were not tested.
5. Any unavoidable video-framing limitations given the original footage.
6. Screenshots/preview links of the corrected **desktop and narrow laptop** navigation and each industry hero, if your environment allows.
7. Any remaining unresolved problems.

**STOP before commit/push/publish.** Wait for the user's approval.
